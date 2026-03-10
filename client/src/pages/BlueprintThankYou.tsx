/**
 * BlueprintThankYou — Beacon Labs
 * Post-purchase confirmation page for the $997 AI Growth Blueprint.
 * Shown after successful Stripe payment.
 */

import { useEffect, useState } from "react";
import { CheckCircle, Calendar, Mail, ArrowRight } from "lucide-react";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/sHSWoCjyRSEGiIHNF3Hj";

export default function BlueprintThankYou() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const order = params.get("order");
    if (order) setOrderId(order);
  }, []);

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
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        {/* Success icon */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#00e5cc]/15 border border-[#00e5cc]/30 mb-8">
          <CheckCircle className="text-[#00e5cc]" size={40} />
        </div>

        <p className="text-[#00e5cc] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
          Payment Confirmed
        </p>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-2xl">
          Welcome to the{" "}
          <span className="text-[#00e5cc]">AI Growth Blueprint.</span>
        </h1>

        <p className="text-white/70 text-lg max-w-xl mb-10">
          Your payment of <strong className="text-white">$997</strong> was received
          successfully. A receipt has been sent to your email.
        </p>

        {orderId && (
          <p className="text-white/30 text-xs mb-10 font-mono">
            Order reference: {orderId}
          </p>
        )}

        {/* Next steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl w-full mb-12 text-left">
          <div className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#00e5cc]/15 shrink-0">
              <Mail className="text-[#00e5cc]" size={18} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-1">Check Your Inbox</p>
              <p className="text-white/50 text-sm">
                You'll receive a confirmation email with everything you need to
                prepare for your strategy session.
              </p>
            </div>
          </div>

          <div className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#00e5cc]/15 shrink-0">
              <Calendar className="text-[#00e5cc]" size={18} />
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-1">Book Your Session</p>
              <p className="text-white/50 text-sm">
                Schedule your 1-on-1 Strategic Review with a Beacon Labs strategist
                at a time that works for you.
              </p>
            </div>
          </div>
        </div>

        {/* Primary CTA — book the session */}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#00e5cc] hover:bg-[#00c4ae] text-[#0a0f1e] font-bold text-base px-10 py-4 rounded-lg transition-colors mb-4"
        >
          Book My Strategy Session
          <ArrowRight size={18} />
        </a>

        <p className="text-white/30 text-xs">
          Can't find a time? Reply to your confirmation email and we'll sort it out.
        </p>

        {/* Footer */}
        <p className="mt-16 text-white/20 text-xs">
          Beacon Labs · AI Infrastructure Engineering · beaconlabs.ai
        </p>
      </main>
    </div>
  );
}
