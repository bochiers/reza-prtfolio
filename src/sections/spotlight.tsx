import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Section, SectionLabel, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { GhostNumeral, PileColumns } from "@/components/ui/decor";
import { useParallax } from "@/hooks/use-parallax";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { MediaPlaceholder } from "@/components/ui/media-placeholder";
import { spotlight } from "@/data/content";

const UNSPLASH_SRC = "/img/construction-1920.webp";
const UNSPLASH_SRCSET = "/img/construction-960.webp 960w, /img/construction-1920.webp 1920w";

function SpotlightPhoto() {
  const [failed, setFailed] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const wide = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  // Photo drifts inside its frame (118% tall so no gap shows). No spring: scroll-locked, no wobble in the frame.
  const y = useParallax(frameRef, { speed: 0.12, maxPx: wide ? 36 : 18, smooth: false });
  if (failed) return <MediaPlaceholder tone="paper" />;
  return (
    <figure>
      <div ref={frameRef} className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-ink-line-strong/40">
        <motion.img
          src={UNSPLASH_SRC}
          srcSet={UNSPLASH_SRCSET}
          sizes="(min-width: 1024px) 520px, 100vw"
          width={1920}
          height={1280}
          decoding="async"
          alt={spotlight.photoAlt}
          loading="lazy"
          onError={() => setFailed(true)}
          style={reduced ? undefined : { y, scale: 1.08 }}
          className="absolute inset-x-0 top-[-9%] block h-[118%] w-full object-cover"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/30 mix-blend-multiply" />
      </div>
      <figcaption className="mt-2 text-caption text-ink-subtle">{spotlight.photoCredit}</figcaption>
    </figure>
  );
}

/** The only light section (paper). Accent text here must be accent-ink, never accent. */
export function Spotlight() {
  return (
    <Section
      id="sorotan"
      labelledBy="sorotan-judul"
      tone="paper"
      decor={
        <>
          <GhostNumeral n="03" paper />
          <PileColumns count={5} paper speed={0.15} maxPx={60} className="bottom-40 right-[3%]" />
        </>
      }
    >
      <Reveal>
        <SectionLabel n="03" tone="paper">
          {spotlight.label}
        </SectionLabel>
        <SectionTitle id="sorotan-judul" tone="paper">
          {spotlight.title}
        </SectionTitle>
      </Reveal>

      <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-14 lg:items-start">
        <Reveal className="col-span-12 lg:col-span-7">
          <p className="max-w-copy text-lead text-ink-muted">{spotlight.body}</p>
        </Reveal>
        <Reveal className="col-span-12 lg:col-span-5" delay={0.08}>
          <SpotlightPhoto />
        </Reveal>
      </div>

      <Reveal className="mt-14 md:mt-20">
        <aside aria-labelledby="fakta-pelabuhan">
          <h3 id="fakta-pelabuhan" className="font-sans text-label font-medium uppercase text-ink-subtle">
            {spotlight.factsLabel}
          </h3>
          <dl className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {spotlight.facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse rounded-2xl bg-paper-2 p-5 md:p-8">
                <dt className="mt-1 text-caption text-ink-muted">{f.label}</dt>
                <dd className="font-display text-h3 tabular-nums text-accent-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-caption text-ink-subtle">{spotlight.source}</p>
        </aside>
      </Reveal>
    </Section>
  );
}
