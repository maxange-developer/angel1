import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import SEO from "@/components/SEO";
import Typewriter from "@/components/Typewriter";
import { ArrowRight, Instagram, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
});

export default function Home() {
  const { t } = useTranslation();

  const typewriterTexts = [
    "Full Stack Developer",
    "Digital Nomad",
    "AI Specialist",
    "Mobile Developer",
  ];

  return (
    <>
      <SEO page="home" />
      <ThreeBackground />

      <section className="min-h-screen max-h-820:h-screen overflow-y-auto flex items-center justify-center relative max-h-820:items-start max-h-820:pt-8 px-4 sm:px-6 -mt-8 sm:-mt-16 max-h-820:mt-0 max-md:landscape:-mt-12 max-md:landscape:max-h-[500px]:h-screen max-md:landscape:max-h-[500px]:items-start max-md:landscape:max-h-[500px]:pt-4">
        <div className="container mx-auto max-w-6xl max-h-820:pb-32 max-md:landscape:max-h-[500px]:pb-16 max-md:pb-20">
          {/* Top section - Photo left, Title right */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-lg:gap-6 items-center mb-8 sm:mb-12 max-md:landscape:gap-3 max-md:landscape:mb-3 max-md:gap-3 max-md:mb-4 max-lg:mb-8">
            {/* Photo */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-80 lg:h-80 tablet-range:w-56 tablet-range:h-56 max-md:landscape:w-24 max-md:landscape:h-24 max-md:w-32 max-md:h-32 rounded-full overflow-hidden border-4 max-md:border-2 border-neon-blue shadow-2xl">
                <Image
                  src="/images/me-5.PNG"
                  alt="Massi Angelone"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Title */}
            <div className="text-center md:text-left flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl tablet-range:text-5xl max-md:landscape:text-xl max-md:text-2xl font-bold">
                <span className="block mb-1 sm:mb-2 tablet-range:mb-1.5 max-md:landscape:mb-0 max-md:mb-0.5 text-white">
                  MASSIMILIANO
                </span>
                <span className="block text-[#00f0ff]">ANGELONE</span>
              </h1>
            </div>
          </div>

          {/* Bottom section - All centered */}
          <div className="text-center max-w-3xl mx-auto">
            {/* Typewriter Subtitle */}
            <div className="text-base sm:text-lg md:text-xl lg:text-3xl max-lg:text-2xl max-md:landscape:text-xs max-md:text-xs text-white/80 h-8 sm:h-10 max-lg:h-9 max-md:landscape:h-5 max-md:h-6 mb-4 sm:mb-6 max-lg:mb-5 max-md:landscape:mb-1.5 max-md:mb-2">
              <Typewriter texts={typewriterTexts} />
            </div>
            {/* Tagline */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl max-lg:text-lg max-md:landscape:text-[10px] max-md:text-[11px] text-white/60 mb-4 sm:mb-6 max-lg:mb-5 max-md:landscape:mb-1.5 max-md:mb-2">
              {t("home.tagline")}
            </p>

            {/* Bio */}
            <p className="text-sm sm:text-base md:text-lg max-lg:text-base max-md:landscape:text-[10px] max-md:text-xs text-white/70 mb-6 sm:mb-10 max-lg:mb-8 max-md:landscape:mb-2 max-md:mb-3 leading-relaxed">
              {t("home.bio")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-lg:gap-3 max-md:landscape:gap-1.5 max-md:gap-2 justify-center">
              <Link
                href="/blog"
                className="group relative px-4 sm:px-6 lg:px-8 max-lg:px-6 max-md:landscape:px-2 max-md:px-3 py-3 sm:py-4 max-lg:py-3 max-md:landscape:py-1.5 max-md:py-2 bg-transparent border-2 max-md:border border-neon-blue text-white text-sm sm:text-base max-lg:text-sm max-md:landscape:text-[10px] max-md:text-xs font-semibold uppercase tracking-wider overflow-hidden transition-all duration-300 hover:text-black"
              >
                <span className="relative z-10 flex items-center gap-2 max-md:gap-1 justify-center">
                  {t("home.ctaTimeline")}
                  <ArrowRight
                    className="group-hover:translate-x-2 transition-transform duration-300 max-md:landscape:w-2.5 max-md:landscape:h-2.5 max-md:w-3 max-md:h-3"
                    size={18}
                  />
                </span>
                <span className="absolute inset-0 bg-neon-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>

              <Link
                href="/services"
                className="px-4 sm:px-6 lg:px-8 max-lg:px-6 max-md:landscape:px-2 max-md:px-3 py-3 sm:py-4 max-lg:py-3 max-md:landscape:py-1.5 max-md:py-2 border-2 max-md:border border-neon-pink text-white text-sm sm:text-base max-lg:text-sm max-md:landscape:text-[10px] max-md:text-xs font-semibold uppercase tracking-wider hover:bg-neon-pink hover:text-black transition-all duration-300"
              >
                {t("home.ctaServices")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
