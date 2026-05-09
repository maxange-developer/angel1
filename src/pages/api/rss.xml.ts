import type { NextApiRequest, NextApiResponse } from "next";
import { getAllJournalPosts } from "@/lib/journal";

const BASE_URL = "https://massimilianoangelone.com";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const posts = getAllJournalPosts();

  const items = posts
    .map(
      (p) => `
  <item>
    <title>${escapeXml(p.frontmatter.title)}</title>
    <link>${BASE_URL}/journal/${p.slug}</link>
    <guid>${BASE_URL}/journal/${p.slug}</guid>
    <description>${escapeXml(p.frontmatter.excerpt)}</description>
    <pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
    <category>${escapeXml(p.frontmatter.category)}</category>
  </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Massimiliano Angelone — Journal</title>
    <link>${BASE_URL}/journal</link>
    <description>Long-form writing on AI development, product thinking, and the freelance craft.</description>
    <language>en-US</language>
    <atom:link href="${BASE_URL}/api/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.status(200).send(xml);
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
