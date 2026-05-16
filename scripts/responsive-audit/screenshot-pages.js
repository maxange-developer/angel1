const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:3000';

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'work', path: '/work' },
  { name: 'work-lore', path: '/work/01-lore' },
  { name: 'work-email-triage', path: '/work/02-email-triage' },
  { name: 'work-mvp-toolkit', path: '/work/03-angel1-mvp-toolkit' },
  { name: 'work-rag-eval', path: '/work/04-angel1-rag-eval' },
  { name: 'services', path: '/services' },
  { name: 'about', path: '/about' },
  { name: 'journal', path: '/journal' },
  { name: 'journal-long-road', path: '/journal/the-long-road' },
  { name: 'now', path: '/now' },
  { name: 'contact', path: '/contact' },
  { name: 'uses', path: '/uses' },
];

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const OUT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    for (const p of PAGES) {
      const url = BASE + p.path;
      const filename = `${vp.name}__${p.name}.png`;
      const filepath = path.join(OUT_DIR, filename);

      console.log(`[${vp.name}] ${url}`);

      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(500);

        // Auto-scroll to trigger IntersectionObserver on all Reveal elements
        await page.evaluate(async () => {
          await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 200;
            const timer = setInterval(() => {
              const scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;
              if (totalHeight >= scrollHeight) {
                clearInterval(timer);
                resolve();
              }
            }, 100);
          });
        });

        await page.waitForTimeout(800);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(400);

        await page.screenshot({ path: filepath, fullPage: true });
      } catch (e) {
        console.error(`  FAILED: ${e.message}`);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log('Done.');
})();
