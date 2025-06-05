"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./css-particles.module.css";

interface Particle {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  delay: number;
}

interface CSSParticlesProps {
  count?: number;
  className?: string;
}

export default function CSSParticles({ count = 50, className = "" }: CSSParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles with deterministic positions
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 200 + (i % 3) * 100;
      newParticles.push({
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: ((i % 5) - 2) * 100,
        size: 2 + (i % 3),
        delay: (i / count) * 5,
      });
    }
    setParticles(newParticles);
  }, [count]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      
      containerRef.current.style.setProperty('--mouse-x', (x * 30) + 'px');
      containerRef.current.style.setProperty('--mouse-y', (y * 30) + 'px');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={`${styles.particleContainer} ${className}`}>
      <div className={styles.particleField}>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              '--particle-x': particle.x + 'px',
              '--particle-y': particle.y + 'px',
              '--particle-z': particle.z + 'px',
              '--particle-size': particle.size + 'px',
              '--particle-delay': particle.delay + 's',
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}