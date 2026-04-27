import { ReactNode } from "react";
import Image from "next/image";
import Header from "./Header";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isLangMenuOpen, setIsLangMenuOpen, currentLang, setCurrentLang } =
    useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">{children}</main>

      {/* Language Selector - Global (Desktop Only) */}
      <div className="hidden md:flex fixed bottom-6 right-6 flex-col gap-3 z-50">
        <div className="relative">
          <button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="w-12 h-12 glass rounded-full flex items-center justify-center border border-white/30 hover:border-white/50 transition-all duration-300 overflow-hidden p-2"
            aria-label="Select Language"
          >
            <Image
              src={`https://flagcdn.com/w40/${
                currentLang === "it" ? "it" : currentLang === "en" ? "gb" : "es"
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

          {isLangMenuOpen && (
            <div className="absolute bottom-14 right-0 flex flex-col gap-2">
              {currentLang !== "en" && (
                <button
                  onClick={() => {
                    setCurrentLang("en");
                    setIsLangMenuOpen(false);
                  }}
                  className="w-12 h-12 glass rounded-full flex items-center justify-center border border-white/30 hover:border-white/50 transition-all duration-300 overflow-hidden p-2"
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
                  className="w-12 h-12 glass rounded-full flex items-center justify-center border border-white/30 hover:border-white/50 transition-all duration-300 overflow-hidden p-2"
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
                  className="w-12 h-12 glass rounded-full flex items-center justify-center border border-white/30 hover:border-white/50 transition-all duration-300 overflow-hidden p-2"
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

        <a
          href="https://www.instagram.com/massi_angelone/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 glass rounded-full flex items-center justify-center border border-neon-pink hover:border-neon-pink bg-neon-pink/20 hover:bg-neon-pink/30 md:bg-transparent md:border-neon-pink/50 md:hover:bg-neon-pink/20 transition-all duration-300 group"
          aria-label="Instagram"
        >
          <Instagram className="text-neon-pink" size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/massiangelone/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 glass rounded-full flex items-center justify-center border border-neon-blue hover:border-neon-blue bg-neon-blue/20 hover:bg-neon-blue/30 md:bg-transparent md:border-neon-blue/50 md:hover:bg-neon-blue/20 transition-all duration-300 group"
          aria-label="LinkedIn"
        >
          <Linkedin className="text-neon-blue" size={20} />
        </a>
        <a
          href="mailto:massiangelone01@gmail.com"
          className="w-12 h-12 glass rounded-full flex items-center justify-center border border-neon-green hover:border-neon-green bg-neon-green/20 hover:bg-neon-green/30 md:bg-transparent md:border-neon-green/50 md:hover:bg-neon-green/20 transition-all duration-300 group"
          aria-label="Email"
        >
          <Mail className="text-neon-green" size={20} />
        </a>
      </div>
    </div>
  );
}
