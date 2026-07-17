import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, Users, ListChecks, KeyRound } from "lucide-react";
import BlurText from "./fx/BlurText";

const products = [
  {
    icon: Store,
    title: "Point of Sale",
    description:
      "Point-of-sale interface for retail staff, handling order entry, inventory lookups, and receipt printing at the counter.",
  },
  {
    icon: Users,
    title: "HR System",
    description:
      "Internal HR system covering employee records, leave requests, and attendance, built for non-technical staff.",
  },
  {
    icon: ListChecks,
    title: "Task Tracker",
    description:
      "Staff ticket and task management tool for assigning work, tracking progress, and scoring performance per task.",
  },
  {
    icon: KeyRound,
    title: "License Store",
    description:
      "Storefront and admin panel for selling and managing company software licenses to external customers.",
  },
];

const AUTOPLAY_MS = 3200;
const EASE = [0.16, 1, 0.3, 1];

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 24 : -24, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -24 : 24, opacity: 0 }),
};

// Small viewfinder-style corner ticks — a quiet decorative touch that reads
// as "designed" without adding another irregular line sketch.
function CornerTicks() {
  const corners = [
    "top-3 left-3 border-t border-l",
    "top-3 right-3 border-t border-r",
    "bottom-3 left-3 border-b border-l",
    "bottom-3 right-3 border-b border-r",
  ];
  return (
    <>
      {corners.map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={`pointer-events-none absolute h-3 w-3 border-gold-400/50 dark:border-gold-300/35 ${pos}`}
        />
      ))}
    </>
  );
}

function ProjectCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef(null);
  const pausedRef = useRef(false);
  const [visible, setVisible] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % products.length);
  }, []);

  const goTo = (i) => {
    if (i === index) return;
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(container);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      if (!pausedRef.current && document.visibilityState !== "hidden") next();
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [visible, next]);

  const Icon = products[index].icon;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      className="w-full"
    >
      <div className="relative flex w-full flex-col items-center overflow-hidden rounded-[1.75rem] border border-gold-400/25 bg-gradient-to-b from-gold-500/[0.06] to-transparent px-6 py-8 text-center sm:px-8 sm:py-10 dark:border-gold-300/15 dark:from-gold-500/[0.08]">
        <CornerTicks />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[90px] dark:bg-gold-400/15" />

        <span className="relative text-xs font-medium tabular-nums text-zinc-400 dark:text-zinc-600">
          {String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
        </span>

        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: EASE }}
            className="relative mt-5 flex flex-col items-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-400/40 bg-white/60 shadow-sm sm:h-20 sm:w-20 dark:border-gold-300/30 dark:bg-white/5">
              <Icon
                className="h-7 w-7 text-gold-500 sm:h-8 sm:w-8 dark:text-gold-300"
                strokeWidth={1.5}
              />
            </div>

            <h3 className="mt-5 text-base font-semibold tracking-tight text-[#1D1D1F] sm:text-lg dark:text-[#F5F5F7]">
              {products[index].title}
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {products[index].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="relative mt-8 flex items-center gap-2">
          {products.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to project ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-6 bg-gold-500 dark:bg-gold-300"
                  : "w-1.5 bg-black/15 hover:bg-black/25 dark:bg-white/15 dark:hover:bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative snap-start min-h-[100dvh] w-full px-6 py-24 overflow-hidden"
    >
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-gold-500/[0.05] blur-[130px] dark:bg-gold-500/10" />

      <div className="relative mx-auto max-w-6xl grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="lg:col-span-5"
        >
          <h2 className="mb-4 text-3xl md:text-4xl font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
            <BlurText text="Experience" />
          </h2>
          <p className="text-lg font-medium text-gold-600 dark:text-gold-300">Frontend Developer</p>
          <p className="mt-1 text-lg text-zinc-600 dark:text-zinc-400">IT Star Software Company</p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">September 2025 – June 2026</p>

          <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            As the sole frontend developer on a small in-house team, I built
            and maintained the interface layer across four internal
            products, working directly with backend engineers to turn API
            contracts into screens staff could actually use every day.
          </p>

          <ul className="mt-6 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <li className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-400" />
              Developed and maintained responsive interfaces for company
              software across desktop and tablet, built to hold up under
              daily internal use.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-400" />
              Collaborated closely with backend developers to scope API
              contracts and implement UI features end to end.
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-400" />
              Adapted a single design system across four products with
              different data shapes and user roles.
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="lg:col-span-7"
        >
          <ProjectCarousel />
        </motion.div>
      </div>
    </section>
  );
}
