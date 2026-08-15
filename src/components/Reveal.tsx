import type { ElementType, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "left" | "right" | "zoom" | "fade";

const offsets: Record<RevealVariant, { x?: number; y?: number; scale?: number }> = {
  up: { y: 28 },
  left: { x: -36 },
  right: { x: 36 },
  zoom: { scale: 0.94 },
  fade: {},
};

export function Reveal({
  children,
  as = "div",
  variant = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion.create(as as ElementType);

  const variants: Variants = reduced
    ? { hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, x: 0, y: 0, scale: 1, ...offsets[variant] },
        shown: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.75,
            delay: delay / 1000,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      };

  return (
    <MotionTag
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -8% 0px" }}
      variants={variants}
      className={cn(className)}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </MotionTag>
  );
}

/** Conteneur qui orchestre l'apparition en cascade de ses enfants <RevealItem>. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: ElementType;
}) {
  const MotionTag = motion.create(as as ElementType);
  return (
    <MotionTag
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  variant = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  as?: ElementType;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion.create(as as ElementType);
  const variants: Variants = reduced
    ? { hidden: { opacity: 0 }, shown: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, ...offsets[variant] },
        shown: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <MotionTag variants={variants} className={cn(className)}>
      {children}
    </MotionTag>
  );
}
