import type { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";
import { getAllWorkPosts } from "@/lib/mdx";
import { STAGGER_CONTAINER, STAGGER_ITEM, FADE_UP } from "@/lib/motion";

interface WorkRow {
  slug: string;
  title: string;
  tagline: string;
  package: string;
  date: string;
  client: string;
  stack: string[];
  hero: string | null;
  stats: Array<{ label: string; value: string }>;
}

interface WorkIndexProps {
  posts: WorkRow[];
}

export default function WorkIndex({ posts }: WorkIndexProps) {
  const total = posts.length;

  return (
    <>
      <SEO page="work" canonicalPath="/work" />

      <section className="container page-hero">
        <MotionSection as="div">
          <motion.div className="top" variants={FADE_UP}>
            <div>
              <span className="eyebrow">Portfolio</span>
              <h1>
                Work<span className="q">.</span>
              </h1>
            </div>
            <span className="meta">{String(total).padStart(2, "0")} projects</span>
          </motion.div>
          <motion.p className="sub" variants={FADE_UP}>
            Shipped engagements. Each one fixed-price, fixed-timeline, deployed
            to production. The case studies tell the rest — the metrics, the
            trade-offs, the things I&apos;d do differently next time.
          </motion.p>
        </MotionSection>
      </section>

      <MotionSection className="container case-list" as="div">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              className="case-row"
              variants={STAGGER_ITEM}
            >
              <div className="img-ph">
                {post.hero && (
                  <Image
                    src={post.hero}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
              <div>
                <span className="meta-row">
                  {post.date} · {post.package} · {post.client}
                </span>
                <h3>{post.title}.</h3>
                <p className="tagline">{post.tagline}</p>
                {post.stack.length > 0 && (
                  <div className="stack">
                    {post.stack.slice(0, 4).map((s) => (
                      <span key={s} className="chip">
                        <span className="ddot" />
                        {s.toUpperCase()}
                      </span>
                    ))}
                  </div>
                )}
                {post.stats.length > 0 && (
                  <div className="metrics">
                    {post.stats.slice(0, 3).map((stat) => (
                      <div key={stat.label} className="metric">
                        <div className="k">{stat.label}</div>
                        <div className="v">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                )}
                <Link href={`/work/${post.slug}`} className="btn btn-secondary read">
                  Read case study <span className="arr">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </MotionSection>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts: WorkRow[] = getAllWorkPosts().map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    tagline: p.frontmatter.tagline,
    package: p.frontmatter.package,
    date: p.frontmatter.date,
    client: p.frontmatter.client,
    stack: p.frontmatter.stack,
    hero: p.frontmatter.hero ?? null,
    stats: p.frontmatter.stats ?? [],
  }));

  return { props: { posts } };
};
