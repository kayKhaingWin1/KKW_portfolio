import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassSurface from "./GlassSurface";

export default function MobileSidebar({ items, active, isOpen, onClose, onNavigate }) {
  useEffect(() => {
    const root = document.getElementById("scroll-root");
    if (!root) return;
    root.style.overflow = isOpen ? "hidden" : "";
    return () => {
      root.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          />
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 520, damping: 40, mass: 0.7 }}
            className="fixed inset-y-0 right-0 z-40 w-[78vw] max-w-xs md:hidden"
          >
            <GlassSurface borderRadius={0} width="100%" height="100%">
              <nav
                className="flex h-full w-full flex-col justify-center gap-1 px-8"
                aria-label="Mobile"
              >
                {items.map((item, i) => {
                  const isActive = active === item.href;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => onNavigate(item.href)}
                      className="group relative flex items-center gap-4 py-3.5"
                    >
                      <span
                        className={`h-px shrink-0 transition-all duration-300 ${
                          isActive
                            ? "w-8 bg-gold-500 dark:bg-gold-300"
                            : "w-4 bg-zinc-400 group-hover:w-6 group-hover:bg-gold-500 dark:bg-zinc-600 dark:group-hover:bg-gold-300"
                        }`}
                      />
                      <span className="text-xs tabular-nums text-zinc-400 dark:text-zinc-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-lg font-medium ${
                          isActive
                            ? "text-gold-600 dark:text-gold-300"
                            : "text-[#1D1D1F] dark:text-[#F5F5F7]"
                        }`}
                      >
                        {item.name}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </GlassSurface>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
