import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowRight,
  FaTimes,
  FaEye,
  FaCode,
  FaCog,
  FaUsers,
} from "react-icons/fa";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  techStack: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
  caseStudy: {
    problem: string;
    role: string;
    challenges: string[];
    solutions: string[];
    results: string;
    keyFeatures: string[];
  };
}

export function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "ecommerce",
      title: "E-commerce Frontend",
      description:
        "A responsive e-commerce interface with advanced filtering, smooth animations, and optimized performance.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
      imageAlt: "E-commerce Frontend - Modern shopping interface",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      category: "Frontend",
      githubUrl: "https://github.com/alexjohnson/ecommerce-frontend",
      liveUrl: "https://ecommerce-demo.example.com",
      caseStudy: {
        problem:
          "Client needed a modern, fast e-commerce platform to replace their outdated system and increase conversion rates.",
        role: "Lead Frontend Developer - Designed and built the entire user interface from wireframes to production.",
        challenges: [
          "Complex product filtering",
          "Performance with large catalogs",
          "Mobile responsiveness",
          "Payment integration UI",
        ],
        solutions: [
          "Implemented virtualized lists for performance",
          "Created reusable component library",
          "Added progressive loading",
          "Optimized images and lazy loading",
        ],
        results:
          "40% increase in mobile conversions, 60% faster page load times, 95+ Lighthouse performance score.",
        keyFeatures: [
          "Advanced search & filters",
          "Shopping cart persistence",
          "Responsive design",
          "Payment integration",
        ],
      },
    },
    {
      id: "dashboard",
      title: "Task Management Dashboard",
      description:
        "An interactive productivity dashboard with drag-and-drop functionality, custom animations, and responsive design.",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
      imageAlt:
        "Task Management Dashboard - Interactive productivity interface",
      techStack: ["Next.js", "TypeScript", "React DnD", "Styled Components"],
      category: "Full Stack",
      githubUrl: "https://github.com/alexjohnson/task-dashboard",
      liveUrl: "https://taskdashboard-demo.example.com",
      caseStudy: {
        problem:
          "Team needed a custom project management tool with specific workflow requirements not available in existing solutions.",
        role: "Full Stack Developer - Built entire application including database design, API, and responsive frontend.",
        challenges: [
          "Complex drag-and-drop interactions",
          "Real-time collaboration",
          "Custom workflow states",
          "Performance optimization",
        ],
        solutions: [
          "React DnD for smooth interactions",
          "Socket.io for real-time updates",
          "Custom state management",
          "Optimistic UI updates",
        ],
        results:
          "50% improvement in team productivity, 30% reduction in task completion time, adopted by 3 teams.",
        keyFeatures: [
          "Kanban board interface",
          "Real-time collaboration",
          "Custom workflows",
          "Time tracking",
        ],
      },
    },
    {
      id: "dataviz",
      title: "Data Visualization Suite",
      description:
        "An interactive data visualization platform with custom charts, real-time updates, and beautiful animations.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=300",
      imageAlt: "Data Visualization Suite - Interactive charts interface",
      techStack: ["React", "D3.js", "Chart.js", "Three.js"],
      category: "Frontend",
      githubUrl: "https://github.com/alexjohnson/dataviz-suite",
      liveUrl: "https://dataviz-demo.example.com",
      caseStudy: {
        problem:
          "Analytics team needed custom data visualizations that existing tools couldn't provide, with specific interactivity requirements.",
        role: "Frontend Specialist - Created custom visualization components and interactive dashboard from scratch.",
        challenges: [
          "Complex data transformations",
          "Performance with large datasets",
          "Custom chart types",
          "Real-time data updates",
        ],
        solutions: [
          "D3.js for custom visualizations",
          "Virtual scrolling for large datasets",
          "Canvas rendering for performance",
          "WebSocket integration",
        ],
        results:
          "80% faster data analysis workflow, 10x more interactive insights, adopted across 5 departments.",
        keyFeatures: [
          "Custom chart library",
          "Real-time data updates",
          "Interactive filtering",
          "Export capabilities",
        ],
      },
    },
  ];

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];
  const filteredProjects =
    selectedFilter === "All"
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openCaseStudy = (project: Project) => {
    setSelectedProject(project);
  };

  const closeCaseStudy = () => {
    setSelectedProject(null);
  };

  return (
    <section
      id="projects"
      data-testid="projects-section"
      className="py-20 px-4 sm:px-6 lg:px-8 section-bg-alternate"
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
            data-testid="projects-title"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Some of my recent work that I'm proud of
          </p>

          {/* Filter Buttons */}
          {/* <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedFilter(category)}
                data-testid={`filter-${category.toLowerCase()}`}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedFilter === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 hover:bg-secondary text-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div> */}
        </motion.div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" layout>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              data-testid={`project-${project.id}`}
              className="group glass-effect rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.03 },
              }}
              layout
              onClick={() => openCaseStudy(project)}
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.imageAlt}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                />
              </div>

              <div className="p-6">
                <h3
                  data-testid={`project-title-${project.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-xl font-semibold mb-2"
                >
                  {project.title}
                </h3>
                <p
                  data-testid={`project-description-${project.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="text-muted-foreground mb-4"
                >
                  {project.description}
                </p>

                <div
                  data-testid={`project-tech-stack-${project.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      data-testid={`tech-${tech.toLowerCase()}`}
                      className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => openCaseStudy(project)}
                    data-testid={`project-case-study-${project.id}`}
                    className="bg-primary/10 text-primary hover:bg-primary/20 px-3 py-2 rounded-lg flex items-center text-sm font-medium transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEye className="mr-1" />
                    Case Study
                  </motion.button>
                  <motion.button
                    onClick={() => openLink(project.githubUrl)}
                    data-testid={`project-github-${project.id}`}
                    className="text-primary hover:underline flex items-center text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="mr-1" />
                    Code
                  </motion.button>
                  <motion.button
                    onClick={() => openLink(project.liveUrl)}
                    data-testid={`project-live-${project.id}`}
                    className="text-primary hover:underline flex items-center text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt className="mr-1" />
                    Live Demo
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => openLink("https://github.com/alexjohnson")}
            data-testid="view-all-projects"
            className="inline-flex items-center text-primary hover:underline text-lg font-medium"
            whileHover={{ x: 5 }}
          >
            View All Projects
            <FaArrowRight className="ml-2" />
          </motion.button>
        </motion.div> */}
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCaseStudy}
        >
          <motion.div
            className="glass-effect rounded-2xl p-6 max-w-4xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  {selectedProject.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-primary/20 text-primary px-2 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <motion.button
                onClick={closeCaseStudy}
                className="text-muted-foreground hover:text-foreground p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes className="text-xl" />
              </motion.button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <img
                src={selectedProject.image}
                alt={selectedProject.imageAlt}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <FaCog className="mr-2 text-primary" />
                  The Problem
                </h4>
                <p className="text-muted-foreground mb-4">
                  {selectedProject.caseStudy.problem}
                </p>

                <h4 className="font-semibold mb-2 flex items-center">
                  <FaUsers className="mr-2 text-primary" />
                  My Role
                </h4>
                <p className="text-muted-foreground">
                  {selectedProject.caseStudy.role}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Challenges Faced</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedProject.caseStudy.challenges.map(
                    (challenge, index) => (
                      <div
                        key={index}
                        className="bg-destructive/10 border border-destructive/20 rounded-lg p-3"
                      >
                        <p className="text-sm">{challenge}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Solutions Implemented</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {selectedProject.caseStudy.solutions.map(
                    (solution, index) => (
                      <div
                        key={index}
                        className="bg-green-500/10 border border-green-500/20 rounded-lg p-3"
                      >
                        <p className="text-sm">{solution}</p>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.caseStudy.keyFeatures.map(
                    (feature, index) => (
                      <span
                        key={index}
                        className="bg-secondary/50 px-3 py-2 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">
                  Results & Impact
                </h4>
                <p>{selectedProject.caseStudy.results}</p>
              </div>

              <div className="flex space-x-4 pt-4">
                <motion.button
                  onClick={() => openLink(selectedProject.liveUrl)}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt className="mr-2" />
                  View Live Project
                </motion.button>
                <motion.button
                  onClick={() => openLink(selectedProject.githubUrl)}
                  className="border border-border px-6 py-3 rounded-lg font-medium flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="mr-2" />
                  View Code
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
