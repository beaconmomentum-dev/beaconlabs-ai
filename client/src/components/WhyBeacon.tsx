/*
 * WhyBeacon — Blueprint Aesthetic
 * "Software Reseller vs. Engineering Firm" comparison section.
 * Informed by competitive research: Myna Marketing (Nick Ponte) and
 * Tom Gaddis "Smart AI Operators" partner class.
 * Two-column layout with visual contrast and a callout quote.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check, ArrowRight, Quote } from "lucide-react";

const comparisons = [
  {
    typical: "Configures off-the-shelf tools and resells platform subscriptions",
    beacon: "Engineers custom AI systems, white-labeled under your brand — you see the results, never the tools",
  },
  {
    typical: "Sells $297/mo AI chatbots that get cloned on Fiverr",
    beacon: "Builds proprietary AI agents with custom logic that can't be replicated",
  },
  {
    typical: "Resells GEO/AEO optimization as a monthly retainer",
    beacon: "Builds autonomous AEO + GEO + SEO systems that compound without manual work",
  },
  {
    typical: "Uses templates for websites and funnels",
    beacon: "Builds full-stack web applications with custom architecture",
  },
  {
    typical: "Manual social media posting and scheduling",
    beacon: "Autonomous content pipelines: 17+ posts/day across 7+ platforms, zero manual work",
  },
  {
    typical: "Outsources video to freelancers or uses basic tools",
    beacon: "AI video production pipeline with avatar-based content at scale",
  },
  {
    typical: "Vulnerable to price wars as tools become native in platforms",
    beacon: "Delivers irreplaceable infrastructure that becomes more valuable over time",
  },
];

export default function WhyBeacon() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-30" />

      <div className="relative container" ref={ref}>
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
            <span className="section-label">The Difference</span>
            <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-[2.75rem] leading-tight text-[oklch(0.16_0.03_240)]"
          >
            Software Reseller vs. Engineering Firm
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[oklch(0.45_0.03_240)] mt-3 max-w-2xl mx-auto text-lg"
          >
            Most AI agencies configure tools and sell monthly retainers.
            When those tools become native or get undercut on price, their value disappears.
            We sit down, figure out exactly what you need, and engineer it — white-labeled, bespoke, and built to compound.
          </motion.p>
        </div>

        {/* Callout quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative p-6 md:p-8 rounded-sm bg-[oklch(0.45_0.09_185/0.05)] border border-[oklch(0.45_0.09_185/0.15)]">
            <Quote size={24} className="text-[oklch(0.75_0.14_85/0.3)] absolute top-4 left-4" />
            <p className="font-serif text-lg md:text-xl text-[oklch(0.25_0.03_240)] leading-relaxed pl-8 md:pl-10">
              "What happens when someone offers the same AI agent for half the price?
              What happens when it becomes a native feature inside the platform you're reselling?
              What happens when it gets cloned on Fiverr?"
            </p>
            <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-[oklch(0.50_0.02_240)] mt-4 pl-8 md:pl-10">
              — The question every AI agency should be asking. Our answer: build what can't be cloned.
            </p>
          </div>
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {/* Headers — hidden on mobile since cards stack with labels */}
          <div className="hidden md:grid grid-cols-2 gap-4 mb-4">
            <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[oklch(0.50_0.02_240)] px-4">
              Typical AI Agency / Software Reseller
            </div>
            <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[oklch(0.75_0.14_85)] px-4">
              Beacon Labs Engineering
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-3">
            {comparisons.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
              >
                {/* Typical */}
                <div className="flex items-start gap-3 p-4 rounded-sm bg-[oklch(0.93_0.006_80)] border border-[oklch(0.88_0.01_80)]">
                  <X size={14} className="text-[oklch(0.55_0.10_20)] mt-0.5 shrink-0" />
                  <div>
                    <span className="md:hidden font-mono text-[0.55rem] tracking-[0.15em] uppercase text-[oklch(0.55_0.10_20)] block mb-1">Typical Agency</span>
                    <span className="text-sm text-[oklch(0.45_0.03_240)]">{row.typical}</span>
                  </div>
                </div>

                {/* Beacon */}
                <div className="flex items-start gap-3 p-4 rounded-sm bg-[oklch(0.45_0.09_185/0.06)] border border-[oklch(0.45_0.09_185/0.15)]">
                  <Check size={14} className="text-[oklch(0.45_0.09_185)] mt-0.5 shrink-0" />
                  <div>
                    <span className="md:hidden font-mono text-[0.55rem] tracking-[0.15em] uppercase text-[oklch(0.45_0.09_185)] block mb-1">Beacon Labs</span>
                    <span className="text-sm text-[oklch(0.25_0.03_240)] font-medium">{row.beacon}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom insight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="max-w-3xl mx-auto mt-12 text-center"
        >
          <p className="text-sm text-[oklch(0.45_0.03_240)] leading-relaxed mb-6">
            Other agencies teach how to reframe a $297/month AI tool into a $3,000 consulting engagement.
            We don't need to reframe — our engineering starts where their consulting ends.
            You're not paying for configuration. You're investing in real infrastructure,
            built by a team with 40 years of operational discipline, guided by Navy principles, that compounds while others are still shopping for tools.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 font-mono text-sm tracking-[0.05em] uppercase px-7 py-3.5 bg-[oklch(0.40_0.08_185)] text-[oklch(0.97_0.005_80)] rounded-sm hover:bg-[oklch(0.35_0.07_185)] transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.45_0.09_185/0.3)]"
          >
            Let's Build Something That Lasts
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
