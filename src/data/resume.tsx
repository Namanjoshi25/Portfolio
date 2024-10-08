import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Naman Joshi",
  initials: "NJ",
  url: "http://localhost:3000/",
  location: "Delhi ,India",
  description:
  "As a passionate and driven B.Tech graduate from GGSIPU, I specialize in full-stack web development with a focus on the MERN stack (MongoDB, Express.js, React, Node.js) and Next.js.",
  summary:
  "As a passionate and driven B.Tech graduate from GGSIPU, I specialize in full-stack web development with a focus on the MERN stack (MongoDB, Express.js, React, Node.js) and Next.js. I thrive on turning complex problems into elegant solutions, leveraging my knowledge of data structures and algorithms (DSA) to create efficient, scalable applications.With a strong foundation in JavaScript, I have experience building dynamic, user-friendly web applications that enhance user experience and engagement. My skills in API development and integrating various web technologies allow me to contribute effectively in collaborative environments.",
  avatarUrl: "/me.png",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Javascript",
    "Node.js",
    "MongoDB",
    "TailwindCss",
    "Java",

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
  projects: [
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
    {
      title: "Cric-Info",
      href: "https://cric-info-seven.vercel.app/",
      dates: "July 2024 - July 2024",
      active: true,
      description:
      " A live cricket score and commentary app that provides real-time updates on matches. Users can track scores, player stats, and commentary, as well as view scorecards and team data. It incorporates APIs to fetch live cricket data and presents it in an intuitive interface",
      technologies: [
        "Next.js",
        "Typescript",
        "Api",
        "Node.js",
        "TailwindCSS",
        "ShadCn",

      ],
      links: [
        {
          type: "Website",
          href: "https://cric-info-seven.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    {
      title: "Calorie Counter",
      href: "https://calorie-counter-iota.vercel.app/",
      dates: "June 2024 - July 2024",
      active: true,
      description:
" A user-focused application that helps individuals calculate their daily caloric intake based on their personal health metrics and goals. The app includes personalized meal logging, streak tracking, and visualization of meal data for effective progress tracking.",
      technologies: [
        "Next.js",
        "Typescript",
        "MongoDB",
        "Node.js",
        "TailwindCSS",
        "ShadCn",
        "Chart.js",

      ],
      links: [
        {
          type: "Website",
          href: "https://calorie-counter-iota.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    },
    
  ],
 


} as const;
