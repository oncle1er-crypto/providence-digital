import { Counter } from "@/components/Counter";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { keyStats } from "@/data/site";

/** Bandeau de chiffres clés, animés au scroll. */
export function KeyStats({ className = "" }: { className?: string }) {
  return (
    <section
      aria-label="Chiffres clés de l'établissement"
      className={`border-y border-border bg-secondary/60 ${className}`}
    >
      <div className="container-page py-10 sm:py-12">
        <RevealGroup stagger={0.08} className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {keyStats.map((stat) => (
            <RevealItem key={stat.label} variant="up" className="text-center sm:text-left">
              <p className="font-display text-4xl font-semibold text-primary sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix ?? ""} />
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
