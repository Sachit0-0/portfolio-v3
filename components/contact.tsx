"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Sparkles, Mail, Phone, MapPin, Send, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { ScrollRevealText, ScrollFadeIn } from "./ui/scroll-reveal";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 overflow-hidden border-t border-border/40"
      ref={ref}
    >
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header with scroll text reveals */}
        <div className="mb-16 md:mb-24">
          <ScrollFadeIn delay={0}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-card/90 border border-border/80 text-xs sm:text-sm font-mono tracking-wider text-primary shadow-md backdrop-blur-md mb-4 uppercase">
              <Sparkles className="w-4 h-4" />
              <span>05 / INITIATE CONTACT</span>
            </div>
          </ScrollFadeIn>
          <ScrollRevealText
            text="Let's Build Together"
            as="h2"
            className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] text-foreground"
            delay={0.1}
            stagger={0.08}
          />
          <ScrollRevealText
            text="Based in Kathmandu, Nepal. Focused on clean architecture, web applications, custom Framer canvas plugins, and end-to-end software delivery."
            className="mt-4 text-muted-foreground text-base max-w-xl leading-relaxed"
            delay={0.2}
            stagger={0.015}
            variant="blur"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Contact info cards */}
          <ScrollFadeIn delay={0.1} y={30}>
            <div className="p-8 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md shadow-lg space-y-6">
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Direct Contact Details
              </h3>

              <div className="space-y-4">
                {/* Email card */}
                <a
                  href="mailto:sachitdahal33@gmail.com"
                  className="group flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-muted/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground/70">
                      Primary Email
                    </p>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      sachitdahal33@gmail.com
                    </p>
                  </div>
                </a>

                {/* Phone card */}
                <a
                  href="tel:+9779803033781"
                  className="group flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-muted/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground/70">
                      Phone Number
                    </p>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      +977 9803033781
                    </p>
                  </div>
                </a>

                {/* Location card */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-border/40 bg-muted/20">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-muted-foreground/70">
                      Location
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      Pasikot, Kathmandu, Nepal
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels Pills */}
              <div className="pt-4 border-t border-border/40">
                <span className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground/70 block mb-3">
                  Connect &amp; Social Channels
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "GitHub", url: "https://github.com/Sachit0-0", icon: Github },
                    { name: "LinkedIn", url: "https://www.linkedin.com/in/sachit-dahal-59a05b212/", icon: Linkedin },
                    { name: "Email", url: "mailto:sachitdahal33@gmail.com", icon: Mail },
                  ].map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono text-foreground/90 bg-muted/40 border border-border/40 hover:border-primary/40 hover:text-primary transition-all duration-300 shadow-sm group"
                      >
                        <IconComponent className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span>{social.name}</span>
                        <ArrowUpRight className="w-3 h-3 text-muted-foreground/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollFadeIn>

          {/* Right — Glass Contact Form */}
          <ScrollFadeIn delay={0.25} y={30}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="p-8 sm:p-10 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md shadow-2xl space-y-6"
            >
              <h3 className="text-xl font-bold tracking-tight text-foreground">
                Send a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs uppercase font-mono tracking-wider text-muted-foreground block"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-300 text-sm font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs uppercase font-mono tracking-wider text-muted-foreground block"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-300 text-sm font-sans"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-xs uppercase font-mono tracking-wider text-muted-foreground block"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  placeholder="Project inquiry or Framer plugin development"
                  className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-300 text-sm font-sans"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-xs uppercase font-mono tracking-wider text-muted-foreground block"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell me about your project timeline and requirements..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-300 resize-none text-sm font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
}
