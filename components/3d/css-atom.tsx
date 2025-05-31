"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CSSAtom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Pre-generate particle data to prevent hydration issues
  const [particleData] = useState(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      colorIndex: Math.floor(Math.random() * 4),
      initialX: Math.random() * 600 - 300,
      initialY: Math.random() * 600 - 300,
      animateX: Math.random() * 100 - 50,
      duration: Math.random() * 8 + 4,
      delay: Math.random() * 5,
    }));
  });

  useEffect(() => {
    setMounted(true);
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientY - centerY) / rect.height * 30;
      const y = (e.clientX - centerX) / rect.width * 30;
      
      setRotation({ x: -x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-72 h-72 md:w-80 md:h-80 transform-gpu"
        style={{
          transformStyle: "preserve-3d",
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        animate={{
          rotateZ: 360,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          rotateZ: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 0.5,
            ease: "easeOut",
          },
        }}
      >
        {/* Nucleus with glow effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="relative"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Outer glow */}
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-xl" />
            {/* Core */}
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary via-secondary to-accent shadow-2xl">
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/50 to-transparent" />
              <div className="absolute inset-0 rounded-full animate-pulse bg-white/20" />
            </div>
          </motion.div>
        </div>

        {/* Electron Orbits with enhanced effects */}
        <div className="absolute inset-0 transform rotate-45">
          <div className="absolute inset-0 rounded-full border-2 border-primary/40 shadow-[0_0_20px_rgba(96,165,250,0.5)]" />
          <motion.div
            className="absolute w-8 h-8 rounded-full shadow-2xl"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              top: "-4px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-blue-600 relative">
              <div className="absolute inset-0 rounded-full bg-white/40 blur-sm" />
              <motion.div 
                className="absolute -inset-1 rounded-full bg-primary/50 blur-md"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-0 transform -rotate-45">
          <div className="absolute inset-0 rounded-full border-2 border-secondary/40 shadow-[0_0_20px_rgba(192,132,252,0.5)]" />
          <motion.div
            className="absolute w-8 h-8 rounded-full shadow-2xl"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              bottom: "-4px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-secondary to-purple-600 relative">
              <div className="absolute inset-0 rounded-full bg-white/40 blur-sm" />
              <motion.div 
                className="absolute -inset-1 rounded-full bg-secondary/50 blur-md"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
              />
            </div>
          </motion.div>
        </div>

        <div className="absolute inset-0 transform rotate-90">
          <div className="absolute inset-0 rounded-full border-2 border-accent/40 shadow-[0_0_20px_rgba(251,191,36,0.5)]" />
          <motion.div
            className="absolute w-8 h-8 rounded-full shadow-2xl"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              top: "50%",
              right: "-4px",
              transform: "translateY(-50%)",
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-accent to-amber-600 relative">
              <div className="absolute inset-0 rounded-full bg-white/40 blur-sm" />
              <motion.div 
                className="absolute -inset-1 rounded-full bg-accent/50 blur-md"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Energy field effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl animate-pulse" />
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced floating particles */}
      {mounted && !reduceMotion && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particleData.map((particle) => {
            const colors = [
              'rgba(96, 165, 250, 0.8)',
              'rgba(192, 132, 252, 0.8)',
              'rgba(244, 114, 182, 0.8)',
              'rgba(251, 191, 36, 0.8)'
            ];
            
            return (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  width: particle.size + 'px',
                  height: particle.size + 'px',
                  background: `radial-gradient(circle, ${colors[particle.colorIndex]}, transparent)`,
                }}
                initial={{
                  x: particle.initialX,
                  y: particle.initialY,
                  scale: 0,
                }}
                animate={{
                  x: [null, particle.animateX],
                  y: [null, -100, 100],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}