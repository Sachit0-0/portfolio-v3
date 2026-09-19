"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Globe, Terminal } from "lucide-react";

/* ── Project Data ────────────────────────────────────────────────── */
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

const projects: Project[] = [
  {
    id: "frame-audit",
    number: "01",
    title: "FrameAudit",
    category: "Framer Plugin & SaaS",
    urlDomain: "framer.com/marketplace/plugins/frame-audit",
    description:
      "End-to-end Framer ecosystem product featuring a lightweight React/TypeScript canvas plugin, an automated backend audit engine, Lemon Squeezy payment integration, and a dedicated marketing platform.",
    link: "https://www.framer.com/marketplace/plugins/frame-audit/",
    image:
      "/frameAudit.webp",
  }, {
    id: "sneha-art",
    number: "06",
    title: "Sneha's Art Portfolio",
    category: "Client CMS Portfolio",
    urlDomain: "sneha.info.np",
    description:
      "CMS-managed artist portfolio with responsive image galleries, custom layout grids, fluid typography transitions, and SEO optimization.",
    link: "https://sneha.info.np",
    image:
      "sneha2.png",
  },

  {
    id: "photo2diary",
    number: "07",
    title: "Visual Journal & Gallery",
    category: "Creative Media Gallery",
    urlDomain: "photo2diary.vercel.app",
    description:
      "Sanity-powered photo journal featuring dark mode aesthetics, fluid page transitions, fast image caching, and minimalist gallery viewports.",
    link: "https://photo2diary.vercel.app",
    image: "/photo2.png",
  },

  {
    id: "framescore",
    number: "05",
    title: "FrameScore",
    category: "Performance Audit Tool",
    urlDomain: "framescore.sachit.info.np",
    description:
      "Performance and SEO audit platform for Framer websites, offering real-time scoring, technical analysis, and actionable optimization insights.",
    link: "https://framescore.sachit.info.np/",
    image:
      "frame-score.webp",
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
    image:
      "/nepale.png",
  }, {
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
];

/* ── Minimalist Clean Project Preview ─────────────────────────────── */
function ProjectPreviewImage({
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
    <div className="relative w-full aspect-[18/10] overflow-hidden bg-card">
      {/* Clean Minimalist Placeholder Canvas */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-card flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-12 h-12 rounded-2xl bg-muted/60 border border-border/50 flex items-center justify-center mb-3 shadow-inner">
          <Globe className="w-6 h-6 text-primary/60" />
        </div>
        <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-foreground/40">
          {title}
        </span>
        <span className="text-xs font-mono text-primary/60 mt-1">
          {category}
        </span>
      </div>

      {/* Actual Project Image */}
      {image && !hasError && (
        <img
          src={image}
          alt={title}
          onError={() => setHasError(true)}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          loading="lazy"
        />
      )}

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
}

/* ── Studio Browser Mockup Container ─────────────────────────────── */
function StudioMockup({ project }: { project: Project }) {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden studio-card shadow-2xl group transition-all duration-500 hover:border-primary/40">
      {/* Sleek Browser Omnibar Frame */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/60 border-b border-border/50 backdrop-blur-md z-20 relative select-none">
        {/* Window Dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-border group-hover:bg-red-500/80 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-border group-hover:bg-amber-500/80 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-border group-hover:bg-primary/80 transition-colors" />
        </div>

        {/* Omnibar Domain */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-muted/80 border border-border/50 text-[11px] font-mono text-muted-foreground">
          <Globe className="w-3 h-3 text-primary/70 shrink-0" />
          <span className="truncate max-w-[140px] sm:max-w-[240px]">
            {project.urlDomain}
          </span>
        </div>

        {/* Project Number */}
        <span className="text-[10px] font-mono font-medium text-primary/80 tracking-wider">
          {project.number}
        </span>
      </div>

      {/* Clean Image / Placeholder */}
      <ProjectPreviewImage
        image={project.image}
        title={project.title}
        category={project.category}
      />
    </div>
  );
}

/* ── Main Component Export ───────────────────────────────────────── */
export function ProjectsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 md:py-32 2xl:py-44 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[600px] 2xl:w-[900px] h-[400px] bg-primary/[0.04] blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] mx-auto px-6 md:px-12 2xl:px-16 4xl:px-24">
        {/* Editorial Header */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest text-primary uppercase mb-4">
            <Terminal className="w-4 h-4" />
            <span>// 03 / SELECTED WORK</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            Recent Projects          </h2>
          <p className="mt-6 text-base sm:text-lg 2xl:text-xl text-muted-foreground leading-relaxed">
            Production software and client platforms built, shipped, and maintained end-to-end.
          </p>
        </div>

        {/* ── Unified Projects Grid (All projects matching, clean layout) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 2xl:gap-18">
          {projects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.07 * idx,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="group flex flex-col justify-between space-y-5 cursor-default"
            >
              {/* Browser Mockup Frame with Image */}
              <StudioMockup project={project} />

              {/* Details & Metadata Below Mockup */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono tracking-wider text-primary uppercase">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground/60">
                    {project.number}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center justify-between gap-3">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-grow hover-lift text-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 group/title"
                    >
                      {project.title}
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover/title:text-primary group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all duration-200 shrink-0" />
                    </a>
                  ) : (
                    <span className="flex items-center gap-2">
                      {project.title}
                      {project.note && (
                        <span className="text-xs font-mono text-muted-foreground/50 italic font-normal">
                          {project.note}
                        </span>
                      )}
                    </span>
                  )}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsShowcase;