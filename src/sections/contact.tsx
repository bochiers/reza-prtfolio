import { Section, SectionLabel, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ContactButton, ContactLink } from "@/components/ui/contact-row";
import { contact, person } from "@/data/content";

function openWhatsApp() {
  // The number is assembled at click time so it never appears in the HTML source.
  const number = person.waParts.join("");
  const text = encodeURIComponent(person.waMessage);
  window.open(`https://wa.me/${number}?text=${text}`, "_blank", "noopener,noreferrer");
}

export function Contact() {
  return (
    <Section id="kontak" labelledBy="kontak-judul" tone="surface">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <Reveal className="col-span-12 lg:col-span-6">
          <SectionLabel n="06">{contact.label}</SectionLabel>
          <SectionTitle id="kontak-judul">{contact.title}</SectionTitle>
        </Reveal>

        <Reveal className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-10" delay={0.08}>
          <ContactLink href={`mailto:${person.email}`}>{person.email}</ContactLink>
          <ContactButton onClick={openWhatsApp}>
            {contact.whatsappLabel}
            <span className="sr-only">{contact.whatsappHint}</span>
          </ContactButton>
          <address className="mt-8 text-caption not-italic text-subtle">{person.address}</address>
          <p className="mt-1 text-caption text-subtle">{contact.hobby}</p>
        </Reveal>
      </div>
    </Section>
  );
}
