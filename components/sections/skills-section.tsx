"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CSSSkillsCards from "@/components/3d/css-skills-cards";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-muted/30 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Technical <span className="gradient-text">Skills</span>
          </motion.h2>
          <motion.div
            className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-6 sm:mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>

        {/* Skills Display */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <CSSSkillsCards />
        </motion.div>
      </div>
    </section>
  );
}