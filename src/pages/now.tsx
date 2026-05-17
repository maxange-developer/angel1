import Link from "next/link";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";

export default function Now() {
  return (
    <>
      <SEO page="now" canonicalPath="/now" />

      <div className="now-page">
        <header className="now-hero">
          <div className="mount-stagger">
            <span className="eyebrow">Now</span>
            <h1>
              What I&apos;m focused on<span className="acc">.</span>
            </h1>
            <p className="sub">
              A living page — what&apos;s on my desk and on my mind right now.
            </p>
          </div>
        </header>

        <Reveal as="section" variant="fade-up" className="now-section">
          <h2>Work</h2>
          <p>
            Building and selling AI-Enhanced MVPs end-to-end — design, build,
            deploy, support. Booking projects via Upwork, Freelancer.com, and
            selective direct outreach. Available for new engagements now.
          </p>
          <p>
            If you&apos;re building something AI-native and want a single
            engineer who can scope, ship, and operate it —{" "}
            <Link href="/contact" className="link-acc">start here</Link>.
          </p>
        </Reveal>

        <Reveal as="section" variant="fade-up" className="now-section">
          <h2>Building</h2>
          <p>
            Two open-source tools on npm:{" "}
            <Link href="/work/03-angel1-mvp-toolkit" className="link-acc">angel1-mvp-toolkit</Link>{" "}
            (scaffolding) and{" "}
            <Link href="/work/04-angel1-rag-eval" className="link-acc">angel1-rag-eval</Link>{" "}
            (RAG evaluation). Both v1.0, iterated in v0.x increments based on
            usage.
          </p>
          <p>
            A personal SaaS, side project, no client. The kind of itch you
            scratch when tooling work leaves room. More to share when
            there&apos;s something to show.
          </p>
        </Reveal>

        <Reveal as="section" variant="fade-up" className="now-section">
          <h2>Life</h2>
          <p>
            Tenerife. Working from home, sometimes from a café in town.
            Mornings: training, long walks. The sea most days.
          </p>
          <p>
            Reading and following what&apos;s shipping in AI and developer
            tooling — papers, release notes, the rare blog post worth the
            time. Running trails when the work day closes.
          </p>
          <p>
            Building toward Bali in early July 2026. That&apos;s the goal that
            frames everything else.
          </p>
        </Reveal>
      </div>
    </>
  );
}
