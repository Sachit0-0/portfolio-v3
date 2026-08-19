"use client"

import { motion, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, ExternalLink } from "lucide-react"
import { useRef } from "react"

const articles = [
  {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "Learn advanced patterns and best practices for creating maintainable React applications using TypeScript, including proper typing strategies and performance optimization.",
    image: "/placeholder.svg?height=300&width=500",
    category: "React",
    readTime: "8 min read",
    publishDate: "Dec 15, 2023",
    link: "#",
    featured: true,
  },
  {
    id: 2,
    title: "The Future of Web Development: AI Integration",
    excerpt:
      "Exploring how artificial intelligence is revolutionizing web development, from automated code generation to intelligent user experiences.",
    image: "/placeholder.svg?height=300&width=500",
    category: "AI/ML",
    readTime: "12 min read",
    publishDate: "Dec 10, 2023",
    link: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Mastering Next.js 14: App Router Deep Dive",
    excerpt:
      "A comprehensive guide to Next.js 14's App Router, covering server components, streaming, and advanced routing patterns.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Next.js",
    readTime: "15 min read",
    publishDate: "Dec 5, 2023",
    link: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Database Optimization Techniques for Modern Apps",
    excerpt:
      "Performance optimization strategies for PostgreSQL and MongoDB, including indexing, query optimization, and caching strategies.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Database",
    readTime: "10 min read",
    publishDate: "Nov 28, 2023",
    link: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Implementing Real-time Features with WebSockets",
    excerpt:
      "Building real-time applications with WebSockets, Socket.io, and modern browser APIs for instant user interactions.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Backend",
    readTime: "7 min read",
    publishDate: "Nov 20, 2023",
    link: "#",
    featured: false,
  },
  {
    id: 6,
    title: "CSS Grid vs Flexbox: When to Use What",
    excerpt:
      "A practical guide to choosing between CSS Grid and Flexbox for different layout scenarios with real-world examples.",
    image: "/placeholder.svg?height=300&width=500",
    category: "CSS",
    readTime: "6 min read",
    publishDate: "Nov 15, 2023",
    link: "#",
    featured: false,
  },
]

export function BlogArticles() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const featuredArticles = articles.filter((article) => article.featured)
  const regularArticles = articles.filter((article) => !article.featured)

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Latest{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Articles</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Insights and tutorials on modern web development
          </p>
        </motion.div>

        {/* Featured Articles */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-background to-muted/30">
                <div className="relative overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground">Featured</Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.publishDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                    <Badge variant="secondary">{article.category}</Badge>
                  </div>

                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">{article.excerpt}</p>

                  <Button variant="ghost" className="group/btn p-0 h-auto font-semibold">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Regular Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {regularArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                <div className="relative overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {article.publishDate}
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </div>

                  <Badge variant="secondary" className="mb-3 text-xs">
                    {article.category}
                  </Badge>

                  <h4 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>

                  <Button variant="ghost" size="sm" className="group/btn p-0 h-auto text-sm">
                    Read More
                    <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Articles CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button size="lg" variant="outline" className="group bg-transparent">
            <ExternalLink className="w-4 h-4 mr-2" />
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
