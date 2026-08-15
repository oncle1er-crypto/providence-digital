import { motion, useReducedMotion } from "framer-motion";
import { whyProvidence } from "@/data/site";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { Counter } from "@/components/Counter";

export function WhyProvidence() {
  const reduced = useReducedMotion();

  return (
    <section className="mt-16 overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20">
      <div className="container-page">
        <Reveal as="p" variant="left" className="text-xs font-semibold tracking-[0.22em] text-gold uppercase">
          Nos atouts
        </Reveal>
        <Reveal as="h2" variant="left" delay={80} className="mt-3 max-w-2xl font-display text-3xl font-semibold text-balance sm:text-4xl">
          Pourquoi choisir La Providence ?
        </Reveal>
        <RevealGroup delay={0.1} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyProvidence.map((item, i) => (
            <RevealItem key={item.title} variant={i % 2 === 0 ? "up" : "zoom"}>
              <motion.div
                whileHover={reduced ? {} : { y: -6, scale: 1.01 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="card-lift h-full rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6"
              >
                <Counter value={i + 1} pad={2} className="font-mono text-xs text-gold" />
                <h3 className="mt-2 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/80">{item.text}</p>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
