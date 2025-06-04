"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SimpleModal, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/simple-modal";

interface Metric {
  label: string;
  value: string;
  improvement?: string;
}

interface ProjectProps {
  project: {
    title: string;
    client: string;
    category?: string;
    description: string;
    longDescription?: string;
    achievement: string;
    metrics?: Metric[];
    image: string;
    technologies: string[];
    demoLink: string;
    githubLink: string;
    icon: React.ReactNode;
    featured?: boolean;
  };
  index: number;
  isFeatured?: boolean;
}

export default function ProjectCard({ project, index, isFeatured = false }: ProjectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !isHovered) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set((e.clientX - centerX) * 0.1);
      mouseY.set((e.clientY - centerY) * 0.1);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered, mouseX, mouseY]);

  if (isFeatured) {
    return (
      <>
        <motion.div
          ref={cardRef}
          className="cursor-pointer h-full"
          style={{ x, y }}
          whileHover={{ scale: 1.02 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => {
            setIsHovered(false);
            mouseX.set(0);
            mouseY.set(0);
          }}
          onClick={() => setIsOpen(true)}
        >
          <Card className="h-full overflow-hidden glass border-border/20 group">
            <div className="grid lg:grid-cols-2 h-full">
              {/* Image Section */}
              <div className="relative h-64 lg:h-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="p-3 rounded-full bg-background/80 backdrop-blur-sm">
                    {project.icon}
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <CardContent className="p-8 flex flex-col justify-between">
                <div>
                  <Badge variant="outline" className="mb-4 text-primary border-primary/50">
                    {project.client}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-3 group-hover:gradient-text transition-all">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Metrics */}
                  {project.metrics && (
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {metric.label}
                          </div>
                          {metric.improvement && (
                            <div className="text-xs text-green-500 flex items-center justify-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {metric.improvement}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {project.achievement}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>
        
        {/* Modal remains the same */}
        <ProjectModal project={project} isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    );
  }
  
  // Regular project card
  return (
    <>
      <motion.div
        ref={cardRef}
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer h-full"
      >
        <Card className="overflow-hidden h-full flex flex-col glass border-border/20 group">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute top-4 left-4">
              <div className="p-2 rounded-lg bg-background/80 backdrop-blur-sm">
                {project.icon}
              </div>
            </div>
          </div>
          <CardContent className="p-6 flex-1 flex flex-col">
            <Badge variant="outline" className="w-fit mb-3 text-xs">
              {project.client}
            </Badge>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1 mb-4">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{project.technologies.length - 3}
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs text-primary font-medium">
                {project.achievement}
              </span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <ProjectModal project={project} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

// Separate modal component
function ProjectModal({ project, isOpen, setIsOpen }: { 
  project: ProjectProps['project']; 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void;
}) {
  return (
    <SimpleModal 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)}
      className="glass border-border/20"
      title={
        <div className="flex items-center gap-3">
          {project.icon}
          {project.title}
        </div>
      }
      description={
        <Badge variant="outline" className="mt-2">
          {project.client}
        </Badge>
      }
    >
        
        <div className="relative h-64 md:h-96 w-full mt-6 rounded-lg overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="space-y-6 mt-6">
          {project.longDescription && (
            <>
              <h4 className="text-lg font-semibold text-primary">Project Details</h4>
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>
            </>
          )}
          
          {project.metrics && (
            <>
              <h4 className="text-lg font-semibold text-primary">Impact & Metrics</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="text-center p-4 rounded-lg bg-muted/30">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {metric.label}
                    </div>
                    {metric.improvement && (
                      <div className="text-sm text-green-500 flex items-center justify-center gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" />
                        {metric.improvement}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          
          <div>
            <h4 className="text-lg font-semibold text-primary mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <Badge key={i} variant="secondary" className="px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button asChild size="lg" className="flex-1">
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> 
                Live Demo
              </a>
            </Button>
            <Button variant="outline" asChild size="lg" className="flex-1">
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> 
                View Code
              </a>
            </Button>
          </div>
        </div>
    </SimpleModal>
  );
}