"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { Sparkles } from "lucide-react";

/* ── Section header with split-text animation ────────────────────── */
function SectionHeader({ title }: { title: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const words = title.split(" ");

  return (
    <div ref={ref} className="mb-16 md:mb-24">
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-mono mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Career Chronology</span>
      </div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05]">
        {words.map((word, i) => (
          <span key={i} className="inline-block mr-[0.25em] overflow-hidden align-top">
            <motion.span
              className="inline-block"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "110%" }}
              animate={isInView ? { opacity: 1, y: "0%" } : {}}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 0.7,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  );
}

/* ── Experience data ─────────────────────────────────────────────── */
const experienceData = [
  {
    title: "JavaScript Developer",
   company: "PixelUp Studio (formerly Responsive Pixel Pvt. Ltd.)",
    type: "Contract",
    location: "Remote",
    period: "05/2025 — 05/2026",
    bullets: [
      "Scoped and shipped FrameAudit, a published Framer plugin for auditing design-system consistency across spacing, typography, components, and accessibility.",
      "Built EventCalendar, a Framer plugin with recurring events, category filters, and custom calendar views on Framer's native CMS.",
      "Engineered animation scripts and interactive components used across client production sites.",
    ],
  },
  {
    title: "Associate Developer",
    company: "Monal Tech Pvt. Ltd.",
    type: "Full-time",
    location: "Kathmandu · Hybrid",
    period: "09/2023 — 05/2025",
    bullets: [
      "Architected reusable UI component libraries used across multiple concurrent client products (React, Next.js, Tailwind CSS).",
      "Built and deployed full-stack applications with Next.js, Django REST, PostgreSQL, and Docker.",
      "Delivered a production BI dashboard for a national data platform used by government stakeholders.",
    ],
  },
  {
    title: "Junior Developer",
    company: "Nebham LLC (via Monal Tech)",
    type: "Contract",
    location: "Remote",
    period: "11/2023 — 03/2024",
    bullets: [
      "Delivered type-safe UI components in Next.js and TypeScript for a US product company.",
      "Translated Figma and Balsamiq prototypes into pixel-accurate, production-ready components.",
      "Built calendar engine and event logic for the Nebham Patro bilingual calendar app.",
    ],
  },
];

/* ── Experience entry ────────────────────────────────────────────── */
function ExperienceEntry({
  entry,
  index,
}: {
  entry: (typeof experienceData)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-4 md:gap-12 pb-16 md:pb-20 border-b border-border/30 last:border-b-0"
    >
      {/* Left column — meta */}
      <div className="text-sm text-muted-foreground space-y-1">
        <p className="tabular-nums">{entry.period}</p>
        <p>{entry.location}</p>
        <p className="text-xs text-muted-foreground/60">{entry.type}</p>
      </div>

      {/* Right column — content */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl md:text-2xl font-medium tracking-[-0.01em]">
            {entry.title}
          </h3>
          <p className="text-primary text-sm mt-1">{entry.company}</p>
        </div>

        <ul className="space-y-3">
          {entry.bullets.map((bullet, i) => (
            <li
              key={i}
              className="text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1.5 before:h-px before:bg-muted-foreground/30"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ── Main export ─────────────────────────────────────────────────── */
export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader title="Experience" />

        <div className="space-y-0">
          {experienceData.map((entry, index) => (
            <ExperienceEntry key={index} entry={entry} index={index} />
          ))}
        </div>

        {/* Resume download — understated */}
        <div className="mt-16 md:mt-20">
          <a
            href="/SachitDahalCV.pdf"
            download
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 underline underline-offset-4 decoration-border hover:decoration-primary"
          >
            Download full resume
          </a>
        </div>
      </div>
    </section>
  );
}