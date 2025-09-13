import { Navigation } from "../components/Navigation";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ProblemSolvingSection } from "../components/ProblemSolvingSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        {/* <ProblemSolvingSection /> */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
