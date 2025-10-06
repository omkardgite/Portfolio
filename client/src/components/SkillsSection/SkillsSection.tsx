import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ReduxCounterDemo } from "../demos/ReduxCounterDemo";
import { KanbanBoardDemo } from "../demos/KanbanBoardDemo";
import { ThemeCustomizerDemo } from "../demos/ThemeCustomizerDemo";
import { skillCategories } from "./SkillCategories";

interface Skill {
  name: string;
  percentage: number;
}

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"skills" | "demos">("skills");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const ProgressBar = ({ skill, delay }: { skill: Skill; delay: number }) => (
    <div
      className="skill-item"
      data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex justify-between mb-2">
        <span className="font-medium">{skill.name}</span>
        <span className="text-sm text-muted-foreground">
          {skill.percentage}%
        </span>
      </div>
      <div className="bg-muted rounded-full h-2">
        <motion.div
          className="bg-primary h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${skill.percentage}%` : 0 }}
          transition={{ duration: 2, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );

  return (
    <section
      id="skills"
      data-testid="skills-section"
      className="py-20 px-4 sm:px-6 lg:px-8 section-bg-primary"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            data-testid="skills-title"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Frontend technologies I specialize in
          </p>

          {/* Tab Navigation */}
          {/* <div className="flex justify-center space-x-2 mb-8">
            {[
              { id: "skills", label: "Technical Skills", icon: <FaCogs /> },
              { id: "demos", label: "Live Demos", icon: <FaCode /> },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-secondary/50 hover:bg-secondary text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid={`skills-tab-${tab.id}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div> */}
        </motion.div>

        {/* Skills Tab Content */}
        {activeTab === "skills" && (
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                data-testid={`skill-category-${category.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-6">
                  {category.icon}
                  <h3 className="text-xl font-semibold ml-3">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <ProgressBar
                      key={skill.name}
                      skill={skill}
                      delay={categoryIndex * 0.2 + skillIndex * 0.1}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Interactive Demos Tab Content */}
        {activeTab === "demos" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Interactive Demos</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Try out these live examples that demonstrate my technical skills
                in action. Each demo showcases different aspects of modern
                frontend development.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 justify-items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <ReduxCounterDemo />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <KanbanBoardDemo />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-1 md:col-span-2 justify-self-center"
              >
                <ThemeCustomizerDemo />
              </motion.div>
            </div>

            <div className="text-center">
              <motion.div
                className="inline-block bg-primary/10 border border-primary/20 rounded-lg p-4 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="font-semibold text-primary mb-2">
                  🚀 What These Demos Show
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 text-left">
                  <li>
                    • <strong>Redux Counter:</strong> State management patterns
                    and immutable updates
                  </li>
                  <li>
                    • <strong>Kanban Board:</strong> Drag & drop interactions
                    with dynamic lists
                  </li>
                  <li>
                    • <strong>Theme Customizer:</strong> Real-time styling and
                    component composition
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
