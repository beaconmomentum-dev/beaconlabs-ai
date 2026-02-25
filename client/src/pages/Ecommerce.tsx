/*
 * Ecommerce Landing Page — Blueprint Aesthetic
 * Niche-specific landing page for DTC / E-commerce brands.
 * Pain-driven headline, social proof, service breakdown, CTA to /audit.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  BarChart3,
  Target,
  TrendingUp,
  Zap,
  ShoppingCart,
  DollarSign,
  Check,
  Bot,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LOGO_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/QZgXcwBxIIHPndiH.png";

const painPoints = [
  {
    icon: DollarSign,
    title: "Rising Ad Costs, Shrinking Margins",
    description:
      "The problem isn't your product — it's the system behind it. When campaigns are managed manually, costs creep up. AI-driven optimization keeps your CPA in check and your margins healthy.",
  },
  {
    icon: Target,
    title: "Reaching the Right People",
    description:
      "Broad audiences and creative fatigue waste budget. Our AI-driven targeting finds the buyers your current setup is missing — and connects them with the products they're already looking for.",
  },
  {
    icon: BarChart3,
    title: "Clarity on Every Dollar",
    description:
      "You deserve to know exactly which creative, audience, and placement is driving real revenue. We build the reporting infrastructure that gives you that clarity.",
  },
];

const services = [
  {
    icon: Bot,
    title: "Meta Ads AI Management",
    description:
      "AI connects directly to your Meta ad account, analyzes performance in real-time, adjusts targeting, scales winners, and kills underperformers — automatically.",
    tag: "Core Service",
  },
  {
    icon: Zap,
    title: "ChatGPT Ads Placement",
    description:
      "Place your brand inside AI-generated responses. When customers ask ChatGPT for product recommendations in your category, your brand appears as the answer.",
    tag: "AI Visibility",
  },
  {
    icon: TrendingUp,
    title: "AEO + GEO Optimization",
    description:
      "Optimize your product pages and brand presence so AI search engines — ChatGPT, Gemini, Perplexity — cite your products as the recommended choice.",
    tag: "Search",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Infrastructure",
    description:
      "Custom Shopify integrations, automated email flows, abandoned cart recovery, and AI-powered product recommendations that increase AOV.",
    tag: "Development",
  },
];

const stats = [
  { value: "4.2x", label: "Average ROAS Achieved" },
  { value: "31%", label: "Average CPA Reduction" },
  { value: "6", label: "E-Commerce Brands Built" },
  { value: "24hr", label: "Audit Turnaround" },
];

const ecosystemBrands = [
  "Hollow Threads",
  "Forge Caps",
  "Beacon Momentum",
];

export default function Ecommerce() {
  const heroRef = useRef(null);
  const painRef = useRef(null);
  const servicesRef = useRef(null);
  const proofRef = useRef(null);
  const ctaRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const painInView = useInView(painRef, { once: true, margin: "-100px" });
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" });
  const proofInView = useInView(proofRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] overflow-hidden flex items-center" ref={heroRef}>
        <div className="absolute inset-0 blueprint-grid opacity-50" />
        <div className="relative container pt-28 pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-px bg-[oklch(0.75_0.14_85)]" />
              <span className="section-label">For E-Commerce & DTC Brands</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-serif text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] leading-[1.08] tracking-tight text-[oklch(0.16_0.03_240)] mb-6"
            >
              Your Brand Deserves
              <br />
              <span className="text-[oklch(0.75_0.14_85)]">Better Than Guesswork</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-[oklch(0.40_0.03_240)] leading-relaxed max-w-2xl mb-10"
            >
              You built something worth buying. We build the systems that make sure
              the right people find it. AI-powered advertising that optimizes in real-time,
              scales what works, and gives you clarity on every dollar spent.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="/audit"
                className="group inline-flex items-center gap-2 font-mono text-sm tracking-[0.05em] uppercase px-7 py-3.5 bg-[oklch(0.40_0.08_185)] text-[oklch(0.97_0.005_80)] rounded-sm hover:bg-[oklch(0.35_0.07_185)] transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.45_0.09_185/0.3)]"
              >
                Get Your Free Beacon Signal Check
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services-ecom"
                className="inline-flex items-center gap-2 font-mono text-sm tracking-[0.05em] uppercase px-7 py-3.5 border border-[oklch(0.45_0.09_185/0.3)] text-[oklch(0.35_0.07_185)] rounded-sm hover:border-[oklch(0.45_0.09_185/0.6)] hover:bg-[oklch(0.45_0.09_185/0.05)] transition-all duration-300"
              >
                See How It Works
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-px">
          <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-12 md:h-16">
            <path d="M0 80 L0 40 Q360 0 720 20 Q1080 40 1440 10 L1440 80 Z" fill="oklch(0.18 0.035 200)" />
          </svg>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative bg-[#1a3d3f] py-12 md:py-16">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 md:gap-x-16">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                className="text-center"
              >
                <div className="font-mono text-3xl md:text-4xl font-medium text-[oklch(0.75_0.14_85)]">
                  {stat.value}
                </div>
                <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.55_0.03_185)] mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="relative py-24 md:py-32 overflow-hidden" ref={painRef}>
        <div className="absolute inset-0 blueprint-grid opacity-40" />
        <div className="relative container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={painInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
              <span className="section-label">The Problem</span>
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={painInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-[2.75rem] leading-tight text-[oklch(0.16_0.03_240)]"
            >
              Common Challenges We Solve
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {painPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                animate={painInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="relative p-8 rounded-sm border border-[oklch(0.45_0.09_185/0.12)] bg-[oklch(0.98_0.003_80)] hover:border-[oklch(0.45_0.09_185/0.3)] hover:shadow-lg transition-all duration-400"
              >
                <div className="w-12 h-12 rounded-sm bg-[oklch(0.45_0.09_185/0.1)] flex items-center justify-center mb-5">
                  <point.icon size={22} className="text-[oklch(0.45_0.09_185)]" />
                </div>
                <h3 className="font-sans text-lg font-semibold text-[oklch(0.16_0.03_240)] mb-3">
                  {point.title}
                </h3>
                <p className="text-sm text-[oklch(0.40_0.03_240)] leading-relaxed">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services-ecom"
        className="relative bg-[oklch(0.22_0.04_185)] text-[oklch(0.92_0.005_80)] py-24 md:py-32"
        ref={servicesRef}
      >
        <div className="absolute inset-0 blueprint-grid-dark opacity-30" />
        <div className="relative container">
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={servicesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
              <span className="section-label text-[oklch(0.75_0.14_85)]">The Solution</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-[2.75rem] leading-tight text-[oklch(0.95_0.005_80)]"
            >
              AI on Both Sides of the Equation
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[oklch(0.65_0.03_185)] mt-3 max-w-2xl text-lg"
            >
              AI that manages your campaigns <em>and</em> places your brand inside AI
              responses. Most businesses choose one or the other. We help you build both.
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="group relative p-6 rounded-sm border border-[oklch(0.45_0.09_185/0.15)] bg-[oklch(0.18_0.035_185/0.5)] hover:border-[oklch(0.45_0.09_185/0.35)] hover:bg-[oklch(0.20_0.04_185/0.7)] transition-all duration-400"
              >
                <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[oklch(0.75_0.14_85/0.7)]">
                  {service.tag}
                </span>
                <div className="mt-3 mb-4 w-10 h-10 rounded-sm bg-[oklch(0.45_0.09_185/0.15)] flex items-center justify-center group-hover:bg-[oklch(0.45_0.09_185/0.25)] transition-colors">
                  <service.icon
                    size={20}
                    className="text-[oklch(0.65_0.08_185)] group-hover:text-[oklch(0.75_0.14_85)] transition-colors"
                  />
                </div>
                <h3 className="font-sans text-base font-semibold text-[oklch(0.92_0.005_80)] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[oklch(0.60_0.02_185)] leading-relaxed">
                  {service.description}
                </p>
                <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-0 right-0 w-full h-px bg-[oklch(0.75_0.14_85/0.5)]" />
                  <div className="absolute top-0 right-0 w-px h-full bg-[oklch(0.75_0.14_85/0.5)]" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mid-section CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center mt-12"
          >
            <a
              href="/audit"
              className="group inline-flex items-center gap-2 font-mono text-sm tracking-[0.05em] uppercase px-7 py-3.5 bg-[oklch(0.75_0.14_85)] text-[oklch(0.16_0.03_240)] rounded-sm hover:bg-[oklch(0.70_0.14_80)] transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.75_0.14_85/0.3)]"
            >
              See How This Works for Your Brand — Get a Free Signal Check
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative py-24 md:py-32 overflow-hidden" ref={proofRef}>
        <div className="absolute inset-0 blueprint-grid opacity-40" />
        <div className="relative container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={proofInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
              <span className="section-label">Proven Results</span>
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={proofInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-[2.75rem] leading-tight text-[oklch(0.16_0.03_240)]"
            >
              We Don't Just Sell This — We Use It
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={proofInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[oklch(0.45_0.03_240)] mt-3 max-w-2xl mx-auto text-lg"
            >
              Every system we offer to clients runs on our own brands first. These
              aren't theoretical results — they're from our own e-commerce operations.
            </motion.p>
          </div>

          {/* Brand logos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={proofInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {ecosystemBrands.map((brand) => (
              <div
                key={brand}
                className="px-6 py-3 rounded-sm border border-[oklch(0.45_0.09_185/0.15)] bg-[oklch(0.98_0.003_80)]"
              >
                <span className="font-mono text-sm tracking-[0.05em] text-[oklch(0.35_0.07_185)]">
                  {brand}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Proof points */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                metric: "Hollow Threads",
                detail: "E-commerce apparel brand running AI-managed Meta campaigns with automated creative testing and audience optimization.",
              },
              {
                metric: "Forge Caps",
                detail: "Custom headwear brand using AI-driven product ads across Facebook and Instagram with dynamic catalog integration.",
              },
              {
                metric: "Beacon Momentum",
                detail: "Digital education platform leveraging AI for lead generation campaigns, achieving consistent cost-per-lead targets.",
              },
            ].map((proof, i) => (
              <motion.div
                key={proof.metric}
                initial={{ opacity: 0, y: 20 }}
                animate={proofInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                className="p-6 rounded-sm border border-[oklch(0.45_0.09_185/0.12)] bg-[oklch(0.98_0.003_80)]"
              >
                <h4 className="font-sans font-semibold text-[oklch(0.16_0.03_240)] mb-2">
                  {proof.metric}
                </h4>
                <p className="text-sm text-[oklch(0.40_0.03_240)] leading-relaxed">
                  {proof.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="relative bg-[oklch(0.18_0.035_185)] text-[oklch(0.92_0.005_80)] py-24 md:py-32"
        ref={ctaRef}
      >
        <div className="absolute inset-0 blueprint-grid-dark opacity-20" />
        <div className="relative container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
              <span className="section-label text-[oklch(0.75_0.14_85)]">Take the First Step</span>
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
            </div>
            <h2 className="font-serif text-3xl md:text-[2.75rem] leading-tight text-[oklch(0.95_0.005_80)] mb-4">
              Ready to See What's Possible?
              <br />
              <span className="text-[oklch(0.75_0.14_85)]">Start With Clarity.</span>
            </h2>
            <p className="text-[oklch(0.60_0.02_185)] max-w-2xl mx-auto text-lg mb-8">
              Get a free Beacon Signal Check of your Meta ad performance. We'll show you
              exactly where opportunities exist, what's working, what isn't, and a clear
              path forward — delivered to your inbox in under 24 hours.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                "Full Meta Ads performance analysis",
                "Competitor creative & targeting breakdown",
                "Specific, actionable recommendations",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check size={14} className="text-[oklch(0.75_0.14_85)]" />
                  <span className="font-mono text-xs tracking-[0.05em] text-[oklch(0.75_0.005_80)]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="/audit"
              className="group inline-flex items-center gap-2 font-mono text-sm tracking-[0.05em] uppercase px-8 py-4 bg-[oklch(0.75_0.14_85)] text-[oklch(0.16_0.03_240)] rounded-sm hover:bg-[oklch(0.70_0.14_80)] transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.75_0.14_85/0.3)]"
            >
              Get Your Free Signal Check Now
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>

            <p className="font-mono text-xs text-[oklch(0.50_0.02_185)] mt-6">
              No obligation. No credit card. Just honest guidance.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
