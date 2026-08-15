import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import type { AdmissionsSetting } from "@/lib/cms";

const fallback: Required<AdmissionsSetting> = {
  eyebrow: "Admissions ouvertes",
  title: "Année scolaire 2026–2027",
  message:
    "Les demandes de préinscription sont ouvertes pour la maternelle, le primaire, le collège et le lycée. La préinscription en ligne est présentée ici à titre de démonstration : la validation se fait auprès du secrétariat.",
  cta_label: "Commencer une préinscription",
  cta_url: "/admissions",
};

export function AdmissionsCTA({ content }: { content?: AdmissionsSetting }) {
  const data = { ...fallback, ...content };
  const buttonClass =
    "inline-flex w-fit rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none";

  return (
    <section className="container-page py-8">
      <Reveal
        variant="zoom"
        className="grid gap-6 rounded-3xl bg-primary p-8 text-primary-foreground shadow-xl sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
      >
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">{data.eyebrow}</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-balance sm:text-3xl">
            {data.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm text-primary-foreground/85">{data.message}</p>
        </div>
        {data.cta_url.startsWith("/") ? (
          <Link to={data.cta_url} className={buttonClass}>
            {data.cta_label}
          </Link>
        ) : (
          <a href={data.cta_url} className={buttonClass}>
            {data.cta_label}
          </a>
        )}
      </Reveal>
    </section>
  );
}
