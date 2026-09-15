import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

export type LightboxImage = {
  src: string;
  title: string;
  text?: string;
  alt?: string;
};

/**
 * Visionneuse plein écran accessible : fermeture par Échap ou clic sur le fond,
 * navigation au clavier (flèches) et aux boutons, focus rendu à l'élément d'origine.
 */
export function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
}: {
  images: LightboxImage[];
  index: number | null;
  onIndexChange: (next: number) => void;
  onClose: () => void;
}) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const go = useCallback(
    (step: number) => {
      if (index === null || images.length === 0) return;
      onIndexChange((index + step + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowRight") {
        go(1);
      } else if (event.key === "ArrowLeft") {
        go(-1);
      } else if (event.key === "Tab") {
        // Piège de focus : on garde le clavier dans la boîte de dialogue.
        const focusables = document.querySelectorAll<HTMLElement>(
          '[data-lightbox="true"] button, [data-lightbox="true"] a[href]',
        );
        if (!focusables.length) return;
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [open, go, onClose]);

  if (!open) return null;

  const current = images[index];
  if (!current) return null;

  return (
    <div
      data-lightbox="true"
      role="dialog"
      aria-modal="true"
      aria-label={`${current.title} — visionneuse`}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Fermer la visionneuse"
        className="btn-press absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-primary-foreground/15 text-primary-foreground transition-colors hover:bg-primary-foreground/25 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none sm:top-6 sm:right-6"
      >
        <X className="size-5" aria-hidden="true" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Image précédente"
            className="btn-press absolute left-2 grid size-11 place-items-center rounded-full bg-primary-foreground/15 text-primary-foreground transition-colors hover:bg-primary-foreground/25 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none sm:left-6"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Image suivante"
            className="btn-press absolute right-2 grid size-11 place-items-center rounded-full bg-primary-foreground/15 text-primary-foreground transition-colors hover:bg-primary-foreground/25 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none sm:right-6"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </>
      )}

      <figure className="flex max-h-full w-full max-w-5xl flex-col items-center gap-4">
        <img
          src={current.src}
          alt={current.alt || current.title}
          className="max-h-[70svh] w-auto rounded-2xl object-contain shadow-2xl"
        />
        <figcaption className="max-w-2xl text-center text-primary-foreground">
          <p className="font-display text-lg font-semibold">{current.title}</p>
          {current.text && (
            <p className="mt-1 text-sm text-primary-foreground/75">{current.text}</p>
          )}
          {images.length > 1 && (
            <p className="mt-2 text-xs tabular-nums text-primary-foreground/60">
              {index + 1} / {images.length}
            </p>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
