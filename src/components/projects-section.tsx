"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

const BLUR_FADE_DELAY = 0.04;
const INITIAL_COUNT = 4;

type Project = {
  title: string;
  href?: string;
  dates: string;
  description: string;
  technologies: readonly string[];
  image?: string;
  video?: string;
  type?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
};

type Filter = "All" | "Client" | "AI" | "Web";

const AI_SIGNALS = [
  "openai",
  "llm",
  "rag",
  "pgvector",
  "agentic",
  "vector",
  "celery",
  "langchain",
  "anthropic",
  "pwa agent",
];

function categorize(project: Project): Filter[] {
  const cats: Filter[] = [];
  if (project.type === "Client") cats.push("Client");

  const tech = project.technologies.join(" ").toLowerCase();
  const isAI = AI_SIGNALS.some((sig) => tech.includes(sig));
  if (isAI) cats.push("AI");

  // Anything web-forward that isn't purely a backend/AI pipeline
  if (/next\.js|react|typescript|tailwind/i.test(tech)) cats.push("Web");

  return cats.length ? cats : ["Web"];
}

export function ProjectsSection({ projects }: { projects: readonly Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [expanded, setExpanded] = useState(false);

  const tagged = useMemo(
    () => projects.map((p) => ({ project: p, cats: categorize(p) })),
    [projects]
  );

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { All: projects.length, Client: 0, AI: 0, Web: 0 };
    for (const { cats } of tagged) {
      if (cats.includes("Client")) c.Client++;
      if (cats.includes("AI")) c.AI++;
      if (cats.includes("Web")) c.Web++;
    }
    return c;
  }, [tagged, projects.length]);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? tagged.map((t) => t.project)
        : tagged.filter((t) => t.cats.includes(filter)).map((t) => t.project),
    [tagged, filter]
  );

  const base = filtered.slice(0, INITIAL_COUNT);
  const extra = filtered.slice(INITIAL_COUNT);
  const hiddenCount = extra.length;

  const filters: Filter[] = ["All", "Client", "AI", "Web"];

  const cardTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="flex min-h-0 flex-col gap-y-4">
      <BlurFade delay={BLUR_FADE_DELAY * 11}>
        <div className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-xl font-bold">Projects</h2>
            <p className="text-sm text-muted-foreground">
              A few things I&apos;ve built recently, from client platforms to AI
              pipelines.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setExpanded(false);
                }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  "[.newspaper_&]:rounded-none",
                  filter === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border/70 bg-background text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                {f}
                <span
                  className={cn(
                    "rounded-full px-1 text-[10px] tabular-nums",
                    filter === f ? "bg-primary-foreground/20" : "bg-muted"
                  )}
                >
                  {counts[f]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </BlurFade>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        {base.map((project, id) => (
          <BlurFade
            key={`${filter}-${project.title}`}
            delay={BLUR_FADE_DELAY * 12 + id * 0.06}
          >
            <ProjectCard
              href={project.href}
              title={project.title}
              type={project.type}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links}
            />
          </BlurFade>
        ))}

        <AnimatePresence initial={false}>
          {expanded &&
            extra.map((project, id) => (
              <motion.div
                key={`${filter}-extra-${project.title}`}
                layout
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { ...cardTransition, delay: id * 0.07 },
                }}
                exit={{
                  opacity: 0,
                  y: 12,
                  filter: "blur(6px)",
                  transition: {
                    duration: 0.3,
                    ease: [0.4, 0, 1, 1] as const,
                    delay: (extra.length - 1 - id) * 0.04,
                  },
                }}
              >
                <ProjectCard
                  href={project.href}
                  title={project.title}
                  type={project.type}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {filtered.length > INITIAL_COUNT && (
        <div className="flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-1.5 text-xs font-semibold transition-colors hover:bg-muted/50",
              "[.newspaper_&]:rounded-none [.newspaper_&]:uppercase [.newspaper_&]:tracking-wider"
            )}
          >
            {expanded ? "Show less" : `Show ${hiddenCount} more`}
          </button>
        </div>
      )}
    </div>
  );
}
