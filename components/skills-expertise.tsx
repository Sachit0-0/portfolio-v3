"use client"

import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Code2, Database, ArrowRight } from "lucide-react"
import { useRef, memo, useMemo } from "react"
import dynamic from "next/dynamic"
import AnimatedSectionHeader from "./ui/animatedSectionHeader"

const TechShowcase = dynamic(() => import("./tech-showcase"), { ssr: false })

const skillsData = Object.freeze([
  {
    category: "Frontend Mastery",
    icon: Code2,
    gradient: "from-blue-600 via-purple-600 to-indigo-600",
    skills: [
      { name: "React & Next.js", level: 95, years: "3+" },
      { name: "TypeScript", level: 90, years: "2+" },
      { name: "Tailwind CSS", level: 90, years: "2+" },
      { name: "Framer Motion", level: 85, years: "1+" },
    ],
  },
  {
    category: "Backend Excellence",
    icon: Database,
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    skills: [
      { name: "Node.js & Express", level: 92, years: "2+" },
      { name: "Python & Django", level: 85, years: "2+" },
      { name: "PostgreSQL", level: 88, years: "2+" },
      { name: "GraphQL", level: 80, years: "1+" },
    ],
  },
])

const FloatingSkillBadge = memo(({ skill, index, categoryIndex }: any) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.3,
        delay: categoryIndex * 0.1 + index * 0.05,
        ease: "easeOut",
      }}
      className="group cursor-pointer"
    >
      <div className="relative p-6 rounded-2xl border bg-white/90 dark:bg-gray-900/90 shadow-lg hover:shadow-xl border-gray-200 dark:border-gray-700 transition-shadow duration-200">
        {/* Skill level arc */}
        <div className="absolute -top-2 -right-2">
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${skill.level}, 100`}
                className="text-blue-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{skill.level}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {skill.name}
          </h4>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-xs bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
            >
              {skill.years} experience
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

FloatingSkillBadge.displayName = "FloatingSkillBadge"

export function SkillsExpertise() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })

  const categories = useMemo(() => skillsData, [])

  return (
    <section id="skills" ref={containerRef} className="relative py-24 overflow-hidden">
      {/* Simplified background */}
  

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <AnimatedSectionHeader title="Technologies &" highlight="Tools" />

        {/* Skills list */}
        <div className="space-y-20">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: categoryIndex * 0.15,
                ease: "easeOut",
              }}
              className="relative"
            >
              {/* Category header */}
              <div className="flex items-center gap-6 mb-10">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}
                >
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {category.category}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className={`h-1 w-20 bg-gradient-to-r ${category.gradient} rounded-full`} />
                  
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-gray-400 dark:text-gray-500">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Skills grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <FloatingSkillBadge key={skill.name} skill={skill} index={skillIndex} categoryIndex={categoryIndex} />
                ))}
              </div>
            </motion.div>
          ))}

          {/* TechShowcase Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: categories.length * 0.15 + 0.2,
              ease: "easeOut",
            }}
            className="relative"
          >
            <TechShowcase />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
