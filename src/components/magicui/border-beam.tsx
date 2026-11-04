import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  glow?: boolean;
}

export const BorderBeam = ({
  className,
  size = 150,
  duration = 18,
  anchor = 90,
  borderWidth = 1,
  colorFrom,
  colorTo,
  delay = 0,
  glow = true,
}: BorderBeamProps) => {
  const styleVars: React.CSSProperties = {
    // @ts-expect-error -- custom CSS properties
    "--size": size,
    "--duration": duration,
    "--anchor": anchor,
    "--border-width": borderWidth,
    "--delay": `-${delay}s`,
  };
  // Only pin colors inline when explicitly provided, so the theme-aware
  // defaults below can respond to light/dark.
  if (colorFrom) (styleVars as any)["--color-from"] = colorFrom;
  if (colorTo) (styleVars as any)["--color-to"] = colorTo;

  return (
    <div
      style={styleVars}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] opacity-80 dark:opacity-50 [.newspaper_&]:!opacity-0 [border:calc(var(--border-width)*1px)_solid_transparent]",
        // mask so only the border region is visible
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        // theme-aware default colors: soft silver on light, white on dark
        "[--color-from:theme(colors.indigo.500)] [--color-to:theme(colors.sky.400)] dark:[--color-from:#ffffff] dark:[--color-to:#ffffff] [.newspaper_&]:[--color-from:theme(colors.amber.700)] [.newspaper_&]:[--color-to:theme(colors.amber.500)]",
        // the running light
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        // soft glow
        glow &&
          "after:blur-[1px] after:drop-shadow-[0_0_4px_var(--color-from)]",
        className
      )}
    />
  );
};

export default BorderBeam;
