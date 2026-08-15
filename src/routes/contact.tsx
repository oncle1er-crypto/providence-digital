import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { site } from "@/data/site";

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
        content: "Coordonnées du secrétariat de l'établissement.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
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
          description="Le secrétariat répond aux familles pendant les heures d'ouverture de l'établissement."
        >
          <dl className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6">
              <dt className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Adresse</dt>
              <dd className="mt-2 text-sm">{site.contact.address}</dd>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <dt className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Téléphone</dt>
              <dd className="mt-2 text-sm">{site.contact.phone}</dd>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <dt className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Email</dt>
              <dd className="mt-2 text-sm">{site.contact.email}</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-muted-foreground">
            Ces coordonnées doivent être complétées avec les informations officielles de
            l'établissement.
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
