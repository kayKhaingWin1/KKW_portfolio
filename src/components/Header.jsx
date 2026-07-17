import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import GlassSurface from "./GlassSurface";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import MobileSidebar from "./MobileSidebar";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [active, setActive] = useState("#home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const root = document.getElementById("scroll-root");
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);
    if (!sections.length) return;

    // A thin band around the vertical center of the scroll container, rather than
    // "50% of the section visible" — that fails for any section taller than the
    // viewport (e.g. Projects), since it can never show half of its own height.
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (!intersecting.length) return;
        const topMost = intersecting.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b
        );
        const id = `#${topMost.target.id}`;
        setActive(id);
        if (window.location.hash !== id) {
          window.history.replaceState(null, "", id);
        }
      },
      { root, rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Logo */}
      <motion.div
        className="fixed top-5 left-5 z-50"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Logo className="drop-shadow-lg" />
      </motion.div>

      <ThemeToggle />

      {/* Apple-style floating dock (desktop) */}
      <nav
        className="fixed bottom-6 left-1/2 z-50 hidden max-w-[94vw] -translate-x-1/2 md:block"
        aria-label="Primary"
      >
        <GlassSurface borderRadius={28} distortionScale={-120}>
          <ul className="relative flex items-center gap-1 px-2 py-2">
            {navItems.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href} className="relative shrink-0">
                  {isActive && (
                    <motion.div
                      layoutId="apple-liquid-pill"
                      className="absolute inset-0 rounded-full bg-gold-500/10 ring-1 ring-gold-400/40 dark:bg-gold-500/15"
                      transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.7 }}
                    />
                  )}

                  <motion.a
                    href={item.href}
                    onClick={() => setActive(item.href)}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                    className={`relative z-20 block whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium tracking-wide sm:px-4 sm:text-sm ${
                      isActive
                        ? "text-gold-600 dark:text-gold-300"
                        : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    }`}
                  >
                    {item.name}
                  </motion.a>
                </li>
              );
            })}
          </ul>
        </GlassSurface>
      </nav>

      {/* Menu / close toggle (mobile) */}
      <motion.button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        className="fixed bottom-6 right-6 z-50 md:hidden"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <GlassSurface borderRadius={28} distortionScale={-120}>
          <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.span
                key={mobileOpen ? "close" : "menu"}
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 520, damping: 28 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5 text-[#1D1D1F] dark:text-[#F5F5F7]" strokeWidth={1.5} />
                ) : (
                  <Menu className="h-5 w-5 text-[#1D1D1F] dark:text-[#F5F5F7]" strokeWidth={1.5} />
                )}
              </motion.span>
            </AnimatePresence>
          </span>
        </GlassSurface>
      </motion.button>

      <MobileSidebar
        items={navItems}
        active={active}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavigate={(href) => {
          setActive(href);
          setMobileOpen(false);
        }}
      />
    </>
  );
}
