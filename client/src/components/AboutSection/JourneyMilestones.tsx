import { FaBriefcase, FaCode, FaGraduationCap, FaRocket } from "react-icons/fa";
import { MdExtension } from "react-icons/md";
import {
  SiBootstrap,
  SiFramer,
  SiGit,
  SiJavascript,
  SiJest,
  SiMui,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
  SiWebpack,
} from "react-icons/si";

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

export const journeyMilestones: JourneyMilestone[] = [
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
