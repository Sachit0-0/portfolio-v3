"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const atBottom = scrollY + windowHeight >= docHeight - 40 // 40px threshold

      setIsVisible(scrollY > 300 && !atBottom)
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3,
          }}
          className="fixed bottom-8 right-8 z-[9999]"
        >
          {/* Ripple Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 pointer-events-none"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <Button
            onClick={scrollToTop}
            size="icon"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group relative"
          >
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <ArrowUp className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
            </motion.div>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
