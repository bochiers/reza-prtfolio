import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Capped so a stagger never exceeds 3 steps of 80 ms. */
  delay?: number;
}

/**
 * Scroll reveal: once, transform + opacity only, 16px, 600ms.
 * Reduced motion: no wrapper animation at all, content is visible immediately.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ y: 16, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay: Math.min(delay, 0.24), ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
