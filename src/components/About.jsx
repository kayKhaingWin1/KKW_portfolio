import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./fx/ScrollReveal";
import BlurText from "./fx/BlurText";

const education = [
  {
    title: "BSc (Hons) Business Computing and Information Systems",
    org: "University of Central Lancashire (UCLan)",
  },
  {
    title: "Graduated at MCTA Chinese High School",
    org: "",
  },
  {
    title: "Certified in UI/UX Design",
    org: "iNet College",
  },
  {
    title: "Certified in PHP Laravel and React",
    org: "Host Myanmar Institute",
  },
];

const EASE = [0.16, 1, 0.3, 1];

const blobPath =
  "M45.3,-58.3C58.2,-49.3,68.1,-34.5,71.4,-18.4C74.7,-2.3,71.4,15.1,63.2,29.5C55,43.9,41.9,55.3,26.7,62.1C11.5,68.9,-5.8,71.1,-21.8,66.7C-37.8,62.3,-52.5,51.3,-61.5,36.8C-70.5,22.3,-73.8,4.3,-70.6,-12.1C-67.4,-28.5,-57.7,-43.3,-44.5,-52.3C-31.3,-61.3,-15.7,-64.5,0.7,-65.4C17,-66.3,34.1,-64.9,45.3,-58.3Z";

function BlobPortrait() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div className="relative mx-auto h-[26rem] w-[26rem] shrink-0 sm:h-[30rem] sm:w-[30rem] md:h-[36rem] md:w-[36rem]">
      <motion.svg
        viewBox="-100 -100 200 200"
        className="pointer-events-none absolute -inset-10 z-0 h-[calc(100%+5rem)] w-[calc(100%+5rem)]"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <path
          d={blobPath}
          fill="none"
          className="stroke-gold-500/40 dark:stroke-gold-300/30"
          strokeWidth={1}
        />
      </motion.svg>

      {/* Plain square crop (the source photo is a 1:1 image) so the whole
          face is always visible — the blob line above is purely a halo,
          it no longer clips the photo. */}
      <img
        src="/aboutme.jpg"
        alt="Portrait of Kay Khaing Win"
        className="relative z-10 h-full w-full rounded-[2.5rem] object-cover shadow-2xl"
      />
    </div>
  );
}

function EducationStepper() {
  return (
    <ol className="relative">
      {education.map((item, index) => {
        const isLast = index === education.length - 1;
        return (
          <li key={index} className="relative flex gap-5 pb-9 last:pb-0">
            {!isLast && (
              <motion.span
                aria-hidden="true"
                className="absolute left-[7px] top-4 w-px origin-top bg-gold-400/25 dark:bg-gold-300/20"
                style={{ height: "calc(100% - 0.75rem)" }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.1, ease: EASE }}
              />
            )}
            <motion.span
              aria-hidden="true"
              className="relative z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-gold-500 bg-[#f5f5f7] dark:border-gold-300 dark:bg-[#050507]"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: "spring", stiffness: 320, damping: 18, delay: index * 0.15 }}
            />
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.05, ease: EASE }}
              className="-mt-1"
            >
              <p className="font-medium text-[#1D1D1F] dark:text-[#F5F5F7]">{item.title}</p>
              {item.org && (
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">{item.org}</p>
              )}
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative snap-start min-h-[100dvh] w-full py-24 px-6 overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/[0.05] blur-[130px] dark:bg-gold-500/10" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8 lg:items-start">
          <ScrollReveal className="lg:col-span-7">
            <h2 className="mb-6 text-3xl md:text-4xl font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
              <BlurText text="About" />
            </h2>
            <div className="flex flex-col gap-5">
              <BlobPortrait />
              <p className="max-w-md text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
                I bring a sharp eye for interface design, a collaborative
                mindset, and a knack for solving tricky problems — the mix
                that turns a rough idea into{" "}
                <span className="font-medium text-gold-600 dark:text-gold-300">
                  a screen people actually enjoy using
                </span>
                .
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="lg:col-span-5"
          >
            <p className="text-sm font-medium text-gold-600 dark:text-gold-300 mb-6">
              Education
            </p>
            <EducationStepper />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
