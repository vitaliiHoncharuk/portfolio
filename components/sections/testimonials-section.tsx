"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Trophy, Target, TrendingUp, Users, Star, Award, Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Jennifer Roberts",
    role: "CTO",
    company: "The Access Group",
    content: "Vitalii's performance optimization work reduced our loading times by 35%, significantly improving user retention. His expertise in React and microfrontends was instrumental in our platform's success.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Engineering Manager",
    company: "GlobalLogic",
    content: "Working with Vitalii was exceptional. His deep understanding of React ecosystem and attention to detail resulted in a robust and maintainable codebase that our team continues to build upon.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Thompson",
    role: "Product Owner",
    company: "McKesson",
    content: "Vitalii's technical leadership helped us navigate a complex migration that seemed impossible. His ability to simplify difficult concepts and implement elegant solutions made him a valuable asset.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Tech Lead",
    company: "EPAM Systems",
    content: "Vitalii consistently delivered beyond expectations. His proactive approach to problem-solving and ability to mentor junior developers while delivering high-quality code is remarkable.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5,
  },
];

const stats = [
  {
    label: "Years Experience",
    value: 5,
    suffix: "+",
    icon: <Briefcase className="w-5 h-5" />,
    color: "text-blue-500",
  },
  {
    label: "Projects Delivered",
    value: 25,
    suffix: "+",
    icon: <Target className="w-5 h-5" />,
    color: "text-green-500",
  },
  {
    label: "Client Satisfaction",
    value: 98,
    suffix: "%",
    icon: <Users className="w-5 h-5" />,
    color: "text-purple-500",
  },
  {
    label: "Performance Gains",
    value: 35,
    suffix: "%",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "text-orange-500",
  },
];

const achievements = [
  {
    title: "Delivery Excellence Award",
    organization: "EPAM Systems",
    year: "2023",
    icon: <Trophy className="w-8 h-8" />,
    color: "from-yellow-500 to-orange-500",
    description: "Recognized for outstanding project delivery and client satisfaction"
  },
  {
    title: "McKesson Delivery Hero",
    organization: "McKesson Corporation",
    year: "2022",
    icon: <Award className="w-8 h-8" />,
    color: "from-blue-500 to-purple-500",
    description: "Awarded for exceptional performance in healthcare platform optimization"
  },
  {
    title: "Innovation Champion",
    organization: "GlobalLogic",
    year: "2021",
    icon: <Star className="w-8 h-8" />,
    color: "from-green-500 to-teal-500",
    description: "Led the implementation of cutting-edge microfrontend architecture"
  },
];

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={nodeRef}>
      {count}{suffix}
    </span>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate testimonials with pause on hover
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Client <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building lasting relationships through exceptional delivery and innovation
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className={`${stat.color} mb-3 flex justify-center`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <div className="relative max-w-4xl mx-auto">
            <Quote className="absolute -top-4 -left-4 w-12 h-12 text-primary/20" />
            
            <div 
              className="relative min-h-[320px] overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {testimonials.map((testimonial, index) => {
                const isActive = index === activeTestimonial;
                const isPrev = index === (activeTestimonial - 1 + testimonials.length) % testimonials.length;
                const isNext = index === (activeTestimonial + 1) % testimonials.length;
                
                return (
                  <motion.div
                    key={testimonial.id}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : isPrev ? -50 : isNext ? 50 : index < activeTestimonial ? -100 : 100,
                      scale: isActive ? 1 : 0.95,
                      zIndex: isActive ? 10 : isPrev || isNext ? 5 : 0,
                    }}
                    transition={{ 
                      duration: 0.8, 
                      ease: [0.25, 0.46, 0.45, 0.94],
                      opacity: { duration: 0.6 },
                      scale: { duration: 0.8 }
                    }}
                  >
                    <Card className="border-0 bg-transparent shadow-none">
                      <CardContent className="p-8 md:p-12">
                        {/* Rating */}
                        <div className="flex mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                        
                        {/* Testimonial Content */}
                        <motion.blockquote 
                          className="text-xl md:text-2xl font-light mb-8 text-foreground/90 leading-relaxed"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                        >
                          &ldquo;{testimonial.content}&rdquo;
                        </motion.blockquote>
                        
                        {/* Author */}
                        <motion.div 
                          className="flex items-center"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.6 }}
                        >
                          <Avatar className="w-12 h-12 md:w-14 md:h-14 mr-4">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback className="bg-primary/20 text-primary">
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-lg">{testimonial.name}</p>
                            <p className="text-muted-foreground">
                              {testimonial.role} at {testimonial.company}
                            </p>
                          </div>
                        </motion.div>
                      </CardContent>
                    </Card>
                </motion.div>
                );
              })}
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setActiveTestimonial(index);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 2000); // Resume after 2 seconds
                  }}
                  className={`relative h-3 rounded-full transition-all duration-700 hover:scale-110 ${
                    index === activeTestimonial 
                      ? "w-8 bg-primary shadow-lg shadow-primary/30" 
                      : "w-3 bg-muted hover:bg-muted-foreground/50"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  {index === activeTestimonial && (
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  
                  {/* Progress indicator for active testimonial */}
                  {index === activeTestimonial && !isPaused && (
                    <motion.div
                      className="absolute inset-0 bg-primary/30 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 6, ease: "linear" }}
                      style={{ transformOrigin: "left" }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Recognition & <span className="gradient-text">Achievements</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${achievement.color}`} />
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${achievement.color} text-white mb-4`}>
                      {achievement.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-2">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-primary">{achievement.organization}</p>
                      <span className="text-sm text-muted-foreground">{achievement.year}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}