import { mediaPlaceholder } from "@/data/content";
import { cn } from "@/lib/utils";

/**
 * Honest empty frame for "project photo not available yet" (spec section 6).
 * Replace with a real <img> as soon as the user supplies a file. Never fill with a stock image.
 */
export function MediaPlaceholder({ tone = "dark", className }: { tone?: "dark" | "paper"; className?: string }) {
  const paper = tone === "paper";
  return (
    <figure
      className={cn(
        "relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-dashed p-6 text-center md:aspect-[4/3]",
        paper ? "border-ink-line-strong bg-paper-2 text-ink" : "border-line-strong bg-surface text-foreground",
        className,
      )}
    >
      <div
        aria-hidden
        className="graph-paper absolute inset-0"
        style={{ "--graph-line": paper ? "var(--color-ink-line)" : "var(--color-line)" } as React.CSSProperties}
      />
      <span
        className={cn(
          "absolute left-4 top-4 text-label font-medium uppercase",
          paper ? "text-ink-subtle" : "text-subtle",
        )}
      >
        {mediaPlaceholder.label}
      </span>
      <figcaption className="relative max-w-xs">
        <span className="block font-display text-h3">{mediaPlaceholder.title}</span>
        <span className={cn("mt-2 block text-caption", paper ? "text-ink-subtle" : "text-subtle")}>
          {mediaPlaceholder.caption}
        </span>
      </figcaption>
    </figure>
  );
}
