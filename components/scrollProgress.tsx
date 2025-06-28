"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useEffect, useState } from "react"
import boat from "@/public/boat.png" // Your boat PNG image

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [mounted, setMounted] = useState(false)
  const leftSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const leftPosition = useTransform(leftSpring, [0, 1], ["4%", "96%"])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      {/* Water Wave Progress Bar Background */}
      <div className="relative h-3 bg-gradient-to-r from-blue-100/40 via-blue-200/40 to-blue-100/40 dark:from-blue-900/40 dark:via-blue-800/40 dark:to-blue-900/40 backdrop-blur-sm overflow-hidden">
        {/* Animated Water Progress Bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-500 origin-left relative overflow-hidden"
          style={{ scaleX }}
        >
      

          {/* Water ripple effect */}
          <motion.div
            className="absolute top-0 w-full h-full"
            style={{
              background:
                "repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.1) 2px, transparent 4px)",
            }}
            animate={{
              x: ["0%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </motion.div>

   
      </div>

      {/* Boat PNG Image that moves with progress */}
      <motion.div
        className="absolute bottom-1 w-10 h-10 md:w-12 md:h-12 transform -translate-x-1/2"
        style={{
          left: leftPosition,
        }}
      >
        {/* Boat container with water effects */}
        <div className="relative">
          {/* Water wake behind the boat */}
          <motion.div
            className="absolute -left-6 top-1/2 w-8 h-1 bg-gradient-to-r from-cyan-400/60 to-transparent rounded-full blur-sm"
            animate={{
              scaleX: [0.5, 1, 0.5],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />


          {/* Boat PNG Image */}
          <motion.img
            src={boat.src}
            alt="Boat progress indicator"
            className="w-full h-full object-contain relative z-10 filter drop-shadow-lg"
            animate={{
              y: [0, 2, 0],
              rotate: [1, 1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />


        </div>
      </motion.div>

  
    </div>
  )
}
