"use client"

import { motion, type Variants } from "framer-motion"
import { useEffect, useState, useMemo, useCallback } from "react"
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

// Memoized TechCard component for better performance
const TechCard = ({ tech, index }: TechCardProps) => {
  const { theme } = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  // Memoize expensive calculations
  const memoizedStyles = useMemo(() => {
    const baseIconFilter = tech.name === "Next.js" ? (theme === "dark" ? "invert(1) brightness(1.1)" : "none") : "none"

    return {
      glowBackground: `radial-gradient(circle at 60% 40%, rgba(${tech.glowColor}, 0.45), transparent 70%)`,
      innerGlow: `radial-gradient(circle at center, rgba(${tech.glowColor}, 0.08), transparent 60%)`,
      hoverShadow: `0 0 40px 0 rgba(${tech.glowColor}, 0.35), 0 0 80px 0 rgba(${tech.glowColor}, 0.18), 0 2px 8px 0 rgba(0,0,0,0.08)`,
      tooltipBorder: `rgba(${tech.glowColor}, 0.3)`,
      tooltipShadow: `0 4px 20px rgba(${tech.glowColor}, 0.2), 0 0 0 1px rgba(${tech.glowColor}, 0.1)`,
      iconFilter: `${baseIconFilter} drop-shadow(0 2px 8px rgba(255,255,255,0.7))`,
    }
  }, [tech.glowColor, tech.name, theme])

  // Optimized event handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  const cardVariants: Variants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    hover: {
      boxShadow: memoizedStyles.hoverShadow,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const tooltipVariants: Variants = {
    hidden: {
      y: 10,
      opacity: 0,
      scale: 0.8,
      rotateX: -15,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5,
      },
    },
  }

  return (
    <motion.div
      className="relative group"
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={cardVariants}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: "transform" }}
    >
      {/* Optimized glow effect - only render when hovered */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: memoizedStyles.glowBackground,
            zIndex: 0,
          }}
          initial={{ opacity: 0.7, scale: 1, filter: "blur(15px)" }}
          animate={{ opacity: 1, scale: 1.15, filter: "blur(25px)" }}
          exit={{ opacity: 0.7, scale: 1, filter: "blur(15px)" }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      )}

      <motion.div
        className="relative w-20 h-20 sm:w-24 sm:h-24 bg-muted/50 border border-border/50 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:border-border group-hover:bg-muted/80 overflow-hidden"
        style={{ zIndex: 1 }}
      >
        {tech.icon ? (
          <tech.icon
            className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 relative z-10"
            style={{
              color: tech.color,
              filter: `drop-shadow(0 2px 8px rgba(255,255,255,0.7))`,
            }}
          />
        ) : (
          <img
            src={tech.logo || "/placeholder.svg"}
            alt={tech.name}
            className="w-8 h-8 sm:w-12 sm:h-12 object-contain transition-transform duration-300 group-hover:scale-110 relative z-10"
            style={{
              filter: memoizedStyles.iconFilter,
            }}
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Inner glow - only show on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: memoizedStyles.innerGlow,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>

      {/* Enhanced Smooth Tooltip */}
      <motion.div
        className="absolute -top-20 left-1/2 transform -translate-x-1/2 pointer-events-none z-20"
        variants={tooltipVariants}
        initial="hidden"
        animate={isHovered ? "visible" : "hidden"}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative bg-secondary  text-xs px-4 py-3 rounded-xl whitespace-nowrap backdrop-blur-sm border shadow-2xl"
          style={{
            borderColor: memoizedStyles.tooltipBorder,
            boxShadow: memoizedStyles.tooltipShadow,
          }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Subtle gradient background */}
          <div
            className="absolute inset-0 rounded-xl opacity-20"
            style={{
              background: `linear-gradient(135deg, rgba(${tech.glowColor}, 0.3), transparent)`,
            }}
          />

          <div className="relative z-10">
            <div className="font-semibold text-sm">{tech.name}</div>
            <div className="text-xs opacity-75 mt-0.5">{tech.category}</div>
          </div>

          {/* Animated arrow with glow */}
          <motion.div
            className="absolute top-full left-1/2 transform -translate-x-1/2"
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div
              className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground/95"
              style={{
                filter: `drop-shadow(0 2px 4px rgba(${tech.glowColor}, 0.3))`,
              }}
            />
          </motion.div>

          {/* Subtle shine effect */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
            style={{
              background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
            }}
            animate={{
              x: ["-100%", "100%"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Memoize the entire component
const MemoizedTechCard = ({ tech, index }: TechCardProps) => <TechCard tech={tech} index={index} />

export default function TechShowcase() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Memoize the grid variants to prevent recreation
  const gridVariants: Variants = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.03,
          delayChildren: 0.1,
        },
      },
    }),
    [],
  )

  const itemVariants: Variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20, scale: 0.95 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      },
    }),
    [],
  )

  // Show loading skeleton or return null for better UX
  if (!mounted) {
    return (
      <section id="technologies" className="relative py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto justify-items-center">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-20 h-20 sm:w-24 sm:h-24 bg-muted/30 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="technologies" className="relative py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4 md:gap-6 max-w-7xl mx-auto justify-items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={gridVariants}
        >
          {technologies.map((tech, index) => (
            <motion.div key={tech.name} variants={itemVariants}>
              <MemoizedTechCard tech={tech} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
