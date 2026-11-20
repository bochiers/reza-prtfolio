import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { onPointerFrame, usePointerCapable, usePointerMotion } from "@/hooks/use-pointer-motion";
import { cn } from "@/lib/utils";

interface CursorSpotlightProps {
  className?: string;
  /** Glow diameter in px. */
  size?: number;
  /**
   * "viewport": fixed, follows the cursor anywhere on the page.
   * "parent": absolute inside the parent (give it `relative overflow-hidden`), visible only while the cursor is over it.
   */
  scope?: "viewport" | "parent";
}

const OPACITY_SPRING = { stiffness: 120, damping: 24, mass: 0.4 };

/**
 * Soft radial glow that follows the cursor. Colour comes from the CSS var
 * `--spotlight-color` (set it on the element or any ancestor). Position uses transform,
 * visibility uses opacity. pointer-events-none, aria-hidden. Renders nothing on touch / reduced motion.
 */
export function CursorSpotlight({ className, size = 560, scope = "viewport" }: CursorSpotlightProps) {
  const enabled = usePointerCapable();
  if (!enabled) return null;
  return <SpotlightActive className={className} size={size} scope={scope} />;
}

function SpotlightActive({ className, size = 560, scope = "viewport" }: CursorSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pointer = usePointerMotion();
  const opacity = useSpring(0, OPACITY_SPRING);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const half = size / 2;
    const parent = scope === "parent" ? el.parentElement : null;
    return onPointerFrame(() => {
      let px = pointer.px.get();
      let py = pointer.py.get();
      let visible = pointer.presence.get();
      if (parent) {
        const r = parent.getBoundingClientRect();
        const inside = px >= r.left && px <= r.right && py >= r.top && py <= r.bottom;
        px -= r.left;
        py -= r.top;
        if (!inside) visible = 0;
      }
      x.set(px - half);
      y.set(py - half);
      opacity.set(visible);
    });
  }, [pointer, opacity, x, y, size, scope]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none left-0 top-0 z-0 rounded-full",
        scope === "viewport" ? "fixed" : "absolute",
        className,
      )}
      style={{
        width: size,
        height: size,
        x,
        y,
        opacity,
        background:
          "radial-gradient(circle closest-side, var(--spotlight-color, rgb(255 255 255 / 0.08)), transparent)",
        willChange: "transform, opacity",
      }}
    />
  );
}
