"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Code, Users } from "lucide-react";
import MagicCard from "./ui/magiccard";
import { IconCloud } from "./magicui/icon-cloud";

const slugs = [
  "typescript",
  "javascript",
  "django",
  "react",
  "android",
  "html5",
  "css3",
  "express",
  "nextjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",

  "vercel",

  "jest",

  "docker",
  "git",

  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "figma",
];
const AnimatedCounter = ({
  end,
  duration = 2000,
}: {
  end: number;
  duration?: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * end);

      if (ref.current) {
        ref.current.textContent = currentCount.toString();
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="will-change-contents">
      0
    </span>
  );
};



export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center justify-center">
              <IconCloud
                images={images}
             
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-8"
          >
            {/* Description */}
            <div className="space-y-6">
              <motion.p
                className="text-lg  leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                I'm a passionate full-stack web developer with 2+ years of
                experience building scalable, responsive, and user-friendly web
                applications. I specialize in React, Next.js, Django, and modern
                UI/UX principles.
              </motion.p>

              <motion.p
                className="text-lg  leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Based in Kathmandu, Nepal, I have a proven track record of
                delivering high-quality code and collaborating effectively with
                cross-functional teams. I'm passionate about creating innovative
                solutions that make a real impact.
              </motion.p>
            </div>

         
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="p-6 rounded-lg bg-muted/30 border border-border/50"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 mt-1">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Collaboration & Impact
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I thrive in collaborative environments and believe in
                    writing clean, maintainable code that scales. My focus is on
                    creating solutions that not only work well but also provide
                    exceptional user experiences.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
