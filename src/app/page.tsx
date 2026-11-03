import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { RotatingText } from "@/components/rotating-text";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import BorderBeam from "@/components/magicui/border-beam";
import { Icons } from "@/components/icons";
import { ArrowUpRight, MapPin } from "lucide-react";
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
  "Agentic Workflows": "https://cdn.simpleicons.org/langchain/1C3C3C",
  "RAG Pipelines": "https://cdn.simpleicons.org/langchain/1C3C3C",
  "LLM Integration": "https://cdn.simpleicons.org/anthropic/D97757",
  "AWS (EC2)": "https://skillicons.dev/icons?i=aws",
  Docker: "https://skillicons.dev/icons?i=docker",
  "CI/CD": "https://cdn.simpleicons.org/githubactions/2088FF",
  GCP: "https://skillicons.dev/icons?i=gcp",
  Stripe: "https://cdn.simpleicons.org/stripe/635BFF",
  MySQL: "https://skillicons.dev/icons?i=mysql",
  SQLAlchemy: "https://cdn.simpleicons.org/sqlalchemy/D71F00",
  "Headless WordPress": "https://skillicons.dev/icons?i=wordpress",
  "REST APIs": "https://cdn.simpleicons.org/fastapi/009688",
  "OAuth/Auth Implementation": "https://cdn.simpleicons.org/auth0/EB5424",
};

export default function Page() {
  return (
    <main className="flex min-h-[100dvh] flex-col space-y-10">
      <section id="hero">
        <div className="w-full space-y-8">
          <div className="relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-border/50 bg-card/20 p-5 shadow-sm md:p-6 lg:flex-row lg:items-center lg:justify-between">
            <BorderBeam size={140} duration={28} />
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
                <Avatar className="size-28 border border-border/60 shadow-sm lg:size-36">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} className="object-cover" />
                  <AvatarFallback className="bg-muted text-3xl">🧑‍💻</AvatarFallback>
                </Avatar>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY + 0.12}>
                <div className="flex flex-col gap-2.5 lg:items-end">
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-4" />
                    {DATA.location}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      href={DATA.contact.social.GitHub.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="inline-flex size-9 items-center justify-center rounded-lg border border-border/70 bg-background transition-colors hover:bg-muted/50"
                    >
                      <Icons.github className="size-4" />
                    </Link>
                    <Link
                      href={DATA.contact.social.LinkedIn.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="inline-flex size-9 items-center justify-center rounded-lg border border-border/70 bg-background transition-colors hover:bg-muted/50"
                    >
                      <Icons.linkedin className="size-4" />
                    </Link>
                    <Link
                      href={`mailto:${DATA.contact.email}`}
                      aria-label="Email"
                      className="inline-flex size-9 items-center justify-center rounded-lg border border-border/70 bg-background transition-colors hover:bg-muted/50"
                    >
                      <Icons.email className="size-4" />
                    </Link>
                  </div>
                </div>
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
                badges={"badges" in experience ? experience.badges : undefined}
                description={
                  "description" in experience ? experience.description : undefined
                }
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
                  className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border/60 bg-white p-0 shadow-sm hover:border-border"
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
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/30 p-5 shadow-sm backdrop-blur-sm md:p-6">
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
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Projects</h2>
              <p className="text-sm text-muted-foreground">
                A few things I&apos;ve built recently, from client sites to AI
                pipelines.
              </p>
            </div>
          </BlurFade>
          <div className="mt-3 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
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
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Get in Touch</h2>
              <p className="text-sm text-muted-foreground">
                Open to full-time roles and freelance work. The fastest way to
                reach me is a direct message on LinkedIn or email.
              </p>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 17}>
            <div className="flex flex-wrap gap-2.5">
              <Link
                href={`mailto:${DATA.contact.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Icons.email className="size-4" />
                Email me
              </Link>
              <Link
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background px-3.5 py-2 text-xs font-semibold transition-colors hover:bg-muted/50"
              >
                <Icons.linkedin className="size-4" />
                LinkedIn
              </Link>
              <Link
                href={DATA.contact.social.GitHub.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background px-3.5 py-2 text-xs font-semibold transition-colors hover:bg-muted/50"
              >
                <Icons.github className="size-4" />
                GitHub
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
