const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const VIEWPORT = { width: 1800, height: 1125 };
const OUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const TARGETS = [
  {
    name: 'lore-cover',
    url: 'https://ai-support-dashboard-six.vercel.app',
    waitFor: 'networkidle',
    afterLoad: async () => {},
  },
  {
    name: 'email-triage-cover',
    url: 'https://email-triage-lime.vercel.app',
    waitFor: 'networkidle',
    afterLoad: async (page) => {
      try {
        const demoBtn = await page.waitForSelector(
          'button:has-text("Enter demo"), button:has-text("Try demo"), button:has-text("Demo"), a:has-text("Enter demo"), a:has-text("Try demo")',
          { timeout: 5000 }
        );
        if (demoBtn) {
          await demoBtn.click();
          await page.waitForLoadState('networkidle', { timeout: 15000 });
          await page.waitForTimeout(2500);
          console.log('  → entered demo inbox');
        }
      } catch (e) {
        console.log('  → demo button not found, screenshotting login page');
      }
    },
  },
];

(async () => {
  const browser = await chromium.launch();

  for (const t of TARGETS) {
    console.log(`Capturing: ${t.url} @ ${VIEWPORT.width}×${VIEWPORT.height}`);
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    try {
      await page.goto(t.url, { waitUntil: t.waitFor, timeout: 30000 });
      await page.waitForTimeout(2000);

      await t.afterLoad(page);

      await page.waitForTimeout(1500);

      const filepath = path.join(OUT_DIR, `${t.name}.png`);
      await page.screenshot({
        path: filepath,
        clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height },
      });

      const stat = fs.statSync(filepath);
      console.log(`  ✓ Saved: ${filepath} (${Math.round(stat.size / 1024)} KB)`);
    } catch (e) {
      console.error(`  ✗ Failed: ${e.message}`);
    }

    await context.close();
  }

  await browser.close();
  console.log('\nDone.');
})();
