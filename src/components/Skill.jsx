import React from "react";
import { motion } from "framer-motion";
import {
  FaHtml5, FaCss3Alt, FaReact, FaJs, FaGitAlt, FaPhp, FaJava
} from "react-icons/fa";
import {
  SiTailwindcss, SiBootstrap, SiJquery, SiLaravel,
  SiMysql, SiPostman
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import BlurText from "./fx/BlurText";
import LogoLoop from "./fx/LogoLoop";

const skills = [
  { name: "HTML", level: 96, icon: <FaHtml5 /> },
  { name: "CSS", level: 93, icon: <FaCss3Alt /> },
  { name: "JavaScript", level: 90, icon: <FaJs /> },
  { name: "ReactJS", level: 88, icon: <FaReact /> },
  { name: "Tailwind CSS", level: 91, icon: <SiTailwindcss /> },
  { name: "MySQL", level: 83, icon: <SiMysql /> },
  { name: "RESTful API", level: 86, icon: <TbApi /> },
  { name: "Git", level: 89, icon: <FaGitAlt /> },
  { name: "Postman", level: 85, icon: <SiPostman /> },
  { name: "Bootstrap", level: 82, icon: <SiBootstrap /> },
  { name: "PHP", level: 84, icon: <FaPhp /> },
  { name: "Laravel", level: 80, icon: <SiLaravel /> },
  { name: "jQuery", level: 78, icon: <SiJquery /> },
  { name: "Java SE", level: 71, icon: <FaJava /> },
];

const tiers = [
  { label: "Core", test: (l) => l >= 88, tile: "h-28 text-3xl" },
  { label: "Proficient", test: (l) => l >= 78 && l < 88, tile: "h-24 text-2xl" },
  { label: "Familiar", test: (l) => l < 78, tile: "h-20 text-xl" },
];

function TierGrid({ tier, items }) {
  return (
    <div>
      <p className="mb-5 text-sm font-medium text-gold-600 dark:text-gold-300">{tier.label}</p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {items.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className={`group flex flex-col items-center justify-center gap-2 rounded-2xl border border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.03] ${tier.tile}`}
          >
            <span className="text-zinc-500 transition-colors group-hover:text-gold-500 dark:text-zinc-400">
              {skill.icon}
            </span>
            <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Skill() {
  return (
    <section
      id="skills"
      className="relative snap-start min-h-[100dvh] w-full flex items-center px-6 py-24 overflow-hidden"
    >
      <div className="absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-gold-500/[0.05] blur-[120px] dark:bg-gold-500/10" />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
            <BlurText text="Skills" />
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-500">
            Proficiency across the stack I use day to day, from markup to
            deployment.
          </p>
        </motion.div>

        <div className="mt-14 space-y-12">
          {tiers.map((tier) => (
            <TierGrid key={tier.label} tier={tier} items={skills.filter((s) => tier.test(s.level))} />
          ))}
        </div>

        <div className="mt-16 border-t border-black/10 pt-10 dark:border-white/10">
          <LogoLoop items={skills} />
        </div>
      </div>
    </section>
  );
}
