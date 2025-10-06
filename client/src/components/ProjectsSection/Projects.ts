export const projects = [
  {
    id: "caredge",
    title: "Caredge – Car Selling Platform",
    description:
      "Developed advanced car search filters, detail pages, and dashboards tailored to different user roles.",
    image: "/images/CarEdge.png",
    imageAlt: "Caredge - Car Search Platform UI",
    techStack: ["Next.js", "Tailwind CSS", "SCSS", "Playwright"],
    category: "Frontend",
    githubUrl: "",
    liveUrl: "https://caredge.com/",
    caseStudy: {
      problem:
        "Client needed a car search platform with advanced filters and role-based dashboards to improve user experience.",
      role: "Frontend Developer – Built UI components, role-based dashboards, and integrated APIs.",
      challenges: [
        "Complex filtering based on multiple conditions",
        "Role-specific dashboards",
        "Maintaining code quality under sprint deadlines",
        "Automation for testing",
      ],
      solutions: [
        "Created reusable filtering components",
        "Implemented role-based routing & UI states",
        "Configured ESLint/Prettier rules",
        "Added Playwright test automation",
      ],
      results:
        "Improved user engagement, reduced bugs through automated tests, and delivered scalable dashboards.",
      keyFeatures: [
        "Advanced car search filters",
        "Role-based dashboards",
        "Responsive design",
        "Automated testing with Playwright",
      ],
    },
  },
  {
    id: "salesinnovator",
    title: "SalesInnovator – Recruiter Platform",
    description:
      "Built real-time chat and optimized Vuex state management for recruiters and candidates.",
    image: "/images/salesinnovator.jpg",
    imageAlt: "SalesInnovator - Recruiter communication platform",
    techStack: ["Vue.js", "Vuex", "Tailwind CSS"],
    category: "Frontend",
    githubUrl: "",
    liveUrl: "",
    caseStudy: {
      problem:
        "Recruiters needed a smooth, real-time communication tool integrated into the platform.",
      role: "Frontend Developer – Implemented chat feature and improved UI/UX consistency.",
      challenges: [
        "Ensuring real-time updates",
        "Managing chat data efficiently",
        "Improving UI responsiveness",
      ],
      solutions: [
        "Built a real-time chat with Vue.js & Vuex",
        "Optimized state management for performance",
        "Enhanced mobile usability with Tailwind CSS",
      ],
      results:
        "Faster recruiter-candidate communication and improved platform usability.",
      keyFeatures: [
        "Real-time chat",
        "Optimized state management",
        "Mobile-first responsive design",
      ],
    },
  },
  {
    id: "stacks-extension",
    title: "Stacks – Chrome Extension",
    description:
      "Developed a Chrome extension dashboard focusing on accessibility and performance.",
    image: "/images/stacks.png",
    imageAlt: "Stack Chrome Extension Dashboard",
    techStack: ["Next.js", "Tailwind CSS", "Chrome APIs"],
    category: "Frontend",
    githubUrl: "",
    liveUrl:
      "https://chromewebstore.google.com/detail/stacks-web-clipper-and-ai/nfjbjlpkfimhobegkcoekpkdlokjkcfj?hl=en",
    caseStudy: {
      problem:
        "Client required a Chrome extension with a user-friendly dashboard and smooth performance.",
      role: "Frontend Developer – Built dashboard UI and integrated Chrome APIs.",
      challenges: [
        "Optimizing extension performance",
        "Implementing accessibility via shortcuts",
        "Ensuring API integration worked seamlessly",
      ],
      solutions: [
        "Configured extension services for speed",
        "Integrated keyboard shortcuts for accessibility",
        "Worked with backend for seamless data flow",
      ],
      results:
        "Delivered a fast, accessible Chrome extension adopted by end users with positive feedback.",
      keyFeatures: [
        "Chrome extension dashboard",
        "Keyboard shortcut support",
        "Optimized API integrations",
      ],
    },
  },
];
