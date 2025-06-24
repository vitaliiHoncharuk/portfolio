"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// Loading placeholder for 3D component
const AtomLoadingPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse flex items-center justify-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 animate-pulse" />
    </div>
  </div>
);

// Use Next.js dynamic import to prevent hydration issues
const CSSAtom = dynamic(() => import("@/components/3d/css-atom"), {
  ssr: false,
  loading: () => <AtomLoadingPlaceholder />
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effects with different speeds for depth
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const atomY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  // Very subtle fade only at the very end
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.3]);


  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background layers with parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 noise" />
      </motion.div>
      

      <motion.div 
        className="container mx-auto px-4 pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
        style={{ opacity }}
      >
        <motion.div 
          className="w-full lg:w-1/2 max-w-2xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ y: contentY }}
        >
          {/* Animated greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <Code2 className="w-5 h-5 text-primary" />
            <span className="text-primary font-mono text-sm">{`console.log('Hello, World!');`}</span>
          </motion.div>
          
          <motion.h1 
            className="font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="block text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-1 sm:mb-2">{`I'm`}</span>
            <span className="block gradient-text text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight">Vitalii Honcharuk</span>
          </motion.h1>
          
          <motion.h2 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-6 sm:mb-8 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Senior React Developer crafting
            <span className="text-primary font-medium"> performant</span> &
            <span className="text-secondary font-medium"> scalable</span> solutions
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg text-muted-foreground max-w-xl mb-8 sm:mb-10 leading-relaxed"
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
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto min-h-[48px]"
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
              className="group border-border hover:border-primary text-foreground hover:text-primary transition-all duration-300 w-full sm:w-auto min-h-[48px]"
            >
              <a href="/resume.pdf" download="Vitalii_Honcharuk_CV.pdf">
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" /> 
                Download CV
              </a>
            </Button>
          </motion.div>
          
          {/* Social links */}
          <motion.div 
            className="flex gap-3 sm:gap-4 justify-center sm:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-muted/50 hover:bg-muted hover:text-primary transition-all duration-300 hover:scale-110 min-w-[48px] min-h-[48px] flex items-center justify-center"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-muted/50 hover:bg-muted hover:text-primary transition-all duration-300 hover:scale-110 min-w-[48px] min-h-[48px] flex items-center justify-center"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:your.email@example.com"
              className="p-3 rounded-lg bg-muted/50 hover:bg-muted hover:text-primary transition-all duration-300 hover:scale-110 min-w-[48px] min-h-[48px] flex items-center justify-center"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="w-full lg:w-1/2 h-[280px] sm:h-[320px] md:h-[400px] lg:h-[500px] xl:h-[600px] mt-6 sm:mt-8 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ y: atomY }}
        >
          <CSSAtom />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="cursor-pointer"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
        </motion.div>
      </motion.div>

    </section>
  );
}