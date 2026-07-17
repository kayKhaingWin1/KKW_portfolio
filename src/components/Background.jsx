import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown, Code2, Sparkles, Layers } from "lucide-react";
import GlassSurface from "./GlassSurface";
import Ferrofluid from "./fx/Ferrofluid";
import ScrollReveal from "./fx/ScrollReveal";
import BlurText from "./fx/BlurText";
import { useTheme } from "../context/theme";

const tags = [
  { label: "Frontend", icon: Code2 },
  { label: "UI / UX", icon: Sparkles },
  { label: "Full-stack", icon: Layers },
];

function TiltCard({ children, disabled }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-40, 40], [8, -8]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-8, 8]), { stiffness: 300, damping: 20 });

  if (disabled) return children;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const { theme } = useTheme();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const isDark = theme === "dark";

  return (
    <section
      id="home"
      className="relative snap-start flex min-h-[100dvh] w-full items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Ferrofluid
          paused={reduceMotion}
          colors={isDark ? ["#F4D98A", "#D4AF37", "#9C7A17"] : ["#B8860B", "#9C7A17", "#7A5C10"]}
          mixBlendMode={isDark ? undefined : "multiply"}
          opacity={isDark ? 0.85 : 0.5}
          speed={0.4}
          scale={1.4}
          mouseInteraction
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#f5f5f7] via-[#f5f5f7]/65 to-transparent dark:from-[#050507] dark:via-[#050507]/55 dark:to-transparent" />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] sm:text-6xl lg:text-7xl">
            <BlurText text="Kay Khaing Win" />
          </h1>
          <p className="mt-3 text-xl font-medium text-gold-600 dark:text-gold-300 sm:text-2xl">
            Frontend Developer
          </p>

          <ScrollReveal delay={0.15} className="mt-6 max-w-md">
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              I design and build interfaces for web products, from the first
              pixel to a shipped feature.
            </p>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-10 inline-block"
          >
            <GlassSurface borderRadius={999} distortionScale={-100}>
              <a
                href="/KKW_CV.pdf"
                download
                className="inline-flex items-center gap-3 whitespace-nowrap px-6 py-2.5 text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]"
              >
                Download Resume
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-400/90 text-black">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                </span>
              </a>
            </GlassSurface>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-10 right-6 z-20 hidden sm:right-10 lg:block"
      >
        <TiltCard disabled={reduceMotion}>
          <GlassSurface borderRadius={28} distortionScale={-100}>
            <div className="space-y-3 px-6 py-5">
              {tags.map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-gold-600 dark:text-gold-300" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </GlassSurface>
        </TiltCard>
      </motion.div>

      <motion.a
        href="#skills"
        aria-label="Scroll to skills"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 md:hidden"
      >
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-zinc-500 dark:border-white/10 dark:text-zinc-400"
        >
          <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
      </motion.a>
    </section>
  );
}
