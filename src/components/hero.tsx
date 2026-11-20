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
    <header className="min-h-svh w-full p-2 sm:p-3">
      <div className="relative h-[calc(100svh-1rem)] min-h-[34rem] w-full overflow-hidden rounded-2xl sm:h-[calc(100svh-1.5rem)] md:rounded-[2rem]">
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/75" />

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-2 sm:px-6 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 lg:col-span-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-primary sm:text-sm">{hero.eyebrow}</p>
              <h1 className="font-medium leading-[0.85] tracking-[-0.07em] text-primary text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]">
                <span className="sr-only">{person.name}</span>
                <span aria-hidden>
                  {reduced ? person.shortName : <WordsPullUp as="span" text={person.shortName} />}
                </span>
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-6 lg:col-span-4 lg:pb-10">
              <motion.p
                initial={reduced ? false : { y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
                className="text-sm text-primary/80 sm:text-base"
                style={{ lineHeight: 1.25 }}
              >
                {hero.lead}
              </motion.p>
              <motion.div
                initial={reduced ? false : { y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease }}
                className="flex flex-wrap items-center gap-3"
              >
                <PillLink href={hero.primaryCta.href}>{hero.primaryCta.label}</PillLink>
                <PillLink variant="secondary" href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label}
                </PillLink>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
