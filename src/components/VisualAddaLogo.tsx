import React from "react";

interface VisualAddaLogoProps {
  className?: string;
  size?: number;
}

export default function VisualAddaLogo({ className = "", size = 36 }: VisualAddaLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-300`}
    >
      <defs>
        {/* Exact gradient color combination from the image: Violet/Purple to vibrant Orange/Yellow */}
        <linearGradient id="visualAddaGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" /> {/* Deep Violet */}
          <stop offset="40%" stopColor="#A855F7" /> {/* Purple */}
          <stop offset="75%" stopColor="#EA580C" /> {/* Orange */}
          <stop offset="100%" stopColor="#F59E0B" /> {/* Yellow-Gold */}
        </linearGradient>
      </defs>
      
      {/* Dynamic interlocking geometric shapes from the Visual Adda brand icon */}
      {/* Top Left Curve / Wing */}
      <path
        d="M20 20 C 20 20, 50 15, 60 25 C 70 35, 45 45, 35 55 C 25 65, 20 80, 20 80 C 20 80, 25 55, 35 45 C 45 35, 20 20, 20 20 Z"
        fill="url(#visualAddaGrad)"
      />
      
      {/* Bottom Right loop / segment resembling stylized lowercase 'a' */}
      <path
        d="M45 55 C 55 45, 80 40, 80 60 C 80 80, 60 80, 50 80 C 40 80, 35 75, 40 65 C 45 55, 60 65, 60 70 C 60 75, 70 72, 70 65 C 70 58, 55 58, 45 55 Z"
        fill="url(#visualAddaGrad)"
      />

      {/* Top Right Capsule */}
      <rect
        x="65"
        y="18"
        width="15"
        height="15"
        rx="7.5"
        fill="url(#visualAddaGrad)"
      />
    </svg>
  );
}
