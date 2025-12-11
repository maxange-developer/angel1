import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="it">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Massi Angelone - Full Stack Developer & Digital Nomad. Portfolio futuristico con Timeline interattiva."
        />
        <link rel="icon" href="/images/logo/logo-black.PNG" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
