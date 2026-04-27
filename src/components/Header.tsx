"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLangMenuOpen, setIsLangMenuOpen, currentLang, setCurrentLang } =
    useLanguage();
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t("navbar.home"), href: "/" },
    { label: t("navbar.timeline"), href: "/timeline" },
    { label: t("navbar.blog"), href: "/blog" },
    { label: t("navbar.services"), href: "/services" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-lg" : "bg-transparent"
      }`}
      style={
        isScrolled
          ? {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            }
          : {}
      }
    >
      <nav className="container mx-auto px-6 py-4 max-md:landscape:py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo/logo-white.webp"
            alt="Angel1"
            width={80}
            height={80}
            priority
            loading="eager"
            className="h-12 sm:h-16 md:h-20 max-md:landscape:h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch={true}
                className={`text-xl uppercase tracking-wide transition-colors duration-300 hover:text-[#00f0ff] ${
                  router.pathname === item.href
                    ? "text-[#00f0ff]"
                    : "text-white"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-menu border-t border-white/10">
          <ul className="flex flex-col gap-4 px-6 py-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={true}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-lg uppercase tracking-wide transition-all duration-300 ${
                    router.pathname === item.href
                      ? "text-neon-blue"
                      : "text-white hover:text-neon-blue"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Language Selector and Social Links - Mobile */}
          <div className="flex items-center gap-4 px-6 pb-6 justify-between">
            {/* Language Selector - Mobile */}
            <div className="relative flex items-center gap-2">
              {/* Current Language Button */}
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="w-10 h-10 glass rounded-full flex items-center justify-center border border-white/30 hover:border-white/50 transition-all duration-300 overflow-hidden p-1.5"
                aria-label="Select Language"
              >
                <Image
                  src={`https://flagcdn.com/w40/${
                    currentLang === "it"
                      ? "it"
                      : currentLang === "en"
                      ? "gb"
                      : "es"
                  }.png`}
                  alt={
                    currentLang === "it"
                      ? "Italiano"
                      : currentLang === "en"
                      ? "English"
                      : "Español"
                  }
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-full"
                  unoptimized
                />
              </button>

              {/* Language Options - Horizontal */}
              {isLangMenuOpen && (
                <div className="flex items-center gap-2 animate-fade-in">
                  {currentLang !== "en" && (
                    <button
                      onClick={() => {
                        setCurrentLang("en");
                        setIsLangMenuOpen(false);
                      }}
                      className="w-10 h-10 glass rounded-full flex items-center justify-center border border-white/30 hover:border-white/50 transition-all duration-300 overflow-hidden p-1.5"
                      aria-label="English"
                    >
                      <Image
                        src="https://flagcdn.com/w40/gb.png"
                        alt="English"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-full"
                        unoptimized
                      />
                    </button>
                  )}
                  {currentLang !== "es" && (
                    <button
                      onClick={() => {
                        setCurrentLang("es");
                        setIsLangMenuOpen(false);
                      }}
                      className="w-10 h-10 glass rounded-full flex items-center justify-center border border-white/30 hover:border-white/50 transition-all duration-300 overflow-hidden p-1.5"
                      aria-label="Spanish"
                    >
                      <Image
                        src="https://flagcdn.com/w40/es.png"
                        alt="Español"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-full"
                        unoptimized
                      />
                    </button>
                  )}
                  {currentLang !== "it" && (
                    <button
                      onClick={() => {
                        setCurrentLang("it");
                        setIsLangMenuOpen(false);
                      }}
                      className="w-10 h-10 glass rounded-full flex items-center justify-center border border-white/30 hover:border-white/50 transition-all duration-300 overflow-hidden p-1.5"
                      aria-label="Italian"
                    >
                      <Image
                        src="https://flagcdn.com/w40/it.png"
                        alt="Italiano"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-full"
                        unoptimized
                      />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/massi_angelone/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-neon-pink/20 border border-neon-pink hover:bg-neon-pink/40 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neon-pink"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/massiangelone/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-neon-blue/20 border border-neon-blue hover:bg-neon-blue/40 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neon-blue"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="mailto:massiangelone01@gmail.com"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-neon-green/20 border border-neon-green hover:bg-neon-green/40 transition-all duration-300"
                aria-label="Email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-neon-green"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
