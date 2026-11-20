import { ImageOff } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { spotlight } from "@/data/content";

export function Spotlight() {
  return (
    <Section id="sorotan" label="Sorotan" title={spotlight.title}>
      <div className="grid grid-cols-12 gap-6">
        <Reveal className="col-span-12 lg:col-span-7">
          <p className="max-w-2xl text-base leading-relaxed text-primary/80 md:text-lg">{spotlight.body}</p>
          <div
            role="img"
            aria-label={spotlight.mediaPlaceholder}
            className="mt-8 flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-primary/30 text-primary/70"
          >
            <ImageOff aria-hidden className="h-6 w-6" />
            <span className="text-sm">{spotlight.mediaPlaceholder}</span>
          </div>
        </Reveal>

        <Reveal className="col-span-12 lg:col-span-4 lg:col-start-9" delay={0.1}>
          <aside aria-labelledby="fakta-proyek" className="rounded-2xl border border-primary/15 p-6">
            <h3 id="fakta-proyek" className="mb-5 text-xs uppercase tracking-[0.2em] text-primary/70">
              {spotlight.factsLabel}
            </h3>
            <dl className="space-y-5">
              {spotlight.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-sm text-primary/70">{f.label}</dt>
                  <dd className="text-3xl font-medium tracking-[-0.04em] text-primary">{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Reveal>
      </div>
    </Section>
  );
}
