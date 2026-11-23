import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { RotatingText } from "@/components/rotating-text";
import { ResumeCard } from "@/components/resume-card";
import { ProjectsSection } from "@/components/projects-section";
import { ActivitySection } from "@/components/activity-graph";
import { fetchContributionCalendar } from "@/lib/github";
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
  // One entry per DATA.skills name; a missing key falls back to the GitHub icon.
  Python: "https://skillicons.dev/icons?i=python",
  TypeScript: "https://skillicons.dev/icons?i=ts",
  FastAPI: "https://skillicons.dev/icons?i=fastapi",
  SQLAlchemy: "https://cdn.simpleicons.org/sqlalchemy/D71F00",
  PostgreSQL: "https://skillicons.dev/icons?i=postgres",
  MySQL: "https://skillicons.dev/icons?i=mysql",
  MongoDB: "https://skillicons.dev/icons?i=mongodb",
  "Redis / RQ": "https://skillicons.dev/icons?i=redis",
  // OpenAI, Langfuse and Playwright aren't on skillicons or simpleicons.
  "OpenAI API": "https://unpkg.com/@lobehub/icons-static-svg@1.106.0/icons/openai.svg",
  "Anthropic API": "https://cdn.simpleicons.org/anthropic/D97757",
  "Tool-calling Agents": "https://cdn.simpleicons.org/langchain/1C3C3C",
  "RAG (pgvector)": "https://skillicons.dev/icons?i=postgres",
  "LLM-as-judge Evals": "https://unpkg.com/@lobehub/icons-static-svg@1.106.0/icons/langfuse.svg",
  "AWS (ECS, SQS, SES)": "https://skillicons.dev/icons?i=aws",
  "GCP (Cloud Run)": "https://skillicons.dev/icons?i=gcp",
  Docker: "https://skillicons.dev/icons?i=docker",
  "GitHub Actions": "https://cdn.simpleicons.org/githubactions/2088FF",
  "Next.js": "https://skillicons.dev/icons?i=nextjs",
  React: "https://skillicons.dev/icons?i=react",
  pytest: "https://cdn.simpleicons.org/pytest/0A9EDC",
  Vitest: "https://skillicons.dev/icons?i=vitest",
  Playwright: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/playwright/playwright-original.svg",
};

export const revalidate = 86400;

export default async function Page() {
  const activity = await fetchContributionCalendar();
  return (
    <main className="flex min-h-[100dvh] flex-col space-y-10">
      <section id="hero">
        <div className="w-full space-y-8">
          <div className="relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-border/50 bg-card/20 p-5 shadow-sm md:p-6 lg:flex-row lg:items-center lg:justify-between">
            <BorderBeam size={140} duration={28} />
            <div className="flex-1 space-y-4">
              <BlurFadeText
                text="● Open to Work"
                className="inline-flex rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-700 dark:border-emerald-300/50 dark:bg-emerald-400/15 dark:text-emerald-300 [.newspaper_&]:border-[hsl(90_25%_30%/0.4)] [.newspaper_&]:bg-[hsl(90_25%_35%/0.12)] [.newspaper_&]:text-[hsl(90_30%_24%)]"
                delay={BLUR_FADE_DELAY + 0.02}
              />
              <div className="space-y-4 gap-y-2">
                <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  {DATA.name}
                </h1>
                <RotatingText
                  variant="roll"
                  intervalMs={3000}
                  items={[
                    `${DATA.experience[0].title} @ ${DATA.experience[0].company}`,
                    "Building LLM agents and evals",
                    "Production FastAPI backends",
                    "Shipping client products end to end",
                  ]}
                  className="text-base mb-4 text-muted-foreground"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Software Engineer",
                  "LLM Agents & Evals",
                  "FastAPI · PostgreSQL",
                  "Next.js · React",
                  "AWS · GCP",
                  "pytest · Playwright",
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
                  className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border/60 bg-white p-0 shadow-sm hover:border-border [.newspaper_&]:bg-card"
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
              Production backends, LLM features and the tests that keep them working.
            </p>
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/30 p-5 shadow-sm backdrop-blur-sm md:p-6">
            <div className="mb-4 flex flex-wrap gap-2">
              {["Production Backends", "LLM Agents & Evals", "Testing"].map((pill) => (
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
      <ActivitySection data={activity} className={SECTION_DIVIDER_CLASS} />
      <section id="projects" className={SECTION_DIVIDER_CLASS}>
        <ProjectsSection projects={DATA.projects} />
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
