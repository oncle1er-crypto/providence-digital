/** Helpers pour transformer un numéro affiché en lien `tel:` ou WhatsApp. */

/** Ne conserve que les chiffres et le « + » (ex. « (+225) 05 65 25 76 93 » → « +2250565257693 »). */
export function toE164(phone: string) {
  return phone.replace(/[^+\d]/g, "");
}

export function telHref(phone: string) {
  return `tel:${toE164(phone)}`;
}

/** Lien WhatsApp (wa.me attend un numéro en format international, sans « + »). */
export function whatsappHref(phone: string) {
  return `https://wa.me/${toE164(phone).replace(/^\+/, "")}`;
}
