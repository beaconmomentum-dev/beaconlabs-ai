/**
 * GrowthBlueprint — Beacon Labs
 * Sales page for the $997 AI Growth Blueprint offer.
 * Matches the CTA page in the Signal Check PDF report.
 */

import { ExternalLink, CheckCircle, ArrowRight } from "lucide-react";

const STRIPE_LINK = "https://buy.stripe.com/cNibJ1e2M46m0XT45m2400n";

const deliverables = [
  {
    title: "1-on-1 Strategic Review",
    desc: "A Beacon Labs strategist walks through every Signal Check finding in detail.",
  },
  {
    title: "Custom Growth Roadmap",
    desc: "Prioritized actions, timelines, and expected impact built for your specific business.",
  },
  {
    title: "Competitive Deep-Dive",
    desc: "Full analysis of your top competitors' strategies, creatives, and positioning.",
  },
  {
    title: "AEO Implementation Plan",
    desc: "Step-by-step instructions to optimize your brand for AI-driven search.",
  },
  {
    title: "90-Day Action Plan",
    desc: "Clear milestones and KPIs to track your progress.",
  },
];

export default function GrowthBlueprint() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white flex flex-col">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      {/* Navbar placeholder — consistent with site */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10">
        <a href="/" className="flex items-center gap-2">
          <span className="text-[#00e5cc] font-bold text-lg tracking-widest uppercase">
            Beacon Labs
          </span>
        </a>
        <a
          href="/audit"
          className="text-sm text-white/60 hover:text-[#00e5cc] transition-colors"
        >
          Get Your Free Signal Check →
        </a>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <p className="text-[#00e5cc] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          The Next Step
        </p>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl">
          Our AI Has Done Its Job.{" "}
          <br className="hidden md:block" />
          Now It's Time for{" "}
          <span className="text-[#00e5cc]">Human Strategy.</span>
        </h1>

        <p className="text-white/70 text-lg max-w-xl mb-12">
          The Signal Check revealed the data. The{" "}
          <strong className="text-white">Growth Blueprint</strong> is where our
          team turns that data into a custom, actionable plan built specifically
          for your business.
        </p>

        {/* Deliverables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full mb-14 text-left">
          {deliverables.map((item) => (
            <div
              key={item.title}
              className="flex gap-3 bg-white/5 border border-white/10 rounded-lg p-4"
            >
              <CheckCircle className="text-[#00e5cc] shrink-0 mt-0.5" size={18} />
              <div>
                <p className="font-semibold text-white text-sm">{item.title}</p>
                <p className="text-white/60 text-sm mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-6xl font-bold text-[#00e5cc]">$997</p>
          <p className="text-white/50 text-sm -mt-2">
            Fully credited toward any future engagement with Beacon Labs
          </p>

          <a
            href={STRIPE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-[#00e5cc] hover:bg-[#00c4ae] text-[#0a0f1e] font-bold text-base px-10 py-4 rounded-lg transition-colors"
          >
            Unlock Your Growth Blueprint
            <ArrowRight size={18} />
          </a>

          <p className="text-white/30 text-xs mt-2">
            Secure checkout via Stripe · 100% satisfaction guarantee
          </p>
        </div>

        {/* Footer note */}
        <p className="mt-16 text-white/20 text-xs">
          Beacon Labs · AI Infrastructure Engineering · beaconlabs.ai
        </p>
      </main>
    </div>
  );
}
