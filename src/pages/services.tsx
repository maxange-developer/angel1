import { GetStaticProps } from "next";
import { useState } from "react";
import dynamic from "next/dynamic";
import SEO from "@/components/SEO";
import servicesData from "@/data/services.json";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/useTranslation";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
});
import {
  Code,
  Smartphone,
  Bot,
  Check,
  Instagram,
  Linkedin,
  Mail,
  X,
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

interface ServicesProps {
  services: Service[];
}

const iconMap = {
  Code: Code,
  Smartphone: Smartphone,
  Bot: Bot,
};

export default function Services({ services }: ServicesProps) {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(true);

  return (
    <>
      <SEO page="services" />
      <ThreeBackground />
      <section className="h-screen overflow-y-auto pt-8 max-md:landscape:pt-4 pb-32 scrollbar-hide">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="neon-text">
                {t("services.title").toUpperCase()}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
              {t("services.subtitle")}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-4 lg:gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon =
                iconMap[service.icon as keyof typeof iconMap] || Code;

              return (
                <div
                  key={service.id}
                  className="glass rounded-lg p-4 sm:p-6 md:p-4 lg:p-8 tablet-compact:p-3 hover-lift group relative overflow-hidden border-[3px] border-white/10 hover:border-neon-pink transition-all duration-300"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-4 md:mb-3 lg:mb-6 flex justify-center">
                      <div className="w-16 h-16 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-lg bg-neon-pink/20 border border-neon-pink/50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <Icon className="text-neon-pink" size={32} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-sm lg:text-base xl:text-xl font-bold mb-4 md:mb-2 lg:mb-4 group-hover:text-neon-pink transition-colors duration-300 leading-tight">
                      {t(`services.items.${service.id}.title`)}
                    </h3>

                    {/* Description */}
                    <p className="text-white/70 text-base md:text-sm lg:text-base tablet-compact:text-xs leading-relaxed mb-6 md:mb-3 lg:mb-6 tablet-compact:mb-2">
                      {t(`services.items.${service.id}.description`)}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 md:space-y-2 lg:space-y-3 tablet-compact:space-y-1 text-left">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3 md:gap-2 lg:gap-3 tablet-compact:gap-1 text-sm md:text-xs lg:text-sm tablet-compact:text-[10px] text-white/80"
                        >
                          <Check
                            className="text-neon-green flex-shrink-0 mt-0.5"
                            size={18}
                          />
                          <span>
                            {t(
                              `services.items.${service.id}.features.${featureIndex}`
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Contact Section */}
          <div className="md:hidden mt-12 text-center">
            <p className="text-lg text-white/90 font-semibold mb-2">
              {t("services.contactPopup.title")}
            </p>
            <p className="text-sm text-white/70 mb-6">
              {t("services.mobileContact")}
            </p>
            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <a
                href="https://www.instagram.com/massi_angelone/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 glass border border-neon-pink hover:bg-neon-pink/20 rounded-lg text-neon-pink font-semibold transition-all duration-300"
              >
                <Instagram size={20} />
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/massiangelone/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 glass border border-neon-blue hover:bg-neon-blue/20 rounded-lg text-neon-blue font-semibold transition-all duration-300"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a
                href="mailto:massiangelone01@gmail.com"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 glass border border-neon-green hover:bg-neon-green/20 rounded-lg text-neon-green font-semibold transition-all duration-300"
              >
                <Mail size={20} />
                Email
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      {/* Contact Popup - Fixed Left of Social Buttons (Desktop Only) */}
      {showPopup && (
        <div className="hidden md:block fixed bottom-6 right-24 z-40">
          <div className="glass rounded-lg p-4 border border-neon-blue/30 max-w-xs animate-fade-in relative">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-white/90 font-semibold flex-1">
                {t("services.contactPopup.title")}
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="text-white/50 hover:text-white transition-colors ml-2"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-xs text-white/70">
              {t("services.contactPopup.description")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      services: servicesData,
    },
  };
};
