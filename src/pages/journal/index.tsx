import type { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import { getAllJournalPosts, type JournalPost } from "@/lib/journal";

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
        <div className="mount-stagger">
          <div className="top">
            <div>
              <span className="eyebrow">Writing</span>
              <h1>
                Journal<span className="acc">.</span>
              </h1>
            </div>
            <span className="meta">{String(total).padStart(2, "0")} pieces</span>
          </div>
          <p className="sub">
            Notes on building AI products, working solo, and what I&apos;ve
            learned shipping under constraints I didn&apos;t choose.
          </p>
        </div>
      </section>

      <div className="container blog-index">
        {/* PINNED */}
        {pinned && (
          <Reveal className="blog-pinned" as="article" variant="fade-up">
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
              <h2>{pinned.frontmatter.title}</h2>
              <p className="excerpt">{pinned.frontmatter.excerpt}</p>
              <Link
                href={`/journal/${pinned.slug}`}
                className="btn btn-secondary cta"
              >
                Read full story <span className="arr">→</span>
              </Link>
            </div>
          </Reveal>
        )}

        {/* OTHERS */}
        {others.length > 0 && (
          <Reveal className="blog-other" as="div" variant="stagger">
            {others.map((post) => (
              <div key={post.slug}>
                <Link href={`/journal/${post.slug}`} className="card blog-tile">
                  <div className="meta">
                    {post.frontmatter.date} · {post.frontmatter.category} ·{" "}
                    {post.frontmatter.readTime}
                  </div>
                  <h3>{post.frontmatter.title}</h3>
                  <p>{post.frontmatter.excerpt}</p>
                  <span className="more link-acc">
                    Read <span>→</span>
                  </span>
                </Link>
              </div>
            ))}
          </Reveal>
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
