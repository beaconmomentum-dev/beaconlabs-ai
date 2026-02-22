/*
 * Services — Blueprint Aesthetic
 * Dark teal background section. Six service cards in a 3x2 grid.
 * Each card has a wireframe icon that "builds" on hover.
 * Gold accents for key differentiators.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Bot,
  Code2,
  TrendingUp,
  Globe,
  Video,
  Share2,
} from "lucide-react";

const AI_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/tKxNRtyvM8Zgu1fmytfZDx/sandbox/BXhkVKYtT6l6H8loNhJpdd-img-2_1771628138000_na1fn_YWktYXV0b21hdGlvbg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdEt4TlJ0eXZNOFpndTFmbXl0ZlpEeC9zYW5kYm94L0JYaGtWS1l0VDZsNkg4bG9OaEpwZGQtaW1nLTJfMTc3MTYyODEzODAwMF9uYTFmbl9ZV2t0WVhWMGIyMWhkR2x2YmcucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=qfStQYzRevMnjFzGKzwmmuI38X6fyhUeHny-2Ed8Ug0lAZdpw4QvcZH9NjKhy3GkN6noYGRlEa4LHzLIfgt6Trku7vsjs~fJhpprbo2Z3keX5oivdPplplpmRKy7YVUlfnrptJNE0I9LY9WxiQCYrC52xBtALuVY3vOvZBYry0nybCWm4hpMRxGlkIwGZC9V5aa24xwKjjuT9kkWqpyd0jhNjm8KwbOY4mM77B6kWBFwZUqrHQWSN5OPqOJn~Hh3KEPEM-0zJK7nhPC~ponRUzRLYC1rhB3h-A2UV0g8RvBDPLl0hKkbxJheorszb4ScWIU0aA14-gXt56CxCFABhw__";

const services = [
  {
    icon: Bot,
    title: "AI Automation Systems",
    description:
      "Custom chatbots, voice agents, and lead qualification systems that work 24/7. We build the AI — not just configure someone else's tool.",
    tag: "Core Service",
  },
  {
    icon: Code2,
    title: "Custom Agent Development",
    description:
      "Purpose-built AI agents that handle complex workflows: content generation, data analysis, customer service, and autonomous decision-making.",
    tag: "Engineering",
  },
  {
    icon: TrendingUp,
    title: "AEO + GEO + SEO Optimization",
    description:
      "Go beyond traditional SEO. We optimize your business for AI search engines — ChatGPT, Gemini, Perplexity, and Google AI Overviews — so you become the cited authority, not just a search result.",
    tag: "Visibility",
  },
  {
    icon: Globe,
    title: "Web & App Development",
    description:
      "Full-stack web applications, e-commerce platforms, and custom software built with modern frameworks. From landing pages to complex SaaS products.",
    tag: "Development",
  },
  {
    icon: Share2,
    title: "Social Media & Content Automation",
    description:
      "Automated content pipelines that generate, schedule, and publish across 7+ platforms. Our systems produce 17+ posts per day — zero manual work, fully autonomous.",
    tag: "Automation",
  },
  {
    icon: Video,
    title: "AI Video Production",
    description:
      "Avatar-based video content, automated ad creation, and AI-powered editing pipelines. Professional video at scale without a production crew.",
    tag: "Content",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="relative bg-[oklch(0.22_0.04_185)] text-[oklch(0.92_0.005_80)] py-24 md:py-32"
    >
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-grid-dark opacity-30" />

      <div className="relative container" ref={ref}>
        {/* Section header */}
        <div className="flex items-start gap-8 mb-16 md:mb-20">
          <div className="hidden md:flex flex-col items-center gap-2 pt-2">
            <div className="w-px h-16 bg-[oklch(0.75_0.14_85/0.4)]" />
            <span className="font-mono text-[0.6rem] tracking-[0.2em] text-[oklch(0.75_0.14_85)] rotate-180 [writing-mode:vertical-lr]">
              SERVICES
            </span>
          </div>
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
              <span className="section-label text-[oklch(0.75_0.14_85)]">What We Build</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-[2.75rem] leading-tight text-[oklch(0.95_0.005_80)]"
            >
              Full-Stack AI Infrastructure
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[oklch(0.65_0.03_185)] mt-3 max-w-xl text-lg"
            >
              The skills behind these systems command $500K/year on the open market.
              Most agencies configure tools and resell them. We engineer custom systems
              from the ground up — tailored to your business, built to scale, and
              impossible to clone.
            </motion.p>
          </div>
        </div>

        {/* AI Automation visual + Services Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left: Featured image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-5 relative rounded-sm overflow-hidden hidden lg:block"
          >
            <img
              src={AI_IMG}
              alt="AI neural network visualization"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.22_0.04_185/0.6)] to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="glass-card-dark rounded-sm p-4">
                <div className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-[oklch(0.75_0.14_85)] mb-1">
                  Differentiator
                </div>
                <p className="text-sm text-[oklch(0.85_0.005_80)]">
                  We've been engineering AEO since before the market had a name for it.
                  When tools become native or get undercut, our systems still stand.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Service cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="group relative p-6 rounded-sm border border-[oklch(0.45_0.09_185/0.15)] bg-[oklch(0.18_0.035_185/0.5)] hover:border-[oklch(0.45_0.09_185/0.35)] hover:bg-[oklch(0.20_0.04_185/0.7)] transition-all duration-400"
              >
                {/* Tag */}
                <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[oklch(0.75_0.14_85/0.7)]">
                  {service.tag}
                </span>

                {/* Icon */}
                <div className="mt-3 mb-4 w-10 h-10 rounded-sm bg-[oklch(0.45_0.09_185/0.15)] flex items-center justify-center group-hover:bg-[oklch(0.45_0.09_185/0.25)] transition-colors">
                  <service.icon
                    size={20}
                    className="text-[oklch(0.65_0.08_185)] group-hover:text-[oklch(0.75_0.14_85)] transition-colors"
                  />
                </div>

                <h3 className="font-sans text-base font-semibold text-[oklch(0.92_0.005_80)] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[oklch(0.60_0.02_185)] leading-relaxed">
                  {service.description}
                </p>

                {/* Hover corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute top-0 right-0 w-full h-px bg-[oklch(0.75_0.14_85/0.5)]" />
                  <div className="absolute top-0 right-0 w-px h-full bg-[oklch(0.75_0.14_85/0.5)]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
