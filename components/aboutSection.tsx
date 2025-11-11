"use client";

import { motion, useInView } from "framer-motion";
import { Sparkles, Users } from "lucide-react";
import { useRef } from "react";
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
  "tailwindcss",
  "sass",
  "python",
  "graphql",
  "nodejs",
  "linux",
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


export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4" ref={containerRef}>
               <motion.div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">About Me</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-500">Crafting Digital Experiences</h2>
            </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="">
              <IconCloud images={images} />
            </div>
          </motion.div>
  <motion.div  className="space-y-8 order-1 lg:order-2">
            {/* Header */}
     
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
              className="text-base md:text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              I'm a full-stack developer with a strong focus on frontend technologies — passionate about crafting
              smooth, responsive interfaces and exceptional user experiences. With 2+ years of experience working with
              React, Next.js, and Django, I enjoy taking projects from idea to execution with a keen eye for detail and
              clean, maintainable code.
            </motion.p>
            </div>

        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="group p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-primary/15 group-hover:bg-primary/20 transition-colors duration-300 mt-0.5">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2 text-base">Clean Code, Thoughtful Design</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Based in Kathmandu, Nepal, I care deeply about performance, simplicity, and building products that
                    look great and work even better.
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
