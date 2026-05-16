import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'work-index', path: '/work' },
  { name: 'work-lore', path: '/work/01-lore' },
  { name: 'services', path: '/services' },
  { name: 'about', path: '/about' },
  { name: 'journal-index', path: '/journal' },
  { name: 'journal-long-road', path: '/journal/the-long-road' },
  { name: 'now', path: '/now' },
  { name: 'contact', path: '/contact' },
  { name: 'uses', path: '/uses' },
];

const VIEWPORTS = [
  { name: '1279', width: 1279, height: 800 },
  { name: '1024', width: 1024, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

(async () => {
  const browser = await chromium.launch();
  const results = [];

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    for (const p of PAGES) {
      await page.goto(BASE + p.path, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => null);

      const measurements = await page.evaluate(() => {
        const findFirstContent = () => {
          const main = document.querySelector('main.layout-main');
          if (!main) return null;

          const selectors = ['h1', 'h2', 'p', '.eyebrow', '.tagline', '.lead', '.crumbs'];
          for (const sel of selectors) {
            const el = main.querySelector(sel);
            if (el) {
              const rect = el.getBoundingClientRect();
              return {
                selector: sel,
                left: Math.round(rect.left),
                right: Math.round(window.innerWidth - rect.right),
                width: Math.round(rect.width),
                viewport: window.innerWidth,
                text: el.textContent.substring(0, 40),
              };
            }
          }
          return null;
        };
        return findFirstContent();
      });

      const { viewport: _vp, ...meas } = measurements ?? {};
      results.push({ vpLabel: vp.name + 'px (' + vp.width + ')', page: p.name, ...meas });
    }

    await context.close();
  }

  await browser.close();

  console.log('\nVIEWPORT          | PAGE                | SEL     | LEFT  | RIGHT | TEXT');
  console.log('------------------|---------------------|---------|-------|-------|-----');
  results.forEach(r => {
    const bug = (r.left ?? 999) < 20 ? ' ← BUG' : '';
    const vp = (r.vpLabel || '???').padEnd(18);
    const pg = (r.page || '???').padEnd(20);
    const sel = (r.selector || '?').padEnd(7);
    const left = String(r.left ?? '?').padEnd(5);
    const right = String(r.right ?? '?').padEnd(5);
    const text = (r.text || '???').substring(0, 30);
    console.log(`${vp}| ${pg}| ${sel}| ${left}| ${right}| ${text}${bug}`);
  });

  const bugs = results.filter(r => (r.left ?? 999) < 20);
  if (bugs.length) {
    console.log(`\n⚠  ${bugs.length} BUG(S) found (left < 20px):`);
    bugs.forEach(r => console.log(`   [${r.vpLabel}] ${r.page} → left=${r.left}px (${r.selector}: "${r.text?.substring(0,30)}")`));
  } else {
    console.log('\n✓ All measurements >= 20px. No padding bugs.');
  }
})();
