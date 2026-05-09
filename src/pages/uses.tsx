import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";

const USES = [
  {
    category: "Hardware",
    items: [
      { name: "MacBook Pro M3 14\"", desc: "Primary machine. Fast enough to never think about it." },
      { name: "LG 27\" 4K", desc: "The second monitor tax is real. Paid it." },
      { name: "Keychron K2", desc: "Brown switches. The neighbours have opinions." },
      { name: "Sony WH-1000XM5", desc: "Noise cancelling. Non-negotiable for a home office." },
    ],
  },
  {
    category: "Development",
    items: [
      { name: "VS Code", desc: "With Cursor AI integration. The pair programming we invented ourselves." },
      { name: "Claude Code", desc: "For anything that needs real context understanding." },
      { name: "Warp", desc: "Terminal. The AI autocomplete alone is worth it." },
      { name: "TablePlus", desc: "Database GUI. Postgres, SQLite, whatever." },
      { name: "Insomnia", desc: "API testing. Slightly less cluttered than Postman." },
    ],
  },
  {
    category: "Stack (defaults)",
    items: [
      { name: "Next.js + TypeScript", desc: "Every project starts here unless there's a strong reason not to." },
      { name: "Supabase / PostgreSQL", desc: "Database, auth, storage — one service." },
      { name: "Tailwind CSS", desc: "Utility-first. No custom CSS until you have a real design system." },
      { name: "Anthropic Claude API", desc: "LLM layer. Tool use and multi-agent workflows." },
      { name: "Vercel", desc: "Deploy. Edge functions. Preview environments." },
      { name: "Resend + React Email", desc: "Transactional email. Clean templates, good DX." },
      { name: "Stripe", desc: "Payments. The docs are actually good." },
      { name: "PostHog", desc: "Analytics + feature flags. Self-hostable if the client needs it." },
    ],
  },
  {
    category: "Productivity",
    items: [
      { name: "Linear", desc: "Issue tracking. Fast." },
      { name: "Notion", desc: "Client-facing docs, proposals, project wikis." },
      { name: "Loom", desc: "Async video updates. Beats a 30-minute status call." },
      { name: "1Password", desc: "Credentials. Please use a password manager." },
    ],
  },
];

export default function Uses() {
  return (
    <>
      <SEO page="uses" canonicalPath="/uses" />

      <section className="page-hero container">
        <MotionSection>
          <p className="eyebrow">Uses</p>
          <h1>Tools I use daily.</h1>
          <p className="q">
            Hardware, software, and stack defaults. Updated periodically when
            something better comes along.
          </p>
        </MotionSection>
      </section>

      <div className="container">
        <article className="case-body uses-body">
          {USES.map((section) => (
            <section key={section.category}>
              <h2>{section.category}</h2>
              <ul>
                {section.items.map((item) => (
                  <li key={item.name}>
                    <strong>{item.name}</strong> — {item.desc}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
