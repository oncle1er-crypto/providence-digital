import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "providence-cookie-consent";
export const COOKIES_OPEN_EVENT = "providence:cookies-open";

type Choice = "accepted" | "rejected";

function readChoice(): Choice | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === "accepted" || raw === "rejected" ? raw : null;
}

/** Bandeau de consentement (conformité RGPD) — réouvrable depuis le lien « Gérer les cookies ». */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readChoice()) return;

    const timer = window.setTimeout(() => setVisible(true), 900);
    const open = () => setVisible(true);
    window.addEventListener(COOKIES_OPEN_EVENT, open);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(COOKIES_OPEN_EVENT, open);
    };
  }, []);

  const choose = (choice: Choice) => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ choice, at: new Date().toISOString() }),
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Gestion des cookies"
      className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-2xl sm:flex-row sm:items-center sm:gap-6">
        <Cookie className="size-6 shrink-0 text-gold" aria-hidden="true" />
        <div className="min-w-0 flex-1 text-sm text-muted-foreground">
          <p className="font-display text-base font-semibold text-foreground">
            Cookies et données personnelles
          </p>
          <p className="mt-1">
            Ce site dépose des cookies nécessaires à son fonctionnement et, avec votre accord, des
            cookies de mesure d'audience. Vous pouvez accepter ou refuser, et changer d'avis à tout
            moment.{" "}
            <Link
              to="/politique-confidentialite"
              className="font-medium text-primary underline underline-offset-4"
            >
              En savoir plus
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="btn-press min-h-11 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Accepter
          </button>
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="btn-press min-h-11 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
}

/** Lien du pied de page permettant de revoir le choix de cookies. */
export function CookieSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COOKIES_OPEN_EVENT))}
      className={`transition-colors hover:text-gold focus-visible:text-gold focus-visible:outline-none ${className}`}
    >
      Gérer les cookies
    </button>
  );
}
