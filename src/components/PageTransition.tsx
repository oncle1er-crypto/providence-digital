import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** Transition fade + slide entre les pages. */
export function PageTransition({ routeKey, children }: { routeKey: string; children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: reduced ? 0.2 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
