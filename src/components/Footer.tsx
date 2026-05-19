import Link from "next/link";
import AngelLogo from "@/components/AngelLogo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand col */}
          <div className="brand-col">
            <div className="brand-logo">
              <AngelLogo size="footer" />
            </div>
            <p>
              One engineer, fixed price, production-grade. AI-Enhanced MVPs for
              founders and scale-ups worldwide.
            </p>
          </div>

          {/* Site col */}
          <div className="col">
            <p className="col-label">Site</p>
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
            <p className="col-label">Elsewhere</p>
            <ul>
              {[
                {
                  href: "https://www.linkedin.com/in/massiangelone/",
                  label: "LinkedIn",
                },
                {
                  href: "https://www.instagram.com/massi_angelone/",
                  label: "Instagram",
                },
                { href: "https://github.com/maxange-developer", label: "GitHub" },
                { href: "https://www.npmjs.com/~massiangelone", label: "npm" },
                {
                  href: "https://www.freelancer.com/u/massiangel1",
                  label: "Freelancer.com",
                },
                {
                  href: "https://www.upwork.com/freelancers/~01d8f7eaf267b741d8",
                  label: "Upwork",
                },
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
            <p className="col-label">Get in touch</p>
            <ul>
              <li>
                <a href="mailto:hello@massimilianoangelone.com">
                  hello@massimilianoangelone.com
                </a>
              </li>
              <li>
                <Link href="/contact" className="link-acc">
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
