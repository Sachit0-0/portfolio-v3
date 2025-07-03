"use client"

import { Badge } from "@/components/ui/badge"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Zap, Calendar, Globe } from "lucide-react"
import { useRef } from "react"
import Image from "next/image"
import makescan from "@/public/makemyscan.png"
import dhn from "@/public/dhn.png"




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

  // First project (index 0): image on right
  // Second project (index 1): image on left
  const imageOnRight = index % 2 === 0

  return (
    <motion.div
      ref={cardRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
      initial={{
        opacity: 0,
        x: imageOnRight ? 30 : -30, // Reduced movement for mobile
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
            }
          : {}
      }
      transition={{
        duration: 0.6, // Shorter duration
        ease: "easeOut",
        // Reduce motion on mobile devices
        ...(typeof window !== "undefined" &&
          window.innerWidth < 768 && {
            duration: 0.4,
            x: 0, // No horizontal movement on mobile
          }),
      }}
    >
      {/* Content Section - appears first when image is on right */}
      <motion.div
        className={`space-y-4 ${imageOnRight ? "md:order-1" : "md:order-2"}`}
        initial={{ opacity: 0, x: imageOnRight ? -20 : 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: "easeOut",
        }}
      >
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm bg-primary/10 border border-primary/30 text-primary">
            <Globe className="w-3 h-3 mr-1" />
            {project.category}
          </Badge>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-foreground">{project.title}</h3>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{project.longDescription}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-semibold uppercase tracking-wide">Technologies</h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {project.tech.map((tech, techIndex) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.3,
                  delay: 0.2 + techIndex * 0.05,
                  ease: "easeOut",
                }}
              >
                <Badge variant="outline" className="py-2 text-sm justify-center w-full">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: 0.3,
            ease: "easeOut",
          }}
        >
          <a href={project.live} target="_blank" rel="noopener noreferrer">
            <button className="w-32 h-12 rounded-md text-white font-bold bg-gradient-to-r from-blue-500 to-purple-600 transition-transform hover:scale-105">
              Live Demo
            </button>
          </a>
          <div className="text-sm text-muted-foreground flex gap-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Active</span>
            </div>
            <div className="flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              <span>Production</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Image Section - appears second when image is on right */}
      <motion.div
        className={`relative w-full aspect-video ${imageOnRight ? "md:order-2" : "md:order-1"}`}
        initial={{ opacity: 0, x: imageOnRight ? 20 : -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="object-cover rounded-xl border border-border/30 shadow-md"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge variant="secondary" className="bg-green-500/90 text-white text-xs">
            <div className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse" />
            {project.status}
          </Badge>
          <Badge variant="outline" className="text-xs backdrop-blur-sm bg-background/80">
            <Calendar className="w-3 h-3 mr-1" />
            {project.year}
          </Badge>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Update the main section with reduced motion support
export function ProjectsShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <section id="projects" className="py-16 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 mx-auto mt-4 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 96, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          />
        </motion.div>

        <div className="space-y-24">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
