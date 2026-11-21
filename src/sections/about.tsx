import { motion } from "framer-motion";
import { useRef } from "react";
import { Section, SectionLabel, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { DimLineV, GhostNumeral, GridPatch } from "@/components/ui/decor";
import { about, person } from "@/data/content";
import { useParallax } from "@/hooks/use-parallax";
import { useMediaQuery } from "@/hooks/use-media-query";

/**
 * Half-length portrait between the title and the opening paragraph (docs/design-spec.md section 11).
 * Same asset as the hero, so no extra bytes. Only the image inside the frame drifts; frame, caption,
 * ruler and crop marks stay put. No tilt / spotlight: the hero already owns the pointer motion.
 */
function Portrait() {
  const plateRef = useRef<HTMLDivElement>(null);
  const wide = useMediaQuery("(min-width: 1024px)");
  const y = useParallax(plateRef, { speed: 0.08, maxPx: wide ? 14 : 8, smooth: false });

  return (
    <figure className="about-figure">
      <div ref={plateRef} className="about-plate">
        <div className="about-shot">
          <motion.img
            src="/img/reza-cutout.webp"
            srcSet="/img/reza-cutout-600.webp 600w, /img/reza-cutout.webp 900w"
            sizes="(min-width:1024px) 584px, (min-width:768px) 440px, 480px"
            width={900}
            height={1355}
            loading="lazy"
            decoding="async"
            alt={about.portraitAlt}
            style={{ y }}
          />
        </div>
        <i aria-hidden className="about-ruler" />
      </div>
      <figcaption className="about-caption">
        <b>{person.name}</b>
        <small>{about.portraitCaption}</small>
      </figcaption>
      <i aria-hidden className="about-crop about-crop--tl" />
      <i aria-hidden className="about-crop about-crop--tr" />
      <i aria-hidden className="about-crop about-crop--bl" />
      <i aria-hidden className="about-crop about-crop--br" />
    </figure>
  );
}

export function About() {
  const [first, ...rest] = about.paragraphs;
  return (
    <Section
      id="tentang"
      labelledBy="tentang-judul"
      decor={
        <>
          <GhostNumeral n="01" />
          <DimLineV className="left-3 top-32 xl:left-6" />
          <GridPatch className="right-0 top-[18%] h-[70%] w-[55%]" />
        </>
      }
    >
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <Reveal className="col-span-12 md:col-span-10 lg:col-span-8">
          <SectionLabel n="01">{about.label}</SectionLabel>
          <SectionTitle id="tentang-judul">{about.title}</SectionTitle>
        </Reveal>
        <Reveal className="col-span-12 self-start md:col-span-5" delay={0.08}>
          <Portrait />
        </Reveal>
        <div className="col-span-12 space-y-5 self-start md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
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
