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
  {
    yr: "2001",
    ttl: "Born in Ancona, Italy.",
    desc: "Ancona. Family, the people who didn't give up later.",
  },
  {
    yr: "2003",
    ttl: "Diagnosis: profound hearing damage.",
    desc: "Missed diagnosis. Both eardrums perforated. Twelve silent years began here.",
  },
  {
    yr: "2014",
    ttl: "Third surgery succeeds. I hear clearly.",
    desc: "Third attempt. Dr. Trabalzini's experimental cartilage technique held — first patient in Italy. First time I heard the world clearly, at thirteen.",
    pivot: true,
  },
  {
    yr: "2015",
    ttl: "Fourth surgery. Both ears working.",
    desc: "Same technique on the other ear, the following August. At fourteen, the world stopped being a guess.",
  },
  {
    yr: "2017",
    ttl: "First flight, Edinburgh.",
    desc: "After the surgery, finally cleared to fly. First trip abroad.",
  },
  {
    yr: "2022",
    ttl: "Start2Impact University.",
    desc: "Start2Impact's Full Stack track. React, Angular, Node.js. Code stopped being a hobby.",
  },
  {
    yr: "Sep 2023",
    ttl: "First trip to Tenerife.",
    desc: "One month, end to end. Left with the decision already made — I'd come back to stay.",
  },
  {
    yr: "Jan 2024",
    ttl: "Altesia · Fileni Group.",
    desc: "Legacy VB6 → Angular + .NET. First taste of enterprise scale, real users, real consequences.",
  },
  {
    yr: "Sep 2024",
    ttl: "Barcelona reset.",
    desc: "A week with Miki. Walking, cold water, hours of talking. Came back different.",
  },
  {
    yr: "Dec 2024",
    ttl: "Vietnam, Phu Quoc.",
    desc: "20 days, alone, on the other side of the world. Buddhist temples, slow mornings, the kind of silence you can't manufacture at home.",
  },
  {
    yr: "Jan 2025",
    ttl: "Airplay Control.",
    desc: "Broadcasting systems engineer. RAI, La7, other networks. Code that goes live every night, on millions of TVs.",
  },
  {
    yr: "Apr 2025",
    ttl: "Freelance · Angel1.",
    desc: "Angel1 begins. First Freelancer.com clients, first invoices in my own name.",
  },
  {
    yr: "Oct 2025",
    ttl: "Spain Roadtrip.",
    desc: "10 days, Barcelona to Cadiz. Coast roads, no agenda. The trip before the move.",
  },
  {
    yr: "Oct 2025",
    ttl: "Moved to Tenerife.",
    desc: "Tenerife, this time to stay. The decision from 2023 became address, schedule, daily walks to the sea.",
    pivot: true,
  },
  {
    yr: "May 2026",
    ttl: "angel1-mvp-toolkit v1.0 on npm.",
    desc: "Released v1.0 on npm. The scaffolding I'd been copying project-to-project, finally extracted into a tool.",
  },
  {
    yr: "May 2026",
    ttl: "angel1-rag-eval v1.0 on npm.",
    desc: "The second tool. Measures whether a RAG pipeline actually works — retrieval, faithfulness, correctness.",
  },
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
    x: "On the island since October 2025. Working from home, sometimes from a café in town. Heading to Bali in early July 2026.",
  },
  {
    k: "Building",
    v: "A personal SaaS, quietly.",
    x: "Side project, no client. The kind of itch you scratch when the tooling work leaves room for it. More to share when there's something to show.",
  },
  {
    k: "Other",
    v: "Long walks. Reading. Buddhist philosophy.",
    x: "Reading Gianluca Gotto. Long walks. Building toward Bali in early July 2026 — the next chapter.",
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
              src="/images/me-tnf-hero.webp"
              alt="Massimiliano Angelone"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              quality={95}
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
              priority
            />
          </div>
          <div className="mount-stagger">
            <span className="eyebrow">About</span>
            <span className="role">AI-Enhanced MVP Developer</span>
            <h1>
              Massimiliano
              <br />
              Angelone<span className="acc">.</span>
            </h1>
            <p className="lead">
              Italian engineer, born in Ancona in 2001. Now building AI MVPs for
              founders worldwide from Tenerife — and heading to Bali.
            </p>
            <div className="cta-row">
              <Link href="/journal/the-long-road" className="link-acc">
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
            <h2>Timeline</h2>
            <p className="sub">
              Twenty-four years compounding. The moments that shaped the
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
          <h2>Currently</h2>
        </div>

        <Reveal className="curr-grid" as="div" variant="stagger">
          {CURRENTLY.map((item) => (
            <div key={item.k} className="card curr-card">
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
