"use client";

import { HeroSection } from "@/components/hero-section";
import { SkillsExpertise } from "@/components/skills-expertise";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { ScrollToTop } from "@/components/scroll-to-top";
import Experience from "@/components/experience";
import Contact from "@/components/contact";
import { FloatingNavbar } from "@/components/floating-navbar";

export default function Portfolio() {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <FloatingNavbar />
        <HeroSection />
        <SkillsExpertise />
        <ProjectsShowcase />
        <Experience />
        <Contact />

        <footer className="py-12 border-t border-border/40">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground tracking-wide">
              &copy; {new Date().getFullYear()} Sachit Dahal
            </p>
            <p className="text-sm text-muted-foreground">
              Kathmandu, Nepal
            </p>
          </div>
        </footer>

        <ScrollToTop />
      </div>
    </>
  );
}
