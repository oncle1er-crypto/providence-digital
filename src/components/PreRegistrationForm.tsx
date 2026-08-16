import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { schoolLevels } from "@/data/admissions";
import { submitPreRegistration } from "@/lib/cms";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  guardianName: z.string().trim().min(2, "Indiquez le nom du parent ou tuteur.").max(120),
  email: z.string().trim().email("Saisissez une adresse e-mail valide.").max(254),
  phone: z
    .string()
    .trim()
    .min(8, "Saisissez un numéro de téléphone valide.")
    .max(30)
    .regex(/^[0-9+().\s-]+$/, "Saisissez un numéro de téléphone valide."),
  childName: z.string().trim().min(2, "Indiquez le nom de l'enfant.").max(120),
  childAge: z.coerce.number().int().min(2, "Âge minimum : 2 ans.").max(20, "Âge maximum : 20 ans."),
  desiredLevel: z.enum(schoolLevels, { message: "Sélectionnez un niveau." }),
  message: z.string().trim().max(1500, "Le message ne doit pas dépasser 1 500 caractères."),
  website: z.string().max(0),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "h-12 rounded-xl border-border bg-white px-4 shadow-none focus-visible:ring-2 focus-visible:ring-gold";

export function PreRegistrationForm() {
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
    defaultValues: { message: "", website: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError("");
    setSuccess(false);

    if (values.website || Date.now() - startedAt.current < 2500) {
      setSubmitError("Veuillez patienter quelques instants puis réessayer.");
      return;
    }

    try {
      await submitPreRegistration({
        guardian_name: values.guardianName,
        email: values.email,
        phone: values.phone,
        child_name: values.childName,
        child_age: values.childAge,
        desired_level: values.desiredLevel,
        message: values.message || null,
      });
      reset();
      startedAt.current = Date.now();
      setSuccess(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur inconnue";
      setSubmitError(
        message.includes("demande récente")
          ? "Une demande récente existe déjà pour ces coordonnées. Nous vous recontacterons bientôt."
          : "L'envoi n'a pas abouti. Vérifiez votre connexion ou contactez directement le secrétariat.",
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
      className="rounded-3xl border border-border bg-card p-5 shadow-xl sm:p-8 lg:p-10"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Nom du parent ou tuteur" required>
          <Input
            autoComplete="name"
            placeholder="Votre nom complet"
            className={fieldClass}
            {...register("guardianName")}
          />
          {errorFor("guardianName")}
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
        <Field label="Téléphone" required>
          <Input
            type="tel"
            autoComplete="tel"
            placeholder="+225 00 00 00 00 00"
            className={fieldClass}
            {...register("phone")}
          />
          {errorFor("phone")}
        </Field>
        <Field label="Nom de l'enfant" required>
          <Input
            autoComplete="off"
            placeholder="Nom complet de l'enfant"
            className={fieldClass}
            {...register("childName")}
          />
          {errorFor("childName")}
        </Field>
        <Field label="Âge de l'enfant" required>
          <Input
            type="number"
            min={2}
            max={20}
            inputMode="numeric"
            placeholder="Ex. 8"
            className={fieldClass}
            {...register("childAge")}
          />
          {errorFor("childAge")}
        </Field>
        <Field label="Niveau souhaité" required>
          <select
            className={`${fieldClass} w-full appearance-none border text-sm outline-none`}
            defaultValue=""
            {...register("desiredLevel")}
          >
            <option value="" disabled>
              Sélectionnez un niveau
            </option>
            {schoolLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errorFor("desiredLevel")}
        </Field>
      </div>

      <Field label="Votre message (optionnel)" className="mt-6">
        <Textarea
          rows={5}
          placeholder="Précisez vos questions ou les besoins de votre enfant…"
          className="min-h-32 rounded-xl border-border bg-white px-4 py-3 shadow-none focus-visible:ring-2 focus-visible:ring-gold"
          {...register("message")}
        />
        {errorFor("message")}
      </Field>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Site internet</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {success && (
        <div
          role="status"
          className="mt-6 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
        >
          <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
          <p>
            <strong>Demande envoyée.</strong> L'administration vous recontactera après étude des
            disponibilités.
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
        {isSubmitting ? "Envoi en cours…" : "Envoyer la préinscription"}
      </button>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        En envoyant ce formulaire, vous acceptez que l'établissement utilise ces informations
        uniquement pour traiter votre demande d'admission.
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
