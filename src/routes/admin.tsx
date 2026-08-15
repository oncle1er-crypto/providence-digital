import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Copy,
  FileText,
  Image as ImageIcon,
  Loader2,
  LockKeyhole,
  LogOut,
  Newspaper,
  Plus,
  Save,
  Settings,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import { site } from "@/data/site";
import {
  deleteMedia,
  deleteNews,
  getAdminNews,
  getAdminSettings,
  getMediaAssets,
  getSession,
  isCmsAdmin,
  mediaPublicUrl,
  saveNews,
  saveSetting,
  signIn,
  signOut,
  uploadMedia,
  type AdmissionsSetting,
  type CmsSession,
  type ContactSetting,
  type IdentitySetting,
  type MediaAsset,
  type NewsPost,
  type SiteSetting,
} from "@/lib/cms";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administration | La Providence" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { name: "googlebot", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: AdminPage,
});

type Tab = "news" | "site" | "media";

type NewsForm = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body: string;
  image_path: string;
  video_url: string;
  status: NewsPost["status"];
  published_at: string;
  sort_order: number;
};

const emptyNews: NewsForm = {
  title: "",
  slug: "",
  category: "",
  excerpt: "",
  body: "",
  image_path: "",
  video_url: "",
  status: "draft",
  published_at: "",
  sort_order: 0,
};

const defaultIdentity: IdentitySetting = {
  school_name: site.name,
  website: "https://www.cslaprovidence.org",
};

const defaultContact: ContactSetting = {
  address: site.contact.address,
  phone: site.contact.phone,
  email: site.contact.email,
};

const defaultAdmissions: AdmissionsSetting = {
  eyebrow: "Admissions ouvertes",
  title: "Année scolaire 2026–2027",
  message:
    "Les demandes de préinscription sont ouvertes pour la maternelle, le primaire, le collège et le lycée. La validation se fait auprès du secrétariat.",
  cta_label: "Commencer une préinscription",
  cta_url: "/admissions",
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function AdminPage() {
  const [session, setSession] = useState<CmsSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;
    getSession()
      .then(async (stored) => {
        if (!active || !stored) return;
        setSession(stored);
        setIsAdmin(await isCmsAdmin(stored));
      })
      .catch(() => undefined)
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  async function handleAuthenticated(next: CmsSession) {
    setSession(next);
    setLoading(true);
    try {
      setIsAdmin(await isCmsAdmin(next));
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f8f5ef] text-primary">
        <div className="flex items-center gap-3 text-sm font-medium">
          <Loader2 className="size-5 animate-spin" /> Chargement de l’administration…
        </div>
      </div>
    );
  }

  if (!session) {
    return <AuthScreen onAuthenticated={handleAuthenticated} />;
  }

  if (!isAdmin) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f8f5ef] px-4 py-10">
        <div className="w-full max-w-lg rounded-[2rem] border border-primary/10 bg-white p-7 shadow-xl sm:p-10">
          <div className="grid size-14 place-items-center rounded-2xl bg-primary text-gold">
            <ShieldCheck className="size-7" />
          </div>
          <p className="mt-7 text-xs font-semibold tracking-[0.2em] text-gold uppercase">Accès refusé</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-primary">Compte non autorisé</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Ce compte est authentifié mais ne possède pas le rôle administrateur du site. Contactez le propriétaire du site pour obtenir un accès.
          </p>
          <button
            onClick={async () => {
              await signOut(session);
              setSession(null);
              setIsAdmin(false);
            }}
            className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Se déconnecter
          </button>
        </div>
      </main>
    );
  }

  return (
    <AdminDashboard
      session={session}
      onLogout={async () => {
        await signOut(session);
        setSession(null);
        setIsAdmin(false);
      }}
    />
  );
}

function AuthScreen({ onAuthenticated }: { onAuthenticated: (session: CmsSession) => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const next = await signIn(email.trim(), password);
      await onAuthenticated(next);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Connexion impossible.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] px-4 py-10 sm:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
        <section className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
          <div>
            <img src="/logo-gsp.png" alt="Logo La Providence" className="h-16 w-auto" />
            <p className="mt-8 text-xs font-semibold tracking-[0.24em] text-gold uppercase">Espace sécurisé</p>
            <h1 className="mt-4 font-display text-4xl font-semibold">Administration du site</h1>
            <p className="mt-4 max-w-sm text-sm leading-7 text-primary-foreground/75">
              Publiez les actualités, gérez les médias et mettez à jour les informations essentielles du site sans modifier le code.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-primary-foreground/60">
            <ShieldCheck className="size-4 text-gold" /> Accès protégé par Supabase Auth + RLS
          </div>
        </section>

        <section className="p-6 sm:p-10 lg:p-12">
          <div className="flex items-center gap-3 lg:hidden">
            <img src="/logo-gsp.png" alt="Logo La Providence" className="h-12 w-auto" />
            <div>
              <p className="font-display text-lg font-semibold text-primary">La Providence</p>
              <p className="text-xs text-muted-foreground">Administration du site</p>
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Connexion</p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-primary">Bienvenue</h2>
            <p className="mt-2 text-sm text-muted-foreground">Utilisez votre compte administrateur autorisé.</p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <Field label="Adresse e-mail">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-admin"
                placeholder="nom@exemple.com"
                autoComplete="email"
              />
            </Field>
            <Field label="Mot de passe">
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-admin"
                placeholder="Votre mot de passe"
                autoComplete="current-password"
              />
            </Field>

            {error && <Alert tone="error">{error}</Alert>}

            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-95 disabled:opacity-50"
            >
              {busy ? <Loader2 className="size-4 animate-spin" /> : <LockKeyhole className="size-4" />}
              Se connecter
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function AdminDashboard({ session, onLogout }: { session: CmsSession; onLogout: () => Promise<void> }) {
  const [tab, setTab] = useState<Tab>("news");
  const [news, setNews] = useState<NewsPost[]>([]);
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function reload() {
    setLoading(true);
    setError("");
    try {
      const [newsRows, settingsRows, mediaRows] = await Promise.all([
        getAdminNews(session),
        getAdminSettings(session),
        getMediaAssets(session),
      ]);
      setNews(newsRows);
      setSettings(settingsRows);
      setMedia(mediaRows);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Impossible de charger le CMS.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void reload();
  }, []);

  const tabs = [
    { id: "news" as const, label: "Actualités", icon: Newspaper },
    { id: "site" as const, label: "Site", icon: Settings },
    { id: "media" as const, label: "Médias", icon: ImageIcon },
  ];

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-foreground">
      <header className="sticky top-0 z-30 border-b border-primary/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <img src="/logo-gsp.png" alt="Logo La Providence" className="h-10 w-auto shrink-0" />
            <div className="min-w-0">
              <p className="truncate font-display text-base font-semibold text-primary sm:text-lg">La Providence</p>
              <p className="text-[11px] text-muted-foreground">Administration du site</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-full border border-primary/15 px-3.5 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground sm:text-sm"
          >
            <LogOut className="size-4" /> <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                tab === id ? "bg-primary text-primary-foreground shadow-sm" : "bg-white text-primary hover:bg-primary/5"
              }`}
            >
              <Icon className="size-4" /> {label}
            </button>
          ))}
        </div>

        {error && <div className="mb-6"><Alert tone="error">{error}</Alert></div>}
        {loading ? (
          <div className="grid min-h-[45vh] place-items-center rounded-3xl bg-white">
            <Loader2 className="size-7 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {tab === "news" && <NewsManager session={session} news={news} onChanged={reload} />}
            {tab === "site" && <SiteManager session={session} settings={settings} onChanged={reload} />}
            {tab === "media" && <MediaManager session={session} media={media} onChanged={reload} />}
          </>
        )}
      </div>
    </main>
  );
}

function NewsManager({ session, news, onChanged }: { session: CmsSession; news: NewsPost[]; onChanged: () => Promise<void> }) {
  const [form, setForm] = useState<NewsForm>(emptyNews);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  function reset() {
    setForm(emptyNews);
    setEditingId(undefined);
    setNotice("");
    setError("");
  }

  function edit(item: NewsPost) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      slug: item.slug,
      category: item.category || "",
      excerpt: item.excerpt || "",
      body: item.body,
      image_path: item.image_path || "",
      video_url: item.video_url || "",
      status: item.status,
      published_at: item.published_at ? item.published_at.slice(0, 16) : "",
      sort_order: item.sort_order,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    setError("");
    try {
      const publishedAt =
        form.status === "published"
          ? form.published_at
            ? new Date(form.published_at).toISOString()
            : new Date().toISOString()
          : form.published_at
            ? new Date(form.published_at).toISOString()
            : null;

      await saveNews(
        session,
        {
          title: form.title.trim(),
          slug: form.slug.trim() || slugify(form.title),
          category: form.category.trim() || null,
          excerpt: form.excerpt.trim() || null,
          body: form.body,
          image_path: form.image_path.trim() || null,
          video_url: form.video_url.trim() || null,
          status: form.status,
          published_at: publishedAt,
          sort_order: Number(form.sort_order) || 0,
        },
        editingId,
      );
      setNotice(editingId ? "Actualité mise à jour." : "Actualité créée.");
      reset();
      await onChanged();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Enregistrement impossible.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Supprimer définitivement cette actualité ?")) return;
    setBusy(true);
    try {
      await deleteNews(session, id);
      await onChanged();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">Éditeur</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-primary">
              {editingId ? "Modifier l’actualité" : "Nouvelle actualité"}
            </h2>
          </div>
          {editingId && (
            <button onClick={reset} className="rounded-full bg-muted px-3 py-2 text-xs font-semibold text-primary">Nouvelle</button>
          )}
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <Field label="Titre">
            <input
              required
              className="input-admin"
              value={form.title}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  title: e.target.value,
                  slug: editingId || current.slug ? current.slug : slugify(e.target.value),
                }))
              }
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Slug URL">
              <input className="input-admin" value={form.slug} onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })} />
            </Field>
            <Field label="Catégorie">
              <input className="input-admin" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Événement" />
            </Field>
          </div>
          <Field label="Résumé">
            <textarea className="input-admin min-h-24 resize-y" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          </Field>
          <Field label="Contenu">
            <textarea required className="input-admin min-h-44 resize-y" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          </Field>
          <Field label="Image — URL publique ou chemin de la médiathèque">
            <input className="input-admin" value={form.image_path} onChange={(e) => setForm({ ...form, image_path: e.target.value })} placeholder="https://… ou user-id/fichier.webp" />
          </Field>
          <Field label="Vidéo — URL facultative">
            <input className="input-admin" value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value })} placeholder="https://…" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Statut">
              <select className="input-admin" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as NewsPost["status"] })}>
                <option value="draft">Brouillon</option>
                <option value="published">Publié</option>
                <option value="archived">Archivé</option>
              </select>
            </Field>
            <Field label="Date de publication">
              <input type="datetime-local" className="input-admin" value={form.published_at} onChange={(e) => setForm({ ...form, published_at: e.target.value })} />
            </Field>
            <Field label="Ordre">
              <input type="number" className="input-admin" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
            </Field>
          </div>
          {notice && <Alert tone="success">{notice}</Alert>}
          {error && <Alert tone="error">{error}</Alert>}
          <button disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50">
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {editingId ? "Enregistrer les modifications" : "Créer l’actualité"}
          </button>
        </form>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">Publications</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-primary">Actualités enregistrées</h2>
          </div>
          <span className="rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">{news.length}</span>
        </div>

        <div className="mt-6 space-y-3">
          {news.length === 0 && <EmptyState icon={Newspaper} text="Aucune actualité pour le moment." />}
          {news.map((item) => (
            <article key={item.id} className="flex gap-4 rounded-2xl border border-border p-4">
              <div className="hidden size-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:block">
                {item.image_path ? (
                  <img src={mediaPublicUrl(item.image_path)} alt="" className="size-full object-cover" />
                ) : (
                  <div className="grid size-full place-items-center"><Newspaper className="size-5 text-muted-foreground" /></div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                    item.status === "published"
                      ? "bg-emerald-100 text-emerald-700"
                      : item.status === "draft"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-100 text-slate-600"
                  }`}>
                    {item.status === "published" ? "Publié" : item.status === "draft" ? "Brouillon" : "Archivé"}
                  </span>
                  {item.category && <span className="text-xs text-muted-foreground">{item.category}</span>}
                </div>
                <h3 className="mt-2 truncate font-display text-lg font-semibold text-primary">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.excerpt || item.body}</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => edit(item)} className="rounded-full bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">Modifier</button>
                  <button onClick={() => remove(item.id)} className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                    <Trash2 className="size-3.5" /> Supprimer
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function SiteManager({ session, settings, onChanged }: { session: CmsSession; settings: SiteSetting[]; onChanged: () => Promise<void> }) {
  const settingMap = useMemo(() => new Map(settings.map((setting) => [setting.key, setting.value])), [settings]);
  const [identity, setIdentity] = useState<IdentitySetting>({ ...defaultIdentity, ...(settingMap.get("identity") as IdentitySetting | undefined) });
  const [contact, setContact] = useState<ContactSetting>({ ...defaultContact, ...(settingMap.get("contact") as ContactSetting | undefined) });
  const [admissions, setAdmissions] = useState<AdmissionsSetting>({ ...defaultAdmissions, ...(settingMap.get("admissions") as AdmissionsSetting | undefined) });
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function saveAll(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    setError("");
    try {
      await Promise.all([
        saveSetting(session, "identity", identity as Record<string, unknown>),
        saveSetting(session, "contact", contact as Record<string, unknown>),
        saveSetting(session, "admissions", admissions as Record<string, unknown>),
      ]);
      setNotice("Informations du site enregistrées.");
      await onChanged();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Enregistrement impossible.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={saveAll} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-7">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">Identité</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-primary">Informations générales</h2>
          <div className="mt-6 space-y-4">
            <Field label="Nom de l’établissement"><input className="input-admin" value={identity.school_name || ""} onChange={(e) => setIdentity({ ...identity, school_name: e.target.value })} /></Field>
            <Field label="Site web"><input className="input-admin" value={identity.website || ""} onChange={(e) => setIdentity({ ...identity, website: e.target.value })} /></Field>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-7">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">Contact</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-primary">Coordonnées publiques</h2>
          <div className="mt-6 space-y-4">
            <Field label="Adresse"><textarea className="input-admin min-h-20" value={contact.address || ""} onChange={(e) => setContact({ ...contact, address: e.target.value })} /></Field>
            <Field label="Téléphone"><input className="input-admin" value={contact.phone || ""} onChange={(e) => setContact({ ...contact, phone: e.target.value })} /></Field>
            <Field label="E-mail"><input type="email" className="input-admin" value={contact.email || ""} onChange={(e) => setContact({ ...contact, email: e.target.value })} /></Field>
          </div>
        </section>
      </div>

      <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-7">
        <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">Accueil</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-primary">Bloc Admissions</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field label="Sur-titre"><input className="input-admin" value={admissions.eyebrow || ""} onChange={(e) => setAdmissions({ ...admissions, eyebrow: e.target.value })} /></Field>
          <Field label="Titre"><input className="input-admin" value={admissions.title || ""} onChange={(e) => setAdmissions({ ...admissions, title: e.target.value })} /></Field>
          <div className="md:col-span-2"><Field label="Message"><textarea className="input-admin min-h-28" value={admissions.message || ""} onChange={(e) => setAdmissions({ ...admissions, message: e.target.value })} /></Field></div>
          <Field label="Texte du bouton"><input className="input-admin" value={admissions.cta_label || ""} onChange={(e) => setAdmissions({ ...admissions, cta_label: e.target.value })} /></Field>
          <Field label="Lien du bouton"><input className="input-admin" value={admissions.cta_url || ""} onChange={(e) => setAdmissions({ ...admissions, cta_url: e.target.value })} /></Field>
        </div>
      </section>

      {notice && <Alert tone="success">{notice}</Alert>}
      {error && <Alert tone="error">{error}</Alert>}
      <button disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50">
        {busy ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />} Enregistrer les informations du site
      </button>
    </form>
  );
}

function MediaManager({ session, media, onChanged }: { session: CmsSession; media: MediaAsset[]; onChanged: () => Promise<void> }) {
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function upload(event: React.FormEvent) {
    event.preventDefault();
    if (!file) return;
    setBusy(true);
    setNotice("");
    setError("");
    try {
      await uploadMedia(session, file, altText);
      setFile(null);
      setAltText("");
      setNotice("Média téléversé.");
      await onChanged();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Téléversement impossible.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(asset: MediaAsset) {
    if (!window.confirm("Supprimer définitivement ce média ?")) return;
    setBusy(true);
    try {
      await deleteMedia(session, asset);
      await onChanged();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-7">
        <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">Médiathèque</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-primary">Ajouter un média</h2>
        <p className="mt-2 text-sm text-muted-foreground">Images JPEG/PNG/WebP/AVIF, vidéos MP4/WebM ou PDF, maximum 25 Mo.</p>
        <form onSubmit={upload} className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
          <Field label="Fichier">
            <input type="file" required onChange={(e) => setFile(e.target.files?.[0] || null)} className="input-admin file:mr-3 file:rounded-full file:border-0 file:bg-primary/5 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-primary" />
          </Field>
          <Field label="Texte alternatif"><input className="input-admin" value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Décrire l’image" /></Field>
          <button disabled={busy || !file} className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground disabled:opacity-50">
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />} Envoyer
          </button>
        </form>
        {notice && <div className="mt-4"><Alert tone="success">{notice}</Alert></div>}
        {error && <div className="mt-4"><Alert tone="error">{error}</Alert></div>}
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-primary">Fichiers disponibles</h2>
          <span className="rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">{media.length}</span>
        </div>
        {media.length === 0 ? (
          <div className="mt-6"><EmptyState icon={ImageIcon} text="Aucun média téléversé." /></div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {media.map((asset) => {
              const url = mediaPublicUrl(asset.storage_path) || "";
              return (
                <article key={asset.id} className="overflow-hidden rounded-2xl border border-border">
                  <div className="aspect-[4/3] bg-muted">
                    {asset.kind === "image" ? (
                      <img src={url} alt={asset.alt_text || ""} className="size-full object-cover" loading="lazy" />
                    ) : (
                      <div className="grid size-full place-items-center text-muted-foreground">
                        {asset.kind === "video" ? <ImageIcon className="size-8" /> : <FileText className="size-8" />}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="truncate text-xs font-semibold text-primary" title={asset.storage_path}>{asset.storage_path.split("/").pop()}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{asset.kind === "image" ? "Image" : asset.kind === "video" ? "Vidéo" : "Document"}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={async () => {
                          await navigator.clipboard.writeText(url);
                          setNotice("URL copiée.");
                        }}
                        className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
                      >
                        <Copy className="size-3.5" /> Copier URL
                      </button>
                      <button onClick={() => remove(asset)} className="grid size-8 place-items-center rounded-full bg-red-50 text-red-700" aria-label="Supprimer">
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold text-primary/80">{label}</span>
      {children}
    </label>
  );
}

function Alert({ tone, children }: { tone: "error" | "success"; children: React.ReactNode }) {
  return (
    <div className={`rounded-2xl px-4 py-3 text-sm ${tone === "error" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
      {children}
    </div>
  );
}

function EmptyState({ icon: Icon, text }: { icon: typeof Plus; text: string }) {
  return (
    <div className="grid min-h-40 place-items-center rounded-2xl border border-dashed border-primary/15 bg-primary/[0.02] p-6 text-center">
      <div>
        <Icon className="mx-auto size-7 text-primary/35" />
        <p className="mt-3 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
