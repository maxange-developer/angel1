import fs from "fs";
import path from "path";
import matter from "gray-matter";

const WORK_DIR = path.join(process.cwd(), "content", "work");

export interface WorkFrontmatter {
  title: string;
  client: string;
  tagline: string;
  date: string;
  duration: string;
  package: string;
  stack: string[];
  color: "blue" | "pink" | "green";
  featured?: boolean;
  hero?: string;
  heroFull?: string;
  demo?: string;
  github?: string;
  stats?: Array<{ label: string; value: string }>;
  order?: number;
}

export interface WorkPost {
  slug: string;
  frontmatter: WorkFrontmatter;
  content: string;
}

export function getAllWorkSlugs(): string[] {
  const slugs = fs
    .readdirSync(WORK_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
  return slugs.sort((a, b) => {
    const orderA = getWorkPost(a).frontmatter.order ?? 999;
    const orderB = getWorkPost(b).frontmatter.order ?? 999;
    return orderA - orderB;
  });
}

export function getWorkPost(slug: string): WorkPost {
  const filePath = path.join(WORK_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as WorkFrontmatter, content };
}

export function getAllWorkPosts(): WorkPost[] {
  return getAllWorkSlugs().map((slug) => getWorkPost(slug));
}
