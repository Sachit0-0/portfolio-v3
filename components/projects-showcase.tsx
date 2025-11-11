"use client"

import { Badge } from "@/components/ui/badge"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { ExternalLink, Zap, Calendar, Globe } from "lucide-react"
import { useRef } from "react"
import Image from "next/image"
import makescan from "@/public/makemyscan.png"
import dhn from "@/public/dhn.png"
import AnimatedSectionHeader from "./ui/animatedSectionHeader"

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
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  const shouldReduceMotion = useReducedMotion()

  // Alternating layout: first project image on right, second on left
  const imageOnRight = index % 2 === 0

  // Smooth animations optimized for mobile
  const getAnimationProps = (baseProps: any) => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: isInView ? { opacity: 1 } : {},
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
      }
    }
    return {
      ...baseProps,
      transition: {
        ...baseProps.transition,
        ease: [0.25, 0.1, 0.25, 1], // Smooth cubic-bezier for all devices
      },
    }
  }

  return (
    <div className="relative">
      {/* Stack effect background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl transform rotate-1 scale-[0.98] -z-10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-accent/10 to-primary/5 rounded-2xl transform -rotate-1 scale-[0.99] -z-20" />

      <motion.div
        ref={cardRef}
        className="relative bg-background/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
        {...getAnimationProps({
          initial: { opacity: 0, y: 40, scale: 0.98 },
          animate: isInView ? { opacity: 1, y: 0, scale: 1 } : {},
          transition: {
            duration: 0.7,
            delay: index * 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          },
        })}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Section */}
          <motion.div
            className={`space-y-6 ${imageOnRight ? "lg:order-1" : "lg:order-2"}`}
            {...getAnimationProps({
              initial: { opacity: 0, x: imageOnRight ? -20 : 20 },
              animate: isInView ? { opacity: 1, x: 0 } : {},
              transition: {
                duration: 0.6,
                delay: index * 0.15 + 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              },
            })}
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
                    {...getAnimationProps({
                      initial: { opacity: 0, scale: 0.9 },
                      animate: isInView ? { opacity: 1, scale: 1 } : {},
                      transition: {
                        duration: 0.4,
                        delay: 0.2 + techIndex * 0.03,
                        ease: [0.25, 0.1, 0.25, 1],
                      },
                    })}
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
              {...getAnimationProps({
                initial: { opacity: 0, y: 15 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
                transition: {
                  duration: 0.5,
                  delay: 0.3,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              })}
            >
              <a href={project.live} target="_blank" rel="noopener noreferrer">
                <button className="overflow-hidden relative w-32 p-2 h-12 bg-primary text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group">
                  Visit Now
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-purple-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                  <span className="absolute w-36 h-32 -top-8 -left-2 bg-purple-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                  <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
                    Demo!
                  </span>
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

          {/* Image Section */}
          <motion.div
            className={`relative w-full aspect-video ${imageOnRight ? "lg:order-2" : "lg:order-1"}`}
            {...getAnimationProps({
              initial: { opacity: 0, x: imageOnRight ? 15 : -15, scale: 0.95 },
              animate: isInView ? { opacity: 1, x: 0, scale: 1 } : {},
              transition: {
                duration: 0.6,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              },
            })}
          >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="object-cover rounded-xl border border-border/30 shadow-md"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
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
        </div>
      </motion.div>
    </div>
  )
}

export function ProjectsShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })
  const shouldReduceMotion = useReducedMotion()
  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <section id="projects" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background decoration - optimized for mobile */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-secondary/5 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10" ref={ref}>
<AnimatedSectionHeader title="Featured" highlight="Projects" />


        {/* Projects Grid with Enhanced Stack Effect */}
        <div className="space-y-32 lg:space-y-40">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
