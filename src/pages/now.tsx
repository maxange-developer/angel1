import Link from "next/link";
import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";

export default function Now() {
  return (
    <>
      <SEO page="now" canonicalPath="/now" />

      <section className="page-hero container">
        <MotionSection>
          <p className="eyebrow">Now — May 2026</p>
          <h1>What I&apos;m focused on.</h1>
          <p className="q">
            A living document. Last updated May 2026 from Tenerife.
          </p>
        </MotionSection>
      </section>

      <div className="container">
        <article className="case-body now-body">
          <h2>Work</h2>
          <p>
            Building AI-enhanced MVPs for two founders — one in London (fintech),
            one in Berlin (HR tech). Both on the MVP Lite package. Estimated delivery:
            end of June 2026.
          </p>
          <p>
            Not taking on new projects until mid-2026. If you&apos;d like to book a
            discovery call for a project starting in July or later,{" "}
            <Link href="/contact" className="link-acc">get in touch</Link>.
          </p>

          <h2>Learning</h2>
          <p>
            Deepening knowledge of Anthropic&apos;s Claude API — particularly tool use,
            multi-agent orchestration, and context window management at scale.
            Working through{" "}
            <em>The Pragmatic Programmer</em> for the third time, which still has things to say.
          </p>

          <h2>Life</h2>
          <p>
            Based in Tenerife. The trade winds are reliable, the coffee is good,
            and the time zone (GMT+1) works well for both European and East Coast
            US clients.
          </p>
          <p>
            Getting into open water swimming. Finding that early mornings in the
            ocean produce approximately the same clarity of thought as late-night
            coding sessions, but with better vitamin D.
          </p>

          <h2>Reading</h2>
          <ul>
            <li>
              <em>The Pragmatic Programmer</em> — Hunt &amp; Thomas
            </li>
            <li>
              <em>Thinking in Bets</em> — Annie Duke
            </li>
            <li>Paul Graham&apos;s essays — all of them, again</li>
          </ul>

          <hr />
          <p className="eyebrow">
            Inspired by <a href="https://nownownow.com" target="_blank" rel="noopener noreferrer" className="link-acc">nownownow.com</a>
          </p>
        </article>
      </div>
    </>
  );
}
