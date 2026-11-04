import BorderBeam from "@/components/magicui/border-beam";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";

interface Props {
  title: string;
  type?: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  type,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Card
      className={
        "group relative flex flex-col overflow-hidden border transition-all duration-300 ease-out h-full hover:-translate-y-1 hover:shadow-xl"
      }
    >
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <BorderBeam size={120} duration={16} />
      </div>
      {(video || image) && (
        <Link
          href={href || "#"}
          className={cn("relative block cursor-pointer overflow-hidden", className)}
        >
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="pointer-events-none mx-auto h-40 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" // needed because random black line at bottom of video
            />
          )}
          {image && (
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="h-40 w-full overflow-hidden object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
      )}
      <CardHeader className="border-b border-border/40 px-3 pt-3 pb-2.5">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <time className="font-sans text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {dates}
            </time>
            {type && (
              <Badge className="shrink-0 border-blue-300/60 bg-blue-100 text-[10px] text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/20 dark:text-blue-200 [.newspaper_&]:rounded-none [.newspaper_&]:border-[hsl(var(--foreground)/0.5)] [.newspaper_&]:bg-transparent [.newspaper_&]:text-foreground">
                {type}
              </Badge>
            )}
          </div>
          <CardTitle className="text-base leading-snug transition-colors group-hover:text-primary">
            {title}
          </CardTitle>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs leading-relaxed text-muted-foreground dark:prose-invert">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-3 pt-2.5">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1.5 py-0 text-[10px] [.newspaper_&]:rounded-none [.newspaper_&]:border [.newspaper_&]:border-[hsl(var(--foreground)/0.35)] [.newspaper_&]:bg-transparent"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-3 pb-3 pt-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1.5">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge
                  key={idx}
                  className="flex gap-1.5 px-2 py-1 text-[10px] transition-transform hover:-translate-y-0.5 [.newspaper_&]:rounded-none"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
