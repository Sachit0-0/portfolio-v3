"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

export default function SocialButtons() {
  const socials = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5 text-white group-hover:text-[#171543] transition-colors duration-300" />,
      color: "bg-purple-500",
      border: "border-purple-500",
      link: "https://github.com/your-username",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5 text-white group-hover:text-[#171543] transition-colors duration-300" />,
      color: "bg-blue-500",
      border: "border-blue-500",
      link: "https://linkedin.com/in/your-profile",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5 text-white group-hover:text-[#171543] transition-colors duration-300" />,
      color: "bg-red-400",
      border: "border-red-400",
      link: "mailto:you@example.com",
    },
  ]

  return (
    <motion.div
      className="flex items-center gap-4 mt-10"
           initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}

    >
      {socials.map(({ name, icon, color, border, link }, index) => (
        <a
          key={index}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="relative w-12 h-12 rounded-full group"
        >
          {/* Floating background circle */}
          <div
            className={`absolute top-0 left-0 w-full h-full ${color} rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl`}
          ></div>

          {/* Icon wrapper with hover light bluish background */}
          <div
            className={`relative z-10 w-full h-full flex items-center justify-center border-2 ${border} rounded-full bg-transparent group-hover:bg-[#e6f0ff] transition-colors duration-300`}
          >
            {icon}
          </div>
        </a>
      ))}
    </motion.div>
  )
}
