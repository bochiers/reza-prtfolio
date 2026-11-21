import type { CSSProperties, ReactNode } from "react";
import { CursorSpotlight } from "@/components/ui/cursor-spotlight";
import { cn } from "@/lib/utils";

export type Tone = "dark" | "surface" | "paper";

/** Cursor glow colour per tone (docs/design-spec.md 10.4). Alpha capped so text contrast stays >= 4.5:1. */
const spotlightColor: Record<Tone, string> = {
  dark: "rgb(225 224 204 / 0.06)",
  surface: "rgb(224 134 90 / 0.12)",
  paper: "rgb(131 61 26 / 0.10)",
};

const toneClass: Record<Tone, string> = {
  dark: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  paper: "bg-paper text-ink",
};

interface SectionProps {
  id: string;
  /** id of the h2 that names this section */
  labelledBy: string;
  tone?: Tone;
  /** Smaller vertical padding (secondary sections). */
  compact?: boolean;
  /** Decorative parallax layers (aria-hidden, behind the content). */
  decor?: ReactNode;
  /** Cursor-following glow, fine pointers only. Default true. */
  spotlight?: boolean;
  children: ReactNode;
}

/**
 * Page section: anchor id, tone, vertical rhythm and the 1280px container.
 * `overflow-clip` (not hidden) keeps decorative layers from leaking into neighbours without
 * creating a scroll container, so `position: sticky` inside still works.
 */
export function Section({ id, labelledBy, tone = "dark", compact = false, decor, spotlight = true, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-tone={tone}
      style={{ "--spotlight-color": spotlightColor[tone] } as CSSProperties}
      className={cn("relative isolate overflow-clip px-gutter", compact ? "py-16 md:py-24" : "py-section", toneClass[tone])}
    >
      {decor && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          {decor}
        </div>
      )}
      {spotlight && <CursorSpotlight scope="parent" size={480} className="z-0" />}
      <div className="relative z-10 mx-auto max-w-page">{children}</div>
    </section>
  );
}

/** "02 -- PENGALAMAN". Static, not a heading. */
export function SectionLabel({ n, children, tone = "dark" }: { n: string; children: ReactNode; tone?: Tone }) {
  const paper = tone === "paper";
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-label font-medium uppercase",
        paper ? "text-ink-subtle" : "text-subtle",
      )}
    >
      <span className="tabular-nums">{n}</span>
      <span aria-hidden className={cn("h-px w-6", paper ? "bg-ink-line-strong" : "bg-line-strong")} />
      <span>{children}</span>
    </p>
  );
}

export function SectionTitle({ id, children, tone = "dark" }: { id: string; children: ReactNode; tone?: Tone }) {
  return (
    <h2
      id={id}
      className={cn("mt-4 text-balance text-h2", tone === "paper" ? "text-ink" : "text-foreground")}
    >
      {children}
    </h2>
  );
}
