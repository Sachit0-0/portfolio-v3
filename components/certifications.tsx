"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, ExternalLink, Calendar, CheckCircle } from "lucide-react"
import { useRef } from "react"

const certifications = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-SAA-2023-001",
    image: "/placeholder.svg?height=100&width=100",
    description: "Validates expertise in designing distributed systems on AWS",
    skills: ["Cloud Architecture", "AWS Services", "Security", "Scalability"],
    verified: true,
    link: "#",
  },
  {
    id: 2,
    title: "Google Cloud Professional Developer",
    issuer: "Google Cloud",
    date: "2023",
    credentialId: "GCP-PD-2023-002",
    image: "/placeholder.svg?height=100&width=100",
    description: "Demonstrates ability to build scalable applications on Google Cloud",
    skills: ["GCP Services", "Kubernetes", "CI/CD", "Monitoring"],
    verified: true,
    link: "#",
  },
  {
    id: 3,
    title: "Meta React Developer Certificate",
    issuer: "Meta (Facebook)",
    date: "2022",
    credentialId: "META-RD-2022-003",
    image: "/placeholder.svg?height=100&width=100",
    description: "Advanced React development patterns and best practices",
    skills: ["React", "Redux", "Testing", "Performance"],
    verified: true,
    link: "#",
  },
  {
    id: 4,
    title: "MongoDB Certified Developer",
    issuer: "MongoDB University",
    date: "2022",
    credentialId: "MDB-DEV-2022-004",
    image: "/placeholder.svg?height=100&width=100",
    description: "Expertise in MongoDB database design and development",
    skills: ["MongoDB", "Aggregation", "Indexing", "Schema Design"],
    verified: true,
    link: "#",
  },
  {
    id: 5,
    title: "Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    date: "2023",
    credentialId: "CKA-2023-005",
    image: "/placeholder.svg?height=100&width=100",
    description: "Validates skills in Kubernetes cluster administration",
    skills: ["Kubernetes", "Container Orchestration", "Networking", "Security"],
    verified: true,
    link: "#",
  },
  {
    id: 6,
    title: "TensorFlow Developer Certificate",
    issuer: "TensorFlow",
    date: "2023",
    credentialId: "TF-DEV-2023-006",
    image: "/placeholder.svg?height=100&width=100",
    description: "Machine learning and AI development with TensorFlow",
    skills: ["Machine Learning", "Neural Networks", "TensorFlow", "Python"],
    verified: true,
    link: "#",
  },
]

export function Certifications() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-32 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-transparent" />

      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Certifications &{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Professional certifications and industry recognition
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/30 overflow-hidden">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="relative">
                      <img
                        src={cert.image || "/placeholder.svg"}
                        alt={cert.issuer}
                        className="w-16 h-16 rounded-lg object-cover border-2 border-border/50"
                      />
                      {cert.verified && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                        <span>•</span>
                        <span>ID: {cert.credentialId}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{cert.description}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {cert.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Verified</span>
                    </div>

                    <Button size="sm" variant="ghost" className="group/btn">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Verify
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { label: "Certifications", count: "6+" },
            { label: "Cloud Platforms", count: "3" },
            { label: "Years Learning", count: "8+" },
            { label: "Skills Verified", count: "20+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">{stat.count}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
