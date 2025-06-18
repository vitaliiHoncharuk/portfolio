import dynamic from "next/dynamic";
import HeroSection from "@/components/sections/hero-section";
import { SectionSkeleton } from "@/components/ui/section-skeleton";

// Lazy load all sections below the fold with loading states
const AboutSection = dynamic(
  () => import("@/components/sections/about-section"),
  {
    loading: () => <SectionSkeleton />,
  }
);

const ExperienceSection = dynamic(
  () => import("@/components/sections/experience-section"),
  {
    loading: () => <SectionSkeleton />,
  }
);

const ProjectsSection = dynamic(
  () => import("@/components/sections/projects-section"),
  {
    loading: () => <SectionSkeleton />,
  }
);

const SkillsSection = dynamic(
  () => import("@/components/sections/skills-section"),
  {
    loading: () => <SectionSkeleton />,
  }
);

const TestimonialsSection = dynamic(
  () => import("@/components/sections/testimonials-section"),
  {
    loading: () => <SectionSkeleton />,
  }
);

const ContactSectionNew = dynamic(
  () => import("@/components/sections/contact-section-new"),
  {
    loading: () => <SectionSkeleton />,
  }
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSectionNew />
    </>
  );
}