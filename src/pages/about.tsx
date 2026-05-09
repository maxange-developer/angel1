import Image from "next/image";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";
import { STAGGER_CONTAINER, STAGGER_ITEM, FADE_IN } from "@/lib/motion";

interface TimelineRow {
  year: string;
  title: string;
  body: string;
  pivot?: boolean;
}

const TIMELINE: TimelineRow[] = [
  { year: "2001", title: "Born in Ancona, Italy", body: "Grew up on the Adriatic coast." },
  { year: "2008", title: "First computer", body: "Spent more time disassembling it than using it. Parents were not pleased." },
  { year: "2013", title: "Hearing loss begins", body: "Gradual, bilateral. Doctors said it was manageable. It wasn't.", pivot: true },
  { year: "2015", title: "Code as quiet focus", body: "Started learning HTML, CSS, JavaScript from YouTube tutorials. The screen didn't care if I couldn't hear.", pivot: true },
  { year: "2018", title: "First freelance project", body: "€150 for a WordPress site. Spent 40 hours on it. Worth every minute." },
  { year: "2019", title: "University — Computer Engineering", body: "Enrolled at Università Politecnica delle Marche. Juggled coursework with client projects." },
  { year: "2020", title: "COVID year → remote-first", body: "Lockdown accelerated everything. More clients, more code, more Stack Overflow." },
  { year: "2022", title: "Upwork — Top Rated", body: "100% job success. AI projects started appearing in my inbox." },
  { year: "2023", title: "All-in on AI", body: "Left WordPress behind. Started building with OpenAI, Anthropic, Supabase. Full-stack AI products became the focus." },
  { year: "Jan 2024", title: "Altesia.", body: "Joined a 10-person engineering shop in Ancona. Building Angular + .NET WebApps for client Fileni Group, modernizing a legacy VB6 stack. Agile team of 7." },
  { year: "2024", title: "Surgery", body: "12 years of hearing loss reversed by a procedure I was told had a 30% success rate. It worked.", pivot: true },
  { year: "Jan 2025", title: "Airplay Control.", body: "Software engineer on broadcasting systems for clients including RAI, La7 and other Italian TV networks. Angular, .NET, Python automation tooling. International team, English daily." },
  { year: "Oct 2025", title: "Tenerife", body: "Moved to the Canary Islands. Same clients, better weather, worse Wi-Fi.", pivot: true },
  { year: "2026", title: "Angel1", body: "Formalized the brand. One engineer, fixed price, production-grade." },
];

const CURRENTLY = [
  {
    label: "Building",
    value: "AI-Enhanced MVPs for founders and scale-ups. Next.js, TypeScript, Anthropic APIs.",
  },
  {
    label: "Available",
    value: "Q3 2026. Booking 30-min discovery calls now.",
  },
  {
    label: "Reading",
    value: "The Pragmatic Programmer (again), and everything Paul Graham writes.",
  },
];

export default function About() {
  return (
    <>
      <SEO page="about" canonicalPath="/about" />

      {/* ABOUT HERO */}
      <section className="about-hero container">
        <div className="about-hero-photo">
          <motion.div
            className="img-ph photo"
            variants={FADE_IN}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/images/me-5.webp"
              alt="Massimiliano Angelone"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="photo"
              priority
            />
          </motion.div>
        </div>
        <MotionSection className="about-hero-copy" as="div">
          <p className="eyebrow">About</p>
          <h1>24. Tenerife.<br />Shipped to production.</h1>
          <p>
            I&apos;ve been writing code since 2015. What started as a way to fill
            twelve quiet years — a long stretch of hearing loss — became a career,
            then a craft, then a company.
          </p>
          <p>
            Today I build AI-enhanced MVPs for founders and scale-ups worldwide.
            Fixed price. No retainer. One engineer who owns the full stack.
          </p>
          <p>
            Two+ years building production systems for broadcasters and B2B
            clients — RAI, La7, Fileni Group.
          </p>
        </MotionSection>
      </section>

      {/* TIMELINE */}
      <MotionSection className="sec container" as="section">
        <div className="tl-head">
          <p className="eyebrow">Timeline</p>
          <h2>The unabridged version.</h2>
        </div>
        <motion.div
          className="timeline"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {TIMELINE.map((row) => (
            <motion.div
              key={row.year}
              className={`timeline-row${row.pivot ? " pivot" : ""}`}
              variants={STAGGER_ITEM}
            >
              <span className="tl-year">{row.year}</span>
              <div className="tl-body">
                <h4>{row.title}</h4>
                <p>{row.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </MotionSection>

      {/* CURRENTLY */}
      <MotionSection className="sec container" as="section">
        <div className="curr-head">
          <p className="eyebrow">Currently</p>
          <h2>What I&apos;m up to.</h2>
        </div>
        <motion.div
          className="curr-grid"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {CURRENTLY.map((item) => (
            <motion.div key={item.label} className="curr-card" variants={STAGGER_ITEM}>
              <p className="eyebrow">{item.label}</p>
              <p>{item.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </MotionSection>
    </>
  );
}
