import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";

interface UsesItem {
  name: string;
  desc: string;
}

interface UsesSection {
  category: string;
  note?: string;
  items: UsesItem[];
}

const USES: UsesSection[] = [
  {
    category: "Hardware",
    note: "Hardware list pending — will update with current setup.",
    items: [],
  },
  {
    category: "Editor & dev environment",
    items: [
      { name: "VS Code", desc: "Primary editor. Set up minimally — no theme contest." },
      { name: "Claude Code", desc: "For anything that needs real context understanding. Side by side with VS Code." },
      { name: "Warp", desc: "Terminal. The autocomplete earns its keep." },
      { name: "TablePlus", desc: "Database client. Postgres, SQLite, MySQL — all in one window." },
    ],
  },
  {
    category: "Stack defaults",
    note: "What every new project starts with, unless there's a specific reason not to.",
    items: [
      { name: "Next.js 16 + TypeScript strict", desc: "App Router by default." },
      { name: "Supabase", desc: "Postgres, auth, storage, RLS — one service." },
      { name: "Tailwind 4 + shadcn", desc: "Utility-first. No custom CSS until there's a real design system to enforce." },
      { name: "Anthropic SDK or OpenAI SDK", desc: "Model picked per project, not per dogma." },
      { name: "Vercel", desc: "Deploy, edge functions, preview environments." },
      { name: "Resend + React Email", desc: "Transactional email with templates that don't look like 2010." },
      { name: "Stripe", desc: "Payments. The docs are actually good." },
      { name: "Vitest + Playwright", desc: "Unit and end-to-end, scaffolded into every new repo from day one." },
    ],
  },
  {
    category: "Workflow",
    items: [
      { name: "Linear", desc: "Issue tracking. Fast enough to not get in the way." },
      { name: "Notion", desc: "Client docs, proposals, longer writing." },
      { name: "Loom", desc: "Async video updates instead of meetings." },
      { name: "1Password", desc: "Credentials. Use a password manager." },
    ],
  },
  {
    category: "What I deliberately don't use",
    items: [
      { name: "No state management library by default", desc: "React state and URL state get you further than people expect. Add Zustand or Jotai when you've earned the complexity, not before." },
      { name: "No CSS-in-JS", desc: "Tailwind covers it. Component scope through file structure." },
      { name: "No custom UI kit", desc: "shadcn copies the components into your repo. You own them." },
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
          <h1>Tools I use daily<span className="acc">.</span></h1>
          <p className="q">
            Hardware, editor, stack defaults. Updated when something changes
            meaningfully — not when something new comes out.
          </p>
        </MotionSection>
      </section>

      <div className="container">
        <article className="case-body uses-body">
          {USES.map((section) => (
            <section key={section.category}>
              <h2>{section.category}</h2>
              {section.note && (
                <p style={{ fontStyle: "italic", color: "var(--text-2)" }}>
                  {section.note}
                </p>
              )}
              {section.items.length > 0 && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <strong>{item.name}</strong> — {item.desc}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <p style={{ marginTop: 64, color: "var(--text-3)", fontSize: 14 }}>
            Last updated: May 2026.
          </p>
        </article>
      </div>
    </>
  );
}
