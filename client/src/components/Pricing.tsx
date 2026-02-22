/*
 * Pricing — Blueprint Aesthetic
 * Three-tier pricing with frosted glass cards.
 * Middle tier (Digital Infrastructure) is highlighted with gold accent.
 * Technical annotations and measurement marks.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "AI Automation",
    tag: "Foundation",
    price: "$2,500",
    priceMax: "$5,000",
    period: "/month",
    description:
      "Engineered automation systems — not configured tools. Custom-built AI that qualifies leads, engages customers, and operates autonomously 24/7.",
    features: [
      "Custom AI chatbot or voice agent",
      "Lead qualification automation",
      "Review management system",
      "CRM automation & integration",
      "Appointment scheduling",
      "Monthly performance reports",
      "Email & chat support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Digital Infrastructure",
    tag: "Most Popular",
    price: "$5,000",
    priceMax: "$10,000",
    period: "/month",
    description:
      "Complete digital ecosystem engineering — custom web applications, autonomous content pipelines, and full AEO/GEO/SEO visibility systems built to compound.",
    features: [
      "Everything in AI Automation",
      "Custom web application or e-commerce store",
      "Social media automation (7+ platforms)",
      "AI content generation pipeline",
      "SEO + AEO/GEO optimization",
      "Bi-weekly strategy calls",
      "Priority support (Slack channel)",
      "Dedicated project manager",
    ],
    cta: "Book a Call",
    highlighted: true,
  },
  {
    name: "Enterprise AI",
    tag: "Full Transformation",
    price: "$10,000",
    priceMax: "$25,000",
    period: "/month",
    description:
      "End-to-end AI transformation with custom agent development, video production pipelines, and complete marketing automation — infrastructure that becomes more valuable over time.",
    features: [
      "Everything in Digital Infrastructure",
      "Custom AI agent development",
      "AI video production pipeline",
      "Multi-platform ad automation",
      "Full marketing automation",
      "Weekly strategy sessions",
      "24/7 priority support",
      "Quarterly business reviews",
      "White-label solutions available",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-40" />

      <div className="relative container" ref={ref}>
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
            <span className="section-label">Investment</span>
            <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-[2.75rem] leading-tight text-[oklch(0.16_0.03_240)]"
          >
            Engineered Solutions, Not Software Subscriptions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[oklch(0.45_0.03_240)] mt-3 max-w-2xl mx-auto text-lg"
          >
            Other agencies charge $2,500–$5,000/month just to monitor your AI search
            visibility. We engineer the systems that create it. The expertise behind our
            work commands $500K/year on the open market — you get it deployed as
            infrastructure that compounds.
          </motion.p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              className={`relative rounded-sm overflow-hidden transition-all duration-400 hover:shadow-xl hover:-translate-y-1 ${
                tier.highlighted
                  ? "border-2 border-[oklch(0.75_0.14_85/0.5)] shadow-xl"
                  : "border border-[oklch(0.45_0.09_185/0.12)] hover:border-[oklch(0.45_0.09_185/0.3)]"
              }`}
            >
              {/* Highlighted badge */}
              {tier.highlighted && (
                <div className="bg-[oklch(0.75_0.14_85)] text-[oklch(0.16_0.03_240)] font-mono text-[0.6rem] tracking-[0.2em] uppercase text-center py-1.5">
                  {tier.tag}
                </div>
              )}

              <div className={`p-6 lg:p-8 bg-[oklch(0.98_0.003_80)] h-full flex flex-col ${
                tier.highlighted ? "" : "pt-8"
              }`}>
                {/* Non-highlighted tag */}
                {!tier.highlighted && (
                  <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[oklch(0.50_0.02_240)]">
                    {tier.tag}
                  </span>
                )}

                <h3 className="font-sans text-xl font-semibold text-[oklch(0.16_0.03_240)] mt-2">
                  {tier.name}
                </h3>

                {/* Price */}
                <div className="mt-4 mb-2">
                  <span className="font-mono text-3xl font-medium text-[oklch(0.16_0.03_240)]">
                    {tier.price}
                  </span>
                  <span className="font-mono text-lg text-[oklch(0.50_0.02_240)]">
                    –{tier.priceMax}
                  </span>
                  <span className="font-mono text-sm text-[oklch(0.50_0.02_240)]">
                    {tier.period}
                  </span>
                </div>

                <p className="text-sm text-[oklch(0.45_0.03_240)] leading-relaxed mb-6">
                  {tier.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={14}
                        className={`mt-0.5 shrink-0 ${
                          tier.highlighted
                            ? "text-[oklch(0.75_0.14_85)]"
                            : "text-[oklch(0.45_0.09_185)]"
                        }`}
                      />
                      <span className="text-sm text-[oklch(0.35_0.03_240)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={`group inline-flex items-center justify-center gap-2 font-mono text-xs tracking-[0.1em] uppercase px-6 py-3 rounded-sm transition-all duration-300 ${
                    tier.highlighted
                      ? "bg-[oklch(0.40_0.08_185)] text-[oklch(0.97_0.005_80)] hover:bg-[oklch(0.35_0.07_185)] hover:shadow-[0_0_20px_oklch(0.45_0.09_185/0.3)]"
                      : "border border-[oklch(0.45_0.09_185/0.3)] text-[oklch(0.35_0.07_185)] hover:border-[oklch(0.45_0.09_185/0.6)] hover:bg-[oklch(0.45_0.09_185/0.05)]"
                  }`}
                >
                  {tier.cta}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center font-mono text-xs text-[oklch(0.50_0.02_240)] mt-10"
        >
          All plans include a one-time engineering & build phase scoped during discovery.
          You're investing in infrastructure, not subscribing to software.
        </motion.p>
      </div>
    </section>
  );
}
