"use client";

import { Github, Linkedin, Mail, Download } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  {
    name: "GitHub",
    icon: Github,
    link: "https://github.com/Sachit0-0",
    external: true,
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    link: "https://www.linkedin.com/in/sachit-dahal-59a05b212/",
    external: true,
  },
  {
    name: "Email",
    icon: Mail,
    link: "mailto:sachitdahal33@gmail.com",
    external: false,
  },
];

export default function SocialButtons() {
  return (
    <div className="flex flex-wrap items-center gap-2.5 pt-2">
      {socials.map((social) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.name}
            href={social.link}
            target={social.external ? "_blank" : undefined}
            rel={social.external ? "noopener noreferrer" : undefined}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full ios-glass border border-border/80 hover:border-primary/50 text-xs sm:text-sm font-mono text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors duration-200 shadow-sm select-none"
          >
            <Icon className="w-4 h-4 text-primary" />
            <span>{social.name}</span>
          </motion.a>
        );
      })}

      <motion.a
        href="/SachitDahalCV.pdf"
        download
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.96 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs sm:text-sm font-mono font-medium transition-colors duration-200 shadow-sm select-none"
      >
        <Download className="w-4 h-4" />
        <span>Resume</span>
      </motion.a>
    </div>
  );
}