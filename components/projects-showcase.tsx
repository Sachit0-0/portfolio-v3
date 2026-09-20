"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, memo } from "react";
import { ArrowUpRight, Globe, Terminal, ExternalLink } from "lucide-react";

/* ── Types & Interface Definitions ───────────────────────────────── */
export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  urlDomain: string;
  description: string;
  link?: string;
  note?: string;
  image?: string;
}

/* ── Project Data ────────────────────────────────────────────────── */
const PROJECTS: ReadonlyArray<Project> = [
  {
    id: "frame-audit",
    number: "01",
    title: "FrameAudit",
    category: "Framer Plugin & SaaS",
    urlDomain: "framer.com/marketplace/plugins/frame-audit",
    description:
      "End-to-end Framer ecosystem product featuring a lightweight React/TypeScript canvas plugin, an automated backend audit engine, Lemon Squeezy payment integration, and a dedicated marketing platform.",
    link: "https://www.framer.com/marketplace/plugins/frame-audit/",
    image: "/frameAudit.webp",
  },
  {
    id: "makemyscan",
    number: "02",
    title: "MakeMyScan",
    category: "Security Platform",
    urlDomain: "makemyscan.com",
    description:
      "Web vulnerability scanning platform featuring authentication, scan telemetry history, target management, and automated real-time vulnerability scoring.",
    link: "https://makemyscan.com",
    image: "/makemyscan.png",
  },
  {
    id: "nepale",
    number: "03",
    title: "NEPALÉ",
    category: "Editorial Brand Experience",
    urlDomain: "nepale.vercel.app",
    description:
      "A concept fashion-editorial site exploring high-fashion editorial design, fluid layout transitions, interactive product features, and custom typography.",
    link: "https://nepale.vercel.app/",
    image: "/nepale.png",
  },
  {
    id: "framescore",
    number: "04",
    title: "FrameScore",
    category: "Performance Audit Tool",
    urlDomain: "framescore.sachit.info.np",
    description:
      "Performance and SEO audit platform for Framer websites, offering real-time scoring, technical analysis, and actionable optimization insights.",
    link: "https://framescore.sachit.info.np/",
    image: "/frame-score.webp",
  },
  {
    id: "sneha-art",
    number: "05",
    title: "Sneha's Art Portfolio",
    category: "Client CMS Portfolio",
    urlDomain: "sneha.info.np",
    description:
      "CMS-managed artist portfolio with responsive image galleries, custom layout grids, fluid typography transitions, and SEO optimization.",
    link: "https://sneha.info.np",
    image: "/sneha2.png",
  },
  {
    id: "photo2diary",
    number: "06",
    title: "Visual Journal & Gallery",
    category: "Creative Media Gallery",
    urlDomain: "photo2diary.vercel.app",
    description:
      "Sanity-powered photo journal featuring dark mode aesthetics, fluid page transitions, fast image caching, and minimalist gallery viewports.",
    link: "https://photo2diary.vercel.app",
    image: "/photo2.png",
  },
];

/* ── Per-Card Scroll Reveal Wrapper ──────────────────────────────── */
const ScrollRevealCard = memo(function ScrollRevealCard({
  children,
  index,
  shouldReduceMotion,
}: {
  children: React.ReactNode;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const isCardInView = useInView(cardRef, { once: true, margin: "-60px" });
  const fromLeft = index % 2 === 0;

  return (
    <motion.article
      ref={cardRef}
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, x: fromLeft ? -50 : 50, y: 20 }
      }
      animate={
        isCardInView
          ? shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 1, x: 0, y: 0 }
          : undefined
      }
      transition={{ duration: 0.65, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      className="group flex flex-col justify-between space-y-5 cursor-default"
    >
      {children}
    </motion.article>
  );
});

/* ── Minimalist Clean Project Preview Component ──────────────────── */
const ProjectPreviewImage = memo(function ProjectPreviewImage({
  image,
  title,
  category,
}: {
  image?: string;
  title: string;
  category: string;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className="relative w-full aspect-[18/10] overflow-hidden bg-card m-0">
      {/* Fallback Clean Placeholder Canvas */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-card flex flex-col items-center justify-center p-6 text-center select-none"
        aria-hidden={!hasError && Boolean(image)}
      >
        <div className="w-12 h-12 rounded-2xl bg-muted/80 border border-border/50 flex items-center justify-center mb-3 shadow-inner">
          <Globe className="w-6 h-6 text-primary/60" />
        </div>
        <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground/40">
          {title}
        </span>
        <span className="text-xs font-mono text-primary/60 mt-1">
          {category}
        </span>
      </div>

      {/* Primary Project Image */}
      {image && !hasError && (
        <img
          src={image}
          alt={`Screenshot preview of ${title}`}
          width={1200}
          height={750}
          onError={() => setHasError(true)}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Subtle Bottom Vignette */}
      <div
        className=""
        aria-hidden="true"
      />
    </figure>
  );
});

/* ── Studio Browser Mockup Container Component ──────────────────── */
const StudioMockup = memo(function StudioMockup({ project }: { project: Project }) {
  const content = (
    <div className="relative w-full rounded-2xl overflow-hidden border border-border/60 bg-card shadow-lg transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-2xl">
      {/* Sleek Browser Omnibar Frame */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/60 border-b border-border/50 backdrop-blur-md z-20 relative select-none">
        {/* Window Control Buttons */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-border group-hover:bg-red-500/80 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-border group-hover:bg-amber-500/80 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-border group-hover:bg-emerald-500/80 transition-colors" />
        </div>

        {/* Omnibar Domain */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-background/80 border border-border/40 text-[11px] font-mono text-muted-foreground group-hover:text-foreground transition-colors">
          <Globe className="w-3 h-3 text-primary/70 shrink-0" />
          <span className="truncate max-w-[140px] sm:max-w-[240px]">
            {project.urlDomain}
          </span>
        </div>

        {/* Project Sequence Identifier */}
        <span className="text-[10px] font-mono font-medium text-primary/80 tracking-wider">
          {project.number}
        </span>
      </div>

      {/* Canvas Preview Area */}
      <ProjectPreviewImage
        image={project.image}
        title={project.title}
        category={project.category}
      />
    </div>
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
});

/* ── Main Exported Component ─────────────────────────────────────── */
export function ProjectsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 md:py-32 2xl:py-44 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/4 right-0 w-[500px] md:w-[700px] 2xl:w-[900px] h-[400px] bg-primary/[0.03] blur-[140px] rounded-full pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1850px] mx-auto px-6 md:px-12 2xl:px-16">
        {/* Editorial Section Header */}
        <header className="mb-14 md:mb-20 max-w-3xl">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest text-primary uppercase mb-3">
            <Terminal className="w-4 h-4" aria-hidden="true" />
            <span>// 03 / SELECTED WORK</span>
          </div>
          <h2
            id="projects-heading"
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]"
          >
            Recent Projects
          </h2>
          <p className="mt-5 text-base sm:text-lg 2xl:text-xl text-muted-foreground leading-relaxed">
            Production software and client platforms built, shipped, and maintained end-to-end.
          </p>
        </header>

        {/* Unified Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 2xl:gap-16">
          {PROJECTS.map((project, idx) => (
            <ScrollRevealCard key={project.id} index={idx} shouldReduceMotion={shouldReduceMotion}>
              {/* Browser Frame Preview */}
              <StudioMockup project={project} />

              {/* Text Information & Metadata */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-wider text-primary uppercase font-medium">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground/50">
                    {project.number}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200 group/title"
                    >
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground/60 group-hover/title:text-primary group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-transform duration-200 shrink-0" />
                    </a>
                  ) : (
                    <span className="flex items-center gap-2">
                      {project.title}
                      {project.note && (
                        <span className="text-xs font-mono text-muted-foreground/60 italic font-normal">
                          ({project.note})
                        </span>
                      )}
                    </span>
                  )}
                </h3>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </ScrollRevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsShowcase;