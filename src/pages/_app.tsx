import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Layout from "@/components/Layout";
import { PAGE_TRANSITION } from "@/lib/motion";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.pathname}
            variants={PAGE_TRANSITION}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Component {...pageProps} />
            <Analytics />
            <SpeedInsights />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  );
}
