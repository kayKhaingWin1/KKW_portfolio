import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import GlassSurface from "./GlassSurface";
import { useTheme } from "../context/theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="fixed top-5 right-5 z-50"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <GlassSurface borderRadius={22} distortionScale={-120}>
        <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.span
              key={theme}
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 520, damping: 28 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {isDark ? (
                <Moon className="h-5 w-5 text-gold-300" strokeWidth={1.5} />
              ) : (
                <Sun className="h-5 w-5 text-gold-600" strokeWidth={1.5} />
              )}
            </motion.span>
          </AnimatePresence>
        </span>
      </GlassSurface>
    </motion.button>
  );
}
