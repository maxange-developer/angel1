const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS = [
  {
    name: 'lore-cover',
    url: 'https://ai-support-dashboard-six.vercel.app',
  },
  {
    name: 'email-triage-cover',
    url: 'https://email-triage-lime.vercel.app',
  },
];

const VIEWPORT = { width: 1600, height: 1000 };
const OUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  const browser = await chromium.launch();

  for (const s of SCREENSHOTS) {
    console.log(`Capturing: ${s.url}`);
    const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2 });
    const page = await context.newPage();

    try {
      await page.goto(s.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      const filepath = path.join(OUT_DIR, `${s.name}.png`);
      await page.screenshot({
        path: filepath,
        clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
      });
      console.log(`  OK Saved: ${filepath}`);
    } catch (e) {
      console.error(`  FAILED: ${e.message}`);
    }

    await context.close();
  }

  await browser.close();
})();
