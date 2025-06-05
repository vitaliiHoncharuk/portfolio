"use client";

import { useEffect, useRef, useState } from "react";

export default function CSSAtom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const x = (e.clientY - centerY) / rect.height * 20;
        const y = (e.clientX - centerX) / rect.width * 20;
        
        setRotation({ x: -x, y });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="atom-container relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: 'transform 0.3s ease-out',
          willChange: 'transform',
          contain: 'layout style paint',
        }}
      >
        {/* Nucleus */}
        <div className="nucleus absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="nucleus-glow absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
            <div className="nucleus-core relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary via-secondary to-accent shadow-xl">
              <div className="absolute inset-1 sm:inset-2 rounded-full bg-gradient-to-br from-primary/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Electron Orbits */}
        <div className="orbit orbit-1 absolute inset-0">
          <div className="orbit-path absolute inset-0 rounded-full border border-primary/30" />
          <div className="electron electron-1 absolute w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-primary to-blue-500 shadow-lg" />
        </div>

        <div className="orbit orbit-2 absolute inset-0">
          <div className="orbit-path absolute inset-0 rounded-full border border-secondary/30" />
          <div className="electron electron-2 absolute w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-secondary to-purple-500 shadow-lg" />
        </div>

        <div className="orbit orbit-3 absolute inset-0">
          <div className="orbit-path absolute inset-0 rounded-full border border-accent/30" />
          <div className="electron electron-3 absolute w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-accent to-yellow-500 shadow-lg" />
        </div>

        {/* Static positioned particles for performance */}
        <div className="particle particle-1 absolute w-1 h-1 rounded-full bg-blue-400/60" />
        <div className="particle particle-2 absolute w-1 h-1 rounded-full bg-purple-400/60" />
        <div className="particle particle-3 absolute w-1 h-1 rounded-full bg-pink-400/60" />
        <div className="particle particle-4 absolute w-1 h-1 rounded-full bg-yellow-400/60" />
      </div>

      <style jsx>{`
        .atom-container {
          animation: rotate 15s linear infinite;
        }
        
        .nucleus-core {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .orbit-1 {
          transform: rotateX(60deg) rotateZ(0deg);
          animation: orbit-1 4s linear infinite;
        }
        
        .orbit-2 {
          transform: rotateX(60deg) rotateZ(60deg);
          animation: orbit-2 5s linear infinite reverse;
        }
        
        .orbit-3 {
          transform: rotateX(60deg) rotateZ(120deg);
          animation: orbit-3 6s linear infinite;
        }
        
        .electron-1 {
          top: -2px;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .electron-2 {
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .electron-3 {
          top: 50%;
          right: -2px;
          transform: translateY(-50%);
        }
        
        .particle-1 {
          left: 25%;
          top: 30%;
          animation: float-1 4s ease-in-out infinite;
        }
        
        .particle-2 {
          left: 40%;
          top: 40%;
          animation: float-2 5s ease-in-out infinite;
        }
        
        .particle-3 {
          left: 55%;
          top: 50%;
          animation: float-3 6s ease-in-out infinite;
        }
        
        .particle-4 {
          left: 70%;
          top: 60%;
          animation: float-4 7s ease-in-out infinite;
        }
        
        @media (min-width: 768px) {
          .electron-1 {
            top: -3px;
          }
          .electron-2 {
            bottom: -3px;
          }
          .electron-3 {
            right: -3px;
          }
        }
        
        @keyframes rotate {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(360deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes orbit-1 {
          from { transform: rotateX(60deg) rotateZ(0deg); }
          to { transform: rotateX(60deg) rotateZ(360deg); }
        }
        
        @keyframes orbit-2 {
          from { transform: rotateX(60deg) rotateZ(60deg); }
          to { transform: rotateX(60deg) rotateZ(420deg); }
        }
        
        @keyframes orbit-3 {
          from { transform: rotateX(60deg) rotateZ(120deg); }
          to { transform: rotateX(60deg) rotateZ(480deg); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-15px) translateX(-8px); opacity: 0.8; }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
          50% { transform: translateY(-25px) translateX(5px); opacity: 0.9; }
        }
        
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          50% { transform: translateY(-18px) translateX(-12px); opacity: 0.7; }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .atom-container,
          .nucleus-core,
          .orbit-1,
          .orbit-2,
          .orbit-3,
          .particle {
            animation: none !important;
          }
        }
        
        @media (max-width: 768px) {
          .atom-container {
            animation-duration: 20s;
          }
          .orbit-1,
          .orbit-2,
          .orbit-3 {
            animation-duration: 8s, 10s, 12s;
          }
        }
      `}</style>
    </div>
  );
}