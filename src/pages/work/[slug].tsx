import { useEffect, useRef, useState } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";
import MermaidDiagram from "@/components/MermaidDiagram";
import { getAllWorkSlugs, getWorkPost, type WorkFrontmatter } from "@/lib/mdx";
import { PULL_QUOTE, STAGGER_CONTAINER, STAGGER_ITEM } from "@/lib/motion";

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

  useEffect(() => {
    const headings = document.querySelectorAll(".case-body h2[id], .case-body h3[id]");
    if (!headings.length) return;

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

  const [items, setItems] = useState<Array<{ id: string; text: string; level: number }>>([]);

  useEffect(() => {
    const headings = document.querySelectorAll(".case-body h2[id], .case-body h3[id]");
    setItems(
      Array.from(headings).map((h) => ({
        id: h.id,
        text: h.textContent ?? "",
        level: h.tagName === "H2" ? 2 : 3,
      }))
    );
  }, [slug]);

  if (!items.length) return null;

  return (
    <nav className="case-toc">
      <p className="eyebrow">Contents</p>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: item.level === 3 ? "0.75rem" : undefined }}>
            <a
              href={`#${item.id}`}
              className={activeId === item.id ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function WorkSlug({ frontmatter: fm, mdxSource, relatedPosts, slug }: WorkSlugProps) {
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
      <section className="case-hero container">
        <MotionSection>
          <p className="eyebrow">{fm.client} · {fm.date}</p>
          <h1>{fm.title}</h1>
          <p className="q">{fm.tagline}</p>
          <div className="case-hero-meta">
            <span className="chip">{fm.package}</span>
            <span className="chip">{fm.duration}</span>
            {fm.stack.map((s) => (
              <span key={s} className="chip">{s}</span>
            ))}
          </div>
          <div className="case-hero-links">
            {fm.demo && (
              <a href={fm.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Live demo →
              </a>
            )}
            {fm.github && (
              <a href={fm.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                GitHub →
              </a>
            )}
          </div>
        </MotionSection>
      </section>

      {/* CASE COVER */}
      {fm.hero && (
        <div className="case-cover container">
          <div className="img-ph">
            <Image
              src={fm.hero}
              alt={fm.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="photo"
              priority
            />
          </div>
        </div>
      )}

      {/* CASE STATS */}
      {fm.stats && fm.stats.length > 0 && (
        <MotionSection className="container" as="div">
          <motion.div
            className="case-stats"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {fm.stats.map((stat) => (
              <motion.div key={stat.label} className="case-stat" variants={STAGGER_ITEM}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </MotionSection>
      )}

      {/* CASE BODY */}
      <div className="case-body-wrap container">
        <TableOfContents slug={slug} />
        <article className="case-body">
          <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
        </article>
      </div>

      {/* RELATED */}
      {relatedPosts.length > 0 && (
        <MotionSection className="case-related container" as="section">
          <p className="eyebrow">More work</p>
          <h2>Related projects</h2>
          <motion.div
            className="related-grid"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {relatedPosts.map((post) => (
              <motion.div key={post.slug} variants={STAGGER_ITEM}>
                <Link href={`/work/${post.slug}`} className="related-card">
                  {post.hero && (
                    <div className="img-ph">
                      <Image src={post.hero} alt={post.title} fill sizes="400px" className="photo" />
                    </div>
                  )}
                  <div className="related-card-copy">
                    <p className="chip">{post.package}</p>
                    <h4>{post.title}</h4>
                    <p>{post.tagline}</p>
                    <span className="link-acc">View →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </MotionSection>
      )}

      <MotionSection className="final-cta container">
        <p className="eyebrow">Start something</p>
        <h2>Want results like these?</h2>
        <Link href="/contact" className="btn btn-primary">Start a project →</Link>
      </MotionSection>
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
