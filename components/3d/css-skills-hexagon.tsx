"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const skills = [
  { name: "React", color: "#61DAFB", level: 95, years: 5, icon: "⚛️" },
  { name: "TypeScript", color: "#3178C6", level: 90, years: 4, icon: "🔷" },
  { name: "JavaScript", color: "#F7DF1E", level: 95, years: 6, icon: "🟨" },
  { name: "Next.js", color: "#ffffff", level: 85, years: 3, icon: "▲" },
  { name: "Redux", color: "#764ABC", level: 90, years: 4, icon: "🔄" },
  { name: "GraphQL", color: "#E535AB", level: 80, years: 3, icon: "◈" },
  { name: "Node.js", color: "#339933", level: 80, years: 4, icon: "🟢" },
  { name: "CSS/Sass", color: "#1572B6", level: 90, years: 6, icon: "🎨" },
  { name: "Docker", color: "#2496ED", level: 75, years: 2, icon: "🐳" },
  { name: "Git", color: "#F05032", level: 90, years: 6, icon: "🔀" },
  { name: "Jest", color: "#C21325", level: 85, years: 4, icon: "🧪" },
  { name: "MongoDB", color: "#47A248", level: 70, years: 3, icon: "🍃" },
];

export default function CSSSkillsHexagon() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [centerRotation, setCenterRotation] = useState(0);

  // Calculate hexagon positions
  const getHexPosition = (index: number) => {
    if (index === 0) return { x: 0, y: 0 }; // Center

    const ring = Math.ceil(index / 6);
    const positionInRing = (index - 1) % 6;
    const angle = (positionInRing * 60 + ring * 30) * (Math.PI / 180);
    const radius = ring * 80;

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <motion.div
        className="relative"
        animate={{ rotate: centerRotation }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {skills.map((skill, index) => {
          const position = getHexPosition(index);
          const isHovered = hoveredSkill === index;
          const isCenter = index === 0;

          return (
            <motion.div
              key={skill.name}
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isHovered ? 1.2 : 1, 
                opacity: 1,
                z: isHovered ? 50 : 0,
              }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.5,
                scale: { duration: 0.3 }
              }}
              onMouseEnter={() => {
                setHoveredSkill(index);
                if (isCenter) setCenterRotation(centerRotation + 30);
              }}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Hexagon Container */}
              <div
                className={`
                  hexagon relative cursor-pointer
                  ${isCenter ? "w-28 h-28" : "w-24 h-24"}
                  ${isHovered ? "z-20" : "z-10"}
                `}
              >
                {/* Hexagon Background */}
                <div
                  className="hexagon-inner absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}20 0%, ${skill.color}10 100%)`,
                    boxShadow: isHovered
                      ? `0 0 30px ${skill.color}60, inset 0 0 20px ${skill.color}30`
                      : `0 0 10px rgba(0,0,0,0.2)`,
                  }}
                />

                {/* Hexagon Border */}
                <div
                  className="hexagon-border absolute inset-0"
                  style={{
                    background: skill.color,
                    opacity: isHovered ? 1 : 0.5,
                  }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-2">
                  <div className="text-2xl mb-1">{skill.icon}</div>
                  <div className="text-xs font-semibold text-center" style={{ color: skill.color }}>
                    {skill.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {skill.level}%
                  </div>

                  {/* Years tooltip */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0,
                      scale: isHovered ? 1 : 0.8
                    }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 
                               bg-background/90 backdrop-blur-sm px-3 py-1 
                               rounded-full text-xs font-medium whitespace-nowrap
                               border"
                    style={{ borderColor: skill.color }}
                  >
                    {skill.years} years experience
                  </motion.div>
                </div>

                {/* Glow effect */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 hexagon-inner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      background: `radial-gradient(circle, ${skill.color}40 0%, transparent 70%)`,
                      filter: "blur(20px)",
                      transform: "scale(1.5)",
                    }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <style jsx>{`
        .hexagon {
          position: relative;
          margin: 0 auto;
        }

        .hexagon-inner,
        .hexagon-border {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          clip-path: polygon(
            30% 0%,
            70% 0%,
            100% 50%,
            70% 100%,
            30% 100%,
            0% 50%
          );
        }

        .hexagon-border {
          transform: scale(0.98);
          z-index: 1;
        }

        .hexagon-inner {
          transform: scale(0.94);
          z-index: 2;
        }
      `}</style>
    </div>
  );
}