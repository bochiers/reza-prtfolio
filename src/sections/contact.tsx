import { Section, SectionLabel, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ContactLink } from "@/components/ui/contact-row";
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
          <ContactLink href={`mailto:${person.email}`}>
            <span className="mb-1 block text-label font-medium uppercase text-subtle">{contact.emailLabel}</span>
            {person.email}
          </ContactLink>
          <ContactLink href={person.waUrl} target="_blank" rel="noopener noreferrer">
            <span className="mb-1 block text-label font-medium uppercase text-subtle">{contact.whatsappLabel}</span>
            {person.phoneDisplay}
            <span className="sr-only">{contact.whatsappHint}</span>
          </ContactLink>
          <address className="mt-8 text-caption not-italic text-subtle">{person.address}</address>
          <p className="mt-1 text-caption text-subtle">{contact.hobby}</p>
        </Reveal>
      </div>
    </Section>
  );
}
