import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import React from "react";
import SEO from "@/components/SEO";
import blogPosts from "@/data/blog-posts.json";
import storyData from "@/data/la-mia-storia.json";
import Footer from "@/components/Footer";
import {
  Calendar,
  ArrowLeft,
  Tag,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
});

interface ChapterImage {
  src: string;
  alt: string;
}

interface Chapter {
  title: string;
  content: string;
  images: ChapterImage[];
}

interface StoryPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  category: string;
  chapters: Chapter[];
}

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage: string;
  gallery?: string[];
  category: string;
  pinned?: boolean;
}

interface BlogPostProps {
  post: BlogPost | StoryPost;
}

export default function BlogPost({ post }: BlogPostProps) {
  const isStory = post.slug === "la-mia-storia";

  return (
    <>
      <SEO
        page="blog"
        customTitle={post.title}
        customDescription={post.excerpt}
        image={post.coverImage}
      />
      <ThreeBackground />
      <article className="h-screen overflow-y-auto pb-32 scrollbar-hide mt-6 max-md:landscape:mt-3">
        {/* Top Bar: Back Button, Category, Date */}
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl pb-4">
          <div className="flex items-center justify-between gap-4">
            {/* Back Button - Left */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 max-[400px]:gap-1 text-xs max-[400px]:text-[10px] sm:text-base text-white/70 hover:text-neon-pink transition-colors duration-300"
            >
              <ArrowLeft
                className="max-[400px]:w-3 max-[400px]:h-3"
                size={20}
              />
              Torna al blog
            </Link>

            {/* Category - Center */}
            <span className="px-2 max-[400px]:px-1.5 sm:px-4 py-1 max-[400px]:py-0.5 bg-neon-pink/20 border border-neon-pink/50 rounded-full text-neon-pink text-xs max-[400px]:text-[9px] sm:text-sm flex items-center gap-1 max-[400px]:gap-0.5">
              <Tag className="max-[400px]:w-2.5 max-[400px]:h-2.5" size={12} />
              {post.category}
            </span>

            {/* Date - Right */}
            <span className="flex items-center gap-1 max-[400px]:gap-0.5 text-xs max-[400px]:text-[9px] sm:text-sm text-white/50">
              <Calendar className="max-[400px]:w-3 max-[400px]:h-3" size={16} />
              {new Date(post.date).toLocaleDateString("it-IT", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl pb-6">
          {/* Header */}
          <header className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="neon-text">{post.title}</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Cover Image */}
          <div className="relative h-64 sm:h-64 md:h-80 lg:h-[480px] rounded-lg overflow-hidden mb-8 sm:mb-12">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              style={{ objectPosition: "center 55%" }}
              priority
            />
          </div>

          {/* Content */}
          {isStory ? (
            <div className="max-w-none mb-8 sm:mb-12">
              {(post as StoryPost).chapters.map((chapter, index) => (
                <div key={index} className="mb-12">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
                    {chapter.title}
                  </h3>

                  {chapter.content.split("\n\n").map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-white/80 leading-relaxed mb-6 text-base sm:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {chapter.images.length > 0 && (
                    <div
                      className={`my-8 ${
                        chapter.images.length > 1
                          ? "grid grid-cols-2 gap-4"
                          : ""
                      }`}
                    >
                      {chapter.images.map((image, imgIndex) => (
                        <Image
                          key={imgIndex}
                          src={image.src}
                          alt={image.alt}
                          width={800}
                          height={600}
                          style={
                            imgIndex === 1 && chapter.images.length > 1
                              ? { objectPosition: "center 40%" }
                              : chapter.images.length === 1
                              ? { objectPosition: "center 55%" }
                              : undefined
                          }
                          className={`w-full rounded-lg ${
                            chapter.images.length === 1
                              ? "h-[500px] object-cover"
                              : imgIndex === 0
                              ? "h-64 object-cover"
                              : "h-64 object-cover object-top"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="prose prose-invert prose-sm sm:prose-base md:prose-lg max-w-none mb-8 sm:mb-12">
              <div className="text-white/80 leading-relaxed">
                {(post as BlogPost).content
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p key={index} className="mb-6">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {!isStory &&
            (post as BlogPost).gallery &&
            (post as BlogPost).gallery!.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-neon-blue">
                  Galleria
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {(post as BlogPost).gallery!.map(
                    (image: string, index: number) => (
                      <div
                        key={index}
                        className="relative h-64 rounded-lg overflow-hidden group"
                      >
                        <Image
                          src={image}
                          alt={`${post.title} - ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
        </div>
      </article>

      {/* Social Buttons - Fixed Bottom Right (Desktop Only) */}
      <div className="hidden md:flex fixed bottom-6 right-6 flex-col gap-3 z-40">
        <a
          href="https://www.instagram.com/massi_angelone/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 glass rounded-full flex items-center justify-center border border-neon-pink/50 hover:border-neon-pink hover:bg-neon-pink/20 transition-all duration-300 group"
          aria-label="Instagram"
        >
          <Instagram className="text-neon-pink" size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/massiangelone/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 glass rounded-full flex items-center justify-center border border-neon-blue/50 hover:border-neon-blue hover:bg-neon-blue/20 transition-all duration-300 group"
          aria-label="LinkedIn"
        >
          <Linkedin className="text-neon-blue" size={20} />
        </a>
        <a
          href="mailto:massiangelone01@gmail.com"
          className="w-12 h-12 glass rounded-full flex items-center justify-center border border-neon-green/50 hover:border-neon-green hover:bg-neon-green/20 transition-all duration-300 group"
          aria-label="Email"
        >
          <Mail className="text-neon-green" size={20} />
        </a>
      </div>

      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Check if it's the special story post
  if (params?.slug === "la-mia-storia") {
    return {
      props: {
        post: storyData,
      },
    };
  }

  const post = blogPosts.find((p) => p.slug === params?.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
