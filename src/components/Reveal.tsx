import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "left" | "right" | "zoom" | "fade";

export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-shown={shown ? "true" : "false"}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", `reveal-${variant}`, className)}
    >
      {children}
    </Tag>
  );
}
