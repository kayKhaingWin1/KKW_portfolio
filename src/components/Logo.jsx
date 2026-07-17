import React, { useState } from "react";

// Same idea as Apple's "hello" wordmark animation: a script wordmark that
// reveals left to right like it's being handwritten. A clip-path wipe
// guarantees the left-to-right sweep (stroke-dasharray on <text> draws each
// glyph independently, not the whole word in sequence). The rainbow fill is
// swapped for a frosted glass tint so it stays inside the site's single
// champagne-gold accent. Replays on hover.
export default function Logo({ className = "" }) {
  const [replay, setReplay] = useState(0);

  return (
    <span
      key={replay}
      className={`kkw-logo-reveal inline-block ${className}`}
      onMouseEnter={() => setReplay((n) => n + 1)}
    >
      <svg
        viewBox="0 0 108 40"
        className="h-9 w-auto overflow-visible sm:h-10"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="kkw"
      >
        <defs>
          <linearGradient id="kkwGoldStroke" x1="0" y1="0" x2="108" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#F0D98E" />
            <stop offset="0.55" stopColor="#D4AF37" />
            <stop offset="1" stopColor="#9C7A17" />
          </linearGradient>
        </defs>
        <text x="2" y="29" className="kkw-logo-text">
          kkw
        </text>
      </svg>
    </span>
  );
}
