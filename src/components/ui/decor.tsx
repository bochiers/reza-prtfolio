import { ParallaxLayer } from "@/components/ui/parallax-layer";
import { cn } from "@/lib/utils";

/**
 * Decorative section layers. Each export is a ready-to-place ParallaxLayer (speed / cap from
 * docs/design-spec.md 10.3). Always aria-hidden + pointer-events-none via <Section decor>.
 * `desktopOnly` layers are not mounted below 1024px; the rest halve their cap there.
 * Colours come from tokens; anything that can sit behind text stays <= 0.12 alpha.
 */

const FG12 = "color-mix(in oklab, var(--color-foreground) 12%, transparent)";
const ACC50 = "color-mix(in oklab, var(--color-accent) 50%, transparent)";

export function GhostNumeral({
  n,
  paper = false,
  small = false,
  speed = 0.2,
  maxPx = 90,
  className,
}: {
  n: string;
  paper?: boolean;
  small?: boolean;
  speed?: number;
  maxPx?: number;
  className?: string;
}) {
  return (
    <ParallaxLayer
      speed={speed}
      maxPx={maxPx}
      // top offset >= the max upward drift (90px desktop, 45px mobile) so the section edge never slices the numeral.
      className={cn("absolute right-[1vw] top-12 z-0 md:top-24", className)}
    >
      <span className={cn("ghost-numeral block", paper && "ghost-numeral--paper", small && "ghost-numeral--sm")}>{n}</span>
    </ParallaxLayer>
  );
}

/** Vertical dimension line, 1px with 10px ticks, no figures. */
export function DimLineV({ className, speed = -0.06, maxPx = 36 }: { className?: string; speed?: number; maxPx?: number }) {
  return (
    <ParallaxLayer desktopOnly speed={speed} maxPx={maxPx} className={cn("absolute z-0", className)}>
      <svg width="12" height="320" viewBox="0 0 12 320" fill="none" stroke={ACC50} strokeWidth="1" className="block">
        <path d="M6 0V320M1 0.5H11M1 319.5H11" />
      </svg>
    </ParallaxLayer>
  );
}

/** Horizontal dashed dimension / axis line. */
export function DimLineH({ className, speed = 0.1, maxPx = 40 }: { className?: string; speed?: number; maxPx?: number }) {
  return (
    <ParallaxLayer desktopOnly speed={speed} maxPx={maxPx} className={cn("absolute z-0", className)}>
      <svg width="100%" height="12" fill="none" stroke={FG12} strokeWidth="1" className="block w-full">
        <path d="M0 6H4000" strokeDasharray="2 8" />
        <path d="M0.5 1V11" />
      </svg>
    </ParallaxLayer>
  );
}

export function GridPatch({ className, speed = 0.1, maxPx = 50 }: { className?: string; speed?: number; maxPx?: number }) {
  return (
    <ParallaxLayer desktopOnly speed={speed} maxPx={maxPx} className={cn("absolute z-0", className)}>
      <div className="decor-grid-patch h-full w-full" />
    </ParallaxLayer>
  );
}

/** Row of five axis bubbles A-E, same language as the hero blueprint. */
export function AxisBubbles({ className, speed = 0.12, maxPx = 50 }: { className?: string; speed?: number; maxPx?: number }) {
  return (
    <ParallaxLayer desktopOnly speed={speed} maxPx={maxPx} className={cn("absolute z-0", className)}>
      <svg width="360" height="24" viewBox="0 0 360 24" fill="none" className="block">
        <path d="M11 12H349" stroke={FG12} strokeDasharray="2 8" />
        {["A", "B", "C", "D", "E"].map((l, i) => (
          <g key={l} transform={`translate(${12 + i * 84} 12)`}>
            <circle r="11" fill="var(--color-background)" stroke={FG12} />
            <text textAnchor="middle" dy="0.35em" fontSize="11" fill={FG12} fontFamily="IBM Plex Sans">
              {l}
            </text>
          </g>
        ))}
      </svg>
    </ParallaxLayer>
  );
}

/** Three wavy soil-strata lines (same path language as the blueprint). */
export function Strata({ className, speed = 0.12, maxPx = 60 }: { className?: string; speed?: number; maxPx?: number }) {
  const wave = (y: number) => {
    let d = `M0 ${y}`;
    for (let i = 0; i < 10; i++) d += " q10 -4 20 0 t20 0";
    return d;
  };
  return (
    <ParallaxLayer desktopOnly speed={speed} maxPx={maxPx} className={cn("absolute z-0", className)}>
      <svg width="400" height="60" viewBox="0 0 400 60" fill="none" stroke={FG12} strokeWidth="1.25" className="block">
        <path d={wave(8)} />
        <path d={wave(30)} />
        <path d={wave(52)} />
      </svg>
    </ParallaxLayer>
  );
}

/** CDM column outlines (24 x 106), `count` of them. `paper` switches to ink strokes for the cream section. */
export function PileColumns({
  count = 1,
  paper = false,
  speed = -0.1,
  maxPx = 30,
  className,
}: {
  count?: number;
  paper?: boolean;
  speed?: number;
  maxPx?: number;
  className?: string;
}) {
  // Behind text, so alpha stays <= 0.12 (spec 10.3 rule 4) even on paper.
  const stroke = paper ? "color-mix(in oklab, var(--color-ink) 12%, transparent)" : ACC50;
  const w = count * 48;
  return (
    <ParallaxLayer desktopOnly speed={speed} maxPx={maxPx} className={cn("absolute z-0", className)}>
      <svg width={w} height="118" viewBox={`0 0 ${w} 118`} fill="none" stroke={stroke} strokeWidth="1.5" className="block">
        {Array.from({ length: count }, (_, i) => (
          <path key={i} d={`M${12 + i * 48} 0V106H${36 + i * 48}V0`} />
        ))}
      </svg>
    </ParallaxLayer>
  );
}

export function HatchBand({ className, speed = -0.08, maxPx = 30 }: { className?: string; speed?: number; maxPx?: number }) {
  return (
    <ParallaxLayer desktopOnly speed={speed} maxPx={maxPx} className={cn("absolute z-0", className)}>
      <div className="decor-hatch h-full w-full" />
    </ParallaxLayer>
  );
}

/** Three concentric arches, an echo of the hero frame. Kept on mobile (halved cap). */
export function ArchRings({ className, speed = 0.16, maxPx = 80 }: { className?: string; speed?: number; maxPx?: number }) {
  return (
    <ParallaxLayer speed={speed} maxPx={maxPx} className={cn("absolute z-0", className)}>
      <div className="relative h-[22rem] w-[18rem] md:h-[30rem] md:w-[25rem]">
        <div className="decor-arch h-full w-full" />
        <div className="decor-arch h-[84%] w-[84%]" />
        <div className="decor-arch h-[68%] w-[68%]" />
      </div>
    </ParallaxLayer>
  );
}
