"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { SiDjango, SiReactquery, SiGraphql, SiPrisma, SiFramer } from "react-icons/si"

const technologies = [
  {
    name: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    category: "Markup",
    color: "#E34F26",
    glowColor: "227, 79, 38",
  },
  {
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    category: "Styling",
    color: "#1572B6",
    glowColor: "21, 114, 182",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Language",
    color: "#F7DF1E",
    glowColor: "247, 223, 30",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "Language",
    color: "#3178C6",
    glowColor: "49, 120, 198",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "Tools",
    color: "#F05032",
    glowColor: "240, 80, 50",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Frontend",
    color: "#61DAFB",
    glowColor: "97, 218, 251",
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "Framework",
    color: "#000000",
    glowColor: "255, 255, 255",
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    category: "Styling",
    color: "#06B6D4",
    glowColor: "6, 182, 212",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "Language",
    color: "#3776AB",
    glowColor: "39, 174, 96",
  },
  {
    name: "Django",
    icon: SiDjango,
    category: "Backend",
    color: "#092E20",
    glowColor: "39, 174, 96",
  },
  {
    name: "SQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    category: "Database",
    color: "#4479A1",
    glowColor: "68, 121, 161",
  },
  {
    name: "Redux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    category: "State Management",
    color: "#764ABC",
    glowColor: "118, 74, 188",
  },
  {
    name: "React Query",
    icon: SiReactquery,
    category: "Data Fetching",
    color: "#FF4154",
    glowColor: "255, 65, 84",
  },
  {
    name: "GraphQL",
    icon: SiGraphql,
    category: "API",
    color: "#E10098",
    glowColor: "225, 0, 152",
  },
  {
    name: "Prisma",
    icon: SiPrisma,
    category: "ORM",
    color: "#2D3748",
    glowColor: "45, 55, 72",
  },
  {
    name: "Framer Motion",
    icon: SiFramer,
    category: "Animation",
    color: "#0055FF",
    glowColor: "0, 85, 255",
  },
]

interface TechCardProps {
  tech: (typeof technologies)[0]
  index: number
}

function TechCard({ tech, index }: TechCardProps) {
  const { theme } = useTheme()
  const smoothEase = [0.4, 0, 0.2, 1] as const

  const glowVariants = {
    initial: {
      opacity: 0.7,
      scale: 1,
      filter: "blur(15px)",
    },
    hover: {
      opacity: 1,
      scale: 1.15,
      filter: "blur(25px)",
      transition: {
        duration: 0.4,
        ease: smoothEase,
      },
    },
    exit: {
      opacity: 0.7,
      scale: 1,
      filter: "blur(15px)",
      transition: {
        duration: 0.6,
        ease: smoothEase,
      },
    },
  }

  const cardVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.9,
      boxShadow: "none",
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      boxShadow: "none",
      transition: {
        duration: 0.6,
        ease: smoothEase,
      },
    },
    hover: {
      boxShadow: `0 0 40px 0 rgba(${tech.glowColor}, 0.35), 0 0 80px 0 rgba(${tech.glowColor}, 0.18), 0 2px 8px 0 rgba(0,0,0,0.08)`,
      transition: {
        duration: 0.4,
        ease: smoothEase,
      },
    },
    exit: {
      boxShadow: "none",
      scale: 1,
      transition: {
        duration: 0.6,
        ease: smoothEase,
      },
    },
  }

  const baseIconFilter = tech.name === "Next.js" ? (theme === "dark" ? "invert(1) brightness(1.1)" : "none") : "none"

  return (
    <motion.div
      className="relative group"
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileFocus="hover"
      exit="exit"
      variants={cardVariants}
      tabIndex={0}
      style={{ outline: "none" }}
      transition={{ duration: 0.4, delay: index * 0.02 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle at 60% 40%, rgba(${tech.glowColor}, 0.45), transparent 70%)`,
          zIndex: 0,
        }}
        variants={glowVariants}
        initial="initial"
      />

      <motion.div
        className="relative w-20 h-20 sm:w-24 sm:h-24 bg-muted/50 border border-border/50 rounded-xl flex items-center justify-center transition-all duration-400 group-hover:border-border group-hover:bg-muted/80 overflow-hidden"
        style={{
          zIndex: 1,
        }}
      >
        {tech.icon ? (
          <tech.icon
            className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-400 group-hover:scale-110 relative z-10"
            style={{
              color: tech.color,
              filter: `drop-shadow(0 2px 8px rgba(255,255,255,0.7))`,
              boxSizing: "border-box",
            }}
          />
        ) : (
          <motion.img
            src={tech.logo || "/placeholder.svg"}
            alt={tech.name}
            className="w-8 h-8 sm:w-12 sm:h-12 object-contain transition-transform duration-400 group-hover:scale-110 relative z-10"
            style={{
              filter: `${baseIconFilter} drop-shadow(0 2px 8px rgba(255,255,255,0.7))`,
              willChange: "transform, filter",
              boxSizing: "border-box",
            }}
            loading="lazy"
            decoding="async"
          />
        )}

        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, rgba(${tech.glowColor}, 0.08), transparent 60%)`,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ borderColor: `rgba(${tech.glowColor}, 0.4)` }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <motion.div
        className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-20"
        initial={{ y: 10, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
      >
        <div
          className="bg-foreground/95 text-background text-xs px-3 py-2 rounded-lg whitespace-nowrap backdrop-blur-sm border shadow-lg"
          style={{
            borderColor: `rgba(${tech.glowColor}, 0.3)`,
            boxShadow: `0 4px 20px rgba(${tech.glowColor}, 0.2), 0 0 0 1px rgba(${tech.glowColor}, 0.1)`,
          }}
        >
          <div className="font-medium">{tech.name}</div>
          <div className="text-xs opacity-70">{tech.category}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function TechShowcase() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="technologies" className="relative py-12">
      <div className="container mx-auto px-4">


        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto justify-items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.03,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                },
              }}
            >
              <TechCard tech={tech} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
