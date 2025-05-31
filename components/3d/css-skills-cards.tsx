"use client";

import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";

// Technology Logo Components
const TechLogos = {
  React: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
      <path fill="currentColor" d="M12 1C18.5 1 23 5.5 23 12s-4.5 11-11 11S1 18.5 1 12 5.5 1 12 1zm0 2C6.5 3 3 6.5 3 12s3.5 9 9 9 9-3.5 9-9-3.5-9-9-9z"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 12)"/>
    </svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875H3.375c-1.036 0-1.875-.84-1.875-1.875V6.375z"/>
      <path fill="white" d="M12.75 12h-1.5v6h-1.5v-6H8.25V10.5h4.5V12zm6.75 5.25v-1.125h-3V15h2.25v-1.125h-2.25v-.75h3v-1.125h-4.5V18h4.5z"/>
    </svg>
  ),
  JavaScript: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
    </svg>
  ),
  NextJS: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M11.214 0c-.165 0-.33.013-.495.039L6.827 4.923A12.038 12.038 0 0 0 12 24c6.624 0 12-5.376 12-12S18.624 0 12 0c-.27 0-.538.011-.786.039zm4.455 5.663l3.667 5.502v.165L15.77 18.18l-4.112-6.236 4.011-6.281z"/>
    </svg>
  ),
  Redux: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M16.634 16.504c.87-.075 1.543-.84 1.5-1.754-.044-.914-.793-1.653-1.708-1.653h-.061c-.923.044-1.652.793-1.652 1.708 0 .424.18.824.48 1.093-1.022 2.018-2.567 3.511-4.895 4.622-1.589.756-3.233.9-4.832.423-1.315-.393-2.361-1.218-3.056-2.4-.916-1.57-1.003-3.274-.244-4.948.57-1.239 1.488-2.158 2.074-2.615-.135-.45-.195-.915-.135-1.379C4.274 6.862 7.504 4.82 11.79 4.82c3.522 0 6.617 1.581 8.375 4.242.75 1.14 1.13 2.355 1.13 3.6 0 1.11-.285 2.115-.855 2.985-.465.705-1.065 1.187-1.665 1.442z"/>
    </svg>
  ),
  GraphQL: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M14.051 2.751l4.935 2.85c.816.47 1.316 1.338 1.316 2.278v5.701c0 .94-.5 1.808-1.316 2.278l-4.935 2.85c-.816.47-1.82.47-2.636 0l-4.935-2.85C5.664 15.388 5.164 14.52 5.164 13.58V7.879c0-.94.5-1.808 1.316-2.278l4.935-2.85c.816-.47 1.82-.47 2.636 0z"/>
    </svg>
  ),
  NodeJS: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.331-.08-.382.585-.203.703-.25 1.328-.605.065-.037.151-.023.218.017l2.256 1.339c.082.047.197.047.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.097-.052-.19-.137-.238L11.13 1.607c-.083-.047-.194-.047-.277 0L2.058 6.683c-.087.047-.139.141-.139.238v10.15c0 .097.052.191.139.238l2.409 1.391c1.307.654 2.108-.116 2.108-.889V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .253.111.253.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.226 18.665c-.571-.329-.922-.943-.922-1.604V6.921c0-.661.351-1.275.922-1.604L9.021.238C9.617-.079 10.4-.079 11.998.238l8.795 5.079c.57.329.922.943.922 1.604v10.15c0 .661-.352 1.275-.922 1.604l-8.795 5.078c-.28.163-.601.247-.922.247z"/>
    </svg>
  ),
  CSS: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.413l.213 2.622h10.125l-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/>
    </svg>
  ),
  Git: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
    </svg>
  ),
  Jest: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M22.251 11.82a3.117 3.117 0 0 0-2.328-3.01L22.911 0H8.104L11.092 8.81a3.116 3.116 0 0 0-2.244 2.988c0 1.043.52 1.967 1.313 2.536a8.279 8.279 0 0 1-1.084 1.244 8.14 8.14 0 0 1-2.55 1.647c-.834-.563-1.195-1.556-.869-2.446a3.11 3.11 0 0 0-.91-6.08 3.117 3.117 0 0 0-3.113 3.113c0 .848.347 1.626.903 2.182-.048.097-.098.195-.15.195-.150.295-.295.595-.46.877l-.456.77c-.328.571-.735 1.073-1.244 1.526a3.11 3.11 0 0 0-.759 6.053A3.11 3.11 0 0 0 3.86 24a3.11 3.11 0 0 0 2.8-4.554 8.994 8.994 0 0 0 .759-.604c.516-.45.94-.988 1.300-1.556l.456-.77c.132-.229.27-.462.415-.699.145-.219.284-.442.415-.662.131-.22.27-.445.415-.662a2.99 2.99 0 0 0 .759.098c.179 0 .36-.014.539-.045a2.97 2.97 0 0 0 .539.045c.179 0 .36-.014.539-.045.179.031.36.045.539.045a2.99 2.99 0 0 0 .759-.098c.145.217.284.442.415.662.145.22.284.443.415.662.145.237.283.47.415.699l.456.77c.36.568.784 1.106 1.3 1.556.172.15.348.296.532.441.184.146.375.288.574.427a8.934 8.934 0 0 0 .724.441 3.11 3.11 0 0 0 2.8 4.554 3.11 3.11 0 0 0 3.1-3.113 3.11 3.11 0 0 0-.759-6.053 8.25 8.25 0 0 1-1.244-1.526l-.456-.77c-.165-.282-.31-.582-.46-.877-.052 0-.102-.098-.15-.195a3.113 3.113 0 0 0 .903-2.182c0-1.05-.52-1.983-1.313-2.536.52-.569.832-1.326.832-2.154z"/>
    </svg>
  ),
  MongoDB: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218z"/>
    </svg>
  )
};

const skills = [
  { name: "React", color: "#61DAFB", level: 95, years: 5, logo: TechLogos.React, category: "Frontend" },
  { name: "TypeScript", color: "#3178C6", level: 90, years: 4, logo: TechLogos.TypeScript, category: "Frontend" },
  { name: "JavaScript", color: "#F7DF1E", level: 95, years: 6, logo: TechLogos.JavaScript, category: "Frontend" },
  { name: "Next.js", color: "#000000", level: 85, years: 3, logo: TechLogos.NextJS, category: "Frontend" },
  { name: "Redux", color: "#764ABC", level: 90, years: 4, logo: TechLogos.Redux, category: "Frontend" },
  { name: "GraphQL", color: "#E535AB", level: 80, years: 3, logo: TechLogos.GraphQL, category: "Backend" },
  { name: "Node.js", color: "#339933", level: 80, years: 4, logo: TechLogos.NodeJS, category: "Backend" },
  { name: "CSS/Sass", color: "#1572B6", level: 90, years: 6, logo: TechLogos.CSS, category: "Frontend" },
  { name: "Docker", color: "#2496ED", level: 75, years: 2, logo: TechLogos.Docker, category: "DevOps" },
  { name: "Git", color: "#F05032", level: 90, years: 6, logo: TechLogos.Git, category: "DevOps" },
  { name: "Jest", color: "#C21325", level: 85, years: 4, logo: TechLogos.Jest, category: "Testing" },
  { name: "MongoDB", color: "#47A248", level: 70, years: 3, logo: TechLogos.MongoDB, category: "Backend" },
];

export default function CSSSkillsCards() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [mounted, setMounted] = useState(false);

  const categories = ["all", "Frontend", "Backend", "DevOps", "Testing"];
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Memoize filtered skills to prevent unnecessary re-renders
  const filteredSkills = useMemo(() => {
    return selectedCategory === "all" 
      ? skills 
      : skills.filter(skill => skill.category === selectedCategory);
  }, [selectedCategory]);

  if (!mounted) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <div className="flex gap-2 mb-8">
          {categories.map(category => (
            <div
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium bg-muted/50 text-foreground"
            >
              {category}
            </div>
          ))}
        </div>
        <div className="relative w-full max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.slice(0, 8).map((_, index) => (
              <div key={index} className="h-32 rounded-xl bg-muted/20 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {/* Category Filter */}
      <div className="flex gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-primary text-background"
                : "bg-muted/50 hover:bg-muted text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="relative w-full max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="group relative transition-transform duration-300 ease-out hover:scale-105"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: index * 0.03,
                duration: 0.4,
                ease: "easeOut"
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div 
                className="relative h-32 rounded-xl cursor-pointer transform-gpu transition-all duration-300 ease-out group-hover:translate-z-5"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Card Face */}
                <div 
                  className="absolute inset-0 rounded-xl p-4 backdrop-blur-sm border-2 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${skill.color}15 0%, ${skill.color}05 100%)`,
                    borderColor: `${skill.color}50`,
                    boxShadow: `0 5px 15px rgba(0,0,0,0.1)`,
                  }}
                >
                  {/* Technology Logo */}
                  <div 
                    className="mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" 
                    style={{ color: skill.color }}
                  >
                    <skill.logo />
                  </div>
                  
                  {/* Skill Name */}
                  <h3 className="font-semibold text-sm mb-1" style={{ color: skill.color }}>
                    {skill.name}
                  </h3>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-1 bg-muted/30 rounded-full overflow-hidden mb-2">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: index * 0.02 + 0.2, duration: 0.6, ease: "easeOut" }}
                    />
                  </div>
                  
                  {/* Level */}
                  <div className="text-xs text-muted-foreground">
                    {skill.level}%
                  </div>
                  
                  {/* Years Experience (hover tooltip) */}
                  <div
                    className="absolute bottom-2 right-2 text-xs font-medium px-2 py-1 rounded-md opacity-0 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{ 
                      backgroundColor: skill.color,
                      color: "white"
                    }}
                  >
                    {skill.years} years
                  </div>
                </div>

                {/* Hover Shadow */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-10"
                  style={{
                    background: skill.color,
                    transform: "translateZ(-10px) translateY(5px)",
                    filter: "blur(10px)",
                  }}
                />
                
                {/* Enhanced border on hover */}
                <div 
                  className="absolute inset-0 rounded-xl border-2 opacity-0 transition-all duration-300 group-hover:opacity-100"
                  style={{
                    borderColor: skill.color,
                    boxShadow: `0 20px 40px ${skill.color}40, inset 0 0 20px ${skill.color}20`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}