"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const experiences = [
  {
    company: "EPAM",
    position: "Senior React Developer",
    period: "June 2021 - Present",
    description:
      "Leading the front-end development for financial management platforms at The Access Group and McKesson. Specializing in performance optimization and microfrontend architecture.",
    achievements: [
      "Improved initial load time by 35% through code splitting and lazy loading",
      "Implemented microfrontend architecture using Module Federation",
      "Led migration from class components to functional components with hooks",
      "Mentored junior developers and established front-end best practices",
    ],
    technologies: [
      "React", "TypeScript", "Redux", "GraphQL", "Webpack", "Jest", "Cypress"
    ],
  },
  {
    company: "GlobalLogic",
    position: "React Developer",
    period: "July 2019 - June 2021",
    description:
      "Worked on FinTech, HealthCare, and IoT projects, implementing responsive interfaces and ensuring high code quality through comprehensive testing.",
    achievements: [
      "Developed healthcare management dashboard with real-time updates",
      "Achieved 70% test coverage across all projects",
      "Integrated complex charting solutions for financial data visualization",
      "Built reusable component library used across multiple projects",
    ],
    technologies: [
      "React", "JavaScript", "Angular", "Node.js", "MongoDB", "RxJS", "SCSS"
    ],
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="experience" ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Work <span className="gradient-text">Experience</span>
          </motion.h2>
          <motion.div
            className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-6 sm:mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>

        <div className="relative max-w-3xl mx-auto pl-6 sm:pl-8 md:pl-0">
          {/* Timeline line - mobile version on left, desktop version centered */}
          <div className="absolute left-3 sm:left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-0.5 bg-primary/30" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8 sm:space-y-12 md:space-y-16"
          >
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={itemVariants} className="relative">
                <div className={`flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot - visible on all sizes */}
                  <div className="absolute left-2 sm:left-3 md:left-1/2 md:transform md:-translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary" style={{ top: '24px' }} />
                  
                  {/* Date */}
                  <div className="md:w-1/2 flex md:justify-center">
                    <div className={`bg-card p-2 sm:p-3 rounded-lg inline-block mb-3 sm:mb-4 md:mb-0 ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                      <span className="text-primary font-medium text-sm sm:text-base">{exp.period}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <Card className="md:w-1/2 experience-card card-hover border border-border/50">
                    <CardContent className="p-4 sm:p-5 md:p-6">
                      <h3 className="text-lg sm:text-xl font-bold">{exp.company}</h3>
                      <h4 className="text-base sm:text-lg text-primary mb-2">{exp.position}</h4>
                      <p className="text-sm sm:text-base text-foreground/80 mb-3 sm:mb-4">{exp.description}</p>
                      
                      <h5 className="font-medium text-primary mb-2 text-sm sm:text-base">Key Achievements:</h5>
                      <ul className="list-disc pl-4 sm:pl-5 mb-3 sm:mb-4 space-y-1 text-foreground/80">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="text-xs sm:text-sm md:text-base">{achievement}</li>
                        ))}
                      </ul>
                      
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
                        {exp.technologies.map((tech, i) => (
                          <Badge key={i} variant="outline" className="border-primary/50 text-primary text-xs sm:text-sm px-2 py-1">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}