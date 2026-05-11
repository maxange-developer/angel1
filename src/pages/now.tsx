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
            Building portfolio engagements to bring on Upwork and
            Freelancer.com — three production-grade AI MVPs shipped in the last
            three weeks (AI Support Dashboard, Email Triage Tool,
            claude-mvp-toolkit). The case studies are on{" "}
            <Link href="/work" className="link-acc">/work</Link>. Booking new
            client projects now.
          </p>
          <p>
            If you&apos;ve got an idea worth shipping,{" "}
            <Link href="/contact" className="link-acc">start here</Link>.
          </p>
        </Reveal>

        <Reveal as="section" variant="fade-up" className="now-section">
          <h2>Learning</h2>
          <p>
            Spending most weekday mornings on Anthropic&apos;s Claude API —
            specifically tool use, multi-agent orchestration, and how to make
            agent loops cost-predictable at scale. Same time slot, every day.
            The compounding is the whole point.
          </p>
          <p>
            Reading <em>The Pragmatic Programmer</em> again. Third pass.
            Different book each time.
          </p>
        </Reveal>

        <Reveal as="section" variant="fade-up" className="now-section">
          <h2>Life</h2>
          <p>
            Based in Tenerife since October 2025. Co-working in La Laguna most
            mornings, surf in El Médano on Saturdays when the Atlantic
            cooperates. Same time zone as London, which means my calendar opens
            for European clients in the morning and US East Coast in the
            afternoon.
          </p>
          <p>
            Holly the cat moved here with me. He&apos;s adapted faster than I
            have.
          </p>
        </Reveal>

        <Reveal as="section" variant="fade-up" className="now-section">
          <h2>Reading</h2>
          <ul>
            <li>
              <em>The Pragmatic Programmer</em> — Hunt &amp; Thomas
            </li>
            <li>
              <em>Thinking in Bets</em> — Annie Duke
            </li>
            <li>
              Paul Graham&apos;s essays — slowly working back through the
              archive
            </li>
          </ul>
        </Reveal>

        <Reveal as="section" variant="fade-up" className="now-section">
          <h2>Open invitations</h2>
          <ul>
            <li>Open to retainer conversations for AI integration work</li>
            <li>Available for short technical reviews (paid, fixed-scope)</li>
            <li>
              Always interested in talking to people building useful AI products
            </li>
          </ul>
        </Reveal>
      </div>
    </>
  );
}
