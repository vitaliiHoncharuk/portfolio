"use client";

import { Suspense } from 'react';
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ExperienceSection from "@/components/sections/experience-section";
import ProjectsSection from "@/components/sections/projects-section";
import SkillsSection from "@/components/sections/skills-section";
import CodeShowcaseSection from "@/components/sections/code-showcase-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import ContactSection from "@/components/sections/contact-section";

// Simple loading skeleton
const SectionSkeleton = ({ height = "min-h-screen" }: { height?: string }) => (
  <section className={`${height} bg-muted/10 animate-pulse flex items-center justify-center`}>
    <div className="container mx-auto px-4">
      <div className="space-y-4">
        <div className="h-8 bg-muted/20 rounded w-1/3 mx-auto" />
        <div className="h-4 bg-muted/20 rounded w-2/3 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-muted/20 rounded" />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <HeroSection />
      
      <Suspense fallback={<SectionSkeleton height="py-20" />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ExperienceSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ProjectsSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <SkillsSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton height="py-20" />}>
        <CodeShowcaseSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton height="py-20" />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton height="py-20" />}>
        <ContactSection />
      </Suspense>
    </>
  );
}