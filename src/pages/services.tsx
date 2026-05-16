import { useEffect, useRef } from "react";
import Link from "next/link";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";

const PACKAGES = [
  {
    id: "sprint",
    name: "AI Sprint",
    cur: "€",
    price: "2,500",
    duration: "1 week",
    ideal:
      "For founders who need a working prototype to put in front of users on Monday.",
    deliv: [
      "Discovery, scope locked day 1",
      "Single core AI feature, end-to-end",
      "Next.js + Vercel deploy",
      "Auth + DB scaffolding",
      "Handover doc + 1 month support",
    ],
    cta: "Start a Sprint",
    btn: "btn-secondary",
    featured: false,
  },
  {
    id: "lite",
    name: "AI MVP Lite",
    cur: "€",
    price: "5,000",
    duration: "2 weeks",
    ideal:
      "A real MVP — auth, data, AI, payments-ready. The version you raise on. The version you sell.",
    deliv: [
      "Everything in AI Sprint, plus",
      "Full Supabase schema + RLS",
      "3–5 AI features, including RAG",
      "Stripe billing scaffolding",
      "Eval harness for AI quality",
      "3 weeks post-launch support",
    ],
    cta: "Start an MVP Lite",
    btn: "btn-primary",
    featured: true,
  },
  {
    id: "full",
    name: "AI MVP Full",
    cur: "€",
    price: "9,500",
    duration: "4 weeks",
    ideal:
      "Production-grade. Multi-tenant, observability baked in, ready for the first 1,000 paying users.",
    deliv: [
      "Everything in MVP Lite, plus",
      "Multi-tenant + RBAC",
      "RAG + agent pipelines, evaluated",
      "Observability (Logfire / OTel)",
      "CI/CD + staging environment",
      "6 weeks post-launch support",
    ],
    cta: "Start an MVP Full",
    btn: "btn-secondary",
    featured: false,
  },
];

type CompareCell = boolean | string;

interface CompareRow {
  feature: string;
  sprint: CompareCell;
  lite: CompareCell;
  full: CompareCell;
}

const COMPARE_ROWS: CompareRow[] = [
  { feature: "Timeline", sprint: "1 week", lite: "2 weeks", full: "4 weeks" },
  { feature: "Investment", sprint: "€2,500", lite: "€5,000", full: "€9,500" },
  { feature: "Discovery", sprint: true, lite: true, full: true },
  { feature: "Auth + DB scaffolding", sprint: true, lite: true, full: true },
  { feature: "AI features", sprint: "1 (core)", lite: "3–5", full: "5+" },
  { feature: "RAG retrieval", sprint: false, lite: true, full: true },
  { feature: "Stripe billing", sprint: false, lite: true, full: true },
  { feature: "Evaluation harness", sprint: false, lite: true, full: true },
  { feature: "Multi-tenant + RBAC", sprint: false, lite: false, full: true },
  { feature: "Observability", sprint: false, lite: false, full: true },
  { feature: "Post-launch support", sprint: "1 month", lite: "3 weeks", full: "6 weeks" },
];

const RECORD = [
  { v: "$5k+", k: "Earned", x: "Across Freelancer.com engagements." },
  { v: "100%", k: "Job success", x: "All projects delivered on scope." },
  { v: "5.0 ★", k: "Client rating", x: "Average on Freelancer.com." },
  { v: "2", k: "Open-source npm", x: "@massiangelone/angel1-mvp-toolkit · @massiangelone/angel1-rag-eval." },
];

const FAQ = [
  {
    q: "Have you actually shipped this for paying clients, or are the case studies demos?",
    a: "Honest answer: the three projects on this site are portfolio engagements — I built them to production specs, not for paying tenants. The technical work is real: multi-tenant RLS, streaming chat, Gmail OAuth, cost tracking, all measurable in the running demos. What's missing is the messiness of an actual customer relationship — adversarial users, edge-case requests, support tickets I had to triage at 11pm. I'm transparent about that distinction, here and in proposals. Five thousand euros for a working MVP from someone who's shipped portfolio at production quality is a reasonable bet for a founder at your stage. Five thousand euros for an MVP from someone pretending to have ten enterprise clients isn't.",
  },
  {
    q: "What does fixed-price actually mean?",
    a: "Scope is locked on day one in a written brief that lists exactly what's in and what isn't. The price doesn't move unless you decide to add scope mid-engagement, in which case I'll come back with a written delta — never a surprise invoice. If something inside the agreed scope takes me longer than I estimated, that's mine to eat. I've eaten the cost on every project so far, and I expect to keep doing so on roughly one in three engagements — that's the cost of being good at estimation, not perfect.",
  },
  {
    q: "Who owns the code, and what if I want another developer to take over later?",
    a: "You own everything. On final invoice payment, full IP transfers to your company — source code, designs, infrastructure config, eval harness, the works. The repository moves to your organization's GitHub or wherever you keep code. I retain nothing except the right to mention the engagement on this site, and only if you give permission. Handover is built into the timeline of every package, not bolted on at the end: by week one I'm writing the architecture doc, and by delivery you have a runnable codebase that any competent Next.js developer can pick up without calling me. That's the test I optimize for.",
  },
  {
    q: "How do we communicate during the project?",
    a: "Async by default. Daily written updates Monday through Friday on Linear or Notion — whatever your team uses — with screenshots and short Loom videos when something needs visual context. One synchronous call per week, thirty minutes, on Zoom or Google Meet. Most clients tell me a week in that the daily writeup is more useful than the call. I'm based in Tenerife (GMT+1) and my calendar overlaps cleanly with European business hours in the morning and US East Coast in the afternoon. West Coast US: we'll need to find a window.",
  },
  {
    q: "What happens if the project goes wrong or I need to stop midway?",
    a: "Two scenarios. If I deliver something that doesn't match the agreed brief, I fix it on my own time until it does — that's what fixed-price means. If you decide to stop the engagement midway for any reason, the terms depend on where we're working. On Upwork or Freelancer.com, the platform's milestone-based escrow handles it: you pay only for milestones already released, and you keep everything I've built up to that point. On direct private contracts, my standard MSA includes a kill-fee of fifteen percent of the remaining scope, plus the work completed — and you still keep everything I've built. Either way: no held-hostage repository, no surprise fees, clean exit on your terms. I've never had a project end this way, but the policy exists because I think you should always know exactly what happens before you sign.",
  },
  {
    q: "What kinds of projects do you not take?",
    a: "A few categories where I'm not the right hire. Crypto and Web3 projects — the space moves too fast and my opinions on it are too strong to be useful to founders who believe in it. Mobile-native apps with deep platform integration (Bluetooth, AR, native ML) — I do React Native, but if you need Swift or Kotlin expertise for the core, I'm not your developer. Marketing websites without an application layer — there are people who do that better and cheaper. Anything that asks me to deceive users at the design level — gambling mechanics, dark patterns, fake urgency. The list of things I will do is a lot longer; this is the short list of where I'll honestly say \"I'm not your person, here's who is.\"",
  },
  {
    q: "Why solo? What's the bus-factor answer?",
    a: "Solo is the multiplier: same person designing, building, deploying, with no agency overhead and no telephone-game between roles. You get a direct line, decisions in hours instead of days, and zero coordination tax. The bus answer is this: every engagement ships with a written architecture document, a runnable handover, CI that doesn't depend on me being alive, and a CLAUDE.md file at the repo root that lets any competent developer or AI assistant pick up where I left off. If your project genuinely needs a team — three engineers, a dedicated PM, a designer — I'll tell you that on the first call and refer you to an agency I trust. For everything else, one engineer who owns the full stack beats three people coordinating across Jira.",
  },
];

const CheckSvg = () => (
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M2 7L6 11L12 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CompareCheckSvg = () => (
  <svg className="check" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M2 7L6 11L12 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusSvg = () => (
  <svg className="ic" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path
      d="M11 4V18M4 11H18"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

function renderCompareCell(cell: CompareCell, isFeatured: boolean) {
  if (cell === true) return <CompareCheckSvg />;
  if (cell === false) return <span className="dash">—</span>;
  return <span className={isFeatured ? "featured-col" : ""}>{cell}</span>;
}

export default function Services() {
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = faqRef.current;
    if (!container) return;

    const details = container.querySelectorAll<HTMLDetailsElement>("details");

    const onToggle = (e: Event) => {
      const opened = e.target as HTMLDetailsElement;
      if (!opened.open) return;
      details.forEach((d) => {
        if (d !== opened && d.open) d.open = false;
      });
    };

    details.forEach((d) => d.addEventListener("toggle", onToggle));
    return () => {
      details.forEach((d) => d.removeEventListener("toggle", onToggle));
    };
  }, []);

  return (
    <>
      <SEO page="services" canonicalPath="/services" />

      {/* PAGE HERO */}
      <section className="container page-hero">
        <div className="mount-stagger">
          <span className="eyebrow">
            Packages
          </span>
          <h1>
            Choose your
            <br />
            engagement<span className="acc">.</span>
          </h1>
          <p className="sub">
            Three engagement tracks, fixed-price, fixed-scope. Pick the one
            that matches your timeline. If none fits, the last section covers
            custom scopes.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <Reveal className="container pricing" as="div" variant="fade-up">
        <Reveal className="cards" as="div" variant="stagger">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`card${pkg.featured ? " featured" : ""}`}
            >
              {pkg.featured && <span className="pop">MOST POPULAR</span>}
              <span className="name">{pkg.name}</span>
              <div className="price">
                <span className="cur">{pkg.cur}</span>
                {pkg.price}
              </div>
              <span className="duration">{pkg.duration}</span>
              <p className="ideal">{pkg.ideal}</p>
              <ul className="deliv">
                {pkg.deliv.map((d) => (
                  <li key={d}>
                    <CheckSvg />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="cta-wrap">
                <Link href="/contact" className={`btn ${pkg.btn}`}>
                  {pkg.cta} <span className="arr">→</span>
                </Link>
              </div>
            </div>
          ))}
        </Reveal>
      </Reveal>

      {/* COMPARE */}
      <Reveal className="container compare" as="div" variant="fade-up">
        <span className="eyebrow acc">01 / COMPARE</span>
        <h2>
          Compare engagements
        </h2>
        <table>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th>Sprint</th>
              <th className="featured-col">MVP Lite</th>
              <th>MVP Full</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row) => (
              <tr key={row.feature}>
                <td>{row.feature}</td>
                <td>{renderCompareCell(row.sprint, false)}</td>
                <td className={typeof row.lite === "string" ? "featured-col" : ""}>
                  {typeof row.lite === "string" ? row.lite : renderCompareCell(row.lite, false)}
                </td>
                <td>{renderCompareCell(row.full, false)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="compare-mobile">
          {[
            { id: "sprint" as const, name: "AI Sprint", price: "€2,500", duration: "1 week", featured: false },
            { id: "lite" as const, name: "AI MVP Lite", price: "€5,000", duration: "2 weeks", featured: true },
            { id: "full" as const, name: "AI MVP Full", price: "€9,500", duration: "4 weeks", featured: false },
          ].map((pkg) => (
            <div key={pkg.id} className={`compare-mobile-card${pkg.featured ? " featured" : ""}`}>
              {pkg.featured && <span className="pop">MOST POPULAR</span>}
              <div className="compare-mobile-head">
                <h3>{pkg.name}</h3>
                <div className="price">{pkg.price}</div>
                <div className="duration">{pkg.duration}</div>
              </div>
              <ul className="compare-mobile-rows">
                {COMPARE_ROWS.filter((r) => r.feature !== "Timeline" && r.feature !== "Investment").map((row) => {
                  const cell = row[pkg.id];
                  return (
                    <li key={row.feature}>
                      <span className="feature">{row.feature}</span>
                      <span className="value">
                        {cell === true ? (
                          <CompareCheckSvg />
                        ) : cell === false ? (
                          <span className="dash">—</span>
                        ) : (
                          cell
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      {/* TRACK RECORD */}
      <Reveal className="container record" as="div" variant="fade-up">
        <div className="head">
          <span className="eyebrow acc">02 / TRACK RECORD</span>
          <h2>
            What&apos;s actually shipped
          </h2>
        </div>
        <Reveal className="grid" as="div" variant="stagger">
          {RECORD.map((r) => (
            <div
              key={r.k}
              className="card stat"
            >
              <div className="v">{r.v}</div>
              <div className="k">{r.k}</div>
              <div className="x">{r.x}</div>
            </div>
          ))}
        </Reveal>
      </Reveal>

      {/* FAQ */}
      <Reveal className="container faq" as="div" variant="fade-up">
        <span className="eyebrow acc">03 / FAQ</span>
        <h2>
          Frequently asked<span className="acc">.</span>
        </h2>
        <p className="faq-sub">
          Seven questions I get most often. If yours isn&apos;t here,{" "}
          <Link href="/contact" className="link-acc">write me</Link>
          {" "}— I&apos;ll answer it.
        </p>
        <div ref={faqRef}>
          {FAQ.map((item) => (
            <details key={item.q}>
              <summary>
                <span className="qq">{item.q}</span>
                <PlusSvg />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </Reveal>

      {/* CUSTOM CTA */}
      <section className="custom-cta">
        <div className="container">
          <p className="eyebrow">Custom scope</p>
          <h3>
            Need something custom?
          </h3>
          <p>
            Long-term retainer, an existing codebase to harden, or something
            none of the three tracks describe — write me a paragraph and
            I&apos;ll come back within 48 hours.
          </p>
          <div className="ctas">
            <Link href="/contact" className="btn btn-primary">
              Start a custom brief <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
