import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { heroSlides as defaultSlides } from "@/data/site";
import { mediaPublicUrl } from "@/lib/cms";

export type HeroSlideContent = {
  id: string;
  title: string;
  description: string;
  duration: number;
  src: string;
  poster: string;
};

export type HomeHeroSetting = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primary_label?: string;
  primary_url?: string;
  secondary_label?: string;
  secondary_url?: string;
  slides?: HeroSlideContent[];
};

function fmt(t: number) {
  const s = Math.max(0, Math.floor(t));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function HeroVideoCarousel({ content }: { content?: HomeHeroSetting | null }) {
  const configured = content?.slides?.filter((slide) => slide.src && slide.title) ?? [];
  const slides: HeroSlideContent[] = configured.length
    ? configured
    : defaultSlides.map((slide) => ({ ...slide }));
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(slides[0]?.duration ?? 8);
  const [reduced, setReduced] = useState(false);
  const [loaded, setLoaded] = useState<number[]>([0]);
  const [showControls, setShowControls] = useState(false);
  const hideTimerRef = useRef<number | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    if (index < slides.length) return;
    setIndex(0);
  }, [index, slides.length]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      if (mq.matches) setPlaying(false);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!slides.length) return;
    const next = (index + 1) % slides.length;
    setLoaded((prev) =>
      prev.includes(index) && prev.includes(next) ? prev : [...new Set([...prev, index, next])],
    );
  }, [index, slides.length]);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (!slides.length) return;
      setIndex(((nextIndex % slides.length) + slides.length) % slides.length);
      setTime(0);
    },
    [slides.length],
  );

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.muted = muted;
        video.currentTime = 0;
        if (playing && !reduced) void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [index, playing, muted, reduced]);

  useEffect(() => {
    if (!playing || reduced || !slides.length) return;
    const ms = (slides[index]?.duration ?? 8) * 1000;
    const timer = window.setTimeout(() => goTo(index + 1), ms);
    return () => window.clearTimeout(timer);
  }, [index, playing, reduced, goTo, slides]);

  const current = slides[index] ?? slides[0];
  if (!current) return null;

  const reveal = () => {
    setShowControls(true);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => setShowControls(false), 2600);
  };

  const primaryUrl = content?.primary_url || "/admissions";
  const secondaryUrl = content?.secondary_url || "/contact";

  return (
    <section className="relative isolate min-h-[88svh] overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 -z-10">
        {slides.map((slide, i) => (
          <video
            key={slide.id}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            className={`absolute inset-0 size-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            src={loaded.includes(i) ? mediaPublicUrl(slide.src) || slide.src : undefined}
            poster={mediaPublicUrl(slide.poster) || slide.poster}
            autoPlay={i === 0 && !reduced}
            muted={muted}
            loop={false}
            playsInline
            preload={i === 0 ? "auto" : loaded.includes(i) ? "metadata" : "none"}
            aria-hidden="true"
            tabIndex={-1}
            onEnded={() => i === index && goTo(index + 1)}
            onCanPlay={(event) => {
              if (i !== index || !playing || reduced) return;
              event.currentTarget.muted = muted;
              void event.currentTarget.play().catch(() => setPlaying(false));
            }}
            onLoadedMetadata={(event) =>
              i === index && setDuration(event.currentTarget.duration || slide.duration)
            }
            onTimeUpdate={(event) => i === index && setTime(event.currentTarget.currentTime)}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.16_0.02_25/0.72)_0%,oklch(0.16_0.02_25/0.42)_45%,oklch(0.16_0.02_25/0.08)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/25" />
      </div>

      <div className="container-page flex min-h-[88svh] flex-col justify-center gap-10 py-28">
        <div key={`${current.id}-${index}`} className="max-w-3xl">
          <span className="hero-anim hero-eyebrow inline-flex w-fit rounded-full border border-gold/60 px-4 py-1 text-xs tracking-[0.2em] uppercase">
            {content?.eyebrow || "Site officiel • Bonoua"}
          </span>
          <h1 className="hero-anim hero-title mt-6 font-display leading-[1.02] font-semibold text-balance [font-size:clamp(2.25rem,6vw,5rem)]">
            {content?.title || "Complexe Scolaire La Providence de Don Orione"}
            <span className="mt-3 block text-primary-foreground/85 [font-size:clamp(1.1rem,2.4vw,1.9rem)]">
              {content?.subtitle || "Bonoua — Instruire l'esprit, former le cœur."}
            </span>
          </h1>
          <p className="hero-anim hero-desc mt-5 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
            {content?.description || "École catholique à Bonoua-Château — de la maternelle à la terminale."}
          </p>
          <div className="hero-anim hero-cta mt-9 flex flex-wrap gap-3">
            <Link
              to={primaryUrl as "/admissions"}
              className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground transition-transform hover:-translate-y-0.5"
            >
              {content?.primary_label || "Demander une inscription"}
            </Link>
            <Link
              to={secondaryUrl as "/contact"}
              className="rounded-full border border-primary-foreground/45 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
            >
              {content?.secondary_label || "Visiter l'école"}
            </Link>
          </div>
        </div>

        <div
          className="group relative mt-auto w-full max-w-3xl pt-8"
          onMouseEnter={reveal}
          onMouseLeave={() => setShowControls(false)}
          onTouchStart={reveal}
          onFocus={reveal}
        >
          <div className="h-1 w-full overflow-hidden rounded-full bg-primary-foreground/15">
            <div
              className="h-full rounded-full bg-gold transition-[width] duration-200"
              style={{ width: `${Math.min(100, (time / (duration || current.duration)) * 100)}%` }}
            />
          </div>
          <div className={`overflow-hidden transition-all duration-500 ${showControls ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="mt-3 rounded-2xl border border-primary-foreground/15 bg-ink/60 p-4 backdrop-blur-md sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">Vidéo {String(index + 1).padStart(2, "0")} • {current.duration} sec</p>
                  <p className="truncate text-xs text-primary-foreground/75">{current.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" aria-label={playing ? "Mettre en pause" : "Lire"} onClick={() => {
                    reveal();
                    const video = videoRefs.current[index];
                    if (!video) return;
                    if (playing) video.pause(); else void video.play().catch(() => undefined);
                    setPlaying(!playing);
                  }} className="grid size-10 place-items-center rounded-full bg-primary-foreground/15">
                    {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                  </button>
                  <button type="button" aria-label={muted ? "Activer le son" : "Couper le son"} onClick={() => { reveal(); setMuted((value) => !value); }} className="grid size-10 place-items-center rounded-full bg-primary-foreground/15">
                    {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                  </button>
                  <button type="button" aria-label="Plein écran" onClick={() => void videoRefs.current[index]?.requestFullscreen?.().catch(() => undefined)} className="hidden size-10 place-items-center rounded-full bg-primary-foreground/15 sm:grid">
                    <Maximize2 className="size-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs tabular-nums">
                <span className="shrink-0 font-mono opacity-80">{fmt(time)} / {fmt(duration || current.duration)}</span>
                <div className="flex flex-wrap gap-1.5">
                  {slides.map((slide, i) => (
                    <motion.button
                      key={slide.id}
                      type="button"
                      onClick={() => { reveal(); goTo(i); }}
                      aria-label={`Afficher ${slide.title}`}
                      className={`relative grid size-8 place-items-center rounded-full text-xs font-semibold ${i === index ? "text-gold-foreground" : "bg-primary-foreground/10"}`}
                    >
                      {i === index && <motion.span layoutId="hero-dot-active" className="absolute inset-0 rounded-full bg-gold" />}
                      <span className="relative">{String(i + 1).padStart(2, "0")}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
