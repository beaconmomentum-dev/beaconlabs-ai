/**
 * GrowthBlueprint — Beacon Labs
 * Sales page for the $997 AI Growth Blueprint offer.
 * On-page Stripe Elements checkout — no redirect to Stripe.
 */

import { useState, useEffect } from "react";
import {
  loadStripe,
  type StripeElementsOptions,
} from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CheckCircle, ArrowRight, Lock, Shield } from "lucide-react";

const STRIPE_PK =
  "pk_live_51SOUNFE69P40ey9pGyWMNoW3zDRosxDO2Yfuffv5jrmqfCU5dY6vZsTKao0Qx2sSDIxfS02WnStt3Nu9joCSklbq00Ox5a6q1q";

const VIDEO_URL =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/bYvwGQdArIxHxIxV.mp4";

const stripePromise = loadStripe(STRIPE_PK);

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

// ─── Inner checkout form (must be inside <Elements>) ─────────────────────────
function CheckoutForm({
  firstName,
  lastName,
  email,
  businessName,
  paymentIntentId,
}: {
  firstName: string;
  lastName: string;
  email: string;
  businessName: string;
  paymentIntentId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setErrorMsg(null);

    // Confirm the payment with Stripe
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // We handle redirect ourselves — return_url is required by Stripe but
        // we intercept the success case before it fires.
        return_url: `${window.location.origin}/blueprint-thank-you`,
        receipt_email: email,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMsg(error.message ?? "Payment failed. Please try again.");
      setSubmitting(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      // Notify server to create GHL contact / opportunity
      try {
        await fetch("/api/blueprint/confirm-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
            firstName,
            lastName,
            email,
            businessName,
          }),
        });
      } catch {
        // Non-fatal — order is confirmed in Stripe regardless
      }
      // Redirect to thank-you page
      window.location.href = `/blueprint-thank-you?order=${paymentIntent.id}`;
    } else {
      setErrorMsg("Payment could not be completed. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Stripe PaymentElement — renders card, Apple Pay, Google Pay, etc. */}
      <PaymentElement
        options={{
          layout: "tabs",
          defaultValues: { billingDetails: { name: `${firstName} ${lastName}`, email } },
        }}
      />

      {errorMsg && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || submitting}
        className="w-full flex items-center justify-center gap-2 bg-[#00e5cc] hover:bg-[#00c4ae] disabled:opacity-60 disabled:cursor-not-allowed text-[#0a0f1e] font-bold text-base px-8 py-4 rounded-lg transition-colors"
      >
        {submitting ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-[#0a0f1e]/30 border-t-[#0a0f1e] rounded-full animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Lock size={16} />
            Pay $997 — Unlock My Blueprint
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-4 text-white/30 text-xs">
        <span className="flex items-center gap-1">
          <Shield size={12} /> SSL encrypted
        </span>
        <span>·</span>
        <span>Powered by Stripe</span>
        <span>·</span>
        <span>100% satisfaction guarantee</span>
      </div>
    </form>
  );
}

// ─── Contact info form (step 1 before payment) ───────────────────────────────
function ContactStep({
  onNext,
}: {
  onNext: (data: {
    firstName: string;
    lastName: string;
    email: string;
    businessName: string;
  }) => void;
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    businessName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/blueprint/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      onNext({ ...form, clientSecret: data.clientSecret } as Parameters<typeof onNext>[0] & { clientSecret: string });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#00e5cc]/60 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white/60 text-xs mb-1.5">First Name</label>
          <input
            required
            value={form.firstName}
            onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
            placeholder="Bob"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-white/60 text-xs mb-1.5">Last Name</label>
          <input
            required
            value={form.lastName}
            onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
            placeholder="Smith"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-white/60 text-xs mb-1.5">Email Address</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="you@company.com"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-white/60 text-xs mb-1.5">Business Name</label>
        <input
          value={form.businessName}
          onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
          placeholder="Acme Corp"
          className={inputClass}
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#00e5cc] hover:bg-[#00c4ae] disabled:opacity-60 text-[#0a0f1e] font-bold text-base px-8 py-4 rounded-lg transition-colors"
      >
        {loading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-[#0a0f1e]/30 border-t-[#0a0f1e] rounded-full animate-spin" />
            Preparing checkout…
          </>
        ) : (
          <>
            Continue to Payment
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </form>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function GrowthBlueprint() {
  const [step, setStep] = useState<"info" | "payment">("info");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [buyer, setBuyer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    businessName: "",
    paymentIntentId: "",
  });

  const handleContactNext = (data: {
    firstName: string;
    lastName: string;
    email: string;
    businessName: string;
    clientSecret?: string;
  }) => {
    const { clientSecret: cs, ...rest } = data as typeof data & { clientSecret?: string };
    setBuyer((b) => ({
      ...b,
      ...rest,
      paymentIntentId: cs ? cs.split("_secret_")[0] : "",
    }));
    if (cs) {
      setClientSecret(cs);
      setStep("payment");
    }
  };

  const elementsOptions: StripeElementsOptions = clientSecret
    ? {
        clientSecret,
        appearance: {
          theme: "night",
          variables: {
            colorPrimary: "#00e5cc",
            colorBackground: "#0d1829",
            colorText: "#ffffff",
            colorDanger: "#f87171",
            fontFamily: "Inter, system-ui, sans-serif",
            borderRadius: "8px",
          },
        },
      }
    : {};

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white flex flex-col">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      {/* Navbar */}
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

      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-16">
        {/* Hero */}
        <div className="text-center max-w-3xl mb-12">
          <p className="text-[#00e5cc] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            The Next Step
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Our AI Has Done Its Job.{" "}
            <br className="hidden md:block" />
            Now It's Time for{" "}
            <span className="text-[#00e5cc]">Human Strategy.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            The Signal Check revealed the data. The{" "}
            <strong className="text-white">Growth Blueprint</strong> is where our
            team turns that data into a custom, actionable plan built specifically
            for your business.
          </p>
        </div>

        {/* Video */}
        <div className="w-full max-w-2xl mb-14 rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-[#00e5cc]/10">
          <video
            src={VIDEO_URL}
            controls
            playsInline
            preload="metadata"
            className="w-full aspect-video bg-black"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Two-column layout: deliverables + checkout */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — What you get */}
          <div>
            <h2 className="text-xl font-bold mb-6 text-white">
              What's Included in Your Blueprint
            </h2>
            <div className="space-y-4 mb-8">
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
            <div className="bg-white/5 border border-white/10 rounded-lg p-5">
              <p className="text-4xl font-bold text-[#00e5cc] mb-1">$997</p>
              <p className="text-white/50 text-sm">
                Fully credited toward any future engagement with Beacon Labs
              </p>
            </div>
          </div>

          {/* Right — Checkout form */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${
                  step === "info"
                    ? "bg-[#00e5cc] text-[#0a0f1e]"
                    : "bg-[#00e5cc]/20 text-[#00e5cc]"
                }`}
              >
                {step === "payment" ? <CheckCircle size={14} /> : "1"}
              </div>
              <span className={`text-sm ${step === "info" ? "text-white" : "text-white/40"}`}>
                Your Details
              </span>
              <div className="flex-1 h-px bg-white/10" />
              <div
                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${
                  step === "payment"
                    ? "bg-[#00e5cc] text-[#0a0f1e]"
                    : "bg-white/10 text-white/30"
                }`}
              >
                2
              </div>
              <span className={`text-sm ${step === "payment" ? "text-white" : "text-white/40"}`}>
                Payment
              </span>
            </div>

            {step === "info" && <ContactStep onNext={handleContactNext} />}

            {step === "payment" && clientSecret && (
              <Elements stripe={stripePromise} options={elementsOptions}>
                <CheckoutForm
                  firstName={buyer.firstName}
                  lastName={buyer.lastName}
                  email={buyer.email}
                  businessName={buyer.businessName}
                  paymentIntentId={buyer.paymentIntentId}
                />
              </Elements>
            )}
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-16 text-white/20 text-xs">
          Beacon Labs · AI Infrastructure Engineering · beaconlabs.ai
        </p>
      </main>
    </div>
  );
}
