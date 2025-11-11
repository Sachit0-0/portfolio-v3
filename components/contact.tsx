"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import AnimatedSectionHeader from "./ui/animatedSectionHeader"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" className="relative  py-20 overflow-x-hidden" ref={ref}>
      <div className="container mx-auto px-4 text-center">
<AnimatedSectionHeader title="Get in" highlight="Touch" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto w-full">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8 px-4 sm:px-0"
          >
            {[
              {
                Icon: Mail,
                title: "Email",
                value: "sachitdahal33@gmail.com",
              },
              {
                Icon: Phone,
                title: "Phone",
                value: "+977 9803033781",
              },
              {
                Icon: MapPin,
                title: "Location",
                value: "Pasikot, Kathmandu, Nepal",
              },
            ].map(({ Icon, title, value }) => (
              <div key={title} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{value}</p>
                </div>
              </div>
            ))}

            {/* Social Buttons */}
            <div className="flex space-x-4 pt-8 justify-center lg:justify-start">
              <Button size="icon" variant="outline" className="hover:bg-blue-600 hover:text-white bg-transparent" asChild>
                <a href="https://github.com/Sachit0-0" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button size="icon" variant="outline" className="hover:bg-blue-600 hover:text-white bg-transparent" asChild>
                <a href="https://www.linkedin.com/in/sachit-da-hal-59a05b212/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button size="icon" variant="outline" className="hover:bg-blue-600 hover:text-white bg-transparent" asChild>
                <a href="mailto:sachitdahal33@gmail.com">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Contact Form (no backend yet) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="px-4 sm:px-0"
          >
            <Card className="border-0 bg-gradient-to-br from-background to-muted/30">
              <CardContent className="p-6">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="text-base sm:text-sm font-medium mb-2 block">Name</label>
                      <Input id="name" name="name" required placeholder="Your name" className="bg-background/50 text-base sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-base sm:text-sm font-medium mb-2 block">Email</label>
                      <Input id="email" type="email" name="email" required placeholder="your@email.com" className="bg-background/50 text-base sm:text-sm" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="text-base sm:text-sm font-medium mb-2 block">Subject</label>
                    <Input id="subject" name="subject" required placeholder="Project discussion" className="bg-background/50 text-base sm:text-sm" />
                  </div>

                  <div>
                    <label htmlFor="message" className="text-base sm:text-sm font-medium mb-2 block">Message</label>
                    <Textarea id="message" name="message" required placeholder="Tell me about your project..." className="min-h-[120px] bg-background/50 resize-none text-base sm:text-sm" />
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
  )
}
