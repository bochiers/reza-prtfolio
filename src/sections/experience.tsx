import { Section, SectionLabel, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { GhostNumeral, PileColumns, Strata } from "@/components/ui/decor";
import { experience } from "@/data/content";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <Section
      id="pengalaman"
      labelledBy="pengalaman-judul"
      decor={
        <>
          <GhostNumeral n="02" />
          <Strata className="right-0 top-[32%]" />
          <PileColumns className="right-[7%] top-[52%]" />
        </>
      }
    >
      <Reveal>
        <SectionLabel n="02">{experience.label}</SectionLabel>
        <SectionTitle id="pengalaman-judul">{experience.title}</SectionTitle>
      </Reveal>

      <ol className="mt-10 space-y-10 md:mt-14 md:space-y-14">
        {experience.items.map((item) => {
          const featured = Boolean(item.featuredLabel);
          return (
            <li key={item.year} className="group/item relative">
              {/* Rail + marker. Mobile: left edge. lg: at the start of the content column. */}
              <span
                aria-hidden
                className="absolute -bottom-10 left-[7px] top-3 w-px bg-line-strong group-last/item:bottom-0 md:-bottom-14 lg:left-[calc(16.667%+13px)]"
              />
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-2 h-[15px] w-[15px] rounded-full border lg:left-[calc(16.667%+6px)]",
                  featured ? "border-accent bg-accent" : "border-line-strong bg-background",
                )}
              />
              <Reveal>
                <article className="grid grid-cols-12 gap-x-6 pl-8 lg:pl-0">
                  <div className="col-span-12 lg:col-span-2">
                    <p className="font-display text-h3 tabular-nums text-foreground lg:sticky lg:top-24">{item.year}</p>
                  </div>
                  <div className="col-span-12 mt-1 lg:col-span-9 lg:col-start-3 lg:mt-0 lg:pl-8">
                    <h3 className="text-h3 text-foreground">{item.role}</h3>
                    <p className="mt-1 text-body text-muted">{item.org}</p>
                    {item.place && <p className="text-caption text-subtle">{item.place}</p>}
                    {item.featuredLabel && (
                      <p className="mt-3 text-label font-medium uppercase text-accent">{item.featuredLabel}</p>
                    )}
                    <p className="mt-4 max-w-copy text-body text-muted">{item.body}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
