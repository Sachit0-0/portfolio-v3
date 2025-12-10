"use client";

import { HeroSection } from "@/components/hero-section";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SkillsExpertise } from "@/components/skills-expertise";

import Experience from "@/components/experience";
import { ScrollProgress } from "@/components/scrollProgress";
import Contact from "@/components/contact";

import MagicText from "@/components/ui/magicText";
import { FloatingNavbar } from "@/components/floating-navbar";

export default function Portfolio() {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300 text-base sm:text-lg md:text-xl">
        <FloatingNavbar />
        <HeroSection />
        <div
          className="
  hidden lg:block
  mt-20
  lg:-mt-20      
  xl:-mt-40      
  2xl:-mt-40     
"
        >
          <MagicText />
        </div>

        <SkillsExpertise />

        <ProjectsShowcase />
        <Experience />

        <Contact />

        <footer className="py-8 border-t">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm sm:text-base text-muted-foreground">
              © {new Date().getFullYear()} Sachit Dahal. Crafted with passion
              and code.
            </p>
          </div>
        </footer>

        <ScrollToTop />
        <ScrollProgress />
      </div>
    </>
  );
}
