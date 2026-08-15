import { Link } from "@tanstack/react-router";
import { levels } from "@/data/site";

export function SchoolLevels() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {levels.map((level) => (
        <article
          key={level.slug}
          className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl"
        >
          <div className="relative h-64 overflow-hidden sm:h-72">
            <img
              src={level.image}
              alt={`Élèves en ${level.title.toLowerCase()} au Complexe Scolaire La Providence de Don Orione`}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent" />
            <h3 className="absolute bottom-4 left-5 font-display text-2xl font-semibold text-primary-foreground">
              {level.title}
            </h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-muted-foreground">{level.summary}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {level.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              to="/formations"
              className="mt-5 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              En savoir plus
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
