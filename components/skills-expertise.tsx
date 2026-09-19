"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Wrench, Terminal } from "lucide-react";

const skillGroups = [
  {
    number: "01",
    title: "Frontend Development",
    tagline: "UI Architecture & Performance",
    description:
      "Building responsive, accessible web interfaces with strict TypeScript types, modern React patterns, and clean component systems.",
    icon: Code2,
    skills: [
      "React 19",
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Framer Canvas API",
      "HTML5 / CSS3",
      "State Management",
    ],
  },
  {
    number: "02",
    title: "Backend & Systems",
    tagline: "APIs & Data Layers",
    description:
      "Developing RESTful endpoints, database schemas, authentication flows, and dynamic CMS integrations.",
    icon: Database,
    skills: [
      "Python / Django",
      "Django REST",
      "Node.js",
      "PostgreSQL",
      "Sanity CMS",
      "REST APIs",
      "JWT & Auth",
      "Data Modeling",
    ],
  },
  {
    number: "03",
    title: "Tooling & Delivery",
    tagline: "DevOps & Infrastructure",
    description:
      "Managing version control, automated deployment pipelines, cloud hosting, and design system translation.",
    icon: Wrench,
    skills: [
      "Git / GitHub",
      "Vercel",
      "Figma to Code",
      "Linux / Bash",
      "Postman",
      "npm / pnpm",
      "CI / CD Pipelines",
    ],
  },
];

export function SkillsExpertise() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-24 md:py-36 2xl:py-48 border-t border-border/40 overflow-hidden"
    >
      {/* Ambient background lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/[0.03] blur-[140px] rounded-full pointer-events-none -z-10"
      />

      <div className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] mx-auto px-6 md:px-12 2xl:px-16 4xl:px-24">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest text-primary uppercase mb-4">
            <Terminal className="w-4 h-4" aria-hidden="true" />
            <span>// 02 / CAPABILITIES &amp; STACK</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            Skills &amp; Capabilities
          </h2>
          <p className="mt-6 text-base sm:text-lg 2xl:text-xl text-muted-foreground leading-relaxed">
            Frontend software engineer with experience building web applications, custom Framer integrations, and scalable backend services.
          </p>
        </div>

        {/* 3-Column Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 2xl:gap-10">
          {skillGroups.map((group, idx) => {
            const GroupIcon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * idx,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                className="group rounded-3xl p-8 2xl:p-10 bg-card/50 border border-border/60 hover:border-primary/40 shadow-xl flex flex-col transition-all duration-300 cursor-default"
              >
                {/* Top Header: Icon, Tagline, & Number */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-muted/60 border border-border/60 flex items-center justify-center text-primary group-hover:scale-105 group-hover:bg-primary/10 transition-all duration-300 shadow-inner shrink-0">
                    <GroupIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-mono font-medium text-primary/80 tracking-wider">
                    #{group.number}
                  </span>
                </div>

                {/* Title & Tagline Badge */}
                <div className="space-y-1.5 mb-4">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">
                    {group.title}
                  </h3>
                  <p className="text-xs font-mono text-primary font-medium">
                    {group.tagline}
                  </p>
                </div>

                {/* Description - Fills the middle evenly */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 grow">
                  {group.description}
                </p>

                {/* Skill Chips Section */}
                <div className="pt-6 border-t border-border/40">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60 mb-3 block">
                    Core Technologies
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl text-xs font-mono bg-muted/40 border border-border/50 text-foreground/85 transition-colors duration-200 hover:border-primary/40 hover:text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SkillsExpertise;