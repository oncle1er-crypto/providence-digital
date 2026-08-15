import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";

const columns = [
  {
    title: "Notre école",
    links: [
      { to: "/notre-ecole", label: "Présentation" },
      { to: "/notre-ecole", label: "Projet éducatif" },
      { to: "/actualites", label: "Actualités" },
    ],
  },
  {
    title: "Formations",
    links: [
      { to: "/formations", label: "Maternelle" },
      { to: "/formations", label: "Primaire" },
      { to: "/formations", label: "Collège" },
    ],
  },
  {
    title: "Vie scolaire",
    links: [
      { to: "/vie-scolaire", label: "Au quotidien" },
      { to: "/vie-scolaire", label: "Sports & arts" },
      { to: "/vie-scolaire", label: "Vie spirituelle" },
    ],
  },
  {
    title: "Informations",
    links: [
      { to: "/admissions", label: "Admissions" },
      { to: "/contact", label: "Contact" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <img src={site.logo} alt={`Logo ${site.name}`} className="h-14 w-auto shrink-0" />
            <span className="font-display text-lg leading-tight font-semibold">
              La Providence
              <span className="block text-xs font-normal text-primary-foreground/70">de Don Orione</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/75">{site.name} — {site.city}</p>
          <ul className="mt-5 space-y-1.5 text-sm text-primary-foreground/75">
            <li>{site.contact.address}</li>
            <li>{site.contact.phone}</li>
            <li>{site.contact.email}</li>
          </ul>
          <ul className="mt-5 flex flex-wrap gap-2">
            {site.social.map((s) => (
              <li key={s.label}>
                <span
                  title={s.note}
                  className="inline-block rounded-full border border-primary-foreground/25 px-4 py-2 text-xs text-primary-foreground/75"
                >
                  {s.label} — {s.note}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="min-w-0">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">{col.title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
              {col.links.map((l) => (
                <li key={`${col.title}-${l.label}`}>
                  <Link to={l.to} className="transition-colors hover:text-primary-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/15 py-6 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} {site.name}. Tous droits réservés.
      </div>
    </footer>
  );
}
