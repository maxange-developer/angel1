import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";
import { STAGGER_CONTAINER, STAGGER_ITEM, HERO_PHOTO, FADE_UP } from "@/lib/motion";

interface TimelineRow {
  yr: string;
  ttl: string;
  desc: string;
  pivot?: boolean;
}

const TIMELINE: TimelineRow[] = [
  { yr: "2001", ttl: "Born in Ancona, Italy.", desc: "Where it all began. Family, first relationships, the foundation of who I am." },
  { yr: "2003", ttl: "Diagnosis: profound hearing damage.", desc: "Twelve years of partial silence after a missed diagnosis perforated both eardrums." },
  { yr: "2015", ttl: "Third surgery succeeds. I hear clearly.", desc: "Dr. Trabalzini's experimental cartilage technique worked. The world had sound again.", pivot: true },
  { yr: "2022", ttl: "Start2Impact University.", desc: "Full Stack Development — React, Angular, Node.js. Self-taught foundations made formal." },
  { yr: "Sep 2023", ttl: "First trip to Tenerife.", desc: "A month traveling the island. Promised myself I'd come back to stay." },
  { yr: "Jan 2024", ttl: "Altesia · Fileni Group.", desc: "Modernizing legacy VB6 systems into Angular + .NET WebApps. Agile team of 7." },
  { yr: "Sep 2024", ttl: "Barcelona reset.", desc: "A week with my cousin Miki. 15 km daily walks, cold plunges, hard conversations." },
  { yr: "Dec 2024", ttl: "Vietnam, Phu Quoc.", desc: "20 days alone on the other side of the world. Buddhist philosophy. Inner peace that changed me." },
  { yr: "Jan 2025", ttl: "Airplay Control.", desc: "Software engineer on broadcasting systems for clients including RAI, La7 and other Italian TV networks. Angular, .NET, Python automation tooling. International team, English daily." },
  { yr: "Apr 2025", ttl: "Holly chose me.", desc: "Found him under a car. Promised him we'd see the world together. We are." },
  { yr: "Apr 2025", ttl: "Freelance · Angel1.", desc: "Started Mobile/Web/AI development independently. First Freelancer.com clients." },
  { yr: "Oct 2025", ttl: "Spain Roadtrip.", desc: "10 days driving the coast with Holly. Barcelona to Cadiz, via Alicante and Malaga." },
  { yr: "Oct 2025", ttl: "Moved to Tenerife.", desc: "No longer a visitor. Co-working in La Laguna, surf in El Médano on weekends.", pivot: true },
  { yr: "2026", ttl: "claude-mvp-toolkit on npm.", desc: "Open-sourcing the engagement scaffolding I use daily. v0.1 alpha shipped." },
];

interface CurrentlyItem {
  k: string;
  v: string;
  x: string;
}

const CURRENTLY: CurrentlyItem[] = [
  {
    k: "Based in",
    v: "Tenerife, Canary Islands.",
    x: "Co-working in La Laguna. Same time zone as London, ±0. Available for European and US East Coast hours.",
  },
  {
    k: "Working on",
    v: "v0.5 of claude-mvp-toolkit.",
    x: "Adding agent scaffolding and a built-in eval harness. Open-source, MIT licensed.",
  },
  {
    k: "Other",
    v: "Holly the cat. Italian espresso. Long walks.",
    x: "Reading: The Pragmatic Programmer. Weekends: surf in El Médano when the Atlantic cooperates.",
  },
];

export default function About() {
  return (
    <>
      <SEO page="about" canonicalPath="/about" />

      {/* ABOUT HERO */}
      <section className="container about-hero">
        <div className="grid">
          <motion.div
            className="img-ph photo"
            variants={HERO_PHOTO}
            initial="hidden"
            animate="visible"
          >
            <Image
              src="/images/me-15.webp"
              alt="Massimiliano Angelone"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
          </motion.div>
          <MotionSection as="div">
            <motion.span className="eyebrow" variants={FADE_UP}>About</motion.span>
            <motion.span className="role" variants={FADE_UP}>
              AI-Enhanced MVP Developer · 24 years old
            </motion.span>
            <motion.h1 variants={FADE_UP}>
              Massimiliano
              <br />
              Angelone<span className="acc">.</span>
            </motion.h1>
            <motion.p className="lead" variants={FADE_UP}>
              Italian engineer, born in Ancona in 2001. Two+ years building
              production systems at Altesia (client: Fileni Group) and Airplay
              Control (clients: RAI, La7, broadcasters). Now building AI MVPs
              for founders worldwide from Tenerife — with Holly the cat and
              Italian espresso.
            </motion.p>
            <motion.div className="cta-row" variants={FADE_UP}>
              <Link href="/journal/twelve-silent-years" className="link-acc">
                Read my full story <span>→</span>
              </Link>
            </motion.div>
          </MotionSection>
        </div>
      </section>

      {/* TIMELINE */}
      <MotionSection className="container timeline" as="div">
        <div className="tl-head">
          <span className="eyebrow acc">01 / TIMELINE</span>
          <div>
            <h2>
              Timeline
            </h2>
            <p className="sub">
              Twenty-four years compounding. Fourteen moments that shaped the
              engineer.
            </p>
          </div>
        </div>

        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {TIMELINE.map((row, i) => (
            <motion.div
              key={`${row.yr}-${i}`}
              className={`timeline-row${row.pivot ? " pivot" : ""}`}
              variants={STAGGER_ITEM}
            >
              <span className="yr">{row.yr}</span>
              <span className="ttl">{row.ttl}</span>
              <p className="desc">{row.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </MotionSection>

      {/* CURRENTLY */}
      <MotionSection className="container currently" as="div">
        <div className="curr-head">
          <span className="eyebrow acc">02 / CURRENTLY</span>
          <h2>
            Currently
          </h2>
        </div>

        <motion.div
          className="curr-grid"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {CURRENTLY.map((item) => (
            <motion.div
              key={item.k}
              className="card curr-card"
              variants={STAGGER_ITEM}
            >
              <div className="k">{item.k}</div>
              <div className="v">{item.v}</div>
              <p className="x">{item.x}</p>
            </motion.div>
          ))}
        </motion.div>
      </MotionSection>
    </>
  );
}
