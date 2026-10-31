#!/usr/bin/env python3
"""Download the landscape photos listed in bg/sources.json and turn them into card backgrounds.

  python3 tools/fetch_bg.py            -> fetch photos that are missing, write bg/CREDITS.md
  python3 tools/fetch_bg.py --force    -> fetch and convert every photo again

Each photo is cropped to the picture area of the card (912x956, the part inside the frame above the
message), keeping the point fx/fy (0..1) in view, and saved as WebP. Only CC0 or public-domain photos
belong in sources.json, so the cards can be shared and used freely.
Needs Pillow (pip install pillow).
"""
import argparse, io, json, os, sys, time, urllib.request
from PIL import Image, ImageOps

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BG = os.path.join(root, 'bg')
W, H, QUALITY = 912, 956, 72
NAMES = {'spring': '春節', 'yuanxiao': '元宵節', 'duanwu': '端午節', 'midautumn': '中秋節', 'chongyang': '重陽節',
         'dongzhi': '冬至', 'xmas': '聖誕節', 'newyear': '元旦', 'mother': '母親節', 'father': '父親節', 'valentine': '情人節', 'easter': '復活節', 'halloween': '萬聖節', 'thanksgiving': '感恩節'}
UA = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36 greeting-card-generator',
      'Referer': 'https://stocksnap.io/'}


def fetch(url):
    for t in range(4):
        try:
            return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=90).read()
        except Exception as e:
            print('  retry', t + 1, e, file=sys.stderr); time.sleep(3 * (t + 1))
    raise RuntimeError('download failed: ' + url)


def convert(data, fx, fy, zoom):
    im = ImageOps.exif_transpose(Image.open(io.BytesIO(data))).convert('RGB')
    s = max(W / im.width, H / im.height) * zoom
    dw, dh = round(im.width * s), round(im.height * s)
    im = im.resize((dw, dh), Image.LANCZOS)
    left, top = round((dw - W) * fx), round((dh - H) * fy)
    return im.crop((left, top, left + W, top + H))


def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--force', action='store_true'); a = ap.parse_args()
    src = json.load(open(os.path.join(BG, 'sources.json'), encoding='utf-8'))
    total, lines = 0, ['# 風景照來源與授權', '',
                       '賀卡的風景照都是 CC0 或公有領域（Public Domain）的照片，可自由使用、商用，不需要標示作者；',
                       '這裡仍列出來源以示感謝。照片由 `tools/fetch_bg.py` 依 `bg/sources.json` 下載並裁切成賀卡尺寸。', '']
    for fest, items in src.items():
        os.makedirs(os.path.join(BG, fest), exist_ok=True)
        lines += [f'## {NAMES.get(fest, fest)}', '', '| 檔案 | 照片 | 作者 | 授權 |', '|---|---|---|---|']
        for it in items:
            out = os.path.join(BG, fest, it['file'])
            if a.force or not os.path.exists(out):
                print('fetch', fest, it['file'], it['download'])
                img = convert(fetch(it['download']), it.get('fx', .5), it.get('fy', .5), it.get('zoom', 1))
                img.save(out, 'WEBP', quality=QUALITY, method=6)
            size = os.path.getsize(out); total += size
            lic = f"[{it['license']}]({it['license_url']})"
            lines.append(f"| `{fest}/{it['file']}` | [{it['title']}]({it['page']}) | {it['creator'] or '（未署名）'} | {lic} |")
        lines.append('')
    open(os.path.join(BG, 'CREDITS.md'), 'w', encoding='utf-8').write('\n'.join(lines))
    print(f'done, {total / 1024 / 1024:.1f} MB in bg/')


main()
