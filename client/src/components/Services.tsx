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
  ShieldCheck,
  FlaskConical,
  Handshake,
} from "lucide-react";



const services = [
  {
    icon: Bot,
    title: "Autonomous Business Stack",
    description:
      "Your first three AI employees — deployed, tested, and running in 30 days. A custom n8n + LangChain agent stack that handles lead qualification, follow-up, scheduling, and reporting autonomously. Secured with NemoClaw enterprise governance.",
    tag: "Core Service",
    price: "$3,500",
    period: "one-time setup",
  },
  {
    icon: FlaskConical,
    title: "Scenario Rehearsal",
    description:
      "Before you launch a campaign, a product, or a message — run it through a 40-agent simulation. MiroFish-powered multi-agent modeling predicts how your target audience will actually respond, so you stop guessing and start knowing.",
    tag: "Intelligence",
    price: "$1,200",
    period: "per scenario",
  },
  {
    icon: TrendingUp,
    title: "Beacon Signal Check",
    description:
      "A comprehensive AI-powered audit of your digital presence: AEO visibility, website conversion posture, social media authority, paid ad efficiency, and competitive exposure. Delivered as a branded PDF report with a 90-day action plan.",
    tag: "Diagnostic",
    price: "$497",
    period: "one-time",
  },
  {
    icon: ShieldCheck,
    title: "NemoClaw Enterprise Deployment",
    description:
      "Bring NVIDIA's enterprise AI governance layer to your business. We implement sandboxing, role-based access controls, and full audit trails so your AI agents operate with Fortune 500 security posture — at mid-market pricing.",
    tag: "Security",
    price: "Custom",
    period: "contact us",
  },
  {
    icon: Code2,
    title: "Custom Agent Development",
    description:
      "Purpose-built AI agents that handle complex workflows: content generation, data analysis, customer service, and autonomous decision-making. Built on LangChain and CrewAI, integrated with your existing tools, white-labeled as yours.",
    tag: "Engineering",
    price: "From $5,000",
    period: "project",
  },
  {
    icon: Handshake,
    title: "VSO Technology Partner Program",
    description:
      "For veteran service organizations pursuing the VA SSG Fox Suicide Prevention Grant. We serve as your technology delivery platform — you apply, we build and operate the program. Designed for the $100K–$750K grant tier.",
    tag: "Grant Partnership",
    price: "Revenue Share",
    period: "grant-funded",
  },
  {
    icon: Globe,
    title: "Web & App Development",
    description:
      "Full-stack web applications, e-commerce platforms, and custom software built with modern frameworks. From landing pages to complex SaaS products — all built to integrate with your AI stack from day one.",
    tag: "Development",
    price: "From $2,500",
    period: "project",
  },
  {
    icon: Share2,
    title: "Social Media & Content Automation",
    description:
      "Automated content pipelines that generate, schedule, and publish across 7+ platforms. Our systems produce 17+ posts per day — zero manual work, fully autonomous. Includes Trust Hierarchy content strategy aligned to AI recommendation engines.",
    tag: "Automation",
    price: "From $1,500",
    period: "/month",
  },
  {
    icon: Video,
    title: "AI Video Production",
    description:
      "Avatar-based video content, automated ad creation, and AI-powered editing pipelines. Professional video at scale without a production crew. Includes branded bumpers, closed captions, and multi-platform formatting.",
    tag: "Media",
    price: "From $800",
    period: "per video",
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
              Built From the Inside Out
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[oklch(0.65_0.03_185)] mt-3 max-w-xl text-lg"
            >
              Every service we offer was built because we needed it ourselves. We run six brands,
              manage multi-platform ad campaigns, produce AI video content, and operate the same
              automation stacks we sell. You are not buying a consultant's theory — you are buying
              a practitioner's proven system.
            </motion.p>
          </div>
        </div>

        {/* Services Grid — full width, 3 columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
              className="group relative p-6 rounded-sm border border-[oklch(0.45_0.09_185/0.15)] bg-[oklch(0.18_0.035_185/0.5)] hover:border-[oklch(0.45_0.09_185/0.35)] hover:bg-[oklch(0.20_0.04_185/0.7)] transition-all duration-400 flex flex-col"
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
              <p className="text-sm text-[oklch(0.60_0.02_185)] leading-relaxed flex-1">
                {service.description}
              </p>

              {/* Price */}
              {(service as any).price && (
                <div className="mt-4 pt-4 border-t border-[oklch(0.45_0.09_185/0.15)]">
                  <span className="font-mono text-sm font-semibold text-[oklch(0.75_0.14_85)]">
                    {(service as any).price}
                  </span>
                  <span className="text-[oklch(0.50_0.03_185)] text-xs ml-1">
                    {(service as any).period}
                  </span>
                </div>
              )}

              {/* Hover corner accent */}
              <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-0 right-0 w-full h-px bg-[oklch(0.75_0.14_85/0.5)]" />
                <div className="absolute top-0 right-0 w-px h-full bg-[oklch(0.75_0.14_85/0.5)]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* VSO Partner CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 p-8 border border-[oklch(0.75_0.14_85/0.3)] bg-[oklch(0.75_0.14_85/0.05)]"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[oklch(0.75_0.14_85/0.7)] mb-2">
                Grant Partnership — June 12, 2026 Deadline
              </p>
              <h3 className="font-serif text-xl text-[oklch(0.95_0.005_80)] mb-2">
                VA Fox Grant: $112M Available for Veteran Suicide Prevention
              </h3>
              <p className="text-[oklch(0.60_0.02_185)] text-sm max-w-xl">
                Beacon Labs is seeking one VSO fiscal sponsor for a joint application. We write the program,
                operate the platform, and deliver outcomes. Your organization manages compliance and receives
                an administrative fee. Individual awards range from $100K to $750K.
              </p>
            </div>
            <a
              href="/downloads/Beacon_Labs_VSO_Partner_Packet.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[oklch(0.75_0.14_85)] text-[oklch(0.16_0.03_240)] font-semibold text-sm hover:bg-[oklch(0.80_0.14_85)] transition-colors"
            >
              Download Partner Packet
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
