/*
 * Audit Landing Page — Blueprint Aesthetic
 * Free Meta Ads audit request form.
 * Collects business info, submits to GHL webhook, shows confirmation.
 * Includes "Other Industries" path for non-niche visitors.
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import {
  ArrowRight,
  Check,
  Clock,
  Shield,
  BarChart3,
  Target,
  Send,
  Building2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const benefits = [
  {
    icon: BarChart3,
    title: "Full Performance Analysis",
    description:
      "AI-generated breakdown of your current Meta ad performance — spend efficiency, audience quality, creative effectiveness, and placement optimization.",
  },
  {
    icon: Target,
    title: "Competitor Intelligence",
    description:
      "We analyze what your top competitors are running on Meta — their creative strategy, messaging, and targeting approach — so you can see exactly where you stand.",
  },
  {
    icon: Clock,
    title: "Delivered in 24 Hours",
    description:
      "Our AI generates your audit in minutes. A strategist reviews it for accuracy and adds context. You receive a comprehensive, actionable report within one business day.",
  },
  {
    icon: Shield,
    title: "No Strings Attached",
    description:
      "No credit card. No obligation. No sales pressure. If the audit speaks for itself, we'll talk. If not, you still walk away with a valuable report.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Submit Your Info",
    description: "Tell us about your business and current advertising. Takes 60 seconds.",
  },
  {
    step: "02",
    title: "AI Analyzes Your Ads",
    description:
      "Our AI connects to Meta's advertising data and generates a comprehensive analysis of your campaigns and your competitors'.",
  },
  {
    step: "03",
    title: "Strategist Reviews",
    description:
      "A human strategist reviews the AI output, adds context, and ensures the recommendations are actionable and specific to your business.",
  },
  {
    step: "04",
    title: "You Get the Report",
    description:
      "A branded, professional audit report delivered to your inbox within 24 hours. Yours to keep, regardless of what you decide.",
  },
];

const industries = [
  "E-Commerce / DTC Brand",
  "Coach / Consultant",
  "Course Creator",
  "SaaS / Software",
  "Local Service Business",
  "Real Estate",
  "Health & Wellness",
  "Restaurant / Hospitality",
  "Other",
];

export default function Audit() {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const processRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: "-50px" });
  const processInView = useInView(processRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    website: "",
    industry: "",
    monthlyAdSpend: "",
    biggestChallenge: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Submit to GHL webhook
      await fetch("https://hooks.beaconmomentum.io/webhook/beacon-labs-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "beacon-labs-audit-page",
          timestamp: new Date().toISOString(),
        }),
      });
    } catch {
      // Silently handle — GHL webhook may not be configured yet
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden flex items-center pt-28 pb-16" ref={heroRef}>
        <div className="absolute inset-0 blueprint-grid opacity-50" />
        <div className="relative container">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
              <span className="section-label">Free Beacon Signal Check</span>
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-serif text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] leading-[1.08] tracking-tight text-[oklch(0.16_0.03_240)] mb-6"
            >
              Your Ads Are Telling a Story.
              <br />
              <span className="text-[oklch(0.75_0.14_85)]">Let Us Read It for You.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-[oklch(0.40_0.03_240)] leading-relaxed max-w-2xl mx-auto mb-8"
            >
              Get a comprehensive, AI-generated analysis of your Meta advertising
              performance — including what your competitors are doing differently.
              Delivered to your inbox in under 24 hours. Completely free.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {[
                "No account access needed",
                "Delivered in 24 hours",
                "100% free, no obligation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check size={14} className="text-[oklch(0.45_0.09_185)]" />
                  <span className="font-mono text-xs tracking-[0.05em] text-[oklch(0.35_0.03_240)]">
                    {item}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Explainer Section */}
      <section className="relative bg-[oklch(0.18_0.035_185)] py-16 md:py-20">
        <div className="absolute inset-0 blueprint-grid-dark opacity-20" />
        <div className="relative container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
              <span className="section-label text-[oklch(0.75_0.14_85)]">Watch the Overview</span>
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl leading-tight text-[oklch(0.95_0.005_80)]">
              See How the Beacon Signal Check Works
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-sm overflow-hidden border border-[oklch(0.45_0.09_185/0.2)] shadow-2xl"
          >
            <video
              controls
              preload="metadata"
              poster="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/vVEFXVxWAOxRzRue.jpg"
              className="w-full aspect-video bg-black"
            >
              <source src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/JmOTGYDmiIqXRajH.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative bg-[oklch(0.22_0.04_185)] py-20 md:py-28" ref={formRef}>
        <div className="absolute inset-0 blueprint-grid-dark opacity-20" />
        <div className="relative container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Benefits */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="font-serif text-2xl md:text-3xl leading-tight text-[oklch(0.95_0.005_80)] mb-8"
              >
                What You'll Receive
              </motion.h2>

              <div className="space-y-6">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 shrink-0 rounded-sm bg-[oklch(0.45_0.09_185/0.15)] flex items-center justify-center">
                      <benefit.icon size={18} className="text-[oklch(0.75_0.14_85)]" />
                    </div>
                    <div>
                      <h3 className="font-sans text-sm font-semibold text-[oklch(0.92_0.005_80)] mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-[oklch(0.55_0.02_185)] leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[oklch(0.98_0.003_80)] rounded-sm p-8 md:p-10 shadow-2xl"
            >
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[oklch(0.45_0.09_185/0.1)] flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-[oklch(0.45_0.09_185)]" />
                  </div>
                  <h3 className="font-serif text-2xl text-[oklch(0.16_0.03_240)] mb-3">
                    Audit Request Received
                  </h3>
                  <p className="text-[oklch(0.40_0.03_240)] max-w-sm mx-auto">
                    Our AI is already analyzing your advertising data. You'll receive
                    your comprehensive audit report via email within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-xl text-[oklch(0.16_0.03_240)] mb-1">
                    Request Your Free Beacon Signal Check
                  </h3>
                  <p className="text-sm text-[oklch(0.45_0.03_240)] mb-6">
                    Takes 60 seconds. No account access required.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.45_0.03_240)] mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 text-sm border border-[oklch(0.45_0.09_185/0.2)] rounded-sm bg-[oklch(0.99_0.002_80)] text-[oklch(0.16_0.03_240)] focus:outline-none focus:border-[oklch(0.45_0.09_185/0.5)] focus:ring-1 focus:ring-[oklch(0.45_0.09_185/0.2)] transition-colors"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.45_0.03_240)] mb-1.5">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 text-sm border border-[oklch(0.45_0.09_185/0.2)] rounded-sm bg-[oklch(0.99_0.002_80)] text-[oklch(0.16_0.03_240)] focus:outline-none focus:border-[oklch(0.45_0.09_185/0.5)] focus:ring-1 focus:ring-[oklch(0.45_0.09_185/0.2)] transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.45_0.03_240)] mb-1.5">
                          Business Name *
                        </label>
                        <input
                          type="text"
                          name="businessName"
                          required
                          value={formData.businessName}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 text-sm border border-[oklch(0.45_0.09_185/0.2)] rounded-sm bg-[oklch(0.99_0.002_80)] text-[oklch(0.16_0.03_240)] focus:outline-none focus:border-[oklch(0.45_0.09_185/0.5)] focus:ring-1 focus:ring-[oklch(0.45_0.09_185/0.2)] transition-colors"
                          placeholder="Acme Inc."
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.45_0.03_240)] mb-1.5">
                          Website
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 text-sm border border-[oklch(0.45_0.09_185/0.2)] rounded-sm bg-[oklch(0.99_0.002_80)] text-[oklch(0.16_0.03_240)] focus:outline-none focus:border-[oklch(0.45_0.09_185/0.5)] focus:ring-1 focus:ring-[oklch(0.45_0.09_185/0.2)] transition-colors"
                          placeholder="https://yoursite.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.45_0.03_240)] mb-1.5">
                          Industry *
                        </label>
                        <select
                          name="industry"
                          required
                          value={formData.industry}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 text-sm border border-[oklch(0.45_0.09_185/0.2)] rounded-sm bg-[oklch(0.99_0.002_80)] text-[oklch(0.16_0.03_240)] focus:outline-none focus:border-[oklch(0.45_0.09_185/0.5)] focus:ring-1 focus:ring-[oklch(0.45_0.09_185/0.2)] transition-colors"
                        >
                          <option value="">Select your industry</option>
                          {industries.map((ind) => (
                            <option key={ind} value={ind}>
                              {ind}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.45_0.03_240)] mb-1.5">
                          Monthly Ad Spend
                        </label>
                        <select
                          name="monthlyAdSpend"
                          value={formData.monthlyAdSpend}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 text-sm border border-[oklch(0.45_0.09_185/0.2)] rounded-sm bg-[oklch(0.99_0.002_80)] text-[oklch(0.16_0.03_240)] focus:outline-none focus:border-[oklch(0.45_0.09_185/0.5)] focus:ring-1 focus:ring-[oklch(0.45_0.09_185/0.2)] transition-colors"
                        >
                          <option value="">Select range</option>
                          <option value="not-yet">Not running ads yet</option>
                          <option value="under-1k">Under $1,000/mo</option>
                          <option value="1k-5k">$1,000 – $5,000/mo</option>
                          <option value="5k-15k">$5,000 – $15,000/mo</option>
                          <option value="15k-50k">$15,000 – $50,000/mo</option>
                          <option value="50k-plus">$50,000+/mo</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.45_0.03_240)] mb-1.5">
                        Biggest Advertising Challenge
                      </label>
                      <textarea
                        name="biggestChallenge"
                        rows={3}
                        value={formData.biggestChallenge}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 text-sm border border-[oklch(0.45_0.09_185/0.2)] rounded-sm bg-[oklch(0.99_0.002_80)] text-[oklch(0.16_0.03_240)] focus:outline-none focus:border-[oklch(0.45_0.09_185/0.5)] focus:ring-1 focus:ring-[oklch(0.45_0.09_185/0.2)] transition-colors resize-none"
                        placeholder="What's the #1 thing you'd fix about your current advertising?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group w-full inline-flex items-center justify-center gap-2 font-mono text-sm tracking-[0.05em] uppercase px-7 py-3.5 bg-[oklch(0.40_0.08_185)] text-[oklch(0.97_0.005_80)] rounded-sm hover:bg-[oklch(0.35_0.07_185)] transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.45_0.09_185/0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          Request My Free Signal Check
                          <Send size={14} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="font-mono text-[0.55rem] text-[oklch(0.55_0.03_240)] text-center">
                      We respect your privacy. Your information is never shared or sold.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24 md:py-32 overflow-hidden" ref={processRef}>
        <div className="absolute inset-0 blueprint-grid opacity-40" />
        <div className="relative container">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={processInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
              <span className="section-label">How It Works</span>
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-[2.75rem] leading-tight text-[oklch(0.16_0.03_240)]"
            >
              From Request to Report in 24 Hours
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="relative p-6 rounded-sm border border-[oklch(0.45_0.09_185/0.12)] bg-[oklch(0.98_0.003_80)]"
              >
                <span className="font-mono text-3xl font-medium text-[oklch(0.75_0.14_85/0.3)]">
                  {step.step}
                </span>
                <h3 className="font-sans text-base font-semibold text-[oklch(0.16_0.03_240)] mt-3 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[oklch(0.40_0.03_240)] leading-relaxed">
                  {step.description}
                </p>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight size={14} className="text-[oklch(0.75_0.14_85/0.4)]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Industries CTA */}
      <section className="relative bg-[oklch(0.96_0.005_80)] py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-12 h-12 rounded-sm bg-[oklch(0.45_0.09_185/0.1)] flex items-center justify-center mx-auto mb-6">
              <Building2 size={22} className="text-[oklch(0.45_0.09_185)]" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-[oklch(0.16_0.03_240)] mb-3">
              Don't See Your Industry?
            </h2>
            <p className="text-[oklch(0.40_0.03_240)] max-w-xl mx-auto mb-6">
              Our principles of building robust, data-driven systems apply across
              industries. If you believe your advertising could be working harder for you,
              we'd love to have a conversation. Fill out the audit form above and select
              "Other" — we'll take it from there.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.1em] uppercase px-6 py-3 border border-[oklch(0.45_0.09_185/0.3)] text-[oklch(0.35_0.07_185)] rounded-sm hover:border-[oklch(0.45_0.09_185/0.6)] hover:bg-[oklch(0.45_0.09_185/0.05)] transition-all duration-300"
            >
              Or Contact Us Directly
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
