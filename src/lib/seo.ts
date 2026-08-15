const fallbackSiteUrl = "https://cs-laprovidence.space";

/**
 * URL publique canonique du site.
 * VITE_SITE_URL peut être définie dans Vercel si le domaine change.
 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || fallbackSiteUrl).replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export const DEFAULT_OG_IMAGE = absoluteUrl("/logo-gsp.png");
