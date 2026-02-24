/*
 * Navbar — Blueprint Aesthetic
 * Frosted glass navigation bar with teal/gold accents.
 * Instrument Serif logo, JetBrains Mono nav labels.
 * Updated with niche landing page links and Free Audit CTA.
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663026807979/QZgXcwBxIIHPndiH.png";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "E-Commerce", href: "/ecommerce" },
  { label: "Coaches", href: "/coaches" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // If it's a hash link on the home page and we're already home, scroll to it
    if (href.startsWith("/#") && location === "/") {
      const el = document.querySelector(href.replace("/", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    // Otherwise navigate normally
    window.location.href = href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.97_0.005_80/0.92)] backdrop-blur-xl shadow-[0_1px_0_oklch(0.45_0.09_185/0.15),0_4px_20px_oklch(0.16_0.03_240/0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group">
          <img
            src={LOGO_URL}
            alt="Beacon Labs"
            className="h-9 md:h-11 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg md:text-xl font-normal tracking-tight text-[oklch(0.16_0.03_240)]">
              Beacon Labs
            </span>
            <span className="hidden md:block font-mono text-[0.6rem] tracking-[0.2em] uppercase text-[oklch(0.45_0.09_185)] -mt-0.5">
              AI Infrastructure Engineering
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith("/#") && location === "/") {
                  e.preventDefault();
                  handleNavClick(link.href);
                }
              }}
              className={`font-mono text-xs tracking-[0.1em] uppercase px-4 py-2 transition-colors duration-300 relative group ${
                location === link.href
                  ? "text-[oklch(0.45_0.09_185)]"
                  : "text-[oklch(0.35_0.04_240)] hover:text-[oklch(0.45_0.09_185)]"
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px bg-[oklch(0.75_0.14_85)] transition-all duration-300 ${
                  location === link.href ? "w-3/4" : "w-0 group-hover:w-3/4"
                }`}
              />
            </a>
          ))}
          <a
            href="/audit"
            className="ml-4 font-mono text-xs tracking-[0.1em] uppercase px-5 py-2.5 bg-[oklch(0.40_0.08_185)] text-[oklch(0.97_0.005_80)] rounded-sm hover:bg-[oklch(0.35_0.07_185)] transition-all duration-300 hover:shadow-[0_0_20px_oklch(0.45_0.09_185/0.3)]"
          >
            Free Ad Audit
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[oklch(0.30_0.04_240)]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[oklch(0.97_0.005_80/0.95)] backdrop-blur-xl border-t border-[oklch(0.45_0.09_185/0.1)]"
          >
            <div className="container py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`font-mono text-sm tracking-[0.1em] uppercase px-4 py-3 rounded-sm transition-colors ${
                    location === link.href
                      ? "text-[oklch(0.45_0.09_185)] bg-[oklch(0.45_0.09_185/0.05)]"
                      : "text-[oklch(0.30_0.04_240)] hover:text-[oklch(0.45_0.09_185)] hover:bg-[oklch(0.45_0.09_185/0.05)]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/audit"
                onClick={() => setMobileOpen(false)}
                className="mt-3 font-mono text-sm tracking-[0.1em] uppercase px-4 py-3 bg-[oklch(0.40_0.08_185)] text-[oklch(0.97_0.005_80)] rounded-sm text-center"
              >
                Free Ad Audit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
