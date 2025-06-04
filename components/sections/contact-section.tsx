"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Linkedin, Github, Calendar } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ContactParticles from "@/components/3d/contact-particles";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { toast } = useToast();
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    form.reset();
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      label: "Email",
      value: "vitaliihoncharuk@gmail.com",
      link: "mailto:vitaliihoncharuk@gmail.com",
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      label: "Location",
      value: "Lviv, Ukraine",
      link: null,
    },
    {
      icon: <Linkedin className="h-6 w-6 text-primary" />,
      label: "LinkedIn",
      value: "linkedin.com/in/honcharukv",
      link: "https://linkedin.com/in/honcharukv",
    },
    {
      icon: <Github className="h-6 w-6 text-primary" />,
      label: "GitHub",
      value: "github.com",
      link: "https://github.com",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen max-h-screen relative overflow-hidden flex items-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
      
      {/* Animated particles */}
      <ContactParticles />
      
      {/* Floating orbs with optimized animation */}
      {!prefersReducedMotion ? (
        <>
          <motion.div 
            className="absolute top-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-primary/15 rounded-full blur-2xl will-change-transform"
            style={{ transform: 'translate3d(0, 0, 0)' }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-secondary/10 rounded-full blur-2xl will-change-transform"
            style={{ transform: 'translate3d(0, 0, 0)' }}
            animate={{
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      ) : (
        <>
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-secondary/5 rounded-full blur-2xl" />
        </>
      )}
      
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center py-8 md:py-12">
        <div className="text-center mb-6 md:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
              Let&apos;s <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Ready to turn your ideas into reality? Let&apos;s create something amazing together.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-250px)] overflow-y-auto lg:overflow-visible scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {/* Contact Information */}
          <motion.div
            className="h-full flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border border-white/10 bg-background/95 shadow-2xl hover:shadow-primary/20 transition-all duration-300 h-full backdrop-blur-sm">
              <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                <div className="flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 gradient-text">Contact Information</h3>
                  <p className="text-sm md:text-base text-foreground/80 mb-6 md:mb-8 leading-relaxed">
                    Ready to bring your ideas to life? I&apos;m passionate about creating 
                    exceptional digital experiences and would love to discuss how we can 
                    collaborate on your next project.
                  </p>

                  <div className="space-y-6 mb-8">
                    {contactInfo.map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="group flex items-start p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 bg-muted/20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300 group-hover:scale-110">
                          {item.icon}
                        </div>
                        <div className="ml-4 flex-grow">
                          <h4 className="font-semibold text-foreground mb-1">{item.label}</h4>
                          {item.link ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 transition-colors duration-200 break-all"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-foreground/70">{item.value}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div 
                  className="mt-auto pt-6 border-t border-border/30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-foreground">Current Status</h4>
                  <div className="space-y-2 md:space-y-3">
                    <motion.div 
                      className="flex items-center p-2 md:p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
                      whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{ transform: 'translateZ(0)' }}
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2 md:mr-3 animate-pulse"></div>
                      <p className="text-sm md:text-base text-foreground font-medium">Available for new opportunities</p>
                    </motion.div>
                    <motion.div 
                      className="flex items-center p-2 md:p-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 cursor-pointer hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
                      whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
                      whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                      style={{ transform: 'translateZ(0)' }}
                    >
                      <Calendar className="h-4 w-4 text-primary mr-2 md:mr-3" />
                      <p className="text-sm md:text-base text-foreground font-medium">Schedule a consultation call</p>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="h-full flex flex-col"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="border border-white/10 bg-background/95 shadow-2xl hover:shadow-primary/20 transition-all duration-300 h-full backdrop-blur-sm">
              <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                <div className="flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 gradient-text">Send a Message</h3>
                  <p className="text-sm md:text-base text-foreground/80 mb-6 md:mb-8">
                    Have a project in mind? Let&apos;s discuss how I can help bring your vision to reality.
                  </p>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 h-full flex flex-col">
                      <div className="flex-grow space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Full Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Enter your full name" 
                                  {...field} 
                                  className="bg-muted/20 border-white/10 focus:border-primary/50 h-12 transition-all duration-200 hover:bg-muted/30" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground font-medium">Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="your.email@example.com" 
                                  type="email" 
                                  {...field} 
                                  className="bg-muted/20 border-white/10 focus:border-primary/50 h-12 transition-all duration-200 hover:bg-muted/30" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem className="flex-grow">
                              <FormLabel className="text-foreground font-medium">Project Details</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell me about your project, timeline, and any specific requirements..."
                                  {...field} 
                                  className="min-h-32 bg-muted/20 border-white/10 focus:border-primary/50 resize-none transition-all duration-200 hover:bg-muted/30" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <motion.div
                        whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
                        whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
                        style={{ transform: 'translateZ(0)' }}
                      >
                        <Button 
                          type="submit" 
                          className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 h-12 font-semibold transition-all duration-300 shadow-lg hover:shadow-primary/30 mt-6"
                        >
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}