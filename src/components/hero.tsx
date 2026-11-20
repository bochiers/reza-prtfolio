import { motion } from "framer-motion";
import { WordsPullUp } from "@/components/ui/prisma-hero";
import { PillLink } from "@/components/ui/pill-button";
import { hero, person } from "@/data/content";
import { prefersSaveData, useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";
import posterUrl from "@/assets/hero-poster.jpg";

// Third-party hosted (see BRIEF section 6). Self-host a compressed copy once approved.
const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const wide = useMediaQuery("(min-width: 768px)");
  // The 16 MB video only plays on wide screens, without reduced-motion or data-saver.
  const playVideo = wide && !reduced && !prefersSaveData();

  return (
    <header id="beranda" className="w-full p-2 sm:p-3">
      <div className="relative flex min-h-[calc(100svh-1rem)] w-full flex-col justify-end overflow-hidden rounded-2xl sm:min-h-[calc(100svh-1.5rem)] md:rounded-[2rem]">
        <img
          src={posterUrl}
          alt=""
          width={1280}
          height={716}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {playVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={posterUrl}
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
          />
        )}

        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-transparent to-80% lg:hidden" />

        <div className="relative px-4 pb-2 pt-24 sm:px-6 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4 md:gap-6">
            <div className="col-span-12 lg:col-span-8">
              <p className="mb-3 text-label font-medium uppercase text-foreground">{hero.eyebrow}</p>
              <h1 className="-ml-[0.04em] font-display text-display font-medium text-foreground">
                <span className="sr-only">{person.name}</span>
                <span aria-hidden>
                  {reduced ? person.shortName : <WordsPullUp as="span" text={person.shortName} />}
                </span>
              </h1>
            </div>

            <div className="col-span-12 pb-4 lg:col-span-4 lg:pb-8">
              <motion.div
                initial={reduced ? false : { y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
                className="flex flex-col gap-5 rounded-2xl bg-black/50 p-5 backdrop-blur-sm"
              >
                <p className="text-body text-foreground sm:text-lead lg:text-body">{hero.lead}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <PillLink href={hero.primaryCta.href}>{hero.primaryCta.label}</PillLink>
                  <PillLink variant="secondary" href={hero.secondaryCta.href}>
                    {hero.secondaryCta.label}
                  </PillLink>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
