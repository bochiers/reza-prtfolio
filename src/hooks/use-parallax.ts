import {
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";
import { useEffect, useRef, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

export interface ParallaxOptions {
  /**
   * Fraction of the scroll travel that is added back as translateY.
   * Positive = drifts slower than the page (sits "behind"), negative = faster ("in front").
   * 0.2 is subtle, 0.5 is strong.
   */
  speed?: number;
  /** Hard cap on displacement in px (either direction). */
  maxPx?: number;
  /**
   * Where displacement is zero.
   *  "center" (default): when the element is centred in the viewport.
   *  "start": at scrollY = 0 of the tracked element (use for the hero so the composition does not shift before the first scroll).
   */
  zeroAt?: "center" | "start";
  /** Element whose scroll progress drives the layer. Defaults to the layer itself. */
  track?: RefObject<HTMLElement | null>;
  /** Framer scroll offset override. */
  offset?: UseScrollOptions["offset"];
  /** Light spring on the output. Disable for exact scroll-locked motion. Default true. */
  smooth?: boolean;
}

const SPRING = { stiffness: 140, damping: 28, mass: 0.35, restDelta: 0.1 };

/**
 * Per-element scroll parallax. Returns a translateY MotionValue (px) to put in `style.y`.
 * Always 0 under reduced motion.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  { speed = 0.2, maxPx = 80, zeroAt = "center", track, offset, smooth = true }: ParallaxOptions = {},
): MotionValue<number> {
  const reduced = usePrefersReducedMotion();
  const target = track ?? ref;
  const { scrollYProgress } = useScroll({
    target,
    offset: offset ?? (zeroAt === "start" ? ["start start", "end start"] : ["start end", "end start"]),
  });

  // Cached so the per-frame transform never forces a layout read.
  const height = useRef(0);
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      height.current = entry?.contentRect.height ?? 0;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [target]);

  const raw = useTransform(scrollYProgress, (p) => {
    if (reduced) return 0;
    const y =
      zeroAt === "start"
        ? p * height.current * speed
        : (p - 0.5) * (window.innerHeight + height.current) * speed;
    return Math.max(-maxPx, Math.min(maxPx, y));
  });
  const smoothed = useSpring(raw, SPRING);

  return smooth ? smoothed : raw;
}
