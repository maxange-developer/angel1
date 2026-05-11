import { useEffect, useState } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import MermaidDiagram from "@/components/MermaidDiagram";
import { getAllWorkSlugs, getWorkPost, type WorkFrontmatter } from "@/lib/mdx";
import { PULL_QUOTE, STAGGER_CONTAINER, STAGGER_ITEM, HERO_STAGGER, HERO_ITEM, HERO_TITLE } from "@/lib/motion";

interface RelatedPost {
  slug: string;
  title: string;
  tagline: string;
  package: string;
  date: string;
  hero: string | null;
}

interface WorkSlugProps {
  frontmatter: WorkFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
  relatedPosts: RelatedPost[];
  slug: string;
}

const MDX_COMPONENTS = {
  MermaidDiagram,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <motion.blockquote
      className="pull-quote"
      variants={PULL_QUOTE}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      {...(props as object)}
    />
  ),
};

function TableOfContents({ slug }: { slug: string }) {
  const [activeId, setActiveId] = useState("");
  const [items, setItems] = useState<Array<{ id: string; text: string; level: number }>>([]);

  useEffect(() => {
    const headings = document.querySelectorAll(".case-body h2[id], .case-body h3[id]");
    if (!headings.length) return;

    setItems(
      Array.from(headings).map((h) => ({
        id: h.id,
        text: h.textContent ?? "",
        level: h.tagName === "H2" ? 2 : 3,
      }))
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -60% 0px" }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [slug]);

  if (!items.length) return null;

  return (
    <aside className="case-toc">
      <div className="lbl">Contents</div>
      <ul>
        {items.map((item, i) => (
          <li key={item.id} style={{ paddingLeft: item.level === 3 ? "0.75rem" : undefined }}>
            <a
              href={`#${item.id}`}
              className={activeId === item.id ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function splitStatValue(value: string): { num: string; unit: string } {
  // Heuristic: split trailing non-digit suffix as unit (e.g. "85s" → "85"+"s", "4.7/5" → "4.7"+"/5")
  const match = value.match(/^([\d.,+]+)([^\d.,+].*)?$/);
  if (match) {
    return { num: match[1], unit: match[2] ?? "" };
  }
  return { num: value, unit: "" };
}

export default function WorkSlug({
  frontmatter: fm,
  mdxSource,
  relatedPosts,
  slug,
}: WorkSlugProps) {
  return (
    <>
      <SEO
        page="work"
        customTitle={`${fm.title} — Massimiliano Angelone`}
        customDescription={fm.tagline}
        ogImage={fm.hero}
        canonicalPath={`/work/${slug}`}
      />

      {/* CASE HERO */}
      <section className="container case-hero">
        <motion.div variants={HERO_STAGGER} initial="hidden" animate="visible">
          <motion.span className="crumbs" variants={HERO_ITEM}>
            Work / {fm.title}
          </motion.span>
          <motion.h1 variants={HERO_TITLE}>
            {fm.title}
          </motion.h1>
          <motion.p className="tagline" variants={HERO_ITEM}>
            {fm.tagline}
          </motion.p>
          <motion.div className="meta" variants={HERO_ITEM}>
            <div>
              <div className="k">Engagement</div>
              <div className="v">{fm.package}</div>
            </div>
            <div>
              <div className="k">Duration</div>
              <div className="v">{fm.duration}</div>
            </div>
            <div>
              <div className="k">Stack</div>
              <div className="v">{fm.stack.slice(0, 3).join(" · ")}</div>
            </div>
            <div>
              <div className="k">Shipped</div>
              <div className="v">{fm.date}</div>
            </div>
            <div>
              <div className="k">Status</div>
              <div className="v">{fm.demo ? "Live" : "Shipped"}</div>
            </div>
          </motion.div>
          {(fm.demo || fm.github) && (
            <motion.div className="ctas" variants={HERO_ITEM}>
              {fm.demo && (
                <a
                  href={fm.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Live demo <span className="arr">→</span>
                </a>
              )}
              {fm.github && (
                <a
                  href={fm.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  GitHub
                </a>
              )}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* CASE COVER */}
      {fm.hero && (
        <div className="case-cover">
          <div className="img-ph">
            <Image
              src={fm.hero}
              alt={fm.title}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      )}

      {/* CASE STATS */}
      {fm.stats && fm.stats.length > 0 && (
        <div className="container case-stats">
          <motion.div
            className="grid"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {fm.stats.map((stat) => {
              const { num, unit } = splitStatValue(stat.value);
              return (
                <motion.div
                  key={stat.label}
                  className="card case-stat"
                  variants={STAGGER_ITEM}
                >
                  <div className="v">
                    {num}
                    {unit && <span className="unit">{unit}</span>}
                  </div>
                  <div className="k">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}

      {/* CASE BODY */}
      <motion.div
        className="container case-body-wrap"
        variants={STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        <TableOfContents slug={slug} />
        <motion.article className="case-body" variants={HERO_ITEM}>
          <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
        </motion.article>
      </motion.div>

      {/* RELATED */}
      {relatedPosts.length > 0 && (
        <section className="container case-related">
          <span className="eyebrow">Continue exploring</span>
          <h2>
            Related work
          </h2>
          <motion.div
            className="grid"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {relatedPosts.map((post) => (
              <motion.div key={post.slug} variants={STAGGER_ITEM}>
                <Link href={`/work/${post.slug}`} className="card related-card">
                  <div className="img-ph">
                    {post.hero && (
                      <Image
                        src={post.hero}
                        alt={post.title}
                        fill
                        sizes="440px"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div className="body">
                    <h4>{post.title}</h4>
                    <p>{post.tagline}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllWorkSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getWorkPost(slug);

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      rehypePlugins: [rehypeHighlight as never],
    },
  });

  const allPosts = getAllWorkSlugs()
    .filter((s) => s !== slug)
    .map((s) => {
      const p = getWorkPost(s);
      const related: RelatedPost = {
        slug: s,
        title: p.frontmatter.title,
        tagline: p.frontmatter.tagline,
        package: p.frontmatter.package,
        date: p.frontmatter.date,
        hero: p.frontmatter.hero ?? null,
      };
      return related;
    })
    .slice(0, 2);

  return {
    props: {
      frontmatter: post.frontmatter,
      mdxSource,
      relatedPosts: allPosts,
      slug,
    },
  };
};
