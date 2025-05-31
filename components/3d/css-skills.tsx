"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const skills = [
  { name: "React", color: "#61DAFB", level: 95, icon: "⚛️" },
  { name: "TypeScript", color: "#3178C6", level: 90, icon: "🔷" },
  { name: "JavaScript", color: "#F7DF1E", level: 95, icon: "🟨" },
  { name: "Next.js", color: "#ffffff", level: 85, icon: "▲" },
  { name: "Redux", color: "#764ABC", level: 90, icon: "🔄" },
  { name: "GraphQL", color: "#E535AB", level: 80, icon: "◈" },
  { name: "Node.js", color: "#339933", level: 80, icon: "🟢" },
  { name: "CSS", color: "#1572B6", level: 90, icon: "🎨" },
];

export default function CSSSkills() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      },
    });
  }, [controls]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        {/* Central core with enhanced effects */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            rotate: -360,
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-md border-2 border-white/10" />
          
          {/* Middle layer */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-sm" />
          
          {/* Core */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-primary via-secondary to-accent shadow-2xl">
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-white/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white/80">SKILLS</span>
            </div>
          </div>
          
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/50"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        {/* Orbiting skills with dynamic positioning */}
        <motion.div
          className="absolute inset-0"
          animate={controls}
        >
          {skills.map((skill, index) => {
            const angle = (index / skills.length) * Math.PI * 2;
            const radius = 160;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isHovered = hoveredSkill === index;
            
            return (
              <motion.div
                key={skill.name}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isHovered ? 1.3 : 1, 
                  opacity: 1,
                  z: isHovered ? 50 : 0,
                }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5,
                  scale: { duration: 0.3 }
                }}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <motion.div
                  className="relative group cursor-pointer"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [-360, 0],
                  }}
                  transition={{
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                >
                  {/* Skill bubble with enhanced design */}
                  <div className="relative">
                    {/* Glow effect */}
                    {isHovered && (
                      <motion.div
                        className="absolute -inset-2 rounded-full blur-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ backgroundColor: skill.color + "40" }}
                      />
                    )}
                    
                    <div
                      className="relative w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-xl transition-all duration-300 backdrop-blur-sm"
                      style={{
                        background: `linear-gradient(135deg, ${skill.color}30 0%, ${skill.color}10 100%)`,
                        borderColor: skill.color,
                        borderWidth: 2,
                      }}
                    >
                      <span className="text-2xl mb-1">{skill.icon}</span>
                      <span className="text-xs font-bold" style={{ color: skill.color }}>
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                
                  {/* Skill name with background */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <div 
                      className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm transition-all duration-300"
                      style={{ 
                        backgroundColor: isHovered ? skill.color + "20" : "transparent",
                        color: skill.color,
                        borderColor: isHovered ? skill.color : "transparent",
                        borderWidth: 1,
                      }}
                    >
                      {skill.name}
                    </div>
                  </div>
                
                  {/* Enhanced connection line */}
                  {(isHovered || hoveredSkill === null) && (
                    <svg
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"
                      style={{
                        width: `${Math.abs(x) + 40}px`,
                        height: `${Math.abs(y) + 40}px`,
                        left: x > 0 ? "50%" : `${-Math.abs(x) - 20}px`,
                        top: y > 0 ? "50%" : `${-Math.abs(y) - 20}px`,
                      }}
                    >
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={skill.color} stopOpacity="0" />
                          <stop offset="50%" stopColor={skill.color} stopOpacity={isHovered ? "0.5" : "0.2"} />
                          <stop offset="100%" stopColor={skill.color} stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <motion.line
                        x1={x > 0 ? 20 : Math.abs(x) + 20}
                        y1={y > 0 ? 20 : Math.abs(y) + 20}
                        x2={x > 0 ? Math.abs(x) + 20 : 20}
                        y2={y > 0 ? Math.abs(y) + 20 : 20}
                        stroke={`url(#gradient-${index})`}
                        strokeWidth={isHovered ? "3" : "1"}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </svg>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Enhanced rotating rings with gradients */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(96, 165, 250, 0.1), transparent)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-6 rounded-full"
          style={{
            background: "conic-gradient(from 180deg, transparent, rgba(192, 132, 252, 0.1), transparent)",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-12 rounded-full"
          style={{
            background: "conic-gradient(from 90deg, transparent, rgba(251, 191, 36, 0.1), transparent)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}