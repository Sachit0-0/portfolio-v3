"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Sparkles, Globe } from "lucide-react";
import { AwwwardsText } from "./ui/awwwards-text";
import { ScrollRevealText, ScrollFadeIn } from "./ui/scroll-reveal";

function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return isMounted;
}

/* ── Project data ────────────────────────────────────────────────── */
const projects = [
  {
    id: 1,
    number: "01",
    title: "FrameAudit",
    category: "Full-Stack Plugin & SaaS",
    urlDomain: "framerify.com/frameaudit",
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
    urlDomain: "sneha.info.np",
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
    urlDomain: "photo2diary.vercel.app",
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
    urlDomain: "frame-event.vercel.app",
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
    urlDomain: "makemyscan.com",
    description:
      "Web vulnerability scanning platform featuring auth, scan history, target management, and real-time security reporting.",
    image: "/makemyscan.png",
    tech: ["Next.js", "Django REST", "PostgreSQL"],
    link: "https://makemyscan.com",
    linkLabel: "Visit Website",
  },
  {
    id: 6,
    number: "06",
    title: "DHN BI Dashboard",
    category: "Enterprise BI",
    urlDomain: "dhn.gov.np",
    description:
      "Interactive Business Intelligence platform with drill-down data visualization for a national organization.",
    image: "/dhn.png",
    tech: ["React", "Recharts", "TypeScript"],
    note: "Confidential client build",
  },
];

/* ── Gallery Card with per-card scroll speed ─────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef(null);
  const isMounted = useIsMounted();
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  // Differential scroll-speed parallax per card — odd cards drift faster
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? 30 : 50, index % 2 === 0 ? -30 : -50]
  );

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
      style={isMounted && !shouldReduceMotion ? { y: parallaxY } : undefined}
      initial={isMounted ? (shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }) : false}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      className="group relative flex flex-col justify-between rounded-3xl ios-glass-card p-6 sm:p-8 2xl:p-10 overflow-hidden hover:-translate-y-1"
    >
      <div>
        {/* Top Header: Monospace Index & Category */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] 2xl:text-xs font-mono font-semibold text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20 tracking-wider">
            [ {project.number} ]
          </span>
          <span className="text-[11px] 2xl:text-xs font-mono text-muted-foreground/70 bg-background/50 px-2.5 py-1 rounded-full border border-border/40">
            {project.category}
          </span>
        </div>

        {/* Browser Mockup Window Container */}
        <div className="rounded-2xl border border-border/60 bg-background/80 overflow-hidden mb-6 shadow-sm group-hover:border-border/90 transition-colors">
          {/* Browser Mockup Top Bar */}
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-border/40 bg-muted/40">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-1 text-[10px] 2xl:text-xs font-mono text-muted-foreground/70 bg-background/60 px-2.5 py-0.5 rounded-md border border-border/30 max-w-[180px] truncate">
              <Globe className="w-3 h-3 text-muted-foreground shrink-0" />
              <span className="truncate">{project.urlDomain || "https://..."}</span>
            </div>
          </div>

          {/* Screenshot Media */}
          {bannerSrc ? (
            <div className="relative aspect-[16/10] overflow-hidden bg-muted/20">
              <Image
                src={bannerSrc}
                alt={project.title}
                fill
                unoptimized={!project.image}
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, (max-width: 1920px) 50vw, 33vw"
                priority={index < 2}
              />
            </div>
          ) : (
            <div className="relative aspect-[16/10] bg-gradient-to-br from-muted/30 via-muted/10 to-background p-6 flex items-center justify-center overflow-hidden">
              <span className="font-display text-2xl font-bold tracking-tight text-foreground/20 select-none">
                {project.title}
              </span>
            </div>
          )}
        </div>

        {/* Title with Awwwards Kinetic Character Roll */}
        <h3 className="font-display text-2xl md:text-3xl 2xl:text-4xl font-bold tracking-tight mb-3 text-foreground">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-primary transition-colors duration-200"
            >
              <AwwwardsText text={project.title} />
              <ArrowUpRight className="w-5 h-5 2xl:w-6 2xl:h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
            </a>
          ) : (
            <AwwwardsText text={project.title} />
          )}
        </h3>

        {/* Description */}
        <p className="text-sm 2xl:text-base text-muted-foreground leading-relaxed mb-6 font-sans">
          {project.description}
        </p>
      </div>

      {/* Footer: Tech Stack & Link Button */}
      <div className="space-y-4 pt-4 border-t border-border/40">
        <div className="flex flex-wrap gap-1.5 2xl:gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="text-[11px] 2xl:text-xs font-mono px-2.5 py-1 rounded-xl bg-muted/40 text-foreground/80 border border-border/40 flex items-center gap-1.5"
            >
              <span className="w-1 h-1 rounded-full bg-primary/70" />
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs 2xl:text-sm font-mono text-primary font-semibold bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm group/btn"
            >
              <span>{project.linkLabel || "View Project"}</span>
              <ExternalLink className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          ) : project.note ? (
            <span className="text-[11px] 2xl:text-xs font-mono text-muted-foreground/60 italic">
              {project.note}
            </span>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}


/* ── Main export ─────────────────────────────────────────────────── */
export function ProjectsShowcase() {
  return (
    <section id="projects" className="relative py-24 md:py-36 2xl:py-48">
      <div className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] mx-auto px-6 md:px-12 2xl:px-16 4xl:px-24">
        {/* Section Header with scroll text reveals */}
        <div className="mb-16 md:mb-24 2xl:mb-32">
          <ScrollFadeIn delay={0}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full ios-glass text-xs sm:text-sm 2xl:text-base font-mono tracking-wider text-primary shadow-md mb-4 uppercase">
              <Sparkles className="w-4 h-4" />
              <span>03 / SELECTED PORTFOLIO</span>
            </div>
          </ScrollFadeIn>
          <ScrollRevealText
            text="Recent Work"
            as="h2"
            className="font-display text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl 3xl:text-8xl tracking-tight leading-[1.05] text-foreground"
            delay={0.1}
            stagger={0.08}
          />
          <ScrollRevealText
            text="Selected software products, published Framer canvas plugins, and client web applications."
            className="mt-4 text-muted-foreground text-base 2xl:text-xl 3xl:text-2xl max-w-xl 2xl:max-w-2xl leading-relaxed"
            delay={0.2}
            stagger={0.015}
            variant="blur"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 gap-8 2xl:gap-10 3xl:gap-12 4xl:gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}