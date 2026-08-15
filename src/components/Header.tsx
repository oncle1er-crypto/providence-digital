import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/notre-ecole", label: "Notre école" },
  { to: "/vie-scolaire", label: "Vie scolaire" },
  { to: "/admissions", label: "Admissions" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="container-page flex h-18 items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={site.logo} alt={`Logo ${site.name}`} className="h-11 w-auto" />
          <span className="hidden font-display text-base leading-tight font-semibold sm:block">
            La Providence
            <span className="block text-xs font-normal tracking-wide text-muted-foreground">
              de Don Orione
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/admissions"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            S'inscrire
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-border p-2 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="container-page flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/50 py-3 text-sm font-medium last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
