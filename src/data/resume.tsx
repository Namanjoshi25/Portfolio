import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Naman Joshi",
  initials: "NJ",
  url: "http://localhost:3000/",
  location: "Delhi ,India",
  description:
  "I am a Full-Stack Engineer and AI Architect with a track record of shipping production-level systems that bridge the gap between AI and real-world business automation. I specialize in architecting scalable MERN/Next.js applications and building autonomous AI pipelines that transform unstructured data into actionable business intelligence.",
  resumeUrl: "/personal/resume.pdf",
  summary: `I am a Full-Stack Engineer and AI Architect with a track record of shipping production-level systems that bridge the gap between AI and real-world business automation. I specialize in architecting scalable MERN/Next.js applications and building autonomous AI pipelines that transform unstructured data into actionable business intelligence.

### Core Competencies

- **Payments & Production Backends:** Shipping client platforms with Stripe Connect split-payments, async FastAPI services, Redis/RQ background workers, and PostgreSQL/MySQL data layers.
- **Full-Stack Architecture:** Building resilient multi-tenant applications with Next.js, Node.js, and Python (FastAPI/Flask), secured by role-based access control, audit logging, and transactional integrity.
- **AI Agentic Workflows:** Designing autonomous systems using LLMs and vector databases (RAG) to turn unstructured data into actionable intelligence.
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
    "GCP",
    "Docker",
    "CI/CD",
    "Stripe",
    "MySQL",
    "SQLAlchemy",
 
  

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
      school: "Guru Tegh Bahadur Institute of Technology",
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
      badges: ["FastAPI", "Next.js", "AWS", "Stripe"],
      description:
        "Shipped production client platforms end-to-end. Built a social-dining booking product with Stripe Connect split-payments and payouts, Redis/RQ background workers, and SMS + web-push notifications on an async FastAPI + PostgreSQL backend with a Next.js 16 / React 19 frontend. Delivered a multi-tenant B2B healthcare dashboard with role-based access control, audit logging, and PDF reporting deployed on AWS ECS Fargate.",
    },
  ],
  projects: [
    {
      title: "Tableside — Social Dining Platform",
      type: "Client",
      href: "#",
      dates: "2025",
      active: true,
      description:
        "Built a curated social-dining platform where diners book shared tables at partner restaurants. Engineered an async FastAPI backend with Stripe Connect for split payments and payouts, Redis/RQ background workers, and SMS + web-push notifications, paired with a Next.js 16 / React 19 frontend. Delivered at AISolv.",
      technologies: [
        "FastAPI",
        "Python",
        "PostgreSQL",
        "SQLAlchemy",
        "Redis",
        "Stripe Connect",
        "Next.js",
        "React",
        "TypeScript",
        "Docker",
        "GCP",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Hilo — B2B Healthcare Dashboard",
      type: "Client",
      href: "#",
      dates: "2025",
      active: true,
      description:
        "Developed a multi-tenant B2B healthcare dashboard for clinics to manage doctors, patients and vitals data. Implemented granular role-based access control, audit logging, and PDF report delivery on a FastAPI + MySQL backend deployed on AWS ECS Fargate, with a Next.js dashboard using TanStack Query and shadcn/ui. Delivered at AISolv.",
      technologies: [
        "FastAPI",
        "Python",
        "MySQL",
        "AWS",
        "ECS Fargate",
        "Next.js",
        "React",
        "TypeScript",
        "TanStack Query",
        "RBAC",
        "shadcn/ui",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "O2 Nutrition",
      type: "Client",
      href: "https://o2nutrition.com/",
      dates: "2025",
      active: true,
      description:
        "Built and shipped a client-facing nutrition platform for O2 Nutrition with secure OTP verification flows, social login via Facebook and Apple, and payment gateway integration using Cashfree for seamless checkout.",
      technologies: [
        "Next.js",
        "TypeScript",
        "OTP Verification",
        "Facebook Auth",
        "Apple Auth",
        "Cashfree",
        "TailwindCSS"
      ],
      links: [
        {
          type: "Website",
          href: "https://o2nutrition.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/clients/o2_main.png",
      video: "",
    },
    {
      title: "Autonomous Document RAG Orchestrator",
      href: "https://github.com/Namanjoshi25/Dsa_rag",
      dates: "Feb 2025 - Mar 2025",
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
      video: "/agentic_rag_v2.mp4", // Add a demo video if you have one!
    },
  
    {
      title: "TrackYourGoals - AI-Powered Goal & Project Tracker",
      href: "https://trackyourgoals-omega.vercel.app/",
      dates: "Jan 2025 - Present",
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
          type: "Website",
          href: "https://trackyourgoals-omega.vercel.app/",
          icon: <Icons.globe className="size-3" />,
         
        },
      ],
      image: "",
      video: "/motivlty_v2.mp4",
    },
    {
      title: "Learning management system",
      href: "https://learning-management-system-pi-liard.vercel.app/",
      dates: "Dec 2024 - Jan 2025",
      active: true,
      description:
      "Developed an LMS using Next.js for the frontend and PostgreSQL for the database, with features including user authentication, course creation and management, and dynamic course search and filtering.",
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
   /*  {
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
    }, */
    

    
  ],
 


} as const;
