import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";
import { getAllJournalPosts, getJournalPost, type JournalFrontmatter } from "@/lib/journal";
import { PULL_QUOTE } from "@/lib/motion";

interface JournalSlugProps {
  frontmatter: JournalFrontmatter;
  mdxSource: MDXRemoteSerializeResult;
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

export default function JournalSlug({ frontmatter: fm, mdxSource, slug }: JournalSlugProps) {
  return (
    <>
      <SEO
        page="journal"
        customTitle={`${fm.title} — Massimiliano Angelone`}
        customDescription={fm.excerpt}
        ogImage={fm.coverImage}
        canonicalPath={`/journal/${slug}`}
      />

      {/* ARTICLE COVER */}
      {fm.coverImage && (
        <div className="article-cover container">
          <div className="img-ph">
            <Image
              src={fm.coverImage}
              alt={fm.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="photo"
              priority
            />
          </div>
        </div>
      )}

      {/* ARTICLE HEADER */}
      <MotionSection className="container article-header" as="div">
        <p className="eyebrow acc">{fm.category} · {fm.readTime} · {fm.date}</p>
        <h1>{fm.title}</h1>
        <p className="q">{fm.excerpt}</p>
      </MotionSection>

      {/* ARTICLE BODY */}
      <div className="container">
        <article className="article-body">
          <MDXRemote {...mdxSource} components={MDX_COMPONENTS} />
        </article>

        {/* ARTICLE FOOTER */}
        <footer className="article-footer">
          <div className="article-footer-author">
            <div className="img-ph">
              <Image src="/images/me-5.webp" alt="Massimiliano Angelone" fill sizes="64px" className="photo" />
            </div>
            <div>
              <strong>Massimiliano Angelone</strong>
              <p>AI-Enhanced MVP Developer · Tenerife</p>
            </div>
          </div>
          <Link href="/journal" className="link-acc">← Back to Journal</Link>
        </footer>
      </div>
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

  return { props: { frontmatter: post.frontmatter, mdxSource, slug } };
};
