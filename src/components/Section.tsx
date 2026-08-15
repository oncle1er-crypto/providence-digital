import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

export function Section({
  eyebrow,
  title,
  description,
  children,
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <section className={cn("container-page py-16 sm:py-20", className)}>
      <Reveal className="max-w-2xl">
        {eyebrow && (
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
        )}
        <Heading className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{title}</Heading>
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
