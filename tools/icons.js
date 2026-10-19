// Usage: NODE_PATH=$(npm root -g) node tools/icons.js
// Draws the app icon (a gold 福 on a red seal) with the page's own font and writes icons/*.png.
// "maskable" keeps the character inside the middle 80% so Android can crop it to any shape.
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const outDir = path.join(__dirname, '..', 'icons');
const sizes = [
  ['icon-192.png', 192, false], ['icon-512.png', 512, false],
  ['maskable-512.png', 512, true], ['apple-touch-icon.png', 180, true], ['favicon-32.png', 32, false],
];
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage();
  await p.setContent(`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC:wght@700&display=block&text=%E7%A6%8F">`);
  await p.evaluate(() => document.fonts.load('700 100px "LXGW WenKai TC"', '福'));
  for (const [name, s, full] of sizes) {
    const url = await p.evaluate(([s, full]) => {
      const c = document.createElement('canvas'); c.width = c.height = s; const g = c.getContext('2d');
      const red = g.createRadialGradient(s * .5, s * .42, s * .05, s * .5, s * .5, s * .72);
      red.addColorStop(0, '#c9342a'); red.addColorStop(1, '#8e1a16');
      const r = full ? 0 : s * .22; // full-bleed square for maskable / apple (the OS rounds it)
      g.fillStyle = red; g.beginPath(); g.roundRect(0, 0, s, s, r); g.fill();
      const inset = full ? s * .14 : s * .07; // gold frame
      g.strokeStyle = '#e6b54a'; g.lineWidth = Math.max(1, s * .025);
      g.beginPath(); g.roundRect(inset, inset, s - 2 * inset, s - 2 * inset, full ? s * .08 : r * .7); g.stroke();
      g.fillStyle = '#f6d27a'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.font = `700 ${full ? s * .5 : s * .62}px "LXGW WenKai TC", serif`;
      g.fillText('福', s / 2, s * .53);
      return c.toDataURL('image/png');
    }, [s, full]);
    fs.writeFileSync(path.join(outDir, name), Buffer.from(url.split(',')[1], 'base64'));
    console.log('wrote icons/' + name);
  }
  await b.close();
})();
