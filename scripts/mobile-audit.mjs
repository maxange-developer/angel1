import { chromium } from "playwright";
import { mkdir } from "fs/promises";

const ROUTES = [
  "/",
  "/work",
  "/work/01-ai-support-dashboard",
  "/services",
  "/about",
  "/journal",
  "/journal/twelve-silent-years",
  "/now",
  "/uses",
  "/contact",
  "/404-fake-route",
];

const VIEWPORTS = [
  { name: "320", width: 320, height: 700 },
  { name: "375", width: 375, height: 812 },
  { name: "430", width: 430, height: 932 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 800 },
];

const OUT = "scripts/mobile-audit-screenshots";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  for (const route of ROUTES) {
    const slug = route.replace(/\//g, "_") || "_home";
    const url = `http://localhost:3000${route}`;
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 20000 });
      await page.screenshot({
        path: `${OUT}/${vp.name}${slug}.png`,
        fullPage: true,
      });
      console.log(`OK  ${vp.name}${slug}`);
    } catch (e) {
      console.log(`ERR ${vp.name}${slug}: ${e.message}`);
    }
  }
  await ctx.close();
}
await browser.close();
console.log("Done.");
