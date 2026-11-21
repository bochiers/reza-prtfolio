import { Section, SectionLabel, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ArchRings, GhostNumeral } from "@/components/ui/decor";
import { Magnetic } from "@/components/ui/magnetic";
import { ContactLink } from "@/components/ui/contact-row";
import { PillLink } from "@/components/ui/pill-button";
import { contact, person } from "@/data/content";

export function Contact() {
  return (
    <Section
      id="kontak"
      labelledBy="kontak-judul"
      tone="surface"
      decor={
        <>
          <ArchRings className="-bottom-20 right-[4%]" />
          <GhostNumeral n="06" />
        </>
      }
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <Reveal className="col-span-12 lg:col-span-6">
          <SectionLabel n="06">{contact.label}</SectionLabel>
          <SectionTitle id="kontak-judul">{contact.title}</SectionTitle>
        </Reveal>

        <Reveal className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-10" delay={0.08}>
          <ContactLink href={`mailto:${person.email}`} aria-label={`${contact.emailLabel} ${person.email}`}>
            {person.email}
          </ContactLink>
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-label font-medium uppercase text-subtle">{contact.whatsappLabel}</span>
            <Magnetic>
              <PillLink
                href={person.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${contact.whatsappLabel} ${person.phoneDisplay}${contact.whatsappHint}`}
              >
                {person.phoneDisplay}
              </PillLink>
            </Magnetic>
          </div>
          <address className="mt-8 text-caption not-italic text-subtle">{person.address}</address>
          <p className="mt-1 text-caption text-subtle">{contact.hobby}</p>
        </Reveal>
      </div>
    </Section>
  );
}
