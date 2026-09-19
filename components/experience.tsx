"use client";

import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Download, Calendar, MapPin, Briefcase, CheckCircle2, GitBranch, Terminal } from "lucide-react";
import { ScrollFadeIn } from "./ui/scroll-reveal";

function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted;
}

/* ── Timeline Data ────────────────────────────────────────────────── */
const experienceItems = [
  {
    id: "monal",
    title: "Associate Developer",
    company: "Monal Tech Pvt. Ltd.",
    type: "Full-time",
    location: "Kathmandu · Hybrid",
    period: "09/2023 — 05/2025",
    side: "left",
    isConcurrent: true,
    overlapInfo: "Primary Position (Full-time)",
    bullets: [
      "Architected reusable UI component libraries used across multiple concurrent client products (React, Next.js, Tailwind CSS).",
      "Built and deployed full-stack applications with Next.js, Django REST, PostgreSQL, and Docker.",
      "Delivered a production BI dashboard for a national data platform used by government stakeholders.",
    ],
    tech: ["Next.js", "Django REST", "PostgreSQL", "Docker", "Tailwind CSS"],
  },
  {
    id: "nebham",
    title: "Junior Developer",
    company: "Nebham LLC (via Monal Tech)",
    type: "Contract",
    location: "Remote",
    period: "11/2023 — 03/2024",
    side: "right",
    isConcurrent: true,
    overlapInfo: "Concurrent Contract • 5-Month Overlap with Monal Tech",
    bullets: [
      "Delivered type-safe UI components in Next.js and TypeScript for a US product company.",
      "Translated Figma and Balsamiq prototypes into pixel-accurate, production-ready components.",
      "Built calendar engine and event logic for the Nebham Patro bilingual calendar app.",
    ],
    tech: ["Next.js", "TypeScript", "Figma", "REST APIs"],
  },
  {
    id: "pixelup",
    title: "JavaScript Developer",
    company: "PixelUp Studio (formerly Responsive Pixel Pvt. Ltd.)",
    type: "Contract",
    location: "Remote",
    period: "05/2025 — 05/2026",
    side: "left",
    isConcurrent: false,
    overlapInfo: null,
    bullets: [
      "Scoped and shipped FrameAudit, a published Framer plugin for auditing design-system consistency across spacing, typography, components, and accessibility.",
      "Built EventCalendar, a Framer plugin with recurring events, category filters, and custom calendar views on Framer's native CMS.",
      "Engineered animation scripts and interactive components used across client production sites.",
    ],
    tech: ["Framer Plugin API", "TypeScript", "React", "Node.js", "Lemon Squeezy"],
  },
];

/* ── Single Timeline Card Component ───────────────────────────────── */
function TimelineCard({
  item,
  index,
}: {
  item: (typeof experienceItems)[0];
  index: number;
}) {
  const cardRef = useRef(null);
  const isMounted = useIsMounted();
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const isRight = item.side === "right";

  const cardContent = (
    <div className="p-6 sm:p-8 2xl:p-10 rounded-3xl ios-glass-card shadow-lg flex flex-col justify-between group">
      {item.overlapInfo && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs font-semibold">
          <GitBranch className="w-3.5 h-3.5" />
          <span>{item.overlapInfo}</span>
        </div>
      )}

      <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-primary/10 border border-primary/20 text-xs 2xl:text-sm font-mono text-primary font-medium">
        <Calendar className="w-3.5 h-3.5" />
        <span>{item.period}</span>
      </div>

      <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
        {item.title}
      </h3>
      <p className="text-primary font-semibold text-sm 2xl:text-base mt-1 mb-3">{item.company}</p>

      <div className={`flex flex-wrap items-center gap-3 text-xs 2xl:text-sm font-mono text-muted-foreground mb-4 ${!isRight ? "md:justify-end" : ""}`}>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {item.location}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1 text-foreground/80">
          <Briefcase className="w-3 h-3" /> {item.type}
        </span>
      </div>

      <ul className="space-y-2.5 text-sm 2xl:text-base text-muted-foreground text-left mb-6 font-sans">
        {item.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className={`flex flex-wrap gap-1.5 2xl:gap-2 border-t border-border/40 pt-4 ${!isRight ? "md:justify-end" : ""}`}>
        {item.tech.map((t) => (
          <span
            key={t}
            className="text-[11px] 2xl:text-xs font-mono px-2.5 py-1 rounded-xl bg-muted/40 text-foreground/80 border border-border/40 group-hover:border-primary/30 transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      ref={cardRef}
      initial={
        isMounted
          ? (shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0, x: isRight ? 40 : -40, y: 30 })
          : false
      }
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isRight ? 40 : -40, y: 30 }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 2xl:gap-16 items-center"
    >
      {/* Centered Node Circle (centered on desktop line and card, and on mobile line) */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-8 md:top-1/2 md:-translate-y-1/2 z-20 pointer-events-none">
        <motion.div
          initial={isMounted ? { scale: 0, opacity: 0 } : false}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.15, type: "spring", stiffness: 240, damping: 20 }}
          className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 bg-background border-primary flex items-center justify-center text-primary shadow-lg shadow-primary/20"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
        </motion.div>
      </div>

      {/* Left Column */}
      <div className={`${!isRight ? "pl-12 md:pl-0" : "hidden md:block"}`}>
        {!isRight && cardContent}
      </div>

      {/* Right Column */}
      <div className={`${isRight ? "md:col-start-2 pl-12 md:pl-0" : "hidden md:block md:col-start-2"}`}>
        {isRight && cardContent}
      </div>
    </motion.div>
  );
}

/* ── Main Export ──────────────────────────────────────────────────── */
export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMounted = useIsMounted();

  // Scroll-driven active line fill animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-20 md:py-32 2xl:py-44 relative border-t border-border/40 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] 2xl:w-[900px] h-[400px] 2xl:h-[550px] bg-primary/5 blur-[150px] 2xl:blur-[180px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] mx-auto px-6 md:px-12 2xl:px-16 4xl:px-24">
        {/* Editorial Header (Consistent with Selected Work & Skills) */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest text-primary uppercase mb-4">
            <Terminal className="w-4 h-4" />
            <span>// 04 / CAREER &amp; EXPERIENCE</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            Work Experience
          </h2>
          <p className="mt-6 text-base sm:text-lg 2xl:text-xl text-muted-foreground leading-relaxed">
            Track record of shipping production software for national data platforms, venture-backed products, and design engineering agencies.
          </p>
        </div>

        {/* Alternating Split Timeline */}
        <div ref={containerRef} className="relative">
          {/* Desktop Background & Active Timeline Stem */}
          <div className="hidden md:block absolute top-4 bottom-12 left-1/2 -translate-x-1/2 w-0.5 rounded-full overflow-hidden bg-border/40">
            <motion.div
              style={isMounted ? { scaleY, originY: 0 } : { originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-primary via-primary to-amber-500 shadow-[0_0_12px_rgba(var(--primary-rgb),0.5)]"
            />
          </div>

          {/* Mobile Background & Active Timeline Stem */}
          <div className="md:hidden absolute top-4 bottom-12 left-4 -translate-x-1/2 w-0.5 rounded-full overflow-hidden bg-border/40">
            <motion.div
              style={isMounted ? { scaleY, originY: 0 } : { originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-primary via-primary to-amber-500 shadow-[0_0_12px_rgba(var(--primary-rgb),0.5)]"
            />
          </div>

          <div className="space-y-12 md:space-y-16 2xl:space-y-24">
            {experienceItems.map((item, index) => (
              <TimelineCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Resume Download CTA */}
        <ScrollFadeIn delay={0.1} className="mt-20 flex justify-start md:justify-center">
          <a
            href="/SachitDahalCV.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-4 2xl:px-10 2xl:py-5 rounded-full ios-glass border border-border/80 hover:border-primary/50 text-sm 2xl:text-base font-mono text-foreground font-semibold hover:bg-primary/10 hover:text-primary active:scale-95 shadow-md transition-all duration-200 group cursor-pointer select-none"
          >
            <Download className="w-4 h-4 2xl:w-5 2xl:h-5 text-primary group-hover:translate-y-0.5 transition-transform" />
            <span>Download Official Resume (PDF)</span>
          </a>
        </ScrollFadeIn>
      </div>
    </section>
  );
}