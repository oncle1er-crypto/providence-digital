import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Pause, Play, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { heroSlides } from "@/data/site";


function fmt(t: number) {
  const s = Math.max(0, Math.floor(t));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function HeroVideoCarousel() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(heroSlides[0]!.duration);
  const [reduced, setReduced] = useState(false);
  const [loaded, setLoaded] = useState<number[]>([0]);
  const [showControls, setShowControls] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

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

  // Chargement intelligent : slide courante + suivante uniquement
  useEffect(() => {
    const next = (index + 1) % heroSlides.length;
    setLoaded((prev) => (prev.includes(index) && prev.includes(next) ? prev : [...new Set([...prev, index, next])]));
  }, [index]);

  const goTo = useCallback((i: number) => {
    setIndex(((i % heroSlides.length) + heroSlides.length) % heroSlides.length);
    setTime(0);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index) {
        v.muted = muted;
        v.currentTime = 0;
        if (playing && !reduced) void v.play().catch(() => undefined);
      } else {
        v.pause();
      }
    });
  }, [index, playing, muted, reduced]);

  // Passage automatique si la vidéo ne déclenche pas "ended" (durée courte)
  useEffect(() => {
    if (!playing || reduced) return;
    const ms = (heroSlides[index]?.duration ?? 8) * 1000;
    const t = window.setTimeout(() => goTo(index + 1), ms);
    return () => window.clearTimeout(t);
  }, [index, playing, reduced, goTo]);

  const current = heroSlides[index] ?? heroSlides[0]!;

  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => setShowControls(false), 2600);
  }, []);

  const reveal = useCallback(() => {
    setShowControls(true);
    scheduleHide();
  }, [scheduleHide]);

  return (
    <section className="relative isolate min-h-[88svh] overflow-hidden bg-primary text-primary-foreground">
      <div ref={containerRef} className="absolute inset-0 -z-10">
        {heroSlides.map((slide, i) => (
          <video
            key={slide.id}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            src={loaded.includes(i) ? slide.src : undefined}
            poster={slide.poster}
            autoPlay={i === 0 && !reduced}
            muted={muted}
            loop={false}
            playsInline
            preload={i === 0 ? "auto" : loaded.includes(i) ? "metadata" : "none"}
            aria-hidden="true"
            tabIndex={-1}
            onEnded={() => i === index && goTo(index + 1)}
            onCanPlay={(e) => {
              if (i !== index || !playing || reduced) return;
              const v = e.currentTarget;
              v.muted = muted;
              void v.play().catch(() => setPlaying(false));
            }}
            onLoadedMetadata={(e) => i === index && setDuration(e.currentTarget.duration || slide.duration)}
            onTimeUpdate={(e) => i === index && setTime(e.currentTarget.currentTime)}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/35" />

      </div>

      <div className="container-page flex min-h-[88svh] flex-col justify-center gap-10 py-28">
        <div className="max-w-3xl">
          <span className="inline-flex w-fit rounded-full border border-gold/60 px-4 py-1 text-xs tracking-[0.2em] uppercase">
            Site officiel • {site_city}
          </span>
          <h1 className="mt-6 font-display text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl lg:text-6xl">
            Instruire l'esprit, former le cœur.
          </h1>
          <p className="mt-5 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
            École catholique à Bonoua-Château — de la maternelle à la terminale.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/admissions"
              className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-primary focus-visible:outline-none"
            >
              Demander une inscription
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-primary-foreground/45 px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:outline-none"
            >
              Visiter l'école
            </Link>
          </div>
        </div>

        {/* Contrôles vidéo : auto-hide au repos, révélés au survol / interaction */}
        <div
          ref={controlsRef}
          className="group relative mt-auto w-full max-w-3xl"
          onMouseEnter={reveal}
          onMouseLeave={() => {
            if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
            setShowControls(false);
          }}
          onTouchStart={reveal}
          onFocus={reveal}
        >
          {/* Barre de progression toujours visible, fine et discrète */}
          <div
            className="h-1 w-full cursor-pointer overflow-hidden rounded-full bg-primary-foreground/15"
            role="progressbar"
            aria-label="Progression de la vidéo"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round((time / (duration || current.duration)) * 100) || 0}
          >
            <div
              className="h-full rounded-full bg-gold transition-[width] duration-200"
              style={{ width: `${Math.min(100, (time / (duration || current.duration)) * 100)}%` }}
            />
          </div>

          {/* Panneau de contrôles rétractable */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${
              showControls ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-3 rounded-2xl border border-primary-foreground/15 bg-ink/60 p-4 backdrop-blur-md sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    Vidéo {String(index + 1).padStart(2, "0")} • {current.duration} sec
                  </p>
                  <p className="truncate text-xs text-primary-foreground/75">{current.title}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    aria-label={playing ? "Mettre en pause la vidéo" : "Lire la vidéo"}
                    onClick={() => {
                      reveal();
                      const v = videoRefs.current[index];
                      if (!v) return;
                      if (playing) {
                        v.pause();
                        setPlaying(false);
                      } else {
                        void v.play().catch(() => undefined);
                        setPlaying(true);
                      }
                    }}
                    className="grid size-10 place-items-center rounded-full bg-primary-foreground/15 transition-colors hover:bg-primary-foreground/25 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                  >
                    {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                  </button>
                  <button
                    type="button"
                    aria-label={muted ? "Activer le son" : "Couper le son"}
                    onClick={() => {
                      reveal();
                      setMuted((m) => !m);
                    }}
                    className="grid size-10 place-items-center rounded-full bg-primary-foreground/15 transition-colors hover:bg-primary-foreground/25 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                  >
                    {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                  </button>
                  <button
                    type="button"
                    aria-label="Afficher la vidéo en plein écran"
                    onClick={() => {
                      reveal();
                      void videoRefs.current[index]?.requestFullscreen?.().catch(() => undefined);
                    }}
                    className="hidden size-10 place-items-center rounded-full bg-primary-foreground/15 transition-colors hover:bg-primary-foreground/25 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none sm:grid"
                  >
                    <Maximize2 className="size-4" />
                  </button>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3 text-xs tabular-nums">
                <span className="shrink-0 font-mono opacity-80">
                  {fmt(time)} / {fmt(duration || current.duration)}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {heroSlides.map((slide, i) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => {
                        reveal();
                        goTo(i);
                      }}
                      aria-label={`Afficher la vidéo ${String(i + 1).padStart(2, "0")} : ${slide.title}`}
                      aria-current={i === index}
                      className={`grid size-8 place-items-center rounded-full text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none ${
                        i === index
                          ? "bg-gold text-gold-foreground"
                          : "bg-primary-foreground/10 text-primary-foreground/80 hover:bg-primary-foreground/20"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Indication subtile au repos */}
          {!showControls && (
            <p className="pointer-events-none absolute -top-6 right-0 text-[10px] tracking-wider text-primary-foreground/40 opacity-0 transition-opacity group-hover:opacity-100 sm:text-xs">
              Survolez pour les contrôles
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

const site_city = "Bonoua";
