import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overlay = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !overlay || scrolled || open;

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-border/60 bg-background/85 text-foreground backdrop-blur-xl"
          : "bg-transparent text-primary-foreground"
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <img src={site.logo} alt={`Logo ${site.name}`} className="h-11 w-auto shrink-0" />
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
              className={`text-sm font-medium transition-colors ${solid ? "text-muted-foreground hover:text-foreground" : "text-primary-foreground/80 hover:text-primary-foreground"}`}
              activeProps={{ className: solid ? "text-foreground" : "text-primary-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
            to="/contact"
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
              solid ? "border-border hover:bg-secondary" : "border-primary-foreground/40 hover:bg-primary-foreground/10"
            }`}
          >
            Visiter l'école
          </Link>
          <Link
            to="/admissions"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground transition-transform hover:-translate-y-0.5"
          >
            Demander une inscription
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`grid size-11 place-items-center rounded-full border transition-colors xl:hidden ${
            solid ? "border-border" : "border-primary-foreground/40"
          }`}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-background text-foreground xl:hidden"
          aria-label="Navigation mobile"
        >
          <div className="container-page flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/50 py-4 font-display text-lg last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/admissions"
                onClick={() => setOpen(false)}
                className="rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-gold-foreground"
              >
                Demander une inscription
              </Link>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="rounded-full border border-border px-5 py-3 text-center text-sm font-semibold"
              >
                Visiter l'école
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
