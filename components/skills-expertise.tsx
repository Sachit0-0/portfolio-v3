"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Wrench, Sparkles, CheckCircle2 } from "lucide-react";
import { AwwwardsText } from "./ui/awwwards-text";
import { ScrollRevealText, ScrollRevealLine, ScrollFadeIn } from "./ui/scroll-reveal";

const skillGroups = [
  {
    number: "01",
    title: "Frontend Architecture",
    tagline: "UI Systems & Web Apps",
    description: "Building resilient, pixel-perfect user interfaces with strict TypeScript types, server-side rendering, and motion dynamics.",
    icon: Code2,
    highlights: [
      "Modular React / Next.js architecture",
      "Framer Motion & Canvas Plugin APIs",
      "Responsive, accessible design systems",
    ],
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
    title: "Backend & API Systems",
    tagline: "Server Services & Data",
    description: "Architecting secure RESTful endpoints, CMS schemas, authentication flows, and relational databases for modern apps.",
    icon: Database,
    highlights: [
      "Django REST & Python backend engines",
      "Sanity Headless CMS integrations",
      "PostgreSQL data models & queries",
    ],
    skills: [
      "Python / Django",
      "Django REST",
      "Node.js / Express",
      "PostgreSQL",
      "Sanity CMS",
      "REST APIs",
      "JSON Schemas",
      "Auth & Security",
    ],
  },
  {
    number: "03",
    title: "Tooling & Ecosystem",
    tagline: "DevOps & Workflows",
    description: "Leveraging modern developer tools, containerization, cloud deployment platforms, and automated release workflows.",
    icon: Wrench,
    highlights: [
      "Git & GitHub collaboration flows",
      "Vercel serverless deployments",
      "Docker containerized environments",
    ],
    skills: [
      "Git / GitHub",
      "Vercel Platform",
      "Docker",
      "Figma to Code",
      "Postman API Studio",
      "Linux / Bash",
      "npm / pnpm",
      "CI/CD Basics",
    ],
  },
];

export function SkillsExpertise() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <section id="skills" ref={containerRef} className="relative py-24 md:py-36 2xl:py-48 border-t border-border/40 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] 2xl:w-[900px] h-[300px] 2xl:h-[450px] bg-primary/5 blur-[120px] 2xl:blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] mx-auto px-6 md:px-12 2xl:px-16 4xl:px-24">
        {/* Section Header with scroll text reveals */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 2xl:mb-32 gap-6">
          <div>
            <ScrollFadeIn delay={0}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full ios-glass text-xs sm:text-sm 2xl:text-base font-mono tracking-wider text-primary shadow-md mb-4 uppercase">
                <Sparkles className="w-4 h-4" />
                <span>02 / TECHNICAL ARCHITECTURE</span>
              </div>
            </ScrollFadeIn>
            <ScrollRevealText
              text="Skills & Capabilities"
              as="h2"
              className="font-display text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl 3xl:text-8xl tracking-tight leading-[1.05] text-foreground"
              delay={0.1}
              stagger={0.06}
            />
          </div>
          <ScrollRevealText
            text="Frontend-focused software developer specializing in high-performance web applications, published Framer plugins, and robust backend APIs."
            className="text-muted-foreground text-base 2xl:text-xl 3xl:text-2xl max-w-md 2xl:max-w-lg 3xl:max-w-xl leading-relaxed"
            delay={0.2}
            stagger={0.015}
            variant="blur"
          />
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 2xl:gap-10 3xl:gap-12 4xl:gap-16 mb-20">
          {skillGroups.map((group, groupIdx) => {
            const GroupIcon = group.icon;
            return (
              <ScrollFadeIn key={group.title} delay={groupIdx * 0.12} y={40}>
                <div className="group relative p-8 2xl:p-10 rounded-3xl ios-glass-card shadow-lg flex flex-col justify-between h-full">
                  {/* Subtle card corner glow on hover */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div>
                    {/* Top Bar: Index & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 2xl:w-14 2xl:h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                        <GroupIcon className="w-6 h-6 2xl:w-7 2xl:h-7" />
                      </div>
                      <span className="font-mono text-xs 2xl:text-sm font-semibold text-muted-foreground/70 border border-border/40 bg-background/50 px-3 py-1 rounded-full">
                        {group.number}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-2xl 2xl:text-3xl font-bold tracking-tight text-foreground mb-1">
                      <AwwwardsText text={group.title} />
                    </h3>
                    <span className="text-xs 2xl:text-sm font-mono text-primary font-medium block mb-3">
                      {group.tagline}
                    </span>
                    <p className="text-sm 2xl:text-base text-muted-foreground leading-relaxed mb-6">
                      {group.description}
                    </p>

                    {/* Highlights list */}
                    <div className="space-y-2.5 mb-8 pt-4 border-t border-border/40">
                      {group.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs 2xl:text-sm text-foreground/80">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skill Badges */}
                  <div className="pt-4 border-t border-border/40">
                    <span className="text-[10px] 2xl:text-xs uppercase tracking-widest font-mono text-muted-foreground/70 block mb-3">
                      Technologies &amp; Tools
                    </span>
                    <div className="flex flex-wrap gap-1.5 2xl:gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs 2xl:text-sm font-medium bg-muted/40 border border-border/40 text-foreground/90 group-hover:border-border/80 transition-all duration-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/80" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
