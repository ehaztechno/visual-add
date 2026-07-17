import React from "react";

const logoImg = "https://lh3.googleusercontent.com/d/1hwwBR0MPzjjAwmCurbmpWgJ1iN9dx88S";

interface VisualAddaLogoProps {
  className?: string;
  size?: number; // Height of the logo in pixels
  variant?: "gradient" | "solid" | "vibrant"; // Kept for API compatibility
  showText?: boolean; // Whether to show full logo lockup (icon + brand name + tagline) or just the monogram icon
}

export default function VisualAddaLogo({
  className = "",
  size = 36,
  variant = "gradient",
  showText = false
}: VisualAddaLogoProps) {
  const height = size;

  if (showText) {
    // Proportional width calculation for full logo (approx 3.33 ratio based on original aspect ratio of 3.33:1)
    const width = size * 3.33;
    return (
      <div 
        className={`${className} inline-flex items-center justify-center transition-all duration-300`} 
        style={{ height: `${height}px`, width: `${width}px` }}
        id={`visual-adda-logo-${variant}-full`}
      >
        <img
          src={logoImg}
          alt="Visual Adda"
          className="w-full h-full object-contain select-none opacity-95 hover:opacity-100 transition-opacity"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  } else {
    // Display only the monogram icon on the left of the logo using pure CSS crop
    return (
      <div 
        className={`${className} inline-block overflow-hidden relative rounded-xl transition-all duration-300`} 
        style={{ height: `${height}px`, width: `${height}px` }}
        id={`visual-adda-logo-${variant}-icon`}
      >
        <img
          src={logoImg}
          alt="Visual Adda Icon"
          className="absolute top-0 left-0 h-full max-w-none select-none opacity-95 hover:opacity-100 transition-opacity"
          style={{ 
            width: "auto", 
            objectFit: "cover",
            objectPosition: "left"
          }}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }
}

