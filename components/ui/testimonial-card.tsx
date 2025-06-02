"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar: string;
    rating: number;
  };
  index: number;
  variant?: "default" | "featured";
}

export default function TestimonialCard({ testimonial, index, variant = "default" }: TestimonialCardProps) {
  const isFeatured = variant === "featured";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={isFeatured ? "md:col-span-2" : ""}
    >
      <Card className={`
        h-full border-border/50 backdrop-blur-sm transition-all duration-300
        ${isFeatured 
          ? "bg-gradient-to-br from-primary/10 to-secondary/10 hover:from-primary/15 hover:to-secondary/15" 
          : "bg-card/50 hover:bg-card/80"
        }
      `}>
        <CardContent className={`${isFeatured ? "p-8" : "p-6"} relative`}>
          {/* Quote Icon */}
          <Quote className={`absolute top-4 right-4 ${isFeatured ? "w-8 h-8" : "w-6 h-6"} text-primary/10`} />
          
          {/* Rating */}
          <div className="flex mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          
          {/* Content */}
          <blockquote className={`${isFeatured ? "text-lg" : "text-base"} mb-6 text-foreground/80 leading-relaxed`}>
            &ldquo;{testimonial.content}&rdquo;
          </blockquote>
          
          {/* Author */}
          <div className="flex items-center mt-auto">
            <Avatar className={isFeatured ? "w-12 h-12" : "w-10 h-10"}>
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback className="bg-primary/20 text-primary text-sm">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-semibold text-sm">{testimonial.name}</p>
              <p className="text-xs text-muted-foreground">
                {testimonial.role} • {testimonial.company}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}