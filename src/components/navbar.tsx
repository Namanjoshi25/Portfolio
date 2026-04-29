"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { FolderKanban, Home, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeHref, setActiveHref] = useState("#hero");
  const navItems = [
    { href: "#hero", label: "Home", icon: Home },
    { href: "#projects", label: "Projects", icon: FolderKanban },
    { href: "#about", label: "About", icon: UserRound },
    { href: "#contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY <= 16);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;

    event.preventDefault();
    setActiveHref(href);

    const target = document.querySelector(href);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  };

  useEffect(() => {
    const sectionIds = ["hero", "projects", "about", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveHref(`#${visible.target.id}`);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "relative z-20 mb-6 flex justify-center transition-all duration-500 ease-out",
          isAtTop
            ? "translate-y-0 opacity-100"
            : "-translate-y-6 opacity-0 pointer-events-none"
        )}
      >
        <nav className="inline-flex w-full max-w-md items-center justify-between rounded-full border border-border/60 bg-background/80 p-1.5 shadow-sm backdrop-blur">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeHref === item.href
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="pl-1">
            <ModeToggle />
          </div>
        </nav>
      </header>

      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14 transition-all duration-500 ease-out",
          isAtTop
            ? "translate-y-10 opacity-0"
            : "translate-y-0 opacity-100"
        )}
      >
        <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
        <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
          {navItems.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href)}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12",
                    activeHref === item.href && "bg-muted text-foreground"
                  )}
                >
                  <item.icon className="size-[18px]" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <ModeToggle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </div>
    </>
  );
}
