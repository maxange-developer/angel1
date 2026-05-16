const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, 'output');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();

  // 1) Desktop mount @ 100ms (still A1)
  let ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  let page = await ctx.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(150);
  await page.screenshot({ path: path.join(OUT, 'logo-desktop-mount.png'), clip: { x: 0, y: 0, width: 800, height: 120 } });
  console.log('1. desktop mount (A1)');

  // 2) Desktop @ 2s (expanded ANGEL1)
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT, 'logo-desktop-expanded.png'), clip: { x: 0, y: 0, width: 800, height: 120 } });
  console.log('2. desktop expanded (ANGEL1)');

  // 3) Footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  const fh = await page.evaluate(() => document.body.scrollHeight);
  await page.screenshot({ path: path.join(OUT, 'logo-footer.png'), clip: { x: 0, y: Math.max(0, fh - 500), width: 800, height: 500 } });
  console.log('3. footer');
  await ctx.close();

  // 4) Mobile (A1 only, no animation)
  ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  page = await ctx.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT, 'logo-mobile.png'), clip: { x: 0, y: 0, width: 390, height: 100 } });
  console.log('4. mobile (A1)');
  await ctx.close();

  await browser.close();
})();
