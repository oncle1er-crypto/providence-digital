import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  list?: string[];
};

/** Gabarit commun aux pages légales (mentions légales, confidentialité). */
export function LegalPage({
  eyebrow,
  title,
  description,
  updatedAt,
  crumbs,
  sections,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  crumbs: Crumb[];
  sections: LegalSection[];
  children?: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Breadcrumbs items={crumbs} />

        <section className="container-page py-10 sm:py-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold text-balance sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-muted-foreground">{description}</p>
          <p className="mt-4 text-xs text-muted-foreground">Dernière mise à jour : {updatedAt}</p>
        </section>

        <section className="container-page pb-24">
          <div className="max-w-3xl divide-y divide-border rounded-3xl border border-border bg-card">
            {sections.map((section) => (
              <article key={section.title} className="p-6 sm:p-8">
                <h2 className="font-display text-xl font-semibold">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-sm leading-7 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-3 size-1.5 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
          {children}
        </section>
      </main>
      <Footer />
    </>
  );
}
