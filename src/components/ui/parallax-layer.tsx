import { motion, useInView, useTransform } from "framer-motion";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { useParallax } from "@/hooks/use-parallax";
import { usePointerMotion } from "@/hooks/use-pointer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

interface ParallaxLayerProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Scroll parallax factor, see useParallax. 0 disables the scroll axis. */
  speed?: number;
  /** Cap for the scroll displacement in px. */
  maxPx?: number;
  /** Mouse depth in px: how far the layer shifts at the viewport edge. Negative = opposite direction. 0 disables. */
  depth?: number;
  /** Vertical mouse depth; defaults to `depth`. */
  depthY?: number;
  smooth?: boolean;
}

/**
 * Wrapper that moves with scroll (speed) and with the cursor (depth). transform only.
 * Reduced motion / touch: scroll part is off for reduced motion, mouse part is off for non-fine pointers.
 */
export function ParallaxLayer(props: ParallaxLayerProps) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return (
      <div className={props.className} style={props.style}>
        {props.children}
      </div>
    );
  }
  return <ActiveLayer {...props} />;
}

function ActiveLayer({
  children,
  className,
  style,
  speed = 0.2,
  maxPx = 80,
  depth = 0,
  depthY = depth,
  smooth,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollY = useParallax(ref, { speed, maxPx, smooth });
  const pointer = usePointerMotion({ enabled: depth !== 0 || depthY !== 0 });
  const mouseX = useTransform(pointer.x, (v) => v * depth);
  const mouseY = useTransform(pointer.y, (v) => v * depthY);
  const y = useTransform([scrollY, mouseY], ([s, m]: number[]) => s + m);
  // will-change only while the layer is near the viewport.
  const near = useInView(ref, { margin: "20% 0px 20% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, x: mouseX, y, willChange: near ? "transform" : undefined }}
    >
      {children}
    </motion.div>
  );
}
