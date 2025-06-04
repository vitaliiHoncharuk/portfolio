"use client";

import { useState, useEffect } from "react";
import { HelpCircle, X, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const faqData = [
  {
    id: "item-1",
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on scope and complexity. A typical website redesign takes 4-6 weeks, while a full-stack application can take 2-4 months. I will provide a detailed timeline after understanding your specific requirements."
  },
  {
    id: "item-2", 
    question: "Do you work with international clients?",
    answer: "Yes! I work with clients globally and have experience collaborating across different time zones. I am flexible with meeting times and use tools like Slack, Zoom, and project management platforms to ensure smooth communication."
  },
  {
    id: "item-3",
    question: "What technologies do you specialize in?", 
    answer: "I specialize in modern web technologies including React, Next.js, TypeScript, Node.js, and various databases. I am also experienced with cloud platforms like AWS and Vercel, and I stay updated with the latest industry trends and best practices."
  },
  {
    id: "item-4",
    question: "How do you handle project communication?",
    answer: "I believe in transparent and regular communication. You will receive weekly progress updates, have access to a project dashboard, and we will schedule regular check-ins. I am also available for quick questions via email or messaging throughout the project."
  },
  {
    id: "item-5", 
    question: "Do you provide ongoing support after project completion?",
    answer: "Absolutely! I offer various support packages including bug fixes, feature updates, and performance optimization. The first month after launch includes complimentary support, and we can discuss ongoing maintenance plans based on your needs."
  }
];

export default function FloatingFAQ() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <>
      {/* Floating FAQ Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-105 active:scale-95"
        aria-label="Open FAQ"
      >
        <HelpCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 pointer-events-none" />
      </button>

      {/* FAQ Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="fixed right-6 bottom-24 z-[9999] w-96 max-w-[calc(100vw-3rem)] max-h-[70vh] animate-in slide-in-from-bottom-5 duration-200">
            <Card className="border-border/50 bg-background/90 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-0">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <HelpCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">FAQ</h3>
                      <p className="text-xs text-muted-foreground">Common questions</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                    aria-label="Close FAQ"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* FAQ Content */}
                <div className="max-h-[50vh] overflow-y-auto p-4">
                  <div className="space-y-2">
                    {faqData.map((faq, index) => {
                      const isItemOpen = openItems.includes(faq.id);
                      
                      return (
                        <div
                          key={faq.id}
                          className="border-0 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                        >
                          <button
                            onClick={() => toggleItem(faq.id)}
                            className="w-full px-4 py-3 text-left text-sm flex items-center gap-3 group"
                            aria-expanded={isItemOpen}
                          >
                            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                              <span className="text-xs font-semibold text-primary">{index + 1}</span>
                            </div>
                            <span className="font-medium text-left pr-2 leading-tight flex-1">
                              {faq.question}
                            </span>
                            <ChevronDown 
                              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                                isItemOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          
                          <div
                            className={`overflow-hidden transition-all duration-200 ${
                              isItemOpen ? 'max-h-96' : 'max-h-0'
                            }`}
                          >
                            <div className="px-4 pb-3">
                              <div className="pl-9">
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border/50 bg-muted/20">
                  <p className="text-xs text-muted-foreground text-center mb-2">
                    Still have questions?
                  </p>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-xs bg-primary text-primary-foreground rounded-lg py-2 hover:bg-primary/90 transition-colors"
                  >
                    Get in touch
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  );
}