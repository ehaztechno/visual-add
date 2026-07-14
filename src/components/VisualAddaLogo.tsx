import React from "react";

interface VisualAddaLogoProps {
  className?: string;
  size?: number; // Height if showText is true, or width/height if showText is false
  variant?: "gradient" | "solid" | "vibrant"; // The 3 official brand logo variants
  showText?: boolean; // Whether to show the full logo lockup (icon + brand name + tagline)
}

export default function VisualAddaLogo({
  className = "",
  size = 36,
  variant = "gradient",
  showText = false
}: VisualAddaLogoProps) {
  // Define width/height and viewBox based on whether we show the full text lockup
  const height = size;
  const width = showText ? size * 3.8 : size; // Proportional widescreen aspect ratio for lockup
  const viewBox = showText ? "0 0 530 140" : "0 0 100 100";

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-300`}
      id={`visual-adda-logo-${variant}`}
    >
      <defs>
        {/* Variant 1: Original Purple-Orange Gradient */}
        {variant === "gradient" && (
          <>
            <linearGradient id="leftGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1d0047" /> {/* Deep Purple/Indigo */}
              <stop offset="100%" stopColor="#7a1fad" /> {/* Vibrant Violet */}
            </linearGradient>
            <linearGradient id="rightGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e05a10" /> {/* Rich Orange */}
              <stop offset="100%" stopColor="#f4ad28" /> {/* Warm Yellow-Gold */}
            </linearGradient>
          </>
        )}

        {/* Variant 2: Solid Orange */}
        {variant === "solid" && (
          <>
            <linearGradient id="leftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f29132" />
              <stop offset="100%" stopColor="#f29132" />
            </linearGradient>
            <linearGradient id="rightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f29132" />
              <stop offset="100%" stopColor="#f29132" />
            </linearGradient>
          </>
        )}

        {/* Variant 3: Vibrant Purple-Yellow Gradient */}
        {variant === "vibrant" && (
          <>
            <linearGradient id="leftGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b46ff" /> {/* Electric Purple */}
              <stop offset="100%" stopColor="#4c00b0" /> {/* Royal Purple */}
            </linearGradient>
            <linearGradient id="rightGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff5722" /> {/* Radiant Orange */}
              <stop offset="100%" stopColor="#ffb300" /> {/* Glowing Yellow-Orange */}
            </linearGradient>
          </>
        )}
      </defs>

      {/* Monogram Icon */}
      {showText ? (
        <g transform="translate(10, 15) scale(1.1)">
          {/* Top Left Curve / Wing (Left component) */}
          <path
            d="M20 20 C 20 20, 50 15, 60 25 C 70 35, 45 45, 35 55 C 25 65, 20 80, 20 80 C 20 80, 25 55, 35 45 C 45 35, 20 20, 20 20 Z"
            fill="url(#leftGrad)"
          />
          
          {/* Bottom Right loop / segment resembling stylized lowercase 'a' (Right component) */}
          <path
            d="M45 55 C 55 45, 80 40, 80 60 C 80 80, 60 80, 50 80 C 40 80, 35 75, 40 65 C 45 55, 60 65, 60 70 C 60 75, 70 72, 70 65 C 70 58, 55 58, 45 55 Z"
            fill="url(#rightGrad)"
          />

          {/* Top Right Capsule */}
          <rect
            x="65"
            y="18"
            width="15"
            height="15"
            rx="7.5"
            fill="url(#rightGrad)"
          />
        </g>
      ) : (
        <g>
          {/* Standalone Icon */}
          <path
            d="M20 20 C 20 20, 50 15, 60 25 C 70 35, 45 45, 35 55 C 25 65, 20 80, 20 80 C 20 80, 25 55, 35 45 C 45 35, 20 20, 20 20 Z"
            fill="url(#leftGrad)"
          />
          
          <path
            d="M45 55 C 55 45, 80 40, 80 60 C 80 80, 60 80, 50 80 C 40 80, 35 75, 40 65 C 45 55, 60 65, 60 70 C 60 75, 70 72, 70 65 C 70 58, 55 58, 45 55 Z"
            fill="url(#rightGrad)"
          />

          <rect
            x="65"
            y="18"
            width="15"
            height="15"
            rx="7.5"
            fill="url(#rightGrad)"
          />
        </g>
      )}

      {/* Brand Text & Tagline Lockup (Visible only when showText is true) */}
      {showText && (
        <g>
          {/* VISUAL - Rendered with the matching right gradient */}
          <text
            x="145"
            y="65"
            fill="url(#rightGrad)"
            fontFamily="Inter, system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="45"
            letterSpacing="2"
          >
            VISUAL
          </text>

          {/* ADDA - Styled with the custom caret 'A's drawn as vector paths */}
          <g transform="translate(325, 28)">
            {/* 1st Letter 'A' (Caret) */}
            <path
              d="M 0 38 L 19 0 L 38 38"
              stroke="url(#rightGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* 2nd Letter 'D' */}
            <path
              d="M 54 38 V 0 H 68 C 80 0, 89 8, 89 19 C 89 30, 80 38, 68 38 Z"
              stroke="url(#rightGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* 3rd Letter 'D' */}
            <path
              d="M 105 38 V 0 H 119 C 131 0, 140 8, 140 19 C 140 30, 131 38, 119 38 Z"
              stroke="url(#rightGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* 4th Letter 'A' (Caret) */}
            <path
              d="M 156 38 L 175 0 L 194 38"
              stroke="url(#rightGrad)"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </g>

          {/* Tagline - Aligned underneath the text block */}
          <text
            x="325"
            y="96"
            fill="url(#rightGrad)"
            fontFamily="Inter, system-ui, -apple-system, sans-serif"
            fontWeight="600"
            fontSize="11.5"
            letterSpacing="3.5"
            opacity="0.9"
          >
            TURNING VISION
          </text>
          <text
            x="325"
            y="115"
            fill="url(#rightGrad)"
            fontFamily="Inter, system-ui, -apple-system, sans-serif"
            fontWeight="600"
            fontSize="11.5"
            letterSpacing="1.8"
            opacity="0.9"
          >
            INTO EXPERIENCES
          </text>
        </g>
      )}
    </svg>
  );
}
