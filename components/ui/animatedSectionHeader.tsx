"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionHeaderProps {
  title: string;
  highlight: string;
  shouldReduceMotion?: boolean;
}

export default function AnimatedSectionHeader({
  title,
  highlight,
  shouldReduceMotion = false,
}: AnimatedSectionHeaderProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" }); // detects scroll into view

  return (
    <motion.div
      ref={ref}
      className="text-center mb-20 lg:mb-32"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
        {title}{" "}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {highlight}
        </span>
      </h2>

      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 mx-auto mt-4 rounded-full"
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: 96, opacity: 1 } : {}}
        transition={{
          duration: shouldReduceMotion ? 0.3 : 0.5,
          delay: shouldReduceMotion ? 0 : 0.2,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      />
    </motion.div>
  );
}
