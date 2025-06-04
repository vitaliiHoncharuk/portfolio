"use client";

import { useRef, useEffect, useState, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// Lazy load the optimized 3D component
const CSSAtom = lazy(() => import("@/components/3d/css-atom"));

// Loading placeholder for 3D component
const AtomLoadingPlaceholder = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse flex items-center justify-center">
      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 animate-pulse" />
    </div>
  </div>
);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Disable mouse tracking on mobile for performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;
    
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
  }, [mounted]);

  return (
    <motion.section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={mounted ? { opacity, scale } : { opacity: 1, scale: 1 }}
    >
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 noise" />
      
      {/* Floating elements - optimized for mobile */}
      {mounted && (
        <>
          <motion.div
            className="absolute top-10 sm:top-20 left-2 sm:left-10 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-primary/10 sm:bg-primary/20 rounded-full blur-2xl sm:blur-3xl"
            animate={{
              x: mousePosition.x * 50,
              y: mousePosition.y * 50,
            }}
            transition={{ type: "spring", damping: 30 }}
          />
          <motion.div
            className="absolute bottom-10 sm:bottom-20 right-2 sm:right-10 w-40 h-40 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-secondary/10 sm:bg-secondary/20 rounded-full blur-2xl sm:blur-3xl"
            animate={{
              x: mousePosition.x * -30,
              y: mousePosition.y * -30,
            }}
            transition={{ type: "spring", damping: 30 }}
          />
        </>
      )}

      <div className="container mx-auto px-4 pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12">
        <motion.div 
          className="w-full lg:w-1/2 max-w-2xl text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-4 sm:mb-6"
          >
            <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="text-primary font-mono text-xs sm:text-sm">console.log(&apos;Hello, World!&apos;);</span>
          </motion.div>
          
          <motion.h1 
            className="font-bold mb-3 sm:mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="block text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-1">I&apos;m</span>
            <span className="block gradient-text text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">Vitalii Honcharuk</span>
          </motion.h1>
          
          <motion.h2 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 mb-4 sm:mb-6 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Senior React Developer crafting
            <span className="text-primary font-medium"> performant</span> &
            <span className="text-secondary font-medium"> scalable</span> solutions
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl mb-6 sm:mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="hidden sm:inline">
              With <span className="text-foreground font-medium">5+ years</span> of experience specializing in 
              <span className="text-primary"> FinTech</span>, 
              <span className="text-primary"> performance optimization</span>, and 
              <span className="text-primary"> microfrontend architecture</span>. 
              I transform complex problems into elegant, user-centric solutions.
            </span>
            <span className="sm:hidden">
              <span className="text-foreground font-medium">5+ years</span> of experience in 
              <span className="text-primary">FinTech</span> and 
              <span className="text-primary">performance optimization</span>. 
              Transforming ideas into elegant solutions.
            </span>
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-12"
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
            className="flex gap-3 sm:gap-4 justify-center lg:justify-start"
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
          className="w-full lg:w-1/2 h-[240px] sm:h-[280px] md:h-[350px] lg:h-[450px] xl:h-[550px] mt-4 sm:mt-6 lg:mt-0 order-first lg:order-last"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          suppressHydrationWarning
        >
          {mounted && (
            <Suspense fallback={<AtomLoadingPlaceholder />}>
              <CSSAtom />
            </Suspense>
          )}
        </motion.div>
      </div>

    </motion.section>
  );
}