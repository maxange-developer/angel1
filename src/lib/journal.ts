import fs from "fs";
import path from "path";
import matter from "gray-matter";

const JOURNAL_DIR = path.join(process.cwd(), "content", "journal");

export interface JournalFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  category: string;
  readTime: string;
  pinned?: boolean;
}

export interface JournalPost {
  slug: string;
  frontmatter: JournalFrontmatter;
  content: string;
}

export function getAllJournalSlugs(): string[] {
  if (!fs.existsSync(JOURNAL_DIR)) return [];
  return fs
    .readdirSync(JOURNAL_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
    .sort();
}

export function getJournalPost(slug: string): JournalPost {
  const filePath = path.join(JOURNAL_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as JournalFrontmatter, content };
}

export function getAllJournalPosts(): JournalPost[] {
  return getAllJournalSlugs().map((slug) => getJournalPost(slug));
}
