import React, { useEffect, useState } from "react";

export default function LogoLoop({ items, className = "" }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const duration = `${items.length * 2.5}s`;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={`flex w-max items-center gap-10 ${reduceMotion ? "" : "animate-marquee"}`}
        style={reduceMotion ? undefined : { animationDuration: duration }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item.name}-${i}`}
            className="flex shrink-0 items-center gap-2 text-2xl text-zinc-500 dark:text-zinc-500"
            title={item.name}
          >
            {item.icon}
          </span>
        ))}
      </div>
    </div>
  );
}
