"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Github, Linkedin, Mail, Terminal, Code, Database, Server, Zap } from "lucide-react"
import { useRef } from "react"
import Image from "next/image"
import sachit from "@/public/sachitt.jpg"
import SocialButtons from "./ui/socialButtons"
import About from "./aboutSection"
import CvButton from "./ui/cvButton"

export function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <section ref={ref} id="home" className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-gray-50/20 to-slate-50/30 dark:from-gray-950/30 dark:via-gray-900/20 dark:to-black/30" />

      {/* Simplified Background Elements */}
      <div className="absolute top-10 left-10 w-48 h-48 lg:top-20 lg:left-20 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-400/10 to-slate-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 lg:bottom-20 lg:right-20 lg:w-80 lg:h-80 bg-gradient-to-r from-slate-400/10 to-gray-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 min-h-screen m-2 flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full pt-20 lg:pt-0">
          {/* Left Side - Main Content */}
          <motion.div className="space-y-6 lg:space-y-8">
            {/* Greeting */}
            <motion.div
              className="inline-block px-6 py-3 rounded-full bg-white/20 dark:bg-white/10 border border-blue text-primary dark:text-white/90 text-lg sm:text-xl font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Hello, I'm
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-6xl caveat-bold sm:text-7xl md:text-8xl lg:text-9xl xl:text-[6rem] font-bold leading-tight bg-gradient-to-r from-blue-600 via-slate-400 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Sachit Dahal
            </motion.h1>

            {/* Title */}
            <motion.div
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary caveat-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Full Stack Developer
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-muted-foreground leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Building scalable, responsive web applications with React, Next.js, and Django.
              <br className="hidden sm:block" />
              <span className="block sm:inline">Passionate about creating exceptional user experiences.</span>
            </motion.p>

            {/* CTA Buttons */}
            <div className="flex items-center">
              <CvButton />
            </div>

            {/* Social Links */}
            <SocialButtons />
          </motion.div>

          {/* Right Side - Floating Elements */}
          <div className="relative mt-24">
            {/* Mobile: Stacked Cards */}
            <div className="flex flex-col items-center gap-4 lg:hidden">
              {/* Terminal Status Card */}
              <motion.div
                className="w-full max-w-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="bg-background/90 border shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground">Status</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Terminal className="w-4 h-4 text-white" />
                      </div>
                      <div className="font-mono text-sm">
                        <div className="text-green-500">Encrypted...</div>
                        <div className="text-muted-foreground mt-1 text-xs">Probably working rn</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Profile Card */}
              <motion.div
                className="w-full max-w-xs"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <Card className="bg-background/95 border shadow-2xl">
                  <CardContent className="p-4 text-center">
                    <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-4 border-primary/20">
                      <Image
                        src={sachit || "/placeholder.svg"}
                        alt="Sachit Dahal"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1">Sachit Dahal</h3>
                    <p className="text-primary text-sm mb-3">Developer</p>
                    <p className="text-xs text-muted-foreground mb-3">Stay in Touch</p>
                    <div className="flex justify-center space-x-2">
                      {[
                        {
                          icon: Linkedin,
                          href: "https://www.linkedin.com/in/sachit-da-hal-59a05b212/",
                        },
                        { icon: Github, href: "https://github.com/Sachit0-0" },
                        { icon: Mail, href: "mailto:sachitdahal33@gmail.com" },
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <social.icon className="w-3.5 h-3.5" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Stats Card */}
              <motion.div
                className="w-full max-w-xs"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Card className="bg-background/90 border shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm">Quick Stats</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div>
                        <div className="text-xl font-bold text-primary">15</div>
                        <div className="text-xs text-muted-foreground">Projects</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-primary">2+</div>
                        <div className="text-xs text-muted-foreground">Years Exp</div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-1 mt-3">
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">
                        React
                      </Badge>
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">
                        Django
                      </Badge>
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">
                        Next.js
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Desktop: Floating Cards */}
            <div className="hidden lg:block relative h-[700px]">
              {/* Terminal Status Card */}
              <motion.div
                className="absolute top-0 right-0 z-10"
                initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 3 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="w-80 bg-background/90 border shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <span className="text-sm font-mono text-muted-foreground">Status</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Terminal className="w-5 h-5 text-white" />
                      </div>
                      <div className="font-mono text-sm">
                        <div className="text-green-500">Encrypted...</div>
                        <div className="text-muted-foreground mt-1">Probably working rn</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Profile Card */}
              <motion.div
                className="absolute top-32 right-20 z-20"
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: -2 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Card className="w-72 bg-background/95 border shadow-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                      <Image
                        src={sachit || "/placeholder.svg"}
                        alt="Sachit Dahal"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1">Sachit Dahal</h3>
                    <p className="text-primary text-sm mb-4">Developer</p>
                    <p className="text-xs text-muted-foreground mb-4">Stay in Touch</p>
                    <div className="flex justify-center space-x-3">
                      {[
                        {
                          icon: Linkedin,
                          href: "https://www.linkedin.com/in/sachit-da-hal-59a05b212/",
                        },
                        { icon: Github, href: "https://github.com/Sachit0-0" },
                        { icon: Mail, href: "mailto:sachitdahal33@gmail.com" },
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <social.icon className="w-4 h-4" />
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Skills Floating Card - Only on Desktop */}
              <motion.div
                className="absolute bottom-16 right-0 z-10"
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Card className="w-64 bg-background/90 border shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Quick Stats</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">15</div>
                        <div className="text-xs text-muted-foreground">Projects</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">2+</div>
                        <div className="text-xs text-muted-foreground">Years Exp</div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 mt-3">
                      <Badge variant="secondary" className="text-xs">
                        React
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Django
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Next.js
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Simplified Floating Icons Layer */}
              <div className="pointer-events-none absolute inset-0 z-0">
                {/* Code Icon */}
                <motion.div
                  className="absolute top-20 left-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-border/50 flex items-center justify-center">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                </motion.div>

                {/* Database Icon */}
                <motion.div
                  className="absolute bottom-32 left-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-border/50 flex items-center justify-center">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                </motion.div>

                {/* Server Icon */}
                <motion.div
                  className="absolute top-1/2 left-1/4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-pink-400/20 border border-border/50 flex items-center justify-center">
                    <Server className="w-6 h-6 text-primary" />
                  </div>
                </motion.div>

                {/* Terminal Icon */}
                <motion.div
                  className="absolute bottom-10 right-2/4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-blue-500/20 border border-border/50 flex items-center justify-center">
                    <Terminal className="w-6 h-6 text-primary" />
                  </div>
                </motion.div>

                {/* Zap Icon */}
                <motion.div
                  className="absolute top-52 right-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-green-400/20 border border-border/50 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified Scroll Indicator */}
      <motion.div
        className="hidden lg:block absolute bottom-4 lg:bottom-8 right-4 lg:right-8 transform cursor-pointer"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
        onClick={() => scrollToSection("skills")}
      >
        <div className="flex flex-col items-end space-y-1 lg:space-y-2 text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-xs lg:text-sm font-medium">Scroll Down</span>
          <ArrowDown className="w-4 h-4 lg:w-5 lg:h-5" />
        </div>
      </motion.div>

      {/* About Section */}
      <About />
    </section>
  )
}
