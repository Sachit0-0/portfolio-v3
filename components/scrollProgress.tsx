"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import Image from "next/image"
const boat = "/boat.avif";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  // Single spring — shared for both bar and boat position
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.005,
  })

  const leftPosition = useTransform(smoothProgress, v => `calc(${v * 100}%)`)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      {/* Background Water Progress Bar */}
      <div className="relative h-2 bg-gradient-to-r from-blue-100/30 via-blue-200/20 to-blue-100/30 dark:from-blue-900/20 dark:via-blue-800/20 dark:to-blue-900/20 backdrop-blur-sm overflow-hidden">
        
        {/* Foreground Water Progress Bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400/70 via-cyan-500/60 to-blue-500/70 origin-left relative overflow-hidden"
          style={{ scaleX: smoothProgress }}
        >
          {/* Water Ripple — CSS animation instead of Framer Motion infinite loop */}
          <div
            className="absolute top-0 w-full h-full"
            style={{
              background:
                "repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.07) 2px, transparent 4px)",
              animation: "ripple 3s linear infinite",
            }}
          />
        </motion.div>
      </div>

      {/* Boat */}
      <motion.div
        className="absolute bottom-1 w-8 h-8 md:w-10 md:h-10 transform -translate-x-1/2"
        style={{ left: leftPosition }}
      >
        {/* Boat wake — CSS animation */}
        <div
          className="absolute -left-4 top-1/2 w-6 h-1 bg-gradient-to-r from-cyan-400/40 to-transparent rounded-full blur-sm"
          style={{ animation: "wake 2.5s linear infinite" }}
        />

        {/* Boat bob — CSS animation */}
        <div
          className="relative w-full h-full"
          style={{ animation: "bob 3s ease-in-out infinite" }}
        >
          <Image
            src={boat}
            width={42}
            height={44}
            quality={70}
            alt="Boat"
            loading="lazy"
          />
        </div>
      </motion.div>

      {/* CSS keyframes for infinite animations — much lighter than Framer Motion */}
      <style jsx>{`
        @keyframes ripple {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        @keyframes wake {
          0%, 100% { transform: scaleX(0.7); opacity: 0.2; }
          50% { transform: scaleX(1); opacity: 0.4; }
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(0.5px); }
        }
      `}</style>
    </div>
  )
}
