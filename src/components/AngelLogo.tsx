import { useState, useEffect } from "react";
import Link from "next/link";

interface AngelLogoProps {
  size?: "header" | "footer";
  className?: string;
}

export default function AngelLogo({ size = "header", className }: AngelLogoProps) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(max-width: 768px)");
    const updateMobile = () => setIsMobile(mql.matches);
    updateMobile();
    mql.addEventListener("change", updateMobile);

    if (mql.matches) {
      return () => mql.removeEventListener("change", updateMobile);
    }

    if (size === "footer") {
      setExpanded(true);
      return () => mql.removeEventListener("change", updateMobile);
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduce ? 0 : 800;
    const timer = window.setTimeout(() => setExpanded(true), delay);

    const onScroll = () => {
      if (window.scrollY > 80) setExpanded(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      mql.removeEventListener("change", updateMobile);
    };
  }, [size]);

  const handleMouseEnter = () => {
    if (!isMobile && !expanded) setExpanded(true);
  };

  const shouldExpand = !isMobile && expanded;

  return (
    <Link
      href="/"
      className={`angel-logo angel-logo--${size}${shouldExpand ? " is-expanded" : ""}${className ? " " + className : ""}`}
      onMouseEnter={handleMouseEnter}
      aria-label="Angel1 home"
    >
      <span className="angel-logo__letter">A</span>
      <span className="angel-logo__middle" aria-hidden="true">
        NGEL
      </span>
      <span className="angel-logo__letter angel-logo__accent">1</span>
    </Link>
  );
}
