"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu } from "./mobile-menu";

const navItems = [
  { name: "Home", link: "#home" },
  { name: "Skills", link: "#skills" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

export function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    // Scroll logic... (omitted for brevity)
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const show =
            currentScrollY < lastScrollY.current || currentScrollY < 100;
          if (show !== isVisible) setIsVisible(show);
          lastScrollY.current = currentScrollY;

          // Update active section based on scroll position...
          const sections = navItems.map((item) => item.link.substring(1));
          const currentSection = sections.find((section) => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
          });
          if (currentSection && currentSection !== activeSection) {
            setActiveSection(currentSection);
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId.substring(1))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          // ** PURE FLEXBOX FIX: w-full with justify-center to center the <nav> **
          className="fixed top-4 z-50 w-full px-48 flex  justify-end"
        >
          {/* max-w-fit removed from here, as the outer flex container handles the centering and spacing. */}
          <nav className="relative bg-background/80 backdrop-blur-md border border-border/50 rounded-full shadow-lg max-w-fit">
            {/* Desktop Navigation */}
            {/* max-w-fit is kept here to ensure the <nav> pill only takes up the required width */}
            <div className="hidden md:flex items-center justify-center space-x-1 px-6 py-3">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.link)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-full whitespace-nowrap",
                    activeSection === item.link.substring(1)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {activeSection === item.link.substring(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary/10 rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.5,
                      }}
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
              <div className="flex items-center gap-3"></div>
              <div className="flex-1 flex justify-end">
                <MobileMenu
                  activeSection={activeSection}
                  onSectionClick={scrollToSection}
                />
              </div>
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
