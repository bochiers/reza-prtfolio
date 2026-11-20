import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { about } from "@/data/content";

export function About() {
  return (
    <Section id="tentang" label="Tentang" title={about.title}>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 space-y-5 text-base leading-relaxed text-primary/80 md:col-span-8 md:text-lg lg:col-span-7 lg:col-start-6">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
