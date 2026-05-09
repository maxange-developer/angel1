import type { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";
import { getAllWorkPosts, type WorkFrontmatter } from "@/lib/mdx";
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
}

interface WorkIndexProps {
  posts: WorkRow[];
}

const CORNER_NUMS: Record<string, string> = {
  "01-ai-support-dashboard": "01",
  "03-email-triage": "02",
  "04-claude-mvp-toolkit": "03",
};

export default function WorkIndex({ posts }: WorkIndexProps) {
  return (
    <>
      <SEO page="work" canonicalPath="/work" />

      <section className="page-hero container">
        <MotionSection>
          <motion.p className="eyebrow" variants={FADE_UP}>Selected work</motion.p>
          <motion.h1 variants={FADE_UP}>Production-grade.<br />AI-enhanced.</motion.h1>
          <motion.p className="q" variants={FADE_UP}>
            Three case studies. Real clients, real constraints, real outcomes.
            Fixed price, shipped to production.
          </motion.p>
        </MotionSection>
      </section>

      <MotionSection className="container" as="div">
        <motion.div
          className="case-list"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {posts.map((post, i) => {
            const corner = CORNER_NUMS[post.slug] ?? String(i + 1).padStart(2, "0");
            return (
              <motion.div key={post.slug} variants={STAGGER_ITEM}>
                <Link href={`/work/${post.slug}`} className="case-row">
                  <span className="case-row-num">{corner}</span>
                  <div className="case-row-body">
                    <div className="case-row-meta">
                      <span className="chip">{post.package}</span>
                      <span className="chip">{post.client}</span>
                    </div>
                    <h2 className="case-row-title">{post.title}</h2>
                    <p className="case-row-tagline">{post.tagline}</p>
                    <div className="case-row-stack">
                      {post.stack.slice(0, 4).map((s) => (
                        <span key={s} className="chip">{s}</span>
                      ))}
                    </div>
                  </div>
                  {post.hero && (
                    <div className="case-row-thumb">
                      <div className="img-ph">
                        <Image
                          src={post.hero}
                          alt={post.title}
                          fill
                          sizes="320px"
                          className="photo"
                        />
                      </div>
                    </div>
                  )}
                  <span className="case-row-arrow link-acc">View case study →</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </MotionSection>

      <MotionSection className="final-cta container">
        <p className="eyebrow">Start something</p>
        <h2>Want to be next?</h2>
        <p>Fixed price. No retainer. Production-grade.</p>
        <Link href="/contact" className="btn btn-primary">Start a project →</Link>
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
  }));

  return { props: { posts } };
};
