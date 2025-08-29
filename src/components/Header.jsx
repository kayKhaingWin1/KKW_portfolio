import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [active, setActive] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollY = window.scrollY;
  //     const sections = navItems.map((item) =>
  //       document.querySelector(item.href)
  //     );

  //     for (let i = 0; i < sections.length; i++) {
  //       const section = sections[i];
  //       if (
  //         section &&
  //         scrollY >= section.offsetTop - 100 &&
  //         scrollY < section.offsetTop + section.offsetHeight
  //       ) {
  //         const newHash = navItems[i].href;
  //         setActive(newHash);
  //         if (window.location.hash !== newHash) {
  //           window.history.replaceState(null, "", newHash);
  //         }
  //         break; // 提高性能：找到后就跳出循环
  //       }
  //     }
  //   };


  //   const handleResize = () => {
  //     setIsDesktop(window.innerWidth >= 768);
  //     if (window.innerWidth >= 768) {
  //       setMenuOpen(false);
  //       setRotate(0);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  useEffect(() => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, // 50% 可见才算进入
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        setActive(id);

        // ✅ 更新 URL hash，不会刷新或跳转
        if (window.location.hash !== id) {
          window.history.replaceState(null, "", id);
        }
      }
    });
  }, observerOptions);

  // 监听每一个 section
  navItems.forEach((item) => {
    const section = document.querySelector(item.href);
    if (section) {
      observer.observe(section);
    }
  });

  // 处理窗口大小变化
  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 768);
    if (window.innerWidth >= 768) {
      setMenuOpen(false);
      setRotate(0);
    }
  };

  window.addEventListener("resize", handleResize);

  return () => {
    observer.disconnect();
    window.removeEventListener("resize", handleResize);
  };
}, []);

  const isLightSection = active === "#about" || active === "#contact";

  const toggleMenu = () => {
    setRotate((prev) => prev + 180);
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (href) => {
    setActive(href);
    if (!isDesktop) {
      setMenuOpen(false);
      setRotate((prev) => prev + 180);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg shadow-md">
      <nav
        className={`flex justify-between items-center px-6 md:px-10 py-4 transition-colors duration-500 ${isLightSection ? "text-gray-800" : "text-white"
          }`}
      >
        {/* Logo */}
        <h1
          className={`text-2xl font-bold tracking-wide transition-colors duration-500 ${isLightSection ? "text-pink-600" : "text-pink-200"
            }`}
        >
          <img src="../images/logo.png" className="w-16 h-16" alt="" />
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-base font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative transition-all duration-300 ease-in-out ${active === item.href
                    ? isLightSection
                      ? "text-pink-600"
                      : "text-pink-300"
                    : isLightSection
                      ? "hover:text-pink-600"
                      : "hover:text-pink-200"
                  }`}
              >
                {item.name}
                {active === item.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 -bottom-1 w-full h-0.5 bg-pink-400 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>


        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none relative z-50"
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: rotate }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 flex items-center justify-center"
          >
            {menuOpen ? (
              <motion.span
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                className={`text-5xl font-light flex items-center justify-center h-full ${isLightSection ? "text-gray-800" : "text-white"
                  }`}
              >
                &times;
              </motion.span>
            ) : (
              <motion.div
                className="flex flex-col items-center justify-center h-full"
                whileHover={{ scale: 1.1 }}
              >
                <span
                  className={`block w-6 h-0.5 rounded-full mb-1.5 transition-all ${isLightSection ? "bg-gray-800" : "bg-white"
                    }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 rounded-full mb-1.5 transition-all ${isLightSection ? "bg-gray-800" : "bg-white"
                    }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 rounded-full transition-all ${isLightSection ? "bg-gray-800" : "bg-white"
                    }`}
                ></span>
              </motion.div>
            )}
          </motion.div>
        </button>
      </nav>


      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                damping: 20,
                stiffness: 300
              }
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.95,
              transition: {
                duration: 0.2
              }
            }}
            className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] shadow-lg z-40 rounded-b-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-pink-100/80 via-white to-white backdrop-blur-sm"></div>
            <div className="relative h-full flex flex-col items-center justify-center">
              <ul className="w-full max-w-xs space-y-4 text-lg font-medium">
                {navItems.map((item) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.3
                      }
                    }}
                    exit={{ opacity: 0 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`block py-4 px-6 rounded-xl transition-all ${active === item.href
                          ? "bg-pink-100/80 text-pink-700 font-semibold shadow-sm"
                          : "hover:bg-pink-50/60 hover:text-pink-600"
                        }`}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}