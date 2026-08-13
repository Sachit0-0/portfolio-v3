"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────
   ScrollRevealText  —  Awwwards-style word-by-word scroll reveal
   Each word clips up from below its inline container as it enters
   the viewport, producing the editorial "curtain rise" effect
   common on high-end portfolio sites.
   ────────────────────────────────────────────────────────────────── */
interface ScrollRevealTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  /** Extra delay before first word starts (seconds) */
  delay?: number;
  /** Per-word stagger gap (seconds) */
  stagger?: number;
  /** IntersectionObserver margin */
  margin?: string;
  /** Whether the words should animate up or fade in */
  variant?: "slide-up" | "fade" | "blur";
}

export function ScrollRevealText({
  text,
  className = "",
  as: Component = "p",
  delay = 0,
  stagger = 0.035,
  margin = "-60px",
  variant = "slide-up",
}: ScrollRevealTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin });
  const shouldReduceMotion = useReducedMotion();

  const words = text.split(" ");

  const getInitial = () => {
    if (shouldReduceMotion) return { opacity: 0 };
    switch (variant) {
      case "blur":
        return { opacity: 0, y: "40%", filter: "blur(8px)" };
      case "fade":
        return { opacity: 0 };
      case "slide-up":
      default:
        return { opacity: 0, y: "100%" };
    }
  };

  const getAnimate = () => {
    if (shouldReduceMotion) return { opacity: 1 };
    switch (variant) {
      case "blur":
        return { opacity: 1, y: "0%", filter: "blur(0px)" };
      case "fade":
        return { opacity: 1 };
      case "slide-up":
      default:
        return { opacity: 1, y: "0%" };
    }
  };

  return (
    <Component ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top mr-[0.25em] pb-0.5"
        >
          <motion.span
            className="inline-block"
            initial={getInitial()}
            animate={isInView ? getAnimate() : {}}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.6,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}

/* ──────────────────────────────────────────────────────────────────
   ScrollRevealLine  —  Single-line clip-up reveal
   Great for one-liners, taglines, and short labels
   ────────────────────────────────────────────────────────────────── */
interface ScrollRevealLineProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  margin?: string;
}

export function ScrollRevealLine({
  children,
  className = "",
  delay = 0,
  margin = "-60px",
}: ScrollRevealLineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "100%" }}
        animate={isInView ? { opacity: 1, y: "0%" } : {}}
        transition={{
          duration: shouldReduceMotion ? 0.2 : 0.7,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   ScrollFadeIn  —  Generic fade-in-up container
   ────────────────────────────────────────────────────────────────── */
interface ScrollFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  margin?: string;
  y?: number;
}

export function ScrollFadeIn({
  children,
  className = "",
  delay = 0,
  margin = "-60px",
  y = 30,
}: ScrollFadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
