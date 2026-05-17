import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import {
  getAllJournalPosts,
  getJournalPost,
  type JournalFrontmatter,
} from "@/lib/journal";

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

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
};

const MDX_COMPONENTS = {
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <Reveal
      as="blockquote"
      variant="fade-up"
      className="article-pull"
      {...(props as object)}
    />
  ),
  Figure: ({ src, alt, caption, aspect = "16 / 9" }: FigureProps) => (
    <Reveal as="figure" variant="fade-up" className="article-figure">
      <div
        className="article-figure-img"
        style={{ aspectRatio: aspect, position: "relative" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1020px) 100vw, 1020px"
          style={{ objectFit: "cover" }}
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </Reveal>
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

      {/* ARTICLE COVER — banner edge-to-edge */}
      <div className="article-cover">
        <div className="article-cover-img">
          {fm.coverImage && (
            <Image
              src={fm.coverImage}
              alt={fm.title}
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 40%" }}
              priority
            />
          )}
        </div>
        <div className="overlay">
          <div className="container mount-stagger">
            <span className="crumbs">Journal / {fm.title}</span>
            <h1>
              {fm.title}
              <span className="acc">.</span>
            </h1>
            <div className="meta">
              <span>{fm.category}</span>
              <span>{fm.readTime}</span>
              <span>{fm.date}</span>
            </div>
            <div className="byline">By Massimiliano Angelone — Tenerife</div>
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
            <span className="eyebrow">Continue exploring</span>
            <h3>Continue reading</h3>
            <Reveal className="grid" as="div" variant="stagger">
              {related.map((post) => (
                <Link
                  key={post.slug}
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
              ))}
            </Reveal>
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
