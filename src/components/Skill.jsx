import React, { useRef, useEffect, useState } from "react";
import {
  FaHtml5, FaCss3Alt, FaReact, FaJs, FaGitAlt, FaPhp, FaJava
} from "react-icons/fa";
import {
  SiTailwindcss, SiBootstrap, SiJquery, SiLaravel,
  SiMysql, SiPostman
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

const skills = [
  { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: "Bootstrap", icon: <SiBootstrap className="text-purple-500" /> },
  { name: "ReactJS", icon: <FaReact className="text-blue-400" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "jQuery", icon: <SiJquery className="text-blue-300" /> },
  { name: "PHP", icon: <FaPhp className="text-indigo-400" /> },
  { name: "Laravel", icon: <SiLaravel className="text-red-500" /> },
  { name: "Java SE", icon: <FaJava className="text-red-400" /> },
  { name: "MySQL", icon: <SiMysql className="text-blue-600" /> },
  { name: "GitHub", icon: <FaGitAlt className="text-gray-200" /> },
  { name: "Postman", icon: <SiPostman className="text-orange-300" /> },
  { name: "RESTful API", icon: <TbApi className="text-green-300" /> },
];

export default function Skill() {
  const trackRef = useRef();
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 当技能区滚动到可见时，一个一个显示技能
            skills.forEach((_, i) => {
              setTimeout(() => {
                setVisibleCount((prev) => prev + 1);
              }, i * 300); // 每个技能延迟 300ms 出现
            });
            observer.disconnect(); // 触发一次后断开观察
          }
        });
      },
      { threshold: 0.3 } // 30% 出现在视口就触发
    );

    if (trackRef.current) observer.observe(trackRef.current);

    return () => observer.disconnect();
  }, []);


  return (
    <section
      className="relative min-h-screen bg-black w-full flex flex-col items-center justify-center px-6 py-20 text-white overflow-hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 shooting-stars z-0" />

      <h2 className="text-4xl md:text-5xl font-bold text-center p-4 mb-16 mt-4 bg-gradient-to-r from-pink-400 via-purple-400 to-white text-transparent bg-clip-text z-10">
        ✨ My Skills ✨
      </h2>

      <div className="w-full max-w-screen-xl z-10 ">
        <div
          ref={trackRef}
          className="flex flex-wrap justify-center gap-6 py-4 transition-all duration-500"
        >
          {skills.map((skill, i) => (
            <div
              key={i}
              className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[150px] max-w-[150px] h-40 backdrop-blur-sm bg-white/10 rounded-2xl p-6 text-center shadow-md transition-all duration-500 hover:scale-105 ${i < visibleCount ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
                }`}
            >
              <div className="text-4xl mb-2">{skill.icon}</div>
              <span className="text-base font-semibold bg-gradient-to-r from-pink-400 via-purple-400 to-white bg-clip-text text-transparent drop-shadow-md">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .star {
          position: absolute;
          background: white;
          border-radius: 50%;
          animation: twinkle 6s infinite alternate ease-in-out;
          opacity: 0.6;
        }

        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(1); }
          100% { opacity: 0.9; transform: scale(1.3); }
        }

        .shooting-stars::before,
        .shooting-stars::after {
          content: "";
          position: absolute;
          width: 2px;
          height: 100px;
          background: linear-gradient(-45deg, white, transparent);
          transform: rotate(45deg);
          opacity: 0.8;
          animation: shooting 10s linear infinite;
        }

        .shooting-stars::before {
          top: -10%;
          left: 70%;
        }

        .shooting-stars::after {
          top: -20%;
          left: 40%;
          animation-delay: 4s;
        }

        @keyframes shooting {
          0% { transform: translateX(0) translateY(0) rotate(45deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateX(-1000px) translateY(1000px) rotate(45deg); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
