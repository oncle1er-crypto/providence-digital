import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "@tanstack/react-router";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Recette unique pour tous les boutons du site (CTA, liens d'action, envois de formulaire). */
export const buttonStyles = cva(
  "btn-press inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        gold: "btn-glow bg-gold text-gold-foreground",
        outline: "border border-border text-foreground hover:bg-secondary",
        ghost: "text-foreground hover:bg-secondary",
        /** Sur fond sombre (bordeaux) : bandeaux, pieds de page. */
        onDark:
          "border border-primary-foreground/45 text-primary-foreground hover:bg-primary-foreground/10 focus-visible:ring-offset-primary",
      },
      size: {
        sm: "px-5 py-2.5",
        md: "px-6 py-3",
        lg: "px-7 py-3.5 sm:text-base",
        icon: "size-12 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonStyleProps = VariantProps<typeof buttonStyles>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: {
  className?: string;
  variant?: ButtonStyleProps["variant"];
  size?: ButtonStyleProps["size"];
} & ComponentPropsWithoutRef<"button">) {
  return (
    <button type={type} className={cn(buttonStyles({ variant, size }), className)} {...props} />
  );
}

// Les routes dynamiques imposent des paramètres variables : on garde une signature souple.
const RouterLink = Link as unknown as (props: {
  to: string;
  params?: Record<string, string> | undefined;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
  title?: string;
}) => React.ReactElement;

export function ButtonLink({
  to,
  params,
  className,
  variant,
  size,
  children,
  ...rest
}: {
  to: string;
  params?: Record<string, string> | undefined;
  className?: string;
  variant?: ButtonStyleProps["variant"];
  size?: ButtonStyleProps["size"];
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
  title?: string;
}) {
  return (
    <RouterLink
      to={to}
      params={params}
      className={cn(buttonStyles({ variant, size }), className)}
      {...rest}
    >
      {children}
    </RouterLink>
  );
}

export function ButtonAnchor({
  className,
  variant,
  size,
  ...props
}: {
  className?: string;
  variant?: ButtonStyleProps["variant"];
  size?: ButtonStyleProps["size"];
} & ComponentPropsWithoutRef<"a">) {
  return <a className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
