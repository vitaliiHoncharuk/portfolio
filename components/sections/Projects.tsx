"use client";

import { motion } from "framer-motion";
import { ExternalLink, Zap, BarChart, Code, GitBranch } from "lucide-react";

const projects = [
  {
    title: "Financial Management Platform",
    company: "The Access Group",
    description: "Optimized React-based financial platform achieving 35% performance improvement through strategic code splitting and memoization techniques.",
    achievements: [
      "Reduced initial load time by 35%",
      "Implemented lazy loading for complex modules",
      "Optimized state management with Redux Toolkit",
      "Enhanced user experience with progressive enhancement"
    ],
    technologies: ["React", "TypeScript", "GraphQL", "Microfrontends", "Redux Toolkit"],
    icon: BarChart,
    color: "from-blue-500 to-cyan-500",
    metrics: {
      performance: "+35%",
      loadTime: "-2.3s",
      bundleSize: "-45%"
    }
  },
  {
    title: "Healthcare Management System",
    company: "Samsung",
    description: "Built comprehensive healthcare platform with microservice architecture, achieving 70% test coverage and seamless data synchronization.",
    achievements: [
      "Designed scalable microservice architecture",
      "Achieved 70% test coverage with Jest & React Testing Library",
      "Implemented real-time data sync with WebSockets",
      "Created responsive UI supporting multiple devices"
    ],
    technologies: ["Angular 4+", "Node.js", "MongoDB", "WebSockets", "Docker"],
    icon: Zap,
    color: "from-green-500 to-emerald-500",
    metrics: {
      testCoverage: "70%",
      uptime: "99.9%",
      users: "10K+"
    }
  },
  {
    title: "Technical Test Platform",
    company: "GlobalLogic",
    description: "Developed real-time code execution environment for technical assessments with secure sandboxed execution and live collaboration features.",
    achievements: [
      "Built secure code execution sandbox",
      "Implemented real-time collaboration with Socket.io",
      "Created intuitive code editor with syntax highlighting",
      "Designed comprehensive test suite management"
    ],
    technologies: ["React", "Redux", "PostgreSQL", "Socket.io", "Docker"],
    icon: Code,
    color: "from-purple-500 to-pink-500",
    metrics: {
      concurrent: "500+",
      languages: "12",
      assessments: "5K+"
    }
  },
  {
    title: "Trading Algorithm Builder",
    company: "ATPlatform",
    description: "Created visual programming interface for building trading algorithms using drag-and-drop functionality with Blockly API integration.",
    achievements: [
      "Integrated Blockly for visual programming",
      "Built custom blocks for trading operations",
      "Implemented algorithm backtesting engine",
      "Created real-time market data integration"
    ],
    technologies: ["React", "Redux", "Blockly API", "WebGL", "Chart.js"],
    icon: GitBranch,
    color: "from-orange-500 to-red-500",
    metrics: {
      algorithms: "100+",
      backtests: "10K+",
      accuracy: "94%"
    }
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Projects</h2>
          <p className="text-lg text-muted-foreground">
            Showcasing impactful solutions across FinTech, Healthcare, and EdTech
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-card rounded-lg border border-border hover:border-primary/50 overflow-hidden transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${project.color}`}>
                      <project.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground">{project.company}</p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{project.description}</p>

                <div className="space-y-2 mb-6">
                  {project.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start text-sm">
                      <span className="text-primary mr-2">✓</span>
                      <span className="text-muted-foreground">{achievement}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-2xl font-bold text-primary">{value}</p>
                      <p className="text-xs text-muted-foreground capitalize">{key}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-secondary/50 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}