import { Section, SectionLabel, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { DimLineH, GhostNumeral } from "@/components/ui/decor";
import { organization } from "@/data/content";

export function Organization() {
  return (
    <Section
      id="organisasi"
      labelledBy="organisasi-judul"
      compact
      decor={
        <>
          <GhostNumeral n="05" small speed={0.16} maxPx={50} />
          <DimLineH className="inset-x-6 bottom-8" />
        </>
      }
    >
      <Reveal>
        <SectionLabel n="05">{organization.label}</SectionLabel>
        <SectionTitle id="organisasi-judul">{organization.title}</SectionTitle>
      </Reveal>
      <Reveal className="mt-8 grid grid-cols-12 gap-x-6 gap-y-2 md:mt-10" delay={0.08}>
        <p className="col-span-12 text-body tabular-nums text-subtle lg:col-span-2 lg:pt-1">
          {organization.period}
        </p>
        <div className="col-span-12 lg:col-span-9 lg:col-start-3 lg:pl-8">
          <h3 className="text-h3 text-foreground">{organization.role}</h3>
          <p className="mt-1 text-body text-muted">{organization.org}</p>
          <p className="mt-3 max-w-copy text-body text-muted">{organization.body}</p>
        </div>
      </Reveal>
    </Section>
  );
}
