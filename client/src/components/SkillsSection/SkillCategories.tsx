import { FaLaptopCode, FaServer, FaTools } from "react-icons/fa";

interface Skill {
  name: string;
  percentage: number;
}

interface SkillCategory {
  title: string;
  icon: JSX.Element;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Core Frontend",
    icon: <FaLaptopCode className="text-primary text-2xl" />,
    skills: [
      { name: "React.js", percentage: 95 },
      { name: "TypeScript", percentage: 92 },
      { name: "Next.js", percentage: 90 },
      { name: "Vue.js", percentage: 55 },
    ],
  },
  {
    title: "Styling & Animation",
    icon: <FaServer className="text-primary text-2xl" />,
    skills: [
      { name: "Tailwind CSS", percentage: 95 },
      { name: "Sass/SCSS", percentage: 50 },
      { name: "Framer Motion", percentage: 40 },
      { name: "CSS Grid/Flexbox", percentage: 92 },
    ],
  },
  {
    title: "Tools & Workflow",
    icon: <FaTools className="text-primary text-2xl" />,
    skills: [
      { name: "Vite/Webpack", percentage: 90 },
      { name: "Git & GitHub", percentage: 95 },
      { name: "Figma", percentage: 88 },
      { name: "Chrome DevTools", percentage: 92 },
    ],
  },
];
