/*
 * Footer — Blueprint Aesthetic
 * Dark navy footer with blueprint grid, teal accents.
 * Logo, nav links, ecosystem brands, copyright.
 */

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/QZgXcwBxIIHPndiH.png";

const ecosystemBrands = [
  { name: "Beacon Momentum", url: "#" },
  { name: "Hollow Threads", url: "#" },
  { name: "Forge Caps", url: "#" },
  { name: "Cask & Cuisine", url: "#" },
  { name: "Vitality", url: "#" },
];

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[oklch(0.12_0.03_240)] text-[oklch(0.60_0.02_240)] py-16">
      <div className="absolute inset-0 blueprint-grid-dark opacity-10" />

      <div className="relative container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="Beacon Labs" className="h-10 w-auto" />
              <div>
                <span className="font-serif text-lg text-[oklch(0.90_0.005_80)]">
                  Beacon Labs
                </span>
                <div className="font-mono text-[0.55rem] tracking-[0.2em] uppercase text-[oklch(0.45_0.09_185)] -mt-0.5">
                  Guiding the Way Forward
                </div>
              </div>
            </a>
            <p className="text-sm leading-relaxed max-w-xs mt-4">
              We build the AI-powered infrastructure that makes your business
              the confident answer. Deliver results. Stand behind your word. Earn the relationship.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[oklch(0.75_0.14_85)] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-[oklch(0.85_0.005_80)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[oklch(0.75_0.14_85)] mb-4">
              Beacon Ecosystem
            </h4>
            <ul className="space-y-2">
              {ecosystemBrands.map((brand) => (
                <li key={brand.name}>
                  <span className="text-sm">
                    {brand.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[oklch(0.45_0.09_185/0.1)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[0.6rem] tracking-[0.1em] text-[oklch(0.40_0.02_240)]">
            &copy; {new Date().getFullYear()} Beacon Labs. All rights reserved.
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.1em] text-[oklch(0.40_0.02_240)]">
            Guiding the Way Forward. Always.
          </span>
        </div>
      </div>
    </footer>
  );
}
