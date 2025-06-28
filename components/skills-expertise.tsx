"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Code2,
  Database,
  Palette,
  Smartphone,
  Cloud,
  Zap,
  Brain,
  Layers,
  Settings,
} from "lucide-react"
import { useRef, useState, useEffect } from "react"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    color: "from-blue-500 via-cyan-400 to-blue-400",
    skills: [
      { name: "React/Next.js", level: 95, description: "Advanced component architecture, SSR, SSG" },
      { name: "TypeScript", level: 90, description: "Type-safe development, advanced patterns" },
      { name: "Tailwind CSS", level: 90, description: "Utility-first styling, responsive design" },
      { name: "React Query", level: 90, description: "Data fetching, caching, synchronization" },
      { name: "Zustand", level: 85, description: "Lightweight state management" },
    ],
  },
  {
    title: "Backend Development",
    icon: Database,
    color: "from-green-500 via-emerald-400 to-green-400",
    skills: [
      { name: "Node.js", level: 92, description: "Express, Fastify, microservices architecture" },
      { name: "Python", level: 85, description: "Django, FastAPI, data processing" },
      { name: "PostgreSQL", level: 88, description: "Complex queries, optimization, migrations" },
      { name: "GraphQL", level: 80, description: "Schema design, resolvers, Apollo" },
      { name: "Prisma ORM", level: 78, description: "Type-safe database modeling & migrations" },
    ],
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    color: "from-purple-500 via-pink-400 to-fuchsia-400",
    skills: [
      { name: "React Native", level: 85, description: "Cross-platform apps, native modules" },
      { name: "Expo", level: 70, description: "Rapid development and deployment" },
    ],
  },
]

const AnimatedProgress = ({
  value,
  delay = 0,
}: {
  value: number
  delay?: number
}) => {
  const [progress, setProgress] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgress(value)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isInView, value, delay])

  return (
    <div ref={ref} className="w-full">
        <Progress
        value={progress}
        className="h-3 rounded-full bg-muted/40 [&_.progress-bar]:bg-gradient-to-r [&_.progress-bar]:from-blue-500 [&_.progress-bar]:via-purple-500 [&_.progress-bar]:to-pink-500"
      />
    </div>
  )
}

const SkillCard = ({
  category,
  index,
}: {
  category: any
  index: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Card className="h-full border-0 shadow-xl bg-gradient-to-br group-hover:scale-[1.025] transition-transform duration-300 from-background via-muted/40 to-white/10 dark:to-black/20 relative overflow-hidden">
        {/* Glow border on hover */}
        <div className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500`} />
        <CardContent className="">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              <category.icon className="w-7 h-7 text-white drop-shadow" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{category.title}</h3>
              <p className="text-sm text-muted-foreground">Professional expertise</p>
            </div>
          </div>
          {/* Skills */}
          <div className="space-y-6">
            {category.skills.map((skill: any, skillIndex: number) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1 + skillIndex * 0.08,
                }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-base">{skill.name}</h4>
                    <p className="text-xs text-muted-foreground">{skill.description}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow"
                  >
                    {skill.level}%
                  </Badge>
                </div>
                <AnimatedProgress value={skill.level} delay={index * 100 + skillIndex * 50} />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function SkillsExpertise() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-32 bg-gradient-to-b from-background via-muted/30 to-background/80 dark:from-black dark:via-slate-900/60 dark:to-black/90">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Skills &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full" />
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive technical skills across the full development stack
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
