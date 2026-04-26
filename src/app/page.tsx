import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { RotatingText } from "@/components/rotating-text";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
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
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <div className="flex flex-wrap items-start gap-3">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none"
                  yOffset={8}
                  text={`${DATA.name}`}
                />
                <BlurFadeText
                  text="Open to Work"
                  className="-translate-y-1 glow-sweep rounded-md border border-emerald-200/50 bg-emerald-300/15 px-2 py-1 text-sm text-emerald-100 backdrop-blur-md"
                  delay={BLUR_FADE_DELAY + 0.05}
                />
              </div>
              <div className="ml-2">
                
                  <RotatingText
                  intervalMs={2000}
                    items={[
                      `${DATA.experience[0].title} @ ${DATA.experience[0].company}`,
                      "Building AI solutions for businesses",
                      "Automating manual processes",
                    ]}
                    className="text-sm text-muted-foreground"
                  />
               
              </div>
            </div>
         
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
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
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
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
