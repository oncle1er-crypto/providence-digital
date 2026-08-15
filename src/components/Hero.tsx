import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <video
        className="absolute inset-0 -z-10 size-full object-cover"
        src={site.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-primary/80" />

      <div className="container-page flex min-h-[78vh] flex-col justify-center py-24 text-primary-foreground">
        <span className="inline-flex w-fit rounded-full border border-gold/60 px-4 py-1 text-xs tracking-[0.2em] uppercase">
          Site officiel
        </span>
        <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
          {site.name}
        </h1>
        <p className="mt-5 max-w-2xl text-base text-primary-foreground/85 sm:text-lg">
          {site.tagline} — {site.intro}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            to="/admissions"
            className="rounded-md bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition-transform hover:-translate-y-0.5"
          >
            Demander une inscription
          </Link>
          <Link
            to="/notre-ecole"
            className="rounded-md border border-primary-foreground/40 px-6 py-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
          >
            Découvrir l'école
          </Link>
        </div>
      </div>
    </section>
  );
}
