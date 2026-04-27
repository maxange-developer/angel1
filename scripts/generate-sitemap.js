const fs = require("fs");
const path = require("path");

// Data imports
const blogPosts = require("../src/data/blog-posts.json");
const storyData = require("../src/data/la-mia-storia.json");

const siteUrl = "https://massimilianoangelone.com";
const today = new Date().toISOString().split("T")[0];

const urlSet = [];

// Home pages (with language alternates)
const homeUrls = [
  {
    loc: `${siteUrl}/`,
    lastmod: today,
    changefreq: "monthly",
    priority: "1.0",
    languages: true,
  },
  {
    loc: `${siteUrl}/en`,
    lastmod: today,
    changefreq: "monthly",
    priority: "1.0",
    languages: true,
  },
  {
    loc: `${siteUrl}/es`,
    lastmod: today,
    changefreq: "monthly",
    priority: "1.0",
    languages: true,
  },
];

// Static pages
const staticPages = [
  {
    loc: `${siteUrl}/services`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    loc: `${siteUrl}/timeline`,
    lastmod: today,
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: `${siteUrl}/blog`,
    lastmod: today,
    changefreq: "weekly",
    priority: "0.9",
  },
];

// Blog posts
const blogUrls = blogPosts.map((post) => ({
  loc: `${siteUrl}/blog/${post.slug}`,
  lastmod: post.date,
  changefreq: "monthly",
  priority: post.pinned ? "0.95" : "0.7",
}));

// Story post
const storyUrl = {
  loc: `${siteUrl}/blog/la-mia-storia`,
  lastmod: storyData.date,
  changefreq: "monthly",
  priority: "0.95",
};

// Build XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml +=
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

// Add home pages with language alternates
homeUrls.forEach((page) => {
  xml += `  <url>\n`;
  xml += `    <loc>${page.loc}</loc>\n`;
  xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  if (page.languages) {
    xml += `    <xhtml:link rel="alternate" hreflang="it" href="${siteUrl}/" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}/en" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}/es" />\n`;
  }
  xml += `  </url>\n`;
});

// Add static pages
staticPages.forEach((page) => {
  xml += `  <url>\n`;
  xml += `    <loc>${page.loc}</loc>\n`;
  xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += `  </url>\n`;
});

// Add story
xml += `  <url>\n`;
xml += `    <loc>${storyUrl.loc}</loc>\n`;
xml += `    <lastmod>${storyUrl.lastmod}</lastmod>\n`;
xml += `    <changefreq>${storyUrl.changefreq}</changefreq>\n`;
xml += `    <priority>${storyUrl.priority}</priority>\n`;
xml += `  </url>\n`;

// Add blog posts
blogUrls.forEach((page) => {
  xml += `  <url>\n`;
  xml += `    <loc>${page.loc}</loc>\n`;
  xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += `  </url>\n`;
});

xml += "</urlset>\n";

// Write to file
const outputPath = path.join(__dirname, "../public/sitemap.xml");
fs.writeFileSync(outputPath, xml);

console.log(`✅ Sitemap generated: ${outputPath}`);
console.log(
  `📍 Total URLs: ${homeUrls.length + staticPages.length + blogUrls.length + 1}`
);
