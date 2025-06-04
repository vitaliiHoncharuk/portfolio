"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Layers, BarChart2, GitBranch } from "lucide-react";

const achievements = [
  {
    title: "35% Performance Boost",
    description: "Optimized critical rendering paths for The Access Group",
    icon: <BarChart2 className="h-8 w-8 text-primary" />,
  },
  {
    title: "70% Test Coverage",
    description: "Implemented comprehensive testing strategy at GlobalLogic",
    icon: <Zap className="h-8 w-8 text-primary" />,
  },
  {
    title: "50+ Components",
    description: "Built extensive shared UI component library",
    icon: <Layers className="h-8 w-8 text-primary" />,
  },
  {
    title: "3 Major Migrations",
    description: "Led successful microfrontend implementations",
    icon: <GitBranch className="h-8 w-8 text-primary" />,
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.div
            className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-6 sm:mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-foreground/90 mb-8 lg:mb-0"
          >
            <p className="text-base sm:text-lg mb-4 sm:mb-6">
              I&apos;m a problem-solver at heart, passionate about creating efficient, 
              maintainable code that drives business value. With experience spanning 
              FinTech, HealthCare, and IoT domains, I bring a unique perspective to every project.
            </p>
            <p className="text-base sm:text-lg mb-4 sm:mb-6">
              My approach combines technical excellence with a deep understanding of user needs, 
              resulting in solutions that are both powerful and intuitive.
            </p>
            <div className="mt-6 sm:mt-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Key Specializations</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-center text-sm sm:text-base">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  React Ecosystem Mastery
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Performance Optimization
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Microfrontend Architecture
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Test-Driven Development
                </li>
                <li className="flex items-center text-sm sm:text-base">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Team Leadership & Mentoring
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {achievements.map((achievement, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full card-hover bg-card border border-border/50">
                  <CardContent className="p-4 sm:p-6">
                    <div className="mb-3 sm:mb-4">{achievement.icon}</div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-primary">
                      {achievement.title}
                    </h3>
                    <p className="text-sm sm:text-base text-foreground/70">{achievement.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}