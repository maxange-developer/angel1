import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import SEO from "@/components/SEO";
import blogPosts from "@/data/blog-posts.json";
import blogTranslations from "@/data/blog-translations.json";
import { useTranslation } from "@/hooks/useTranslation";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
});
import {
  Calendar,
  Pin,
  ArrowRight,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  category: string;
  pinned?: boolean;
}

interface BlogProps {
  pinnedPost: BlogPost | null;
  posts: BlogPost[];
}

export default function Blog({ pinnedPost, posts }: BlogProps) {
  const { t, currentLang } = useTranslation();

  const getTranslatedBlogContent = (
    slug: string,
    field: "title" | "excerpt" | "category"
  ) => {
    const translations = blogTranslations as any;
    return translations[slug]?.[field]?.[currentLang] || "";
  };

  return (
    <>
      <SEO page="blog" />
      <ThreeBackground />
      <section className="min-h-screen max-h-820:h-screen overflow-y-auto pt-4 sm:pt-8 max-md:landscape:pt-2 pb-32">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="neon-text">BLOG</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
              {t("blog.subtitle")}
            </p>
          </div>

          {/* Pinned Post */}
          {pinnedPost && (
            <div className="mb-12 sm:mb-16 blog-vertical:max-w-2xl blog-vertical:mx-auto">
              <div className="glass p-4 sm:p-6 lg:p-8 rounded-lg border-2 border-neon-pink hover-lift group">
                <div className="flex items-center gap-2 mb-4">
                  <Pin className="text-neon-pink" size={20} />
                  <span className="text-neon-pink font-semibold uppercase text-xs sm:text-sm tracking-wide">
                    Storia in evidenza
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 blog-vertical:grid-cols-1 gap-6 sm:gap-8">
                  {/* Image */}
                  <div className="relative h-64 md:h-96 blog-vertical:h-72 rounded overflow-hidden">
                    <Image
                      src={pinnedPost.coverImage}
                      alt={pinnedPost.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 group-hover:text-neon-pink transition-colors duration-300">
                      {getTranslatedBlogContent(pinnedPost.slug, "title")}
                    </h2>

                    <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                      {getTranslatedBlogContent(pinnedPost.slug, "excerpt")}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-white/50 mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {new Date(pinnedPost.date).toLocaleDateString("it-IT", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="px-3 py-1 bg-neon-pink/20 border border-neon-pink/50 rounded-full text-neon-pink">
                        {getTranslatedBlogContent(pinnedPost.slug, "category")}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${pinnedPost.slug}`}
                      className="inline-flex items-center gap-2 text-neon-pink font-semibold hover:gap-4 transition-all duration-300"
                    >
                      {t("blog.readFull")}
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

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
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pinnedPost = blogPosts.find((post) => post.pinned) || null;
  const posts = blogPosts.filter((post) => !post.pinned);

  return {
    props: {
      pinnedPost,
      posts,
    },
  };
};
