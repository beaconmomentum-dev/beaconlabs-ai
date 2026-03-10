/**
 * BlueprintThankYou — Beacon Labs
 * Post-purchase confirmation + intake form for the AI Growth Blueprint.
 * Shown after successful Stripe payment.
 */

import { useEffect, useState } from "react";
import { CheckCircle, ChevronRight, Loader2 } from "lucide-react";

const BLUEPRINT_VIDEO_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/hYOjhOBSPIKYEzKC.mp4";

const INTAKE_ENDPOINT = "/api/blueprint/intake";

type FormData = {
  // Section 1 — Business Foundation
  website: string;
  industry: string;
  yearsInBusiness: string;
  monthlyRevenue: string;
  teamSize: string;
  // Section 2 — Marketing & Visibility
  marketingChannels: string[];
  runsAds: string;
  adBudget: string;
  hasContentStrategy: string;
  howCustomersFind: string;
  // Section 3 — AI Visibility Awareness
  aeoAwareness: string;
  searchedInAI: string;
  aiSearchFindings: string;
  hasGoogleBusiness: string;
  hasStructuredData: string;
  // Section 4 — Goals & Priorities
  primaryGoal: string;
  biggestObstacle: string;
  idealCustomer: string;
  competitor1: string;
  competitor2: string;
  competitor3: string;
  priorityOffer: string;
  // Section 5 — Session Logistics
  sessionEmail: string;
  timezone: string;
  additionalNotes: string;
};

const INITIAL: FormData = {
  website: "",
  industry: "",
  yearsInBusiness: "",
  monthlyRevenue: "",
  teamSize: "",
  marketingChannels: [],
  runsAds: "",
  adBudget: "",
  hasContentStrategy: "",
  howCustomersFind: "",
  aeoAwareness: "",
  searchedInAI: "",
  aiSearchFindings: "",
  hasGoogleBusiness: "",
  hasStructuredData: "",
  primaryGoal: "",
  biggestObstacle: "",
  idealCustomer: "",
  competitor1: "",
  competitor2: "",
  competitor3: "",
  priorityOffer: "",
  sessionEmail: "",
  timezone: "",
  additionalNotes: "",
};

const CHANNEL_OPTIONS = [
  "SEO / Organic Search",
  "Google Ads",
  "Meta Ads (Facebook / Instagram)",
  "Email Marketing",
  "Social Media (Organic)",
  "Referrals / Word of Mouth",
  "Content Marketing (Blog / Video / Podcast)",
  "None currently",
];

const TIMEZONES = [
  "Eastern (ET)",
  "Central (CT)",
  "Mountain (MT)",
  "Pacific (PT)",
  "Alaska (AKT)",
  "Hawaii (HT)",
  "GMT / UTC",
  "CET (Europe)",
  "IST (India)",
  "AEST (Australia)",
  "Other",
];

function SectionHeader({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-[#00e5cc] text-xs font-semibold tracking-[0.3em] uppercase mb-1">
        Section {number}
      </p>
      <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
      <p className="text-white/50 text-sm">{subtitle}</p>
    </div>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-white/80 mb-1.5">
      {children}
      {required && <span className="text-[#00e5cc] ml-1">*</span>}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00e5cc]/50 focus:bg-white/8 transition-colors"
    />
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00e5cc]/50 transition-colors appearance-none"
      style={{ colorScheme: "dark" }}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((o) => (
        <option key={o} value={o} className="bg-[#0d1b2e]">
          {o}
        </option>
      ))}
    </select>
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00e5cc]/50 transition-colors resize-none"
    />
  );
}

function RadioGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            value === o.value
              ? "bg-[#00e5cc]/15 border-[#00e5cc]/60 text-[#00e5cc]"
              : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function CheckboxGroup({
  values,
  onChange,
  options,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  options: string[];
}) {
  const toggle = (opt: string) => {
    if (values.includes(opt)) {
      onChange(values.filter((v) => v !== opt));
    } else {
      onChange([...values, opt]);
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => toggle(o)}
          className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
            values.includes(o)
              ? "bg-[#00e5cc]/15 border-[#00e5cc]/60 text-[#00e5cc]"
              : "bg-white/5 border-white/10 text-white/60 hover:border-white/30"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Divider() {
  return <div className="border-t border-white/8 my-10" />;
}

export default function BlueprintThankYou() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const order = params.get("order");
    const email = params.get("email");
    if (order) setOrderId(order);
    if (email) {
      setCustomerEmail(email);
      setForm((f) => ({ ...f, sessionEmail: email }));
    }
  }, []);

  const set = (key: keyof FormData) => (value: string | string[]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.primaryGoal.trim() || !form.sessionEmail.trim()) {
      setError("Please complete the required fields (marked with ✦) before submitting.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(INTAKE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, orderId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] text-white flex flex-col">
        <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
        <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10">
          <a href="/" className="text-[#00e5cc] font-bold text-lg tracking-widest uppercase">
            Beacon Labs
          </a>
        </nav>
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#00e5cc]/15 border border-[#00e5cc]/30 mb-8">
            <CheckCircle className="text-[#00e5cc]" size={40} />
          </div>
          <p className="text-[#00e5cc] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Intake Complete
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-2xl">
            You're all set.{" "}
            <span className="text-[#00e5cc]">We'll be in touch shortly.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mb-10">
            Your strategist will review your intake before your session so every minute is spent
            on your plan — not on background questions.
          </p>
          <p className="text-white/30 text-sm">
            Questions? Reply to your confirmation email or reach us at{" "}
            <a href="mailto:bob@beaconlabs.ai" className="text-[#00e5cc] underline">
              bob@beaconlabs.ai
            </a>
          </p>
          <p className="mt-16 text-white/20 text-xs">
            Beacon Labs · AI Infrastructure Engineering · beaconlabs.ai
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white flex flex-col">
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10">
        <a href="/" className="text-[#00e5cc] font-bold text-lg tracking-widest uppercase">
          Beacon Labs
        </a>
      </nav>

      <main className="relative z-10 flex-1 px-6 py-16 max-w-3xl mx-auto w-full">
        {/* ── Confirmation Banner ── */}
        <div className="flex items-center gap-4 bg-[#00e5cc]/8 border border-[#00e5cc]/20 rounded-xl px-6 py-5 mb-12">
          <CheckCircle className="text-[#00e5cc] shrink-0" size={28} />
          <div>
            <p className="font-semibold text-white text-sm">
              Payment confirmed — welcome to the AI Growth Blueprint.
            </p>
            {orderId && (
              <p className="text-white/30 text-xs font-mono mt-0.5">
                Order: {orderId}
              </p>
            )}
          </div>
        </div>

        {/* ── Explainer Video ── */}
        <div className="mb-12">
          <p className="text-[#00e5cc] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Watch First
          </p>
          <h2 className="text-2xl font-bold text-white mb-2">
            Here's exactly what happens next.
          </h2>
          <p className="text-white/50 text-sm mb-6">
            Before you fill out the intake below, watch this short video. It explains what your
            strategist will do with your answers and what to expect in your session.
          </p>
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black aspect-video">
            <video
              src={BLUEPRINT_VIDEO_URL}
              controls
              playsInline
              className="w-full h-full object-cover"
              poster=""
            />
          </div>
        </div>

        <Divider />

        {/* ── Intake Form ── */}
        <div className="mb-8">
          <p className="text-[#d4a72d] text-xs font-semibold tracking-[0.3em] uppercase mb-2">
            Strategy Intake
          </p>
          <h2 className="text-3xl font-bold text-white mb-3">
            Let's build your plan.
          </h2>
          <p className="text-white/50 text-sm max-w-xl">
            This takes about 3 minutes. Your strategist reviews every answer before your session
            so the entire hour is spent on your custom 90-day roadmap — not on background
            questions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* ── Section 1: Business Foundation ── */}
          <div>
            <SectionHeader
              number="01"
              title="Business Foundation"
              subtitle="Confirms what we know and fills in the gaps the Signal Check couldn't capture."
            />
            <div className="space-y-5">
              <div>
                <Label>Primary business website</Label>
                <Input
                  value={form.website}
                  onChange={set("website")}
                  placeholder="https://yourwebsite.com"
                  type="url"
                />
              </div>
              <div>
                <Label>Industry or niche</Label>
                <Input
                  value={form.industry}
                  onChange={set("industry")}
                  placeholder="e.g. E-Commerce, SaaS, Professional Services, Real Estate…"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <Label>Years in business</Label>
                  <Select
                    value={form.yearsInBusiness}
                    onChange={set("yearsInBusiness")}
                    placeholder="Select…"
                    options={["Less than 1 year", "1–3 years", "3–7 years", "7+ years"]}
                  />
                </div>
                <div>
                  <Label>Monthly revenue range</Label>
                  <Select
                    value={form.monthlyRevenue}
                    onChange={set("monthlyRevenue")}
                    placeholder="Select…"
                    options={[
                      "Under $10K",
                      "$10K – $50K",
                      "$50K – $250K",
                      "$250K – $1M",
                      "$1M+",
                    ]}
                  />
                </div>
                <div>
                  <Label>Team size</Label>
                  <Select
                    value={form.teamSize}
                    onChange={set("teamSize")}
                    placeholder="Select…"
                    options={["Solo / Founder only", "2–5 people", "6–20 people", "20+ people"]}
                  />
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* ── Section 2: Marketing & Visibility ── */}
          <div>
            <SectionHeader
              number="02"
              title="Current Marketing & Visibility"
              subtitle="Identifies what's already in motion so we build on it, not around it."
            />
            <div className="space-y-5">
              <div>
                <Label>Which marketing channels are you currently active on?</Label>
                <CheckboxGroup
                  values={form.marketingChannels}
                  onChange={(v) => setForm((f) => ({ ...f, marketingChannels: v }))}
                  options={CHANNEL_OPTIONS}
                />
              </div>
              <div>
                <Label>Are you currently running paid advertising?</Label>
                <RadioGroup
                  value={form.runsAds}
                  onChange={set("runsAds")}
                  options={[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                    { label: "Paused / Testing", value: "paused" },
                  ]}
                />
              </div>
              {form.runsAds === "yes" && (
                <div>
                  <Label>Approximate monthly ad spend</Label>
                  <Select
                    value={form.adBudget}
                    onChange={set("adBudget")}
                    placeholder="Select…"
                    options={[
                      "Under $1K / mo",
                      "$1K – $5K / mo",
                      "$5K – $20K / mo",
                      "$20K – $100K / mo",
                      "$100K+ / mo",
                    ]}
                  />
                </div>
              )}
              <div>
                <Label>Do you have an existing content strategy (blog, video, podcast)?</Label>
                <RadioGroup
                  value={form.hasContentStrategy}
                  onChange={set("hasContentStrategy")}
                  options={[
                    { label: "Yes, active", value: "yes" },
                    { label: "In progress", value: "in-progress" },
                    { label: "No", value: "no" },
                  ]}
                />
              </div>
              <div>
                <Label>How are customers currently finding you?</Label>
                <Textarea
                  value={form.howCustomersFind}
                  onChange={set("howCustomersFind")}
                  placeholder="e.g. Mostly Google search, some referrals, a little from Instagram…"
                />
              </div>
            </div>
          </div>

          <Divider />

          {/* ── Section 3: AI Visibility Awareness ── */}
          <div>
            <SectionHeader
              number="03"
              title="AI Visibility & AEO Awareness"
              subtitle="Gauges your starting point so your session doesn't talk over or under you."
            />
            <div className="space-y-5">
              <div>
                <Label>Before receiving your Signal Check, were you aware of AI-driven search (AEO)?</Label>
                <RadioGroup
                  value={form.aeoAwareness}
                  onChange={set("aeoAwareness")}
                  options={[
                    { label: "Yes, familiar with it", value: "yes" },
                    { label: "Had heard of it", value: "heard" },
                    { label: "No, first I've heard of it", value: "no" },
                  ]}
                />
              </div>
              <div>
                <Label>Have you ever searched for your business or products in ChatGPT or Perplexity?</Label>
                <RadioGroup
                  value={form.searchedInAI}
                  onChange={set("searchedInAI")}
                  options={[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                  ]}
                />
              </div>
              {form.searchedInAI === "yes" && (
                <div>
                  <Label>What did you find?</Label>
                  <Textarea
                    value={form.aiSearchFindings}
                    onChange={set("aiSearchFindings")}
                    placeholder="What did ChatGPT or Perplexity say about your business or products?"
                  />
                </div>
              )}
              <div>
                <Label>Do you have a Google Business Profile?</Label>
                <RadioGroup
                  value={form.hasGoogleBusiness}
                  onChange={set("hasGoogleBusiness")}
                  options={[
                    { label: "Yes, claimed & active", value: "yes" },
                    { label: "Yes, but not maintained", value: "inactive" },
                    { label: "No", value: "no" },
                    { label: "Not sure", value: "unsure" },
                  ]}
                />
              </div>
              <div>
                <Label>
                  Have you claimed your brand on AI data sources (Wikipedia, Wikidata, schema.org)?
                </Label>
                <RadioGroup
                  value={form.hasStructuredData}
                  onChange={set("hasStructuredData")}
                  options={[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                    { label: "Not sure", value: "unsure" },
                  ]}
                />
              </div>
            </div>
          </div>

          <Divider />

          {/* ── Section 4: Goals & Priorities ── */}
          <div>
            <SectionHeader
              number="04"
              title="Goals & Priorities"
              subtitle="The most important section. This defines what success looks like — and anchors your entire 90-day roadmap."
            />
            <div className="space-y-5">
              <div>
                <Label required>
                  What is your single most important business goal for the next 90 days?
                </Label>
                <Textarea
                  value={form.primaryGoal}
                  onChange={set("primaryGoal")}
                  placeholder="Be specific. e.g. 'Increase organic traffic by 40%', 'Launch a new product line', 'Close 10 enterprise clients'…"
                  rows={3}
                />
              </div>
              <div>
                <Label>What is the biggest obstacle standing between you and that goal right now?</Label>
                <Textarea
                  value={form.biggestObstacle}
                  onChange={set("biggestObstacle")}
                  placeholder="Be honest — this is where your strategist will focus first."
                  rows={3}
                />
              </div>
              <div>
                <Label>Who is your ideal customer? (describe them briefly)</Label>
                <Textarea
                  value={form.idealCustomer}
                  onChange={set("idealCustomer")}
                  placeholder="e.g. 'B2B SaaS founders with 10–50 employees who are scaling their first sales team'…"
                  rows={2}
                />
              </div>
              <div>
                <Label>Who are your top competitors? (up to 3)</Label>
                <div className="space-y-2">
                  <Input
                    value={form.competitor1}
                    onChange={set("competitor1")}
                    placeholder="Competitor 1 — name or website"
                  />
                  <Input
                    value={form.competitor2}
                    onChange={set("competitor2")}
                    placeholder="Competitor 2 — name or website"
                  />
                  <Input
                    value={form.competitor3}
                    onChange={set("competitor3")}
                    placeholder="Competitor 3 — name or website"
                  />
                </div>
              </div>
              <div>
                <Label>
                  Is there a specific product, service, or offer you want to prioritize in this plan?
                </Label>
                <Textarea
                  value={form.priorityOffer}
                  onChange={set("priorityOffer")}
                  placeholder="e.g. 'Our enterprise tier', 'The new product line launching in Q2', 'Our flagship service'…"
                  rows={2}
                />
              </div>
            </div>
          </div>

          <Divider />

          {/* ── Section 5: Session Logistics ── */}
          <div>
            <SectionHeader
              number="05"
              title="Session Logistics"
              subtitle="Gets you booked and sets expectations before your strategy session."
            />
            <div className="space-y-5">
              <div>
                <Label required>Best email address for your session materials</Label>
                <Input
                  value={form.sessionEmail}
                  onChange={set("sessionEmail")}
                  placeholder="your@email.com"
                  type="email"
                />
                <p className="text-white/30 text-xs mt-1">
                  This may differ from your billing email — confirm where you want your prep
                  materials sent.
                </p>
              </div>
              <div>
                <Label>Your time zone</Label>
                <Select
                  value={form.timezone}
                  onChange={set("timezone")}
                  placeholder="Select your time zone…"
                  options={TIMEZONES}
                />
              </div>
              <div>
                <Label>
                  Is there anything specific you want to make sure we cover in the session?
                </Label>
                <Textarea
                  value={form.additionalNotes}
                  onChange={set("additionalNotes")}
                  placeholder="Any context, concerns, or topics you want on the agenda…"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* ── Error ── */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-5 py-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* ── Submit ── */}
          <div className="pt-4 pb-16">
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-3 bg-[#00e5cc] hover:bg-[#00c4ae] disabled:opacity-60 text-[#0a0f1e] font-bold text-base px-10 py-4 rounded-lg transition-colors"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting your intake…
                </>
              ) : (
                <>
                  Submit My Intake & Confirm My Session
                  <ChevronRight size={18} />
                </>
              )}
            </button>
            <p className="text-center text-white/30 text-xs mt-3">
              Your answers are sent directly to your strategist. They are never shared or sold.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
