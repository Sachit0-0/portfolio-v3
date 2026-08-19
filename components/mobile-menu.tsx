"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { createPortal } from "react-dom";

const navItems = [
  { name: "Home", link: "#home" },
  { name: "Skills", link: "#skills" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

interface MobileMenuProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

export function MobileMenu({ activeSection, onSectionClick }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSectionClick = (link: string) => {
    setIsOpen(false);
    setTimeout(() => {
      onSectionClick(link);
    }, 250);
  };

  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[9999] md:hidden flex flex-col justify-between p-6 sm:p-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header row in mobile overlay */}
          <div className="flex items-center justify-between w-full pt-2">
            <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              Navigation
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="w-10 h-10 rounded-full border border-border/60 bg-muted/30"
            >
              <X className="h-5 w-5 text-foreground" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center justify-center gap-7 my-auto">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleSectionClick(item.link)}
                className={cn(
                  "font-display text-4xl sm:text-5xl tracking-tight text-foreground/75 hover:text-primary transition-colors duration-200",
                  activeSection === item.link.substring(1)
                    ? "text-primary font-bold"
                    : ""
                )}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* Footer of Mobile Overlay */}
          <div className="flex items-center justify-between border-t border-border/40 pt-4">
            <span className="text-xs font-mono text-muted-foreground">
              Sachit Dahal
            </span>
            <ThemeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen(!isOpen)}
          className="w-9 h-9 rounded-full border border-border/50 bg-background/60"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? (
                <X className="w-4 h-4 text-foreground" />
              ) : (
                <Menu className="w-4 h-4 text-foreground" />
              )}
            </motion.div>
          </AnimatePresence>
        </Button>
      </div>

      {mounted && createPortal(menuContent, document.body)}
    </div>
  );
}
