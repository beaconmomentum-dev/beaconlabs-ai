/*
 * Hero — Blueprint Aesthetic
 * Dramatic diagonal split layout. Left: headline + CTA over warm canvas.
 * Right: lighthouse hero image with blueprint overlay.
 * Gold wire-frame accents, technical annotations.
 */
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Zap, Globe } from "lucide-react";

const HERO_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/tKxNRtyvM8Zgu1fmytfZDx/sandbox/BXhkVKYtT6l6H8loNhJpdd-img-1_1771628136000_na1fn_aGVyby1iYW5uZXI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdEt4TlJ0eXZNOFpndTFmbXl0ZlpEeC9zYW5kYm94L0JYaGtWS1l0VDZsNkg4bG9OaEpwZGQtaW1nLTFfMTc3MTYyODEzNjAwMF9uYTFmbl9hR1Z5YnkxaVlXNXVaWEkucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Mi3StgOw56Ednu7xP0wV1YLLK1xHKGUwCxMUFaVWoTA--8kXPGYhA1LK~k8IWxYaqruEJ021tGsEKo74DdoGXYeyX2-z8p9GL53DsKjA2E3~lhX8GA9jexeCXdbeaFZMqcm46Us9l13WrmPrdMijhcBfU21lpy5IFSgTQGtMC9B~AwowDtbuP3muSS0EfmMkTg11gbNJo-Iay~Y2HLksjMNSbp4hr26TR3EpGnxq2qF9Q~caPmJb-z9AcOOM1mrrYVT~t6snsPWFtHSjhp3y1p4Trcdo6v3kmhmR7NIU4eyGaSeiN6JJr-hRGUx32XRgNMc-cNRP9bVacPbhTYm6kA__";

const stats = [
  { icon: Cpu, value: "50+", label: "AI Systems Deployed" },
  { icon: Zap, value: "40+", label: "Years of Operational Discipline" },
  { icon: Globe, value: "6", label: "Brands Built" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-50" />

      {/* Content */}
      <div className="relative container pt-28 md:pt-36 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[70vh]">
          {/* Left: Text Content */}
          <div className="relative z-10">
            {/* Technical annotation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-px bg-[oklch(0.75_0.14_85)]" />
              <span className="section-label">AI Infrastructure Engineering</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-serif text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.05] tracking-tight text-[oklch(0.16_0.03_240)] mb-6"
            >
              Guiding The{" "}
              <span className="relative inline-block">
                <span className="text-[oklch(0.40_0.08_185)]">Way</span>
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M0 6 Q50 0 100 4 Q150 8 200 2" stroke="oklch(0.75 0.14 85)" strokeWidth="2" fill="none" />
                </svg>
              </span>
              <br />
              <em className="text-[oklch(0.75_0.14_85)] not-italic">Forward</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-[oklch(0.40_0.03_240)] leading-relaxed max-w-lg mb-10"
            >
              People aren't just searching anymore — they're asking, and AI is answering.
              We build the AI-powered infrastructure that makes your business the confident
              answer. 40 years of operational discipline, guided by Navy principles. Technology that works.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 font-mono text-sm tracking-[0.05em] uppercase px-7 py-3.5 bg-[oklch(0.40_0.08_185)] text-[oklch(0.97_0.005_80)] rounded-sm hover:bg-[oklch(0.35_0.07_185)] transition-all duration-300 hover:shadow-[0_0_30px_oklch(0.45_0.09_185/0.3)]"
              >
                Book a Discovery Call
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 font-mono text-sm tracking-[0.05em] uppercase px-7 py-3.5 border border-[oklch(0.45_0.09_185/0.3)] text-[oklch(0.35_0.07_185)] rounded-sm hover:border-[oklch(0.45_0.09_185/0.6)] hover:bg-[oklch(0.45_0.09_185/0.05)] transition-all duration-300"
              >
                See Our Philosophy
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap gap-6 sm:gap-8 mt-14 pt-8 border-t border-[oklch(0.45_0.09_185/0.15)]"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-start gap-3">
                  <stat.icon size={18} className="text-[oklch(0.75_0.14_85)] mt-0.5 shrink-0" />
                  <div>
                    <div className="font-mono text-2xl font-medium text-[oklch(0.16_0.03_240)]">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-[oklch(0.50_0.02_240)]">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Blueprint frame */}
            <div className="absolute -inset-3 border border-[oklch(0.45_0.09_185/0.15)] rounded-sm" />
            <div className="absolute -inset-6 border border-[oklch(0.45_0.09_185/0.08)] rounded-sm hidden lg:block" />

            {/* Corner annotations */}
            <div className="absolute -top-8 -right-8 font-mono text-[0.6rem] text-[oklch(0.45_0.09_185/0.5)] hidden lg:block">
              <div>REF: BL-2026-001</div>
              <div>SCALE: 1:1</div>
            </div>

            <div className="relative rounded-sm overflow-hidden shadow-2xl">
              <img
                src={HERO_IMG}
                alt="AI lighthouse beacon with digital circuit patterns"
                className="w-full h-auto object-cover aspect-[16/10]"
                loading="eager"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.16_0.03_240/0.3)] to-transparent" />
            </div>

            {/* Floating annotation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute -bottom-4 -left-4 glass-card rounded-sm px-4 py-3 shadow-lg hidden md:block"
            >
              <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.45_0.09_185)]">
                Systems Online
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-[oklch(0.65_0.20_145)] animate-pulse" />
                <span className="font-mono text-xs text-[oklch(0.30_0.04_240)]">
                  All agents operational
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom edge — smooth transition to trust signals */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-px">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path d="M0 80 L0 40 Q360 0 720 20 Q1080 40 1440 10 L1440 80 Z" fill="oklch(0.18 0.035 200)" />
        </svg>
      </div>
    </section>
  );
}
