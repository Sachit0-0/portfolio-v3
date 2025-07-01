"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink } from "lucide-react"
import { useRef } from "react"
import { FloatingNavbar } from "@/components/floating-navbar"


import { ProjectsShowcase } from "@/components/projects-showcase"
import { SkillsExpertise } from "@/components/skills-expertise"
import { ScrollToTop } from "@/components/scroll-to-top"
import { HeroSection } from "@/components/hero-section"

import { ScrollProgress } from "@/components/scrollProgress"





const experienceData = [
  {
    title: "Associate Developer",
    company: "Monal Tech Pvt. Ltd.",
    period: "Sep 2023 - May 2025",
    location: "Hybrid",
    description:
      "Started as Junior Web Developer after completing 3-month internship. Designed and implemented reusable UI components using React, Next.js, and Tailwind CSS. Developed scalable full-stack applications with Django REST and PostgreSQL.",
    achievements: [
      "Built interactive data visualization dashboards for national BI platform using Recharts and Chart.js",
      "Improved team workflows by enhancing documentation and establishing reusable code patterns",
      "Collaborated with cross-functional teams to deliver client and in-house projects on schedule",
    ],
    technologies: ["React", "Next.js", "Django REST", "PostgreSQL", "Tailwind CSS", "Recharts"],
  },
  {
    title: "Junior Developer",
    company: "Nebham LLC",
    period: "Nov 2023 - Mar 2024",
    location: "Remote",
    description:
      "US-based company partnered with Monal Tech. Created dynamic UI components with Next.js and TypeScript. Enhanced application performance and usability while transforming prototype designs into production-ready components.",
    achievements: [
      "Transformed Figma and Balsamiq prototypes into production-ready components",
      "Developed core features for Nebham Patro mobile app and calendar system",
      "Enhanced application performance and improved user experience",
    ],
    technologies: ["Next.js", "TypeScript", "React", "Figma", "Mobile Development"],
  },
]

export default function Portfolio() {
 


  // Memoize experience data
  const experience = useMemo(() => experienceData, [])



  return (
    <>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <FloatingNavbar />
        <HeroSection />

   

        <SkillsExpertise />
      
        <ProjectsShowcase />

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Work{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Experience
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                My professional journey and key achievements in web development
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block"></div>

                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="relative md:pl-20 pb-12"
                  >
                    <div className="absolute left-6 w-4 h-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full border-4 border-background hidden md:block"></div>
                    <Card className="hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-background to-muted/30">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                            <p className="text-primary font-medium">{exp.company}</p>
                            <p className="text-sm text-muted-foreground">{exp.location}</p>
                          </div>
                          <Badge variant="outline" className="self-start md:self-center mt-2 md:mt-0">
                            {exp.period}
                          </Badge>
                        </div>

                        <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

                        <div className="mb-4">
                          <h4 className="font-semibold mb-2">Key Achievements:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button size="lg" variant="outline" className="group bg-transparent">
                <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                Download Resume
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 overflow-x-hidden">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Connect
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ready to bring your ideas to life? Let's discuss your next project.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">sachitdahal33@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+977 9803033781</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">Pasikot, Kathmandu, Nepal</p>
                  </div>
                </div>

                <div className="flex space-x-4 pt-8">
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:bg-blue-600 hover:text-white bg-transparent"
                    asChild
                  >
                    <a href="https://github.com/Sachit0-0" target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:bg-blue-600 hover:text-white bg-transparent"
                    asChild
                  >
                    <a
                      href="https://www.linkedin.com/in/sachit-da-hal-59a05b212/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:bg-blue-600 hover:text-white bg-transparent"
                    asChild
                  >
                    <a href="mailto:sachitdahal33@gmail.com">
                      <Mail className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 bg-gradient-to-br from-background to-muted/30">
                  <CardContent className="p-6">
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Name</label>
                          <Input placeholder="Your name" className="bg-background/50" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Email</label>
                          <Input type="email" placeholder="your@email.com" className="bg-background/50" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Subject</label>
                        <Input placeholder="Project discussion" className="bg-background/50" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Message</label>
                        <Textarea
                          placeholder="Tell me about your project..."
                          className="min-h-[120px] bg-background/50 resize-none"
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Sachit Dahal. Crafted with passion and code.
            </p>
          </div>
        </footer>

        <ScrollToTop />
        <ScrollProgress />
      </div>
    </>
  )
}
