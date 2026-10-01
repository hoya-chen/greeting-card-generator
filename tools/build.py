#!/usr/bin/env python3
"""Concatenate src/ into one HTML file.

  python3 tools/build.py                       -> index.html with every festival
  python3 tools/build.py --only spring --out /tmp/x.html   -> a preview with one festival
"""
import argparse, glob, os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ap = argparse.ArgumentParser()
ap.add_argument('--only', help='festival id to include (preview builds)')
ap.add_argument('--out', default=os.path.join(root, 'index.html'))
a = ap.parse_args()
rd = lambda p: open(p, encoding='utf-8').read()
files = sorted(glob.glob(os.path.join(root, 'src/festivals/*.js')))
if a.only:
    files = [f for f in files if os.path.basename(f) == a.only + '.js']
    assert files, 'unknown festival ' + a.only
parts = [rd(os.path.join(root, 'src/head.html')), rd(os.path.join(root, 'src/core.js')), rd(os.path.join(root, 'src/legacy.js'))]
parts += [rd(f) for f in files]
parts += [rd(os.path.join(root, 'src/app.js')), '</script>\n</body>\n</html>\n']
open(a.out, 'w', encoding='utf-8').write(''.join(parts))
print('built', a.out)
