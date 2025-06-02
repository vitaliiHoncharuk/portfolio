"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCounterProps {
  stat: {
    label: string;
    value: number;
    suffix?: string;
    prefix?: string;
    icon: React.ReactNode;
    color: string;
    description?: string;
  };
  index: number;
}

export default function StatsCounter({ stat, index }: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const inView = useInView(countRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 50;
      const stepValue = stat.value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= stat.value) {
          setCount(stat.value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, stat.value]);

  return (
    <motion.div
      ref={countRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group overflow-hidden">
        <CardContent className="p-6 text-center relative">
          {/* Background decoration */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color.replace('text-', 'from-')}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          {/* Icon */}
          <motion.div 
            className={`${stat.color} mb-4 flex justify-center relative z-10`}
            animate={inView ? { rotate: [0, 360] } : { rotate: 0 }}
            transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
          >
            {stat.icon}
          </motion.div>
          
          {/* Counter */}
          <div className="relative z-10">
            <motion.div 
              className="text-4xl md:text-5xl font-bold mb-2"
              initial={{ scale: 0.5 }}
              animate={inView ? { scale: 1 } : { scale: 0.5 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1 + 0.3,
                type: "spring",
                stiffness: 100
              }}
            >
              {stat.prefix}
              <span className={stat.color}>{count}</span>
              {stat.suffix}
            </motion.div>
            
            {/* Label */}
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            
            {/* Description */}
            {stat.description && (
              <p className="text-xs text-muted-foreground/70 mt-2">
                {stat.description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}