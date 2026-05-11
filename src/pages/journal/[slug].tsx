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

const MDX_COMPONENTS = {
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <Reveal as="blockquote" variant="pull-quote" className="article-pull" {...(props as object)} />
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
          style={{ position: "relative", maxHeight: "420px", overflow: "hidden" }}
        >
          {fm.coverImage && (
            <Image
              src={fm.coverImage}
              alt={fm.title}
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
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
            <Reveal className="grid" as="div" variant="stagger">
              {related.map((post) => (
                <div key={post.slug}>
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
                </div>
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
