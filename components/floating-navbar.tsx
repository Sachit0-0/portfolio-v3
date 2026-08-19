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
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const show =
            currentScrollY < lastScrollY.current || currentScrollY < 100;
          if (show !== isVisible) setIsVisible(show);
          lastScrollY.current = currentScrollY;

          const sections = navItems.map((item) => item.link.substring(1));
          const currentSection = sections.find((section) => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 120 && rect.bottom >= 120;
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
  }, [activeSection, isVisible]);

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId.substring(1));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 flex justify-center pointer-events-none"
        >
          <nav className="pointer-events-auto relative ios-glass rounded-full shadow-xl max-w-fit flex items-center p-1.5 2xl:p-2 transition-all duration-300">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 px-3 py-1 2xl:px-4 2xl:py-1.5">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.link)}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-medium transition-colors rounded-full whitespace-nowrap",
                    activeSection === item.link.substring(1)
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {activeSection === item.link.substring(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full"
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

              {/* Desktop Theme Toggle Divider */}
              <div className="ml-2 pl-2 border-l border-border/60">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Navigation Trigger */}
            <div className="md:hidden flex items-center px-2 py-1">
              <MobileMenu
                activeSection={activeSection}
                onSectionClick={scrollToSection}
              />
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
