import { HCarousel } from "@/components/HCarousel";
import { testimonials } from "@/data/site";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <HCarousel
      label="Témoignages"
      itemClassName="w-[88%] sm:w-[48%] lg:w-[32%]"
      items={testimonials.map((t) => (
        <figure
          key={t.id}
          className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <Quote className="size-6 text-gold" aria-hidden="true" />
          <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
            « {t.quote} »
          </blockquote>
          <figcaption className="mt-5 border-t border-border pt-4 text-sm">
            <span className="font-semibold">{t.role}</span>
            <span className="block text-xs text-muted-foreground">{t.author}</span>
          </figcaption>
        </figure>
      ))}
    />
  );
}
