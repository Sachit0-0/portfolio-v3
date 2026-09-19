"use client";

import React, { useRef, type ReactElement } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticProps {
  children: ReactElement;
  distance?: number;
  strength?: number;
}

export function Magnetic({
  children,
  distance = 50,
  strength = 0.3,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;

    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    const dist = Math.hypot(middleX, middleY);

    if (dist < distance) {
      x.set(middleX * strength);
      y.set(middleY * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
