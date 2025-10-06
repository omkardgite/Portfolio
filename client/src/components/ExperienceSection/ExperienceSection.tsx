import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";

interface Experience {
  position: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
  icon: JSX.Element;
}

export function ExperienceSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const experiences: Experience[] = [
    {
      position: "Frontend Developer",
      company: "Coditude Pvt. Ltd.",
      duration: "2022 - 2025",
      description:
        "Built responsive, scalable web applications using React, Next.js, and Vue.js. Developed role-based dashboards, Chrome extension, and real-time chat features while integrating REST APIs and maintaining test coverage with Playwright.",
      skills: ["React", "Next.js", "Vue.js", "TypeScript", "Playwright"],
      icon: <FaBriefcase className="text-primary-foreground text-sm" />,
    },
    {
      position: "Bachelor of Information Technology",
      company: "Pune University (SPPU)",
      duration: "2017 - 2022",
      description:
        "Graduated with a strong foundation in programming, web development, and software engineering. Built academic projects that introduced me to frontend frameworks and modern development practices.",
      skills: ["JavaScript", "HTML", "CSS", "Software Engineering"],
      icon: <FaGraduationCap className="text-primary-foreground text-sm" />,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleItems((prev) => Array.from(new Set([...prev, index])));
          }
        });
      },
      { threshold: 0.3 }
    );

    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item, index) => {
      item.setAttribute("data-index", index.toString());
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      data-testid="experience-section"
      className="py-20 px-4 sm:px-6 lg:px-8 section-bg-primary"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            data-testid="experience-title"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Experience & Education
          </h2>
          <p className="text-muted-foreground text-lg">
            My professional journey and academic background
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-transparent"></div>

          {experiences.map((experience, index) => (
            <motion.div
              key={experience.position}
              data-testid={`experience-${experience.position
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className={`timeline-item relative pl-16 pb-12 ${
                visibleItems.includes(index)
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              } transition-all duration-600 ease-out`}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 top-0 w-4 h-4 bg-primary rounded-full flex items-center justify-center z-10">
                {experience.icon}
              </div>

              <motion.div
                className="glass-effect rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, x: -30 }}
                animate={
                  visibleItems.includes(index)
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -30 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3
                    data-testid={`experience-position-${index}`}
                    className="text-xl font-semibold"
                  >
                    {experience.position}
                  </h3>
                  <span
                    data-testid={`experience-duration-${index}`}
                    className="text-sm text-muted-foreground"
                  >
                    {experience.duration}
                  </span>
                </div>

                <h4
                  data-testid={`experience-company-${index}`}
                  className="text-primary font-medium mb-2"
                >
                  {experience.company}
                </h4>
                <p
                  data-testid={`experience-description-${index}`}
                  className="text-muted-foreground mb-4"
                >
                  {experience.description}
                </p>

                <div
                  data-testid={`experience-skills-${index}`}
                  className="flex flex-wrap gap-2"
                >
                  {experience.skills.map((skill) => (
                    <span
                      key={skill}
                      data-testid={`experience-skill-${skill
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
