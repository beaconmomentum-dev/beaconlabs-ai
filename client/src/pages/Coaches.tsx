/*
 * Coaches Landing Page — Blueprint Aesthetic
 * Niche-specific landing page for Coaches, Consultants, and Course Creators.
 * Pain-driven headline, social proof, service breakdown, CTA to /audit.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Users,
  Target,
  TrendingUp,
  Zap,
  BookOpen,
  Calendar,
  Check,
  Bot,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const painPoints = [
  {
    icon: Users,
    title: "Leads That Never Convert",
    description:
      "You're getting clicks and opt-ins, but they're the wrong people. Your funnel is attracting tire-kickers instead of clients ready to invest $3K–$25K in transformation.",
  },
  {
    icon: Calendar,
    title: "Feast or Famine Revenue",
    description:
      "One month your calendar is full, the next it's empty. Without a predictable, automated lead generation system, your income depends entirely on your last launch.",
  },
  {
    icon: Target,
    title: "Invisible to AI Search",
    description:
      "When someone asks ChatGPT or Gemini for a coach in your niche, your name doesn't come up. Your competitors who invested in AI visibility are getting those referrals instead.",
  },
];

const services = [
  {
    icon: Bot,
    title: "Meta Ads AI for Lead Gen",
    description:
      "AI connects to your Meta ad account and continuously optimizes for qualified leads — not just clicks. It learns which audiences book calls and scales those segments automatically.",
    tag: "Core Service",
  },
  {
    icon: Zap,
    title: "ChatGPT Ads Placement",
    description:
      "When potential clients ask AI for coaching recommendations in your niche, your name appears as the answer. This is the new word-of-mouth — and it's programmable.",
    tag: "AI Visibility",
  },
  {
    icon: TrendingUp,
    title: "AEO + Authority Optimization",
    description:
      "We optimize your content, website, and digital presence so AI search engines position you as the go-to authority in your space. Not just found — cited and recommended.",
    tag: "Search",
  },
  {
    icon: BookOpen,
    title: "Funnel & Automation Infrastructure",
    description:
      "Automated webinar funnels, application sequences, email nurture campaigns, and CRM workflows that turn cold traffic into booked discovery calls — without manual follow-up.",
    tag: "Automation",
  },
];

const stats = [
  { value: "47", label: "Avg. Qualified Leads / Month" },
  { value: "$23", label: "Average Cost Per Lead" },
  { value: "3.8x", label: "Average ROAS Achieved" },
  { value: "24hr", label: "Audit Turnaround" },
];

const ecosystemBrands = [
  "Beacon Momentum",
  "Hollow Threads",
  "Forge Caps",
];

export default function Coaches() {
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
              <span className="section-label">For Coaches, Consultants & Course Creators</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-serif text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] leading-[1.08] tracking-tight text-[oklch(0.16_0.03_240)] mb-6"
            >
              Stop Chasing Clients.
              <br />
              <span className="text-[oklch(0.75_0.14_85)]">Let Them Find You.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-[oklch(0.40_0.03_240)] leading-relaxed max-w-2xl mb-10"
            >
              Your expertise changes lives — but only if the right people can find you.
              We build AI-powered advertising and visibility systems that put you in front
              of qualified prospects who are actively searching for what you offer. Predictable
              leads, predictable revenue, predictable growth.
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
                Get Your Free Ad Audit
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#services-coach"
                className="inline-flex items-center gap-2 font-mono text-sm tracking-[0.05em] uppercase px-7 py-3.5 border border-[oklch(0.45_0.09_185/0.3)] text-[oklch(0.35_0.07_185)] rounded-sm hover:border-[oklch(0.45_0.09_185/0.6)] hover:bg-[oklch(0.45_0.09_185/0.05)] transition-all duration-300"
              >
                See How It Works
              </a>
            </motion.div>
          </div>
        </div>

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
              Talent Alone Doesn't Fill Your Calendar
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
        id="services-coach"
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
              Your Authority, Amplified by AI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[oklch(0.65_0.03_185)] mt-3 max-w-2xl text-lg"
            >
              AI that fills your pipeline <em>and</em> positions you as the authority
              in your niche. We build the systems that make your expertise discoverable,
              your ads profitable, and your calendar full.
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
              See How This Works for Your Practice — Get a Free Audit
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
              <span className="section-label">Built on Experience</span>
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={proofInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-[2.75rem] leading-tight text-[oklch(0.16_0.03_240)]"
            >
              We Built This for Ourselves First
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={proofInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[oklch(0.45_0.03_240)] mt-3 max-w-2xl mx-auto text-lg"
            >
              Beacon Momentum — our own coaching and digital education platform — runs
              on the exact same AI systems we deploy for clients. These aren't theoretical
              capabilities. They're battle-tested.
            </motion.p>
          </div>

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

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                quote:
                  "The same AI lead generation system that fills our Beacon Momentum pipeline is what we deploy for coaching clients. We don't sell theory — we sell what we use every day.",
                author: "Beacon Labs Internal Case Study",
              },
              {
                quote:
                  "Our AI-managed Meta campaigns consistently deliver qualified leads at $23 or less. The system learns and optimizes continuously — no manual intervention required.",
                author: "Beacon Momentum Performance Data",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={proofInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                className="p-6 rounded-sm border border-[oklch(0.45_0.09_185/0.12)] bg-[oklch(0.98_0.003_80)]"
              >
                <p className="text-sm text-[oklch(0.35_0.03_240)] leading-relaxed italic mb-4">
                  "{testimonial.quote}"
                </p>
                <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.45_0.09_185)]">
                  — {testimonial.author}
                </span>
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
              Free Audit: See Exactly Where Your
              <br />
              <span className="text-[oklch(0.75_0.14_85)]">Ad Budget Is Leaking</span>
            </h2>
            <p className="text-[oklch(0.60_0.02_185)] max-w-2xl mx-auto text-lg mb-8">
              We'll analyze your current Meta ad performance, show you what your
              competitors are doing differently, and give you a clear action plan to
              generate more qualified leads at a lower cost — delivered in under 24 hours.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                "Full Meta Ads performance analysis",
                "Competitor positioning breakdown",
                "Lead generation optimization plan",
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
              Get Your Free Audit Now
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>

            <p className="font-mono text-xs text-[oklch(0.50_0.02_185)] mt-6">
              Limited to 10 free audits per week to ensure quality. No obligation. No credit card.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
