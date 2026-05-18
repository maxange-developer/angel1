import { useEffect, useState } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import MermaidDiagram from "@/components/MermaidDiagram";
import { getAllWorkSlugs, getWorkPost, type WorkFrontmatter } from "@/lib/mdx";

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
    <Reveal as="blockquote" variant="pull-quote" className="pull-quote" {...(props as object)} />
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
        customTitle={`${fm.title} · Massimiliano Angelone`}
        customDescription={fm.tagline}
        ogImage={fm.hero}
        canonicalPath={`/work/${slug}`}
      />

      {/* CASE HERO */}
      <section className="container case-hero">
        <div className="mount-stagger">
          <span className="crumbs">
            Work / {fm.title}
          </span>
          <h1>
            {fm.title}
          </h1>
          <p className="tagline">
            {fm.tagline}
          </p>
          <div className="meta">
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
          </div>
          {(fm.demo || fm.github) && (
            <div className="ctas">
              {fm.demo && (
                <a
                  href={fm.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  {fm.demo.includes("npmjs.com") ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/>
                      </svg>
                      View on npm
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      Live demo
                    </>
                  )}
                  <span className="arr">→</span>
                </a>
              )}
              {fm.github && (
                <a
                  href={fm.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CASE COVER */}
      {fm.hero && (
        <div className="case-cover">
          <div className="img-ph">
            {fm.heroFull?.endsWith(".svg") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={fm.heroFull}
                alt={fm.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <Image
                src={fm.heroFull ?? fm.hero}
                alt={fm.title}
                fill
                sizes="100vw"
                style={{ objectFit: "cover" }}
                priority
              />
            )}
          </div>
        </div>
      )}

      {/* CASE STATS */}
      {fm.stats && fm.stats.length > 0 && (
        <div className="container case-stats">
          <Reveal className="grid" as="div" variant="stagger">
            {fm.stats.map((stat) => {
              const { num, unit } = splitStatValue(stat.value);
              return (
                <div
                  key={stat.label}
                  className="card case-stat"
                >
                  <div className="v">
                    {num}
                    {unit && <span className="unit">{unit}</span>}
                  </div>
                  <div className="k">{stat.label}</div>
                </div>
              );
            })}
          </Reveal>
        </div>
      )}

      {/* CASE BODY */}
      <Reveal className="container case-body-wrap" as="div" variant="fade-up">
        <TableOfContents slug={slug} />
        <article className="case-body">
          <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
        </article>
      </Reveal>

      {/* RELATED */}
      {relatedPosts.length > 0 && (
        <section className="container case-related">
          <span className="eyebrow">Continue exploring</span>
          <h2>
            Related work
          </h2>
          <Reveal className="grid" as="div" variant="stagger">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/work/${post.slug}`}
                className="card related-card"
              >
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
                  <h3>{post.title}</h3>
                  <p>{post.tagline}</p>
                </div>
              </Link>
            ))}
          </Reveal>
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
    .slice(0, 3);

  return {
    props: {
      frontmatter: post.frontmatter,
      mdxSource,
      relatedPosts: allPosts,
      slug,
    },
  };
};
