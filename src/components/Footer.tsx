import { Link } from "@tanstack/react-router";
import { Facebook, Globe, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { SITE_URL } from "@/lib/seo";

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
      { to: "/formations", label: "Collège & Lycée" },
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

const socialIcons = {
  Facebook,
  Instagram,
  "Site web": Globe,
} as const;

const publicWebsite = SITE_URL.replace(/^https?:\/\//, "");

export function Footer() {
  return (
    <footer className="relative bg-primary text-primary-foreground">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="absolute inset-0 bg-ink/25" aria-hidden />

      <div className="relative container-page py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Marque */}
          <div className="min-w-0 lg:col-span-4">
            <div className="flex items-center gap-3">
              <img src={site.logo} alt={`Logo ${site.name}`} className="h-12 w-auto shrink-0" />
              <span className="font-display text-lg leading-tight font-semibold">
                La Providence
                <span className="block text-xs font-normal tracking-wide text-primary-foreground/65">
                  de Don Orione
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              {site.name} — {site.motto}.
            </p>
            <ul className="mt-6 flex gap-2">
              {site.social.map((s) => {
                const Icon = socialIcons[s.label as keyof typeof socialIcons] ?? Globe;
                const isWebsite = s.label === "Site web";
                const href = isWebsite ? SITE_URL : s.href;
                const note = isWebsite ? publicWebsite : s.note;
                return (
                  <li key={s.label}>
                    <a
                      href={href}
                      title={`${s.label} — ${note}`}
                      aria-label={`${s.label} — ${note}`}
                      className="grid size-11 place-items-center rounded-full border border-primary-foreground/20 text-primary-foreground/80 transition-colors hover:border-gold hover:text-gold focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Colonnes de navigation */}
          <nav
            aria-label="Pied de page"
            className="grid min-w-0 grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-5"
          >
            {columns.map((col) => (
              <div key={col.title} className="min-w-0">
                <h3 className="text-[0.7rem] font-semibold tracking-[0.18em] text-gold uppercase">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/75">
                  {col.links.map((l) => (
                    <li key={`${col.title}-${l.label}`}>
                      <Link
                        to={l.to}
                        className="transition-colors hover:text-gold focus-visible:text-gold focus-visible:outline-none"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Contact */}
          <div className="min-w-0 lg:col-span-3">
            <h3 className="text-[0.7rem] font-semibold tracking-[0.18em] text-gold uppercase">
              Nous trouver
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-primary-foreground/75">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span>{site.contact.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <a
                  href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}
                  className="transition-colors hover:text-gold"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                <a
                  href={`mailto:${site.contact.email}`}
                  className="break-all transition-colors hover:text-gold"
                >
                  {site.contact.email}
                </a>
              </li>
            </ul>
            <Link
              to="/admissions"
              className="mt-6 inline-flex rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground transition-opacity hover:opacity-90"
            >
              Demander une inscription
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-primary-foreground/12">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>
            {site.city} · {publicWebsite}
          </p>
        </div>
      </div>
    </footer>
  );
}
