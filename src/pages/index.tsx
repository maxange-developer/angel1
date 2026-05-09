import type { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import { MotionSection } from "@/components/MotionSection";
import { getAllWorkPosts } from "@/lib/mdx";
import {
  FADE_UP,
  FADE_IN,
  STAGGER_CONTAINER,
  STAGGER_ITEM,
  HERO_TITLE,
  HERO_STAGGER,
} from "@/lib/motion";
import { useCountUp } from "@/hooks/useCountUp";
import Testimonial from "@/components/Testimonial";

interface WorkPreview {
  slug: string;
  title: string;
  tagline: string;
  package: string;
  date: string;
  color: string;
  hero: string | null;
  stats: Array<{ label: string; value: string }> | null;
  featured: boolean;
}

interface HomeProps {
  featuredWork: WorkPreview[];
}

const SVC_CARDS = [
  {
    name: "AI Sprint",
    price: "€2,500",
    desc: "One sharp feature — AI-powered, shipped in two weeks.",
    items: ["1 AI feature integration", "Prompt engineering included", "Deploy to production", "14-day turnaround"],
  },
  {
    name: "MVP Lite",
    price: "€5,000",
    desc: "A focused product, end-to-end — ready for your first users.",
    items: ["Full-stack Next.js app", "Auth + database + API", "AI layer included", "30-day turnaround"],
    featured: true,
  },
  {
    name: "MVP Full",
    price: "€9,500",
    desc: "Production-grade. Analytics, payments, onboarding — everything.",
    items: ["Everything in Lite", "Stripe + analytics + email", "Admin dashboard", "60-day turnaround"],
  },
];

function StatCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const { ref, value } = useCountUp(target);
  return (
    <span ref={ref}>
      {prefix}{value}{suffix}
    </span>
  );
}

export default function Home({ featuredWork }: HomeProps) {
  const featured = featuredWork.find((w) => w.featured) ?? featuredWork[0];
  const side = featuredWork.filter((w) => !w.featured || w !== featured).slice(0, 2);

  return (
    <>
      <SEO page="home" canonicalPath="/" />

      {/* HERO */}
      <section className="home-hero">
        <motion.div
          className="home-hero-inner container"
          variants={HERO_STAGGER}
          initial="hidden"
          animate="visible"
        >
          <div className="home-hero-copy">
            <motion.p className="eyebrow" variants={FADE_UP}>
              AI-Enhanced MVP Developer · Available Q3 2026
            </motion.p>
            <motion.h1 variants={HERO_TITLE}>
              Ship AI-powered
              <br />
              products in <em>weeks,</em>
              <br />
              <em>not months.</em>
            </motion.h1>
            <motion.p className="home-hero-lead" variants={FADE_UP}>
              One engineer, fixed price, production-grade. The agency math, inverted.
            </motion.p>
            <motion.div className="home-hero-ctas" variants={FADE_UP}>
              <Link href="/work" className="btn btn-primary">View Work →</Link>
              <Link href="/contact" className="btn btn-ghost">Book a call</Link>
            </motion.div>
            <motion.div className="status" variants={FADE_IN}>
              <span className="status-dot" />
              Available for new projects
            </motion.div>
          </div>
          <motion.div className="home-hero-photo" variants={FADE_IN}>
            <div className="img-ph photo">
              <Image
                src="/images/me-5.webp"
                alt="Massimiliano Angelone"
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="photo"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* HERO INDEX — stats */}
      <MotionSection className="hero-index container">
        <div className="hero-index-grid">
          <div className="hero-index-col">
            <strong><StatCounter target={5300} prefix="$" /></strong>
            <span>Earned on Upwork</span>
          </div>
          <div className="hero-index-col">
            <strong><StatCounter target={100} suffix="%" /></strong>
            <span>Job success score</span>
          </div>
          <div className="hero-index-col">
            <strong>2+</strong>
            <span>Years enterprise work</span>
          </div>
          <div className="hero-index-col">
            <strong>3</strong>
            <span>Open source packages</span>
          </div>
        </div>
      </MotionSection>

      {/* TRUSTED */}
      <MotionSection className="trusted container">
        <p className="trusted-label eyebrow">Trusted by &amp; shipped for</p>
        <div className="trusted-logos">
          {["RAI", "La7", "Fileni", "Upwork", "Freelancer.com", "npm"].map((name) => (
            <span key={name} className="trusted-logo">{name}</span>
          ))}
        </div>
      </MotionSection>

      {/* THESIS */}
      <MotionSection className="sec container">
        <div className="sec-head">
          <p className="eyebrow">The thesis</p>
          <h2>One engineer, fixed price,<br />production-grade.</h2>
          <p className="q">
            Agencies charge 3× and involve 8 people you&apos;ll never meet. I&apos;m the PM, designer,
            and engineer. You get a direct line and a working product — not a Jira backlog.
          </p>
        </div>
      </MotionSection>

      {/* SERVICES */}
      <MotionSection className="sec container">
        <div className="sec-head">
          <p className="eyebrow">Packages</p>
          <h2>Choose your engagement.</h2>
        </div>
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
              className={`svc-card${card.featured ? " svc-card-featured card-featured-glow" : ""}`}
              variants={STAGGER_ITEM}
            >
              {card.featured && <p className="eyebrow acc">Most popular</p>}
              <h3>{card.name}</h3>
              <p className="svc-price">{card.price}</p>
              <p className="svc-desc">{card.desc}</p>
              <ul className="svc-items">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href="/contact" className={`btn ${card.featured ? "btn-primary" : "btn-ghost"}`}>
                Start this →
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </MotionSection>

      {/* WORK — asymmetric grid */}
      {featured && (
        <MotionSection className="sec container">
          <div className="sec-head">
            <p className="eyebrow">Selected work</p>
            <h2>Recent projects.</h2>
          </div>
          <div className="work-asym">
            <Link href={`/work/${featured.slug}`} className="work-feat">
              <div className="img-ph">
                {featured.hero && (
                  <Image src={featured.hero} alt={featured.title} fill className="photo" />
                )}
              </div>
              <div className="work-feat-copy">
                <p className="chip">{featured.package}</p>
                <h3>{featured.title}</h3>
                <p>{featured.tagline}</p>
                <span className="link-acc">View case study →</span>
              </div>
            </Link>
            <div className="work-side-col">
              {side.map((w) => (
                <Link key={w.slug} href={`/work/${w.slug}`} className="work-side">
                  <p className="chip">{w.package}</p>
                  <h4>{w.title}</h4>
                  <p>{w.tagline}</p>
                  <span className="link-acc">View →</span>
                </Link>
              ))}
            </div>
          </div>
        </MotionSection>
      )}

      {/* TESTIMONIAL */}
      <Testimonial
        quote={[
          "For an entire year I worked alongside Massimiliano as he was making his first official steps as a developer. What struck me — and still does — is his complete refusal of the word 'impossible'. No matter how unreasonable a feature request was, I never once heard him say 'it can't be done'. He'd quietly find a way. That's why, when I had a private web app to build, I hired him myself.",
          "He's the kind of person you actually have a conversation with — who listens before he writes code. For me, that human dimension makes all the difference."
        ]}
        name="Alex Sopranzetti"
        role="QA Tester @ Aethra Telecommunications · ex-colleague at Altesia"
        linkedinUrl="TODO_ALEX_LINKEDIN_URL"
      />

      {/* ABOUT SPLIT + FINAL CTA */}
      <MotionSection className="about-split container">
        <div className="about-split-copy">
          <p className="eyebrow">About</p>
          <h2>24. Tenerife.<br />Shipped to production.</h2>
          <p>
            I&apos;ve been building software since 14 — went through a 12-year stretch of
            hearing loss, emerged with sharper focus. Two+ years building production
            systems for clients including RAI, La7 and Fileni Group. Today I work with
            founders worldwide to turn AI ideas into real products.
          </p>
          <Link href="/about" className="btn btn-ghost">Read my story →</Link>
        </div>
        <div className="about-split-photo">
          <div className="img-ph photo">
            <Image
              src="/images/me-5.webp"
              alt="Massimiliano Angelone"
              fill
              sizes="480px"
              className="photo"
            />
          </div>
        </div>
      </MotionSection>

      <MotionSection className="final-cta container">
        <p className="eyebrow">Ready?</p>
        <h2>Let&apos;s ship something real.</h2>
        <p>Fixed price. No retainer. No meetings about meetings.</p>
        <Link href="/contact" className="btn btn-primary">Start a project →</Link>
      </MotionSection>
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
    color: p.frontmatter.color ?? "#1F8BFF",
    hero: p.frontmatter.hero ?? null,
    stats: p.frontmatter.stats ?? null,
    featured: p.frontmatter.featured ?? false,
  }));

  return { props: { featuredWork } };
};
