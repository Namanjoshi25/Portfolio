import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Naman Joshi",
  initials: "NJ",
  url: "http://localhost:3000/",
  location: "Delhi NCR, India",
  description:
    "Software engineer at AISolv, building production FastAPI backends, LLM agents and evaluation pipelines, and Next.js frontends for client products.",
  resumeUrl: "/personal/resume.pdf",
  summary: `I'm a software engineer at AISolv, an AI product studio, where I build production backends, LLM features and the tests around them for client products. Before that, I spent a year freelancing on e-commerce and web projects.

### What I work on

- **Production backends:** async FastAPI services on PostgreSQL and MySQL, Redis/RQ workers and Alembic migrations, deployed on GCP Cloud Run and AWS ECS Fargate.
- **LLM features:** tool-calling agents over real user data, LLM-as-judge evaluation pipelines, Langfuse tracing with cost tracking, and safety checks before and after the model.
- **Production debugging:** fixing deadlocks and N+1 queries, such as a task sweep that made up to 500 database round trips per tick, which I cut to one batched query per task kind.
- **Testing:** pytest, Vitest and Playwright suites, including 244 frontend test cases with accessibility checks on a clinical dashboard.
- **Frontend:** Next.js and React dashboards and role-based portals.`,
  avatarUrl: "/me.png",
  skills: [
    // Languages
    "Python",
    "TypeScript",

    // Backend & data
    "FastAPI",
    "SQLAlchemy",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis / RQ",

    // AI
    "OpenAI API",
    "Anthropic API",
    "Tool-calling Agents",
    "RAG (pgvector)",
    "LLM-as-judge Evals",

    // Cloud & DevOps
    "AWS (ECS, SQS, SES)",
    "GCP (Cloud Run)",
    "Docker",
    "GitHub Actions",

    // Frontend & testing
    "Next.js",
    "React",
    "pytest",
    "Vitest",
    "Playwright",
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
      href: "#",
      degree: "B.Tech, CGPA 8.67",
      logoUrl: "",
      start: "2020",
      end: "2024",
    },
    {
      school: "Bal Bharati Public School",
      href: "#",
      degree: "Schooling",
      logoUrl: "",
      start: "2008",
      end: "2020",
    },

  ],
  experience: [
    {
      company: "AISolv",
      href: "#",
      title: "Software Engineer",
      logoUrl: "",
      start: "Aug 2025",
      end: "Present",
      badges: ["FastAPI", "PostgreSQL", "OpenAI", "Next.js", "AWS", "GCP"],
      description:
        "Build production backends, LLM features and frontends for client products at an AI product studio. On Tableside, a social-dining marketplace, I built onboarding, auth and portals for all four user roles. I also fixed a production deadlock that made every invite acceptance wait out a 60 s timeout, and removed an N+1 sweep that made up to 500 database round trips per tick. On Ask Hilo, I built 13 tool-calling functions over wearable data, an LLM-as-judge evaluation pipeline and the safety layer. On the Hilo clinical dashboard, I built 27 of the 30 frontend pages and a CI suite of 244 Vitest cases plus Playwright tests.",
    },
    {
      company: "Freelance",
      href: "#",
      title: "Full-Stack Developer",
      logoUrl: "",
      start: "Jun 2024",
      end: "Jul 2025",
      badges: [],
      description: "Delivered 4 client e-commerce and web projects.",
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
        "Social-dining marketplace where diners book shared tables at partner venues. Built onboarding, auth and portals for all four user roles (diners, venues, hosts, admins), plus venue slots, event assembly and the host-assignment approval gate. Wrote 28 Alembic migrations and created 144 test files. Fixed a production deadlock that made every SMS or email invite acceptance wait out a 60 s timeout, and replaced an N+1 reconciliation sweep (up to 500 database round trips per tick) with one batched query per task kind. Delivered at AISolv.",
      technologies: [
        "FastAPI",
        "Python",
        "PostgreSQL",
        "SQLAlchemy",
        "Alembic",
        "Redis",
        "RQ",
        "Next.js",
        "React",
        "TypeScript",
        "GCP Cloud Run",
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
        "Multi-tenant clinical dashboard for clinics and their patients. Built the patient module, the wearable telemetry API, a signed magic-link consent flow, and an SQS + SES worker for patient-data exports (CSV and PDF). Built 27 of the 30 frontend pages and the frontend CI: 244 Vitest cases with accessibility checks (jest-axe), plus Playwright tests for auth and permissions. Delivered at AISolv.",
      technologies: [
        "FastAPI",
        "Python",
        "MySQL",
        "MongoDB",
        "AWS ECS Fargate",
        "SQS",
        "SES",
        "Next.js",
        "React",
        "TypeScript",
        "Vitest",
        "Playwright",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Ask Hilo — AI Health Insights",
      type: "Client",
      href: "#",
      dates: "2025",
      active: true,
      description:
        "LLM health coach for a wearable blood-pressure device. Built 13 tool-calling functions over wearable data (blood pressure, sleep, heart rate, steps) that the agent uses to answer users' health questions. Built an LLM-as-judge evaluation pipeline that runs uploaded question sets on an RQ queue and scores every answer from 1 to 5, plus Langfuse tracing with cached-token cost tracking. Wrote the safety layer (emergency, PII and prescriptive-language checks before and after the model) and an Intercom human-handover flow, covered by 15 unit and integration tests. Delivered at AISolv.",
      technologies: [
        "FastAPI",
        "Python",
        "OpenAI",
        "Tool Calling",
        "LLM-as-judge Evals",
        "Langfuse",
        "Redis",
        "RQ",
        "MongoDB",
        "Intercom",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Aleph — AI FP&A Platform",
      type: "Client",
      href: "#",
      dates: "2025",
      active: true,
      description:
        "Built an AI-native, spreadsheet-first Financial Planning & Analysis platform. Users upload arbitrary-shape CSVs into a generic PostgreSQL store where meaning is added through metadata, then query and model their financials through a web surface. Async FastAPI + asyncpg backend with pandas-driven transforms and an LLM query layer. Delivered at AISolv.",
      technologies: [
        "FastAPI",
        "Python",
        "PostgreSQL",
        "asyncpg",
        "SQLAlchemy",
        "pandas",
        "LLM Integration",
        "Pydantic",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Supply Analytics Agent",
      type: "Client",
      href: "#",
      dates: "2025",
      active: true,
      description:
        "Built a natural-language supply-chain analytics agent for a coffee company. The agent plans its own data-source selection, performs cross-file joins and aggregations over products, BOM and transactions data, and returns both narrative and tabular answers. Python agent backend with an OpenAI planning loop and a chat-style React / TypeScript frontend that surfaces the plan, per-step results and final answer.",
      technologies: [
        "Python",
        "FastAPI",
        "OpenAI",
        "pandas",
        "Agentic Workflows",
        "React",
        "TypeScript",
        "Vite",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "Automated Lead-Gen Pipeline",
      type: "Client",
      href: "#",
      dates: "2025",
      active: true,
      description:
        "Engineered a multi-stage pipeline that finds, qualifies, enriches and personalizes B2B sales leads from e-commerce companies. Orchestrated a configurable step-based flow integrating BrightData and Apify scraping, NeverBounce email verification, OpenAI-driven personalization and Instantly.ai outreach, with Supabase persistence.",
      technologies: [
        "Python",
        "OpenAI",
        "BrightData",
        "Apify",
        "NeverBounce",
        "Instantly.ai",
        "Supabase",
        "Data Engineering",
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
