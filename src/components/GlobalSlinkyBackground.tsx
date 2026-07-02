import React, { useEffect, useRef } from "react";

interface GlobalSlinkyBackgroundProps {
  currentPage: string;
}

export default function GlobalSlinkyBackground({ currentPage }: GlobalSlinkyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollYRef = useRef(0);
  const targetScrollYRef = useRef(0);

  // Smoothly interpolated canvas states to support fluid page morphing!
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);
  const currentScaleRef = useRef(1.0);
  const currentRxRef = useRef(0.5);
  const currentRyRef = useRef(0.6);
  const currentRMajorRef = useRef(150);
  const currentRMinorRef = useRef(55);
  const currentOpacityRef = useRef(0.5);
  const currentHueRef = useRef(20);

  // Track real scroll position and interpolate for extreme buttery smoothness
  useEffect(() => {
    const handleScroll = () => {
      targetScrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let baseAngle = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initial state setup to center of screen
    currentXRef.current = window.innerWidth / 2;
    currentYRef.current = window.innerHeight / 2;

    // Torus points generation
    // We render a continuous spiral wireframe winding around a torus
    const numCoils = 140; // High count for premium chrome look
    const pointsPerCoil = 24;
    const totalPoints = numCoils * pointsPerCoil;

    // Precalculate torus local winding points to keep rendering fast
    const basePoints: { theta: number; phi: number; tx: number; ty: number; tz: number }[] = [];
    for (let i = 0; i < totalPoints; i++) {
      const theta = (i / totalPoints) * Math.PI * 2; // Major angle
      const phi = (i / pointsPerCoil) * Math.PI * 2;  // Minor angle

      // Torus equations before major circle wrapping
      basePoints.push({
        theta,
        phi,
        tx: Math.cos(phi),
        ty: Math.sin(phi),
        tz: Math.sin(phi) // Depth winding
      });
    }

    const render = () => {
      // Smoothly interpolate scroll position
      scrollYRef.current += (targetScrollYRef.current - scrollYRef.current) * 0.08;
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollYRef.current / scrollHeight)) : 0;

      // Clear with very slight fade for a gorgeous temporal ghosting/bloom effect
      ctx.fillStyle = "rgba(5, 5, 5, 0.95)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Variables to interpolate towards based on the current page & scroll percent
      let targetX = cx;
      let targetY = cy;
      let targetScale = 1.3;
      let targetRx = 0.5; // pitch
      let targetRy = 0.6; // yaw
      let targetRMajor = 150;
      let targetRMinor = 55;
      let targetOpacity = 0.5;
      let targetHue = 20; // Visual Adda orange-red default

      if (currentPage === "home") {
        // Multi-section layout interpolation maps based on Scroll Percentage on Home page
        if (scrollPercent < 0.25) {
          // Hero (Neon Orange)
          const t = scrollPercent / 0.25;
          targetX = cx + (canvas.width * 0.12) * t; 
          targetY = cy;
          targetScale = 1.15 + 0.45 * t;
          targetRx = 0.4 + 0.5 * t;
          targetRy = 0.5 - 0.7 * t;
          targetRMajor = 140 + 25 * t;
          targetRMinor = 48 + 12 * t;
          targetOpacity = 0.62 - 0.18 * t;
          targetHue = 20 + 15 * t; // deep orange to yellow-orange
        } else if (scrollPercent < 0.5) {
          // Services Bento (Neon Purple / Violet)
          const t = (scrollPercent - 0.25) / 0.25;
          targetX = cx + (canvas.width * 0.12) * (1 - t);
          targetY = cy;
          targetScale = 1.6 - 0.3 * t;
          targetRx = 0.9 - 0.8 * t; 
          targetRy = -0.2 + 0.6 * t;
          targetRMajor = 165 - 15 * t;
          targetRMinor = 60 - 8 * t;
          targetOpacity = 0.44 + 0.12 * t;
          targetHue = 35 + 240 * t; // morph to neon-purple
        } else if (scrollPercent < 0.75) {
          // Case Studies (shifted to side, Neon Yellow / Gold)
          const t = (scrollPercent - 0.5) / 0.25;
          targetX = cx - (canvas.width * 0.22) * t;
          targetY = cy;
          targetScale = 1.3 - 0.22 * t;
          targetRx = 0.1 + 0.42 * t;
          targetRy = 0.4 + 1.25 * t;
          targetRMajor = 150 - 15 * t;
          targetRMinor = 52 - 12 * t;
          targetOpacity = 0.56 - 0.1 * t;
          targetHue = 275 - 225 * t; // transition to neon yellow (approx hue 50)
        } else {
          // Pricing & FAQ bottom sections (Coral Red)
          const t = (scrollPercent - 0.75) / 0.25;
          targetX = cx - (canvas.width * 0.22) * (1 - t) + (canvas.width * 0.15) * t;
          targetY = cy + (canvas.height * 0.15) * t;
          targetScale = 1.08 + 0.35 * t;
          targetRx = 0.52 - 0.72 * t;
          targetRy = 1.65 - 0.85 * t;
          targetRMajor = 135 + 25 * t;
          targetRMinor = 40 + 15 * t;
          targetOpacity = 0.46 + 0.15 * t;
          targetHue = 50 + 300 * t; // morph back to flaming red (approx 350)
        }
      } else if (currentPage === "about") {
        // About Page: Centered slightly to the right (Neon Orange / Coral)
        targetX = cx + Math.min(250, canvas.width * 0.18);
        targetY = cy;
        targetScale = 1.45;
        targetRx = 0.85;
        targetRy = 0.25;
        targetRMajor = 160;
        targetRMinor = 55;
        targetOpacity = 0.55;
        targetHue = 20; // Neon Orange
      } else if (currentPage === "technology") {
        // Technology / AI Playground Page: Dynamic facing high-speed tunnel look (Vibrant Purple)
        targetX = cx;
        targetY = cy - 20;
        targetScale = 1.55;
        targetRx = 0.12;
        targetRy = -0.3;
        targetRMajor = 175;
        targetRMinor = 62;
        targetOpacity = 0.65;
        targetHue = 275; // deep purple
      } else if (currentPage === "contact") {
        // Contact Page: Bottom decorative slow rolling ribbon (Flaming Red)
        targetX = cx;
        targetY = cy + Math.min(280, canvas.height * 0.32);
        targetScale = 1.7;
        targetRx = -0.25;
        targetRy = 0.75;
        targetRMajor = 180;
        targetRMinor = 68;
        targetOpacity = 0.48;
        targetHue = 350; // flaming red
      }

      // Smoothly interpolate actual parameters using buttery ease factor
      const ease = 0.05; // 5% shift per frame for maximum fluid transition
      currentXRef.current += (targetX - currentXRef.current) * ease;
      currentYRef.current += (targetY - currentYRef.current) * ease;
      currentScaleRef.current += (targetScale - currentScaleRef.current) * ease;
      currentRxRef.current += (targetRx - currentRxRef.current) * ease;
      currentRyRef.current += (targetRy - currentRyRef.current) * ease;
      currentRMajorRef.current += (targetRMajor - currentRMajorRef.current) * ease;
      currentRMinorRef.current += (targetRMinor - currentRMinorRef.current) * ease;
      currentOpacityRef.current += (targetOpacity - currentOpacityRef.current) * ease;
      currentHueRef.current += (targetHue - currentHueRef.current) * ease;

      // Slowly rotate the entire torus over time
      baseAngle += 0.002;
      const anglePitch = currentRxRef.current;
      const angleYaw = currentRyRef.current + baseAngle;

      const cosP = Math.cos(anglePitch);
      const sinP = Math.sin(anglePitch);
      const cosY = Math.cos(angleYaw);
      const sinY = Math.sin(angleYaw);

      // Generate fully rotated and projected 3D points
      const projected: { x: number; y: number; z: number; color: string }[] = [];
      const actRMajor = currentRMajorRef.current;
      const actRMinor = currentRMinorRef.current;
      const actScale = currentScaleRef.current;
      const actHue = currentHueRef.current;
      const actOpacity = currentOpacityRef.current;

      for (let i = 0; i < totalPoints; i++) {
        const bp = basePoints[i];
        
        // Major wrap around Torus ring
        const majorR = actRMajor + actRMinor * bp.tx;
        const px = majorR * Math.cos(bp.theta);
        const py = majorR * Math.sin(bp.theta);
        const pz = actRMinor * bp.ty;

        // Apply pitch (X) and yaw (Y) rotations
        // Yaw
        let x1 = px * cosY - pz * sinY;
        let z1 = px * sinY + pz * cosY;
        // Pitch
        let y2 = py * cosP - z1 * sinP;
        let z2 = py * sinP + z1 * cosP;

        // Perspective scaling
        const fov = 450;
        const distance = 300;
        const scaleFactor = (fov / (distance + z2)) * actScale;

        const projX = currentXRef.current + x1 * scaleFactor;
        const projY = currentYRef.current + y2 * scaleFactor;

        // 3D depth-based color & lighting calculations
        const depthRel = (z2 + actRMinor) / (actRMinor * 2); // 0 (back) to 1 (front)
        const alpha = Math.max(0.08, Math.min(1, depthRel)) * actOpacity;
        const color = `hsla(${actHue}, 80%, 65%, ${alpha})`;

        projected.push({ x: projX, y: projY, z: z2, color });
      }

      // Painter's algorithm segments depth-sorting to produce perfect chrome wireframe
      const segments: { p1: any; p2: any; midZ: number }[] = [];
      for (let i = 0; i < totalPoints; i++) {
        const p1 = projected[i];
        const p2 = projected[(i + 1) % totalPoints];
        segments.push({
          p1,
          p2,
          midZ: (p1.z + p2.z) / 2
        });
      }

      // Sort back-to-front
      segments.sort((a, b) => b.midZ - a.midZ);

      // Render segments with gorgeous metallic line widths
      ctx.lineCap = "round";
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        
        // Front lines are thicker, back lines are hair-thin
        const isFront = seg.midZ < 0;
        ctx.lineWidth = isFront ? 1.8 : 0.8;
        
        ctx.strokeStyle = seg.p1.color;
        ctx.beginPath();
        ctx.moveTo(seg.p1.x, seg.p1.y);
        ctx.lineTo(seg.p2.x, seg.p2.y);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [currentPage]); // Re-run effect setup or capture currentPage changes securely

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden bg-[#050505]">
      <canvas ref={canvasRef} className="w-full h-full block opacity-85" />
      {/* Absolute Noise Overlay for visual grain */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
    </div>
  );
}
