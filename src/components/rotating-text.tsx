"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface RotatingTextProps {
  items: readonly string[];
  className?: string;
  intervalMs?: number;
}

export function RotatingText({
  items,
  className,
  intervalMs = 2200,
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

  return (
    <div className={`relative h-5 overflow-hidden ${className ?? ""}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={items[activeIndex]}
          initial={{ x: -18, opacity: 0, filter: "blur(6px)" }}
          animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ x: 18, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute left-0 top-0 whitespace-nowrap"
        >
          {items[activeIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
