"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
  Star,
  Zap,
  Coffee,
  Heart,
  Target,
  Award,
  Send,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Twitter
} from "lucide-react";

// Contact form data type
interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  projectType: string;
  budget: string;
  timeline: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    x: [-5, 5, -5],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function ContactSectionNew() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    projectType: "",
    budget: "",
    timeline: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    toast.success("Message sent successfully! I'll get back to you soon.", {
      description: "Thanks for reaching out. I'll respond within 24 hours.",
      duration: 5000
    });
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
        projectType: "",
        budget: "",
        timeline: ""
      });
    }, 3000);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const projectTypes = [
    { value: "webapp", label: "Web Application", icon: Globe },
    { value: "mobile", label: "Mobile App", icon: Phone },
    { value: "ecommerce", label: "E-commerce", icon: Coffee },
    { value: "dashboard", label: "Dashboard/Analytics", icon: Target },
    { value: "landing", label: "Landing Page", icon: Rocket },
    { value: "other", label: "Other", icon: Sparkles }
  ];

  const budgetRanges = [
    { value: "5k-15k", label: "$5k - $15k" },
    { value: "15k-30k", label: "$15k - $30k" },
    { value: "30k-50k", label: "$30k - $50k" },
    { value: "50k+", label: "$50k+" },
    { value: "discuss", label: "Let's discuss" }
  ];

  const timelines = [
    { value: "asap", label: "ASAP" },
    { value: "1month", label: "Within 1 month" },
    { value: "3months", label: "Within 3 months" },
    { value: "6months", label: "Within 6 months" },
    { value: "flexible", label: "Flexible" }
  ];

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "vitalii@example.com",
      href: "mailto:vitalii@example.com",
      description: "Best for detailed discussions"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/vitalii",
      href: "https://linkedin.com/in/vitalii",
      description: "Let's connect professionally"
    },
    {
      icon: Calendar,
      label: "Schedule Call",
      value: "Book a meeting",
      href: "#",
      description: "30-min free consultation"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50" />
        
        {/* Floating Orbs */}
        <motion.div 
          className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto"
        >
          {/* Left Column - Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Rocket className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Let&apos;s Work Together
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Ready to bring your{" "}
                <span className="gradient-text">vision to life?</span>
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                I&apos;m currently available for new projects and excited to collaborate 
                on innovative solutions that make a real impact.
              </p>
            </motion.div>

            {/* Contact Methods */}
            <motion.div variants={itemVariants} className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    className="group flex items-center gap-4 p-4 rounded-xl glass hover:bg-primary/5 transition-all duration-300"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: isInView ? 1 : 0, 
                      x: isInView ? 0 : -20 
                    }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">
                        {method.label}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {method.description}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50"
            >
              {[
                { icon: Users, value: "50+", label: "Happy Clients" },
                { icon: Award, value: "100+", label: "Projects Done" },
                { icon: Star, value: "5.0", label: "Client Rating" }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <div className="flex justify-center mb-2">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div variants={itemVariants}>
            <Card className="glass border-border/50 overflow-hidden">
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </motion.div>
                      <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-muted-foreground">
                        Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-primary" />
                          Tell me about your project
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          The more details you provide, the better I can help you.
                        </p>
                      </div>

                      {/* Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Name *</label>
                          <Input
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            required
                            className="bg-background/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email *</label>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            className="bg-background/50"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <Input
                          placeholder="Your company (optional)"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="bg-background/50"
                        />
                      </div>

                      {/* Project Type */}
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Project Type *</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {projectTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                              <motion.button
                                key={type.value}
                                type="button"
                                onClick={() => handleInputChange("projectType", type.value)}
                                className={`p-3 rounded-lg border text-left transition-all ${
                                  formData.projectType === type.value
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border bg-background/30 hover:border-primary/50"
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Icon className="w-4 h-4 mb-1" />
                                <div className="text-xs font-medium">{type.label}</div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Budget & Timeline */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Budget Range</label>
                          <select
                            value={formData.budget}
                            onChange={(e) => handleInputChange("budget", e.target.value)}
                            className="w-full p-3 rounded-lg border border-border bg-background/50 text-sm"
                          >
                            <option value="">Select budget</option>
                            {budgetRanges.map((range) => (
                              <option key={range.value} value={range.value}>
                                {range.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Timeline</label>
                          <select
                            value={formData.timeline}
                            onChange={(e) => handleInputChange("timeline", e.target.value)}
                            className="w-full p-3 rounded-lg border border-border bg-background/50 text-sm"
                          >
                            <option value="">Select timeline</option>
                            {timelines.map((timeline) => (
                              <option key={timeline.value} value={timeline.value}>
                                {timeline.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Project Details *</label>
                        <Textarea
                          placeholder="Tell me about your project goals, requirements, and any specific features you need..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          required
                          className="bg-background/50 resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 text-base font-medium group"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}