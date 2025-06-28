"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { MobileMenu } from "./mobile-menu"

const navItems = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Tech", link: "#technologies" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
]

export function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState("home")
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.link.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId.substring(1))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-fit px-4"
        >
          <nav className="relative bg-background/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center space-x-1 px-6 py-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.link)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-full whitespace-nowrap",
                    activeSection === item.link.substring(1)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {activeSection === item.link.substring(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              ))}

              {/* Desktop Theme Toggle */}
              <div className="ml-2 pl-2 border-l border-border/50">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
              </div>
       
              <div className="flex-1 flex justify-end">
                <MobileMenu activeSection={activeSection} onSectionClick={scrollToSection} />
              </div>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
