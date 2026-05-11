import type { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";
import { getAllWorkPosts } from "@/lib/mdx";
import {
  FADE_UP,
  STAGGER_CONTAINER,
  STAGGER_ITEM,
  HERO_TITLE,
  HERO_STAGGER,
  HERO_PHOTO,
} from "@/lib/motion";
import { useCountUp } from "@/hooks/useCountUp";
import Testimonial from "@/components/Testimonial";
import PageBreak from "@/components/PageBreak";

interface WorkPreview {
  slug: string;
  title: string;
  tagline: string;
  package: string;
  date: string;
  client: string;
  hero: string | null;
  stats: Array<{ label: string; value: string }> | null;
  stack: string[];
  featured: boolean;
}

interface HomeProps {
  featuredWork: WorkPreview[];
}

const SVC_CARDS = [
  {
    name: "AI Sprint",
    cur: "€",
    price: "2,500",
    duration: "1 week",
    desc: "A working prototype, end of week. For founders who need to put something in front of users on Monday.",
    deliv: [
      "Scope locked day 1",
      "Single core feature, end-to-end",
      "Deploy + handover doc",
    ],
    featured: false,
  },
  {
    name: "AI MVP Lite",
    cur: "€",
    price: "5,000",
    duration: "2 weeks",
    desc: "A real MVP — auth, data, AI, payments-ready. The version you raise on. The version you sell.",
    deliv: [
      "Full Supabase schema + RLS",
      "AI integration (Claude / OpenAI)",
      "3 weeks post-launch support",
    ],
    featured: true,
  },
  {
    name: "AI MVP Full",
    cur: "€",
    price: "9,500",
    duration: "4 weeks",
    desc: "Production-grade. Multi-tenant, observability, the architecture that survives the first 1,000 paying users.",
    deliv: [
      "Multi-tenant + RBAC + billing",
      "RAG + agent pipelines, evaluated",
      "6 weeks post-launch support",
    ],
    featured: false,
  },
];

function StatCounter({
  target,
  suffix = "",
  prefix = "",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const { ref, value } = useCountUp(target);
  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export default function Home({ featuredWork }: HomeProps) {
  const featured = featuredWork.find((w) => w.featured) ?? featuredWork[0];
  const side = featuredWork.filter((w) => w !== featured).slice(0, 2);

  return (
    <>
      <SEO page="home" canonicalPath="/" />

      {/* HERO */}
      <section className="container home-hero">
        <motion.div
          className="grid"
          variants={HERO_STAGGER}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.span className="eyebrow" variants={FADE_UP}>
              <span className="dot" />
              AI-Enhanced MVP Developer · Available now
            </motion.span>
            <motion.h1 variants={HERO_TITLE}>
              Ship AI-powered
              <br />
              products in <span className="q">weeks,</span>
              <br />
              <span className="q">not months</span>
              <span className="acc">.</span>
            </motion.h1>
            <motion.p className="lead" variants={FADE_UP}>
              One engineer, fixed price, production-grade.
              <br />
              The agency math, inverted.
            </motion.p>
            <motion.div className="ctas" variants={FADE_UP}>
              <Link href="/work" className="btn btn-primary">
                View Work <span className="arr">→</span>
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Book a call
              </Link>
            </motion.div>
          </div>

          <motion.div variants={HERO_PHOTO}>
            <div className="img-ph photo">
              <Image
                src="/images/me-5.webp"
                alt="Massimiliano Angelone"
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
                priority
              />
            </div>
            <div className="photo-cap">[ portrait · tenerife · 2025 ]</div>
            <div className="right-trust">
              <span className="status">Available now</span>
              <div className="right-trust-meta">
                <span className="rt-line">★ 5.0 · 100% job success</span>
                <span className="rt-line">Demo portfolio · Open source on npm</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* HERO INDEX — stats */}
        <MotionSection className="hero-index" as="div">
          <div className="col">
            <div className="k">Earned</div>
            <div className="v">
              <StatCounter target={5300} prefix="$" />
            </div>
            <div className="x">Verified on Freelancer.com</div>
          </div>
          <div className="col">
            <div className="k">Job success</div>
            <div className="v">
              <StatCounter target={100} suffix="%" />
            </div>
            <div className="x">5.0 ★ rating</div>
          </div>
          <div className="col">
            <div className="k">Enterprise</div>
            <div className="v">2+ years</div>
            <div className="x">Altesia · Airplay Control</div>
          </div>
          <div className="col">
            <div className="k">Open source</div>
            <div className="v">npm</div>
            <div className="x">claude-mvp-toolkit</div>
          </div>
        </MotionSection>
      </section>

      {/* TRUSTED */}
      <MotionSection className="trusted" as="div">
        <div className="container">
          <div className="grid">
            <span className="label">Trusted by teams at</span>
            <div className="logos">
              <a
                href="https://altesia.it"
                target="_blank"
                rel="noopener noreferrer"
                className="trusted-logo-link"
                aria-label="Altesia"
              >
                <Image
                  src="/images/logo_ALTESIA.svg"
                  alt="Altesia"
                  width={88}
                  height={32}
                  className="trusted-logo-img"
                />
              </a>
              <a
                href="https://airplaycontrol.com"
                target="_blank"
                rel="noopener noreferrer"
                className="trusted-logo-link"
                aria-label="Airplay Control"
              >
                <Image
                  src="/images/airplay-logo.webp"
                  alt="Airplay Control"
                  width={120}
                  height={32}
                  className="trusted-logo-img"
                />
              </a>
              <a
                href="https://www.upwork.com"
                target="_blank"
                rel="noopener noreferrer"
                className="trusted-logo-link"
                aria-label="Upwork"
              >
                <Image
                  src="/images/upwork.svg"
                  alt="Upwork"
                  width={96}
                  height={32}
                  className="trusted-logo-img"
                />
              </a>
              <a
                href="https://www.freelancer.com/u/massiangel1"
                target="_blank"
                rel="noopener noreferrer"
                className="trusted-logo-link"
                aria-label="Freelancer.com"
              >
                <Image
                  src="/images/freelancer-logo.svg"
                  alt="Freelancer.com"
                  width={110}
                  height={32}
                  className="trusted-logo-img"
                />
              </a>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* SERVICES PREVIEW */}
      <div className="container sec">
        <MotionSection className="sec-head" as="div">
          <span className="eyebrow acc">01 / SERVICES</span>
          <div>
            <h2>
              Three productized tracks.
            </h2>
            <p className="sub">
              Same workflow, same engineering rigor — different surface area.
              Pick the timeline that matches your stage. I ship.
            </p>
          </div>
        </MotionSection>

        <motion.div
          className="svc-grid"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {SVC_CARDS.map((card) => (
            <motion.div
              key={card.name}
              className={`card svc-card${card.featured ? " featured card-featured-glow" : ""}`}
              variants={STAGGER_ITEM}
            >
              {card.featured && <span className="badge">MOST POPULAR</span>}
              <span className="name">{card.name}</span>
              <div className="price">
                <span className="cur">{card.cur}</span>
                {card.price}
              </div>
              <span className="duration">{card.duration}</span>
              <p className="desc">{card.desc}</p>
              <ul className="deliv">
                {card.deliv.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <Link href="/services" className="more">
                Learn more <span>→</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* SELECTED WORK */}
      {featured && (
        <div className="container sec" style={{ paddingTop: 0 }}>
          <MotionSection className="sec-head" as="div">
            <span className="eyebrow acc">02 / SELECTED WORK</span>
            <div>
              <h2>
                Recent work.
              </h2>
              <p className="sub">
                Three projects shipped end-to-end. Same person designing,
                building, deploying. That&apos;s the multiplier.
              </p>
            </div>
          </MotionSection>

          <motion.div
            className="work-asym"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Featured project */}
            <motion.div variants={STAGGER_ITEM} style={{ gridRow: "span 2" }}>
              <Link
                href={`/work/${featured.slug}`}
                className="card feat work-feat"
              >
                <div className="img-ph">
                  {featured.hero && (
                    <Image
                      src={featured.hero}
                      alt={featured.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 700px"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className="body">
                  <div className="meta-line">
                    <span className="chip">FEATURED · {featured.date}</span>
                    <span className="chip">{featured.package.toUpperCase()}</span>
                  </div>
                  <h3>{featured.title}</h3>
                  <p className="tagline">{featured.tagline}</p>
                  {featured.stack && featured.stack.length > 0 && (
                    <div className="stack">
                      {featured.stack.slice(0, 4).map((s) => (
                        <span key={s} className="chip">{s.toUpperCase()}</span>
                      ))}
                    </div>
                  )}
                  {featured.stats && featured.stats.length > 0 && (
                    <div className="stat-row">
                      {featured.stats.slice(0, 3).map((stat) => (
                        <div key={stat.label} className="stat">
                          <div className="k">{stat.label}</div>
                          <div className="v">{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <span className="link-acc read">
                    Read case study <span>→</span>
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Side projects */}
            <motion.div className="work-side-col" variants={STAGGER_ITEM}>
              {side.map((w) => (
                <Link key={w.slug} href={`/work/${w.slug}`} className="card work-side">
                  <div className="img-ph">
                    {w.hero && (
                      <Image
                        src={w.hero}
                        alt={w.title}
                        fill
                        sizes="400px"
                        style={{ objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <h4>{w.title}</h4>
                  <p className="tag">{w.tagline}</p>
                  <div className="meta">
                    <span>{w.package.toUpperCase()}</span>
                    <span>{w.date}</span>
                  </div>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* TESTIMONIAL */}
      <Testimonial
        quote={[
          "For an entire year I worked alongside Massimiliano as he was making his first official steps as a developer. What struck me — and still does — is his complete refusal of the word 'impossible'. No matter how unreasonable a feature request was, I never once heard him say 'it can't be done'. He'd quietly find a way. That's why, when I had a private web app to build, I hired him myself.",
          "He's the kind of person you actually have a conversation with — who listens before he writes code. For me, that human dimension makes all the difference.",
        ]}
        name="Alex Sopranzetti"
        role="QA Tester @ Aethra Telecommunications · ex-colleague at Altesia"
        linkedinUrl="https://www.linkedin.com/in/alex-sopranzetti-b16689218/"
      />

      {/* PAGE BREAK → ABOUT */}
      <PageBreak num="05" label="ABOUT" name="angel1.dev — about" />

      {/* ABOUT SPLIT */}
      <div className="container sec" style={{ paddingTop: 0 }}>
        <MotionSection className="about-split" as="div">
          <div className="img-ph photo">
            <Image
              src="/images/me-5.webp"
              alt="Massimiliano Angelone"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </div>
          <div className="copy">
            <span className="eyebrow acc">03 / ABOUT</span>
            <h2 style={{ marginTop: "16px" }}>
              From Ancona to Tenerife,
              <br />
              <span className="q">via two years in enterprise.</span>
            </h2>
            <p>
              Born in Ancona in 2001. Twelve silent years before a surgery that
              changed everything at 14. Self-taught through Start2Impact. Two+
              years at Altesia (client: Fileni Group) and Airplay Control
              (clients: RAI, La7). Now building AI MVPs for founders worldwide
              from Tenerife, with Holly the cat.
            </p>
            <div className="cta-row">
              <Link href="/journal/twelve-silent-years" className="link-acc">
                Read my full story <span>→</span>
              </Link>
            </div>
          </div>
        </MotionSection>
      </div>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container">
          <p className="eyebrow">Ready</p>
          <h2>
            Have an idea
            <br />
            worth shipping?
          </h2>
          <p>Available now. Fixed price. No retainer.</p>
          <div className="ctas">
            <Link href="/contact" className="btn btn-primary">
              Start a project <span className="arr">→</span>
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Book a call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllWorkPosts();
  const featuredWork: WorkPreview[] = posts.map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    tagline: p.frontmatter.tagline,
    package: p.frontmatter.package,
    date: p.frontmatter.date,
    client: p.frontmatter.client,
    hero: p.frontmatter.hero ?? null,
    stats: p.frontmatter.stats ?? null,
    stack: p.frontmatter.stack ?? [],
    featured: p.frontmatter.featured ?? false,
  }));

  return { props: { featuredWork } };
};
