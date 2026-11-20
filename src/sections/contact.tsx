import { Section, SectionLabel, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ContactLink } from "@/components/ui/contact-row";
import { PillLink } from "@/components/ui/pill-button";
import { contact, person } from "@/data/content";

export function Contact() {
  return (
    <Section id="kontak" labelledBy="kontak-judul" tone="surface">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <Reveal className="col-span-12 lg:col-span-6">
          <SectionLabel n="06">{contact.label}</SectionLabel>
          <SectionTitle id="kontak-judul">{contact.title}</SectionTitle>
        </Reveal>

        <Reveal className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-10" delay={0.08}>
          <ContactLink href={`mailto:${person.email}`} aria-label={`Email ${person.email}`}>
            {person.email}
          </ContactLink>
          <div className="mt-6 flex flex-col gap-2">
            <span className="text-label font-medium uppercase text-subtle">{contact.whatsappLabel}</span>
            <PillLink
              href={person.waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${person.phoneDisplay}${contact.whatsappHint}`}
            >
              {person.phoneDisplay}
            </PillLink>
          </div>
          <address className="mt-8 text-caption not-italic text-subtle">{person.address}</address>
          <p className="mt-1 text-caption text-subtle">{contact.hobby}</p>
        </Reveal>
      </div>
    </Section>
  );
}
