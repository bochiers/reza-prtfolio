import { motion, useInView, useTransform } from "framer-motion";
import { useRef, type CSSProperties, type ReactNode, type RefObject } from "react";
import { useParallax } from "@/hooks/use-parallax";
import { usePointerMotion } from "@/hooks/use-pointer-motion";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";

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
  /** See useParallax: "start" = zero at scrollY 0 of `track`. */
  zeroAt?: "center" | "start";
  /** Element whose scroll progress drives this layer (default: the layer). */
  track?: RefObject<HTMLElement | null>;
  /** Render only from 1024px up. Below that the layer is not mounted at all. */
  desktopOnly?: boolean;
}

/**
 * Wrapper that moves with scroll (speed) and with the cursor (depth). transform only.
 * Reduced motion / touch: scroll part is off for reduced motion, mouse part is off for non-fine pointers.
 */
export function ParallaxLayer(props: ParallaxLayerProps) {
  const reduced = usePrefersReducedMotion();
  const wide = useMediaQuery("(min-width: 1024px)");
  if (props.desktopOnly && !wide) return null;
  if (reduced) {
    return (
      <div className={props.className} style={props.style}>
        {props.children}
      </div>
    );
  }
  // Below 1024px the displacement cap is halved (spec 10.3).
  return <ActiveLayer {...props} maxPx={(props.maxPx ?? 80) * (wide ? 1 : 0.5)} />;
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
  zeroAt,
  track,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollY = useParallax(ref, { speed, maxPx, smooth, zeroAt, track });
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
