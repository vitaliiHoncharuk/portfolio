import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ExperienceSection from "@/components/sections/experience-section";
import ProjectsSection from "@/components/sections/projects-section";
import SkillsSection from "@/components/sections/skills-section";
import CodeShowcaseSection from "@/components/sections/code-showcase-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import ContactSectionNew from "@/components/sections/contact-section-new";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <CodeShowcaseSection />
      <TestimonialsSection />
      <ContactSectionNew />
    </>
  );
}