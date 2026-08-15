import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav, site } from "@/data/site";

const BAR_STATES = [
  { closed: { top: 1, rotate: 0, opacity: 1, scaleX: 1 }, open: { top: 7, rotate: 45, opacity: 1, scaleX: 1 } },
  { closed: { top: 7, rotate: 0, opacity: 1, scaleX: 1 }, open: { top: 7, rotate: 0, opacity: 0, scaleX: 0.4 } },
  { closed: { top: 13, rotate: 0, opacity: 1, scaleX: 1 }, open: { top: 7, rotate: -45, opacity: 1, scaleX: 1 } },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overlay = pathname === "/";
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !overlay || scrolled || open;

  return (
    <motion.header
      initial={reduced ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 right-0 left-0 z-50 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-500 ${
        solid
          ? "border-b border-border/60 bg-background/85 text-foreground shadow-[0_10px_30px_-24px_oklch(0.16_0.02_25/0.6)] backdrop-blur-xl"
          : "bg-transparent text-primary-foreground"
      }`}
    >
      <motion.div
        animate={{ height: scrolled && !open ? 66 : 80 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="container-page flex items-center justify-between gap-4"
      >
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <motion.img
            src={site.logo}
            alt={`Logo ${site.name}`}
            className="w-auto shrink-0"
            animate={{ height: scrolled && !open ? 38 : 44 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          />
          <span className="hidden min-w-0 font-display text-base leading-tight font-semibold sm:block">
            Complexe Scolaire
            <span className={`block truncate text-xs font-normal tracking-wide ${solid ? "text-muted-foreground" : "text-primary-foreground/75"}`}>
              La Providence
            </span>
            <span className={`block truncate text-xs font-normal tracking-wide ${solid ? "text-muted-foreground" : "text-primary-foreground/75"}`}>
              de Don Orione
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-link text-sm font-medium transition-colors ${solid ? "text-muted-foreground hover:text-foreground" : "text-primary-foreground/80 hover:text-primary-foreground"}`}
              activeProps={{ className: solid ? "text-foreground is-active" : "text-primary-foreground is-active" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
            to="/contact"
            className={`btn-press rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
              solid ? "border-border hover:bg-secondary" : "border-primary-foreground/40 hover:bg-primary-foreground/10"
            }`}
          >
            Visiter l'école
          </Link>
          <Link
            to="/admissions"
            className="btn-glow btn-press rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground"
          >
            Demander une inscription
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`btn-press relative grid size-11 place-items-center rounded-full border transition-colors xl:hidden ${
            solid ? "border-border" : "border-primary-foreground/40"
          }`}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-4 w-5">
            {BAR_STATES.map((state, i) => (
              <motion.span
                key={i}
                className="absolute left-0 block h-0.5 w-full rounded-full bg-current"
                initial={false}
                animate={open ? state.open : state.closed}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </span>

        </button>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border bg-background text-foreground xl:hidden"
            aria-label="Navigation mobile"
          >
            <motion.div
              initial="hidden"
              animate="shown"
              variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
              className="container-page flex flex-col py-3"
            >
              {nav.map((item) => (
                <motion.div
                  key={item.to}
                  variants={{
                    hidden: { opacity: 0, x: reduced ? 0 : -18 },
                    shown: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/50 py-4 font-display text-lg last:border-0"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: reduced ? 0 : 12 },
                  shown: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="mt-4 flex flex-col gap-3"
              >
                <Link
                  to="/admissions"
                  onClick={() => setOpen(false)}
                  className="btn-glow btn-press rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-gold-foreground"
                >
                  Demander une inscription
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-press rounded-full border border-border px-5 py-3 text-center text-sm font-semibold"
                >
                  Visiter l'école
                </Link>
              </motion.div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
