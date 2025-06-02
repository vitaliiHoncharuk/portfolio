"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AchievementCardProps {
  achievement: {
    title: string;
    organization: string;
    year: string;
    icon: React.ReactNode;
    color: string;
    description: string;
  };
  index: number;
}

export default function AchievementCard({ achievement, index }: AchievementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        rotate: 2,
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 overflow-hidden group">
        {/* Gradient Bar */}
        <div className={`h-1 bg-gradient-to-r ${achievement.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
        
        <CardContent className="p-6">
          {/* Icon with animation */}
          <motion.div 
            className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${achievement.color} text-white mb-4`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {achievement.icon}
          </motion.div>
          
          {/* Title */}
          <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {achievement.title}
          </h4>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {achievement.description}
          </p>
          
          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-border/50">
            <p className="text-sm font-medium text-primary">
              {achievement.organization}
            </p>
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
              {achievement.year}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}