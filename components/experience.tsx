"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"
import CvButton from "./ui/cvButton"

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

export default function Experience() {
  const experience = useMemo(() => experienceData, [])

  return (
    <section id="experience" className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl caveat-bold font-bold mb-4 tracking-tight">
            Work{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent caveat-bold">
              Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and key achievements in web development
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
        
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block rounded-full" />

          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative md:pl-20 pb-12"
            >
              {/* timeline dot */}
              <div className="absolute left-[13px] md:left-6 w-4 h-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full border-4 border-background shadow-md hidden md:block" />

              <Card className="hover:shadow-xl hover:border-muted/50 border border-border/30 bg-background/80 backdrop-blur-sm transition-all duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold mb-1">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.location}</p>
                    </div>
                    <Badge variant="outline" className="self-start md:self-center">
                      {exp.period}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {exp.achievements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
          <div className="flex justify-center">
            <CvButton />
          </div>
      
      </div>
    </section>
  )
}