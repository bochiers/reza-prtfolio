import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { PillButton, PillLink } from "@/components/ui/pill-button";
import { contact, person } from "@/data/content";

function openWhatsApp() {
  // Number is assembled at click time so it is not printed in the HTML source.
  const number = person.waParts.join("");
  const text = encodeURIComponent("Halo Rezha, saya melihat portofolio Anda.");
  window.open(`https://wa.me/${number}?text=${text}`, "_blank", "noopener,noreferrer");
}

export function Contact() {
  return (
    <Section id="kontak" label="Kontak" title={contact.title}>
      <Reveal className="space-y-8">
        <div className="flex flex-wrap items-center gap-3">
          <PillLink href={`mailto:${person.email}`}>Kirim email</PillLink>
          <PillButton variant="secondary" onClick={openWhatsApp}>
            WhatsApp
          </PillButton>
        </div>
        <address className="space-y-1 text-base not-italic text-primary/80">
          <p>
            <a href={`mailto:${person.email}`} className="underline underline-offset-4 hover:text-primary">
              {person.email}
            </a>
          </p>
          <p>{person.address}</p>
        </address>
        <p className="text-sm text-primary/70">{contact.note}</p>
      </Reveal>
    </Section>
  );
}
