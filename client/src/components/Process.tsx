/*
 * Process — Blueprint Aesthetic
 * Four-phase build sequence with the process visualization image.
 * Each phase "constructs" as it scrolls into view.
 * Blueprint annotations and measurement marks.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Layers, Wrench, Rocket } from "lucide-react";

const PROCESS_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/tKxNRtyvM8Zgu1fmytfZDx/sandbox/BXhkVKYtT6l6H8loNhJpdd-img-5_1771628136000_na1fn_cHJvY2Vzcy1zZWN0aW9u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdEt4TlJ0eXZNOFpndTFmbXl0ZlpEeC9zYW5kYm94L0JYaGtWS1l0VDZsNkg4bG9OaEpwZGQtaW1nLTVfMTc3MTYyODEzNjAwMF9uYTFmbl9jSEp2WTJWemN5MXpaV04wYVc5dS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=g1r~~O8kVhoVGaCtZ477X5xG3YdRiBYwz2QDXO2jwjQ8zn5WY8Bv5xvSnEZCc0CiRAYmFf34CPKhcNLQIuKGFCLPLx3lbzYEOgBpnLnmOxhCzFcNePK5BGg4LpIImXDDFHtW6FfGNLfR7BDEIeW~UVdQqSjjyJZLhQ3if2XLFo1hE7lkGLcsiXips8-HL7lPpZTJfEpveWA02-pWwQ4Av9kUfX3mIhOrgT6JkZ85EDKe1K7-FotCvzYwXCs4VdfqGo~Uw3-ivSK0-1w4rIfACKXxpjCxtw3Rthf3sk5j6frs7GCVPPQL83ZtwPL7vFuoXS52BA1ZCM-vBKtBeBtdJQ__";

const phases = [
  {
    icon: Search,
    number: "01",
    title: "Discovery & Audit",
    duration: "Week 1–2",
    description:
      "We map your current operations, identify automation opportunities, and define the highest-impact systems to build first. You get a detailed blueprint before any code is written.",
    deliverables: ["Operations audit report", "Automation opportunity map", "Project blueprint & timeline"],
  },
  {
    icon: Layers,
    number: "02",
    title: "Architecture & Design",
    duration: "Week 2–3",
    description:
      "We design the system architecture, data flows, and integration points. Every component is planned for scalability, reliability, and maintainability.",
    deliverables: ["System architecture diagram", "Integration specifications", "UI/UX wireframes"],
  },
  {
    icon: Wrench,
    number: "03",
    title: "Build & Integration",
    duration: "Week 3–6",
    description:
      "Our engineers build your custom AI systems, connect them to your existing tools, and run rigorous testing. You see progress in real-time through weekly demos.",
    deliverables: ["Working AI systems", "API integrations", "Testing & QA reports"],
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch & Optimize",
    duration: "Week 6–8",
    description:
      "We deploy your systems, monitor performance, and optimize based on real data. Then we train your team and provide ongoing support to ensure lasting results.",
    deliverables: ["Production deployment", "Performance dashboard", "Team training & documentation"],
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="relative py-24 md:py-32 overflow-hidden">
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-grid opacity-40" />

      <div className="relative container" ref={ref}>
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
            <span className="section-label">How We Build</span>
            <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-[2.75rem] leading-tight text-[oklch(0.16_0.03_240)]"
          >
            From Blueprint to Production
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[oklch(0.45_0.03_240)] mt-3 max-w-2xl mx-auto text-lg"
          >
            Every project follows our proven four-phase methodology.
            No surprises, no scope creep — just systematic execution.
          </motion.p>
        </div>

        {/* Process visualization image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative rounded-sm overflow-hidden mb-16 shadow-xl border border-[oklch(0.45_0.09_185/0.1)]"
        >
          <img
            src={PROCESS_IMG}
            alt="Four-phase build process: Blueprinting, Framework, Systems Integration, Realization"
            className="w-full h-auto"
            loading="lazy"
          />
        </motion.div>

        {/* Phase cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
              className="group relative"
            >
              {/* Connection line */}
              {i < phases.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-6 h-px bg-[oklch(0.45_0.09_185/0.2)] z-10" />
              )}

              <div className="p-6 rounded-sm border border-[oklch(0.45_0.09_185/0.12)] bg-[oklch(0.98_0.003_80)] hover:border-[oklch(0.45_0.09_185/0.3)] hover:shadow-lg transition-all duration-400 h-full">
                {/* Phase number + icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-3xl font-light text-[oklch(0.45_0.09_185/0.25)]">
                    {phase.number}
                  </span>
                  <div className="w-10 h-10 rounded-sm bg-[oklch(0.45_0.09_185/0.08)] flex items-center justify-center group-hover:bg-[oklch(0.45_0.09_185/0.15)] transition-colors">
                    <phase.icon size={18} className="text-[oklch(0.45_0.09_185)]" />
                  </div>
                </div>

                <h3 className="font-sans text-lg font-semibold text-[oklch(0.16_0.03_240)] mb-1">
                  {phase.title}
                </h3>
                <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.75_0.14_85)]">
                  {phase.duration}
                </span>

                <p className="text-sm text-[oklch(0.45_0.03_240)] leading-relaxed mt-3 mb-4">
                  {phase.description}
                </p>

                {/* Deliverables */}
                <div className="border-t border-[oklch(0.45_0.09_185/0.1)] pt-3">
                  <div className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-[oklch(0.50_0.02_240)] mb-2">
                    Deliverables
                  </div>
                  <ul className="space-y-1">
                    {phase.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs text-[oklch(0.40_0.03_240)]">
                        <div className="w-1 h-1 rounded-full bg-[oklch(0.75_0.14_85)] mt-1.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
