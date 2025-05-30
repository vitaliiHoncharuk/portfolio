"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroCanvas from "@/components/3d/hero-canvas";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 noise" />
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
        }}
        transition={{ type: "spring", damping: 30 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        animate={{
          x: mousePosition.x * -30,
          y: mousePosition.y * -30,
        }}
        transition={{ type: "spring", damping: 30 }}
      />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div 
          className="w-full lg:w-1/2 max-w-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Code2 className="w-5 h-5 text-primary" />
            <span className="text-primary font-mono text-sm">console.log('Hello, World!');</span>
          </motion.div>
          
          <motion.h1 
            className="font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="block text-3xl md:text-5xl lg:text-6xl mb-2">I'm</span>
            <span className="block gradient-text text-5xl md:text-7xl lg:text-8xl">Vitalii Honcharuk</span>
          </motion.h1>
          
          <motion.h2 
            className="text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-8 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Senior React Developer crafting
            <span className="text-primary font-medium"> performant</span> &
            <span className="text-secondary font-medium"> scalable</span> solutions
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            With <span className="text-foreground font-medium">5+ years</span> of experience specializing in 
            <span className="text-primary"> FinTech</span>, 
            <span className="text-primary"> performance optimization</span>, and 
            <span className="text-primary"> microfrontend architecture</span>. 
            I transform complex problems into elegant, user-centric solutions.
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              <a href="#projects">
                <span className="relative z-10 flex items-center gap-2">
                  View Projects 
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="group border-border hover:border-primary text-foreground hover:text-primary transition-all duration-300"
            >
              <a href="/resume.pdf" download="Vitalii_Honcharuk_CV.pdf">
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" /> 
                Download CV
              </a>
            </Button>
          </motion.div>
          
          {/* Social links */}
          <motion.div 
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-muted/50 hover:bg-muted hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-muted/50 hover:bg-muted hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:your.email@example.com"
              className="p-3 rounded-lg bg-muted/50 hover:bg-muted hover:text-primary transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="w-full lg:w-1/2 h-[400px] lg:h-[600px] mt-10 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <HeroCanvas />
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-sm text-muted-foreground mb-3 font-mono">scroll</span>
        <motion.div
          className="relative"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowDown className="h-5 w-5 text-primary" />
          <ArrowDown className="h-5 w-5 text-primary/50 absolute top-2" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}