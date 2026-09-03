import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/JTjt5MgkMjqtNFCB9";
const CANONICAL_WEBSITE = "www.cslaprovidence.org";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — La Providence de Don Orione" },
      {
        name: "description",
        content:
          "Contacter le secrétariat du Complexe Scolaire La Providence de Don Orione pour toute information ou demande d'inscription.",
      },
      { property: "og:title", content: "Contact — La Providence de Don Orione" },
      { property: "og:description", content: "Coordonnées du secrétariat de l'établissement." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: absoluteUrl("/contact") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/contact") }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Section
          eyebrow="Contact"
          as="h1"
          title="Contact — Complexe Scolaire La Providence de Don Orione, Bonoua"
          description="L'administration répond aux familles pendant les heures d'ouverture de l'établissement."
          className="pb-24"
        >
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Adresse</p>
            <p className="mt-2 text-sm">{site.contact.address}</p>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground transition-opacity hover:opacity-90"
            >
              <MapPin className="size-4" />
              Obtenir l’itinéraire
              <ExternalLink className="size-3.5" />
            </a>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Localisation</p>
                <h2 className="mt-2 font-display text-xl font-semibold">Retrouvez-nous facilement sur Google Maps</h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Ouvrez notre position officielle pour lancer la navigation depuis votre téléphone ou votre ordinateur.
                </p>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                <MapPin className="size-4 text-gold" />
                Ouvrir Google Maps
              </a>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {site.directions.map((d) => (
              <div key={d.label} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold">{d.label}</h3>
                <p className="mt-3 text-sm">
                  <a href={`tel:${d.phone.replace(/[^+\d]/g, "")}`} className="hover:underline">{d.phone}</a>
                </p>
                <p className="mt-1 text-sm break-words">
                  <a href={`mailto:${d.email}`} className="hover:underline">{d.email}</a>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">Horaires d'ouverture</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {site.hours.map((h) => (
                  <li key={h.days}>
                    {h.days} : {h.time}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">Suivez-nous</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {site.social.map((s) => (
                  <li key={s.label}>
                    {s.label} — {s.label === "Site web" ? CANONICAL_WEBSITE : s.note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
