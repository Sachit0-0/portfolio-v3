"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import CvButton from "./cvButton";

const socials = [
  {
    name: "GitHub",
    icon: Github,
    link: "https://github.com/Sachit0-0",
    label: "github.com/Sachit0-0",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    link: "https://www.linkedin.com/in/sachit-dahal-59a05b212/",
    label: "in/sachit-dahal",
  },
  {
    name: "Email",
    icon: Mail,
    link: "mailto:sachitdahal33@gmail.com",
    label: "sachitdahal33@gmail.com",
  },
];

export default function SocialButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-2">
      {/* Social Icons Group with Apple Glass Pill & Spring Press */}
      <div className="flex items-center gap-2.5">
        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="relative group w-10 h-10 sm:w-11 sm:h-11 rounded-full ios-glass border border-border/80 flex items-center justify-center text-foreground/80 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-colors duration-200 shadow-sm cursor-pointer"
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-105" />

              {/* Minimal tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-foreground text-background text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
                {social.name}
              </span>
            </motion.a>
          );
        })}
      </div>

      {/* CV Download Button */}
      <div className="shrink-0 ml-1">
        <CvButton />
      </div>
    </div>
  );
}