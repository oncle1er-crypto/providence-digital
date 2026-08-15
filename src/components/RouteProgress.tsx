import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/** Fine barre dorée animée pendant les changements de page, après hydratation. */
export function RouteProgress() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" || s.isLoading });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="route-progress"
          className="fixed top-0 left-0 z-[60] h-0.5 bg-gold shadow-[0_0_12px_2px_oklch(0.78_0.13_82/0.6)]"
          initial={{ width: "0%", opacity: 1 }}
          animate={{ width: ["0%", "65%", "88%"] }}
          exit={{ width: "100%", opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}
