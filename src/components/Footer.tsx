import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function Footer() {
  const { t } = useTranslation();
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/massi_angelone/",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/massiangelone/",
      icon: Linkedin,
    },
    {
      name: "Email",
      url: "mailto:massiangelone01@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="glass border-t border-white/10 py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-neon-blue transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-white/50 text-xs sm:text-sm text-center md:text-left">
            © {new Date().getFullYear()} Massi Angelone. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
