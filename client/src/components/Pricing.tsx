/*
 * Pricing — Blueprint Aesthetic
 * Two service categories with tab navigation:
 * 1. AI Infrastructure (existing 3 tiers)
 * 2. AI Advertising (new 3 tiers for ad management)
 * Technical annotations and measurement marks.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, ArrowRight, Cpu, Megaphone } from "lucide-react";

interface Tier {
  name: string;
  tag: string;
  price: string;
  priceMax: string;
  period: string;
  setupFee?: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  highlighted: boolean;
}

const infrastructureTiers: Tier[] = [
  {
    name: "AI Automation",
    tag: "Foundation",
    price: "$2,500",
    priceMax: "$5,000",
    period: "/month",
    description:
      "We start by understanding your business inside and out. Then we build your first custom AI systems — branded as yours, engineered to your specifications, and designed for long-term growth.",
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
    ctaLink: "#contact",
    highlighted: false,
  },
  {
    name: "Digital Infrastructure",
    tag: "Most Popular",
    price: "$5,000",
    priceMax: "$10,000",
    period: "/month",
    description:
      "Complete digital ecosystem engineering, tailored to your business. We build and integrate multiple systems that work together autonomously — every component white-labeled, every workflow custom-designed around how you actually operate.",
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
    ctaLink: "#contact",
    highlighted: true,
  },
  {
    name: "Enterprise AI",
    tag: "Full Transformation",
    price: "$10,000",
    priceMax: "$25,000",
    period: "/month",
    description:
      "Full-scale AI transformation with dedicated engineering resources. We embed with your team, architect enterprise-grade systems from scratch, and deliver infrastructure that becomes your competitive moat — not a vendor dependency.",
    features: [
      "Everything in Digital Infrastructure",
      "Custom AI agent development",
      "AI video production pipeline",
      "Multi-platform ad automation",
      "Full marketing automation",
      "Weekly strategy sessions",
      "24/7 priority support",
      "Quarterly business reviews",
      "Fully white-labeled under your brand",
    ],
    cta: "Contact Us",
    ctaLink: "#contact",
    highlighted: false,
  },
];

const advertisingTiers: Tier[] = [
  {
    name: "Campaign Build",
    tag: "Start Here",
    price: "$3,000",
    period: " one-time",
    description:
      "Every engagement starts here. We audit your advertising, architect your campaigns from scratch, and launch them. This one-time project fee covers everything upfront: competitive audit, campaign architecture, ad creative direction, pixel infrastructure, and launch. You pay, we build, you see results.",
    features: [
      "Free Meta Ads audit (before you pay a dime)",
      "Full competitive analysis (your ads vs. competitors)",
      "Campaign architecture & audience strategy",
      "Ad creative direction & copywriting",
      "Pixel & conversion tracking setup",
      "Campaign build, launch & initial optimization",
      "30-day post-launch performance report",
      "For ad budgets up to $5,000/mo",
      "$5,000 for ad budgets up to $25,000/mo",
    ],
    cta: "Get Your Free Audit",
    ctaLink: "/audit",
    highlighted: false,
  },
  {
    name: "Growth Retainer",
    tag: "Most Popular",
    price: "$1,500",
    period: "/month",
    setupFee: "Requires Campaign Build first",
    description:
      "After your Campaign Build is complete and results are flowing, we stay on to manage, optimize, and scale. You\u2019re not paying for management \u2014 you\u2019re paying for performance. We commit to minimum ROAS and CPA targets, backed by the same AI systems that drove $0.15 CPC and 6.33% CTR across our own brands. If we don\u2019t hit the numbers, we optimize until we do.",
    features: [
      "\u2705 Minimum 3x ROAS guarantee",
      "\u2705 CPA cap agreed at onboarding",
      "\u2705 Monthly performance benchmarks with transparent reporting",
      "$1,500/mo \u2014 up to $10,000/mo ad spend",
      "$2,500/mo \u2014 $10,000\u2013$50,000/mo ad spend",
      "Ongoing AI-managed Facebook & Instagram campaigns",
      "AI competitive intelligence (monitor competitors' ads)",
      "5 static + 2 video ad creatives per month",
      "A/B testing & creative rotation",
      "Retargeting & lookalike audience buildout",
      "Weekly optimization & strategy calls",
      "30-day out clause if benchmarks aren't met",
    ],
    cta: "Book a Strategy Call",
    ctaLink: "#contact",
    highlighted: true,
  },
  {
    name: "Full-Stack Growth",
    tag: "Maximum Scale",
    price: "$3,500",
    period: "/month",
    setupFee: "Requires Campaign Build first",
    description:
      "AI on both sides of the equation \u2014 managing your campaigns and placing you inside AI-generated responses. Multi-platform advertising with the strongest performance commitment we offer. We target 4.5x+ ROAS with hard CPA ceilings, weekly benchmarks, and quarterly proof-of-performance reviews. For brands ready to dominate, not just compete.",
    features: [
      "\u2705 Minimum 4.5x ROAS target",
      "\u2705 Hard CPA cap + cost-per-lead ceiling",
      "\u2705 Weekly performance benchmarks",
      "\u2705 Quarterly ROAS reviews with documented proof",
      "$3,500/mo \u2014 up to $50,000/mo ad spend",
      "$5,000/mo \u2014 $50,000\u2013$75,000/mo ad spend",
      "$7,500/mo \u2014 $75,000\u2013$100,000+/mo ad spend",
      "Everything in Growth Retainer",
      "Full ChatGPT Ads campaign management",
      "Multi-platform (Meta + Google + ChatGPT Ads)",
      "Custom AI agent for real-time bid optimization",
      "10+ ad creatives per month (static + video)",
      "Landing page optimization & CRO",
      "Dedicated account strategist",
      "24/7 priority support",
    ],
    cta: "Contact Us",
    ctaLink: "#contact",
    highlighted: false,
  },
];

type TabKey = "infrastructure" | "advertising";

const tabs: { key: TabKey; label: string; icon: typeof Cpu; sublabel: string }[] = [
  { key: "infrastructure", label: "AI Infrastructure", icon: Cpu, sublabel: "Build & Automate" },
  { key: "advertising", label: "AI Advertising", icon: Megaphone, sublabel: "Grow & Scale" },
];

function TierCard({ tier, index, isInView }: { tier: Tier; index: number; isInView: boolean }) {
  return (
    <motion.div
      key={tier.name}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
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

      <div
        className={`p-6 lg:p-8 bg-[oklch(0.98_0.003_80)] h-full flex flex-col ${
          tier.highlighted ? "" : "pt-8"
        }`}
      >
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
        <div className="mt-4 mb-1">
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

        {/* Setup fee */}
        {tier.setupFee && (
          <span className="font-mono text-[0.65rem] tracking-wide text-[oklch(0.55_0.08_85)] mb-2">
            + {tier.setupFee}
          </span>
        )}

        <p className="text-sm text-[oklch(0.45_0.03_240)] leading-relaxed mb-6 mt-2">
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
          href={tier.ctaLink}
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
  );
}

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<TabKey>("advertising");

  const activeTiers = activeTab === "infrastructure" ? infrastructureTiers : advertisingTiers;

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-40" />

      <div className="relative container" ref={ref}>
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
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
            Results-Driven, Not Retainer-Trapped
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[oklch(0.45_0.03_240)] mt-3 max-w-2xl mx-auto text-lg"
          >
            Two ways to work with us. Build the infrastructure that powers your business,
            or let our AI run your advertising. Most clients start with one and add the other.
          </motion.p>
        </div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center gap-4 mb-12 md:mb-16"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`group flex items-center gap-3 px-6 py-3.5 rounded-sm font-mono text-xs tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[oklch(0.40_0.08_185)] text-[oklch(0.97_0.005_80)] shadow-[0_0_20px_oklch(0.45_0.09_185/0.2)]"
                    : "border border-[oklch(0.45_0.09_185/0.2)] text-[oklch(0.45_0.03_240)] hover:border-[oklch(0.45_0.09_185/0.5)] hover:text-[oklch(0.35_0.07_185)]"
                }`}
              >
                <Icon size={16} />
                <div className="text-left">
                  <div>{tab.label}</div>
                  <div className={`text-[0.5rem] tracking-[0.15em] mt-0.5 ${
                    isActive ? "text-[oklch(0.85_0.05_80)]" : "text-[oklch(0.55_0.02_240)]"
                  }`}>
                    {tab.sublabel}
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {activeTiers.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center font-mono text-xs text-[oklch(0.50_0.02_240)] mt-10"
        >
          {activeTab === "infrastructure"
            ? "All plans include a one-time engineering & build phase scoped during discovery. You're investing in infrastructure, not subscribing to software."
            : "All advertising plans begin with a free Meta Ads audit. Ad spend is paid directly to the platforms — our fee covers strategy, management, and optimization."}
        </motion.p>
      </div>
    </section>
  );
}
