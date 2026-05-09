import Link from "next/link";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";
import { STAGGER_CONTAINER, STAGGER_ITEM, FADE_UP } from "@/lib/motion";

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
      "Handover doc + 30-day support",
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
      "A real MVP — auth, data, AI, payments-ready. The version you raise on, the version you sell.",
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
  { feature: "Post-launch support", sprint: "30 days", lite: "3 weeks", full: "6 weeks" },
];

const RECORD = [
  { v: "$5,300", k: "Earned", x: "Across Freelancer.com engagements." },
  { v: "100%", k: "Job success", x: "All projects delivered on scope." },
  { v: "5.0 ★", k: "Client rating", x: "Average on Freelancer.com." },
  { v: "1", k: "Open-source npm", x: "@massiangelone/claude-mvp-toolkit." },
];

const FAQ = [
  {
    q: "What does fixed-price actually mean?",
    a: "Scope is locked on day one in a written brief. The price doesn't move unless you decide to add scope mid-engagement, in which case I'll come back with a delta — never a surprise invoice. If something inside the agreed scope takes longer than I expected, that's my problem, not yours.",
  },
  {
    q: "What if my idea doesn't fit one of the three tracks?",
    a: "Most ideas do — the tracks are about timeline and surface area, not vertical. If yours genuinely doesn't fit, write me a paragraph and I'll come back within 48 hours with a custom scope, or tell you honestly that I'm not the right person.",
  },
  {
    q: "Who owns the code?",
    a: "You do. On final invoice payment, full IP transfers to your company — code, designs, infrastructure config, the eval harness, everything. The repository moves to your org. I keep nothing except the right to mention the engagement on this site, and only if you're comfortable with that.",
  },
  {
    q: "Why solo? What if you get hit by a bus?",
    a: "Solo is the multiplier — same person designing, building, deploying, with no agency overhead and no telephone-game between roles. The bus answer: every engagement ships with a written architecture doc, a runnable handover, and CI that doesn't depend on me being alive. If that's still not enough confidence for your stage, I'm probably not the right hire and that's fine.",
  },
  {
    q: "Do you do retainers or maintenance?",
    a: "Yes — selectively. Retainers start at €2,500 / month for a fixed weekly slot, and I take a maximum of two clients on retainer at a time. Maintenance-only contracts on code I didn't ship are case-by-case; the question is whether the existing codebase is healthy enough that I can be useful in it.",
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
  return (
    <>
      <SEO page="services" canonicalPath="/services" />

      {/* PAGE HERO */}
      <section className="container page-hero">
        <MotionSection as="div">
          <motion.span className="eyebrow" variants={FADE_UP}>
            Three engagement tracks · fixed-price · fixed-scope
          </motion.span>
          <motion.h1 variants={FADE_UP}>
            Choose your
            <br />
            engagement<span className="acc">.</span>
          </motion.h1>
          <motion.p className="sub" variants={FADE_UP}>
            Three productized tracks with public pricing. Pick the one that
            matches your timeline; if none fit, the last section covers custom
            scopes.
          </motion.p>
        </MotionSection>
      </section>

      {/* PRICING */}
      <MotionSection className="container pricing" as="div">
        <motion.div
          className="cards"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              className={`card${pkg.featured ? " featured" : ""}`}
              variants={STAGGER_ITEM}
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
            </motion.div>
          ))}
        </motion.div>
      </MotionSection>

      {/* COMPARE */}
      <MotionSection className="container compare" as="div">
        <div className="lbl">Side by side</div>
        <h2>
          Compare engagements<span className="acc">.</span>
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
      </MotionSection>

      {/* TRACK RECORD */}
      <MotionSection className="container record" as="div">
        <div className="head">
          <div className="lbl">Track record · verified</div>
          <h2>
            What&apos;s actually shipped<span className="acc">.</span>
          </h2>
        </div>
        <motion.div
          className="grid"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {RECORD.map((r) => (
            <motion.div
              key={r.k}
              className="card stat"
              variants={STAGGER_ITEM}
            >
              <div className="v">{r.v}</div>
              <div className="k">{r.k}</div>
              <div className="x">{r.x}</div>
            </motion.div>
          ))}
        </motion.div>
      </MotionSection>

      {/* FAQ */}
      <MotionSection className="container faq" as="div">
        <h2>
          Frequently asked<span className="acc">.</span>
        </h2>
        {FAQ.map((item) => (
          <details key={item.q}>
            <summary>
              <span className="qq">{item.q}</span>
              <PlusSvg />
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </MotionSection>

      {/* CUSTOM CTA */}
      <section className="custom-cta">
        <div className="container">
          <h3>
            Need something custom<span className="acc">?</span>
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
            <Link href="/contact" className="btn btn-secondary">
              Book a 15-min call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
