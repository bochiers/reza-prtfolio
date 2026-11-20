import { Section, SectionLabel, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { spotlight } from "@/data/content";

/** The only light section (paper). Accent text here must be accent-ink, never accent. */
export function Spotlight() {
  return (
    <Section id="sorotan" labelledBy="sorotan-judul" tone="paper">
      <Reveal>
        <SectionLabel n="03" tone="paper">
          {spotlight.label}
        </SectionLabel>
        <SectionTitle id="sorotan-judul" tone="paper">
          {spotlight.title}
        </SectionTitle>
      </Reveal>

      <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-14 lg:items-start">
        <Reveal className="col-span-12 lg:col-span-7">
          <p className="max-w-copy text-lead text-ink-muted">{spotlight.body}</p>
        </Reveal>
        <Reveal className="col-span-12 lg:col-span-5" delay={0.08}>
          <MediaPlaceholder tone="paper" />
        </Reveal>
      </div>

      <Reveal className="mt-14 md:mt-20">
        <aside aria-labelledby="fakta-pelabuhan">
          <h3 id="fakta-pelabuhan" className="font-sans text-label font-medium uppercase text-ink-subtle">
            {spotlight.factsLabel}
          </h3>
          <dl className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {spotlight.facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse rounded-2xl bg-paper-2 p-5 md:p-8">
                <dt className="mt-1 text-caption text-ink-muted">{f.label}</dt>
                <dd className="font-display text-h3 tabular-nums text-accent-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-caption text-ink-subtle">{spotlight.source}</p>
        </aside>
      </Reveal>
    </Section>
  );
}
