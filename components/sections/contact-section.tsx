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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, you would send this data to your server
    console.log(values);
    
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
    <section id="contact" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let&apos;s <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Ready to turn your ideas into reality? I&apos;d love to hear about your project 
              and explore how we can work together to create something amazing.
            </p>
          </motion.div>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 96, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Information */}
          <motion.div
            className="h-full flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border border-border/50 bg-card/30 backdrop-blur-sm h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold mb-6 gradient-text">Contact Information</h3>
                  <p className="text-foreground/80 mb-8 leading-relaxed">
                    Ready to bring your ideas to life? I&apos;m passionate about creating 
                    exceptional digital experiences and would love to discuss how we can 
                    collaborate on your next project.
                  </p>

                  <div className="space-y-6 mb-8">
                    {contactInfo.map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="group flex items-start p-4 rounded-lg border border-border/30 hover:border-primary/50 transition-all duration-300 hover:bg-primary/5"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
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
                  <h4 className="font-bold text-lg mb-4 text-foreground">Current Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-3 animate-pulse"></div>
                      <p className="text-foreground font-medium">Available for new opportunities</p>
                    </div>
                    <div className="flex items-center p-3 rounded-lg bg-primary/10 border border-primary/20 cursor-pointer hover:bg-primary/15 transition-colors">
                      <Calendar className="h-4 w-4 text-primary mr-3" />
                      <p className="text-foreground font-medium">Schedule a consultation call</p>
                    </div>
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
            <Card className="border border-border/50 bg-card/30 backdrop-blur-sm h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold mb-6 gradient-text">Send a Message</h3>
                  <p className="text-foreground/80 mb-8">
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
                                  className="bg-background/70 border-border/50 focus:border-primary/50 h-12 transition-all duration-200" 
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
                                  className="bg-background/70 border-border/50 focus:border-primary/50 h-12 transition-all duration-200" 
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
                                  className="min-h-32 bg-background/70 border-border/50 focus:border-primary/50 resize-none transition-all duration-200" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary to-secondary text-background hover:from-primary/90 hover:to-secondary/90 h-12 font-semibold transition-all duration-300 transform hover:scale-[1.02] mt-6"
                      >
                        Send Message
                      </Button>
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