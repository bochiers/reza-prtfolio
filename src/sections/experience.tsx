import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/data/content";

export function Experience() {
  return (
    <Section id="pengalaman" label="Pengalaman" title="Dari meja gambar ke lapangan.">
      <ol className="border-t border-primary/15">
        {experience.map((item) => (
          <li key={item.year}>
            <Reveal className="grid grid-cols-12 gap-x-6 gap-y-3 border-b border-primary/15 py-8 md:py-10">
              <p className="col-span-12 text-3xl font-medium tracking-[-0.04em] text-primary md:col-span-2 md:text-4xl">
                {item.year}
              </p>
              <div className="col-span-12 md:col-span-4">
                <h3 className="text-lg font-medium text-primary md:text-xl">{item.role}</h3>
                <p className="text-sm text-primary/70 md:text-base">{item.org}</p>
                {item.place && <p className="text-sm text-primary/70 md:text-base">{item.place}</p>}
              </div>
              <p className="col-span-12 text-base leading-relaxed text-primary/80 md:col-span-6">{item.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
