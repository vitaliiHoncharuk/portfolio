"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  MessageSquare, 
  Calendar, 
  Rocket, 
  CheckCircle,
  ArrowRight,
  Clock,
  Globe,
  Sparkles,
  Users,
  Code2,
  Palette,
  BarChart3,
  Phone
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Confetti from "@/components/ui/confetti";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  projectType: z.string().min(1, {
    message: "Please select a project type.",
  }),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const projectTypes = [
  { value: "web-development", label: "Web Development", icon: Code2 },
  { value: "ui-ux-design", label: "UI/UX Design", icon: Palette },
  { value: "consulting", label: "Consulting", icon: Users },
  { value: "performance", label: "Performance Optimization", icon: BarChart3 },
];

const timelines = [
  { value: "asap", label: "ASAP" },
  { value: "1-2-weeks", label: "1-2 weeks" },
  { value: "1-month", label: "1 month" },
  { value: "2-3-months", label: "2-3 months" },
  { value: "flexible", label: "Flexible" },
];

export default function ContactSectionNew() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState<"form" | "schedule" | "direct">("form");
  const [showConfetti, setShowConfetti] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    
    // Show toast immediately
    toast({
      title: "Message sent successfully! 🎉",
      description: "I'll get back to you within 24 hours.",
    });
    
    // Show confetti after a short delay for better UX
    setTimeout(() => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }, 500);
    
    // Reset form after a longer delay
    setTimeout(() => {
      form.reset();
      setCurrentStep(1);
    }, 2000);
  };

  const nextStep = async () => {
    // Validate current step before proceeding
    let fieldsToValidate: string[] = [];
    
    if (currentStep === 1) {
      fieldsToValidate = ['name', 'email'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['projectType'];
    }
    
    if (fieldsToValidate.length > 0) {
      const isValid = await form.trigger(fieldsToValidate as any);
      if (!isValid) {
        // Trigger shake animation
        setShakeError(true);
        setTimeout(() => setShakeError(false), 500);
        return;
      }
    }
    
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const contactMethods = [
    {
      id: "form",
      title: "Send a Message",
      description: "Fill out a quick form and I'll respond within 24 hours",
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "schedule",
      title: "Schedule a Call",
      description: "Book a 30-minute consultation call at your convenience",
      icon: Calendar,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "direct",
      title: "Direct Contact",
      description: "Reach out directly via email or phone for urgent matters",
      icon: Phone,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen relative overflow-hidden flex items-center py-20">
      {/* Confetti Animation */}
      <Confetti active={showConfetti} />
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          {/* Animated grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border/20)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border/20)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_40%,transparent_100%)]" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4" variant="outline">
            <Sparkles className="w-3 h-3 mr-1" />
            Let&apos;s Create Something Amazing
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Ready to Start Your <span className="gradient-text">Next Project?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose how you&apos;d like to connect and let&apos;s turn your vision into reality
          </p>
        </motion.div>

        {/* Availability Status */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-muted/50 backdrop-blur-sm border border-border/50">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping" />
            </div>
            <span className="text-sm font-medium">Available for new projects</span>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>Responds within 24h</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Globe className="w-3 h-3" />
              <span>UTC+2</span>
            </div>
          </div>
        </motion.div>

        {/* Contact Method Selector */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {contactMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            
            return (
              <motion.button
                key={method.id}
                onClick={() => setSelectedMethod(method.id as any)}
                className={cn(
                  "relative p-6 rounded-xl border-2 transition-all duration-500 text-left group overflow-hidden",
                  isSelected 
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/15" 
                    : "border-border/20 hover:border-primary/30 bg-background/30 backdrop-blur-sm hover:bg-background/50"
                )}
                whileHover={{ 
                  scale: 1.02,
                  y: -4,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  boxShadow: isSelected 
                    ? "0 10px 40px -10px rgba(var(--primary-rgb, 59 130 246) / 0.2)" 
                    : "0 4px 20px -4px rgba(0, 0, 0, 0.08)"
                }}
              >
                {/* Grid pattern overlay - always visible but subtle */}
                <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-500">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                </div>

                {/* Enhanced background gradient effect */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-8 transition-all duration-500 rounded-xl bg-gradient-to-br",
                  method.color
                )} />
                
                {/* Animated border glow */}
                <div className={cn(
                  "absolute -inset-0.5 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-xl bg-gradient-to-br blur-sm",
                  method.color
                )} />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
                  )} />
                </div>
                
                <div className="relative">
                  <motion.div 
                    className={cn(
                      "w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br text-white shadow-md relative overflow-hidden",
                      method.color
                    )}
                    whileHover={{ 
                      scale: 1.05,
                      rotate: [0, -3, 3, 0],
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Icon className="w-6 h-6 relative z-10" />
                    {/* Icon glow effect */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                  </motion.div>
                  <h3 className="font-semibold mb-2">{method.title}</h3>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  
                  {isSelected && (
                    <motion.div
                      className="absolute -top-2 -right-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <CheckCircle className="w-6 h-6 text-primary fill-primary/20" />
                    </motion.div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Content based on selected method */}
        <AnimatePresence mode="wait">
          {selectedMethod === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border-border/50 bg-background/95 backdrop-blur-sm">
                <CardContent className="p-8">
                  {/* Step Indicator */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between relative">
                      {/* Progress line background */}
                      <div className="absolute left-0 top-1/2 w-full h-1 bg-muted -translate-y-1/2 -z-10" />
                      
                      {/* Active progress line */}
                      <motion.div 
                        className="absolute left-0 top-1/2 h-1 bg-primary -translate-y-1/2 -z-10"
                        initial={{ width: "0%" }}
                        animate={{ 
                          width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%" 
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {[
                        { step: 1, label: "Basic Info" },
                        { step: 2, label: "Project Details" },
                        { step: 3, label: "Message" }
                      ].map(({ step, label }) => (
                        <div key={step} className="relative flex flex-col items-center">
                          <motion.div
                            className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 border-2",
                              currentStep >= step
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background text-muted-foreground border-muted"
                            )}
                            animate={currentStep === step ? { scale: [1, 1.1, 1] } : {}}
                          >
                            {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                          </motion.div>
                          <span className={cn(
                            "text-xs mt-2 font-medium transition-colors duration-300",
                            currentStep >= step ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <AnimatePresence mode="wait">
                        {/* Step 1: Basic Info */}
                        {currentStep === 1 && (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ 
                              opacity: 1, 
                              x: shakeError ? [0, -10, 10, -10, 10, 0] : 0 
                            }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="space-y-2">
                              <h3 className="text-xl font-semibold">Let&apos;s start with the basics</h3>
                              <p className="text-muted-foreground">Tell me a bit about yourself</p>
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-1">
                                    Your Name 
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input 
                                        placeholder="John Doe" 
                                        {...field} 
                                        className={cn(
                                          "h-12 pr-10 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                                          form.formState.errors.name 
                                            ? "border-red-500" 
                                            : field.value && field.value.length >= 2 
                                              ? "border-green-500" 
                                              : "border-border focus:border-border"
                                        )}
                                      />
                                      {field.value && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                          {form.formState.errors.name ? (
                                            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                                              <span className="text-red-500 text-xs">✕</span>
                                            </div>
                                          ) : field.value.length >= 2 ? (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                          ) : null}
                                        </div>
                                      )}
                                    </div>
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
                                  <FormLabel className="flex items-center gap-1">
                                    Email Address 
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Input 
                                        placeholder="john@example.com" 
                                        type="email" 
                                        {...field} 
                                        className={cn(
                                          "h-12 pr-10 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                                          form.formState.errors.email 
                                            ? "border-red-500" 
                                            : field.value && field.value.includes('@') && field.value.includes('.') 
                                              ? "border-green-500" 
                                              : "border-border focus:border-border"
                                        )}
                                      />
                                      {field.value && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                          {form.formState.errors.email ? (
                                            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                                              <span className="text-red-500 text-xs">✕</span>
                                            </div>
                                          ) : field.value.includes('@') && field.value.includes('.') ? (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                          ) : null}
                                        </div>
                                      )}
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="company"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company (Optional)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Acme Inc." 
                                      {...field} 
                                      className="h-12"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}

                        {/* Step 2: Project Details */}
                        {currentStep === 2 && (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ 
                              opacity: 1, 
                              x: shakeError ? [0, -10, 10, -10, 10, 0] : 0 
                            }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="space-y-2">
                              <h3 className="text-xl font-semibold">About your project</h3>
                              <p className="text-muted-foreground">Help me understand your needs</p>
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="projectType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-1">
                                    Project Type 
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <div className="grid grid-cols-2 gap-3">
                                      {projectTypes.map((type) => {
                                        const Icon = type.icon;
                                        const isSelected = field.value === type.value;
                                        
                                        return (
                                          <button
                                            key={type.value}
                                            type="button"
                                            onClick={() => field.onChange(type.value)}
                                            className={cn(
                                              "p-4 rounded-lg border-2 transition-all duration-200 text-left",
                                              isSelected
                                                ? "border-primary bg-primary/10"
                                                : "border-border hover:border-primary/50"
                                            )}
                                          >
                                            <Icon className="w-5 h-5 mb-2 text-primary" />
                                            <p className="font-medium text-sm">{type.label}</p>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="budget"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Budget Range (Optional)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="e.g., $5k-10k" 
                                      {...field} 
                                      className="h-12"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="timeline"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Timeline</FormLabel>
                                  <FormControl>
                                    <div className="flex flex-wrap gap-2">
                                      {timelines.map((timeline) => (
                                        <button
                                          key={timeline.value}
                                          type="button"
                                          onClick={() => field.onChange(timeline.value)}
                                          className={cn(
                                            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                            field.value === timeline.value
                                              ? "bg-primary text-primary-foreground"
                                              : "bg-muted hover:bg-muted/80"
                                          )}
                                        >
                                          {timeline.label}
                                        </button>
                                      ))}
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}

                        {/* Step 3: Message */}
                        {currentStep === 3 && (
                          <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="space-y-2">
                              <h3 className="text-xl font-semibold">Tell me more</h3>
                              <p className="text-muted-foreground">Share any additional details about your project</p>
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="message"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-1">
                                    Project Details 
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Textarea 
                                        placeholder="Describe your project goals, requirements, and any specific features you need..."
                                        {...field} 
                                        className={cn(
                                          "min-h-[150px] resize-none pr-10 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                                          form.formState.errors.message 
                                            ? "border-red-500" 
                                            : field.value && field.value.length >= 10 
                                              ? "border-green-500" 
                                              : "border-border focus:border-border"
                                        )}
                                      />
                                      {field.value && (
                                        <div className="absolute right-3 top-3">
                                          {form.formState.errors.message ? (
                                            <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                                              <span className="text-red-500 text-xs">✕</span>
                                            </div>
                                          ) : field.value.length >= 10 ? (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                          ) : null}
                                        </div>
                                      )}
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Navigation Buttons */}
                      <div className="flex justify-between pt-6">
                        {currentStep > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                          >
                            Previous
                          </Button>
                        )}
                        
                        {currentStep < 3 ? (
                          <Button
                            type="button"
                            onClick={nextStep}
                            className="ml-auto"
                          >
                            Next
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        ) : (
                          <motion.div
                            whileHover={{ 
                              scale: 1.02,
                              y: -2,
                              transition: { type: "spring", stiffness: 300, damping: 20 }
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="ml-auto relative group"
                          >
                            <Button
                              type="submit"
                              className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                            >
                              {/* Button shimmer effect */}
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                              </div>
                              <Rocket className="w-4 h-4 mr-2 relative z-10" />
                              <span className="relative z-10">Send Message</span>
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {selectedMethod === "schedule" && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border-border/50 bg-background/95 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-bold mb-4">Schedule a Consultation</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Book a free 30-minute consultation call to discuss your project in detail
                  </p>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Open Calendar
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    Available Monday-Friday, 9 AM - 6 PM UTC+2
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {selectedMethod === "direct" && (
            <motion.div
              key="direct"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border-border/50 bg-background/95 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center">Direct Contact</h3>
                  <div className="grid gap-4">
                    <a
                      href="mailto:vitaliihoncharuk@gmail.com"
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">vitaliihoncharuk@gmail.com</p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                    
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">Available upon request</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Facts */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            { icon: Clock, title: "Quick Response", description: "Average response time under 24 hours" },
            { icon: Globe, title: "Global Clients", description: "Working with clients across 15+ countries" },
            { icon: Rocket, title: "Fast Delivery", description: "Projects delivered on time, every time" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-muted/30 border border-border/50"
              >
                <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="item-1" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                What&apos;s your typical project timeline?
              </AccordionTrigger>
              <AccordionContent>
                Project timelines vary based on scope and complexity. A typical website redesign takes 4-6 weeks, 
                while a full-stack application can take 2-4 months. I&apos;ll provide a detailed timeline after understanding 
                your specific requirements.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                Do you work with international clients?
              </AccordionTrigger>
              <AccordionContent>
                Yes! I work with clients globally and have experience collaborating across different time zones. 
                I&apos;m flexible with meeting times and use tools like Slack, Zoom, and project management platforms 
                to ensure smooth communication.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                What technologies do you specialize in?
              </AccordionTrigger>
              <AccordionContent>
                I specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various 
                databases. I&apos;m also experienced with cloud platforms like AWS and Vercel, and I stay updated with 
                the latest industry trends and best practices.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                How do you handle project communication?
              </AccordionTrigger>
              <AccordionContent>
                I believe in transparent and regular communication. You&apos;ll receive weekly progress updates, have access 
                to a project dashboard, and we&apos;ll schedule regular check-ins. I&apos;m also available for quick questions 
                via email or messaging throughout the project.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                Do you provide ongoing support after project completion?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! I offer various support packages including bug fixes, feature updates, and performance 
                optimization. The first month after launch includes complimentary support, and we can discuss 
                ongoing maintenance plans based on your needs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}