import { levels } from "@/data/site";

export function LevelCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {levels.map((level) => (
        <article
          key={level.slug}
          className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
        >
          <img
            src={level.image}
            alt={`Élèves en ${level.title.toLowerCase()} à La Providence de Don Orione`}
            loading="lazy"
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="p-6">
            <h3 className="font-display text-xl font-semibold">{level.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{level.summary}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {level.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
