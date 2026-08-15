import { Link } from "@tanstack/react-router";

export function AdmissionsCTA() {
  return (
    <section className="container-page py-8">
      <div className="grid gap-6 rounded-3xl bg-primary p-8 text-primary-foreground shadow-xl sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">Admissions ouvertes</p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-balance sm:text-3xl">
            Année scolaire 2026–2027
          </h2>
          <p className="mt-3 max-w-xl text-sm text-primary-foreground/85">
            Les demandes de préinscription sont ouvertes pour la maternelle, le primaire et le collège.
            La préinscription en ligne est présentée ici à titre de démonstration : la validation se fait
            auprès du secrétariat.
          </p>
        </div>
        <Link
          to="/admissions"
          className="inline-flex w-fit rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none"
        >
          Commencer une préinscription
        </Link>
      </div>
    </section>
  );
}
