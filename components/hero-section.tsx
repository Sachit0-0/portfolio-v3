"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Github, Linkedin, Mail, Download, Terminal, Code, Coffee, Zap } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import sachit from "@/public/sachitt.jpg"

const AnimatedCounter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

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

      {/* Floating Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-48 h-48 lg:top-20 lg:left-20 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-400/10 to-slate-400/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 lg:bottom-20 lg:right-20 lg:w-80 lg:h-80 bg-gradient-to-r from-slate-400/10 to-gray-400/10 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <div className="container mx-auto px-4 min-h-screen m-2 flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full pt-20 lg:pt-0">
          {/* Left Side - Main Content */}
          <motion.div className="space-y-6 lg:space-y-8">
            {/* Greeting */}
            <motion.div
              className="inline-block px-4 py-2 lg:px-6 lg:py-2 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 text-black dark:text-white/90 text-sm lg:text-lg font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Hello, I'm
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight bg-gradient-to-r from-blue-600 via-slate-200 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Sachit Dahal
            </motion.h1>

            {/* Title */}
            <motion.div
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Full Stack Developer
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Building scalable, responsive web applications with React, Next.js, and Django.
              <br className="hidden sm:block" />
              <span className="block sm:inline"> Passionate about creating exceptional user experiences.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Download className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Curriculum vitae
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg rounded-full border-2 hover:bg-foreground hover:text-background transition-all duration-300 bg-transparent"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex space-x-3 lg:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                { icon: Github, href: "https://github.com/Sachit0-0", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/sachit-da-hal-59a05b212/", label: "LinkedIn" },
                { icon: Mail, href: "mailto:sachitdahal33@gmail.com", label: "Email" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Floating Elements */}
          <div className="relative mt-24">
            {/* Mobile: Stacked Cards */}
            <div className="flex flex-col  items-center gap-4 lg:hidden">
              {/* Terminal Status Card */}
              <motion.div
                className="w-full max-w-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Card className="bg-background/90 backdrop-blur-sm border shadow-xl">
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
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <Card className="bg-background/95 backdrop-blur-sm border shadow-2xl">
                  <CardContent className="p-4 text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-4 border-primary/20">
                      <img
                        src="/placeholder.svg?height=64&width=64"
                        alt="Sachit Dahal"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-1">Sachit Dahal</h3>
                    <p className="text-primary text-sm mb-3">Developer</p>
                    <p className="text-xs text-muted-foreground mb-3">Stay in Touch</p>
                    <div className="flex justify-center space-x-2">
                      {[
                        { icon: Linkedin, href: "https://www.linkedin.com/in/sachit-da-hal-59a05b212/" },
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
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <Card className="bg-background/90 backdrop-blur-sm border shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-sm">Quick Stats</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div>
                        <div className="text-xl font-bold text-primary">
                          <AnimatedCounter end={15} />+
                        </div>
                        <div className="text-xs text-muted-foreground">Projects</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-primary">
                          <AnimatedCounter end={2} />+
                        </div>
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
            <div className="hidden lg:block pdrelative h-[700px]">
              {/* Terminal Status Card */}
              <motion.div
                style={{ y: y1 }}
                className="absolute top-0 right-0 z-10"
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 3 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                <Card className="w-80 bg-background/90 backdrop-blur-sm border shadow-xl">
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
                style={{ y: y2 }}
                className="absolute top-32 right-20 z-20"
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                <Card className="w-72 bg-background/95 backdrop-blur-sm border shadow-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                      <img
                    src={sachit.src}
                        alt="Sachit Dahal"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1">Sachit Dahal</h3>
                    <p className="text-primary text-sm mb-4">Developer</p>
                    <p className="text-xs text-muted-foreground mb-4">Stay in Touch</p>
                    <div className="flex justify-center space-x-3">
                      {[
                        { icon: Linkedin, href: "https://www.linkedin.com/in/sachit-da-hal-59a05b212/" },
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

              {/* Skills Floating Card */}
              <motion.div
                style={{ y: y3 }}
                className="absolute bottom-20 right-8 z-10"
                initial={{ opacity: 0, scale: 0.8, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
              >
                <Card className="w-64 bg-background/90 backdrop-blur-sm border shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Quick Stats</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          <AnimatedCounter end={15} />+
                        </div>
                        <div className="text-xs text-muted-foreground">Projects</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          <AnimatedCounter end={2} />+
                        </div>
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

              {/* Floating Icons */}
              <motion.div
                className="absolute top-20 left-10"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-border/50 flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-primary" />
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-32 left-0"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm border border-border/50 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 lg:bottom-8 right-4 lg:right-8 transform cursor-pointer"
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        onClick={() => scrollToSection("skills")}
      >
        <div className="flex flex-col items-end space-y-1 lg:space-y-2 text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-xs lg:text-sm font-medium">Scroll Down</span>
          <ArrowDown className="w-4 h-4 lg:w-5 lg:h-5" />
        </div>
      </motion.div>
              </section>
  )
}
