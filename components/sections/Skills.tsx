"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const SkillsSphere = dynamic(() => import("@/components/3d/SkillsSphere"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  ),
});

const skillCategories = {
  Frontend: {
    core: ["React", "TypeScript", "JavaScript"],
    additional: ["Next.js", "Redux", "GraphQL", "HTML5", "CSS3", "Tailwind CSS"],
  },
  Testing: {
    core: ["Jest", "React Testing Library"],
    additional: ["Cypress", "Playwright", "Unit Testing", "Integration Testing"],
  },
  Tools: {
    core: ["Git", "VS Code", "npm/yarn"],
    additional: ["Docker", "Webpack", "Vite", "ESLint", "Prettier"],
  },
  Architecture: {
    core: ["Microfrontends", "Design Patterns"],
    additional: ["REST API", "WebSockets", "Performance Optimization", "CI/CD"],
  },
};

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-card/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground">
            Interactive visualization of my technical stack
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-[500px]"
          >
            <SkillsSphere />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {Object.entries(skillCategories).map(([category, skills], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-lg border border-border"
              >
                <h3 className="text-xl font-semibold mb-4 text-primary">{category}</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Core Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.core.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Additional</p>
                    <div className="flex flex-wrap gap-2">
                      {skills.additional.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-secondary/50 text-foreground rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}