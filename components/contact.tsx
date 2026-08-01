"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { Sparkles, Mail, Phone, MapPin, Send } from "lucide-react";

/* ── Section header with split-text animation ────────────────────── */
function SectionHeader({ title }: { title: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  const words = title.split(" ");

  return (
    <div ref={ref} className="mb-16 md:mb-24">
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary font-mono mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Contact</span>
      </div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05]">
        {words.map((word, i) => (
          <span key={i} className="inline-block mr-[0.25em] overflow-hidden align-top">
            <motion.span
              className="inline-block"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "110%" }}
              animate={isInView ? { opacity: 1, y: "0%" } : {}}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 0.7,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay: number) =>
    shouldReduceMotion
      ? ({
          initial: { opacity: 0 },
          animate: isInView ? { opacity: 1 } : {},
          transition: { duration: 0.3 },
        } as const)
      : ({
          initial: { opacity: 0, y: 24 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: {
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        } as const);

  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 overflow-x-hidden"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader title="Get in Touch" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Contact info */}
          <motion.div className="space-y-8" {...fadeUp(0.1)}>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Based in Kathmandu, Nepal. Focused on clean architecture, reusable
              components, and end-to-end delivery — from first line of code to
              production deploy.
            </p>

            <div className="space-y-5 text-sm">
              <div>
                <p className="text-muted-foreground/60 text-xs uppercase tracking-[0.15em] mb-1">
                  Email
                </p>
                <a
                  href="mailto:sachitdahal33@gmail.com"
                  className="text-foreground hover:text-primary transition-colors duration-300"
                >
                  sachitdahal33@gmail.com
                </a>
              </div>
              <div>
                <p className="text-muted-foreground/60 text-xs uppercase tracking-[0.15em] mb-1">
                  Phone
                </p>
                <p className="text-foreground">+977 9803033781</p>
              </div>
              <div>
                <p className="text-muted-foreground/60 text-xs uppercase tracking-[0.15em] mb-1">
                  Location
                </p>
                <p className="text-foreground">Pasikot, Kathmandu, Nepal</p>
              </div>
            </div>

            {/* Social links — text, not icons */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-sm text-muted-foreground">
              <a
                href="https://github.com/Sachit0-0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sachit-dahal-59a05b212/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a
                href="mailto:sachitdahal33@gmail.com"
                className="hover:text-foreground transition-colors duration-300"
              >
                Email
              </a>
            </div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div {...fadeUp(0.25)}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 mb-2 block"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-border/60 focus:border-primary pb-3 pt-1 text-foreground placeholder:text-muted-foreground/30 outline-none transition-colors duration-300 text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 mb-2 block"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-border/60 focus:border-primary pb-3 pt-1 text-foreground placeholder:text-muted-foreground/30 outline-none transition-colors duration-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 mb-2 block"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  placeholder="Project discussion"
                  className="w-full bg-transparent border-b border-border/60 focus:border-primary pb-3 pt-1 text-foreground placeholder:text-muted-foreground/30 outline-none transition-colors duration-300 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 mb-2 block"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="w-full bg-transparent border-b border-border/60 focus:border-primary pb-3 pt-1 text-foreground placeholder:text-muted-foreground/30 outline-none transition-colors duration-300 resize-none text-sm"
                />
              </div>

              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-sm flex items-center gap-2 hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer mt-4"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
