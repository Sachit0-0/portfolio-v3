"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import { ScrollFadeIn } from "./ui/scroll-reveal";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  // Clipboard copy state feedback
  const [copiedType, setCopiedType] = useState<"email" | "phone" | null>(null);

  // Form interactive feedback state
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleCopy = (text: string, type: "email" | "phone", e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormState("submitting");

    // Simulate swift Apple-grade feedback & prepare direct mailto fallback
    setTimeout(() => {
      setFormState("success");
      const mailtoUrl = `mailto:sachitdahal33@gmail.com?subject=${encodeURIComponent(
        formData.subject || `Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Hi Sachit,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      )}`;
      // Open in background/new tab
      window.location.href = mailtoUrl;
    }, 600);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setFormState("idle");
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 2xl:py-48 overflow-hidden border-t border-border/40"
      ref={ref}
    >
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-[500px] 2xl:w-[800px] h-[300px] 2xl:h-[450px] bg-primary/5 blur-[120px] 2xl:blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1850px] 4xl:max-w-[2200px] mx-auto px-6 md:px-12 2xl:px-16 4xl:px-24">
        {/* Editorial Header (Consistent with Selected Work & Skills) */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest text-primary uppercase mb-4">
            <Terminal className="w-4 h-4" />
            <span>// 05 / INITIATE CONTACT</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]">
            Let's Build Together
          </h2>
          <p className="mt-6 text-base sm:text-lg 2xl:text-xl text-muted-foreground leading-relaxed">
            Based in Kathmandu, Nepal. Available for high-impact web applications, bespoke Framer canvas plugins, and engineering contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 2xl:gap-20 items-start">
          {/* Left — Contact info cards with 1-click copy */}
          <ScrollFadeIn delay={0.1} y={30}>
            <div className="p-8 sm:p-10 2xl:p-12 rounded-3xl ios-glass-card shadow-lg space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl 2xl:text-2xl font-bold tracking-tight text-foreground">
                  Direct Contact Details
                </h3>
                <span className="text-[11px] font-mono text-muted-foreground bg-muted/40 px-2.5 py-1 rounded-full border border-border/40">
                  Direct Channels
                </span>
              </div>

              <div className="space-y-4">
                {/* Email card */}
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
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
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

                {/* Phone card */}
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
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
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

                {/* Location card */}
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

              {/* Social Channels Pills */}
              <div className="pt-4 border-t border-border/40">
                <span className="text-[10px] 2xl:text-xs uppercase tracking-widest font-mono text-muted-foreground/70 block mb-3">
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
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs 2xl:text-sm font-mono text-foreground/90 bg-muted/40 border border-border/40 hover:border-primary/40 hover:text-primary transition-colors duration-200 shadow-sm group"
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

          {/* Right — Glass Contact Form with Live State Machine */}
          <ScrollFadeIn delay={0.25} y={30}>
            <div className="relative p-8 sm:p-10 2xl:p-12 rounded-3xl ios-glass-card shadow-2xl overflow-hidden min-h-[440px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                {formState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="flex flex-col items-center justify-center text-center py-8 space-y-5 my-auto"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-lg">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold tracking-tight text-foreground">
                        Message Prepared!
                      </h4>
                      <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                        Opening your default email client to send this inquiry directly to Sachit Dahal.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <a
                        href={`mailto:sachitdahal33@gmail.com?subject=${encodeURIComponent(
                          formData.subject || "Project inquiry"
                        )}&body=${encodeURIComponent(formData.message)}`}
                        className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open Mail Client</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-5 py-2.5 rounded-xl bg-muted/60 border border-border/50 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Write Another Message</span>
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
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl 2xl:text-2xl font-bold tracking-tight text-foreground">
                        Send a Message
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground">
                        Responses within 24h
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-xs 2xl:text-sm uppercase font-mono tracking-wider text-muted-foreground block"
                        >
                          Your Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jane Doe"
                          className="w-full px-4 py-3 rounded-2xl bg-background/60 border border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 text-sm 2xl:text-base font-sans"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-xs 2xl:text-sm uppercase font-mono tracking-wider text-muted-foreground block"
                        >
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jane@example.com"
                          className="w-full px-4 py-3 rounded-2xl bg-background/60 border border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 text-sm 2xl:text-base font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-xs 2xl:text-sm uppercase font-mono tracking-wider text-muted-foreground block"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Project inquiry or Framer plugin development"
                        className="w-full px-4 py-3 rounded-2xl bg-background/60 border border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 text-sm 2xl:text-base font-sans"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-xs 2xl:text-sm uppercase font-mono tracking-wider text-muted-foreground block"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your project timeline and requirements..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-2xl bg-background/60 border border-border/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/40 outline-none transition-all duration-200 resize-none text-sm 2xl:text-base font-sans"
                      />
                    </div>

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
                          <span>Preparing Message...</span>
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
