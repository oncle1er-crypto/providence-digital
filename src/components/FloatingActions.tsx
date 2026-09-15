import { Link } from "@tanstack/react-router";
import { GraduationCap, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { site } from "@/data/site";
import { telHref, whatsappHref } from "@/lib/contact";

/**
 * Actions rapides flottantes (WhatsApp, appel, préinscription).
 * Affichées après le début du défilement, au-dessus du bouton « retour en haut ».
 */
export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const base =
    "btn-press grid size-12 place-items-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

  return (
    <div
      className={`fixed right-5 bottom-20 z-50 flex flex-col gap-3 transition-all duration-300 lg:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <a
        href={whatsappHref(site.contact.whatsapp)}
        target="_blank"
        rel="noreferrer"
        aria-label="Écrire au secrétariat sur WhatsApp"
        title="WhatsApp"
        className={`${base} bg-[#25d366] text-white`}
      >
        <MessageCircle className="size-5" aria-hidden="true" />
      </a>

      <a
        href={telHref(site.contact.phone)}
        aria-label={`Appeler le secrétariat au ${site.contact.phone}`}
        title="Appeler"
        className={`${base} bg-primary text-primary-foreground`}
      >
        <Phone className="size-5" aria-hidden="true" />
      </a>

      <Link
        to="/admissions"
        aria-label="Demander une inscription"
        title="Préinscription"
        className={`${base} hidden bg-gold text-gold-foreground sm:grid`}
      >
        <GraduationCap className="size-5" aria-hidden="true" />
      </Link>
    </div>
  );
}
