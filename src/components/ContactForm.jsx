import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { FaFacebookF, FaInstagram, FaTelegramPlane, FaViber } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import BlurText from "./fx/BlurText";
import ScrollReveal from "./fx/ScrollReveal";
import GlassSurface from "./GlassSurface";
import { useTheme } from "../context/theme";

const socials = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaTelegramPlane, href: "https://t.me", label: "Telegram" },
  { icon: FaViber, href: "viber://chat?number=%2B1234567890", label: "Viber" },
];

const details = [
  { label: "Phone", value: "09777822908" },
  { label: "Email", value: "helilin2908@gmail.com" },
];

// Line fields — small label above, no box, just a hairline that lights up
// gold on focus.
function FormField({ id, label, as = "input", ...props }) {
  const Tag = as;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        required
        className="w-full resize-none border-0 border-b border-black/15 bg-transparent px-0 py-2.5 text-[#1D1D1F] placeholder:text-zinc-400 focus:outline-none focus:ring-0 focus:border-gold-500 dark:border-white/15 dark:text-[#F5F5F7] dark:placeholder:text-zinc-600 dark:focus:border-gold-300"
        {...props}
      />
    </div>
  );
}

export default function Contact() {
  const { theme } = useTheme();
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
        emailjs.send(
          "service_2j3m36p",
          "template_owyqoio",
          formData,
          "ReLzYCp6lQoljNWH3"
        );
        alert("Message sent successfully.");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => alert("Something went wrong. Please try again."));
  };

  return (
    <>
      <section
        id="contact"
        className="relative snap-start min-h-[100dvh] w-full px-6 py-20 flex items-center overflow-hidden"
      >
        <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-gold-500/[0.06] blur-[130px] dark:bg-gold-500/12" />

        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-[#1D1D1F] sm:text-5xl lg:text-6xl dark:text-[#F5F5F7]">
              <BlurText text="Let's build" />
              <br />
              <BlurText text="something" />{" "}
              <span className="text-gold-600 dark:text-gold-300">good</span>.
            </h2>
            <ScrollReveal delay={0.1} className="mt-5 max-w-sm">
              <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-500">
                Open to freelance work, collaborations, or a straightforward
                conversation about a project.
              </p>
            </ScrollReveal>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
              className="mt-8 space-y-2 text-sm text-zinc-600 dark:text-zinc-400"
            >
              {details.map((d) => (
                <motion.p
                  key={d.label}
                  variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-zinc-500 dark:text-zinc-600">{d.label}</span> &nbsp;{d.value}
                </motion.p>
              ))}
              <motion.p variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <span className="text-zinc-500 dark:text-zinc-600">GitHub</span> &nbsp;
                <a href="https://github.com/helilin2908" className="text-zinc-700 hover:text-gold-600 transition-colors dark:text-zinc-300 dark:hover:text-gold-300">
                  helilin2908
                </a>
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } } }}
              className="mt-6 flex items-center gap-5"
            >
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.94 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-zinc-600 hover:text-gold-600 hover:border-gold-400/40 transition-colors dark:border-white/10 dark:text-zinc-400 dark:hover:text-gold-300"
                >
                  <s.icon className="text-sm" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="w-full rounded-[2rem] border border-black/10 bg-white/50 p-6 shadow-xl sm:p-10 dark:border-white/10 dark:bg-white/[0.03]">
              <p className="text-sm font-medium text-gold-600 dark:text-gold-300">
                Contact Form
              </p>
              <h3 className="mt-1 mb-6 text-xl font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
                Send a message
              </h3>
              <form onSubmit={handleSubmit} className="w-full space-y-5">
                <FormField
                  id="name"
                  label="Name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <FormField
                  id="message"
                  label="Message"
                  as="textarea"
                  rows={4}
                  placeholder="Tell me a bit about your project"
                  value={formData.message}
                  onChange={handleChange}
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="mt-2 w-full"
                >
                  <GlassSurface borderRadius={999} distortionScale={-110} width="100%">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 whitespace-nowrap py-3 text-sm font-medium text-gold-600 transition-colors hover:text-gold-500 dark:text-gold-300 dark:hover:text-gold-200"
                    >
                      Send Message
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                    </button>
                  </GlassSurface>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="relative w-full overflow-hidden px-6 pb-6 pt-4">
        <p
          aria-hidden="true"
          className="pointer-events-none select-none text-center text-[14vw] font-semibold leading-none tracking-tight text-transparent sm:text-[10vw]"
          style={{
            WebkitTextStroke:
              theme === "dark" ? "1px rgba(245,245,247,0.06)" : "1px rgba(29,29,31,0.05)",
          }}
        >
          Kay Khaing Win
        </p>

        <div className="relative mx-auto -mt-8 flex max-w-6xl justify-center border-t border-black/10 pt-5 dark:border-white/10">
          <p className="text-sm text-zinc-600 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} Kay Khaing Win. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
