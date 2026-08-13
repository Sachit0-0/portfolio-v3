"use client";

import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Download, Calendar, MapPin, Briefcase, CheckCircle2, GitBranch, GitCommit } from "lucide-react";
import { AwwwardsText } from "./ui/awwwards-text";
import { ScrollRevealText, ScrollFadeIn } from "./ui/scroll-reveal";

/* ── Timeline Data ────────────────────────────────────────────────── */
const experienceItems = [
  {
    id: "pixelup",
    title: "JavaScript Developer",
    company: "PixelUp Studio (formerly Responsive Pixel Pvt. Ltd.)",
    type: "Contract",
    location: "Remote",
    period: "05/2025 — 05/2026",
    side: "right",
    isConcurrent: false,
    overlapInfo: null,
    bullets: [
      "Scoped and shipped FrameAudit, a published Framer plugin for auditing design-system consistency across spacing, typography, components, and accessibility.",
      "Built EventCalendar, a Framer plugin with recurring events, category filters, and custom calendar views on Framer's native CMS.",
      "Engineered animation scripts and interactive components used across client production sites.",
    ],
    tech: ["Framer Plugin API", "TypeScript", "React", "Node.js", "Lemon Squeezy"],
  },
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
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const isRight = item.side === "right";

  // Per-card scroll parallax vertical drift
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const driftY = useTransform(
    scrollYProgress,
    [0, 1],
    [isRight ? 20 : 30, isRight ? -20 : -30]
  );

  const cardContent = (
    <motion.div
      style={shouldReduceMotion ? {} : { y: driftY }}
      className="p-6 sm:p-8 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md shadow-lg hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 group"
    >
      {item.overlapInfo && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs font-semibold">
          <GitBranch className="w-3.5 h-3.5" />
          <span>{item.overlapInfo}</span>
        </div>
      )}

      <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono text-primary font-medium">
        <Calendar className="w-3.5 h-3.5" />
        <span>{item.period}</span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
        <AwwwardsText text={item.title} />
      </h3>
      <p className="text-primary font-semibold text-sm mt-1 mb-3">{item.company}</p>

      <div className={`flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground mb-4 ${!isRight ? "md:justify-end" : ""}`}>
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" /> {item.location}
        </span>
        <span>•</span>
        <span className="flex items-center gap-1 text-foreground/80">
          <Briefcase className="w-3 h-3" /> {item.type}
        </span>
      </div>

      <ul className="space-y-2.5 text-sm text-muted-foreground text-left mb-6 font-sans">
        {item.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className={`flex flex-wrap gap-1.5 border-t border-border/40 pt-4 ${!isRight ? "md:justify-end" : ""}`}>
        {item.tech.map((t) => (
          <span
            key={t}
            className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-muted/40 text-foreground/80 border border-border/40 group-hover:border-primary/30 transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      ref={cardRef}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: isRight ? 40 : -40, y: 30 }
      }
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
    >
      {/* Dynamic Animated Center Node Circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 z-20 w-9 h-9 rounded-full border-2 bg-background border-primary items-center justify-center text-primary shadow-lg shadow-primary/20"
      >
        {item.isConcurrent ? (
          <GitBranch className="w-4 h-4 text-amber-500" />
        ) : (
          <GitCommit className="w-4 h-4 text-primary" />
        )}
      </motion.div>

      {/* Left Column */}
      <div className={`${!isRight ? "md:col-start-1 md:text-right" : "hidden md:block md:col-start-1"}`}>
        {!isRight && cardContent}
      </div>

      {/* Right Column */}
      <div className={`${isRight ? "md:col-start-2 pl-8 md:pl-0" : "hidden md:block md:col-start-2"}`}>
        {isRight && cardContent}
      </div>
    </motion.div>
  );
}

/* ── Main Export ──────────────────────────────────────────────────── */
export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

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
    <section id="experience" className="py-24 md:py-36 relative border-t border-border/40 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Left-Aligned Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/40 pb-12">
          <div className="max-w-2xl">
            <ScrollFadeIn delay={0}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-card/90 border border-border/80 text-xs sm:text-sm font-mono tracking-wider text-primary shadow-md backdrop-blur-md mb-4 uppercase">
                <Sparkles className="w-4 h-4" />
                <span>04 / CAREER CHRONOLOGY</span>
              </div>
            </ScrollFadeIn>
            <ScrollRevealText
              text="Work Experience"
              as="h2"
              className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.15] text-foreground pb-2"
              delay={0.1}
              stagger={0.08}
            />
          </div>


        </div>

        {/* Alternating Split Timeline */}
        <div ref={containerRef} className="relative">
          {/* Background Timeline Stem Track */}
          <div className="hidden md:block absolute top-4 bottom-12 left-1/2 -translate-x-1/2 w-0.5 rounded-full bg-border/40" />
          <div className="md:hidden absolute top-4 bottom-12 left-4 w-0.5 rounded-full bg-border/40" />

          {/* Scroll-Driven Animated Active Timeline Stem */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="hidden md:block absolute top-4 bottom-12 left-1/2 -translate-x-1/2 w-0.5 rounded-full bg-gradient-to-b from-primary via-primary to-amber-500 shadow-[0_0_12px_rgba(var(--primary-rgb),0.5)] z-10"
          />
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="md:hidden absolute top-4 bottom-12 left-4 w-0.5 rounded-full bg-gradient-to-b from-primary via-primary to-amber-500 shadow-[0_0_12px_rgba(var(--primary-rgb),0.5)] z-10"
          />



          <div className="space-y-12 md:space-y-16">
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
            className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-card/90 border border-border/80 hover:border-primary/50 text-sm font-mono text-foreground font-semibold hover:bg-primary/10 hover:text-primary shadow-md backdrop-blur-md transition-all duration-300 group cursor-pointer"
          >
            <Download className="w-4 h-4 text-primary group-hover:translate-y-0.5 transition-transform" />
            <AwwwardsText text="Download Official Resume (PDF)" />
          </a>
        </ScrollFadeIn>
      </div>
    </section>
  );
}