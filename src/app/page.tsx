import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { RotatingText } from "@/components/rotating-text";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;
const SECTION_DIVIDER_CLASS = "border-t border-border/40 pt-8";
const SKILL_ICONS: Record<string, string> = {
  TypeScript: "https://skillicons.dev/icons?i=ts",
  "Next.js": "https://skillicons.dev/icons?i=nextjs",
  React: "https://skillicons.dev/icons?i=react",
  "Node.js": "https://skillicons.dev/icons?i=nodejs",
  JavaScript: "https://skillicons.dev/icons?i=js",
  TailwindCSS: "https://skillicons.dev/icons?i=tailwind",
  PostgreSQL: "https://skillicons.dev/icons?i=postgres",
  MongoDB: "https://skillicons.dev/icons?i=mongodb",
  Prisma: "https://skillicons.dev/icons?i=prisma",
  Python: "https://skillicons.dev/icons?i=python",
  FastAPI: "https://skillicons.dev/icons?i=fastapi",
  Celery: "https://cdn.simpleicons.org/celery/37814A",
  Redis: "https://skillicons.dev/icons?i=redis",
  "Agentic Workflows": "https://cdn.simpleicons.org/langchain/ffffff",
  "RAG Pipelines": "https://cdn.simpleicons.org/langchain/ffffff",
  "LLM Integration": "https://cdn.simpleicons.org/openai/ffffff",
  "AWS (EC2)": "https://skillicons.dev/icons?i=aws",
  Docker: "https://skillicons.dev/icons?i=docker",
  "CI/CD": "https://cdn.simpleicons.org/githubactions/2088FF",
  "Headless WordPress": "https://skillicons.dev/icons?i=wordpress",
  "REST APIs": "https://cdn.simpleicons.org/fastapi/009688",
  "OAuth/Auth Implementation": "https://cdn.simpleicons.org/auth0/EB5424",
};

export default function Page() {
  return (
    <main className="flex min-h-[100dvh] flex-col space-y-10">
      <section id="hero">
        <div className="w-full space-y-8">
          <div className="flex flex-col gap-6 rounded-2xl border border-border/50 bg-card/20 p-5 shadow-sm md:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 space-y-4">
              <BlurFadeText
                text="● Open to Work"
                className="inline-flex rounded-full border border-emerald-300/50 bg-emerald-400/15 px-3 py-1 text-sm font-medium text-emerald-300"
                delay={BLUR_FADE_DELAY + 0.02}
              />
              <div className="space-y-4 gap-y-2">
                <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  {DATA.name}
                </h1>
                <RotatingText
                  intervalMs={3000}
                  items={[
                    `${DATA.experience[0].title} @ ${DATA.experience[0].company}`,
                    "Fullstack AI Developer @ AISolv",
                    "Building AI solutions for businesses",
                    "Automating manual processes",
                  ]}
                  className="text-base mb-4 text-muted-foreground"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Fullstack Developer",
                  "AI Automation",
                  "LLM Pipelines",
                  "GCP - AWS",
                  "n8n - Claude",
                ].map((item) => (
                  <Badge key={item} variant="secondary" className="rounded-full px-2.5 py-1 text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2.5 pt-1">
                <Link
                  href={DATA.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-lg bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  View Resume
                  <ArrowUpRight className="ml-1 size-4" />
                </Link>
                <Link
                  href="#projects"
                  className="inline-flex items-center rounded-lg border border-border/70 bg-background px-3.5 py-1.5 text-xs font-semibold transition-colors hover:bg-muted/50"
                >
                  View Projects
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <Avatar className="size-24 border-2 border-sky-300/50 bg-sky-500">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback className="bg-sky-500 text-3xl">🧑‍💻</AvatarFallback>
                </Avatar>
              </BlurFade>
             
            </div>
          </div>
        </div>
      </section>
      <section id="experience" className={SECTION_DIVIDER_CLASS}>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Experience</h2>
          </BlurFade>
          {DATA.experience.map((experience, id) => (
            <BlurFade
              key={`${experience.company}-${experience.title}`}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                href={experience.href}
                logoUrl={experience.logoUrl}
                altText={experience.company}
                title={experience.company}
                subtitle={experience.title}
                period={`${experience.start} - ${experience.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills" className={SECTION_DIVIDER_CLASS}>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge
                  key={skill}
                  title={skill}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border/60 bg-muted/40 p-0"
                >
                  <img
                    src={SKILL_ICONS[skill] ?? "https://skillicons.dev/icons?i=github"}
                    alt={`${skill} logo`}
                    className="size-7 rounded-[2px]"
                  />
                </Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="about" className={SECTION_DIVIDER_CLASS}>
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">About</h2>
            <p className="text-sm text-muted-foreground">
              Building scalable products that combine strong engineering with practical AI automation.
            </p>
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="rounded-2xl border border-border/60 bg-card/30 p-5 shadow-sm backdrop-blur-sm md:p-6">
            <div className="mb-4 flex flex-wrap gap-2">
              {["AI Agentic Workflows", "Full-Stack Architecture", "Data Engineering"].map((pill) => (
                <Badge
                  key={pill}
                  variant="secondary"
                  className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-xs"
                >
                  {pill}
                </Badge>
              ))}
            </div>
            <Markdown className="prose max-w-full text-pretty font-sans text-sm leading-7 text-muted-foreground dark:prose-invert prose-headings:text-foreground prose-strong:text-foreground">
              {DATA.summary}
            </Markdown>
          </div>
        </BlurFade>
      </section>
  
      <section id="education" className={SECTION_DIVIDER_CLASS}>
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="projects" className={SECTION_DIVIDER_CLASS}>
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  type={"type" in project ? project.type : undefined}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
     

      <section id="contact" className={SECTION_DIVIDER_CLASS}>
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a dm{" "}
                <Link
                  href={DATA.contact.social.LinkedIn.url}
                  className="text-blue-500 hover:underline"
                >
                  with a direct question on LinkedIn
                </Link>{" "}
                and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
