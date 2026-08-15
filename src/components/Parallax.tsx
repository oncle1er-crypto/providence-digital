import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Effet parallax léger et GPU-friendly (transform uniquement).
 * `distance` = amplitude du déplacement vertical en pixels.
 */
export function Parallax({
  children,
  className,
  distance = 60,
  zoom = false,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  zoom?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], [-distance / 2, distance / 2]);
  const scale = useTransform(smooth, [0, 0.5, 1], zoom ? [1.04, 1.0, 1.04] : [1, 1, 1]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        style={reduced ? {} : { y, scale }}
        className="size-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
