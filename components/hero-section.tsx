// components/hero-section.tsx

"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Mail,
  Terminal,
  Code,
  Server,
} from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";
import sachit from "@/public/sachitt.jpg";
import SocialButtons from "./ui/socialButtons";
import { TypingAnimation } from "./magicui/typing-animation";


// ─────────────────────────────────────────────────────────────────────────────
// 🎨 HERO BACKGROUND CONTROLS (Tweak image transparency and darkness here)
// ─────────────────────────────────────────────────────────────────────────────
const HERO_BG_CONFIG = {
  imageUrl: "/a.webp",
  // Wallpaper image opacity: 0.0 (invisible) to 1.0 (fully opaque)
  imageOpacity: 0.30,
  // Dark overlay tint in dark mode: 0.0 (transparent) to 1.0 (pure black)
  darkOverlayOpacity: 0.75,
  // Light overlay tint in light mode: 0.0 (transparent) to 1.0 (solid background)
  lightOverlayOpacity: 0.45,
  // Optional blur on background image ('0px', '2px', '4px', etc.)
  blur: "0px",
};

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tight spring — high damping kills oscillation/jitter, stiffness keeps it responsive
  const springConfig = { damping: 35, stiffness: 200, mass: 0.8 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

  const card1ParallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);
  const card1ParallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), springConfig);

  const card2ParallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [8, -8]), springConfig);
  const card2ParallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);

  const card3ParallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const card3ParallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-8, 8]), springConfig);

  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (rafId.current) return; // skip if a frame is already scheduled
    rafId.current = requestAnimationFrame(() => {
      if (!ref.current) { rafId.current = null; return; }
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
      rafId.current = null;
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section ref={ref} id="home" className="relative overflow-hidden">
      {/* ── Background Image Layer (Isolated Opacity) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          backgroundImage: `url('${HERO_BG_CONFIG.imageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: HERO_BG_CONFIG.imageOpacity,
          filter: HERO_BG_CONFIG.blur !== "0px" ? `blur(${HERO_BG_CONFIG.blur})` : undefined,
        }}
      />

      {/* ── Dark & Light Shading Overlays (Protects Card & Text Visibility) ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 dark:hidden bg-background transition-opacity duration-300"
        style={{ opacity: HERO_BG_CONFIG.lightOverlayOpacity }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden dark:block bg-black transition-opacity duration-300"
        style={{ opacity: HERO_BG_CONFIG.darkOverlayOpacity }}
      />

      {/* ── Bottom Fade into Next Section ── */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* Main Content Container (z-10 keeps cards and typography sharp) */}
      <div className="relative z-10 max-w-7xl 2xl:max-w-[2036px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] mx-auto px-6 md:px-12 2xl:px-16 4xl:px-24 min-h-screen flex items-center py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 2xl:gap-24 items-center w-full pt-20 lg:pt-0">
          {/* Left Side - Main Content */}
          <motion.div className="space-y-6 lg:space-y-8 2xl:space-y-10">
            {/* Status Pill */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest text-primary uppercase mb-4">
              <Terminal className="w-4 h-4" />
              <span>// Available for Projects</span>
            </div>

            {/* Name */}
            <motion.h1
              className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-[6.5rem] 2xl:text-[7.5rem] 3xl:text-[8.5rem] 4xl:text-[9.5rem] font-extrabold leading-[0.98] tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="bg-gradient-to-r from-[#1e2a4a] via-[#2f5fd6] to-[#3b82f6] bg-clip-text text-transparent inline-block transition-transform duration-300 ease-out hover:scale-[1.03] hover:skew-x-1"
                onMouseMove={(e) => {
                  const el = e.currentTarget;
                  const r = el.getBoundingClientRect();
                  const x = ((e.clientX - r.left) / r.width - 0.5) * 20;
                  const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
                  el.style.transform = `translate(${x}px, ${y}px) skewX(${x * 0.1}deg)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translate(0,0) skewX(0deg)";
                }}
              >
                Sachit Dahal
              </span>
            </motion.h1>

            {/* Title */}


            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg lg:text-xl 2xl:text-2xl 3xl:text-3xl text-muted-foreground leading-relaxed max-w-2xl 2xl:max-w-4xl 3xl:max-w-5xl font-sans"
            >
              Full-stack developer working primarily in JavaScript and Python, focused on building fast, scalable web applications.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <SocialButtons />
            </motion.div>
          </motion.div>

          {/* Right Side - Floating Interactive 3D Stage */}
          <div
            className="relative mt-10 lg:mt-0 perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1200 }}
          >
            {/* Mobile & Tablet Overlapping Cards Stage (< lg) */}
            <div className="relative lg:hidden max-w-md sm:max-w-lg mx-auto w-full pt-4 pb-8 px-1 sm:px-4">
              {/* Card 1: Code Card (portfolio.tsx) — Top-Left bias */}
              <motion.div
                className="relative z-10 w-[94%] sm:w-[88%] mr-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 }}
                whileHover={{ scale: 1.02, zIndex: 40 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="ios-glass-card rounded-2xl shadow-xl transition-all duration-300">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/40">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground font-medium">
                        portfolio.tsx
                      </span>
                      <span className="text-xs font-mono text-muted-foreground/60 select-none">
                        &lt;/&gt;
                      </span>
                    </div>

                    <div className="font-mono text-xs sm:text-[13px] leading-relaxed space-y-1 py-0.5">
                      <div>
                        <span className="text-pink-500 dark:text-pink-400 font-medium">const</span>{" "}
                        <span className="text-foreground font-medium">developer</span>{" "}
                        <span className="text-muted-foreground">=</span>{" "}
                        <span className="text-muted-foreground">{"{"}</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-muted-foreground">name:</span>{" "}
                        <span className="text-blue-600 dark:text-blue-400">&quot;Sachit Dahal&quot;</span>
                        <span className="text-muted-foreground">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-muted-foreground">focus:</span>{" "}
                        <span className="text-blue-600 dark:text-blue-400">&quot;building for web&quot;</span>
                        <span className="text-muted-foreground">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-muted-foreground">openToWork:</span>{" "}
                        <span className="text-emerald-500 dark:text-emerald-400 font-medium">true</span>
                        <span className="text-muted-foreground">,</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{"}"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2.5 mt-2.5 border-t border-border/40 font-mono text-xs text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <TypingAnimation duration={90} className="text-xs min-h-[1.25rem] inline-block">
                        Probably working right now...
                      </TypingAnimation>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 2: Profile Card — Overlaps Card 1 with Right bias */}
              <motion.div
                className="relative z-20 w-[94%] sm:w-[88%] ml-auto -mt-6 sm:-mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.02, zIndex: 40 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="ios-glass-card rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-5 text-center">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 rounded-full p-1 bg-gradient-to-br from-primary via-border to-primary/40 shadow-xl">
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
                        <Image
                          src={sachit || "/placeholder.svg"}
                          alt="Sachit Dahal"
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                          priority
                        />
                      </div>
                      <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-background shadow-md" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold mb-0.5 tracking-tight text-foreground">
                      Sachit Dahal
                    </h3>
                    <p className="text-primary text-[11px] sm:text-xs font-mono font-semibold mb-2.5 tracking-wider">
                      SOFTWARE DEVELOPER
                    </p>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-muted/60 border border-border/40 text-xs font-mono text-muted-foreground">
                      <Server className="w-3 h-3 text-primary" />
                      <span>Kathmandu, Nepal</span>
                    </div>

                    <div className="flex justify-center gap-3 pt-2.5 border-t border-border/40">
                      {[
                        {
                          icon: Linkedin,
                          href: "https://www.linkedin.com/in/sachit-dahal-59a05b212/",
                        },
                        { icon: Github, href: "https://github.com/Sachit0-0" },
                        { icon: Mail, href: "mailto:sachitdahal33@gmail.com" },
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-muted/60 border border-border/40 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-90 transition-all duration-200 shadow-sm"
                        >
                          <social.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 3: Technical Stack — Overlaps Card 2 with Left bias */}
              <motion.div
                className="relative z-30 w-[94%] sm:w-[88%] mr-auto -mt-6 sm:-mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.45 }}
                whileHover={{ scale: 1.02, zIndex: 40 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="ios-glass-card rounded-2xl shadow-2xl transition-all duration-300">
                  <CardContent className="p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border/40">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-primary" />
                        <span className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider">
                          Technical Stack
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-medium text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                        Production
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      {["React", "Next.js", "TypeScript", "Tailwind", "Django", "Node JS"].map((tech) => (
                        <div key={tech} className="text-center p-1.5 rounded-lg bg-muted/40 border border-border/30 text-[11px] sm:text-xs font-mono text-foreground/80 font-medium truncate">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Desktop: 3D Tilting Parallax Stage with Differential Scroll Speeds */}
            <motion.div
              className="hidden lg:block relative h-[600px] xl:h-[650px] 2xl:h-[720px] 3xl:h-[820px] 4xl:h-[900px] w-full"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Card 1: Terminal Status — Slow scroll speed */}
              <motion.div
                className={`absolute top-6 left-0 xl:top-10 xl:left-4 2xl:top-12 2xl:left-6 ${activeCard === 1 ? "z-50" : activeCard !== null ? "z-10" : "z-20"
                  }`}
                style={{
                  x: card1ParallaxX,
                  y: card1ParallaxY,
                }}
                onMouseEnter={() => setActiveCard(1)}
                onMouseLeave={() => setActiveCard(null)}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={
                  isInView
                    ? {
                      opacity: 1,
                      scale: activeCard === 1 ? 1.02 : activeCard !== null ? 0.995 : 1,
                      translateZ: activeCard === 1 ? 75 : activeCard !== null ? 20 : 30,
                      y: 0,
                    }
                    : {}
                }
                transition={{ type: "spring", stiffness: 240, damping: 26, mass: 0.6 }}
              >
                <Card className={`w-[290px] xl:w-[320px] 2xl:w-[340px] 3xl:w-[380px] hero-glass-card rounded-[1.75rem] transition-shadow duration-300 ${activeCard === 1 ? "is-active shadow-2xl" : ""
                  }`}>
                  <CardContent className="p-4 2xl:p-5">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/40">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground font-medium">
                        portfolio.tsx
                      </span>
                      <span className="text-xs font-mono text-muted-foreground/60 select-none">
                        &lt;/&gt;
                      </span>
                    </div>

                    <div className="font-mono text-xs 2xl:text-[13px] leading-relaxed space-y-1 py-0.5">
                      <div>
                        <span className="text-pink-500 dark:text-pink-400 font-medium">const</span>{" "}
                        <span className="text-foreground font-medium">developer</span>{" "}
                        <span className="text-muted-foreground">=</span>{" "}
                        <span className="text-muted-foreground">{"{"}</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-muted-foreground">name:</span>{" "}
                        <span className="text-blue-600 dark:text-blue-400">&quot;Sachit Dahal&quot;</span>
                        <span className="text-muted-foreground">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-muted-foreground">focus:</span>{" "}
                        <span className="text-blue-600 dark:text-blue-400">&quot;building for web&quot;</span>
                        <span className="text-muted-foreground">,</span>
                      </div>
                      <div className="pl-4">
                        <span className="text-muted-foreground">openToWork:</span>{" "}
                        <span className="text-emerald-500 dark:text-emerald-400 font-medium">true</span>
                        <span className="text-muted-foreground">,</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{"}"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2.5 mt-2 border-t border-border/40 font-mono text-xs text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <TypingAnimation duration={90} className="text-xs min-h-[1.25rem] inline-block">
                        Probably working right now...
                      </TypingAnimation>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 2: Profile Card — Fastest scroll speed (foreground feel) */}
              <motion.div
                className={`absolute top-[13%] xl:top-[14%] 2xl:top-[15%] left-[270px] xl:left-[315px] 2xl:left-[342px] 3xl:left-[382px] ${activeCard === 2 ? "z-50" : activeCard !== null ? "z-10" : "z-30"
                  }`}
                style={{
                  x: card2ParallaxX,
                  y: card2ParallaxY,
                }}
                onMouseEnter={() => setActiveCard(2)}
                onMouseLeave={() => setActiveCard(null)}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={
                  isInView
                    ? {
                      opacity: 1,
                      scale: activeCard === 2 ? 1.02 : activeCard !== null ? 0.995 : 1,
                      translateZ: activeCard === 2 ? 75 : activeCard !== null ? 20 : 45,
                      y: 0,
                    }
                    : {}
                }
                transition={{ type: "spring", stiffness: 240, damping: 26, mass: 0.6 }}
              >
                <Card className={`w-[285px] xl:w-[320px] 2xl:w-[335px] 3xl:w-[365px] hero-glass-card rounded-[1.75rem] overflow-hidden group transition-shadow duration-300 ${activeCard === 2 ? "is-active shadow-2xl" : ""
                  }`}>
                  <CardContent className="p-6 text-center">
                    <div className="relative w-24 h-24 2xl:w-28 2xl:h-28 mx-auto mb-4 rounded-full p-1 bg-gradient-to-br from-primary via-border to-primary/40 shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
                        <Image
                          src={sachit || "/placeholder.svg"}
                          alt="Sachit Dahal"
                          width={112}
                          height={112}
                          className="w-full h-full object-cover"
                          priority
                        />
                      </div>
                      <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background shadow-md" />
                    </div>

                    <h3 className="text-xl 2xl:text-2xl font-bold mb-1 tracking-tight text-foreground">
                      Sachit Dahal
                    </h3>
                    <p className="text-primary text-xs 2xl:text-sm font-mono font-semibold mb-4 tracking-wider">
                      SOFTWARE DEVELOPER
                    </p>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-muted/60 border border-border/40 text-xs 2xl:text-sm font-mono text-muted-foreground">
                      <Server className="w-3.5 h-3.5 text-primary" />
                      <span>Kathmandu, Nepal</span>
                    </div>

                    <div className="flex justify-center gap-3 pt-3 border-t border-border/40">
                      {[
                        {
                          icon: Linkedin,
                          href: "https://www.linkedin.com/in/sachit-dahal-59a05b212/",
                        },
                        { icon: Github, href: "https://github.com/Sachit0-0" },
                        { icon: Mail, href: "mailto:sachitdahal33@gmail.com" },
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 2xl:w-10 2xl:h-10 rounded-xl bg-muted/60 border border-border/40 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary active:scale-90 transition-all duration-200 shadow-sm"
                        >
                          <social.icon className="w-4 h-4 2xl:w-5 2xl:h-5" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 3: Technical Stack — Slowest scroll */}
              <motion.div
                className={`absolute bottom-2 left-0 xl:bottom-4 xl:left-4 2xl:bottom-6 2xl:left-6 ${activeCard === 3 ? "z-50" : activeCard !== null ? "z-10" : "z-20"
                  }`}
                style={{
                  x: card3ParallaxX,
                  y: card3ParallaxY,
                }}
                onMouseEnter={() => setActiveCard(3)}
                onMouseLeave={() => setActiveCard(null)}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={
                  isInView
                    ? {
                      opacity: 1,
                      scale: activeCard === 3 ? 1.02 : activeCard !== null ? 0.995 : 1,
                      translateZ: activeCard === 3 ? 75 : activeCard !== null ? 20 : 30,
                      y: 0,
                    }
                    : {}
                }
                transition={{ type: "spring", stiffness: 240, damping: 26, mass: 0.6 }}
              >
                <Card className={`w-[290px] xl:w-[320px] 2xl:w-[340px] 3xl:w-[380px] hero-glass-card rounded-[1.75rem] overflow-hidden transition-shadow duration-300 ${activeCard === 3 ? "is-active shadow-2xl" : ""
                  }`}>
                  <CardContent className="p-5 2xl:p-6 space-y-3.5">
                    <div className="flex items-center justify-between pb-2.5 border-b border-border/40">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <Code className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-xs 2xl:text-sm font-semibold tracking-wider text-foreground uppercase">
                          Technical Stack
                        </span>
                      </div>
                      <span className="text-[10px] 2xl:text-xs font-mono font-medium text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                        Production
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      {[
                        { name: "React", type: "Frontend", dot: "bg-cyan-400" },
                        { name: "Next.js", type: "Framework", dot: "bg-foreground" },
                        { name: "TypeScript", type: "Language", dot: "bg-blue-500" },
                        { name: "Tailwind", type: "Styling", dot: "bg-teal-400" },
                        { name: "Django", type: "Backend", dot: "bg-emerald-600" },
                        { name: "Node JS", type: "Backend", dot: "bg-rose-500" },
                      ].map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-muted/40 border border-border/40 hover:bg-primary/10 hover:border-primary/30 active:scale-95 transition-all duration-200 cursor-default"
                        >
                          <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs 2xl:text-sm font-semibold text-foreground truncate">
                              {item.name}
                            </span>
                            <span className="text-[9px] 2xl:text-xs font-mono text-muted-foreground truncate">
                              {item.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}