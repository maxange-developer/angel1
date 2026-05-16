const { chromium } = require('playwright');
const path = require('path');

const OUT = path.join(__dirname, 'output');

(async () => {
  const browser = await chromium.launch();

  // Mobile
  let ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  let page = await ctx.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT, 'logo-mobile.png'), clip: { x: 0, y: 0, width: 390, height: 100 } });
  console.log('mobile (A1)');
  await ctx.close();

  // Footer (use element bbox)
  ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  page = await ctx.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const footer = await page.locator('.site-footer').first();
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await footer.screenshot({ path: path.join(OUT, 'logo-footer.png') });
  console.log('footer');
  await ctx.close();

  await browser.close();
})();
