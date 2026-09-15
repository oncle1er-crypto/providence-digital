import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitContactMessage } from "@/lib/cms";

const subjects = ["Admission", "Scolarité", "Visite", "Administration", "Autre"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom complet.").max(120),
  email: z.string().trim().email("Saisissez une adresse e-mail valide.").max(254),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+().\s-]*$/, "Saisissez un numéro de téléphone valide.")
    .optional()
    .or(z.literal("")),
  subject: z.enum(subjects, { message: "Sélectionnez un motif de contact." }),
  message: z
    .string()
    .trim()
    .min(10, "Votre message doit contenir au moins 10 caractères.")
    .max(3000, "Votre message ne doit pas dépasser 3 000 caractères."),
  website: z.string().max(0),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "h-12 rounded-xl border-border bg-white px-4 shadow-none focus-visible:ring-2 focus-visible:ring-gold";

export function ContactForm() {
  const startedAt = useRef(Date.now());
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "", website: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError("");
    setSuccess(false);

    if (values.website || Date.now() - startedAt.current < 2500) {
      setSubmitError("Veuillez patienter quelques instants puis réessayer.");
      return;
    }

    try {
      await submitContactMessage({
        name: values.name,
        email: values.email,
        phone: values.phone?.trim() ? values.phone.trim() : null,
        subject: values.subject,
        message: values.message,
      });
      reset();
      startedAt.current = Date.now();
      setSuccess(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur inconnue";
      setSubmitError(
        message.includes("quelques instants")
          ? "Un message a déjà été envoyé avec ces coordonnées il y a quelques instants. Merci de patienter."
          : "L'envoi n'a pas abouti. Vous pouvez nous joindre directement par téléphone ou par e-mail.",
      );
    }
  });

  const errorFor = (name: keyof FormValues) =>
    errors[name] ? (
      <p className="mt-1.5 text-sm text-destructive">{errors[name]?.message}</p>
    ) : null;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Votre nom" required>
          <Input
            autoComplete="name"
            placeholder="Votre nom complet"
            className={fieldClass}
            {...register("name")}
          />
          {errorFor("name")}
        </Field>
        <Field label="Adresse e-mail" required>
          <Input
            type="email"
            autoComplete="email"
            placeholder="exemple@email.com"
            className={fieldClass}
            {...register("email")}
          />
          {errorFor("email")}
        </Field>
        <Field label="Téléphone (optionnel)">
          <Input
            type="tel"
            autoComplete="tel"
            placeholder="+225 00 00 00 00 00"
            className={fieldClass}
            {...register("phone")}
          />
          {errorFor("phone")}
        </Field>
        <Field label="Motif de votre message" required>
          <select
            className={`${fieldClass} w-full appearance-none border text-sm outline-none`}
            defaultValue=""
            {...register("subject")}
          >
            <option value="" disabled>
              Sélectionnez un motif
            </option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errorFor("subject")}
        </Field>
      </div>

      <Field label="Votre message" required className="mt-6">
        <Textarea
          rows={6}
          placeholder="Décrivez votre demande : niveau souhaité, disponibilités, questions…"
          className="min-h-36 rounded-xl border-border bg-white px-4 py-3 shadow-none focus-visible:ring-2 focus-visible:ring-gold"
          {...register("message")}
        />
        {errorFor("message")}
      </Field>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">Site internet</label>
        <input id="contact-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {success && (
        <div
          role="status"
          className="mt-6 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
        >
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
          <p>
            <strong>Message envoyé.</strong> L'administration vous répondra dans les meilleurs
            délais, aux horaires d'ouverture de l'établissement.
          </p>
        </div>
      )}
      {submitError && (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-glow btn-press mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-5" />}
        {isSubmitting ? "Envoi en cours…" : "Envoyer le message"}
      </button>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        Les informations transmises sont utilisées uniquement pour répondre à votre demande. Voir
        notre politique de confidentialité.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block text-sm font-semibold text-foreground ${className}`}>
      <span className="mb-2 block">
        {label}
        {required && (
          <span className="ml-1 text-gold" aria-hidden="true">
            *
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
