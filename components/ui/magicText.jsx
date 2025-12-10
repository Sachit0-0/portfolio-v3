"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.scss";

export default function MagicText() {
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isHoveringContainer, setIsHoveringContainer] = useState(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const zeroSize = 0;
  const smallSize = 40;
  const hoverSize = 320;

  let size = zeroSize;

  if (isHoveringText) {
    size = hoverSize;
  } else if (isHoveringContainer) {
    size = smallSize;
  }

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <main
      className={`${styles.main} text-muted-foreground`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHoveringContainer(true)}
      onMouseLeave={() => setIsHoveringContainer(false)}
    >
      {/* MASK REVEAL LAYER */}
      <motion.div
        className={styles.mask}
        initial={{
          WebkitMaskSize: `${zeroSize}px`,
          maskSize: `${zeroSize}px`,
        }}
        animate={{
          WebkitMaskPosition: `${mousePos.x - size / 2}px ${
            mousePos.y - size / 2
          }px`,
          maskPosition: `${mousePos.x - size / 2}px ${mousePos.y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
          maskSize: `${size}px`,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className={styles.content}>
          <p
            onMouseEnter={() => setIsHoveringText(true)}
            onMouseLeave={() => setIsHoveringText(false)}
          >
            I'm a{" "}
            <strong>developer who loves the simple joy of creating</strong>. I
            build clean, easy-to-use web projects that help people in their
            everyday tasks.
          </p>
        </div>
      </motion.div>

      {/* BASE TEXT */}
      <div className={styles.body}>
        <div className={styles.content}>
          <p
            onMouseEnter={() => setIsHoveringText(true)}
            onMouseLeave={() => setIsHoveringText(false)}
          >
            Based in <span className={styles.location}>Kathmandu, Nepal</span>.
            My goal is to deliver projects that I can be proud of, and that
            genuinely solve a problem for users.
          </p>
        </div>
      </div>
    </main>
  );
}
