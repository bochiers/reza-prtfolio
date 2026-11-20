import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

interface SectionProps {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
}

/** Page section with an anchor id, a small label and an h2. */
export function Section({ id, label, title, children, className }: SectionProps) {
  const headingId = `${id}-judul`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("scroll-mt-12 px-4 py-20 sm:px-6 md:px-10 md:py-28", className)}>
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-primary/70 sm:text-sm">{label}</p>
          <h2
            id={headingId}
            className="max-w-3xl text-balance text-3xl font-medium leading-[1.05] tracking-[-0.04em] text-primary sm:text-4xl md:text-6xl"
          >
            {title}
          </h2>
        </Reveal>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  );
}
