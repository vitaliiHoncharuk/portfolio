"use client";

import { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// Lazy load the optimized 3D component
const CSSAtom = lazy(() => import("@/components/3d/css-atom"));

// Loading placeholder for 3D component
const AtomLoadingPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="relative w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[340px] lg:h-[340px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse flex items-center justify-center">
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-18 lg:h-18 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 animate-pulse" />
    </div>
  </div>
);

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 pb-8 sm:pt-8 overflow-hidden"
    >
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 noise" />
      

      {/* Console greeting - hidden on mobile, bottom left on desktop */}
      <motion.div
        className="hidden sm:block absolute bottom-8 left-8 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="flex items-center gap-2 px-3 py-2 bg-background/60 backdrop-blur-sm border border-border/30 rounded-lg">
          <Code2 className="w-3 h-3 text-primary/70 animate-pulse" />
          <span className="text-primary/70 font-mono text-xs">console.log(hello)</span>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-12">
          
          {/* Introduction Text */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
          
          <motion.h1 
            className="font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl text-foreground/80 mb-1 sm:mb-2">
              Hi, I am
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent font-extrabold animate-gradient bg-300%">
                Vitalii Honcharuk
              </span>
            </span>
          </motion.h1>
          
          <motion.h2 
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-foreground/90 font-light leading-relaxed text-center px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Senior React Developer crafting{' '}
            <span className="relative">
              <span className="text-primary font-semibold">performant</span>
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-primary/30 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>
            {' & '}
            <span className="relative">
              <span className="text-secondary font-semibold">scalable</span>
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-secondary/30 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 1 }}
              />
            </span>
            {' solutions'}
          </motion.h2>
        </motion.div>

        {/* CSS Atom Visual - Properly contained on mobile */}
        <motion.div 
          className="flex justify-center items-center relative overflow-hidden px-4 sm:px-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          suppressHydrationWarning
        >
          <div className="w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px] lg:w-[340px] lg:h-[340px] relative overflow-hidden">
            {mounted && (
              <Suspense fallback={<AtomLoadingPlaceholder />}>
                <CSSAtom />
              </Suspense>
            )}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >

          {/* Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 justify-center w-full max-w-md sm:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
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
          
          {/* Social links - Hidden on mobile */}
          <motion.div 
            className="hidden sm:flex gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a 
              href="https://github.com/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted hover:text-primary transition-all duration-300 hover:scale-110 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted hover:text-primary transition-all duration-300 hover:scale-110 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:your.email@example.com"
              className="p-2.5 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted hover:text-primary transition-all duration-300 hover:scale-110 min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
        
          </div>
        </div>
      </div>

    </motion.section>
  );
}