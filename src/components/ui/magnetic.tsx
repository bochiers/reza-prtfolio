import { motion, useSpring } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { onPointerFrame, usePointerCapable, usePointerMotion } from "@/hooks/use-pointer-motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Pull range in px, measured from the element centre. */
  radius?: number;
  /** 0..1 share of the cursor offset the element follows (at the centre). */
  strength?: number;
}

const SPRING = { stiffness: 260, damping: 20, mass: 0.4 };

/**
 * Magnetic wrapper for a CTA. The wrapper moves, the child stays untouched, so
 * PillLink/PillButton keep their own hover styles. Inert on touch and under reduced motion.
 */
export function Magnetic({ children, className = "inline-flex", radius = 120, strength = 0.35 }: MagneticProps) {
  const enabled = usePointerCapable();
  if (!enabled) return <span className={className}>{children}</span>;
  return (
    <MagneticActive className={className} radius={radius} strength={strength}>
      {children}
    </MagneticActive>
  );
}

function MagneticActive({ children, className, radius = 120, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const pointer = usePointerMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return onPointerFrame(() => {
      const presence = pointer.presence.get();
      if (presence < 0.01) {
        x.set(0);
        y.set(0);
        return;
      }
      const rect = el.getBoundingClientRect();
      // Subtract our own offset so the pull is measured from the resting centre.
      const cx = rect.left + rect.width / 2 - x.get();
      const cy = rect.top + rect.height / 2 - y.get();
      const dx = pointer.px.get() - cx;
      const dy = pointer.py.get() - cy;
      const dist = Math.hypot(dx, dy);
      if (dist >= radius) {
        x.set(0);
        y.set(0);
        return;
      }
      // Quadratic falloff: no jump at the edge of the radius.
      const pull = strength * (1 - (dist / radius) ** 2) * presence;
      x.set(dx * pull);
      y.set(dy * pull);
    });
  }, [pointer, x, y, radius, strength]);

  return (
    <motion.span ref={ref} className={className} style={{ x, y }}>
      {children}
    </motion.span>
  );
}
