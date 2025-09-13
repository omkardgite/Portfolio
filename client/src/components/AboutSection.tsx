import { motion } from "framer-motion";
import {
  FaDownload,
  FaUsers,
  FaCalendarAlt,
  FaGraduationCap,
  FaBriefcase,
  FaRocket,
  FaCode,
} from "react-icons/fa";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiVuedotjs,
  SiSass,
  SiTailwindcss,
  SiFramer,
  SiVite,
  SiGit,
  SiBootstrap,
  SiMui,
  SiNextdotjs,
  SiWebpack,
  SiJest,
} from "react-icons/si";
import { MdExtension } from "react-icons/md";

import { useState } from "react";

interface JourneyMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  technologies: Array<{
    name: string;
    icon: JSX.Element;
    level: "beginner" | "intermediate" | "advanced";
  }>;
  icon: JSX.Element;
  type: "education" | "work" | "project";
}

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<"about" | "journey">("about");

  const journeyMilestones: JourneyMilestone[] = [
    {
      id: "1",
      year: "2017-2022",
      title: "Bachelor of Information Technology",
      description:
        "Completed B.Sc. IT while building strong foundations in programming, data structures, and web technologies.",
      technologies: [
        { name: "HTML/CSS", icon: <FaCode />, level: "beginner" },
        { name: "JavaScript", icon: <SiJavascript />, level: "beginner" },
        { name: "Bootstrap", icon: <SiBootstrap />, level: "beginner" },
        { name: "Git", icon: <SiGit />, level: "beginner" },
      ],
      icon: <FaGraduationCap />,
      type: "education",
    },
    {
      id: "2",
      year: "2022",
      title: "Joined as Trainee",
      description:
        "Started my professional career, contributing to real-world SaaS projects and learning agile workflows.",
      technologies: [
        { name: "React", icon: <SiReact />, level: "beginner" },
        { name: "Next.js", icon: <SiNextdotjs />, level: "beginner" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, level: "beginner" },
        { name: "Bootstrap", icon: <SiBootstrap />, level: "intermediate" },
      ],
      icon: <FaBriefcase />,
      type: "work",
    },
    {
      id: "3",
      year: "2023",
      title: "Project Experience & Growth",
      description:
        "Built advanced role-based dashboards, real-time chat features, and a Chrome extension while collaborating with backend teams.",
      technologies: [
        { name: "Vue.js", icon: <SiVuedotjs />, level: "beginner" },
        { name: "Material UI", icon: <SiMui />, level: "beginner" },
        { name: "Playwright", icon: <SiJest />, level: "beginner" },
        { name: "Chrome Extensions", icon: <MdExtension />, level: "beginner" },
        { name: "React", icon: <SiReact />, level: "intermediate" },
        { name: "Next.js", icon: <SiNextdotjs />, level: "intermediate" },
        { name: "TypeScript", icon: <SiTypescript />, level: "intermediate" },
        { name: "JavaScript", icon: <SiJavascript />, level: "intermediate" },
        { name: "HTML/CSS", icon: <FaCode />, level: "intermediate" },
        { name: "Git", icon: <SiGit />, level: "intermediate" },
      ],
      icon: <FaCode />,
      type: "project",
    },
    {
      id: "4",
      year: "2024-2025",
      title: "Modern Frontend & Remote Work",
      description:
        "Focused on performance optimization, scalable component design, and modern tooling. Worked remotely across cross-functional teams.",
      technologies: [
        { name: "Framer Motion", icon: <SiFramer />, level: "beginner" },
        { name: "Webpack", icon: <SiWebpack />, level: "intermediate" },
        { name: "TypeScript", icon: <SiTypescript />, level: "advanced" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, level: "advanced" },
        { name: "Next.js", icon: <SiNextdotjs />, level: "advanced" },
        { name: "React", icon: <SiReact />, level: "advanced" },
      ],
      icon: <FaRocket />,
      type: "work",
    },
  ];
  const downloadResume = () => {
    const pdfUrl = "/alex-johnson-resume.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Alex-Johnson-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="about"
      data-testid="about-section"
      className="py-20 px-4 sm:px-6 lg:px-8 section-bg-alternate"
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
            data-testid="about-title"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            About Me
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Get to know the person behind the code
          </p>

          {/* Tab Navigation */}
          <div className="flex justify-center space-x-2 mb-8">
            {[
              { id: "about", label: "About Me", icon: <FaUsers /> },
              { id: "journey", label: "My Journey", icon: <FaCalendarAlt /> },
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
                data-testid={`about-tab-${tab.id}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* About Tab Content */}
        {activeTab === "about" && (
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p data-testid="about-bio-1" className="text-lg leading-relaxed">
                I'm a passionate frontend developer with 3+ years of experience
                crafting beautiful, interactive user interfaces. My journey
                began with a fascination for how great user experiences are
                built, which led me to specialize in modern JavaScript, React,
                and cutting-edge frontend technologies.
              </p>

              <p
                data-testid="about-bio-2"
                className="text-lg leading-relaxed text-muted-foreground"
              >
                When I'm not coding, you'll find me experimenting with the
                latest frontend frameworks, contributing to open-source UI
                libraries, or sharing frontend best practices with the developer
                community. I believe in creating interfaces that are not only
                functional but delightful.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <span
                  data-testid="tag-react"
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  React Expert
                </span>

                <span
                  data-testid="tag-speaker"
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                >
                  Frontend Mentor
                </span>
              </div>

              <motion.button
                onClick={downloadResume}
                data-testid="download-resume-about"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload className="inline mr-2" />
                Download Resume
              </motion.button>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
                alt="Omkar Gite - Professional Developer Portrait"
                data-testid="about-image"
                className="rounded-2xl shadow-2xl w-80 h-80 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* Developer Journey Tab Content */}
        {activeTab === "journey" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold mb-4">
                My Development Journey
              </h3>
              <p className="text-muted-foreground">
                From beginner to expert - here's how I've grown as a frontend
                developer over the years.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:-translate-x-1/2"></div>

              <div className="space-y-12">
                {journeyMilestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.id}
                    className={`relative flex items-start ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform -translate-x-1/2 z-10"></div>

                    {/* Year badge */}
                    <div className="absolute left-16 md:left-1/2 top-0 transform md:-translate-x-1/2 md:-translate-y-8">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {milestone.year}
                      </span>
                    </div>

                    {/* Content card */}
                    <div
                      className={`w-full md:w-5/12 ml-20 md:ml-0 ${
                        index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                      }`}
                    >
                      <motion.div
                        className="glass-effect rounded-lg p-6"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div
                            className={`p-2 rounded-lg ${
                              milestone.type === "education"
                                ? "bg-blue-500/10 text-blue-500"
                                : milestone.type === "work"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-purple-500/10 text-purple-500"
                            }`}
                          >
                            {milestone.icon}
                          </div>
                          <h4 className="font-semibold text-lg">
                            {milestone.title}
                          </h4>
                        </div>

                        <p className="text-muted-foreground mb-4">
                          {milestone.description}
                        </p>

                        {/* Technologies */}
                        <div>
                          <h5 className="text-sm font-medium mb-2">
                            Technologies & Skills:
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {milestone.technologies.map((tech, techIndex) => (
                              <motion.div
                                key={`${milestone.id}-${techIndex}`}
                                className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${
                                  tech.level === "beginner"
                                    ? "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                                    : tech.level === "intermediate"
                                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                    : "bg-green-500/10 text-green-600 dark:text-green-400"
                                }`}
                                whileHover={{ scale: 1.1 }}
                              >
                                {tech.icon}
                                <span>{tech.name}</span>
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    tech.level === "beginner"
                                      ? "bg-orange-500"
                                      : tech.level === "intermediate"
                                      ? "bg-blue-500"
                                      : "bg-green-500"
                                  }`}
                                ></div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-12 text-center">
              <div className="inline-flex space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Beginner</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Intermediate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Advanced</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
