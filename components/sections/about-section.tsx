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
  const isInView = useInView(sectionRef, { once: true, amount: 0.1, margin: "0px 0px -100px 0px" });

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
    <section id="about" ref={sectionRef} className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
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
            animate={isInView ? { width: "4rem" } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-start lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-foreground/90 mb-12 lg:mb-0"
          >
            <p className="text-lg sm:text-xl leading-relaxed mb-6 sm:mb-8 text-foreground/80">
              I am a problem-solver at heart, passionate about creating efficient, 
              maintainable code that drives business value. With experience spanning 
              FinTech, HealthCare, and IoT domains, I bring a unique perspective to every project.
            </p>
            <p className="text-lg sm:text-xl leading-relaxed mb-6 sm:mb-8 text-foreground/80">
              My approach combines technical excellence with a deep understanding of user needs, 
              resulting in solutions that are both powerful and intuitive.
            </p>
            <div className="mt-8 sm:mt-10">
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-foreground">Key Specializations</h3>
              <ul className="space-y-4">
                <li className="flex items-center text-base sm:text-lg">
                  <span className="w-3 h-3 bg-primary rounded-full mr-4 flex-shrink-0"></span>
                  <span className="text-foreground/80">React Ecosystem Mastery</span>
                </li>
                <li className="flex items-center text-base sm:text-lg">
                  <span className="w-3 h-3 bg-primary rounded-full mr-4 flex-shrink-0"></span>
                  <span className="text-foreground/80">Performance Optimization</span>
                </li>
                <li className="flex items-center text-base sm:text-lg">
                  <span className="w-3 h-3 bg-primary rounded-full mr-4 flex-shrink-0"></span>
                  <span className="text-foreground/80">Microfrontend Architecture</span>
                </li>
                <li className="flex items-center text-base sm:text-lg">
                  <span className="w-3 h-3 bg-primary rounded-full mr-4 flex-shrink-0"></span>
                  <span className="text-foreground/80">Test-Driven Development</span>
                </li>
                <li className="flex items-center text-base sm:text-lg">
                  <span className="w-3 h-3 bg-primary rounded-full mr-4 flex-shrink-0"></span>
                  <span className="text-foreground/80">Team Leadership & Mentoring</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          >
            {achievements.map((achievement, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full card-hover bg-card border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6 sm:p-8">
                    <div className="mb-4 sm:mb-6">{achievement.icon}</div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-primary">
                      {achievement.title}
                    </h3>
                    <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">{achievement.description}</p>
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