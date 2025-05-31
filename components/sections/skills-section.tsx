"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
// import SkillsCanvas from "@/components/3d/skills-canvas";
// import CSSSkills from "@/components/3d/css-skills";
import CSSSkillsCards from "@/components/3d/css-skills-cards";

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "JavaScript", level: 95 },
      { name: "HTML/CSS", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Redux", level: 90 },
      { name: "GraphQL", level: 80 },
      { name: "Angular", level: 70 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 75 },
      { name: "REST APIs", level: 85 },
      { name: "MongoDB", level: 70 },
      { name: "PostgreSQL", level: 65 },
    ],
  },
  {
    name: "DevOps & Tools",
    skills: [
      { name: "Git", level: 90 },
      { name: "Webpack", level: 85 },
      { name: "Docker", level: 75 },
      { name: "CI/CD", level: 80 },
      { name: "Jest", level: 85 },
      { name: "Cypress", level: 80 },
    ],
  },
  {
    name: "Architecture",
    skills: [
      { name: "Microfrontends", level: 90 },
      { name: "Performance Optimization", level: 95 },
      { name: "Design Patterns", level: 85 },
      { name: "System Design", level: 80 },
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-muted/30 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Technical <span className="gradient-text">Skills</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>

        {/* Skills Display */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={isInView && mounted ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          suppressHydrationWarning
        >
          {mounted && <CSSSkillsCards />}
        </motion.div>
      </div>
    </section>
  );
}