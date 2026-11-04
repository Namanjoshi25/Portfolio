"use client";

import { AnimatePresence, motion, type Target, type Transition } from "framer-motion";
import { useEffect, useState } from "react";

export const ROTATING_VARIANTS = [
  "slide",
  "fade",
  "slideUp",
  "scale",
  "blur",
  "flip",
  "springUp",
  "stagger",
  "mask",
  "roll",
  "elastic",
] as const;

export type RotatingVariant = (typeof ROTATING_VARIANTS)[number];

type VariantConfig = {
  initial: Target;
  animate: Target;
  exit: Target;
  transition?: Transition;
};

const VARIANTS: Record<RotatingVariant, VariantConfig> = {
  slide: {
    initial: { x: -18, opacity: 0, filter: "blur(6px)" },
    animate: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: { x: 18, opacity: 0, filter: "blur(6px)" },
    transition: { duration: 0.35, ease: "easeOut" },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
    transition: { duration: 0.35, ease: "easeOut" },
  },
  scale: {
    initial: { scale: 0.85, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.1, opacity: 0 },
    transition: { duration: 0.3, ease: "easeOut" },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(10px)" },
    transition: { duration: 0.45, ease: "easeInOut" },
  },
  flip: {
    initial: { rotateX: 90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1 },
    exit: { rotateX: -90, opacity: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  springUp: {
    initial: { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -24, opacity: 0 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  mask: {
    initial: { y: "100%" },
    animate: { y: "0%" },
    exit: { y: "-100%" },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  roll: {
    initial: { rotateX: -90, y: 10, opacity: 0 },
    animate: { rotateX: 0, y: 0, opacity: 1 },
    exit: { rotateX: 90, y: -10, opacity: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  elastic: {
    initial: { scale: 0.6, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.6, opacity: 0 },
    transition: { type: "spring", stiffness: 400, damping: 12 },
  },
  // handled specially below
  stagger: {
    initial: {},
    animate: {},
    exit: {},
  },
};

interface RotatingTextProps {
  items: readonly string[];
  className?: string;
  intervalMs?: number;
  variant?: RotatingVariant;
}

function StaggerText({ text }: { text: string }) {
  const letters = Array.from(text);
  return (
    <motion.span
      className="absolute left-0 top-0 whitespace-nowrap"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.025 } },
        exit: { transition: { staggerChildren: 0.012, staggerDirection: -1 } },
      }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          variants={{
            hidden: { y: 14, opacity: 0 },
            visible: { y: 0, opacity: 1 },
            exit: { y: -14, opacity: 0 },
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function RotatingText({
  items,
  className,
  intervalMs = 2200,
  variant = "slide",
}: RotatingTextProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [items, intervalMs]);

  const config = VARIANTS[variant] ?? VARIANTS.slide;
  const current = items[activeIndex];

  return (
    <div
      className={`relative h-7 overflow-hidden ${className ?? ""}`}
      style={{ perspective: 500 }}
    >
      <AnimatePresence mode="wait">
        {variant === "stagger" ? (
          <StaggerText key={current} text={current} />
        ) : (
          <motion.span
            key={current}
            initial={config.initial}
            animate={config.animate}
            exit={config.exit}
            transition={config.transition}
            className="absolute left-0 top-0 whitespace-nowrap"
          >
            {current}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
