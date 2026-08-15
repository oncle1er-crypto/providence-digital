import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

export function Section({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("container-page py-16 sm:py-20", className)}>
      <Reveal className="max-w-2xl">
        {eyebrow && (
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
        {description && <p className="mt-4 text-muted-foreground">{description}</p>}
      </Reveal>
      {children && (
        <Reveal delay={120} className="mt-10">
          {children}
        </Reveal>
      )}
    </section>
  );
}
