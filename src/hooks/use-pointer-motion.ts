import { motionValue, type MotionValue } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Shared, smoothed pointer state. One set of listeners and one rAF loop serve every
 * consumer, and values live in MotionValues so a mouse move never triggers a React render.
 *
 *  x, y      cursor in viewport, normalised to -1..1 (0 = centre). Eases back to 0 when the cursor leaves.
 *  px, py    cursor in viewport pixels (clientX / clientY), smoothed.
 *  presence  0..1, eases to 1 while the cursor is inside the window.
 *  enabled   false on touch / coarse pointers and under reduced motion (values stay at 0).
 */
export interface PointerMotion {
  x: MotionValue<number>;
  y: MotionValue<number>;
  px: MotionValue<number>;
  py: MotionValue<number>;
  presence: MotionValue<number>;
  enabled: boolean;
}

const FINE_POINTER = "(hover: hover) and (pointer: fine)";
/** Smoothing time constant in seconds. Frame-rate independent. */
const TAU = 0.09;

const values = {
  x: motionValue(0),
  y: motionValue(0),
  px: motionValue(0),
  py: motionValue(0),
  presence: motionValue(0),
};
type Key = keyof typeof values;
const KEYS = Object.keys(values) as Key[];
const target: Record<Key, number> = { x: 0, y: 0, px: 0, py: 0, presence: 0 };
const EPSILON: Record<Key, number> = { x: 0.0005, y: 0.0005, px: 0.05, py: 0.05, presence: 0.002 };

const frameListeners = new Set<() => void>();
let subscribers = 0;
let raf = 0;
let last = 0;

function tick(now: number) {
  const dt = Math.min(now - last, 64) / 1000;
  last = now;
  const k = 1 - Math.exp(-dt / TAU);
  let moving = false;
  for (const key of KEYS) {
    const mv = values[key];
    const cur = mv.get();
    const diff = target[key] - cur;
    if (Math.abs(diff) > EPSILON[key]) {
      mv.set(cur + diff * k);
      moving = true;
    } else if (diff !== 0) {
      mv.set(target[key]);
    }
  }
  frameListeners.forEach((cb) => cb());
  raf = moving ? requestAnimationFrame(tick) : 0;
}

function schedule() {
  if (raf) return;
  last = performance.now();
  raf = requestAnimationFrame(tick);
}

const clamp1 = (n: number) => Math.max(-1, Math.min(1, n));

function onMove(e: PointerEvent) {
  if (e.pointerType === "touch") return;
  if (target.presence === 0) {
    // First move after entering: jump instead of sweeping in from the previous position.
    values.px.set(e.clientX);
    values.py.set(e.clientY);
  }
  target.px = e.clientX;
  target.py = e.clientY;
  target.x = clamp1((e.clientX / window.innerWidth) * 2 - 1);
  target.y = clamp1((e.clientY / window.innerHeight) * 2 - 1);
  target.presence = 1;
  schedule();
}

function onLeave() {
  target.x = 0;
  target.y = 0;
  target.presence = 0;
  schedule();
}

function attach() {
  const root = document.documentElement;
  window.addEventListener("pointermove", onMove, { passive: true });
  root.addEventListener("pointerleave", onLeave);
  window.addEventListener("blur", onLeave);
}

function detach() {
  const root = document.documentElement;
  window.removeEventListener("pointermove", onMove);
  root.removeEventListener("pointerleave", onLeave);
  window.removeEventListener("blur", onLeave);
  cancelAnimationFrame(raf);
  raf = 0;
  for (const key of KEYS) {
    target[key] = 0;
    values[key].set(0);
  }
}

/** Ref-counted subscription to the shared pointer loop. Call from effects only. */
export function subscribePointer(): () => void {
  if (subscribers++ === 0) attach();
  return () => {
    if (--subscribers === 0) detach();
  };
}

/** Run `cb` once per smoothed pointer frame (after values update). Returns an unsubscribe fn. */
export function onPointerFrame(cb: () => void): () => void {
  frameListeners.add(cb);
  return () => {
    frameListeners.delete(cb);
  };
}

/** True when pointer effects are allowed: fine hover-capable pointer and no reduced motion. No side effects. */
export function usePointerCapable(): boolean {
  const reduced = usePrefersReducedMotion();
  const finePointer = useMediaQuery(FINE_POINTER);
  return finePointer && !reduced;
}

export function usePointerMotion({ enabled: wanted = true }: { enabled?: boolean } = {}): PointerMotion {
  const enabled = usePointerCapable() && wanted;

  useEffect(() => (enabled ? subscribePointer() : undefined), [enabled]);

  return useMemo(() => ({ ...values, enabled }), [enabled]);
}
