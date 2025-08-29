import React from "react";
import { motion } from "framer-motion";


const projects = [
  {
    title: "Food Ordering Website",
    description:
      "A full-stack food ordering application with menu browsing, cart, order placement, and admin features.",
    image: "https://foodorder-2ly0.onrender.com/images/register_bg.jpg",
    link: "https://foodorder-2ly0.onrender.com",
    demo: "/previews/demo.html?project=food",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "AJAX",
      "PHP",
      "Bootstrap",
      "jQuery",
      "MySQL",
    ],
  },
  ,
  {
    title: "Ecommerce Website",
    description:
      "An e-commerce web app with React frontend and RESTful API backend for product listing and cart functionality.",
    image: "https://buy-now-seven.vercel.app/images/bg3.jpg", 
    link: "https://buy-now-seven.vercel.app/",
    demo: "/previews/demo.html?project=buy", 
    technologies: [
      "React",
      "TailwindCSS",
      "JavaScript",
      "JQuery",
      "API",
    ],
  },
    {
    title: "Fashion Website",
    description:
      "A fashion-focused e-commerce platform offering stylish clothing collections with product browsing, cart, and order management features.",
    image: "https://taotao.onrender.com/img/img1.png",
    link: "https://taotao.onrender.com/",
    demo: "/previews/demo.html?project=fashion",
    technologies: [
      "PHP",
      "Bootstrap",
      "JavaScript",
      "jQuery",
      "MySQL",
    ],
  },
   {
    title: "Coffee & Snacks App, UI/UX (Adobe XD)",
    description:
      "Mobile app UI/UX design for odering coffe and snacks application created in Adobe XD. Includes login, menu, checkout and cart pages.",
    image: "/images/uiux.jpg", 
    link: "https://xd.adobe.com/view/0677782b-351c-4da2-aa02-8d0e679614b7-5324/",
    demo: "/previews/coffee.html",
    technologies: ["Adobe XD", "UI/UX Design", "Prototype"],
  },
];





export default function ProjectList() {
  return (
   
     <section
      id="projects"
      className="relative min-h-screen w-full px-6 py-20 text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1a1a1a, #2b2b3c, #a26da9)",
      }}
    >
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-300 opacity-20 rounded-full blur-3xl animate-pulse" />

      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 p-3 bg-gradient-to-r from-blue-200 via-yellow-200 to-white text-transparent bg-clip-text">
        🌸 My Projects 🌸
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={project.image || "https://via.placeholder.com/400x200?text=No+Image"}
              alt={project.title}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-pink-300 mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-gray-200 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-full bg-white/10 border border-white/20 text-purple-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-300 underline hover:text-white transition"
                >
                  View Project →
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-pink-300 underline hover:text-white transition"
                >
                  Preview Demo →
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
