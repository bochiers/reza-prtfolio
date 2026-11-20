import { Section, SectionLabel, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { about, person } from "@/data/content";

export function About() {
  const [first, ...rest] = about.paragraphs;
  return (
    <Section id="tentang" labelledBy="tentang-judul">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <Reveal className="col-span-12 lg:col-span-5">
          <SectionLabel n="01">{about.label}</SectionLabel>
          <SectionTitle id="tentang-judul">{about.title}</SectionTitle>
          <img
            src="/img/rezha-cv-original-199x270.jpg"
            alt={person.photoAlt}
            width={199}
            height={270}
            loading="lazy"
            className="mt-8 h-28 w-28 rounded-full border border-line-strong object-cover object-top"
          />
        </Reveal>
        <div className="col-span-12 space-y-5 lg:col-span-6 lg:col-start-7 lg:pt-10">
          <Reveal delay={0.08}>
            <p className="max-w-copy text-lead text-foreground">{first}</p>
          </Reveal>
          {rest.map((p, i) => (
            <Reveal key={i} delay={0.16 + i * 0.08}>
              <p className="max-w-copy text-body text-muted">{p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
