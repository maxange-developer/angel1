import type { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";
import { getAllJournalPosts, type JournalPost } from "@/lib/journal";
import { STAGGER_CONTAINER, STAGGER_ITEM } from "@/lib/motion";

interface JournalIndexProps {
  pinned: JournalPost | null;
  others: JournalPost[];
}

export default function JournalIndex({ pinned, others }: JournalIndexProps) {
  return (
    <>
      <SEO page="journal" canonicalPath="/journal" />

      <section className="page-hero container">
        <MotionSection>
          <p className="eyebrow">Journal</p>
          <h1>Long-form writing.</h1>
          <p className="q">
            On building AI products, the freelance craft, and things I&apos;m
            figuring out as I go.
          </p>
        </MotionSection>
      </section>

      <div className="container blog-index">
        {/* Pinned */}
        {pinned && (
          <MotionSection className="blog-pinned" as="div">
            <Link href={`/journal/${pinned.slug}`} className="blog-pinned-inner">
              {pinned.frontmatter.coverImage && (
                <div className="blog-pinned-cover">
                  <div className="img-ph">
                    <Image
                      src={pinned.frontmatter.coverImage}
                      alt={pinned.frontmatter.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="photo"
                      priority
                    />
                  </div>
                </div>
              )}
              <div className="blog-pinned-copy">
                <p className="eyebrow acc">{pinned.frontmatter.category} · {pinned.frontmatter.readTime}</p>
                <h2>{pinned.frontmatter.title}</h2>
                <p>{pinned.frontmatter.excerpt}</p>
                <span className="link-acc">Read story →</span>
              </div>
            </Link>
          </MotionSection>
        )}

        {/* Others */}
        {others.length > 0 && (
          <MotionSection className="blog-other" as="div">
            <motion.div
              className="blog-tile-grid"
              variants={STAGGER_CONTAINER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {others.map((post) => (
                <motion.div key={post.slug} variants={STAGGER_ITEM}>
                  <Link href={`/journal/${post.slug}`} className="blog-tile">
                    {post.frontmatter.coverImage && (
                      <div className="img-ph">
                        <Image
                          src={post.frontmatter.coverImage}
                          alt={post.frontmatter.title}
                          fill
                          sizes="400px"
                          className="photo"
                        />
                      </div>
                    )}
                    <div className="blog-tile-copy">
                      <p className="chip">{post.frontmatter.category}</p>
                      <h3>{post.frontmatter.title}</h3>
                      <p>{post.frontmatter.excerpt}</p>
                      <span className="link-acc">Read →</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </MotionSection>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllJournalPosts();
  const pinned = posts.find((p) => p.frontmatter.pinned) ?? posts[0] ?? null;
  const others = posts.filter((p) => p !== pinned);
  return { props: { pinned, others } };
};
