import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaViber } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_2j3m36p",
        "template_boanl7c",
        formData,
        "ReLzYCp6lQoljNWH3"
      )
      .then(() => {
        // 自动回复用原始 formData，确保 email 和 name 变量匹配模板设置
        emailjs.send(
          "service_2j3m36p",
          "template_owyqoio",
          formData,
          "ReLzYCp6lQoljNWH3"
        );
        alert("Message sent successfully! 💌");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => alert("Something went wrong 😢"));
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.8 }}
        id="contact"
        className="relative min-h-screen w-full px-6 py-24 items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(to bottom,#ffc2d4, #fce4ec, #ffffff)",
        }}
      >
        {/* ✨ 漂浮 Emoji 动画 */}
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-20 left-10 text-pink-400 text-4xl z-50 pointer-events-none">✨</motion.div>
        <motion.div animate={{ x: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-20 right-16 text-purple-400 text-4xl z-50 pointer-events-none">🍕</motion.div>
        <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-24 right-16 text-pink-300 text-3xl z-50 pointer-events-none">💗</motion.div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-20 left-16 text-yellow-300 text-3xl z-50 pointer-events-none">🧸</motion.div>

        {/* 💌 表单与联系方式 */}
        <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/30 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/40">

          {/* Left: 联系信息 with 左侧滑入动画 */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-gray-900"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get in Touch 💬
            </h2>
            <p className="text-lg text-gray-700">
              I'm open to freelance work, collabs, or just friendly chats! 🥰
            </p>
            <div className="space-y-3 text-base font-medium">
              <p>📱 <span className="text-purple-500">Phone:</span> 09777822908</p>
              <p>📧 <span className="text-purple-500">Email:</span> helilin15@gmail.com</p>
              <p>🐱 <span className="text-purple-500">GitHub:</span> <a href="https://github.com/kayKhaingWin1" className="underline text-blue-500">kayKhaingWin1</a></p>
              <p>🌐 <span className="text-purple-500">LinkedIn:</span> <a href="https://www.linkedin.com" className="underline text-blue-500">linkedin.com/in/kaykhaingwin</a></p>
              <p>💬 <span className="text-purple-500">Discord:</span> Kay#9910</p>
              <p>🎨 <span className="text-purple-500">Dribbble:</span> <a href="https://dribbble.com" className="underline text-pink-400">@kaykhaing</a></p>
            </div>
          </motion.div>

          {/* Right: 表单 with 右侧滑入动画 */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 bg-white/60 backdrop-blur-xl rounded-xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-purple-500 mb-4">
              Send a Message 💌
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-purple-200 bg-white/80 text-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-purple-200 bg-white/80 text-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-purple-200 bg-white/80 text-purple-700 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-full transition duration-300"
            >
              Send Message ✨
            </button>
          </motion.form>
        </div>

      </motion.section>
      <footer className="relative w-full py-8 text-white overflow-hidden">

        {/* 背景微光效果 */}
        <div className="absolute inset-0  opacity-10 blur-3xl pointer-events-none"></div>

        {/* 上方分割线 */}
        <div className="relative w-32 h-[2px] bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mx-auto mb-8 rounded-full shadow-md"></div>

        {/* 社交图标 */}
        <div className=" text-center ">
          <div className="relative flex justify-center items-center gap-10 mb-6 z-10">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 text-3xl transition transform hover:scale-110 duration-300">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-400 text-3xl transition transform hover:scale-110  duration-300">
              <FaInstagram />
            </a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-3xl transition transform hover:scale-110 duration-300">
              <FaTelegramPlane />
            </a>
            <a href="viber://chat?number=%2B1234567890" target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-400 text-3xl transition transform hover:scale-110 duration-300">
              <FaViber />
            </a>
          </div>
          <p className="relative text-sm text-gray-300 z-10 mb-2">
            &copy; {new Date().getFullYear()} KKW. All rights reserved.
          </p>
        </div>


        <div className="relative w-40 h-[2px] bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mx-auto rounded-full shadow-md z-10"></div>
      </footer>

    </>
  );
}
