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
            <span className="eyebrow">
              Now · May 2026
            </span>
            <h1>
              What I&apos;m focused on<span className="acc">.</span>
            </h1>
            <p className="sub">
              A living document. Last meaningful update: May 2026, from
              Tenerife.
            </p>
          </div>
        </header>

        <Reveal as="section" variant="fade-up" className="now-section">
          <h2>Work</h2>
          <p>
            Just shipped four projects to portfolio: two AI products (Lore —
            RAG support copilot; Email Triage — Gmail classifier), two
            open-source tools on npm (angel1-mvp-toolkit; angel1-rag-eval).
            Case studies on{" "}
            <Link href="/work" className="link-acc">/work</Link>.
          </p>
          <p>
            Going live this week. Booking client projects on Upwork and
            Freelancer, plus selective direct outreach. Available now.
          </p>
          <p>
            If you&apos;re building something AI-native and want a single
            engineer who can scope, ship, and operate it —{" "}
            <Link href="/contact" className="link-acc">start here</Link>.
          </p>
        </Reveal>

        <Reveal as="section" variant="fade-up" className="now-section">
          <h2>Reading</h2>
          <p>
            Currently: <em>Verrà l&apos;alba, starai bene</em> by Gianluca
            Gotto. Italian author, digital nomad, novel about leaving the
            version of yourself that doesn&apos;t fit anymore. The kind of
            book I read when I&apos;m building, not the kind I read when
            I&apos;m escaping.
          </p>
          <p>
            Not reading technical books right now. The compounding is
            happening through shipping, not through study.
          </p>
        </Reveal>

        <Reveal as="section" variant="fade-up" className="now-section">
          <h2>Life</h2>
          <p>
            Still in Tenerife. Working from home, sometimes from a café in
            town. The rhythm has settled: morning training, long walks, the
            sea most days.
          </p>
          <p>
            Picked up karting recently — turns out the kind of focus that
            comes from a tight corner is the same one I need on a hard
            refactor. Reading a lot. Going out when a good friend&apos;s
            around. Eating well.
          </p>
          <p>
            Building toward Bali by the end of June. That&apos;s the goal
            that frames everything else on this page.
          </p>
          <p>Quiet life, on purpose.</p>
        </Reveal>
      </div>
    </>
  );
}
