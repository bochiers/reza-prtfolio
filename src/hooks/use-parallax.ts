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
   * Fraction of the element's scroll travel that is added back as translateY.
   * Positive = drifts slower than the page (sits "behind"), negative = faster ("in front").
   * 0.2 is subtle, 0.5 is strong.
   */
  speed?: number;
  /** Hard cap on displacement in px (either direction). */
  maxPx?: number;
  /** Framer scroll offset; default maps progress 0..1 from "enters viewport" to "leaves viewport". */
  offset?: UseScrollOptions["offset"];
  /** Light spring on the output. Disable for exact scroll-locked motion. Default true. */
  smooth?: boolean;
}

const SPRING = { stiffness: 140, damping: 28, mass: 0.35, restDelta: 0.1 };

/**
 * Per-element scroll parallax. Returns a translateY MotionValue (px) to put in `style.y`.
 * Zero at the moment the element is centred in the viewport. Always 0 under reduced motion.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  { speed = 0.2, maxPx = 80, offset = ["start end", "end start"], smooth = true }: ParallaxOptions = {},
): MotionValue<number> {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  // Cached so the per-frame transform never forces a layout read.
  const height = useRef(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      height.current = entry?.contentRect.height ?? 0;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  const raw = useTransform(scrollYProgress, (p) => {
    if (reduced) return 0;
    const travel = window.innerHeight + height.current;
    const y = (p - 0.5) * travel * speed;
    return Math.max(-maxPx, Math.min(maxPx, y));
  });
  const smoothed = useSpring(raw, SPRING);

  return smooth ? smoothed : raw;
}
