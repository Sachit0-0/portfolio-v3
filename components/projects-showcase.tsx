"use client"

import { Badge } from "@/components/ui/badge"
import dhn from "@/public/dhn.png"
import makescan from "@/public/makemyscan.png"
import { cubicBezier, motion, useInView } from "framer-motion"
import { ExternalLink, Zap, Calendar, Globe } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"

const customEase = cubicBezier(0.25, 0.46, 0.45, 0.94) // Smoother easing for mobile
const mobileEase = cubicBezier(0.4, 0, 0.2, 1) // Even gentler for mobile

const projects = [
  {
    id: 1,
    title: "MakeMyScan - Website Vulnerability Scanner",
    description:
      "A comprehensive security scanning platform built with Next.js and Django that performs automated vulnerability assessments on websites.",
    longDescription:
      "MakeMyScan is a professional security scanning tool that helps identify vulnerabilities in websites. Built with Next.js for the frontend and Django for the backend, it provides detailed security reports and recommendations for improving website security.",
    image: makescan,
    tech: ["Next.js", "Django", "Python", "PostgreSQL", "Security APIs", "Tailwind CSS"],
    github: "#",
    live: "https://makemyscan.com/",
    featured: true,
    category: "Security Tool",
    status: "Live",
    year: "2024",
  },
  {
    id: 2,
    title: "DHN Data Visualization & BI Tool",
    description:
      "Interactive data visualization dashboard built with React and Recharts for comprehensive business intelligence and data analysis.",
    longDescription:
      "A powerful business intelligence platform that transforms complex data into interactive visualizations. Features real-time data processing, customizable dashboards, and advanced analytics capabilities for data-driven decision making.",
    image: dhn,
    tech: ["React", "Recharts", "TypeScript", "Node.js", "PostgreSQL", "Chart.js"],
    github: "#",
    live: "https://dh.monaltech.com/",
    featured: true,
    category: "Data Visualization",
    status: "Live",
    year: "2024",
  },
]

const ProjectCard = ({ project, index }: { project: (typeof projects)[0]; index: number }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })
  const isReversed = index % 2 === 1
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Simplified mobile animations
  const mobileImageVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: mobileEase,
        delay: 0.1,
      },
    },
  }

  const mobileContentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: mobileEase,
        delay: 0.2,
      },
    },
  }

  // Desktop animations (more complex)
  const desktopImageVariants = {
    hidden: {
      opacity: 0,
      x: isReversed ? 60 : -60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: customEase,
        delay: 0.2,
      },
    },
  }

  const desktopContentVariants = {
    hidden: {
      opacity: 0,
      x: isReversed ? -60 : 60,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.7,
        ease: customEase,
        delay: 0.3,
      },
    },
  }

  const imageVariants = isMobile ? mobileImageVariants : desktopImageVariants
  const contentVariants = isMobile ? mobileContentVariants : desktopContentVariants

  const techVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: mobileEase,
        delay: isMobile ? 0.3 : 0.5,
        staggerChildren: isMobile ? 0.05 : 0.08,
      },
    },
  }

  const techItemVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.4,
        ease: mobileEase,
      },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? "lg:grid-flow-col-dense" : ""}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ willChange: "transform, opacity" }}
    >
      {/* Optimized Image Section */}
      <motion.div
        className={`relative ${isReversed ? "lg:col-start-2" : ""}`}
        variants={imageVariants}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="relative group">
          {/* Simplified glow effect - disabled on mobile for performance */}
          {!isMobile && (
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          )}

          {/* Main image container */}
          <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-muted/20 to-muted/5 border border-border/30">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className={`w-full h-auto object-contain transition-transform duration-500 rounded-xl ${
                isMobile ? "" : "hover:scale-[1.02]"
              }`}
              width={800}
              height={420}
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              loading={index === 0 ? "eager" : "lazy"}
            />

            {/* Overlay with project info */}
            <div className="absolute top-3 right-3 flex gap-2">
              <Badge variant="secondary" className="bg-green-500/90 text-white border-0 shadow-sm text-xs">
                <div className="w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse" />
                {project.status}
              </Badge>
              <Badge variant="outline" className="bg-background/90 backdrop-blur-sm border-border/50 text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {project.year}
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Optimized Content Section */}
      <motion.div
        className={`space-y-6 ${isReversed ? "lg:col-start-1 lg:row-start-1" : ""}`}
        variants={contentVariants}
        style={{ willChange: "transform, opacity" }}
      >
        {/* Project Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              <Globe className="w-3 h-3 mr-1" />
              {project.category}
            </Badge>
          </div>

          <motion.h3
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight"
            initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.4 : 0.5, ease: mobileEase }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="text-base md:text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.5 : 0.6, ease: mobileEase }}
          >
            {project.longDescription}
          </motion.p>
        </div>

        {/* Optimized Tech Stack */}
        <motion.div className="space-y-4" variants={techVariants}>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Technologies Used</h4>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {project.tech.map((tech, techIndex) => (
              <motion.div key={tech} variants={techItemVariants}>
                <Badge
                  variant="outline"
                  className={`w-full justify-center py-2 md:py-2.5 text-xs md:text-sm font-medium transition-colors duration-200 cursor-default ${
                    isMobile ? "" : "hover:bg-primary/10 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  <span className={isMobile ? "" : "group-hover:scale-105 transition-transform duration-200"}>
                    {tech}
                  </span>
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Simplified Button Section */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.6 : 0.8, ease: mobileEase }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-block">
              <button
                className={`relative overflow-hidden w-32 p-2 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none rounded-md text-lg font-bold cursor-pointer z-10 group transition-transform duration-200 ${
                  isMobile ? "active:scale-95" : "hover:scale-105"
                }`}
              >
                Live Demo
                {!isMobile && (
                  <>
                    <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                    <span className="absolute w-36 h-32 -top-8 -left-2 bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                    <span className="absolute w-36 h-32 -top-8 -left-2 bg-purple-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                    <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
                      Visit!
                    </span>
                  </>
                )}
              </button>
            </a>

            {/* Project stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Active</span>
              </div>
              <div className="flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                <span>Production</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export function ProjectsShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const featuredProjects = projects.filter((p) => p.featured)

  const headerVariants = {
    hidden: { opacity: 0, y: isMobile ? 30 : 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.6 : 1,
        ease: isMobile ? mobileEase : customEase,
      },
    },
  }

  return (
    <section id="projects" className="py-16 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Optimized Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-28"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ willChange: "transform, opacity" }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>

          <motion.div
            className="w-24 md:w-32 h-1 md:h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 mx-auto mb-6 md:mb-8 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: isMobile ? 96 : 128, opacity: 1 } : {}}
            transition={{ duration: isMobile ? 0.6 : 1, delay: 0.3 }}
          />
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-16 md:space-y-32">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
