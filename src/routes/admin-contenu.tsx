import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Image as ImageIcon, Loader2, LogOut, Save, ShieldCheck, Video } from "lucide-react";
import { heroSlides, levels as defaultLevels } from "@/data/site";
import {
  getAdminSettings,
  getMediaAssets,
  getSession,
  isCmsAdmin,
  mediaPublicUrl,
  saveSetting,
  signIn,
  signOut,
  type CmsSession,
  type MediaAsset,
  type SiteSetting,
} from "@/lib/cms";
import type { HomeHeroSetting, HeroSlideContent } from "@/components/HeroVideoCarousel";
import type { SchoolLevelContent, SchoolLevelsSetting } from "@/components/SchoolLevels";

export const Route = createFileRoute("/admin-contenu")({
  head: () => ({
    meta: [
      { title: "Contenu du site | Administration La Providence" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
      { name: "googlebot", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: AdminContentPage,
});

const defaultHero: HomeHeroSetting = {
  eyebrow: "Site officiel • Bonoua",
  title: "Complexe Scolaire La Providence de Don Orione",
  subtitle: "Bonoua — Instruire l'esprit, former le cœur.",
  description: "École catholique à Bonoua-Château — de la maternelle à la terminale.",
  primary_label: "Demander une inscription",
  primary_url: "/admissions",
  secondary_label: "Visiter l'école",
  secondary_url: "/contact",
  slides: heroSlides.map((slide) => ({ ...slide })),
};

const defaultSchoolLevels: SchoolLevelsSetting = {
  levels: defaultLevels.map((level) => ({ ...level, points: [...level.points] })),
};

function AdminContentPage() {
  const [session, setSession] = useState<CmsSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    let active = true;
    getSession()
      .then(async (stored) => {
        if (!active || !stored) return;
        setSession(stored);
        setAdmin(await isCmsAdmin(stored));
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <Loading />;
  if (!session) return <Login onAuthenticated={async (next) => { setSession(next); setAdmin(await isCmsAdmin(next)); }} />;
  if (!admin) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f8f5ef] p-6">
        <div className="max-w-lg rounded-3xl bg-white p-8 shadow-xl">
          <ShieldCheck className="size-10 text-primary" />
          <h1 className="mt-5 font-display text-3xl font-semibold text-primary">Accès refusé</h1>
          <p className="mt-3 text-sm text-muted-foreground">Ce compte n'est pas administrateur du site.</p>
        </div>
      </main>
    );
  }

  return <ContentEditor session={session} onLogout={async () => { await signOut(session); setSession(null); setAdmin(false); }} />;
}

function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f8f5ef] text-primary">
      <div className="flex items-center gap-3 text-sm font-semibold"><Loader2 className="size-5 animate-spin" /> Chargement…</div>
    </div>
  );
}

function Login({ onAuthenticated }: { onAuthenticated: (session: CmsSession) => Promise<void> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  return (
    <main className="grid min-h-screen place-items-center bg-[#f8f5ef] p-6">
      <form
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
        onSubmit={async (event) => {
          event.preventDefault();
          setBusy(true);
          setError("");
          try {
            await onAuthenticated(await signIn(email.trim(), password));
          } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Connexion impossible.");
          } finally {
            setBusy(false);
          }
        }}
      >
        <p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Administration</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-primary">Contenu du site</h1>
        <p className="mt-2 text-sm text-muted-foreground">Connectez-vous avec le même compte que sur /admin.</p>
        <label className="mt-7 block text-sm font-semibold text-primary">E-mail</label>
        <input className="input-admin mt-2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="mt-5 block text-sm font-semibold text-primary">Mot de passe</label>
        <input className="input-admin mt-2" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground" disabled={busy}>
          {busy && <Loader2 className="size-4 animate-spin" />} Se connecter
        </button>
      </form>
    </main>
  );
}

function ContentEditor({ session, onLogout }: { session: CmsSession; onLogout: () => Promise<void> }) {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [hero, setHero] = useState<HomeHeroSetting>(defaultHero);
  const [schoolLevels, setSchoolLevels] = useState<SchoolLevelsSetting>(defaultSchoolLevels);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [settingRows, mediaRows] = await Promise.all([getAdminSettings(session), getMediaAssets(session)]);
      setSettings(settingRows);
      setMedia(mediaRows);
      const heroSetting = settingRows.find((row) => row.key === "home_hero") as SiteSetting<HomeHeroSetting> | undefined;
      const levelSetting = settingRows.find((row) => row.key === "school_levels") as SiteSetting<SchoolLevelsSetting> | undefined;
      setHero({ ...defaultHero, ...(heroSetting?.value || {}), slides: heroSetting?.value?.slides?.length ? heroSetting.value.slides : defaultHero.slides });
      setSchoolLevels({ levels: levelSetting?.value?.levels?.length ? levelSetting.value.levels : defaultSchoolLevels.levels });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Impossible de charger le contenu.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  const mediaOptions = useMemo(() => media.filter((asset) => asset.is_public), [media]);

  if (loading) return <Loading />;

  async function saveHero() {
    setSaving("hero"); setNotice(""); setError("");
    try {
      await saveSetting(session, "home_hero", hero as Record<string, unknown>);
      setNotice("Carrousel et textes d'accueil enregistrés.");
      await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Enregistrement impossible."); }
    finally { setSaving(""); }
  }

  async function saveLevels() {
    setSaving("levels"); setNotice(""); setError("");
    try {
      await saveSetting(session, "school_levels", schoolLevels as Record<string, unknown>);
      setNotice("Niveaux d'enseignement enregistrés.");
      await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Enregistrement impossible."); }
    finally { setSaving(""); }
  }

  return (
    <main className="min-h-screen bg-[#f8f5ef] pb-16 text-foreground">
      <header className="sticky top-0 z-30 border-b border-primary/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div>
            <p className="font-display text-lg font-semibold text-primary">Gestion du contenu</p>
            <p className="text-xs text-muted-foreground">Accueil, vidéos, photos et niveaux</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/admin" className="inline-flex items-center gap-2 rounded-full border border-primary/15 px-4 py-2 text-sm font-semibold text-primary"><ArrowLeft className="size-4" /> Admin</Link>
            <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><LogOut className="size-4" /> Déconnexion</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {notice && <p className="rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">{notice}</p>}
        {error && <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}

        <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Accueil</p><h2 className="mt-2 font-display text-3xl font-semibold text-primary">Carrousel principal</h2><p className="mt-2 text-sm text-muted-foreground">Textes, boutons, vidéos et posters du haut de la page d'accueil.</p></div>
            <button onClick={saveHero} disabled={saving === "hero"} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"><Save className="size-4" /> Enregistrer</button>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <TextField label="Petit libellé" value={hero.eyebrow || ""} onChange={(value) => setHero({ ...hero, eyebrow: value })} />
            <TextField label="Titre principal" value={hero.title || ""} onChange={(value) => setHero({ ...hero, title: value })} />
            <TextField label="Sous-titre" value={hero.subtitle || ""} onChange={(value) => setHero({ ...hero, subtitle: value })} />
            <TextField label="Description" value={hero.description || ""} onChange={(value) => setHero({ ...hero, description: value })} />
            <TextField label="Bouton principal" value={hero.primary_label || ""} onChange={(value) => setHero({ ...hero, primary_label: value })} />
            <TextField label="Lien bouton principal" value={hero.primary_url || ""} onChange={(value) => setHero({ ...hero, primary_url: value })} />
            <TextField label="Bouton secondaire" value={hero.secondary_label || ""} onChange={(value) => setHero({ ...hero, secondary_label: value })} />
            <TextField label="Lien bouton secondaire" value={hero.secondary_url || ""} onChange={(value) => setHero({ ...hero, secondary_url: value })} />
          </div>

          <div className="mt-8 space-y-5">
            {(hero.slides || []).map((slide, index) => (
              <SlideEditor key={`${slide.id}-${index}`} slide={slide} index={index} media={mediaOptions} onChange={(next) => {
                const slides = [...(hero.slides || [])]; slides[index] = next; setHero({ ...hero, slides });
              }} onDelete={() => setHero({ ...hero, slides: (hero.slides || []).filter((_, i) => i !== index) })} />
            ))}
            <button onClick={() => setHero({ ...hero, slides: [...(hero.slides || []), { id: `slide-${Date.now()}`, title: "Nouvelle vidéo", description: "", duration: 8, src: "", poster: "" }] })} className="rounded-full border border-primary/15 px-5 py-2.5 text-sm font-semibold text-primary">+ Ajouter une vidéo</button>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Formations</p><h2 className="mt-2 font-display text-3xl font-semibold text-primary">Maternelle · Primaire · Collège · Lycée</h2><p className="mt-2 text-sm text-muted-foreground">Modifiez les photos, descriptions et points affichés sur les cartes.</p></div>
            <button onClick={saveLevels} disabled={saving === "levels"} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"><Save className="size-4" /> Enregistrer</button>
          </div>

          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            {(schoolLevels.levels || []).map((level, index) => (
              <LevelEditor key={level.slug} level={level} media={mediaOptions} onChange={(next) => {
                const levels = [...(schoolLevels.levels || [])]; levels[index] = next; setSchoolLevels({ levels });
              }} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block"><span className="text-sm font-semibold text-primary">{label}</span><input className="input-admin mt-2" value={value} onChange={(e) => onChange(e.target.value)} /></label>;
}

function MediaSelect({ value, media, kind, onChange }: { value: string; media: MediaAsset[]; kind?: "image" | "video"; onChange: (value: string) => void }) {
  const filtered = kind ? media.filter((asset) => asset.kind === kind) : media;
  return (
    <div>
      <input className="input-admin" value={value} onChange={(e) => onChange(e.target.value)} placeholder="URL ou chemin du média" />
      <select className="input-admin mt-2" value="" onChange={(e) => e.target.value && onChange(e.target.value)}>
        <option value="">Choisir dans la médiathèque…</option>
        {filtered.map((asset) => <option key={asset.id} value={asset.storage_path}>{asset.alt_text || asset.storage_path}</option>)}
      </select>
      {value && <div className="mt-3 overflow-hidden rounded-xl border border-primary/10 bg-[#f8f5ef]">{kind === "video" ? <video src={mediaPublicUrl(value)} className="h-36 w-full object-cover" muted controls /> : <img src={mediaPublicUrl(value)} alt="Aperçu" className="h-36 w-full object-cover" />}</div>}
    </div>
  );
}

function SlideEditor({ slide, index, media, onChange, onDelete }: { slide: HeroSlideContent; index: number; media: MediaAsset[]; onChange: (slide: HeroSlideContent) => void; onDelete: () => void }) {
  return (
    <div className="rounded-2xl border border-primary/10 p-5">
      <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Video className="size-4 text-gold" /><h3 className="font-semibold text-primary">Vidéo {index + 1}</h3></div><button onClick={onDelete} className="text-xs font-semibold text-red-600">Supprimer</button></div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <TextField label="Titre" value={slide.title} onChange={(value) => onChange({ ...slide, title: value })} />
        <TextField label="Description" value={slide.description} onChange={(value) => onChange({ ...slide, description: value })} />
        <label className="block"><span className="text-sm font-semibold text-primary">Durée affichée (sec)</span><input className="input-admin mt-2" type="number" min={1} max={120} value={slide.duration} onChange={(e) => onChange({ ...slide, duration: Number(e.target.value) || 8 })} /></label>
        <div />
        <div><p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary"><Video className="size-4" /> Vidéo</p><MediaSelect value={slide.src} media={media} kind="video" onChange={(value) => onChange({ ...slide, src: value })} /></div>
        <div><p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary"><ImageIcon className="size-4" /> Image d'aperçu</p><MediaSelect value={slide.poster} media={media} kind="image" onChange={(value) => onChange({ ...slide, poster: value })} /></div>
      </div>
    </div>
  );
}

function LevelEditor({ level, media, onChange }: { level: SchoolLevelContent; media: MediaAsset[]; onChange: (level: SchoolLevelContent) => void }) {
  return (
    <div className="rounded-2xl border border-primary/10 p-5">
      <h3 className="font-display text-xl font-semibold text-primary">{level.title}</h3>
      <div className="mt-4 space-y-4">
        <TextField label="Titre" value={level.title} onChange={(value) => onChange({ ...level, title: value })} />
        <label className="block"><span className="text-sm font-semibold text-primary">Description</span><textarea className="input-admin mt-2 min-h-24" value={level.summary} onChange={(e) => onChange({ ...level, summary: e.target.value })} /></label>
        <div><p className="mb-2 text-sm font-semibold text-primary">Photo</p><MediaSelect value={level.image} media={media} kind="image" onChange={(value) => onChange({ ...level, image: value })} /></div>
        <label className="block"><span className="text-sm font-semibold text-primary">Points (un par ligne)</span><textarea className="input-admin mt-2 min-h-28" value={level.points.join("\n")} onChange={(e) => onChange({ ...level, points: e.target.value.split("\n").map((value) => value.trim()).filter(Boolean) })} /></label>
      </div>
    </div>
  );
}
