import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    // <section
    //   id="about"
    //   className="relative min-h-screen w-full py-24 px-6 bg-gradient-to-br from-pink-100 via-purple-100 to-white text-gray-800 snap-start overflow-hidden"
    // >
    <section
      id="about"
      className="relative min-h-screen w-full py-24 px-6 text-gray-800 snap-start overflow-hidden"
      style={{
        background: "linear-gradient(to bottom,#bfa3c9 0%, #f7eaff 40%, #fff 100%)",
      }}
    >
      <div className="absolute -top-28 left-1/4 w-96 h-96 bg-pink-200 opacity-25 blur-[100px] rounded-full animate-ping z-0" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-300 opacity-25 blur-[120px] rounded-full animate-pulse z-0" />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-10 text-pink-400 text-4xl z-50 pointer-events-none"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ x: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-20 right-16 text-purple-400 text-4xl z-50 pointer-events-none"
      >
        🍕
      </motion.div>
      <motion.div
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-16 text-pink-300 text-3xl z-50 pointer-events-none"
      >
        💗
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 left-16 text-yellow-300 text-3xl z-50 pointer-events-none"
      >
        🧸
      </motion.div>

      {/* 💎 内容卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 80 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center backdrop-blur-xl bg-white/30 bg-opacity-20 rounded-3xl shadow-xl overflow-hidden"
      >
        {/* 🖼 图片左侧 */}
        <div className="relative md:w-1/2 w-full flex justify-center items-center p-6 md:p-12">
          <div className="relative">
            <img
              src="/aboutme.jpg"
              alt="My Photo"
              className="w-[380px] h-[auto] object-cover rounded-[2rem] shadow-xl 
        mask-image-[radial-gradient(ellipse_at_center,white,transparent)] 
        transition-all duration-700"
              style={{
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, rgba(255,255,255,1) 60%, rgba(255,255,255,0.2) 100%)",
                maskImage:
                  "radial-gradient(ellipse at center, rgba(255,255,255,1) 60%, rgba(255,255,255,0.2) 100%)",
              }}
            />
          </div>
        </div>


        {/* 📜 内容右侧 */}
        <div className="md:w-1/2 w-full p-6 md:pr-12 space-y-6 z-20">
          {/* 背景故事 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-pink-500 mb-3">My Journey 🌸</h2>
            <p className="text-base leading-relaxed text-gray-700">
              I grew up with a love for colors, characters, and technology.
              What started as sketching anime turned into UI/UX, and eventually
              became a passion for web development. I enjoy creating things
              that feel alive and thoughtful.
            </p>
          </motion.div>

          {/* 教育经历 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-3"
          >
            <h3 className="text-2xl font-semibold text-purple-500 mt-6">Education 🎓</h3>
            <ul className="space-y-2">
              {[
                {
                  title:
                    "BSc (Hons) Business Computing and Information Systems",
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
              ].map((item, index) => (
                <li
                  key={index}
                  className="bg-white/40 backdrop-blur-sm rounded-xl px-4 py-3 shadow-inner border-l-4 border-pink-300"
                >
                  <p className="font-bold text-gray-800">{item.title}</p>
                  {item.org && (
                    <p className="text-sm text-gray-600">{item.org}</p>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

