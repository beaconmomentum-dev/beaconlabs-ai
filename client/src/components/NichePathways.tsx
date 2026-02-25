/*
 * NichePathways — Blueprint Aesthetic
 * Three-path navigation section on the homepage.
 * Routes visitors to E-Commerce, Coaches, or Other Industries.
 * Each pathway has a distinct accent color per design preference.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ShoppingCart, BookOpen, Building2 } from "lucide-react";

const pathways = [
  {
    icon: ShoppingCart,
    title: "E-Commerce & DTC Brands",
    description:
      "We help you build a resilient, data-driven brand that customers love and return to. Lower your CPA, scale your winners, and build a predictable growth engine — so you can focus on creating.",
    href: "/ecommerce",
    cta: "See E-Commerce Solutions",
    accentBg: "bg-[oklch(0.45_0.09_185/0.08)]",
    accentBorder: "border-[oklch(0.45_0.09_185/0.2)] hover:border-[oklch(0.45_0.09_185/0.5)]",
    accentIcon: "text-[oklch(0.45_0.09_185)]",
    accentIconBg: "bg-[oklch(0.45_0.09_185/0.12)]",
    accentText: "text-[oklch(0.40_0.08_185)]",
  },
  {
    icon: BookOpen,
    title: "Coaches & Consultants",
    description:
      "We help you cut through the noise and build a client acquisition system that is both predictable and authentic. Our systems find and connect you with the people who need your expertise the most.",
    href: "/coaches",
    cta: "See Coaching Solutions",
    accentBg: "bg-[oklch(0.75_0.14_85/0.06)]",
    accentBorder: "border-[oklch(0.75_0.14_85/0.25)] hover:border-[oklch(0.75_0.14_85/0.6)]",
    accentIcon: "text-[oklch(0.65_0.14_85)]",
    accentIconBg: "bg-[oklch(0.75_0.14_85/0.12)]",
    accentText: "text-[oklch(0.55_0.12_85)]",
  },
  {
    icon: Building2,
    title: "Other Industries",
    description:
      "Our principles of building robust, data-driven systems apply across industries. If you believe your business could be more efficient and visible, let's have a conversation.",
    href: "/audit",
    cta: "Get a Free Signal Check",
    accentBg: "bg-[oklch(0.55_0.10_280/0.05)]",
    accentBorder: "border-[oklch(0.55_0.10_280/0.15)] hover:border-[oklch(0.55_0.10_280/0.4)]",
    accentIcon: "text-[oklch(0.50_0.10_280)]",
    accentIconBg: "bg-[oklch(0.55_0.10_280/0.10)]",
    accentText: "text-[oklch(0.45_0.10_280)]",
  },
];

export default function NichePathways() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 blueprint-grid opacity-40" />

      <div className="relative container">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
            <span className="section-label">Find Your Path</span>
            <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-[2.75rem] leading-tight text-[oklch(0.16_0.03_240)]"
          >
            AI Advertising, Engineered for Your Industry
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[oklch(0.45_0.03_240)] mt-3 max-w-2xl mx-auto text-lg"
          >
            Every business is different. We act as your guide, building specialized
            solutions for the industries where AI delivers the highest impact.
          </motion.p>
        </div>

        {/* Pathway cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {pathways.map((pathway, i) => (
            <motion.a
              key={pathway.title}
              href={pathway.href}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
              className={`group relative rounded-sm overflow-hidden border transition-all duration-400 hover:shadow-xl hover:-translate-y-1 ${pathway.accentBorder} ${pathway.accentBg}`}
            >
              <div className="p-6 lg:p-8 h-full flex flex-col">
                <div
                  className={`w-12 h-12 rounded-sm ${pathway.accentIconBg} flex items-center justify-center mb-5`}
                >
                  <pathway.icon size={22} className={pathway.accentIcon} />
                </div>

                <h3 className="font-sans text-xl font-semibold text-[oklch(0.16_0.03_240)] mb-3">
                  {pathway.title}
                </h3>

                <p className="text-sm text-[oklch(0.40_0.03_240)] leading-relaxed mb-6 flex-1">
                  {pathway.description}
                </p>

                <span
                  className={`inline-flex items-center gap-2 font-mono text-xs tracking-[0.1em] uppercase ${pathway.accentText} group-hover:gap-3 transition-all duration-300`}
                >
                  {pathway.cta}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>

              {/* Hover corner accent */}
              <div className="absolute top-0 right-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`absolute top-0 right-0 w-full h-px ${pathway.accentIcon === "text-[oklch(0.45_0.09_185)]" ? "bg-[oklch(0.45_0.09_185/0.4)]" : pathway.accentIcon === "text-[oklch(0.65_0.14_85)]" ? "bg-[oklch(0.75_0.14_85/0.4)]" : "bg-[oklch(0.55_0.10_280/0.4)]"}`} />
                <div className={`absolute top-0 right-0 w-px h-full ${pathway.accentIcon === "text-[oklch(0.45_0.09_185)]" ? "bg-[oklch(0.45_0.09_185/0.4)]" : pathway.accentIcon === "text-[oklch(0.65_0.14_85)]" ? "bg-[oklch(0.75_0.14_85/0.4)]" : "bg-[oklch(0.55_0.10_280/0.4)]"}`} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
