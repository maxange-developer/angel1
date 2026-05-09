import type { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";
import { getAllJournalPosts, type JournalPost } from "@/lib/journal";
import { STAGGER_CONTAINER, STAGGER_ITEM, FADE_UP } from "@/lib/motion";

interface JournalIndexProps {
  pinned: JournalPost | null;
  others: JournalPost[];
  total: number;
}

export default function JournalIndex({ pinned, others, total }: JournalIndexProps) {
  return (
    <>
      <SEO page="journal" canonicalPath="/journal" />

      <section className="container page-hero">
        <MotionSection as="div">
          <motion.div className="top" variants={FADE_UP}>
            <div>
              <span className="eyebrow">Writing</span>
              <h1>
                Notes<span className="q">.</span>
              </h1>
            </div>
            <span className="meta">{String(total).padStart(2, "0")} pieces</span>
          </motion.div>
          <motion.p className="sub" variants={FADE_UP}>
            Long-form pieces on engineering, freelancing and the personal story
            most people read first.
          </motion.p>
        </MotionSection>
      </section>

      <div className="container blog-index">
        {/* PINNED */}
        {pinned && (
          <MotionSection className="blog-pinned" as="article">
            <div className="img-ph">
              {pinned.frontmatter.coverImage && (
                <Image
                  src={pinned.frontmatter.coverImage}
                  alt={pinned.frontmatter.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  style={{ objectFit: "cover" }}
                  priority
                />
              )}
            </div>
            <div>
              <span className="pin">★ Pinned · {pinned.frontmatter.category}</span>
              <div className="meta">
                {pinned.frontmatter.date} · {pinned.frontmatter.category} ·{" "}
                {pinned.frontmatter.readTime}
              </div>
              <h2>
                {pinned.frontmatter.title}
                <span className="acc">.</span>
              </h2>
              <p className="excerpt">{pinned.frontmatter.excerpt}</p>
              <Link
                href={`/journal/${pinned.slug}`}
                className="btn btn-secondary cta"
              >
                Read full story <span className="arr">→</span>
              </Link>
            </div>
          </MotionSection>
        )}

        {/* OTHERS */}
        {others.length > 0 && (
          <motion.div
            className="blog-other"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {others.map((post) => (
              <motion.div key={post.slug} variants={STAGGER_ITEM}>
                <Link href={`/journal/${post.slug}`} className="card blog-tile">
                  <div className="meta">
                    {post.frontmatter.date} · {post.frontmatter.category} ·{" "}
                    {post.frontmatter.readTime}
                  </div>
                  <h3>
                    {post.frontmatter.title}
                    <span className="q">.</span>
                  </h3>
                  <p>{post.frontmatter.excerpt}</p>
                  <span className="more link-acc">
                    Read <span>→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllJournalPosts();
  const pinned = posts.find((p) => p.frontmatter.pinned) ?? posts[0] ?? null;
  const others = posts.filter((p) => p !== pinned);
  return { props: { pinned, others, total: posts.length } };
};
