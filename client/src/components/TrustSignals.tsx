/*
 * TrustSignals — Blueprint Aesthetic
 * Horizontal strip with key metrics and trust indicators.
 * Sits between hero and services as a credibility bridge.
 * Dark teal background with gold metric highlights.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const signals = [
  { metric: "6", label: "Brands Built & Operated", suffix: "" },
  { metric: "50", label: "AI Systems Deployed", suffix: "+" },
  { metric: "40", label: "Of Consumers Now Use AI Search", suffix: "%" },
  { metric: "17", label: "Daily Automated Posts", suffix: "+" },
  { metric: "24", label: "Hour Response Time", suffix: "hr" },
];

export default function TrustSignals() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="relative bg-[#1a3d3f] py-12 md:py-16">
      <div className="container" ref={ref}>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 md:gap-x-16">
          {signals.map((signal, i) => (
            <motion.div
              key={signal.label}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-mono text-3xl md:text-4xl font-medium text-[oklch(0.75_0.14_85)]">
                {signal.metric}
                <span className="text-lg">{signal.suffix}</span>
              </div>
              <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.55_0.03_185)] mt-1">
                {signal.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
