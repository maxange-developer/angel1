import Image from "next/image";
import Link from "next/link";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";

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
          <div className="img-ph photo mount-hero-photo">
            <Image
              src="/images/me-15.webp"
              alt="Massimiliano Angelone"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
          </div>
          <div className="mount-stagger">
            <span className="eyebrow">About</span>
            <span className="role">
              AI-Enhanced MVP Developer · 24 years old
            </span>
            <h1>
              Massimiliano
              <br />
              Angelone<span className="acc">.</span>
            </h1>
            <p className="lead">
              Italian engineer, born in Ancona in 2001. Two+ years building
              production systems at Altesia (client: Fileni Group) and Airplay
              Control (clients: RAI, La7, broadcasters). Now building AI MVPs
              for founders worldwide from Tenerife — with Holly the cat and
              Italian espresso.
            </p>
            <div className="cta-row">
              <Link href="/journal/twelve-silent-years" className="link-acc">
                Read my full story <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <Reveal className="container timeline" as="div" variant="fade-up">
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

        <Reveal as="div" variant="stagger">
          {TIMELINE.map((row, i) => (
            <div
              key={`${row.yr}-${i}`}
              className={`timeline-row${row.pivot ? " pivot" : ""}`}
            >
              <span className="yr">{row.yr}</span>
              <span className="ttl">{row.ttl}</span>
              <p className="desc">{row.desc}</p>
            </div>
          ))}
        </Reveal>
      </Reveal>

      {/* CURRENTLY */}
      <Reveal className="container currently" as="div" variant="fade-up">
        <div className="curr-head">
          <span className="eyebrow acc">02 / CURRENTLY</span>
          <h2>
            Currently
          </h2>
        </div>

        <Reveal className="curr-grid" as="div" variant="stagger">
          {CURRENTLY.map((item) => (
            <div
              key={item.k}
              className="card curr-card"
            >
              <div className="k">{item.k}</div>
              <div className="v">{item.v}</div>
              <p className="x">{item.x}</p>
            </div>
          ))}
        </Reveal>
      </Reveal>
    </>
  );
}
