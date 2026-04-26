import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Naman Joshi",
  initials: "NJ",
  url: "http://localhost:3000/",
  location: "Delhi ,India",
  description:
  "I am a Full-Stack Engineer and AI Architect with a track record of shipping production-level systems that bridge the gap between AI and real-world business automation. I specialize in architecting scalable MERN/Next.js applications and building autonomous AI pipelines that transform unstructured data into actionable business intelligence.",
  summary: `I am a Full-Stack Engineer and AI Architect with a track record of shipping production-level systems that bridge the gap between AI and real-world business automation. I specialize in architecting scalable MERN/Next.js applications and building autonomous AI pipelines that transform unstructured data into actionable business intelligence.

### Core Competencies

- **AI Agentic Workflows:** Designing and deploying autonomous systems using LLMs, vector databases (RAG), and self-healing data pipelines.
- **Full-Stack Architecture:** Building resilient applications with Next.js, Node.js, and Python (FastAPI/Flask), secured by industry-standard auth and transactional integrity.
- **Infrastructure & Reliability:** Managing production workflows on AWS (EC2/Lambda), utilizing automated monitoring (Sentry), and implementing robust system observability.
- **Data Engineering:** Expert in scraping, data transformation, and integrating complex APIs to automate workflows for lead generation and business intelligence.

Driven by the philosophy of "Building for Scale," I focus on clean service-oriented architecture, data integrity, and autonomous logic. I have successfully shipped 22+ real-world projects, ranging from AI-integrated habit trackers and LMS platforms to complex analytics dashboards and automated lead-gen agents.`,
  avatarUrl: "/me.png",
  skills:  [
    // Full-Stack Core
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "JavaScript",
    "TailwindCSS",
  
    // Database & Data
    "PostgreSQL",
    "MongoDB",
    "Prisma",
  
    // AI & Automation
    "Python",
    "FastAPI",
    "Celery",
    "Redis",
    "Agentic Workflows",
    "LLM Integration",
  
    // Infrastructure & Reliability
    "AWS (EC2)",
    "Docker",
    "CI/CD",
 
  

  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "namanjoshi8377@gmail.com",
    tel: "+91-9818044085",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Namanjoshi25",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/namanj25/",
        icon: Icons.linkedin,

        navbar: true,
      },
   
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

 
  education: [
    {
      school: "Guru Teg Bahadur Insituite of Technology",
      href: "https://buildspace.so",
      degree: "Btech",
      logoUrl: "/buildspace.jpg",
      start: "2020",
      end: "2024",
    },
    {
      school: "Bal Bharati Public School",
      href: "https://uwaterloo.ca",
      degree: "Schooling",
      logoUrl: "/waterloo.png",
      start: "2008",
      end: "2020",
    },

  ],
  experience: [
    {
      company: "AISolv",
      href: "#",
      title: "Full-Stack AI Developer",
      logoUrl: "/buildspace.jpg",
      start: "Aug 2025",
      end: "Present",
    },
  ],
  projects: [
    {
      title: "Autonomous Document RAG Orchestrator",
      href: "https://github.com/Namanjoshi25/Dsa_rag",
      dates: "Feb 2026 - Mar 2026",
      active: true,
      description:
        "Engineered a scalable, distributed RAG infrastructure enabling users to create domain-specific knowledge bases from uploaded documentation. Implemented an asynchronous task-processing architecture using Celery and Redis to handle compute-intensive vector embedding, with FastAPI providing a robust backend and React delivering an intuitive, type-safe frontend interface.",
      technologies: [
        "Python",
        "FastAPI",
        "Celery",
        "Redis",
        "Docker",
        "React",
        "TypeScript",
        "Prisma",
        "Zod",
        "Vector Databases"
      ],
      links: [
        {
          type: "Source Code",
          href: "https://github.com/Namanjoshi25/Dsa_rag",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "", // Add a demo video if you have one!
    },
    {
      title: "Learning management system",
      href: "https://learning-management-system-pi-liard.vercel.app/",
      dates: "Dec 2024 - Jan 2025",
      active: true,
      description:
      "Developed an LMS project using Next.js for the frontend and PostgreSQL for the database This project likely includes features like user authentication, course creation and management, and the abilityto search and filter courses dynamically",
      technologies: [
        "Next.js",
        "Zod",
        "Prisma",
        "NextAuth",
        "Typescript",
        "PostgreSql",
        "NeonDB",
        "TailwindCSS",
        "ShadCn",

      ],
      links: [
        {
          type: "Website",
          href: "https://learning-management-system-pi-liard.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "TrackYourGoals - AI-Powered Goal & Project Tracker",
      href: "https://github.com/your-username/trackyourgoals",
      dates: "Jan 2026 - Present",
      active: true,
      description:
        "Built a full-stack productivity platform to manage goals, projects, and daily progress in one unified dashboard. Implemented secure authentication, real-time progress insights, and an AI agent workflow for natural-language goal/project actions using Next.js, TypeScript, Prisma, and PostgreSQL.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Prisma",
        "PostgreSQL",
        "NextAuth.js",
        "Tailwind CSS",
        "OpenAI",
        "PWA",
        "Recharts"
      ],
      links: [
        {
          type: "Source Code",
          href: "https://github.com/your-username/trackyourgoals",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/motivlty_v2.mp4",
    },
    {
      title: "Neuzy",
      href: "https://neuzy-frontend.onrender.com",
      dates: "Jan 2024 - Feb 2024",
      active: true,
      description:
      "A news platform offering users the latest entertainment news with features such as personalized news feeds, summaries, and location-based article suggestions. The app provides a sleek and easy-to-navigate UI for reading articles.",
      technologies: [
        "React.js",
        "Javascript",
        "MongoDB",
        "Node.js",
        "TailwindCSS",
        "Express.js",

      ],
      links: [
        {
          type: "Website",
          href: "https://neuzy-frontend.onrender.com",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    

    
  ],
 


} as const;
