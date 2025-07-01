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
import Experience from "@/components/experience"

export default function Portfolio() {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300 text-base sm:text-lg md:text-xl">
        <FloatingNavbar />
        <HeroSection />
        

        <SkillsExpertise />
        <ProjectsShowcase />
        <Experience />

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
              <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mb-6 caveat-bold">
                Let's{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent caveat-text">
                  Connect
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
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
                    <h3 className="font-semibold text-base sm:text-lg">Email</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">sachitdahal33@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">Phone</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">+977 9803033781</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">Location</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">Pasikot, Kathmandu, Nepal</p>
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
                          <label className="text-base sm:text-sm font-medium mb-2 block">Name</label>
                          <Input placeholder="Your name" className="bg-background/50 text-base sm:text-sm" />
                        </div>
                        <div>
                          <label className="text-base sm:text-sm font-medium mb-2 block">Email</label>
                          <Input type="email" placeholder="your@email.com" className="bg-background/50 text-base sm:text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="text-base sm:text-sm font-medium mb-2 block">Subject</label>
                        <Input placeholder="Project discussion" className="bg-background/50 text-base sm:text-sm" />
                      </div>
                      <div>
                        <label className="text-base sm:text-sm font-medium mb-2 block">Message</label>
                        <Textarea
                          placeholder="Tell me about your project..."
                          className="min-h-[120px] bg-background/50 resize-none text-base sm:text-sm"
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-base sm:text-lg"
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
            <p className="text-sm sm:text-base text-muted-foreground">
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
