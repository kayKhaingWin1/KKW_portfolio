import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BlurText from "./fx/BlurText";
import SpotlightCard from "./fx/SpotlightCard";

const projects = [
  {
    title: "Food Ordering Website",
    description:
      "A full-stack food ordering application with menu browsing, cart, order placement, and admin features.",
    image: "https://foodorder-2ly0.onrender.com/images/register_bg.jpg",
    link: "https://foodorder-2ly0.onrender.com",
    demo: "/previews/demo.html?project=food",
    technologies: ["HTML", "CSS", "JavaScript", "AJAX", "PHP", "Bootstrap", "jQuery", "MySQL"],
  },
  {
    title: "Ecommerce Website",
    description:
      "An e-commerce web app with React frontend and RESTful API backend for product listing and cart functionality.",
    image: "https://buy-now-alpha.vercel.app/images/bg3.jpg",
    link: "https://buy-now-alpha.vercel.app/",
    demo: "/previews/demo.html?project=buy",
    technologies: ["React", "TailwindCSS", "JavaScript", "JQuery", "API"],
  },
  {
    title: "Fashion Website",
    description:
      "A fashion-focused e-commerce platform offering stylish clothing collections with product browsing, cart, and order management features.",
    image: "https://taotao.onrender.com/img/img1.png",
    link: "https://taotao.onrender.com/",
    demo: "/previews/demo.html?project=fashion",
    technologies: ["PHP", "Bootstrap", "JavaScript", "jQuery", "MySQL"],
  },
  {
    title: "Coffee & Snacks App, UI/UX",
    description:
      "Mobile app UI/UX design for a coffee and snacks ordering application built in Adobe XD, including login, menu, checkout and cart pages.",
    image: "/images/uiux.jpg",
    link: "https://xd.adobe.com/view/0677782b-351c-4da2-aa02-8d0e679614b7-5324/",
    demo: "/previews/coffee.html",
    technologies: ["Adobe XD", "UI/UX Design", "Prototype"],
  },
];

function ProjectRow({ project, index }) {
  return (
    <div className="border-t border-black/10 dark:border-white/10">
      <SpotlightCard className="group grid grid-cols-1 items-center gap-6 rounded-2xl px-2 py-10 lg:grid-cols-12 lg:gap-8 lg:py-14">
        <span className="hidden text-sm font-medium tabular-nums text-zinc-400 lg:col-span-1 lg:block dark:text-zinc-600">
          {String(index + 1).padStart(2, "0")}
        </span>

        <motion.div
          initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5"
        >
          <h3 className="text-2xl font-semibold tracking-tight text-[#1D1D1F] sm:text-3xl dark:text-[#F5F5F7]">
            {project.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-500">
            {project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-black/10 px-2.5 py-1 text-xs text-zinc-600 dark:border-white/10 dark:text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-6">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-600 hover:text-gold-500 transition-colors dark:text-gold-300 dark:hover:text-gold-200"
              >
                View Project
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-600 hover:text-zinc-800 transition-colors dark:text-zinc-500 dark:hover:text-zinc-300"
              >
                Preview Demo
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 lg:col-start-7"
        >
          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10">
            <img
              src={project.image || "https://via.placeholder.com/800x450?text=Preview"}
              alt={project.title}
              className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] sm:h-64 lg:h-72"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset ring-gold-400/50 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </motion.div>
      </SpotlightCard>
    </div>
  );
}

export default function ProjectList() {
  return (
    <section
      id="projects"
      className="relative snap-start min-h-[100dvh] w-full px-6 py-24 overflow-hidden"
    >
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gold-500/[0.05] blur-[120px] dark:bg-gold-500/10" />

      <div className="relative mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
          <BlurText text="Selected Projects" />
        </h2>

        <div>
          {projects.map((project, index) => (
            <ProjectRow key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
