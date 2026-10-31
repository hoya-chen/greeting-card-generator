// Usage: NODE_PATH=$(npm root -g) node tools/preview.js <festival-id> [year] [out.png] [design-number]
// With a design number (1-based) the output is that one card at full size (1000x1400); otherwise a contact sheet.
// Builds a one-festival page into a temp file, renders every design on a contact sheet, and
// reports script errors and data problems (design count, message count and length).
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const os = require('os'), path = require('path'), fs = require('fs');
const id = process.argv[2], year = process.argv[3] || '2027';
const out = process.argv[4] || path.join(os.tmpdir(), `preview-${id}.png`);
if (!id) { console.error('festival id required'); process.exit(1); }
// built next to index.html and served over http, so the landscape photos in bg/ load and the canvas can be read
const root = path.dirname(__dirname);
const html = path.join(root, `.preview-${id}-${process.pid}.html`);
execFileSync('python3', [path.join(__dirname, 'build.py'), '--only', id, '--out', html], { stdio: 'inherit' });
(async () => {
  const types = { '.html': 'text/html; charset=utf-8', '.webp': 'image/webp', '.js': 'text/javascript', '.png': 'image/png', '.json': 'application/json' };
  const server = require('http').createServer((req, res) => {
    const f = path.join(root, decodeURIComponent(req.url.split('?')[0]));
    if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1100, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await p.goto(`http://127.0.0.1:${server.address().port}/${path.basename(html)}`); await p.waitForTimeout(2500);
  await p.selectOption('#yearSel', year);
  const info = await p.evaluate(() => ({ designs: FESTS[0].designs.length, msgs: FESTS[0].msgs.length,
    long: FESTS[0].msgs.filter(m => m.length > 56).map(m => m.length + ':' + m.slice(0, 12)),
    dup: FESTS[0].msgs.length - new Set(FESTS[0].msgs).size }));
  const urls = [];
  for (let i = 0; i < info.designs; i++) {
    await p.evaluate(async i => { artStyle = "all"; tplIdx = i; await photoReady(curDesign(cur)); render(false); }, i);
    await p.waitForTimeout(120);
    urls.push(await p.$eval('#card', c => c.toDataURL()));
  }
  if (process.argv[5]) { // full-size single design: argv[5] = 1-based number
    const n = Number(process.argv[5]) - 1;
    fs.writeFileSync(out, Buffer.from(urls[n].split(',')[1], 'base64'));
    console.log(JSON.stringify(info), errs.join('\n') || 'no script errors', '\nfull-size design', n + 1, ':', out);
    fs.unlinkSync(html); await b.close(); server.close(); return;
  }
  const sheet = await b.newPage({ viewport: { width: 1530, height: 860 } });
  const cols = Math.min(5, urls.length);
  await sheet.setContent(`<body style="margin:0;background:#333;display:grid;grid-template-columns:repeat(${cols},300px);gap:6px">` +
    urls.map((u, i) => `<div style="position:relative"><img src="${u}" style="width:300px;display:block"><span style="position:absolute;left:4px;bottom:4px;background:#000a;color:#fff;font:12px sans-serif;padding:1px 5px">${i + 1}</span></div>`).join('') + '</body>');
  await sheet.waitForTimeout(400);
  await sheet.screenshot(out.endsWith('.jpg') ? { path: out, fullPage: true, type: 'jpeg', quality: 70 } : { path: out, fullPage: true });
  // a full-size view of one design, for close inspection: node preview.js id year out.png  then Read the file
  console.log(JSON.stringify(info), errs.join('\n') || 'no script errors', '\ncontact sheet:', out);
  fs.unlinkSync(html); await b.close(); server.close();
})();
