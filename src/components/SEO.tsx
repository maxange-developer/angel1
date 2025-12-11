import Head from "next/head";
import { useTranslation } from "@/hooks/useTranslation";
import seoData from "@/data/seo.json";

interface SEOProps {
  page: "home" | "services" | "blog" | "timeline";
  customTitle?: string;
  customDescription?: string;
  image?: string;
}

export default function SEO({
  page,
  customTitle,
  customDescription,
  image = "/images/me-5.PNG",
}: SEOProps) {
  const { currentLang } = useTranslation();
  const seo = (seoData as any)[currentLang][page];

  const title = customTitle || seo.title;
  const description = customDescription || seo.description;
  const url = `https://massimilianoangeli.com/${
    currentLang === "it" ? "" : currentLang
  }`;
  const imageUrl = image.startsWith("http")
    ? image
    : `https://massimilianoangeli.com${image}`;

  // JSON-LD Schema for Person (homepage)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Massimiliano Angelone",
    jobTitle: "Full Stack Developer",
    url: "https://massimilianoangelone.com",
    image: "https://massimilianoangelone.com/images/me-5.PNG",
    sameAs: [
      "https://www.linkedin.com/in/massimiliano-angelone",
      "https://www.instagram.com/massimiliano.angelone",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Full Stack Development",
      "Mobile Development",
      "AI Development",
    ],
    address: [
      {
        "@type": "PostalAddress",
        addressLocality: "Ancona",
        addressCountry: "IT",
      },
      {
        "@type": "PostalAddress",
        addressLocality: "Tenerife",
        addressCountry: "ES",
      },
    ],
  };

  // JSON-LD Schema for Website
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Massimiliano Angelone",
    url: "https://massimilianoangelone.com",
    description: description,
    inLanguage: [
      currentLang === "it" ? "it-IT" : currentLang === "en" ? "en-US" : "es-ES",
    ],
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content="Massimiliano Angelone" />
      <meta name="robots" content="index, follow" />
      <meta
        name="language"
        content={
          currentLang === "it"
            ? "Italian"
            : currentLang === "en"
            ? "English"
            : "Spanish"
        }
      />
      <meta name="revisit-after" content="7 days" />

      {/* Geo Tags for Italy & Tenerife */}
      <meta name="geo.region" content="IT" />
      <meta name="geo.placename" content="Ancona, Italy" />
      <meta name="geo.region" content="ES-CN" />
      <meta name="geo.placename" content="Tenerife, Spain" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seo["og:title"]} />
      <meta property="og:description" content={seo["og:description"]} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta
        property="og:locale"
        content={
          currentLang === "it"
            ? "it_IT"
            : currentLang === "en"
            ? "en_US"
            : "es_ES"
        }
      />
      <meta property="og:locale:alternate" content="it_IT" />
      <meta property="og:locale:alternate" content="en_US" />
      <meta property="og:locale:alternate" content="es_ES" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={seo["og:title"]} />
      <meta property="twitter:description" content={seo["og:description"]} />
      <meta property="twitter:image" content={imageUrl} />
      <meta property="twitter:image:alt" content={title} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Alternate Languages */}
      <link
        rel="alternate"
        hrefLang="it"
        href="https://massimilianoangelone.com/"
      />
      <link
        rel="alternate"
        hrefLang="en"
        href="https://massimilianoangelone.com/en"
      />
      <link
        rel="alternate"
        hrefLang="es"
        href="https://massimilianoangelone.com/es"
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href="https://massimilianoangelone.com/"
      />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Viewport */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
      />

      {/* Theme Color */}
      <meta name="theme-color" content="#000000" />

      {/* JSON-LD Structured Data */}
      {page === "home" && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
        </>
      )}
    </Head>
  );
}
