"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Jennifer Roberts",
    role: "CTO, The Access Group",
    content: "Vitalii&apos;s performance optimization work reduced our loading times by 35%, significantly improving user retention. His expertise in React and microfrontends was instrumental in our platform&apos;s success.",
  },
  {
    name: "Michael Chen",
    role: "Engineering Manager, GlobalLogic",
    content: "Working with Vitalii was exceptional. His deep understanding of React ecosystem and attention to detail resulted in a robust and maintainable codebase that our team continues to build upon.",
  },
  {
    name: "Sarah Thompson",
    role: "Product Owner, McKesson",
    content: "Vitalii&apos;s technical leadership helped us navigate a complex migration that seemed impossible. His ability to simplify difficult concepts and implement elegant solutions made him a valuable asset.",
  },
];

const achievements = [
  {
    title: "Delivery Excellence Award",
    description: "Recognized for outstanding project delivery at EPAM",
    year: "2023",
  },
  {
    title: "McKesson Delivery Hero",
    description: "Awarded for exceptional performance and problem-solving",
    year: "2022",
  },
  {
    title: "10+ Successful Projects",
    description: "Consistent record of successful project completions",
    year: "2019-Present",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Testimonials & <span className="gradient-text">Achievements</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonials carousel */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Client Feedback</h3>
              
              <Carousel className="w-full">
                <CarouselContent>
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index}>
                      <Card className="border border-border/50 bg-card/70 backdrop-blur-sm card-hover">
                        <CardContent className="p-6">
                          <blockquote className="text-lg italic mb-6 text-foreground/80">
                            &quot;{testimonial.content}&quot;
                          </blockquote>
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-primary font-bold">
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <p className="font-bold">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="mr-2" />
                  <CarouselNext />
                </div>
              </Carousel>
            </motion.div>
          </div>

          {/* Achievements */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Achievements</h3>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <Card className="border border-border/50 bg-card/70 backdrop-blur-sm card-hover">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-primary">{achievement.title}</h4>
                            <p className="text-foreground/70 text-sm mt-1">{achievement.description}</p>
                          </div>
                          <span className="text-sm text-muted-foreground">{achievement.year}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}