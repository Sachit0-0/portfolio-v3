"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-10 h-10">
        <div className="w-5 h-5" />
      </Button>
    )
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-muted/80 transition-all duration-300"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={resolvedTheme}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.div>
      </AnimatePresence>
    </Button>
  )
}
