import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Layout from "@/components/Layout";
import { LanguageProvider } from "@/contexts/LanguageContext";
import timelineData from "@/data/timeline.json";
import storyData from "@/data/la-mia-storia.json";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Only preload images in production for performance
    if (process.env.NODE_ENV !== "production") {
      console.log("⚡ Development mode: image preloading disabled");
      return;
    }

    // Extract all images from timeline
    const timelineImages = timelineData.flatMap(
      (event: any) => event.images || []
    );

    // Extract all images from story chapters
    const storyImages = storyData.chapters.flatMap((chapter: any) =>
      chapter.images.map((img: any) => img.src)
    );

    // Extract story chapter images
    const storyChapterImages = storyData.chapters.flatMap(
      (chapter: any) => chapter.images.map((img: any) => img.src) || []
    );

    // Flag images for language selector
    const flagImages = [
      "https://flagcdn.com/w40/it.png",
      "https://flagcdn.com/w40/gb.png",
      "https://flagcdn.com/w40/es.png",
    ];

    // Critical images (homepage, cover, logos, timeline, story, and flags)
    const criticalImages = [
      "/images/me-5.webp",
      "/images/logo/logo-white.webp",
      "/images/logo/logo-black.webp",
      storyData.coverImage,
      ...timelineImages, // Add all timeline images as critical
      ...storyImages, // Add all story images as critical
      ...storyChapterImages, // Add story chapter images as critical
      ...flagImages, // Add flag images for language selector
    ];

    // Combine all images (no duplicates)
    const allImages = [...new Set(criticalImages)];

    console.log(`🚀 Preloading ${allImages.length} images...`);

    // Preload images in batches to avoid overwhelming the browser
    const batchSize = 10;
    let currentBatch = 0;

    const preloadBatch = () => {
      const start = currentBatch * batchSize;
      const end = start + batchSize;
      const batch = allImages.slice(start, end);

      batch.forEach((src) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
      });

      currentBatch++;
      if (currentBatch * batchSize < allImages.length) {
        setTimeout(preloadBatch, 50); // Small delay between batches
      } else {
        console.log(`✅ All ${allImages.length} images preloaded`);
      }
    };

    // Start preloading after a short delay
    const timer = setTimeout(preloadBatch, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        {/* Prefetch all pages in the background */}
        <link rel="prefetch" href="/" as="fetch" />
        <link rel="prefetch" href="/timeline" as="fetch" />
        <link rel="prefetch" href="/blog" as="fetch" />
        <link rel="prefetch" href="/blog/la-mia-storia" as="fetch" />
        <link rel="prefetch" href="/services" as="fetch" />
      </Head>
      <LanguageProvider>
        <Layout>
          <Component {...pageProps} />
          <Analytics />
          <SpeedInsights />
        </Layout>
      </LanguageProvider>
    </>
  );
}
