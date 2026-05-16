import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import AngelLogo from "@/components/AngelLogo";

const NAV_ITEMS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Now", href: "/now" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.pathname]);

  return (
    <>
      <header className="nav-shell">
        <div className="container">
          <nav className="nav">
            <AngelLogo size="header" className="brand" />

            <ul className="links">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  router.pathname === item.href ||
                  (item.href !== "/" && router.pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link href={item.href} className={isActive ? "active" : ""}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link href="/contact" className="nav-cta">
              Start a project →
            </Link>

            <button
              className="nav-hamburger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      <div className={`mobile-menu${isMobileMenuOpen ? " mobile-menu--open" : ""}`}>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="bottom">
          <Link
            href="/contact"
            className="cta"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Start a project →
          </Link>
        </div>
      </div>
    </>
  );
}
