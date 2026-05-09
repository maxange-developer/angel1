import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";
import { STAGGER_CONTAINER, STAGGER_ITEM, FADE_UP } from "@/lib/motion";

const PACKAGES = [
  {
    id: "sprint",
    name: "AI Sprint",
    price: "€2,500",
    tagline: "One sharp feature.",
    desc: "You have a product. You need one AI-powered feature, built right, shipped fast.",
    items: [
      "1 AI feature (chat, classification, generation, search)",
      "Prompt engineering + evaluation included",
      "Production deploy — not a prototype",
      "14-day turnaround · 1 revision round",
    ],
    featured: false,
  },
  {
    id: "lite",
    name: "MVP Lite",
    price: "€5,000",
    tagline: "A focused product.",
    desc: "Zero to one, production-grade. Auth, data, AI layer, deploy — in 30 days.",
    items: [
      "Full-stack Next.js app from scratch",
      "Auth (NextAuth) + PostgreSQL + API",
      "AI integration (OpenAI / Anthropic / custom)",
      "30-day turnaround · 2 revision rounds",
    ],
    featured: true,
  },
  {
    id: "full",
    name: "MVP Full",
    price: "€9,500",
    tagline: "Everything, production-grade.",
    desc: "The complete picture — payments, analytics, onboarding, admin panel.",
    items: [
      "Everything in MVP Lite",
      "Stripe payments + Resend email + PostHog analytics",
      "Admin dashboard + role-based access",
      "60-day turnaround · 3 revision rounds",
    ],
    featured: false,
  },
];

const COMPARE_ROWS = [
  { feature: "AI integration", sprint: true, lite: true, full: true },
  { feature: "Full-stack app", sprint: false, lite: true, full: true },
  { feature: "Auth + database", sprint: false, lite: true, full: true },
  { feature: "Stripe payments", sprint: false, lite: false, full: true },
  { feature: "Analytics (PostHog)", sprint: false, lite: false, full: true },
  { feature: "Admin dashboard", sprint: false, lite: false, full: true },
  { feature: "Email (Resend)", sprint: false, lite: false, full: true },
  { feature: "Fixed price", sprint: true, lite: true, full: true },
];

const RECORD = [
  { value: "$5,300+", label: "Earned on Upwork" },
  { value: "100%", label: "Job success score" },
  { value: "3", label: "Production MVPs shipped" },
  { value: "2+", label: "Years enterprise work" },
];

const FAQ = [
  {
    q: "What if I need something between packages?",
    a: "Let’s talk. The packages are defaults — I can scope a custom engagement around your exact needs.",
  },
  {
    q: "Do you work on existing codebases?",
    a: "Yes. AI Sprint especially is designed to slot into a live product. I'll audit the codebase first and confirm it's viable.",
  },
  {
    q: "What happens if we go over scope?",
    a: "Scope is agreed in writing before we start. If requirements grow, we discuss a change order — no silent billing.",
  },
  {
    q: "What tech stack do you use?",
    a: "Next.js · TypeScript · PostgreSQL/Supabase · Tailwind · OpenAI/Anthropic APIs. I can adapt to your existing stack.",
  },
  {
    q: "Can I see the code?",
    a: "Always. You own 100% of the output. GitHub repo, full access, no lock-in.",
  },
];

export default function Services() {
  return (
    <>
      <SEO page="services" canonicalPath="/services" />

      {/* PAGE HERO */}
      <section className="page-hero container">
        <MotionSection>
          <p className="eyebrow">Packages</p>
          <h1>Choose your engagement.</h1>
          <p className="q">
            Three fixed-price packages. No retainer, no surprise invoices. Pick the
            one that matches your stage and let&apos;s ship.
          </p>
        </MotionSection>
      </section>

      {/* PRICING */}
      <MotionSection className="sec container">
        <motion.div
          className="pricing"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              className={`card${pkg.featured ? " featured card-featured-glow" : ""}`}
              variants={STAGGER_ITEM}
            >
              {pkg.featured && <p className="eyebrow acc">Most popular</p>}
              <h3>{pkg.name}</h3>
              <p className="svc-price">{pkg.price}</p>
              <p className="svc-desc">{pkg.desc}</p>
              <ul className="svc-items">
                {pkg.items.map((item) => (
                  <li key={item}>
                    <Check size={14} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={`btn ${pkg.featured ? "btn-primary" : "btn-ghost"}`}>
                Start this →
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </MotionSection>

      {/* COMPARE TABLE */}
      <MotionSection className="sec container">
        <div className="sec-head">
          <p className="eyebrow">Compare</p>
          <h2>What&apos;s included.</h2>
        </div>
        <div className="compare">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>AI Sprint</th>
                <th>MVP Lite</th>
                <th>MVP Full</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td>{row.sprint ? <Check size={16} /> : <span className="dash">—</span>}</td>
                  <td>{row.lite ? <Check size={16} /> : <span className="dash">—</span>}</td>
                  <td>{row.full ? <Check size={16} /> : <span className="dash">—</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MotionSection>

      {/* TRACK RECORD */}
      <MotionSection className="sec container">
        <div className="sec-head">
          <p className="eyebrow">Track record</p>
          <h2>Numbers that matter.</h2>
        </div>
        <motion.div
          className="record"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {RECORD.map((r) => (
            <motion.div key={r.label} className="record-item" variants={STAGGER_ITEM}>
              <strong>{r.value}</strong>
              <span>{r.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </MotionSection>

      {/* FAQ */}
      <MotionSection className="sec container">
        <div className="sec-head">
          <p className="eyebrow">FAQ</p>
          <h2>Common questions.</h2>
        </div>
        <div className="faq">
          {FAQ.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </MotionSection>

      {/* CUSTOM CTA */}
      <MotionSection className="custom-cta container">
        <motion.div variants={FADE_UP} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <p className="eyebrow">Custom scope</p>
          <h2>Need something different?</h2>
          <p>
            Maintenance retainer, team augmentation, technical audit — let&apos;s scope it
            together.
          </p>
          <Link href="/contact" className="btn btn-primary">Let&apos;s talk →</Link>
        </motion.div>
      </MotionSection>
    </>
  );
}
