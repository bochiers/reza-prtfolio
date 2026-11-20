import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const row =
  "group flex min-h-16 w-full items-center justify-between gap-4 border-b border-line-strong py-4 text-left font-display text-h3 text-foreground transition-colors duration-150 hover:border-accent active:border-accent-press";

function Arrow() {
  return (
    <ArrowUpRight
      aria-hidden
      className="h-4 w-4 shrink-0 text-subtle transition-transform duration-150 group-hover:translate-x-1 group-hover:-translate-y-1 group-active:translate-x-0 group-active:translate-y-0 motion-reduce:transform-none"
    />
  );
}

export function ContactLink({
  className,
  children,
  ...props
}: ComponentProps<"a"> & { children: ReactNode }) {
  return (
    <a className={cn(row, "border-t", className)} {...props}>
      <span className="break-all">{children}</span>
      <Arrow />
    </a>
  );
}
