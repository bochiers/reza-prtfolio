import { Section, SectionLabel, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { AxisBubbles, GhostNumeral, HatchBand } from "@/components/ui/decor";
import { skills } from "@/data/content";

function GroupHeading({ children }: { children: string }) {
  return <h3 className="text-h3 text-foreground">{children}</h3>;
}

export function Skills() {
  const { software, field, languages } = skills;
  return (
    <Section
      id="keahlian"
      labelledBy="keahlian-judul"
      decor={
        <>
          <GhostNumeral n="04" />
          <AxisBubbles className="left-[6%] top-[14%]" />
          <HatchBand className="inset-x-0 bottom-0 h-20" />
        </>
      }
    >
      <Reveal>
        <SectionLabel n="04">{skills.label}</SectionLabel>
        <SectionTitle id="keahlian-judul">{skills.title}</SectionTitle>
      </Reveal>

      <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-14">
        <Reveal className="col-span-12 border-t border-line-strong pt-6 md:col-span-4">
          <GroupHeading>{software.group}</GroupHeading>
          <ul className="mt-5 flex flex-wrap gap-2">
            {software.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line-strong px-4 py-1.5 text-sm text-foreground transition-colors duration-150 hover:border-foreground hover:bg-surface-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="col-span-12 border-t border-line-strong pt-6 md:col-span-4" delay={0.08}>
          <GroupHeading>{field.group}</GroupHeading>
          <ul className="mt-5 space-y-3">
            {field.items.map((item) => (
              <li key={item} className="flex gap-3 text-body text-muted">
                <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="col-span-12 border-t border-line-strong pt-6 md:col-span-4" delay={0.16}>
          <GroupHeading>{languages.group}</GroupHeading>
          <ul className="mt-5 flex flex-wrap gap-2">
            {languages.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line-strong px-4 py-1.5 text-sm text-foreground transition-colors duration-150 hover:border-foreground hover:bg-surface-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
