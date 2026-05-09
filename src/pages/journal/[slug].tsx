import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import {
  getAllJournalPosts,
  getJournalPost,
  type JournalFrontmatter,
} from "@/lib/journal";
import { PULL_QUOTE, STAGGER_CONTAINER, STAGGER_ITEM } from "@/lib/motion";

interface RelatedJournal {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  coverImage: string;
}

interface JournalSlugProps {
  frontmatter: JournalFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
  related: RelatedJournal[];
  slug: string;
}

const MDX_COMPONENTS = {
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <motion.blockquote
      className="article-pull"
      variants={PULL_QUOTE}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      {...(props as object)}
    />
  ),
};

export default function JournalSlug({
  frontmatter: fm,
  mdxSource,
  related,
  slug,
}: JournalSlugProps) {
  return (
    <>
      <SEO
        page="journal"
        customTitle={`${fm.title} — Massimiliano Angelone`}
        customDescription={fm.excerpt}
        ogImage={fm.coverImage}
        canonicalPath={`/journal/${slug}`}
      />

      {/* ARTICLE COVER — edge-to-edge with overlay */}
      <div className="article-cover">
        <div
          className="img-ph"
          style={{ maxHeight: "600px", position: "relative", overflow: "hidden" }}
        >
          {fm.coverImage && (
            <Image
              src={fm.coverImage}
              alt={fm.title}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority
            />
          )}
        </div>
        <div className="overlay">
          <div className="container">
            <span className="crumbs">Blog / {fm.title}</span>
            <h1>
              {fm.title}
              <span className="acc">.</span>
            </h1>
            <div className="meta">
              <span>{fm.category}</span>
              <span>{fm.readTime}</span>
              <span>{fm.date}</span>
            </div>
            <div className="byline">
              By Massimiliano Angelone — Tenerife
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLE BODY */}
      <article className="article-body">
        <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
      </article>

      {/* ARTICLE FOOTER */}
      {related.length > 0 && (
        <div className="article-footer">
          <div className="container">
            <h3>
              Continue reading
            </h3>
            <motion.div
              className="grid"
              variants={STAGGER_CONTAINER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {related.map((post) => (
                <motion.div key={post.slug} variants={STAGGER_ITEM}>
                  <Link
                    href={`/journal/${post.slug}`}
                    className="card related-card"
                  >
                    <div className="img-ph">
                      {post.coverImage && (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          sizes="400px"
                          style={{ objectFit: "cover" }}
                        />
                      )}
                    </div>
                    <div className="body">
                      <h4>{post.title}</h4>
                      <p>{post.excerpt}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllJournalPosts();
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = getJournalPost(slug);

  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      rehypePlugins: [rehypeHighlight as never],
    },
  });

  const related: RelatedJournal[] = getAllJournalPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.frontmatter.title,
      excerpt: p.frontmatter.excerpt,
      date: p.frontmatter.date,
      category: p.frontmatter.category,
      readTime: p.frontmatter.readTime,
      coverImage: p.frontmatter.coverImage,
    }));

  return {
    props: { frontmatter: post.frontmatter, mdxSource, related, slug },
  };
};
