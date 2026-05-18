import Head from "next/head";

const BASE_URL = "https://massimilianoangelone.com";

const SEO_DATA: Record<string, { title: string; description: string; keywords: string }> = {
  home: {
    title: "AI MVP Developer · Massimiliano Angelone",
    description: "One engineer, fixed price, production-grade. AI-Enhanced MVPs for founders and scale-ups worldwide. Ship in weeks, not months.",
    keywords: "AI developer, MVP development, Next.js, TypeScript, freelance developer, production-grade, fixed price",
  },
  work: {
    title: "AI MVP Case Studies · Massimiliano Angelone",
    description: "Production-grade AI-enhanced MVPs. Case studies for real founders and real products.",
    keywords: "portfolio, case studies, AI projects, MVP, Next.js, TypeScript",
  },
  services: {
    title: "AI MVP Development Packages · Massimiliano Angelone",
    description: "Three productized AI MVP packages in USD: Validation MVP ($1,500/5-7 days), Launch MVP ($3,500/2-3 weeks), Scale MVP ($7,500/4-5 weeks). Fixed price, fixed scope, full ownership transfer.",
    keywords: "freelance services, MVP packages, fixed price, AI development, Next.js",
  },
  about: {
    title: "About · Massimiliano Angelone, AI MVP Developer",
    description: "24, based in Tenerife. Building AI-enhanced products for founders worldwide since 2022.",
    keywords: "about, Massimiliano Angelone, freelance developer, Tenerife, background",
  },
  journal: {
    title: "Engineering Notes · Massimiliano Angelone",
    description: "Long-form writing on AI development, product thinking, and the freelance craft.",
    keywords: "blog, notes, AI development, freelance, product, writing",
  },
  contact: {
    title: "Contact · Start an AI MVP Project",
    description: "Start an AI MVP project or book a free 30-min intro call. Fixed-price productized engagements for founders and scale-ups worldwide.",
    keywords: "contact, hire, freelance, start a project",
  },
  now: {
    title: "Now · Massimiliano Angelone",
    description: "What I'm focused on right now — current projects, location, recent reads. Updated every 1–2 months from Tenerife.",
    keywords: "now, current projects, focus, what I'm doing",
  },
  "404": {
    title: "Page not found · Massimiliano Angelone",
    description: "Page not found.",
    keywords: "",
  },
};

interface SEOProps {
  page: keyof typeof SEO_DATA;
  customTitle?: string;
  customDescription?: string;
  ogImage?: string;
  canonicalPath?: string;
  isArticle?: boolean;
}

export default function SEO({
  page,
  customTitle,
  customDescription,
  ogImage,
  canonicalPath,
  isArticle,
}: SEOProps) {
  const data = SEO_DATA[page] ?? SEO_DATA.home;
  const title = customTitle ?? data.title;
  const description = customDescription ?? data.description;
  const canonical = canonicalPath != null ? `${BASE_URL}${canonicalPath}` : null;

  const ogImageUrl = ogImage
    ? `${BASE_URL}${ogImage}`
    : `${BASE_URL}/og-image.png`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Massimiliano Angelone",
    jobTitle: "AI-Enhanced MVP Developer",
    url: BASE_URL,
    image: `${BASE_URL}/images/me-5.webp`,
    sameAs: [
      "https://www.linkedin.com/in/massiangelone/",
      "https://github.com/maxange-developer",
      "https://www.instagram.com/massi_angelone/",
      "https://www.npmjs.com/~massiangelone",
      "https://www.freelancer.com/u/massiangel1",
    ],
  };

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {data.keywords && <meta name="keywords" content={data.keywords} />}
      <meta name="author" content="Massimiliano Angelone" />
      <meta name="robots" content="index, follow" />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content={isArticle ? "article" : "website"} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* JSON-LD */}
      {page === "home" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      )}
    </Head>
  );
}
