"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, BarChart, Code2, Shield, Brain, Sparkles, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "@/components/ui/project-card";

const projects = [
  {
    title: "Financial Management Platform",
    client: "The Access Group",
    category: "fintech",
    description:
      "Enterprise-grade financial management platform with real-time data visualization, transaction management, and reporting capabilities.",
    longDescription: "Led the development of a comprehensive financial management solution that processes over 10,000 transactions daily. Implemented advanced caching strategies and optimized database queries resulting in significant performance improvements.",
    achievement: "35% performance optimization",
    metrics: [
      { label: "Response Time", value: "<100ms", improvement: "+35%" },
      { label: "Users", value: "50K+", improvement: "+120%" },
      { label: "Uptime", value: "99.9%", improvement: "" },
    ],
    image: "https://images.pexels.com/photos/6801647/pexels-photo-6801647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    technologies: ["React", "TypeScript", "GraphQL", "Microfrontends", "Redis", "AWS"],
    demoLink: "#",
    githubLink: "#",
    icon: <TrendingUp className="h-8 w-8" />,
    featured: true,
  },
  {
    title: "Healthcare Management System",
    client: "Samsung",
    category: "healthcare",
    description:
      "Comprehensive healthcare management platform for patient records, scheduling, and analytics with real-time updates.",
    longDescription: "Architected a scalable healthcare platform serving multiple hospitals. Implemented real-time notifications, secure data handling, and HIPAA-compliant infrastructure.",
    achievement: "Microservice architecture implementation",
    metrics: [
      { label: "Patients", value: "100K+", improvement: "" },
      { label: "Hospitals", value: "25+", improvement: "+15" },
      { label: "API Latency", value: "<50ms", improvement: "+40%" },
    ],
    image: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    technologies: ["Angular", "Node.js", "MongoDB", "RxJS", "Docker", "Kubernetes"],
    demoLink: "#",
    githubLink: "#",
    icon: <Shield className="h-8 w-8" />,
    featured: true,
  },
  {
    title: "Technical Test Platform",
    client: "GlobalLogic",
    category: "developer-tools",
    description:
      "Real-time code execution environment for technical interviews with collaborative editing and automated evaluation.",
    longDescription: "Built a complete technical assessment platform from scratch, featuring sandboxed code execution, real-time collaboration, and automated scoring algorithms.",
    achievement: "Built complete system from concept to deployment",
    metrics: [
      { label: "Interviews", value: "10K+", improvement: "" },
      { label: "Languages", value: "15+", improvement: "" },
      { label: "Accuracy", value: "98%", improvement: "" },
    ],
    image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    technologies: ["React", "Redux", "PostgreSQL", "Docker", "WebRTC", "Monaco Editor"],
    demoLink: "#",
    githubLink: "#",
    icon: <Code2 className="h-8 w-8" />,
    featured: false,
  },
  {
    title: "Trading Algorithm Builder",
    client: "ATPlatform",
    category: "fintech",
    description:
      "Visual programming interface for creating custom trading algorithms with drag-and-drop functionality.",
    longDescription: "Developed an intuitive visual programming environment that allows traders to build complex algorithms without coding. Integrated real-time market data feeds and backtesting capabilities.",
    achievement: "Built visual programming interface",
    metrics: [
      { label: "Algorithms", value: "500+", improvement: "" },
      { label: "Backtests/day", value: "1K+", improvement: "" },
      { label: "Execution Speed", value: "<10ms", improvement: "" },
    ],
    image: "https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    technologies: ["React", "Redux", "Blockly API", "WebSockets", "Python", "TradingView"],
    demoLink: "#",
    githubLink: "#",
    icon: <Brain className="h-8 w-8" />,
    featured: false,
  },
];

const categories = [
  { id: "all", label: "All Projects", icon: <Sparkles className="w-4 h-4" /> },
  { id: "fintech", label: "FinTech", icon: <TrendingUp className="w-4 h-4" /> },
  { id: "healthcare", label: "Healthcare", icon: <Shield className="w-4 h-4" /> },
  { id: "developer-tools", label: "Dev Tools", icon: <Code2 className="w-4 h-4" /> },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: parallaxY }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <span className="text-primary font-mono text-sm">// featured work</span>
          </motion.div>
          
          <motion.h2
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block text-4xl md:text-5xl lg:text-6xl font-bold mb-2">Projects that</span>
            <span className="block gradient-text text-5xl md:text-6xl lg:text-7xl font-bold">make impact</span>
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            A selection of projects that showcase my expertise in building scalable,
            performant applications for enterprise clients.
          </motion.p>
        </div>
        
        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 h-auto p-1 bg-muted/50">
              {categories.map(cat => (
                <TabsTrigger 
                  key={cat.id} 
                  value={cat.id}
                  className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  {cat.icon}
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span className="sm:hidden">{cat.label.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {filteredProjects
            .filter(p => p.featured)
            .map((project, index) => (
              <motion.div
                key={project.title}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" }
                  }
                }}
              >
                <ProjectCard project={project} index={index} isFeatured />
              </motion.div>
            ))}
        </motion.div>
        
        {/* Other Projects */}
        {filteredProjects.filter(p => !p.featured).length > 0 && (
          <>
            <motion.h3
              className="text-2xl font-semibold mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              More Projects
            </motion.h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects
                .filter(p => !p.featured)
                .map((project, index) => (
                  <motion.div
                    key={project.title}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { 
                        opacity: 1, 
                        scale: 1,
                        transition: { duration: 0.4 }
                      }
                    }}
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}