import { GetStaticProps } from "next";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import SEO from "@/components/SEO";
import timelineData from "@/data/timeline.json";
import timelineTranslations from "@/data/timeline-translations.json";
import { useTranslation } from "@/hooks/useTranslation";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
});
import {
  Briefcase,
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Star,
  Instagram,
  Linkedin,
  Mail,
  Globe,
} from "lucide-react";

interface TimelineEvent {
  id: string;
  type: "work" | "milestone" | "travel";
  date: string;
  title: string;
  role?: string;
  description: string;
  stack?: string[];
  images: string[];
  slug?: string;
  url?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

// Parse date strings to Date objects for sorting
const parseDate = (dateString: string): Date => {
  const months: { [key: string]: number } = {
    Gen: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    Mag: 4,
    Giu: 5,
    Lug: 6,
    Ago: 7,
    Set: 8,
    Ott: 9,
    Nov: 10,
    Dic: 11,
    Gennaio: 0,
    Febbraio: 1,
    Marzo: 2,
    Aprile: 3,
    Maggio: 4,
    Giugno: 5,
    Luglio: 6,
    Agosto: 7,
    Settembre: 8,
    Ottobre: 9,
    Novembre: 10,
    Dicembre: 11,
  };

  // Handle different date formats
  if (dateString.includes(" - ")) {
    // Range format: "Gen 2024 - Dic 2024", use start date
    dateString = dateString.split(" - ")[0];
  }

  if (dateString.toLowerCase().includes("presente")) {
    return new Date(); // Current date for "Presente"
  }

  const parts = dateString.trim().split(" ");

  if (parts.length === 3) {
    // Format: "23 Aprile 2001"
    const day = parseInt(parts[0]);
    const month = months[parts[1]];
    const year = parseInt(parts[2]);
    return new Date(year, month, day);
  } else if (parts.length === 2) {
    // Format: "Dic 2024"
    const month = months[parts[0]];
    const year = parseInt(parts[1]);
    return new Date(year, month, 1);
  }

  return new Date();
};

export default function Timeline({ events }: TimelineProps) {
  const { t, currentLang } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTravel, setSelectedTravel] = useState<TimelineEvent | null>(
    null
  );
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lineHeight, setLineHeight] = useState({ top: 16, height: 0 });

  const getTranslatedContent = (
    eventId: string,
    field: "title" | "role" | "description"
  ) => {
    const translations = timelineTranslations as any;
    return translations[eventId]?.[field]?.[currentLang] || "";
  };
  const firstNodeRef = useRef<HTMLDivElement>(null);
  const lastNodeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateLineHeight = () => {
      if (firstNodeRef.current && lastNodeRef.current && containerRef.current) {
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const firstNodeTop = firstNodeRef.current.getBoundingClientRect().top;
        const lastNodeTop = lastNodeRef.current.getBoundingClientRect().top;

        const top = firstNodeTop - containerTop + 8;
        const height = lastNodeTop - firstNodeTop;

        setLineHeight({ top, height });
      }
    };

    // Usa setTimeout per aspettare che il DOM sia completamente renderizzato
    const timer = setTimeout(calculateLineHeight, 100);
    window.addEventListener("resize", calculateLineHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateLineHeight);
    };
  }, [events]);

  // Sort events by date (oldest to newest)
  const sortedEvents = [...events].sort(
    (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
  );

  // Determine slide configuration based on screen size
  // Tablet (md): 3 slides with 3-4-4 distribution
  // Tablet range (1024-1280): 3 slides with 3-4-4 distribution
  // Desktop (lg+): 2 slides with 6-5 distribution
  const [isTablet, setIsTablet] = useState(false);
  const [isTabletRange, setIsTabletRange] = useState(false);
  const [cardWidth, setCardWidth] = useState("100%");
  const [isCompactLayout, setIsCompactLayout] = useState(false);

  // Margin verticale per centrare la timeline
  const timelineVerticalOffset = -100;

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsTablet(width >= 768 && width < 1024);
      setIsTabletRange(width >= 1024 && width <= 1280);

      // Attiva layout compatto se l'altezza è sotto 800px
      setIsCompactLayout(height < 800 && width >= 768);

      // Imposta la larghezza delle card in base allo schermo
      if (width >= 1600) {
        setCardWidth("100%");
      } else if (width >= 1024) {
        setCardWidth("140%");
      } else {
        setCardWidth("100%");
      }
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const totalSlides = isTablet || isTabletRange ? 3 : 2;
  const slideDistribution = isTablet || isTabletRange ? [3, 4, 4] : [6, 5];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentEvents = () => {
    if (isTablet || isTabletRange) {
      // Tablet and Tablet Range: 3-4-4
      if (currentSlide === 0) return sortedEvents.slice(0, 3);
      if (currentSlide === 1) return sortedEvents.slice(3, 7);
      return sortedEvents.slice(7, 11);
    } else {
      // Desktop: 6-5
      if (currentSlide === 0) return sortedEvents.slice(0, 6);
      return sortedEvents.slice(6);
    }
  };

  const currentEvents = getCurrentEvents();

  return (
    <>
      <SEO page="timeline" />
      <ThreeBackground />
      <section className="h-screen overflow-hidden timeline-vertical:overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="text-center pt-3 sm:pt-4 md:pt-6 mb-4 md:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            <span className="neon-text">TIMELINE</span>
          </h1>
        </div>

        {/* Mobile + Tablet (768-1024) + Low Height (<948px): Vertical Timeline - Scrollable */}
        <div className="lg:hidden timeline-vertical:!flex flex-1 timeline-vertical:overflow-visible px-4 md:px-32 timeline-vertical:md:px-32 pb-20 scrollbar-hide">
          <div
            ref={containerRef}
            className="relative pt-2 pb-12 timeline-vertical:mb-32"
          >
            {/* Single vertical line from first to last node */}
            <div
              className="absolute left-1/2 w-0.5 bg-gradient-to-b from-neon-blue via-neon-pink to-neon-green"
              style={{
                transform: "translateX(-50%)",
                top: `${lineHeight.top}px`,
                height: `${lineHeight.height}px`,
              }}
            />

            {events.map((event, index) => {
              const isWork = event.type === "work";
              const isTravel = event.type === "travel";
              const color = isWork
                ? "#00f0ff"
                : isTravel
                ? "#00ff41"
                : "#ff00ff";
              const isLeft = index % 2 === 0;
              const isFirst = index === 0;
              const isLast = index === events.length - 1;

              return (
                <div key={event.id} className="relative mb-12">
                  {/* Node */}
                  <div
                    ref={isFirst ? firstNodeRef : isLast ? lastNodeRef : null}
                    className="absolute left-1/2 -translate-x-1/2 z-10 top-2"
                  >
                    <div
                      className="w-4 h-4 rounded-full border-2 border-black"
                      style={{
                        background: color,
                        boxShadow: `0 0 10px ${color}CC`,
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div className={`${isLeft ? "pr-[55%]" : "pl-[55%]"} pt-2`}>
                    <div
                      className="glass rounded-lg p-3 border border-white/10"
                      onClick={() => {
                        if (isTravel) {
                          setSelectedTravel(event);
                        } else {
                          setSelectedEvent(event);
                        }
                      }}
                    >
                      {/* Vertical timeline card image (mobile / tablet) */}
                      {event.images.length > 0 && (
                        <div
                          className={`relative w-full h-32 mb-2 rounded overflow-hidden ${
                            event.id === "airplay"
                              ? "bg-black p-2"
                              : isWork
                              ? "bg-white p-2"
                              : ""
                          }`}
                        >
                          <Image
                            src={event.images[0]}
                            alt={event.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className={`transition-all duration-300 ${
                              isWork || event.id === "airplay"
                                ? "object-contain"
                                : "object-cover"
                            }`}
                            style={{
                              objectPosition:
                                event.id === "holly" ? "center 10%" : "center",
                            }}
                          />
                        </div>
                      )}
                      <h3 className="text-sm font-bold mb-1" style={{ color }}>
                        {getTranslatedContent(event.id, "title")}
                      </h3>
                      {event.role && (
                        <p className="text-xs text-white/80 mb-1">
                          {getTranslatedContent(event.id, "role")}
                        </p>
                      )}
                      <p className="text-xs text-white/60">{event.date}</p>
                      <p className="text-xs text-white/70 mt-2">
                        {getTranslatedContent(event.id, "description")}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop: Horizontal Timeline Container */}
        {/* Desktop (1024+) with height >=820px: Horizontal Carousel */}
        <div className="hidden lg:flex timeline-vertical:!hidden flex-1 relative px-2 sm:px-4 md:py-4 items-center">
          <div className="w-full flex items-center">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`fixed left-1 sm:left-2 z-20 p-2 sm:p-3 glass border rounded-full transition-all duration-300 ${
                currentSlide === 0
                  ? "border-white/20 opacity-30 cursor-not-allowed"
                  : "border-neon-blue hover:bg-neon-blue/20"
              }`}
              style={{
                top: "55vh",
                transform: "translateY(-50%)",
              }}
            >
              <ChevronLeft
                className={
                  currentSlide === 0
                    ? "text-white/30 hidden sm:block"
                    : "text-neon-blue hidden sm:block"
                }
                size={28}
              />
            </button>

            <div className="max-w-full mx-auto w-full px-16">
              {/* Horizontal Timeline Line */}
              <div
                className="relative flex items-center"
                style={{ height: "clamp(200px, 35vh, 350px)" }}
              >
                {/* Main horizontal line - CENTERED */}
                <div
                  className="fixed left-0 right-0 bg-gradient-to-r from-neon-blue via-neon-pink to-neon-green z-1"
                  style={{
                    top: "55vh",
                    transform: "translateY(-50%)",
                    height: "3px",
                    boxShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
                    maxWidth: "calc(100% - 200px)",
                    marginLeft: "100px",
                  }}
                />

                {/* Timeline Events - Distributed horizontally */}
                <div
                  className="fixed left-0 right-0 flex items-center justify-between px-24"
                  style={{ top: "55vh", transform: "translateY(0)" }}
                >
                  {currentEvents.map((event, index) => {
                    const isWork = event.type === "work";
                    const isTravel = event.type === "travel";
                    const isMilestone = event.type === "milestone";

                    // Varied heights for visual interest - shorter for bottom cards
                    const heights = [40, 60, 50, 70, 45, 55];
                    const baseHeight = heights[index % heights.length];
                    const isAbove = index % 2 === 0;
                    const connectorHeight =
                      event.id === "freelance"
                        ? 20
                        : isAbove
                        ? baseHeight
                        : baseHeight * 0.5;

                    // Color based on type
                    const color = isWork
                      ? "#00f0ff"
                      : isTravel
                      ? "#00ff41"
                      : "#ff00ff";

                    return (
                      <div
                        key={event.id}
                        className="flex flex-col items-center justify-center relative"
                        style={{
                          flex: "1 1 0",
                          minWidth: 0,
                        }}
                      >
                        {/* Event Card - Above or Below */}
                        <div
                          className="w-full absolute mx-auto"
                          style={{
                            left: "50%",
                            transform: "translateX(-50%)",
                            width:
                              event.id === "start2impact" ||
                              event.id === "altesia"
                                ? "160%"
                                : cardWidth,
                            [isAbove ? "bottom" : "top"]: "0",
                            [isAbove ? "marginBottom" : "marginTop"]:
                              event.id === "freelance"
                                ? "25px"
                                : `${connectorHeight}px`,
                          }}
                        >
                          <div
                            className={`glass rounded-lg hover-lift group overflow-hidden h-full border border-white/10 ${
                              isCompactLayout
                                ? "flex flex-row items-center gap-3 p-2"
                                : ""
                            }`}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              if (isTravel) {
                                setSelectedTravel(event);
                              } else {
                                setSelectedEvent(event);
                              }
                            }}
                          >
                            {/* Image with company logo on white background for work */}
                            {event.images.length > 0 && (
                              <div
                                className={`relative overflow-hidden ${
                                  isCompactLayout
                                    ? "w-24 h-20 flex-shrink-0"
                                    : "w-full"
                                } ${
                                  event.id === "airplay"
                                    ? "bg-black p-4"
                                    : isWork
                                    ? "bg-white p-4"
                                    : ""
                                }`}
                                style={{
                                  height: isCompactLayout
                                    ? "80px"
                                    : event.id === "holly"
                                    ? "160px"
                                    : event.id === "spain-roadtrip"
                                    ? "130px"
                                    : event.id === "vietnam"
                                    ? "160px"
                                    : event.id === "tenerife-trasferimento"
                                    ? "120px"
                                    : "100px",
                                }}
                              >
                                <Image
                                  src={event.images[0]}
                                  alt={event.title}
                                  fill
                                  sizes="(max-width: 768px) 50vw, 300px"
                                  className={`transition-all duration-300 ${
                                    isWork || event.id === "airplay"
                                      ? "object-contain p-2"
                                      : "object-cover group-hover:scale-110"
                                  }`}
                                  style={{
                                    objectPosition:
                                      event.id === "holly"
                                        ? "center 20%"
                                        : event.id === "spain-roadtrip"
                                        ? "center 85%"
                                        : event.id === "vietnam"
                                        ? "center 60%"
                                        : event.id === "tenerife-trasferimento"
                                        ? "center 30%"
                                        : "center",
                                  }}
                                />
                              </div>
                            )}

                            <div
                              className={
                                isCompactLayout ? "flex-1 py-1" : "p-3"
                              }
                            >
                              {/* Icon */}
                              <div
                                className={`flex items-center gap-2 mb-1 ${
                                  isCompactLayout
                                    ? "justify-start"
                                    : "justify-center"
                                }`}
                              >
                                {isWork ? (
                                  <Briefcase
                                    className="text-neon-blue"
                                    size={12}
                                  />
                                ) : isTravel ? (
                                  <MapPin
                                    className="text-neon-green"
                                    size={12}
                                  />
                                ) : (
                                  <Star className="text-neon-pink" size={12} />
                                )}
                              </div>

                              {/* Title */}
                              <h3
                                className={`text-xs font-bold mb-1 group-hover:text-neon-blue transition-colors duration-300 leading-tight ${
                                  isCompactLayout ? "text-left" : "text-center"
                                }`}
                              >
                                {getTranslatedContent(event.id, "title")}
                              </h3>

                              {/* Role */}
                              {event.role && (
                                <p
                                  className={`text-neon-blue/80 font-semibold text-xs mb-1 leading-tight ${
                                    isCompactLayout
                                      ? "text-left"
                                      : "text-center"
                                  }`}
                                >
                                  {getTranslatedContent(event.id, "role")}
                                </p>
                              )}

                              {/* Description - Nascosta in layout compatto */}
                              {!isCompactLayout && (
                                <p className="text-white/70 text-xs leading-relaxed text-center">
                                  {getTranslatedContent(
                                    event.id,
                                    "description"
                                  )}
                                </p>
                              )}

                              {/* Stack Pills */}
                              {event.stack &&
                                event.stack.length > 0 &&
                                !isCompactLayout && (
                                  <div className="flex flex-wrap gap-1 justify-center mt-2">
                                    {event.stack.slice(0, 3).map((tech) => (
                                      <span
                                        key={tech}
                                        className="px-1.5 py-0.5 text-xs bg-neon-blue/20 border border-neon-blue/50 rounded-full text-neon-blue"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>

                        {/* Straight connector line */}
                        <div
                          className="absolute"
                          style={{
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "2px",
                            height: `${connectorHeight}px`,
                            background: color,
                            ...(isAbove
                              ? {
                                  bottom: "0",
                                }
                              : {
                                  top: "0",
                                }),
                            boxShadow: `0 0 5px ${color}80`,
                            pointerEvents: "none",
                          }}
                        />

                        {/* Timeline Node with date - ON THE LINE */}
                        <div
                          className="order-2 flex flex-col items-center absolute"
                          style={{ top: "0", transform: "translateY(-50%)" }}
                        >
                          {/* Date label */}
                          <p
                            className={`text-xs text-white/80 font-semibold whitespace-nowrap absolute ${
                              isAbove ? "top-8" : "bottom-8"
                            }`}
                          >
                            {event.date.split(" - ")[0]}
                          </p>

                          {/* Node */}
                          <div
                            className="w-5 h-5 rounded-full border-3 border-black shadow-xl relative z-20"
                            style={{
                              background: color,
                              boxShadow: `0 0 15px ${color}CC`,
                            }}
                          >
                            <div
                              className="absolute inset-0 rounded-full animate-ping opacity-60"
                              style={{
                                background: color,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className={`fixed right-1 sm:right-2 z-20 p-2 sm:p-3 glass border rounded-full transition-all duration-300 ${
                currentSlide === totalSlides - 1
                  ? "border-white/20 opacity-30 cursor-not-allowed"
                  : "border-neon-blue hover:bg-neon-blue/20"
              }`}
              style={{
                top: "55vh",
                transform: "translateY(-50%)",
              }}
            >
              <ChevronRight
                className={
                  currentSlide === totalSlides - 1
                    ? "text-white/30 hidden sm:block"
                    : "text-neon-blue hidden sm:block"
                }
                size={28}
              />
            </button>
          </div>
        </div>

        {/* Modal for Travel Events */}
        {selectedTravel && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 max-md:landscape:p-2 portrait:p-4"
            onClick={() => {
              setSelectedTravel(null);
              setCurrentImageIndex(0);
            }}
          >
            <div
              className="glass rounded-lg p-3 max-md:landscape:p-2 portrait:p-4 sm:p-6 md:p-4 lg:p-8 max-w-2xl md:max-w-xl lg:max-w-2xl w-full h-auto max-h-[90vh] md:max-h-[85vh] lg:max-h-[95vh] max-md:landscape:max-h-[95vh] overflow-y-auto border border-neon-green/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 max-md:landscape:grid-cols-2 gap-3 max-md:landscape:gap-2 portrait:gap-4 sm:gap-6 lg:gap-8 h-auto md:h-auto">
                {/* Left: Images Slideshow */}
                <div className="space-y-2 max-md:landscape:space-y-1 portrait:space-y-3 sm:space-y-4 max-md:landscape:row-span-2">
                  <div
                    className={`relative ${
                      selectedTravel.id === "barcellona" ||
                      selectedTravel.id === "vietnam" ||
                      selectedTravel.id === "holly"
                        ? "aspect-[4/5]"
                        : "aspect-video"
                    } md:aspect-[4/3] lg:aspect-auto md:h-auto lg:h-80 xl:h-96 rounded overflow-hidden group bg-black`}
                  >
                    <Image
                      src={selectedTravel.images[currentImageIndex]}
                      alt={`${selectedTravel.title} - ${currentImageIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      className="object-cover transition-opacity duration-300"
                      style={{
                        objectPosition:
                          selectedTravel.id === "ancona"
                            ? currentImageIndex === 0
                              ? "center 30%"
                              : currentImageIndex === 2
                              ? "center 90%"
                              : "center"
                            : selectedTravel.id === "spain-roadtrip"
                            ? currentImageIndex === 1
                              ? "center 80%"
                              : currentImageIndex === 2
                              ? "center 90%"
                              : currentImageIndex === 3
                              ? "center 80%"
                              : "center"
                            : selectedTravel.id === "vietnam"
                            ? currentImageIndex === 0
                              ? "center 55%"
                              : currentImageIndex === 1
                              ? "center 60%"
                              : currentImageIndex === 3
                              ? "center 70%"
                              : currentImageIndex === 4
                              ? "center 70%"
                              : currentImageIndex === 6
                              ? "center 40%"
                              : currentImageIndex === 7
                              ? "center 70%"
                              : currentImageIndex === 8
                              ? "center 40%"
                              : "center"
                            : selectedTravel.id === "tenerife-trasferimento"
                            ? currentImageIndex === 1
                              ? "center 100%"
                              : currentImageIndex === 8
                              ? "center 100%"
                              : "center"
                            : "center",
                      }}
                      unoptimized
                    />

                    {/* Slideshow Controls */}
                    {selectedTravel.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) =>
                              prev === 0
                                ? selectedTravel.images.length - 1
                                : prev - 1
                            );
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 glass border border-neon-green/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronLeft className="text-neon-green" size={24} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) =>
                              prev === selectedTravel.images.length - 1
                                ? 0
                                : prev + 1
                            );
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 glass border border-neon-green/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronRight className="text-neon-green" size={24} />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 glass rounded-full text-sm text-white/80">
                          {currentImageIndex + 1} /{" "}
                          {selectedTravel.images.length}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Right: Content */}
                <div className="space-y-2 max-md:landscape:space-y-1 portrait:space-y-4">
                  <div className="flex items-center justify-between max-md:landscape:mb-1">
                    <div className="flex items-center gap-1 max-md:landscape:gap-1 portrait:gap-2">
                      <MapPin
                        className="text-neon-green max-md:landscape:hidden"
                        size={20}
                      />
                      <h2 className="text-base max-md:landscape:text-lg portrait:text-xl sm:text-2xl md:text-3xl font-bold neon-text">
                        {getTranslatedContent(selectedTravel.id, "title")}
                      </h2>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTravel(null);
                        setCurrentImageIndex(0);
                      }}
                      className="text-white/70 hover:text-white transition-colors p-2"
                    >
                      <span className="text-2xl">×</span>
                    </button>
                  </div>

                  <p className="text-xs max-md:landscape:text-[10px] portrait:text-xs sm:text-sm text-neon-green/80 font-semibold">
                    {selectedTravel.date}
                  </p>

                  <p className="text-xs max-md:landscape:text-xs portrait:text-sm sm:text-base text-white/80 leading-relaxed max-md:landscape:leading-tight">
                    {getTranslatedContent(selectedTravel.id, "description")}
                  </p>
                </div>

                {/* Bottom: Instagram link for travel posts */}
                <div className="max-md:landscape:col-start-1 portrait:mt-2">
                  {selectedTravel.id === "barcellona" ? (
                    <div className="flex flex-wrap gap-3 max-md:landscape:gap-2">
                      <a
                        href="https://www.instagram.com/mikisarzi/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 w-auto px-4 max-md:landscape:px-3 py-2 max-md:landscape:py-1.5 glass border border-neon-pink hover:bg-neon-pink/20 rounded-lg text-neon-pink text-sm max-md:landscape:text-xs font-semibold transition-all duration-300"
                      >
                        <Instagram
                          size={16}
                          className="max-md:landscape:w-3 max-md:landscape:h-3"
                        />
                        {t("timeline.profile")} Miki
                      </a>
                      <a
                        href="https://mikisarzi.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 w-auto px-4 max-md:landscape:px-3 py-2 max-md:landscape:py-1.5 glass border border-neon-green hover:bg-neon-green/20 rounded-lg text-neon-green text-sm max-md:landscape:text-xs font-semibold transition-all duration-300"
                      >
                        <Globe
                          size={16}
                          className="max-md:landscape:w-3 max-md:landscape:h-3"
                        />
                        Sito Miki
                      </a>
                    </div>
                  ) : (
                    (selectedTravel.id === "spain-roadtrip" && (
                      <a
                        href="https://www.instagram.com/massi_angelone/p/DQOpozZCBI8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 w-auto px-4 max-md:landscape:px-3 py-2 max-md:landscape:py-1.5 glass border border-neon-pink hover:bg-neon-pink/20 rounded-lg text-neon-pink text-sm max-md:landscape:text-xs font-semibold transition-all duration-300"
                      >
                        <Instagram
                          size={16}
                          className="max-md:landscape:w-3 max-md:landscape:h-3"
                        />
                        {t("timeline.viewPost")}
                      </a>
                    )) ||
                    (selectedTravel.id === "tenerife-trasferimento" && (
                      <a
                        href="https://www.instagram.com/p/DQ2HZi7CFRv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 w-auto px-4 max-md:landscape:px-3 py-2 max-md:landscape:py-1.5 glass border border-neon-pink hover:bg-neon-pink/20 rounded-lg text-neon-pink text-sm max-md:landscape:text-xs font-semibold transition-all duration-300"
                      >
                        <Instagram
                          size={16}
                          className="max-md:landscape:w-3 max-md:landscape:h-3"
                        />
                        {t("timeline.viewPost")}
                      </a>
                    )) ||
                    (selectedTravel.id === "vietnam" && (
                      <a
                        href="https://www.instagram.com/p/DEpxZxSAHRF"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 w-auto px-4 max-md:landscape:px-3 py-2 max-md:landscape:py-1.5 glass border border-neon-pink hover:bg-neon-pink/20 rounded-lg text-neon-pink text-sm max-md:landscape:text-xs font-semibold transition-all duration-300"
                      >
                        <Instagram
                          size={16}
                          className="max-md:landscape:w-3 max-md:landscape:h-3"
                        />
                        {t("timeline.viewPost")}
                      </a>
                    )) ||
                    null
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Work and Milestone Events */}
        {selectedEvent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 max-md:landscape:p-2 portrait:p-4"
            onClick={() => {
              setSelectedEvent(null);
              setCurrentImageIndex(0);
            }}
          >
            <div
              className={`glass rounded-lg p-3 max-md:landscape:p-2 portrait:p-4 sm:p-6 md:p-4 lg:p-8 ${
                selectedEvent.id === "holly"
                  ? "max-w-xl md:max-w-lg lg:max-w-xl"
                  : "max-w-3xl md:max-w-xl lg:max-w-3xl"
              } w-full h-auto max-h-[90vh] md:max-h-[85vh] lg:max-h-[95vh] max-md:landscape:max-h-[95vh] overflow-y-auto border border-neon-blue/30`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 max-md:landscape:grid-cols-2 tablet-range:grid-cols-2 gap-3 max-md:landscape:gap-2 portrait:gap-4 sm:gap-6 lg:gap-8 h-auto md:h-auto tablet-range:auto-rows-max items-start">
                {/* Left: Image/Logo */}
                <div className="space-y-2 max-md:landscape:space-y-1 portrait:space-y-4 max-md:landscape:row-span-2 tablet-range:row-span-2">
                  <div
                    className={`relative ${
                      selectedEvent.id === "holly"
                        ? "aspect-[4/5]"
                        : "aspect-video"
                    } md:aspect-[4/3] lg:aspect-auto md:h-auto lg:h-96 tablet-range:h-64 rounded overflow-hidden flex items-center justify-center ${
                      selectedEvent.id === "airplay" ? "bg-black" : "bg-white"
                    }`}
                  >
                    {selectedEvent.type === "milestone" &&
                    selectedEvent.images.length > 1 ? (
                      /* Slideshow for milestone with multiple images (Holly) */
                      <>
                        <Image
                          src={selectedEvent.images[currentImageIndex]}
                          alt={`${selectedEvent.title} - ${
                            currentImageIndex + 1
                          }`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                          priority
                          style={{
                            objectPosition:
                              currentImageIndex === 0
                                ? "center 10%"
                                : currentImageIndex === 1
                                ? "center 60%"
                                : "center",
                          }}
                        />
                        {/* Slideshow Controls */}
                        <div className="absolute inset-0 group">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex((prev) =>
                                prev === 0
                                  ? selectedEvent.images.length - 1
                                  : prev - 1
                              );
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 glass border border-neon-pink/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity max-md:opacity-100"
                          >
                            <ChevronLeft className="text-neon-pink" size={24} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex((prev) =>
                                prev === selectedEvent.images.length - 1
                                  ? 0
                                  : prev + 1
                              );
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 glass border border-neon-pink/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity max-md:opacity-100"
                          >
                            <ChevronRight
                              className="text-neon-pink"
                              size={24}
                            />
                          </button>
                          {/* Image Counter */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 glass rounded-full text-sm text-white/80">
                            {currentImageIndex + 1} /{" "}
                            {selectedEvent.images.length}
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Single logo for work */
                      <Image
                        src={selectedEvent.images[0]}
                        alt={selectedEvent.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-8"
                        unoptimized
                      />
                    )}
                  </div>
                </div>

                {/* Right: Content */}
                <div className="space-y-2 max-md:landscape:space-y-1 portrait:space-y-4 md:block tablet-range:flex tablet-range:flex-col tablet-range:justify-between">
                  <div className="flex items-center justify-between max-md:landscape:mb-1">
                    <div className="flex items-center gap-1 max-md:landscape:gap-1 portrait:gap-2 tablet-range:gap-2">
                      {selectedEvent.type === "work" ? (
                        <Briefcase
                          className="text-neon-blue max-md:landscape:hidden tablet-range:w-4 tablet-range:h-4"
                          size={20}
                        />
                      ) : (
                        <Star
                          className="text-neon-pink max-md:landscape:hidden tablet-range:w-4 tablet-range:h-4"
                          size={20}
                        />
                      )}
                      <h2 className="text-base max-md:landscape:text-lg portrait:text-xl sm:text-2xl md:text-3xl tablet-range:text-lg font-bold neon-text">
                        {getTranslatedContent(selectedEvent.id, "title")}
                      </h2>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedEvent(null);
                        setCurrentImageIndex(0);
                      }}
                      className="text-white/70 hover:text-white transition-colors p-2"
                    >
                      <span className="text-2xl">×</span>
                    </button>
                  </div>

                  <p
                    className={`text-xs max-md:landscape:text-[10px] portrait:text-xs sm:text-sm tablet-range:text-[10px] font-semibold ${
                      selectedEvent.type === "work"
                        ? "text-neon-blue/80"
                        : "text-neon-pink/80"
                    }`}
                  >
                    {selectedEvent.date}
                  </p>

                  {selectedEvent.role && (
                    <p className="text-sm max-md:landscape:text-xs portrait:text-base sm:text-lg text-white/90 font-semibold">
                      {getTranslatedContent(selectedEvent.id, "role")}
                    </p>
                  )}

                  <p className="text-xs max-md:landscape:text-xs portrait:text-sm sm:text-base text-white/80 leading-relaxed max-md:landscape:leading-tight">
                    {getTranslatedContent(selectedEvent.id, "description")}
                  </p>
                </div>

                {/* Bottom left: Stack pills and buttons */}
                <div className="space-y-3 max-md:landscape:space-y-2 max-md:landscape:col-start-1 tablet-range:col-start-1 tablet-range:row-start-3 tablet-range:space-y-2">
                  {selectedEvent.stack && selectedEvent.stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 max-md:landscape:gap-1.5 justify-center md:justify-start tablet-range:hidden">
                      {selectedEvent.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 max-md:landscape:px-2 py-1 max-md:landscape:py-0.5 text-sm max-md:landscape:text-xs bg-neon-blue/20 border border-neon-blue/50 rounded-full text-neon-blue"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Buttons section - only show on non-tablet */}
                  {selectedEvent.type === "work" &&
                    (selectedEvent.id === "start2impact" ? (
                      <div className="flex flex-wrap gap-3 max-md:landscape:gap-2">
                        <a
                          href="https://www.instagram.com/p/DByUo-Tt3tD/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 max-md:landscape:gap-1.5 w-auto px-4 max-md:landscape:px-3 py-2 max-md:landscape:py-1.5 glass border border-neon-pink hover:bg-neon-pink/20 rounded-lg text-neon-pink font-semibold transition-all duration-300 text-sm max-md:landscape:text-xs"
                        >
                          <Instagram
                            size={16}
                            className="max-md:landscape:w-3 max-md:landscape:h-3"
                          />
                          Intervista
                        </a>
                        <a
                          href="http://linkedin.com/school/start2impact"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 max-md:landscape:gap-1.5 w-auto px-4 max-md:landscape:px-3 py-2 max-md:landscape:py-1.5 glass border border-neon-blue hover:bg-neon-blue/20 rounded-lg text-neon-blue font-semibold transition-all duration-300 text-sm max-md:landscape:text-xs"
                        >
                          <Linkedin
                            size={16}
                            className="max-md:landscape:w-3 max-md:landscape:h-3"
                          />
                          LinkedIn
                        </a>
                        {selectedEvent.url && (
                          <a
                            href={selectedEvent.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 max-md:landscape:gap-1.5 w-auto px-4 max-md:landscape:px-3 py-2 max-md:landscape:py-1.5 glass border border-neon-green hover:bg-neon-green/20 rounded-lg text-neon-green font-semibold transition-all duration-300 text-sm max-md:landscape:text-xs"
                          >
                            <Globe
                              size={16}
                              className="max-md:landscape:w-3 max-md:landscape:h-3"
                            />
                            {t("timeline.website")}
                          </a>
                        )}
                      </div>
                    ) : selectedEvent.id === "airplay" ? (
                      <div className="flex flex-wrap gap-3 max-md:landscape:gap-2">
                        <a
                          href="https://www.linkedin.com/company/airplaycontrol"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 max-md:landscape:gap-1.5 w-auto px-4 max-md:landscape:px-3 py-2 max-md:landscape:py-1.5 glass border border-neon-blue hover:bg-neon-blue/20 rounded-lg text-neon-blue font-semibold transition-all duration-300 text-sm max-md:landscape:text-xs"
                        >
                          <Linkedin
                            size={16}
                            className="max-md:landscape:w-3 max-md:landscape:h-3"
                          />
                          LinkedIn
                        </a>
                        {selectedEvent.url && (
                          <a
                            href={selectedEvent.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 max-md:landscape:gap-1.5 w-auto px-4 max-md:landscape:px-3 py-2 max-md:landscape:py-1.5 glass border border-neon-green hover:bg-neon-green/20 rounded-lg text-neon-green font-semibold transition-all duration-300 text-sm max-md:landscape:text-xs"
                          >
                            <Globe
                              size={16}
                              className="max-md:landscape:w-3 max-md:landscape:h-3"
                            />
                            {t("timeline.website")}
                          </a>
                        )}
                      </div>
                    ) : selectedEvent.id === "altesia" ? (
                      <div className="flex flex-wrap gap-3 max-md:landscape:gap-2">
                        <a
                          href="https://www.linkedin.com/company/altesia-s.r.l."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 max-md:landscape:gap-1.5 w-auto px-4 max-md:landscape:px-3 py-2 max-md:landscape:py-1.5 glass border border-neon-blue hover:bg-neon-blue/20 rounded-lg text-neon-blue font-semibold transition-all duration-300 text-sm max-md:landscape:text-xs"
                        >
                          <Linkedin
                            size={16}
                            className="max-md:landscape:w-3 max-md:landscape:h-3"
                          />
                          LinkedIn
                        </a>
                        {selectedEvent.url && (
                          <a
                            href={selectedEvent.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 max-md:landscape:gap-1.5 w-auto px-4 max-md:landscape:px-3 py-2 max-md:landscape:py-1.5 glass border border-neon-green hover:bg-neon-green/20 rounded-lg text-neon-green font-semibold transition-all duration-300 text-sm max-md:landscape:text-xs"
                          >
                            <Globe
                              size={16}
                              className="max-md:landscape:w-3 max-md:landscape:h-3"
                            />
                            {t("timeline.website")}
                          </a>
                        )}
                      </div>
                    ) : selectedEvent.id === "freelance" ? null : (
                      selectedEvent.url && (
                        <a
                          href={selectedEvent.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 max-md:landscape:gap-1.5 w-auto px-4 max-md:landscape:px-3 py-2 max-md:landscape:py-1.5 glass border border-neon-green hover:bg-neon-green/20 rounded-lg text-neon-green font-semibold transition-all duration-300 text-sm max-md:landscape:text-xs"
                        >
                          <Globe
                            size={16}
                            className="max-md:landscape:w-3 max-md:landscape:h-3"
                          />
                          {t("timeline.website")}
                        </a>
                      )
                    ))}
                </div>

                {/* Tablet: Right side chips */}
                {selectedEvent.stack && selectedEvent.stack.length > 0 && (
                  <div className="hidden tablet-range:flex tablet-range:flex-col tablet-range:col-start-2 tablet-range:row-start-3 tablet-range:justify-start">
                    <div className="flex flex-wrap gap-2 justify-start">
                      {selectedEvent.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-neon-blue/20 border border-neon-blue/50 rounded-full text-neon-blue"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Social Buttons - Fixed Bottom Right (Desktop Only) */}
      {/* Social Buttons - Fixed Bottom Right (Desktop 1024+ Only) */}
      <div className="hidden lg:flex fixed bottom-6 right-6 flex-col gap-3 z-40">
        <a
          href="https://www.instagram.com/massi_angelone/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 glass rounded-full flex items-center justify-center border border-neon-pink/50 hover:border-neon-pink hover:bg-neon-pink/20 transition-all duration-300 group"
          aria-label="Instagram"
        >
          <Instagram className="text-neon-pink" size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/massiangelone/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 glass rounded-full flex items-center justify-center border border-neon-blue/50 hover:border-neon-blue hover:bg-neon-blue/20 transition-all duration-300 group"
          aria-label="LinkedIn"
        >
          <Linkedin className="text-neon-blue" size={20} />
        </a>
        <a
          href="mailto:massiangelone01@gmail.com"
          className="w-12 h-12 glass rounded-full flex items-center justify-center border border-neon-green/50 hover:border-neon-green hover:bg-neon-green/20 transition-all duration-300 group"
          aria-label="Email"
        >
          <Mail className="text-neon-green" size={20} />
        </a>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      events: timelineData,
    },
  };
};
