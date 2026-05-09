import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand col */}
          <div className="brand-col">
            <h3>
              <Link href="/">
                <Image
                  src="/images/logo-a1-w.webp"
                  alt="Angel1"
                  width={120}
                  height={36}
                />
              </Link>
            </h3>
            <p>
              One engineer, fixed price, production-grade. AI-Enhanced MVPs for
              founders and scale-ups worldwide.
            </p>
          </div>

          {/* Site col */}
          <div className="col">
            <h4>Site</h4>
            <ul>
              {[
                { href: "/", label: "Home" },
                { href: "/work", label: "Work" },
                { href: "/services", label: "Services" },
                { href: "/about", label: "About" },
                { href: "/journal", label: "Journal" },
                { href: "/now", label: "Now" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere col */}
          <div className="col">
            <h4>Elsewhere</h4>
            <ul>
              {[
                { href: "https://www.linkedin.com/in/massiangelone/", label: "LinkedIn" },
                { href: "https://www.instagram.com/massi_angelone/", label: "Instagram" },
                { href: "https://github.com/massiangelone", label: "GitHub" },
                { href: "https://www.npmjs.com/~massiangelone", label: "npm" },
                { href: "https://www.freelancer.com/u/massiangelone", label: "Freelancer.com" },
              ].map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div className="col">
            <h4>Get in touch</h4>
            <ul>
              <li>
                <a href="mailto:massiangelone01@gmail.com">
                  massiangelone01@gmail.com
                </a>
              </li>
              <li>
                <Link href="/contact">Book a call</Link>
              </li>
              <li>
                <Link href="/contact" style={{ color: "var(--accent)" }}>
                  Start a project →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal row */}
        <div className="legal">
          <span>© 2026 Angel1 · Massimiliano Angelone</span>
          <span>Tenerife — Worldwide</span>
        </div>
      </div>
    </footer>
  );
}
