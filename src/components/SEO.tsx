import Head from "next/head";

const BASE_URL = "https://massimilianoangelone.com";

const SEO_DATA: Record<string, { title: string; description: string; keywords: string }> = {
  home: {
    title: "Massimiliano Angelone — AI-Enhanced MVP Developer",
    description: "One engineer, fixed price, production-grade. AI-powered MVPs for founders and scale-ups. Ship in weeks, not months.",
    keywords: "AI developer, MVP development, Next.js, TypeScript, freelance developer, production-grade, fixed price",
  },
  work: {
    title: "Work — Massimiliano Angelone",
    description: "Production-grade AI-enhanced MVPs. Case studies for real founders and real products.",
    keywords: "portfolio, case studies, AI projects, MVP, Next.js, TypeScript",
  },
  services: {
    title: "Services — Massimiliano Angelone",
    description: "Choose your engagement: AI Sprint €2,500 · MVP Lite €5,000 · MVP Full €9,500. Fixed price, no surprises.",
    keywords: "freelance services, MVP packages, fixed price, AI development, Next.js",
  },
  about: {
    title: "About — Massimiliano Angelone",
    description: "24, based in Tenerife. Building AI-enhanced products for founders worldwide since 2022.",
    keywords: "about, Massimiliano Angelone, freelance developer, Tenerife, background",
  },
  journal: {
    title: "Journal — Massimiliano Angelone",
    description: "Long-form writing on AI development, product thinking, and the freelance craft.",
    keywords: "blog, notes, AI development, freelance, product, writing",
  },
  contact: {
    title: "Contact — Massimiliano Angelone",
    description: "Start a project or just say hello.",
    keywords: "contact, hire, freelance, start a project",
  },
  now: {
    title: "Now — Massimiliano Angelone",
    description: "What I'm focused on right now.",
    keywords: "now, current projects, focus, what I'm doing",
  },
  uses: {
    title: "Uses — Massimiliano Angelone",
    description: "Tools, gear, and software I use daily.",
    keywords: "uses, tools, setup, gear, software, developer setup",
  },
  "404": {
    title: "404 — Massimiliano Angelone",
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
}

export default function SEO({
  page,
  customTitle,
  customDescription,
  ogImage,
  canonicalPath,
}: SEOProps) {
  const data = SEO_DATA[page] ?? SEO_DATA.home;
  const title = customTitle ?? data.title;
  const description = customDescription ?? data.description;
  const canonical = `${BASE_URL}${canonicalPath ?? ""}`;

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
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
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
