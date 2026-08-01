"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";

/* ── Project data ────────────────────────────────────────────────── */
const projects = [
  {
    id: 1,
    number: "01",
    title: "FrameAudit",
    category: "Full-Stack Plugin & SaaS",
    description:
      "End-to-end Framer ecosystem product featuring a lightweight React/TypeScript canvas plugin, an automated backend audit engine, Lemon Squeezy payment integration, and a dedicated marketing platform.",
    tech: ["Framer API", "React", "TypeScript", "Node.js", "Lemon Squeezy"],
    link: "https://framerify.com/frameaudit",
    linkLabel: "View Product",
  },
  {
    id: 2,
    number: "02",
    title: "Sneha's Art Portfolio",
    category: "Client Project",
    description:
      "CMS-managed artist portfolio with responsive image galleries, custom layout grids, and SEO optimization.",
    tech: ["Next.js", "Sanity CMS", "Tailwind CSS"],
    link: "https://sneha.info.np",
    linkLabel: "Visit Website",
  },
  {
    id: 3,
    number: "03",
    title: "Visual Journal & Gallery",
    category: "Creative Portfolio",
    description:
      "Sanity-powered photo journal featuring dark mode aesthetics, fluid transitions, and fast image loading.",
    tech: ["Next.js", "Sanity", "Framer Motion"],
    link: "https://photo2diary.vercel.app",
    linkLabel: "Visit Website",
  },
  {
    id: 4,
    number: "04",
    title: "EventCalendar",
    category: "Framer Plugin",
    description:
      "Full-featured Framer plugin supporting recurring events, category filters, and multiple interactive calendar views.",
    tech: ["Framer API", "TypeScript", "React"],
    link: "https://frame-event.vercel.app",
    linkLabel: "Live Demo",
  },
  {
    id: 5,
    number: "05",
    title: "MakeMyScan",
    category: "Web Platform",
    description:
      "Web vulnerability scanning platform featuring auth, scan history, target management, and real-time security reporting.",
    image: "/makemyscan.png",
    tech: ["Next.js", "Django REST", "PostgreSQL"],
    link: "https://makemyscan.com",
  },
  {
    id: 6,
    number: "06",
    title: "DHN BI Dashboard",
    category: "Enterprise BI",
    description:
      "Interactive Business Intelligence platform with drill-down data visualization for a national organization.",
    image: "/dhn.png",
    tech: ["React", "Recharts", "TypeScript"],
    note: "Confidential client build",
  },
];

/* ── Section header ──────────────────────────────────────────────── */
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const words = title.split(" ");

  return (
    <div ref={ref} className="mb-14 md:mb-20">
      <span className="text-xs uppercase tracking-[0.2em] text-primary font-mono block mb-3">
        Portfolio
      </span>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05]">
        {words.map((word, i) => (
          <span key={i} className="inline-block mr-[0.25em] overflow-hidden align-top">
            <motion.span
              className="inline-block"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "110%" }}
              animate={isInView ? { opacity: 1, y: "0%" } : {}}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 0.6,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>
      {subtitle && (
        <motion.p
          className="mt-3 text-muted-foreground text-base max-w-xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

/* ── Gallery Card Component ─────────────────────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  // 1. Explicit local image first
  // 2. Automated website screenshot via Microlink API if link exists
  // 3. Null fallback (will show subtle placeholder)
  const bannerSrc =
    project.image ||
    (project.link
      ? `https://api.microlink.io/?url=${encodeURIComponent(
        project.link
      )}&screenshot=true&meta=false&embed=screenshot.url`
      : null);

  return (
    <motion.article
      ref={cardRef}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className="group relative flex flex-col justify-between rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm p-6 sm:p-8 hover:border-border transition-colors duration-300"
    >
      <div>
        {/* Top Header Row: Index Number & Category Pill */}
        <div className="flex items-center justify-between mb-5">
          <span className="font-mono text-xs font-semibold text-primary/90 tracking-widest">
            {project.number}
          </span>
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground/80 px-2.5 py-0.5 rounded-full border border-border/40 bg-background/60">
            {project.category}
          </span>
        </div>

        {/* Media / Visual Showcase */}
        {bannerSrc ? (
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-muted/40 border border-border/40">
            <Image
              src={bannerSrc}
              alt={project.title}
              fill
              unoptimized={!project.image} // Skips Next.js image optimization for dynamic Microlink URLs
              className="object-cover object-top transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index < 2}
            />
          </div>
        ) : (
          <div className="relative aspect-[16/10] rounded-xl mb-6 bg-gradient-to-br from-muted/30 via-muted/10 to-background border border-border/40 p-6 flex items-center justify-center overflow-hidden">
            <span className="font-display text-2xl font-bold tracking-tight text-foreground/20 select-none">
              {project.title}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-3">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-primary transition-colors duration-200"
            >
              <span>{project.title}</span>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
            </a>
          ) : (
            project.title
          )}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      {/* Footer: Tech Stack & Link */}
      <div className="space-y-4 pt-4 border-t border-border/40">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((item) => (
            <span
              key={item}
              className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-muted/50 text-muted-foreground border border-border/30"
            >
              {item}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-primary font-medium hover:underline pt-1"
          >
            <span>{project.linkLabel || "View Project"}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        {project.note && !project.link && (
          <span className="block text-[11px] font-mono text-muted-foreground/60 italic">
            {project.note}
          </span>
        )}
      </div>
    </motion.article>
  );
}

/* ── Main export ─────────────────────────────────────────────────── */
export function ProjectsShowcase() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader
          title="Recent Work"
          subtitle="Selected software products, published Framer plugins, and client web applications."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}