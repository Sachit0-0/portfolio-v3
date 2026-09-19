"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  ArrowUpRight,
  Copy,
  Check,
  CheckCircle2,
  RefreshCw,
  Terminal,
  Clock,
} from "lucide-react";
import { ScrollFadeIn } from "./ui/scroll-reveal";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  /* ── Interactive State ────────────────────────────────────────────── */
  const [copiedType, setCopiedType] = useState<"email" | "phone" | null>(null);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  /* ── Live Kathmandu Time Clock ────────────────────────────────────── */
  const [ktmTime, setKtmTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kathmandu",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setKtmTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  /* ── Copy Handler ─────────────────────────────────────────────────── */
  const handleCopy = (text: string, type: "email" | "phone", e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  /* ── Validation & Submission Logic ────────────────────────────────── */
  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState("submitting");

    try {
      const formId = process.env.NEXT_PUBLIC_FORM;
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState("success");
      } else {
        alert("Failed to send message. Please try again.");
        setFormState("idle");
      }
    } catch (error) {
      alert("Connection error. Please try again.");
      setFormState("idle");
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setFormState("idle");
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 2xl:py-48 border-t border-border/40 overflow-hidden"
      ref={ref}
    >
      <div className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] mx-auto px-6 md:px-12 2xl:px-16 4xl:px-24">
        {/* Editorial Header */}
        <div className="mb-16 md:mb-24 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono tracking-widest text-primary uppercase">
              <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>// 05 / INITIATE CONTACT</span>
            </div>


          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            Let's Build Together
          </h2>
          <p className="text-base sm:text-lg 2xl:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Based in Kathmandu, Nepal. Available for high-impact web applications, bespoke Framer canvas plugins, and engineering contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 2xl:gap-20 items-start">
          {/* Left Side: Contact Cards */}
          <ScrollFadeIn delay={0.1} y={30}>
            <div className="p-8 sm:p-10 2xl:p-12 rounded-3xl ios-glass-card shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <h3 className="text-xl 2xl:text-2xl font-bold tracking-tight text-foreground">
                  Direct Channels
                </h3>
                {/* Live Kathmandu Time Widget */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-muted/30 text-xs font-mono text-muted-foreground">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  <span>KTM {ktmTime || "UTC+5:45"}</span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Email Card */}
                <div
                  onClick={() => window.open("mailto:sachitdahal33@gmail.com")}
                  className="group relative flex items-center justify-between p-4 2xl:p-5 rounded-2xl border border-border/40 bg-muted/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                      <Mail className="w-5 h-5 2xl:w-6 2xl:h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] 2xl:text-xs uppercase font-mono tracking-wider text-muted-foreground/70">
                        Primary Email
                      </p>
                      <p className="text-sm 2xl:text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        sachitdahal33@gmail.com
                      </p>
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    onClick={(e) => handleCopy("sachitdahal33@gmail.com", "email", e)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="ml-2 px-3 py-1.5 rounded-lg bg-background/80 border border-border/50 text-xs font-mono flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors shrink-0 shadow-xs"
                    title="Copy Email Address"
                  >
                    {copiedType === "email" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Phone Card */}
                <div
                  onClick={() => window.open("tel:+9779803033781")}
                  className="group relative flex items-center justify-between p-4 2xl:p-5 rounded-2xl border border-border/40 bg-muted/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                      <Phone className="w-5 h-5 2xl:w-6 2xl:h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] 2xl:text-xs uppercase font-mono tracking-wider text-muted-foreground/70">
                        Phone Number
                      </p>
                      <p className="text-sm 2xl:text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        +977 9803033781
                      </p>
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    onClick={(e) => handleCopy("+9779803033781", "phone", e)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="ml-2 px-3 py-1.5 rounded-lg bg-background/80 border border-border/50 text-xs font-mono flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors shrink-0 shadow-xs"
                    title="Copy Phone Number"
                  >
                    {copiedType === "phone" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Location Card */}
                <div className="flex items-center gap-4 p-4 2xl:p-5 rounded-2xl border border-border/40 bg-muted/20">
                  <div className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5 2xl:w-6 2xl:h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] 2xl:text-xs uppercase font-mono tracking-wider text-muted-foreground/70">
                      Location
                    </p>
                    <p className="text-sm 2xl:text-base font-semibold text-foreground">
                      Pasikot, Kathmandu, Nepal
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-border/40">
                <span className="text-[10px] 2xl:text-xs uppercase tracking-widest font-mono text-muted-foreground/70 block mb-3">
                  Social Channels
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "GitHub", url: "https://github.com/Sachit0-0", icon: Github },
                    { name: "LinkedIn", url: "https://www.linkedin.com/in/sachit-dahal-59a05b212/", icon: Linkedin },
                    { name: "Email", url: "mailto:sachitdahal33@gmail.com", icon: Mail },
                  ].map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs 2xl:text-sm font-mono text-foreground/90 bg-muted/40 border border-border/40 hover:border-primary/40 hover:text-primary transition-colors duration-200 shadow-xs group"
                      >
                        <IconComponent className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span>{social.name}</span>
                        <ArrowUpRight className="w-3 h-3 2xl:w-3.5 2xl:h-3.5 text-muted-foreground/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollFadeIn>

          {/* Right Side: Glass Contact Form */}
          <ScrollFadeIn delay={0.25} y={30}>
            <div
              className="relative p-8 sm:p-10 2xl:p-12 rounded-3xl ios-glass-card shadow-2xl min-h-[440px] flex flex-col justify-between"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="flex flex-col items-center justify-center text-center py-8 space-y-6 my-auto"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-lg">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold tracking-tight text-foreground">
                        Message Sent!
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out! Your message was delivered straight to my inbox.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-mono font-semibold text-xs flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Send Another Message</span>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    <div className="flex items-center justify-between border-b border-border/40 pb-4">
                      <h3 className="text-xl 2xl:text-2xl font-bold tracking-tight text-foreground">
                        Send a Message
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground">
                        Response within 24h
                      </span>
                    </div>

                    {/* Name & Email Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="name"
                          className="text-xs uppercase font-mono tracking-wider text-muted-foreground block"
                        >
                          Your Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: undefined });
                          }}
                          placeholder="Sachit Dahal"
                          className={`w-full px-4 py-3 rounded-2xl bg-background/60 border text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 text-sm 2xl:text-base font-sans ${errors.name
                            ? "border-destructive focus:ring-2 focus:ring-destructive/20"
                            : "border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                            }`}
                        />
                        {errors.name && (
                          <p className="text-[11px] font-mono text-destructive mt-1">↳ {errors.name}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="email"
                          className="text-xs uppercase font-mono tracking-wider text-muted-foreground block"
                        >
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({ ...errors, email: undefined });
                          }}
                          placeholder="sachitdahal33@gmail.com"
                          className={`w-full px-4 py-3 rounded-2xl bg-background/60 border text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 text-sm 2xl:text-base font-sans ${errors.email
                            ? "border-destructive focus:ring-2 focus:ring-destructive/20"
                            : "border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                            }`}
                        />
                        {errors.email && (
                          <p className="text-[11px] font-mono text-destructive mt-1">↳ {errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Subject Input */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="subject"
                        className="text-xs uppercase font-mono tracking-wider text-muted-foreground block"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Project inquiry or development works... "
                        className="w-full px-4 py-3 rounded-2xl bg-background/60 border border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 text-sm 2xl:text-base font-sans"
                      />
                    </div>

                    {/* Message Input */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="text-xs uppercase font-mono tracking-wider text-muted-foreground block"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: undefined });
                        }}
                        placeholder="Tell me about your project timeline and requirements..."
                        rows={4}
                        className={`w-full px-4 py-3 rounded-2xl bg-background/60 border text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 resize-none text-sm 2xl:text-base font-sans ${errors.message
                          ? "border-destructive focus:ring-2 focus:ring-destructive/20"
                          : "border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                          }`}
                      />
                      {errors.message && (
                        <p className="text-[11px] font-mono text-destructive mt-1">↳ {errors.message}</p>
                      )}
                    </div>

                    {/* Action Button */}
                    <motion.button
                      type="submit"
                      disabled={formState === "submitting"}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="w-full py-4 2xl:py-4.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm 2xl:text-base flex items-center justify-center gap-2 hover:bg-primary/95 hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 shadow-md cursor-pointer disabled:opacity-70 select-none"
                    >
                      {formState === "submitting" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4 2xl:w-5 2xl:h-5" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  );
}