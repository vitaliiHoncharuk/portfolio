"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Building } from "lucide-react";

const experiences = [
  {
    company: "EPAM",
    position: "Senior React Developer",
    period: "June 2021 - Present",
    location: "Lviv, Ukraine",
    description: "Leading FinTech projects for The Access Group & McKesson",
    achievements: [
      "Achieved 35% performance improvement in financial management platform",
      "Implemented microfrontend architecture for scalable solutions",
      "Led technical initiatives and mentored junior developers",
      "Delivered McKesson Delivery Hero award for exceptional performance"
    ],
    technologies: ["React", "TypeScript", "GraphQL", "Microfrontends", "Jest"]
  },
  {
    company: "GlobalLogic",
    position: "React Developer",
    period: "July 2019 - June 2021",
    location: "Lviv, Ukraine",
    description: "Developed solutions for FinTech, HealthCare, and IoT domains",
    achievements: [
      "Built healthcare management system with 70% test coverage",
      "Created shared UI component library with 50+ components",
      "Implemented real-time code execution platform for technical assessments",
      "Received Delivery Excellence award for consistent high-quality delivery"
    ],
    technologies: ["React", "Redux", "Node.js", "MongoDB", "PostgreSQL"]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 bg-card/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience</h2>
          <p className="text-lg text-muted-foreground">
            Building innovative solutions across multiple industries
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-border" />
          
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative flex items-center justify-between mb-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="hidden md:block w-5/12" />
              
              <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background" />
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="ml-16 md:ml-0 w-full md:w-5/12 bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary">{experience.company}</h3>
                    <p className="text-lg font-medium">{experience.position}</p>
                  </div>
                  <Building className="w-8 h-8 text-muted-foreground" />
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {experience.period}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {experience.location}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">{experience.description}</p>
                
                <ul className="space-y-2 mb-4">
                  {experience.achievements.map((achievement, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}