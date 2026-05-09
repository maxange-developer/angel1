const fs = require("fs");
const path = require("path");

const siteUrl = "https://massimilianoangelone.com";
const today = new Date().toISOString().split("T")[0];

// Static pages
const staticPages = [
  { loc: "/", priority: "1.0", changefreq: "monthly" },
  { loc: "/work", priority: "0.9", changefreq: "monthly" },
  { loc: "/services", priority: "0.9", changefreq: "monthly" },
  { loc: "/about", priority: "0.8", changefreq: "monthly" },
  { loc: "/journal", priority: "0.9", changefreq: "weekly" },
  { loc: "/contact", priority: "0.8", changefreq: "monthly" },
  { loc: "/now", priority: "0.6", changefreq: "weekly" },
  { loc: "/uses", priority: "0.5", changefreq: "monthly" },
];

// Work case studies (slugs derived from content/work/ directory)
const workDir = path.join(__dirname, "../content/work");
const workSlugs = fs.existsSync(workDir)
  ? fs
      .readdirSync(workDir)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""))
  : [];

const workPages = workSlugs.map((slug) => ({
  loc: `/work/${slug}`,
  priority: "0.8",
  changefreq: "monthly",
}));

// Journal posts (slugs derived from content/journal/ directory)
const journalDir = path.join(__dirname, "../content/journal");
const journalSlugs = fs.existsSync(journalDir)
  ? fs
      .readdirSync(journalDir)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""))
  : [];

const journalPages = journalSlugs.map((slug) => ({
  loc: `/journal/${slug}`,
  priority: "0.7",
  changefreq: "monthly",
}));

const allPages = [...staticPages, ...workPages, ...journalPages];

// Build XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

allPages.forEach((page) => {
  xml += `  <url>\n`;
  xml += `    <loc>${siteUrl}${page.loc}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += `  </url>\n`;
});

xml += "</urlset>\n";

const outputPath = path.join(__dirname, "../public/sitemap.xml");
fs.writeFileSync(outputPath, xml);

console.log(`Sitemap generated: ${outputPath} (${allPages.length} URLs)`);
