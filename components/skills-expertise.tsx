"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Database, Wrench } from "lucide-react";

const skillGroups = [
  {
    title: "Frontend Engineering",
    description: "Building production web applications with type safety & responsive UI systems.",
    icon: Code2,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Framer Plugin API",
      "HTML5 / CSS3",
      "State Management",
    ],
  },
  {
    title: "Backend & API Integration",
    description: "RESTful services, database connections, and server-side application logic.",
    icon: Database,
    skills: [
      "Python / Django",
      "Node.js",
      "Express.js",
      "REST APIs",
      "PostgreSQL",
      "Sanity CMS",
      "JSON APIs",
    ],
  },
  {
    title: "Workflow & Tooling",
    description: "Development tools, version control systems, and deployment platforms.",
    icon: Wrench,
    skills: [
      "Git / GitHub",
      "Vercel",
      "Docker (Basic)",
      "Figma",
      "Postman",
      "Linux / Bash",
      "npm / pnpm",
    ],
  },
];

export function SkillsExpertise() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <section id="skills" ref={containerRef} className="relative py-24 md:py-32 border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-20 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-primary font-mono block mb-3">
              Technical Stack
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05]">
              Skills &amp; Capabilities
            </h2>
          </div>
          <p className="text-muted-foreground text-base max-w-md">
            Frontend-focused technical stack with practical experience shipping web applications, published design tools, and REST APIs.
          </p>
        </div>

        {/* Unified Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillGroups.map((group, groupIdx) => {
            const GroupIcon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: groupIdx * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="p-7 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  {/* Category Title & Icon */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <GroupIcon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {group.title}
                    </h3>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    {group.description}
                  </p>

                  {/* Clean List of Skill Badges */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-background/80 border border-border/60 text-foreground/90"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
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
