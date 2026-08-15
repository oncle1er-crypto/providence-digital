import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { schoolLife, site } from "@/data/site";

export const Route = createFileRoute("/vie-scolaire")({
  head: () => ({
    meta: [
      { title: "Vie scolaire — La Providence de Don Orione" },
      {
        name: "description",
        content:
          "Encadrement, activités, sport et formation humaine : la vie quotidienne des élèves à La Providence de Don Orione.",
      },
      { property: "og:title", content: "Vie scolaire — La Providence de Don Orione" },
      {
        property: "og:description",
        content: "Encadrement, activités et formation humaine au quotidien.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/vie-scolaire" },
    ],
    links: [{ rel: "canonical", href: "/vie-scolaire" }],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <Header />
      <main>
        <Section
          eyebrow="Vie scolaire"
          title="Le quotidien des élèves"
          description="Une organisation claire et un encadrement attentif, pour apprendre dans de bonnes conditions."
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {schoolLife.map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section eyebrow="En images" title="Notre établissement en vidéo">
          <video
            className="aspect-video w-full rounded-xl border border-border object-cover"
            src={site.heroVideo}
            controls
            playsInline
            preload="metadata"
          />
        </Section>
      </main>
      <Footer />
    </>
  );
}
