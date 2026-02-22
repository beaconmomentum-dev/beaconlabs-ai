/*
 * Portfolio — Blueprint Aesthetic
 * Case studies showcasing Beacon ecosystem brands.
 * "Project file" card layout with large photography and detailed annotations.
 * Alternating left/right layout for visual rhythm.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";

const ECOMMERCE_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/tKxNRtyvM8Zgu1fmytfZDx/sandbox/BXhkVKYtT6l6H8loNhJpdd-img-3_1771628147000_na1fn_Y2FzZS1zdHVkeS1lY29tbWVyY2U.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdEt4TlJ0eXZNOFpndTFmbXl0ZlpEeC9zYW5kYm94L0JYaGtWS1l0VDZsNkg4bG9OaEpwZGQtaW1nLTNfMTc3MTYyODE0NzAwMF9uYTFmbl9ZMkZ6WlMxemRIVmtlUzFsWTI5dGJXVnlZMlUucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Ne3hTBhY1m1PBp-LI~awqxaQS-waMW8MqjP2hnn3zKMOWh3VXZaG6nMRoKjzbYWzx4Pg8HSZFNkJ05~hYZ6le2uyNIky37CqiGsNTWNjKIvMxgVIEaOm78CAkIO9VpM-ds5JkXGcM2DXC63khD~N4ZhrEFz3MRKCva-IB4L3siiuPVyu8YcBjBqOjMuklHzeQD1KPK4c8GFT9KjKIuPMVU7zX96QN3ZKoHFSs-vfBpFDNQObo0B86NoyOcxmiPoypJQ7L9WPFrEO8szRJTSR-purfuk8tv9HoDd1pEGomNCcVqofIso82XUID4G1jTIca2JqNtsIA04or4w-w8cXrA__";

const COMMUNITY_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/tKxNRtyvM8Zgu1fmytfZDx/sandbox/BXhkVKYtT6l6H8loNhJpdd-img-4_1771628133000_na1fn_Y2FzZS1zdHVkeS1jb21tdW5pdHk.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdEt4TlJ0eXZNOFpndTFmbXl0ZlpEeC9zYW5kYm94L0JYaGtWS1l0VDZsNkg4bG9OaEpwZGQtaW1nLTRfMTc3MTYyODEzMzAwMF9uYTFmbl9ZMkZ6WlMxemRIVmtlUzFqYjIxdGRXNXBkSGsucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Ps2n~5ZC3FNE5u4heRiqIM8~PWnmQcG-3m5KkYw-PMV3BhUKQgce12u-TEiVJTNkNzB6veNqH~r3v~wcYz6zRGwMprX9z2wFiTjUhZWbD-Bn3X8XppPAJ44pAke2FRVpG0ha4r0WdWnvxwSnp80lhWSRJstCiQnGk45KAVpKWfWov2z8llYg0bdD7sSrB8K-E3uA1SHCUjDxV~LI6iVIOy2w0NIZ4h9zWBRmoVLWxvjSqE0sedrknRompMjimWXTsF1gWWIrsLRX84sVp166nCW0RzTSxnHJJcHQEkwfyOXMrFHDQaj9ncALwTt-S6VoJXkYkBF9nLeUhxazu~~RJA__";

const caseStudies = [
  {
    image: ECOMMERCE_IMG,
    projectId: "BL-CS-001",
    brand: "Hollow Threads & Forge Caps",
    category: "E-Commerce + AI Automation",
    title: "Full-Stack E-Commerce with Automated Content Pipeline",
    description:
      "Built two complete e-commerce brands from zero — custom Shopify-alternative storefronts, automated fulfillment, integrated payments, and an AI content pipeline that generates product descriptions, social posts, and video ads autonomously. Every system is white-labeled under the client's brand.",
    results: [
      { metric: "17+", label: "Daily automated posts" },
      { metric: "7", label: "Social platforms" },
      { metric: "0", label: "Manual content creation" },
    ],
    tags: ["Custom Storefronts", "Automated Fulfillment", "Payment Systems", "AI Content Gen", "Social Commerce", "Video Ads"],
  },
  {
    image: COMMUNITY_IMG,
    projectId: "BL-CS-002",
    brand: "Beacon Momentum",
    category: "Community Platform + AI Agents",
    title: "AI-Powered Community Ecosystem with Autonomous Mentorship",
    description:
      "Engineered a complete community platform with AI mentor agents, automated onboarding flows, integrated community channels, AI-generated video lessons with custom avatars, and a purpose-built CRM. Every touchpoint carries the client's brand — the infrastructure is invisible.",
    results: [
      { metric: "24/7", label: "AI mentor availability" },
      { metric: "50+", label: "Auto-generated lessons" },
      { metric: "3", label: "Integrated platforms" },
    ],
    tags: ["AI Mentor Agents", "Community Platform", "Video Production", "Voice Synthesis", "Custom CRM", "Automation"],
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="portfolio"
      className="relative bg-[oklch(0.22_0.04_185)] text-[oklch(0.92_0.005_80)] py-24 md:py-32"
    >
      <div className="absolute inset-0 blueprint-grid-dark opacity-20" />

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
            <span className="section-label text-[oklch(0.75_0.14_85)]">Project Files</span>
            <div className="w-8 h-px bg-[oklch(0.75_0.14_85)]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-[2.75rem] leading-tight text-[oklch(0.95_0.005_80)]"
          >
            Built, Not Bought
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[oklch(0.65_0.03_185)] mt-3 max-w-2xl mx-auto text-lg"
          >
            These aren't client testimonials — they're ecosystems we engineered from the ground up.
            Every brand below runs on infrastructure we built. No templates. No resold tools.
            Just custom systems that operate autonomously.
          </motion.p>
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.projectId}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.2 }}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                i % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="absolute -inset-2 border border-[oklch(0.45_0.09_185/0.12)] rounded-sm" />
                <div className="relative rounded-sm overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.brand}
                    className="w-full h-auto aspect-[16/10] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.03_240/0.5)] to-transparent" />
                </div>
                {/* Project ID annotation */}
                <div className="absolute -top-5 left-4 font-mono text-[0.55rem] tracking-[0.15em] text-[oklch(0.45_0.09_185/0.5)]">
                  {study.projectId}
                </div>
              </div>

              {/* Content */}
              <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[oklch(0.75_0.14_85)]">
                  {study.category}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-[oklch(0.95_0.005_80)] mt-2 mb-2">
                  {study.brand}
                </h3>
                <p className="font-sans text-base font-medium text-[oklch(0.80_0.005_80)] mb-3">
                  {study.title}
                </p>
                <p className="text-sm text-[oklch(0.60_0.02_185)] leading-relaxed mb-6">
                  {study.description}
                </p>

                {/* Results */}
                <div className="flex gap-6 mb-6">
                  {study.results.map((r) => (
                    <div key={r.label}>
                      <div className="font-mono text-2xl font-medium text-[oklch(0.75_0.14_85)]">
                        {r.metric}
                      </div>
                      <div className="font-mono text-[0.55rem] tracking-[0.1em] uppercase text-[oklch(0.55_0.02_185)]">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[0.6rem] tracking-[0.1em] uppercase px-2.5 py-1 border border-[oklch(0.45_0.09_185/0.2)] text-[oklch(0.55_0.06_185)] rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
