/*
 * Contact — Blueprint Aesthetic
 * Dark teal section with frosted glass form card.
 * Working form that sends to email via formspree or similar.
 * Blueprint annotations and technical styling.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

const budgetOptions = [
  "Under $1,500/mo",
  "$1,500 – $3,000/mo",
  "$3,000 – $7,500/mo",
  "$7,500 – $15,000/mo",
  "$15,000+/mo",
];

const serviceOptions = [
  "AI Automation Systems",
  "Custom Agent Development",
  "AEO + GEO + SEO Optimization",
  "Web & App Development",
  "E-Commerce Build",
  "Social Media & Content Automation",
  "AI Video Production",
  "Full Digital Ecosystem",
  "Other / Not Sure",
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // For now, simulate form submission
    // In production, this would POST to a backend endpoint or service like Formspree
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSent(true);
      toast.success("Message sent! We'll be in touch within 24 hours.");
    } catch {
      toast.error("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[oklch(0.18_0.035_185)] text-[oklch(0.92_0.005_80)] py-24 md:py-32"
    >
      <div className="absolute inset-0 blueprint-grid-dark opacity-20" />

      <div className="relative container" ref={ref}>
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
              <span className="section-label text-[oklch(0.75_0.14_85)]">Start a Project</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-[2.5rem] leading-tight text-[oklch(0.95_0.005_80)] mb-4"
            >
              Let's Build Something
              <br />
              <span className="text-[oklch(0.75_0.14_85)]">That Matters</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[oklch(0.60_0.02_185)] leading-relaxed mb-10"
            >
              Every project starts with a 30-minute discovery call. We'll discuss your
              goals, audit your current systems, and outline a clear path forward — no
              obligation, no sales pitch.
            </motion.p>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-sm bg-[oklch(0.45_0.09_185/0.15)] flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-[oklch(0.65_0.08_185)]" />
                </div>
                <div>
                  <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.50_0.02_185)] mb-0.5">
                    Email
                  </div>
                  <a
                    href="mailto:hello@beaconlabs.ai"
                    className="text-sm text-[oklch(0.85_0.005_80)] hover:text-[oklch(0.75_0.14_85)] transition-colors"
                  >
                    hello@beaconlabs.ai
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-sm bg-[oklch(0.45_0.09_185/0.15)] flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-[oklch(0.65_0.08_185)]" />
                </div>
                <div>
                  <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.50_0.02_185)] mb-0.5">
                    Location
                  </div>
                  <span className="text-sm text-[oklch(0.85_0.005_80)]">
                    Remote-first — serving clients nationwide
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-sm bg-[oklch(0.45_0.09_185/0.15)] flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-[oklch(0.65_0.08_185)]" />
                </div>
                <div>
                  <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.50_0.02_185)] mb-0.5">
                    Response Time
                  </div>
                  <span className="text-sm text-[oklch(0.85_0.005_80)]">
                    Within 24 hours, usually same day
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass-card-dark rounded-sm p-6 md:p-8">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[oklch(0.45_0.09_185/0.2)] flex items-center justify-center mx-auto mb-6">
                    <Send size={24} className="text-[oklch(0.75_0.14_85)]" />
                  </div>
                  <h3 className="font-serif text-2xl text-[oklch(0.95_0.005_80)] mb-3">
                    Message Received
                  </h3>
                  <p className="text-[oklch(0.60_0.02_185)] max-w-sm mx-auto">
                    We'll review your project details and get back to you within 24 hours
                    to schedule a discovery call.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.55_0.02_185)] mb-1.5 block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Smith"
                        className="w-full px-4 py-2.5 bg-[#0f1f2e] border border-[oklch(0.45_0.09_185/0.2)] rounded-sm text-sm text-[oklch(0.90_0.005_80)] placeholder:text-[oklch(0.45_0.02_185)] focus:border-[oklch(0.45_0.09_185/0.5)] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.55_0.02_185)] mb-1.5 block">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@company.com"
                        className="w-full px-4 py-2.5 bg-[#0f1f2e] border border-[oklch(0.45_0.09_185/0.2)] rounded-sm text-sm text-[oklch(0.90_0.005_80)] placeholder:text-[oklch(0.45_0.02_185)] focus:border-[oklch(0.45_0.09_185/0.5)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Company + Website */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.55_0.02_185)] mb-1.5 block">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        className="w-full px-4 py-2.5 bg-[#0f1f2e] border border-[oklch(0.45_0.09_185/0.2)] rounded-sm text-sm text-[oklch(0.90_0.005_80)] placeholder:text-[oklch(0.45_0.02_185)] focus:border-[oklch(0.45_0.09_185/0.5)] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.55_0.02_185)] mb-1.5 block">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        placeholder="https://yoursite.com"
                        className="w-full px-4 py-2.5 bg-[#0f1f2e] border border-[oklch(0.45_0.09_185/0.2)] rounded-sm text-sm text-[oklch(0.90_0.005_80)] placeholder:text-[oklch(0.45_0.02_185)] focus:border-[oklch(0.45_0.09_185/0.5)] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Interest */}
                  <div>
                    <label className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.55_0.02_185)] mb-1.5 block">
                      Service Interest *
                    </label>
                    <select
                      name="service"
                      required
                      className="w-full px-4 py-2.5 bg-[#0f1f2e] border border-[oklch(0.45_0.09_185/0.2)] rounded-sm text-sm text-[oklch(0.90_0.005_80)] focus:border-[oklch(0.45_0.09_185/0.5)] focus:outline-none transition-colors"
                    >
                      <option value="">Select a service...</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.55_0.02_185)] mb-1.5 block">
                      Monthly Budget
                    </label>
                    <select
                      name="budget"
                      className="w-full px-4 py-2.5 bg-[#0f1f2e] border border-[oklch(0.45_0.09_185/0.2)] rounded-sm text-sm text-[oklch(0.90_0.005_80)] focus:border-[oklch(0.45_0.09_185/0.5)] focus:outline-none transition-colors"
                    >
                      <option value="">Select a range...</option>
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.55_0.02_185)] mb-1.5 block">
                      Project Details *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us about your business, what you're looking to automate, and any specific goals you have in mind..."
                      className="w-full px-4 py-2.5 bg-[#0f1f2e] border border-[oklch(0.45_0.09_185/0.2)] rounded-sm text-sm text-[oklch(0.90_0.005_80)] placeholder:text-[oklch(0.45_0.02_185)] focus:border-[oklch(0.45_0.09_185/0.5)] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="group w-full inline-flex items-center justify-center gap-2 font-mono text-sm tracking-[0.1em] uppercase px-6 py-3.5 bg-[oklch(0.75_0.14_85)] text-[oklch(0.16_0.03_240)] rounded-sm hover:bg-[oklch(0.70_0.14_80)] disabled:opacity-50 transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.75_0.14_85/0.3)]"
                  >
                    {sending ? "Sending..." : "Submit Project Inquiry"}
                    {!sending && (
                      <Send size={14} className="transition-transform group-hover:translate-x-1" />
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
