"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Check,
  Code2,
  Database,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

type SkillGroup = {
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  outcomes: string[];
  skills: string[];
  metric: {
    value: string;
    label: string;
  };
};

const skillGroups: SkillGroup[] = [
  {
    number: "01",
    title: "Frontend Development",
    tagline: "React, Next.js, TypeScript",
    description:
      "I turn designs and product ideas into fast, responsive interfaces with thoughtful interactions, accessible patterns, and careful attention to detail.",
    outcomes: [
      "Responsive and accessible interfaces",
      "Reusable components and design systems",
      "Smooth interactions without excess",
    ],
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Framer Canvas API",
    ],
    metric: {
      value: "UI",
      label: "from concept to production",
    },
    icon: Code2,
  },
  {
    number: "02",
    title: "Backend & Systems",
    tagline: "APIs, auth, data",
    description:
      "I build the APIs, data models, and authentication systems behind the interface so products work end-to-end and remain easy to extend.",
    outcomes: [
      "Clear and maintainable APIs",
      "Secure authentication and data flows",
      "Reliable foundations for growth",
    ],
    skills: [
      "Python / Django",
      "Django REST",
      "Node.js",
      "PostgreSQL",
      "Sanity CMS",
      "JWT & Auth",
    ],
    metric: {
      value: "API",
      label: "designed for real-world use",
    },
    icon: Database,
  },
  {
    number: "03",
    title: "Tooling & Delivery",
    tagline: "Git, CI, deployment",
    description:
      "I take care of the practical details that move a project from a local branch to a dependable product people can actually use.",
    outcomes: [
      "Clean Git-based workflows",
      "Fast and predictable deployments",
      "A smoother handoff from code to client",
    ],
    skills: [
      "Git / GitHub",
      "Vercel",
      "Figma to Code",
      "Linux / Bash",
      "CI / CD",
    ],
    metric: {
      value: "SHIP",
      label: "with confidence and clarity",
    },
    icon: Wrench,
  },
];

/* -------------------------------------------------------------------------- */
/* ScrollStack                                                                */
/* -------------------------------------------------------------------------- */

function ScrollStackItem({ children }: { children: ReactNode }) {
  return <div className="scroll-stack-card">{children}</div>;
}

function ScrollStack({
  children,
  itemDistance = 60,
  itemScale = 0.035,
  itemStackDistance = 24,
  baseScale = 0.9,
}: {
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  baseScale?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const currentScalesRef = useRef<number[]>([]);

  const lerp = useCallback(
    (start: number, end: number, factor: number) => {
      const difference = end - start;

      if (Math.abs(difference) < 0.001) {
        return end;
      }

      return start + difference * factor;
    },
    [],
  );

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>(".scroll-stack-card"),
    );

    if (!cards.length) {
      return;
    }

    currentScalesRef.current = cards.map(() => 1);

    const isMobile = window.innerWidth < 768;
    const stickyTopBase = isMobile ? 88 : 120;
    const stackDistance = isMobile ? 16 : itemStackDistance;
    const cardMargin = isMobile ? 32 : itemDistance;

    cards.forEach((card, index) => {
      card.style.position = "sticky";
      card.style.top = `${stickyTopBase + index * stackDistance}px`;
      card.style.marginBottom =
        index === cards.length - 1 ? "0px" : `${cardMargin}px`;
      card.style.zIndex = String(index + 1);
      card.style.transformOrigin = "top center";
      card.style.willChange = "transform";
    });

    let isRunning = true;
    const lerpFactor = 0.16;

    const animate = () => {
      if (!isRunning) {
        return;
      }

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const stickyTop = stickyTopBase + index * stackDistance;
        const isStuck = rect.top <= stickyTop + 5;

        let targetScale = 1;

        if (isStuck) {
          let stackedAbove = 0;

          for (
            let nextIndex = index + 1;
            nextIndex < cards.length;
            nextIndex += 1
          ) {
            const nextCard = cards[nextIndex];
            const nextRect = nextCard.getBoundingClientRect();
            const nextStickyTop =
              stickyTopBase + nextIndex * stackDistance;

            if (nextRect.top <= nextStickyTop + 5) {
              stackedAbove += 1;
            }
          }

          targetScale = Math.max(
            baseScale,
            1 - stackedAbove * itemScale,
          );
        }

        const currentScale = currentScalesRef.current[index] ?? 1;
        const nextScale = lerp(
          currentScale,
          targetScale,
          lerpFactor,
        );

        currentScalesRef.current[index] = nextScale;
        card.style.transform = `scale(${nextScale.toFixed(4)})`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      cards.forEach((card) => {
        card.style.position = "";
        card.style.top = "";
        card.style.marginBottom = "";
        card.style.zIndex = "";
        card.style.transform = "";
        card.style.transformOrigin = "";
        card.style.willChange = "";
      });
    };
  }, [
    baseScale,
    itemDistance,
    itemScale,
    itemStackDistance,
    lerp,
  ]);

  return (
    <div ref={containerRef} className="relative">
      {children}

      <div
        className="h-[20vh] min-h-24"
        aria-hidden="true"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SkillsExpertise                                                            */
/* -------------------------------------------------------------------------- */

export function SkillsExpertise() {
  const headerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(headerRef, {
    once: true,
    margin: "-80px",
  });

  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="
        relative border-t border-border/40
        py-24 md:py-36 2xl:py-48
      "
    >
      {/* Background decoration */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10 overflow-hidden
        "
        aria-hidden="true"
      >
        <div
          className="
            absolute left-1/2 top-1/2
            h-[360px] w-[620px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full bg-primary/[0.035]
            blur-[150px]
            dark:bg-primary/[0.07]
          "
        />
      </div>

      {/* Original section width preserved */}
      <div
        className="
          mx-auto max-w-7xl
          px-6 md:px-12
          2xl:max-w-[1536px] 2xl:px-16
          3xl:max-w-[1850px]
        "
      >
        {/* Original heading and copy */}
        <motion.div
          ref={headerRef}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 24 }
          }
          animate={
            isInView
              ? shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0 }
              : undefined
          }
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-16 max-w-3xl md:mb-24"
        >
          <div
            className="
              mb-5 flex items-center gap-2
              text-sm font-mono font-medium uppercase
              tracking-[0.16em]
              text-primary
              sm:text-base
            "
          >
            <Terminal
              className="h-5 w-5"
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <span>// 02 / CAPABILITIES &amp; STACK</span>
          </div>

          <h2
            className="
              font-display text-5xl font-extrabold
              leading-[1.02]
              tracking-[-0.05em]
              text-foreground
              sm:text-7xl
              md:text-[5.25rem]
            "
          >
            Skills &amp; Capabilities
          </h2>

          <p
            className="
              mt-7 max-w-2xl
              text-lg leading-8
              tracking-[-0.008em]
              text-foreground/75
              dark:text-slate-300
              sm:text-xl sm:leading-9
              2xl:text-[1.35rem]
            "
          >
            Frontend software engineer with experience building web
            applications, custom Framer integrations, and scalable backend
            services.
          </p>
        </motion.div>

        {/* Skill cards */}
        <ScrollStack>
          {skillGroups.map((group) => {
            const GroupIcon = group.icon;
            const headingId = `skill-group-${group.number}`;

            return (
              <ScrollStackItem key={group.title}>
                <article
                  aria-labelledby={headingId}
                  className="
    group relative min-h-[470px]
    overflow-hidden rounded-[28px]
    border border-border/60
    bg-card
    shadow-[0_18px_60px_-24px_hsl(var(--foreground)/0.2)]
    backdrop-blur-xl
    transition-[border-color,box-shadow,background-color]
    duration-500
    hover:border-primary/40
    hover:bg-card
    hover:shadow-[0_24px_80px_-28px_hsl(var(--foreground)/0.3)]
    dark:border-[#333438]
    dark:bg-[#1B1C1E]
    dark:hover:border-[#45474B]
    dark:hover:bg-[#1B1C1E]
    md:p-8
    lg:min-h-[430px]
    lg:p-10
  "
                >

                  {/* Very subtle ambient card glow */}
                  <div
                    className="
                      pointer-events-none absolute
                      -right-32 -top-32
                      h-72 w-72 rounded-full
                      bg-primary/[0.06]
                      opacity-0 blur-3xl
                      transition-opacity duration-700
                      group-hover:opacity-100
                    "
                    aria-hidden="true"
                  />

                  {/* Decorative number */}
                  <span
                    className="
                      pointer-events-none absolute
                      -bottom-8 right-0 hidden select-none
                      font-display text-[12rem] font-semibold
                      leading-none tracking-[-0.08em]
                      text-foreground/[0.045]
                      transition-colors duration-500
                      dark:text-white/[0.06]
                      group-hover:text-primary/[0.08]
                      lg:block
                    "
                    aria-hidden="true"
                  >
                    {group.number}
                  </span>

                  <div
                    className="
                      relative grid h-full gap-10
                      lg:grid-cols-[0.82fr_1.18fr]
                      lg:gap-14
                    "
                  >
                    {/* Left column */}
                    <div className="flex flex-col">
                      <header className="mb-8 flex items-start justify-between">
                        {/* Outlined icon tile; no fill effect on hover */}
                        <div
                          className="
                            flex h-14 w-14 items-center justify-center
                            rounded-2xl
                            border border-primary/40
                            bg-primary/10
                            text-primary
                            shadow-[inset_0_1px_0_hsl(var(--primary)/0.08)]
                            transition-[border-color,background-color,transform,box-shadow]
                            duration-500
                            dark:border-primary/60
                            dark:bg-primary/15
                            group-hover:scale-[1.04]
                            group-hover:border-primary/70
                            group-hover:bg-primary/15
                            group-hover:shadow-[0_8px_24px_hsl(var(--primary)/0.16)]
                          "
                          aria-hidden="true"
                        >
                          <GroupIcon
                            className="h-6 w-6"
                            strokeWidth={1.7}
                          />
                        </div>

                        <span
                          className="
                            rounded-full
                            border border-border/70
                            bg-muted/40
                            px-3 py-1.5
                            text-[10px] font-mono font-medium
                            tracking-[0.18em]
                            text-foreground/70
                            dark:border-slate-700
                            dark:bg-slate-800/70
                            dark:text-slate-200
                            lg:hidden
                          "
                        >
                          {group.number}
                        </span>
                      </header>

                      <div>
                        <p
                          className="
                            mb-4 max-w-xs
                            text-xs font-mono font-semibold
                            uppercase tracking-[0.17em]
                            text-primary
                            sm:text-sm
                          "
                        >
                          {group.tagline}
                        </p>

                        <h3
                          id={headingId}
                          className="
                            max-w-md
                            font-display text-[2rem] font-bold
                            leading-[1.08]
                            tracking-[-0.04em]
                            text-foreground
                            md:text-[2.65rem]
                          "
                        >
                          {group.title}
                        </h3>
                      </div>

                      {/* Desktop metric */}
                      <div className="mt-auto hidden pt-10 lg:block">
                        <div className="flex items-end gap-3">
                          <span
                            className="
                              font-display text-4xl font-semibold
                              tracking-[-0.05em]
                              text-primary
                            "
                          >
                            {group.metric.value}
                          </span>

                          <span
                            className="
                              max-w-[180px] pb-1
                              text-sm leading-5
                              text-foreground/65
                              dark:text-slate-300
                            "
                          >
                            {group.metric.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col">
                      <p
                        className="
                          max-w-2xl
                          text-base leading-8
                          tracking-[-0.003em]
                          text-foreground/75
                          dark:text-slate-300
                          md:text-[1.075rem]
                        "
                      >
                        {group.description}
                      </p>

                      <ul
                        className="mt-7 space-y-3"
                        aria-label={`${group.title} outcomes`}
                      >
                        {group.outcomes.map((outcome) => (
                          <li
                            key={outcome}
                            className="
                              flex items-start gap-3
                              text-base leading-6
                              text-foreground/90
                              dark:text-slate-200
                            "
                          >
                            <span
                              className="
                                mt-0.5 flex h-5 w-5 shrink-0
                                items-center justify-center
                                rounded-full
                                border border-primary/40
                                bg-primary/10
                                text-primary
                                dark:border-primary/60
                                dark:bg-primary/15
                              "
                            >
                              <Check
                                className="h-3 w-3"
                                strokeWidth={2.4}
                                aria-hidden="true"
                              />
                            </span>

                            <span>{outcome}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Mobile metric */}
                      <div className="mt-7 flex items-center gap-3 lg:hidden">
                        <span
                          className="
                            font-display text-3xl font-semibold
                            tracking-[-0.05em]
                            text-primary
                          "
                        >
                          {group.metric.value}
                        </span>

                        <span
                          className="
                            text-sm
                            text-foreground/65
                            dark:text-slate-300
                          "
                        >
                          {group.metric.label}
                        </span>
                      </div>

                      <footer
                        className="
                          mt-auto
                          border-t border-border/60
                          pt-6 lg:mt-10
                          dark:border-slate-800
                        "
                      >
                        <p
                          className="
                            mb-4
                            text-xs font-mono font-medium
                            uppercase tracking-[0.18em]
                            text-muted-foreground/80
                            dark:text-slate-400
                          "
                        >
                          Core skills
                        </p>

                        <ul
                          className="flex flex-wrap gap-2"
                          aria-label={`${group.title} skills`}
                        >
                          {group.skills.map((skill) => (
                            <li
                              key={skill}
                              className="
                                rounded-xl
                                border border-border/70
                                bg-muted/40
                                px-3.5 py-2
                                text-sm font-mono
                                text-foreground/85
                                transition-[border-color,background-color,color]
                                duration-300
                                dark:border-slate-700
                                dark:bg-slate-800/70
                                dark:text-slate-200
                                group-hover:border-primary/40
                                group-hover:bg-primary/10
                                group-hover:text-foreground
                              "
                            >
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </footer>
                    </div>
                  </div>
                </article>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </section>
  );
}

export default SkillsExpertise;
