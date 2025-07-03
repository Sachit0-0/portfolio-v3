"use client"

import { Badge } from "@/components/ui/badge"
import dhn from "@/public/dhn.png"
import makescan from "@/public/makemyscan.png"
import { cubicBezier, motion, useInView } from "framer-motion"
import { ExternalLink, Star, Zap, Calendar, Globe } from "lucide-react"
import { useRef } from "react"
import Image from "next/image"

const customEase = cubicBezier(0.42, 0, 0.58, 1)

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

// Individual project card component for better performance
const ProjectCard = ({ project, index }: { project: (typeof projects)[0]; index: number }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  const isReversed = index % 2 === 1

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: isReversed ? 100 : -100,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: customEase,
        delay: 0.2,
      },
    },
  }

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: isReversed ? -100 : 100,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: customEase,
        delay: 0.4,
      },
    },
  }

  const techVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: customEase,
        delay: 0.6,
        staggerChildren: 0.08,
      },
    },
  }

  const techItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: customEase,
      },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? "lg:grid-flow-col-dense" : ""}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Enhanced Image Section */}
      <motion.div className={`relative ${isReversed ? "lg:col-start-2" : ""}`} variants={imageVariants}>
        <div className="relative group">
          {/* Glow effect behind image */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Main image container */}
          <div className="relative overflow-hidden rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105 rounded-xl"
              width={800}
              height={420}
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            />

            {/* Overlay with project info */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge variant="secondary" className="bg-green-500/90 text-white border-0 shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                {project.status}
              </Badge>
              <Badge variant="outline" className="bg-background/90 backdrop-blur-sm border-border/50">
                <Calendar className="w-3 h-3 mr-1" />
                {project.year}
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Content Section */}
      <motion.div
        className={`space-y-6 ${isReversed ? "lg:col-start-1 lg:row-start-1" : ""}`}
        variants={contentVariants}
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
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="text-base md:text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {project.longDescription}
          </motion.p>
        </div>

        {/* Enhanced Tech Stack */}
        <motion.div className="space-y-4" variants={techVariants}>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Technologies Used</h4>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {project.tech.map((tech, techIndex) => (
              <motion.div key={tech} variants={techItemVariants}>
                <Badge
                  variant="outline"
                  className="w-full justify-center py-2.5 text-sm font-medium hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-300 cursor-default group"
                >
                  <span className="group-hover:scale-105 transition-transform duration-200">{tech}</span>
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Custom Button Section */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center gap-3">
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-block">
              <button className="overflow-hidden relative w-32 p-2 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group">
                Live Demo
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                <span className="absolute w-36 h-32 -top-8 -left-2 bg-purple-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
                  Visit!
                </span>
              </button>
            </a>

            {/* Project stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground ml-4">
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
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const featuredProjects = projects.filter((p) => p.featured)

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: customEase,
      },
    },
  }

  return (
    <section id="projects" className="py-16 md:py-32 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 pointer-events-none" />
  

      <div className="container mx-auto px-4" ref={ref}>
        {/* Enhanced Section Header */}
        <motion.div
          className="text-center mb-20 md:mb-28"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
     

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>

          <motion.div
            className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 mx-auto mb-8 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 128, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          />

        
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-24 md:space-y-32">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
