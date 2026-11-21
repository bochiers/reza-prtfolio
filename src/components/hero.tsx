import { motion, useTransform } from "framer-motion";
import { useEffect, useRef, type CSSProperties } from "react";
import { WordsPullUp } from "@/components/ui/words-pull-up";
import { HeroBlueprint } from "@/components/hero-blueprint";
import { CursorSpotlight } from "@/components/ui/cursor-spotlight";
import { Magnetic } from "@/components/ui/magnetic";
import { ParallaxLayer } from "@/components/ui/parallax-layer";
import { PillLink } from "@/components/ui/pill-button";
import { hero, person } from "@/data/content";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { usePointerMotion } from "@/hooks/use-pointer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export const PORTRAIT_SIZES = "(min-width:1024px) min(30vw,600px), (min-width:768px) 40vw, 60vw";

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

interface ChipProps {
  tag: string;
  title: string;
  sub?: string;
  side: "l" | "r";
  /** Anchor dot, % of the photo box. */
  at: [number, number];
  /** Entrance delay in seconds. */
  delay: number;
  className?: string;
  role?: boolean;
}

/** Decorative label with leader line. aria-hidden: duplicates the photo alt and the Pengalaman section. */
function Chip({ tag, title, sub, side, at, delay, className = "", role }: ChipProps) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={`hero-co hero-co--${side} ${role ? "hero-co--role" : ""} ${className}`}
      style={{ left: `${at[0]}%`, top: `${at[1]}%` }}
      initial={reduced ? false : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease }}
    >
      <div className="hero-chip">
        <b>{tag}</b>
        {title}
        {sub && <small>{sub}</small>}
      </div>
    </motion.div>
  );
}

/** Cutout + frame + ground strip + chips. One group: scroll parallax on the wrapper, tilt on the card. */
function Stage({ heroRef }: { heroRef: React.RefObject<HTMLElement | null> }) {
  const reduced = usePrefersReducedMotion();
  const tiltOn = useMediaQuery("(min-width: 768px)");
  const pointer = usePointerMotion({ enabled: tiltOn });
  const live = pointer.enabled;

  // Pointer values are already smoothed (0.09 s) in the shared loop; no second spring here.
  const rotateY = useTransform(pointer.x, (v) => v * 5);
  const rotateX = useTransform(pointer.y, (v) => v * -3.5);
  const shiftX = useTransform(pointer.x, (v) => v * 8);

  return (
    <ParallaxLayer className="hero-stage" speed={-0.05} maxPx={24} zeroAt="start" track={heroRef}>
      <motion.div className="hero-card" style={live ? { rotateX, rotateY } : undefined}>
        <motion.div
          className="hero-frame"
          initial={reduced ? false : { clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
        />
        <div className="hero-cut">
          <motion.img
            src="/img/reza-cutout.webp"
            srcSet="/img/reza-cutout-600.webp 600w, /img/reza-cutout.webp 900w"
            sizes={PORTRAIT_SIZES}
            width={900}
            height={1355}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            alt={hero.portraitAlt}
            initial={reduced ? false : { y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            style={live ? { x: shiftX, scale: 1.03 } : undefined}
          />
        </div>
        <div className="hero-ground" aria-hidden />
        <div className="hero-datum" aria-hidden>
          <span>±0,00</span>
        </div>
        <i aria-hidden className="hero-bracket" style={{ left: "-10px", borderLeftWidth: "1.5px", borderBottomWidth: "1.5px" }} />
        <i aria-hidden className="hero-bracket" style={{ right: "-10px", borderRightWidth: "1.5px", borderBottomWidth: "1.5px" }} />

        <ParallaxLayer className="hero-fg" speed={0} depth={tiltOn ? 8 : 0} depthY={tiltOn ? 4 : 0}>
          <Chip {...hero.chips.helm} side="r" at={[52, 10]} delay={0.9} className="hero-co--helm" />
          <Chip {...hero.chips.vest} side="l" at={[40, 66]} delay={1.0} className="hero-co--vest" />
        </ParallaxLayer>
      </motion.div>
    </ParallaxLayer>
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const md = useMediaQuery("(min-width: 768px)");

  // Blueprint must end above the name, whatever the viewport. Publish the name's top edge (px from the
  // hero's top) as --name-top; frontend.css sizes the drawing box from it at >= 1024px.
  useEffect(() => {
    const root = heroRef.current;
    const h1 = root?.querySelector<HTMLElement>("#hero-name");
    if (!root || !h1) return;
    const fit = () => {
      const top = h1.getBoundingClientRect().top - root.getBoundingClientRect().top;
      root.style.setProperty("--name-top", `${Math.max(0, Math.round(top))}px`);
    };
    const ro = new ResizeObserver(fit);
    ro.observe(root);
    ro.observe(h1);
    fit();
    return () => ro.disconnect();
  }, []);

  return (
    <header id="beranda" className="w-full p-2 sm:p-3">
      <section
        ref={heroRef}
        aria-labelledby="hero-name"
        className="hero-root relative isolate flex min-h-[calc(100svh-1rem)] w-full flex-col justify-end overflow-clip rounded-2xl bg-background sm:min-h-[calc(100svh-1.5rem)] md:rounded-[2rem]"
        style={{ "--spotlight-color": "rgb(224 134 90 / 0.14)" } as CSSProperties}
      >
        <ParallaxLayer
          className="pointer-events-none absolute inset-0 z-0"
          speed={0.08}
          maxPx={30}
          depth={md ? -6 : 0}
          depthY={md ? -4 : 0}
          zeroAt="start"
          track={heroRef}
        >
          <HeroGridBg />
        </ParallaxLayer>
        <ParallaxLayer
          className="pointer-events-none absolute inset-0 z-[1]"
          speed={0.14}
          maxPx={48}
          depth={md ? -10 : 0}
          depthY={md ? -6 : 0}
          zeroAt="start"
          track={heroRef}
        >
          <HeroBlueprint />
        </ParallaxLayer>
        {md && <CursorSpotlight scope="parent" size={560} className="z-[2]" />}
        <Stage heroRef={heroRef} />
        <div className="noise-overlay pointer-events-none absolute inset-0 z-[6] opacity-[0.7] mix-blend-overlay" />

        <div className="hero-content relative z-10 px-4 pb-2 pt-4 sm:px-6 md:px-10 lg:pt-24">
          <motion.p
            initial={reduced ? false : { y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="mb-3 text-label font-medium uppercase text-foreground"
          >
            {hero.eyebrow}
          </motion.p>
          <h1 id="hero-name" className="-ml-[0.04em] font-display text-display font-medium text-foreground">
            <span className="sr-only">{person.name}</span>
            <span aria-hidden>{reduced ? person.shortName : <WordsPullUp as="span" text={person.shortName} />}</span>
          </h1>

          <motion.div
            initial={reduced ? false : { y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="my-4 flex max-w-[34rem] flex-col gap-5 rounded-2xl bg-black/70 p-5 backdrop-blur-sm"
          >
            <p className="text-body text-foreground sm:text-lead lg:text-body">{hero.lead}</p>
            <motion.div
              initial={reduced ? false : { y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
              className="flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <PillLink href={hero.primaryCta.href}>{hero.primaryCta.label}</PillLink>
              </Magnetic>
              <Magnetic>
                <PillLink variant="secondary" href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label}
                </PillLink>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </header>
  );
}
