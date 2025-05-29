"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Code2, Users } from "lucide-react";

const achievements = [
  {
    icon: Zap,
    title: "35% Performance Boost",
    description: "Optimized financial platform at EPAM",
    color: "text-yellow-500",
  },
  {
    icon: Shield,
    title: "70% Test Coverage",
    description: "Achieved at GlobalLogic projects",
    color: "text-green-500",
  },
  {
    icon: Code2,
    title: "50+ Components",
    description: "Built shared UI library",
    color: "text-blue-500",
  },
  {
    icon: Users,
    title: "3 Major Migrations",
    description: "Led microfrontend implementations",
    color: "text-purple-500",
  },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I&apos;m a problem-solver at heart, passionate about creating efficient, maintainable code 
            that drives business value. With experience spanning FinTech, HealthCare, and IoT domains, 
            I bring a unique perspective to every project. My approach combines technical excellence 
            with a deep understanding of user needs, resulting in solutions that are both powerful and intuitive.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <achievement.icon className={`w-12 h-12 mb-4 ${achievement.color}`} />
              <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
              <p className="text-muted-foreground">{achievement.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-6">Key Specializations</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React Ecosystem Mastery",
              "Performance Optimization",
              "Microfrontend Architecture",
              "Test-Driven Development",
              "Team Leadership & Mentoring",
            ].map((spec, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {spec}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}