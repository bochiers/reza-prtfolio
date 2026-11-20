import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { organization } from "@/data/content";

export function Organization() {
  return (
    <Section id="organisasi" label="Organisasi" title="Di luar kelas.">
      <Reveal className="grid grid-cols-12 gap-x-6 gap-y-3">
        <p className="col-span-12 text-3xl font-medium tracking-[-0.04em] text-primary md:col-span-2 md:text-4xl">
          {organization.period}
        </p>
        <div className="col-span-12 md:col-span-10">
          <h3 className="text-lg font-medium text-primary md:text-xl">{organization.role}</h3>
          <p className="text-sm text-primary/70 md:text-base">{organization.org}</p>
          <p className="mt-3 max-w-2xl text-base text-primary/80">{organization.body}</p>
        </div>
      </Reveal>
    </Section>
  );
}
