import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { site } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

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
      {
        property: "og:description",
        content: "Coordonnées du secrétariat de l'établissement à Bonoua.",
      },
      { property: "og:type", content: "website" },
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
          title="Nous écrire ou nous rendre visite"
          description="L'administration répond aux familles pendant les heures d'ouverture de l'établissement."
          className="pb-24"
        >
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Adresse</p>
            <p className="mt-2 text-sm">{site.contact.address}</p>
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
                    {s.label} — {s.note}
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
