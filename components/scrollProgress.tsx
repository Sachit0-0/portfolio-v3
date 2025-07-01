"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import Image from "next/image"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  // Smoother, lighter animation springs
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.005,
  })

  const leftSpring = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.005,
  })

  const leftPosition = useTransform(leftSpring, v => `calc(${v * 100}% )`)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      {/* Background Water Progress Bar */}
      <div className="relative h-2 bg-gradient-to-r from-blue-100/30 via-blue-200/20 to-blue-100/30 dark:from-blue-900/20 dark:via-blue-800/20 dark:to-blue-900/20 backdrop-blur-sm overflow-hidden">
        
        {/* Foreground Water Progress Bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400/70 via-cyan-500/60 to-blue-500/70 origin-left relative overflow-hidden"
          style={{ scaleX }}
        >
          {/* Water Ripple Animation */}
          <motion.div
            className="absolute top-0 w-full h-full will-change-transform"
            style={{
              background:
                "repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.07) 2px, transparent 4px)",
            }}
            animate={{
              x: ["0%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>

      {/* Boat */}
      <motion.div
        className="absolute bottom-1 w-8 h-8 md:w-10 md:h-10 transform -translate-x-1/2 will-change-transform"
        style={{ left: leftPosition }}
      >
        {/* Boat wake */}
        <motion.div
          className="absolute -left-4 top-1/2 w-6 h-1 bg-gradient-to-r from-cyan-400/40 to-transparent rounded-full blur-sm"
          animate={{
            scaleX: [0.7, 1, 0.7],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

     
        <motion.div
          className="relative w-full h-full"
          animate={{
            y: [0, 0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/boat.png"
            alt="Boat progress indicator"
            width={40}
            height={40}

          />
        </motion.div>
      </motion.div>
    </div>
  )
}
