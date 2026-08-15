import { whyProvidence } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export function WhyProvidence() {
  return (
    <section className="mt-16 bg-primary py-16 text-primary-foreground sm:py-20">
      <div className="container-page">
        <Reveal as="p" className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">Nos atouts</Reveal>
        <Reveal as="h2" delay={80} className="mt-3 max-w-2xl font-display text-3xl font-semibold text-balance sm:text-4xl">
          Pourquoi choisir La Providence ?
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyProvidence.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 90}
              className="card-lift rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6"
            >
              <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-primary-foreground/80">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
