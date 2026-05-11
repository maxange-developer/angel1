import Link from "next/link";
import SEO from "@/components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO page="404" customTitle="404 — Page not found · Angel1" />

      <section className="page-hero container" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div className="mount-stagger">
          <p className="eyebrow">404</p>
          <h1>Nothing here.</h1>
          <p className="q">
            This page doesn&apos;t exist or was moved. Try one of these instead.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
            <Link href="/" className="btn btn-primary">Home →</Link>
            <Link href="/work" className="btn btn-ghost">Work →</Link>
            <Link href="/contact" className="btn btn-ghost">Contact →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
