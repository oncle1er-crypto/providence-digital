import { useMotionPreference } from "@/hooks/use-motion-preference";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Transition fade + slide entre les pages. */
export function PageTransition({ routeKey, children }: { routeKey: string; children: ReactNode }) {
  const reduced = useMotionPreference();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 1 } : { opacity: 0, y: -10 }}
        transition={{ duration: reduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
