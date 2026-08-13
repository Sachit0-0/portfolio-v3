// components/hero-section.tsx

"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Terminal,
  Code,
  Database,
  Server,
  Zap,
  Sparkles,
} from "lucide-react";
import { useRef } from "react";
import Image from "next/image";
import sachit from "@/public/sachitt.jpg";
import SocialButtons from "./ui/socialButtons";
import CvButton from "./ui/cvButton";
import { TypingAnimation } from "./magicui/typing-animation";
import { AwwwardsText } from "./ui/awwwards-text";
import { ScrollRevealText, ScrollRevealLine, ScrollFadeIn } from "./ui/scroll-reveal";

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // ── Mouse Parallax Motion ──
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const card1ParallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const card1ParallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig);

  const card2ParallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), springConfig);
  const card2ParallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig);

  const card3ParallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), springConfig);
  const card3ParallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-25, 25]), springConfig);

  // ── Scroll-based differential card speeds ──
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Each card moves at a different scroll speed for depth
  const card1ScrollY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const card2ScrollY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const card3ScrollY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section ref={ref} id="home" className="overflow-hidden">
      {/* Main Content Container */}
      <div className="container mx-auto px-4 min-h-screen flex items-center py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full pt-20 lg:pt-0">
          {/* Left Side - Main Content */}
          <motion.div className="space-y-6 lg:space-y-8">
            {/* Greeting Pill Card */}
            <motion.div
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card/90 border border-border/80 shadow-lg backdrop-blur-md text-foreground/90 font-mono text-xs sm:text-sm tracking-wider uppercase group hover:border-primary/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-muted-foreground group-hover:text-foreground transition-colors">Hello, I'm</span>
              <span className="text-border/80">|</span>

            </motion.div>

            {/* Name */}
            <motion.h1
              className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[6.5rem] font-bold leading-[1.05] tracking-tight text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AwwwardsText text="Sachit Dahal" />
            </motion.h1>

            {/* Title — scroll reveal */}
            <ScrollRevealLine delay={0.3}>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary tracking-tight">
                Software Developer
              </div>
            </ScrollRevealLine>

            {/* Description — word-by-word scroll reveal */}
            <ScrollRevealText
              text="Building scalable, responsive web applications and published Framer plugins with React, Next.js, and Django. Turning complex software engineering into fast, studio-grade web experiences."
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-sans"
              delay={0.35}
              stagger={0.02}
            />



            {/* Social Links */}
            <ScrollFadeIn delay={0.6}>
              <SocialButtons />
            </ScrollFadeIn>
          </motion.div>

          {/* Right Side - Floating Interactive 3D Stage */}
          <div
            className="relative mt-10 lg:mt-0 perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1200 }}
          >
            {/* Mobile Stack */}
            <div className="flex flex-col items-center gap-4 lg:hidden max-w-lg mx-auto">
              <motion.div
                className="w-full max-w-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="bg-card/90 border border-border/80 shadow-xl backdrop-blur-md">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground ml-1">
                        status.sh
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <div className="font-mono text-sm">
                        <div className="text-emerald-500 font-medium">Building &amp; Shipping...</div>
                        <div className="text-muted-foreground mt-0.5 text-xs">
                          Kathmandu, Nepal
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                className="w-full max-w-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Card className="bg-card/90 border border-border/80 shadow-xl backdrop-blur-md">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border/40">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-primary" />
                        <span className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider">
                          Technical Stack
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">
                        Core
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {["React", "Next.js", "TypeScript", "Tailwind", "Django", "Sanity"].map((tech) => (
                        <div key={tech} className="text-center p-1.5 rounded-lg bg-muted/30 border border-border/30 text-[11px] font-mono text-foreground/80 font-medium">
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
              className="hidden lg:block relative h-[600px] xl:h-[650px] w-full"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Card 1: Terminal Status — Slow scroll speed */}
              <motion.div
                className="absolute top-14 left-12 z-20"
                style={{
                  x: card1ParallaxX,
                  y: card1ScrollY,
                  translateZ: 35,
                }}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="w-72 bg-card/95 border border-border/80 shadow-2xl backdrop-blur-xl rounded-2xl hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground ml-1">
                        status.sh
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Terminal className="w-5 h-5" />
                      </div>
                      <div className="font-mono text-sm">
                        <div className="text-emerald-500 font-medium flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          System Online
                        </div>
                        <div className="text-muted-foreground mt-0.5">
                          <TypingAnimation duration={90} className="text-xs">
                            Probably working right now...
                          </TypingAnimation>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 2: Profile Card — Fastest scroll speed (foreground feel) */}
              <motion.div
                className="absolute top-[16%] right-0 z-30"
                style={{
                  x: card2ParallaxX,
                  y: card2ScrollY,
                  translateZ: 85,
                }}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Card className="w-80 bg-card/95 border border-border/90 shadow-2xl backdrop-blur-2xl rounded-2xl hover:border-primary/60 transition-all duration-300 overflow-hidden group">
                  <div className="absolute top-0 inset-x-0 h-1 " />
                  <CardContent className="p-6 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4 rounded-full p-1 bg-gradient-to-br from-primary via-border to-primary/40 shadow-xl group-hover:scale-105 transition-transform duration-300">
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
                      <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background shadow-md" />
                    </div>

                    <h3 className="text-xl font-bold mb-0.5 tracking-tight text-foreground">Sachit Dahal</h3>
                    <p className="text-primary text-xs font-mono font-semibold mb-3 tracking-wider">SOFTWARE DEVELOPER</p>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full bg-muted/60 border border-border/40 text-xs font-mono text-muted-foreground">
                      <Server className="w-3 h-3 text-primary" />
                      <span>Kathmandu, Nepal</span>
                    </div>

                    <div className="flex justify-center space-x-3 pt-1 border-t border-border/40">
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
                          className="w-9 h-9 rounded-xl bg-muted/60 border border-border/40 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-sm"
                        >
                          <social.icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Card 3: Technical Stack — Original colored-dot grid (reverted) — Slowest scroll */}
              <motion.div
                className="absolute bottom-4 left-6 z-20"
                style={{
                  x: card3ParallaxX,
                  y: card3ScrollY,
                  translateZ: 30,
                }}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Card className="w-80 bg-card/90 border border-border/80 shadow-2xl backdrop-blur-xl rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-5 space-y-3.5">
                    <div className="flex items-center justify-between pb-2.5 border-b border-border/40">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                          <Code className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-xs font-semibold tracking-wider text-foreground uppercase">
                          Technical Stack
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-medium text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
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
                        { name: "Sanity CMS", type: "Content", dot: "bg-rose-500" },
                      ].map((item) => (
                        <div
                          key={item.name}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-muted/40 border border-border/40 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
                        >
                          <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-semibold text-foreground truncate">
                              {item.name}
                            </span>
                            <span className="text-[9px] font-mono text-muted-foreground truncate">
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
