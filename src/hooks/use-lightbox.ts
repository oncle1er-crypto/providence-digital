import { useCallback, useState } from "react";

/** État d'ouverture d'une visionneuse (index de l'image affichée, ou null). */
export function useLightbox() {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  return { index, setIndex, close };
}
