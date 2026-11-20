import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { skills } from "@/data/content";

export function Skills() {
  return (
    <Section id="keahlian" label="Keahlian" title="Alat dan cara kerja.">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        {skills.map((g, i) => (
          <Reveal key={g.group} className="col-span-12 md:col-span-4" delay={i * 0.08}>
            <h3 className="mb-4 text-lg font-medium text-primary">{g.group}</h3>
            <ul className="space-y-2 text-base text-primary/80">
              {g.items.map((item) => (
                <li key={item} className="border-b border-primary/10 pb-2">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
