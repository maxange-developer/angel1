import { useEffect, useRef } from "react";
import Link from "next/link";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";

const PACKAGES = [
  {
    id: "validation",
    name: "Validation MVP",
    cur: "$",
    price: "1,500",
    duration: "5–7 days",
    ideal:
      "For founders with an AI idea who need a working prototype to test with real users this week. Outcome: a live webapp on your domain with one core AI feature, ready for investors or beta testers.",
    deliv: [
      "Discovery call, scope locked day 1",
      "1 AI feature end-to-end (chat / classification / generation / search)",
      "Auth + database (Supabase)",
      "Production deploy on custom domain",
      "Documented codebase, fully owned by you",
      "14 days post-launch support",
    ],
    cta: "Start a Validation MVP",
    btn: "btn-secondary",
    featured: false,
  },
  {
    id: "launch",
    name: "Launch MVP",
    cur: "$",
    price: "3,500",
    duration: "2–3 weeks",
    ideal:
      "For founders with first users who need to go from prototype to a real SaaS they can charge for. Outcome: a complete product with onboarding, billing, analytics, ready to invoice the first paying customer.",
    deliv: [
      "Everything in Validation, plus:",
      "3–5 AI features integrated (eval harness if RAG)",
      "Onboarding flow + transactional emails",
      "Stripe billing scaffolding (subscriptions or one-time)",
      "Basic analytics + error monitoring",
      "Admin dashboard for the founder",
      "30 days post-launch support",
    ],
    cta: "Start a Launch MVP",
    btn: "btn-primary",
    featured: true,
  },
  {
    id: "scale",
    name: "Scale MVP",
    cur: "$",
    price: "7,500",
    duration: "4–5 weeks",
    ideal:
      "For post-seed startups or B2B SaaS teams who need a production system handling 1,000 users. Outcome: a multi-tenant production system with observability and cost controls, ready for Series A diligence.",
    deliv: [
      "Everything in Launch, plus:",
      "Multi-tenant + RBAC",
      "RAG + agent pipelines with full eval harness",
      "Observability (Logfire / OpenTelemetry)",
      "Per-tenant cost tracking + rate limiting",
      "CI/CD + staging environment",
      "60 days post-launch support + handover walkthrough",
    ],
    cta: "Start a Scale MVP",
    btn: "btn-secondary",
    featured: false,
  },
];

type CompareCell = boolean | string;

interface CompareRow {
  feature: string;
  validation: CompareCell;
  launch: CompareCell;
  scale: CompareCell;
}

const COMPARE_ROWS: CompareRow[] = [
  { feature: "Timeline", validation: "5–7 days", launch: "2–3 weeks", scale: "4–5 weeks" },
  { feature: "Investment", validation: "$1,500", launch: "$3,500", scale: "$7,500" },
  { feature: "Discovery + scope lock", validation: true, launch: true, scale: true },
  { feature: "Auth + database", validation: true, launch: true, scale: true },
  { feature: "AI features", validation: "1 (core)", launch: "3–5", scale: "5+" },
  { feature: "Custom domain + deploy", validation: true, launch: true, scale: true },
  { feature: "Stripe billing", validation: false, launch: true, scale: true },
  { feature: "Eval harness", validation: false, launch: "✓ (if RAG)", scale: true },
  { feature: "Multi-tenant + RBAC", validation: false, launch: false, scale: true },
  { feature: "Observability", validation: false, launch: false, scale: true },
  { feature: "CI/CD + staging", validation: false, launch: false, scale: true },
  { feature: "Post-launch support", validation: "14 days", launch: "30 days", scale: "60 days" },
];

const HOW_I_WORK = [
  {
    num: "01",
    ttl: "Discovery",
    timing: "Free · 30 min",
    desc: "We define scope, success criteria, and deliverables. You leave with a written brief, even if we don't work together.",
  },
  {
    num: "02",
    ttl: "Kickoff",
    timing: "50% deposit",
    desc: "Scope locked in writing. Slack/Linear access. Daily async updates start from day one.",
  },
  {
    num: "03",
    ttl: "Build",
    timing: "Daily updates",
    desc: "Staging URL updated daily. You see real progress, not slide decks.",
  },
  {
    num: "04",
    ttl: "Launch",
    timing: "50% on delivery",
    desc: "Production deploy. Custom domain. Codebase walkthrough video. Full IP transfer on final invoice.",
  },
  {
    num: "05",
    ttl: "Support",
    timing: "14–60 days",
    desc: "Bug fixes, small tweaks, refinement. After that, optional retainer.",
  },
];

const RECORD = [
  { v: "5.0 ★", k: "Rating", x: "Freelancer.com — 100% job success score." },
  { v: "$5k+", k: "Earnings", x: "Verified across freelance engagements." },
  { v: "2", k: "npm packages", x: "@massiangelone — open source, MIT licensed." },
  { v: "2+ years", k: "Engineering", x: "Altesia, Airplay Control — broadcasting & enterprise." },
];

const FAQ = [
  {
    q: "Have you actually shipped this for paying clients, or are the case studies demos?",
    a: "Honest answer: the projects on this site are portfolio engagements — I built them to production specs, not for paying tenants. The technical work is real: multi-tenant RLS, streaming chat, Gmail OAuth, cost tracking, all measurable in the running demos. What's missing is the messiness of an actual customer relationship — adversarial users, edge-case requests, support tickets at 11pm. I'm transparent about that distinction, here and in proposals. Real client engagements are covered by NDA; references are available on request.",
  },
  {
    q: "What does fixed-price actually mean?",
    a: "Scope is locked on day one in a written brief that lists exactly what's in and what isn't. The price doesn't move unless you decide to add scope mid-engagement, in which case I'll come back with a written delta — never a surprise invoice. If something inside the agreed scope takes me longer than I estimated, that's mine to eat.",
  },
  {
    q: "Who owns the code, and what if I want another developer to take over later?",
    a: "You own everything. On final invoice payment, full IP transfers to your company — source code, designs, infrastructure config, eval harness, the works. The repository moves to your organization's GitHub. I retain nothing except the right to mention the engagement on this site, and only if you give permission. Handover is built into every timeline: by delivery you have a runnable codebase that any competent Next.js developer can pick up without calling me.",
  },
  {
    q: "How do we communicate during the project?",
    a: "Async by default. Daily written updates Monday through Friday — with screenshots and short Loom videos when something needs visual context. One synchronous call per week, thirty minutes. I'm based in Tenerife (GMT+1): clean overlap with European business hours in the morning and US East Coast in the afternoon.",
  },
  {
    q: "What happens if the project goes wrong or I need to stop midway?",
    a: "If I deliver something that doesn't match the agreed brief, I fix it on my own time until it does. If you decide to stop midway, on Upwork or Freelancer.com the platform's milestone-based escrow handles it — you pay only for milestones already released and keep everything I've built. On direct contracts, my standard MSA includes a kill-fee of fifteen percent of remaining scope, plus work completed. Either way: no held-hostage repository, no surprise fees.",
  },
  {
    q: "What kinds of projects do you not take?",
    a: "Crypto and Web3 projects. Mobile-native apps with deep platform integration (Bluetooth, AR, native ML). Marketing websites without an application layer. Anything that asks me to deceive users at the design level — gambling mechanics, dark patterns, fake urgency.",
  },
  {
    q: "Why solo? What's the bus-factor answer?",
    a: "Solo is the multiplier: same person designing, building, deploying, with no agency overhead and no telephone-game between roles. The bus answer: every engagement ships with a written architecture document, a runnable handover, CI that doesn't depend on me, and a CLAUDE.md file that lets any developer or AI assistant pick up where I left off.",
  },
  {
    q: "Why USD pricing?",
    a: "Most clients reference USD as baseline. Invoices are issued in EUR at the day-of-invoice ECB rate via SEPA bank transfer (no Stripe fees).",
  },
  {
    q: "What payment methods do you accept?",
    a: "SEPA bank transfer or Wise (recommended for non-EU clients). 50% deposit at kickoff, 50% on final delivery. Invoices include EU VAT where applicable.",
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
            Three productized tracks. Public pricing in USD. Pick the one that
            matches your timeline; if none fit, the last section covers custom
            scopes.
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
              <th>Validation</th>
              <th className="featured-col">Launch</th>
              <th>Scale</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map((row) => (
              <tr key={row.feature}>
                <td>{row.feature}</td>
                <td>{renderCompareCell(row.validation, false)}</td>
                <td className={typeof row.launch === "string" ? "featured-col" : ""}>
                  {typeof row.launch === "string" ? row.launch : renderCompareCell(row.launch, false)}
                </td>
                <td>{renderCompareCell(row.scale, false)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="compare-mobile">
          {[
            { id: "validation" as const, name: "Validation MVP", price: "$1,500", duration: "5–7 days", featured: false },
            { id: "launch" as const, name: "Launch MVP", price: "$3,500", duration: "2–3 weeks", featured: true },
            { id: "scale" as const, name: "Scale MVP", price: "$7,500", duration: "4–5 weeks", featured: false },
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

      {/* HOW I WORK */}
      <Reveal className="container how-i-work" as="div" variant="fade-up">
        <div className="head">
          <div className="lbl">HOW I WORK · 5 STEPS</div>
          <h2>
            From brief to production<span className="acc">.</span>
          </h2>
        </div>
        <Reveal className="steps" as="div" variant="stagger">
          {HOW_I_WORK.map((step) => (
            <div key={step.num} className="step">
              <div className="num">{step.num}</div>
              <div className="ttl">{step.ttl}</div>
              <div className="timing">{step.timing}</div>
              <p className="desc">{step.desc}</p>
            </div>
          ))}
        </Reveal>
      </Reveal>

      {/* TRACK RECORD */}
      <Reveal className="container record" as="div" variant="fade-up">
        <div className="head">
          <span className="eyebrow acc">03 / TRACK RECORD · VERIFIED</span>
          <h2>
            What&apos;s actually shipped<span className="acc">.</span>
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
        <span className="eyebrow acc">04 / FAQ</span>
        <h2>
          Frequently asked<span className="acc">.</span>
        </h2>
        <p className="faq-sub">
          Nine questions I get most often. If yours isn&apos;t here,{" "}
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
