const fallbackSiteUrl = "https://www.cslaprovidence.org";

/**
 * URL publique canonique du site.
 * VITE_SITE_URL peut être définie dans Vercel si le domaine change.
 */
export const SITE_URL = (import.meta.env["VITE_SITE_URL"] || fallbackSiteUrl).replace(/\/+$/, "");

/** Domaine affiché (sans protocole) — sert de source unique pour les mentions légales, le footer, etc. */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

/** Image de partage par défaut (1200×630). */
export const DEFAULT_OG_IMAGE = absoluteUrl("/og-default.png");

export const OG_IMAGE = {
  url: DEFAULT_OG_IMAGE,
  width: 1200,
  height: 630,
  alt: "Complexe Scolaire La Providence de Don Orione — Bonoua",
} as const;
