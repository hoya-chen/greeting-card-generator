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
const html = path.join(os.tmpdir(), `build-${id}-${process.pid}.html`);
execFileSync('python3', [path.join(__dirname, 'build.py'), '--only', id, '--out', html], { stdio: 'inherit' });
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1100, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push('pageerror: ' + e.message));
  await p.goto('file://' + html); await p.waitForTimeout(2500);
  await p.selectOption('#yearSel', year);
  const info = await p.evaluate(() => ({ designs: FESTS[0].designs.length, msgs: FESTS[0].msgs.length,
    long: FESTS[0].msgs.filter(m => m.length > 56).map(m => m.length + ':' + m.slice(0, 12)),
    dup: FESTS[0].msgs.length - new Set(FESTS[0].msgs).size }));
  const urls = [];
  for (let i = 0; i < info.designs; i++) {
    await p.evaluate(i => { tplIdx = i; render(false); }, i);
    await p.waitForTimeout(120);
    urls.push(await p.$eval('#card', c => c.toDataURL()));
  }
  if (process.argv[5]) { // full-size single design: argv[5] = 1-based number
    const n = Number(process.argv[5]) - 1;
    fs.writeFileSync(out, Buffer.from(urls[n].split(',')[1], 'base64'));
    console.log(JSON.stringify(info), errs.join('\n') || 'no script errors', '\nfull-size design', n + 1, ':', out);
    fs.unlinkSync(html); await b.close(); return;
  }
  const sheet = await b.newPage({ viewport: { width: 1530, height: 860 } });
  const cols = Math.min(5, urls.length);
  await sheet.setContent(`<body style="margin:0;background:#333;display:grid;grid-template-columns:repeat(${cols},300px);gap:6px">` +
    urls.map((u, i) => `<div style="position:relative"><img src="${u}" style="width:300px;display:block"><span style="position:absolute;left:4px;bottom:4px;background:#000a;color:#fff;font:12px sans-serif;padding:1px 5px">${i + 1}</span></div>`).join('') + '</body>');
  await sheet.waitForTimeout(400);
  await sheet.screenshot(out.endsWith('.jpg') ? { path: out, fullPage: true, type: 'jpeg', quality: 70 } : { path: out, fullPage: true });
  // a full-size view of one design, for close inspection: node preview.js id year out.png  then Read the file
  console.log(JSON.stringify(info), errs.join('\n') || 'no script errors', '\ncontact sheet:', out);
  fs.unlinkSync(html); await b.close();
})();
