"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Newspaper } from "lucide-react";
import { useTheme } from "next-themes";
import type { MouseEvent } from "react";

const THEME_CYCLE = ["light", "dark", "newspaper"] as const;

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => {
    ready: Promise<void>;
  };
};

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const currentIndex = THEME_CYCLE.indexOf(
      (theme as (typeof THEME_CYCLE)[number]) ?? "light"
    );
    const nextTheme =
      THEME_CYCLE[(currentIndex + 1 + THEME_CYCLE.length) % THEME_CYCLE.length];
    const doc = document as ViewTransitionDocument;

    if (!doc.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const root = document.documentElement;
    const x = event.clientX;
    const y = event.clientY;
    const maxX = Math.max(x, window.innerWidth - x);
    const maxY = Math.max(y, window.innerHeight - y);
    const radius = Math.hypot(maxX, maxY);

    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-r", `${radius}px`);

    doc.startViewTransition(() => {
      setTheme(nextTheme);
    });
  };

  return (
    <Button
      variant="ghost"
      type="button"
      size="icon"
      className="px-2"
      onClick={toggleTheme}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] text-neutral-800 dark:hidden [.newspaper_&]:hidden" />
      <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] dark:block dark:text-neutral-200 [.newspaper_&]:hidden" />
      <Newspaper className="hidden h-[1.1rem] w-[1.1rem] text-[hsl(20_30%_20%)] [.newspaper_&]:block" />
    </Button>
  );
}
