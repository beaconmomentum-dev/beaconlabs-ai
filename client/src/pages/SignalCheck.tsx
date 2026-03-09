/*
 * Signal Check Landing Page — Coffy Clone Funnel
 * AI Visibility Score request form.
 * Collects business info, submits to /api/signal-check, shows confirmation.
 * Linked from GHL comment-trigger DM (SIGNAL keyword).
 */
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import {
  ArrowRight,
  Check,
  Zap,
  Search,
  BarChart3,
  Brain,
  Send,
  Building2,
  Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const benefits = [
  {
    icon: Brain,
    title: "AI Search Visibility Score",
    description:
      "We run your business through the top AI platforms — ChatGPT, Gemini, Perplexity, and Claude — and score how often and how accurately you appear when potential customers ask for what you offer.",
  },
  {
    icon: Search,
    title: "Competitor Comparison",
    description:
      "See exactly how your AI visibility stacks up against your top 3 competitors. Know who's winning the AI search game in your market — and why.",
  },
  {
    icon: BarChart3,
    title: "Gap Analysis",
    description:
      "A clear breakdown of the specific infrastructure gaps preventing AI platforms from recommending your business, with prioritized action items.",
  },
  {
    icon: Zap,
    title: "Delivered in 24 Hours",
    description:
      "Your branded Signal Check report lands in your inbox within one business day. No sales call required to receive it.",
  },
  {
    icon: Globe,
    title: "Platform Dependency Assessment",
    description:
      "We map how much of your business's visibility and revenue depends on platforms you do not control — and show you exactly where your exposure is in the current environment.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Submit Your Business Info",
    description: "Tell us your business name, website, and what you do. Takes 90 seconds.",
  },
  {
    step: "02",
    title: "We Run the AI Scan",
    description:
      "Our system queries ChatGPT, Gemini, Perplexity, and Claude with the exact prompts your customers are using to find businesses like yours.",
  },
  {
    step: "03",
    title: "Score + Gap Analysis Generated",
    description:
      "You receive a 0–100 AI Visibility Score with a detailed breakdown of what's working, what's missing, and what to fix first.",
  },
  {
    step: "04",
    title: "Your Report, Free",
    description:
      "A branded PDF report delivered to your inbox. If your score reveals significant gaps, we'll show you exactly how to fix them.",
  },
];

const industries = [
  "E-Commerce / DTC Brand",
  "Coach / Consultant",
  "Course Creator",
  "SaaS / Software",
  "Local Service Business",
  "Restaurant / Food & Beverage",
  "Health & Wellness",
  "Real Estate",
  "Professional Services",
  "Other",
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  website: string;
  industry: string;
  description: string;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  businessName: "",
  website: "",
  industry: "",
  description: "",
};

export default function SignalCheck() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: "-100px" });

  // Extract reel keyword from URL params (set by GHL DM link)
  const reelKeyword = new URLSearchParams(window.location.search).get("src")?.toUpperCase() || "";

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.businessName) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    setError(null);

    // Fire Meta Pixel Lead event
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "Signal Check",
        content_category: "AI Visibility",
      });
    }

    try {
      const apiBase =
        import.meta.env.VITE_API_BASE_URL ||
        (window.location.hostname === "localhost" ? "http://localhost:3005" : "");

      const res = await fetch(`${apiBase}/api/signal-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, reelKeyword }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error ${res.status}`);
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg text-center"
          >
            <div className="w-20 h-20 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-[#00d4ff]" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Signal Check Submitted</h1>
            <p className="text-gray-400 text-lg mb-6">
              We're running your AI visibility scan now. Your Signal Check report will be in your
              inbox within{" "}
              <span className="text-white font-semibold">24 hours</span>.
            </p>
            <p className="text-gray-500 text-sm">
              Check your spam folder if you don't see it. The report comes from{" "}
              <span className="text-gray-400">reports@beaconlabs.ai</span>
            </p>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative pt-28 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00d4ff]/5 via-transparent to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            No Cost. No Obligation. Just Clarity.
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            When Everything Is Shifting,{" "}
            <span className="text-[#00d4ff]">Clarity Is the Competitive Advantage</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            The Beacon Signal Check tells you exactly what in your business is built to hold — and
            what is exposed to the disruption happening right now. 15 minutes. No sales pitch.
            No obligation. Just a clear read on your signal.
          </p>
          <a
            href="#signal-check-form"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00d4ff] text-black font-bold rounded-lg hover:bg-[#00b8d9] transition-colors text-lg"
          >
            Get My Signal Check — No Cost
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What You'll Receive</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            A direct assessment of your business's current positioning, visibility, and stability —
            not a generic checklist, but a real scan of what is working, what is missing, and where
            your exposure is in a market that is changing faster than most advisory frameworks can track.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-white/10 bg-white/5 hover:border-[#00d4ff]/30 transition-colors"
              >
                <b.icon className="w-8 h-8 text-[#00d4ff] mb-4" />
                <h3 className="text-lg font-semibold mb-2">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="text-4xl font-bold text-[#00d4ff]/20 leading-none mt-1 min-w-[3rem]">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="signal-check-form" ref={formRef} className="py-20 px-6 bg-[#0f0f0f]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={formInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Run Your Signal Check</h2>
            <p className="text-gray-400">
              No credit card. No sales call. A clear read on what you are standing on —
              delivered within 24 hours.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  First Name <span className="text-[#00d4ff]">*</span>
                </label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                  placeholder="First"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Last Name <span className="text-[#00d4ff]">*</span>
                </label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                  placeholder="Last"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email Address <span className="text-[#00d4ff]">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                placeholder="you@yourbusiness.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Business Name <span className="text-[#00d4ff]">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                  placeholder="Your Business Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Website
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  name="website"
                  type="url"
                  value={form.website}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
                  placeholder="https://yourbusiness.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Industry
              </label>
              <select
                name="industry"
                value={form.industry}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#00d4ff]/50 transition-colors appearance-none"
              >
                <option value="" className="bg-[#1a1a1a]">Select your industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind} className="bg-[#1a1a1a]">
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                What do customers search for when looking for a business like yours?
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00d4ff]/50 transition-colors resize-none"
                placeholder="e.g. 'business coach for entrepreneurs', 'best coffee shop in Austin', 'online fitness programs for women over 40'"
              />
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#00d4ff] text-black font-bold rounded-lg hover:bg-[#00b8d9] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-lg"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Run My Signal Check
                </>
              )}
            </button>

            <p className="text-center text-gray-500 text-xs">
              No cost. No credit card. No obligation. Your report delivered within 24 hours.
            </p>
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
