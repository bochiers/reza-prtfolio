import { motion } from "framer-motion";
import { WordsPullUp } from "@/components/ui/words-pull-up";
import { HeroBlueprint } from "@/components/hero-blueprint";
import { PillLink } from "@/components/ui/pill-button";
import { hero, person } from "@/data/content";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const ease = [0.16, 1, 0.3, 1] as const;

function HeroGridBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(225,224,204,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(225,224,204,.07) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 60% 35%, #000 30%, transparent 100%)",
        maskImage: "radial-gradient(ellipse 85% 75% at 60% 35%, #000 30%, transparent 100%)",
      }}
    />
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <header id="beranda" className="w-full p-2 sm:p-3">
      <section
        aria-labelledby="hero-name"
        className="relative isolate flex min-h-[calc(100svh-1rem)] w-full flex-col justify-end overflow-hidden rounded-2xl bg-background sm:min-h-[calc(100svh-1.5rem)] md:rounded-[2rem]"
      >
        <HeroGridBg />
        <HeroBlueprint />
        <div className="noise-overlay pointer-events-none absolute inset-0 z-[1] opacity-[0.7] mix-blend-overlay" />

        <div className="relative z-10 px-4 pb-2 pt-24 sm:px-6 md:px-10">
          <div className="grid grid-cols-12 items-end gap-4 md:gap-6">
            <div className="col-span-12 lg:col-span-8">
              <motion.p
                initial={reduced ? false : { y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4, ease }}
                className="mb-3 text-label font-medium uppercase text-foreground"
              >
                {hero.eyebrow}
              </motion.p>
              <h1
                id="hero-name"
                className="-ml-[0.04em] font-display text-display font-medium text-foreground"
              >
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
                transition={{ duration: 0.6, delay: 0.5, ease }}
                className="flex flex-col gap-5 rounded-2xl bg-black/50 p-5 backdrop-blur-sm"
              >
                <p className="text-body text-foreground sm:text-lead lg:text-body">{hero.lead}</p>
                <motion.div
                  initial={reduced ? false : { y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7, ease }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <PillLink href={hero.primaryCta.href}>{hero.primaryCta.label}</PillLink>
                  <PillLink variant="secondary" href={hero.secondaryCta.href}>
                    {hero.secondaryCta.label}
                  </PillLink>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
