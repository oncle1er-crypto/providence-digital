import { campusGallery } from "@/data/site";

export function CampusGallery() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {campusGallery.map((item, i) => (
        <figure
          key={item.title}
          className={`group overflow-hidden rounded-3xl border border-border bg-card shadow-sm ${
            i === 0 ? "lg:col-span-2" : ""
          }`}
        >
          <div className={`overflow-hidden ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
            <img
              src={item.src}
              alt={`${item.title} — Complexe Scolaire La Providence de Don Orione, Bonoua`}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <figcaption className="p-5">
            <h3 className="font-display text-lg font-semibold">{item.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{item.text}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
