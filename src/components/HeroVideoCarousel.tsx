import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Maximize2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { heroSlides as defaultSlides } from "@/data/site";
import { mediaPublicUrl } from "@/lib/cms";
import { heroCompatibleVideos } from "@/lib/hero-video-compatibility";
import { Button } from "@/components/ui/button";

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
  const slides = useMemo<HeroSlideContent[]>(() => {
    const configured = content?.slides?.filter((slide) => slide.src && slide.title) ?? [];
    return (configured.length ? configured : defaultSlides).map((slide) => {
      const original = defaultSlides.find((item) => item.src === slide.src);
      return {
        ...slide,
        // Historical bundled URLs are not durable CMS media addresses.
        poster: slide.poster?.startsWith("/assets/") && original ? original.poster : slide.poster,
      };
    });
  }, [content?.slides]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(slides[0]?.duration ?? 8);
  const [reduced, setReduced] = useState(false);
  const [loaded, setLoaded] = useState<number[]>([0]);
  const [showControls, setShowControls] = useState(false);
  const [compatible, setCompatible] = useState(false);
  const [sequence, setSequence] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<number | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  useEffect(() => {
    const probe = document.createElement("video");
    setCompatible(!probe.canPlayType('video/mp4; codecs="avc1.640028"'));
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  const current = slides[index] ?? slides[0];

  useEffect(() => {
    const container = textRef.current;
    if (!container) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    // Browser-only loading keeps GSAP outside SSR and other page bundles.
    void import("gsap")
      .then(({ gsap }) => {
        if (cancelled) return;
        const media = gsap.matchMedia();
        media.add(
          "(prefers-reduced-motion: no-preference)",
          () => {
            const targets = container.querySelectorAll("[data-hero-part]");
            gsap
              .timeline()
              .fromTo(
                targets,
                { opacity: 0, y: 22, willChange: "transform, opacity" },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.65,
                  stagger: 0.16,
                  ease: "power3.out",
                  clearProps: "opacity,transform,willChange",
                },
              );
          },
          container,
        );
        cleanup = () => media.revert();
      })
      .catch(() => undefined); // Plain text and links remain visible if loading fails.
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [current?.id, sequence]);

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
      setSequence((value) => value + 1);
      setTime(0);
    },
    [slides.length],
  );

  useEffect(() => {
    const video = videoRefs.current[index];
    if (video) video.currentTime = 0;
    setDuration(slides[index]?.duration ?? 8);
  }, [index, sequence, slides]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.muted = muted;
        if (playing && !reduced) void video.play().catch(() => undefined);
        else video.pause();
      } else {
        video.pause();
      }
    });
  }, [index, sequence, playing, muted, reduced, compatible]);

  useEffect(() => {
    if (!playing || reduced || !slides.length) return;
    const elapsed = videoRefs.current[index]?.currentTime ?? 0;
    const ms = Math.max(0.1, (slides[index]?.duration ?? 8) - elapsed) * 1000;
    const timer = window.setTimeout(() => goTo(index + 1), ms);
    return () => window.clearTimeout(timer);
  }, [index, sequence, playing, reduced, goTo, slides]);

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
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={mediaPublicUrl(slide.poster) || slide.poster}
              alt=""
              aria-hidden="true"
              fetchPriority={i === 0 ? "high" : "auto"}
              loading={i === 0 ? "eager" : "lazy"}
              className="absolute inset-0 size-full object-cover object-center"
            />
            <video
              key={slide.id}
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              className="absolute inset-0 size-full object-cover object-center"
              src={
                loaded.includes(i)
                  ? (compatible && heroCompatibleVideos[slide.src]) ||
                    mediaPublicUrl(slide.src) ||
                    slide.src
                  : undefined
              }
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
                i === index &&
                setDuration(
                  Math.min(event.currentTarget.duration || slide.duration, slide.duration),
                )
              }
              onTimeUpdate={(event) => i === index && setTime(event.currentTarget.currentTime)}
            />
          </div>
        ))}
        <div className="hero-shade absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/25" />
      </div>

      <div className="container-page flex min-h-[88svh] flex-col justify-center gap-10 py-28">
        <div ref={textRef} data-hero-sequence={sequence} className="max-w-3xl">
          <span
            data-hero-part="eyebrow"
            className="inline-flex w-fit rounded-full border border-gold/60 px-4 py-1 text-xs tracking-[0.2em] uppercase"
          >
            {content?.eyebrow || "Site officiel • Bonoua"}
          </span>
          <h1
            data-hero-part="title"
            className="mt-6 font-display text-4xl leading-[1.02] font-semibold text-balance sm:text-6xl lg:text-7xl"
          >
            {content?.title || "Complexe Scolaire La Providence de Don Orione"}
            <span className="mt-3 block text-lg text-primary-foreground/85 sm:text-2xl lg:text-3xl">
              {content?.subtitle || "Bonoua — Instruire l'esprit, former le cœur."}
            </span>
          </h1>
          <p
            data-hero-part="description"
            className="mt-5 max-w-xl text-base text-primary-foreground/85 sm:text-lg"
          >
            {content?.description ||
              "École catholique à Bonoua-Château — de la maternelle à la terminale."}
          </p>
          <div data-hero-part="cta" className="mt-9 flex flex-wrap gap-3">
            <Button
              asChild
              className="h-auto rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground hover:bg-gold/90"
            >
              <Link to={primaryUrl as "/admissions"}>
                {content?.primary_label || "Demander une inscription"}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-full border-primary-foreground/45 bg-transparent px-7 py-3.5 text-sm font-semibold hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to={secondaryUrl as "/contact"}>
                {content?.secondary_label || "Visiter l'école"}
              </Link>
            </Button>
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
          <div
            className={`overflow-hidden transition-all duration-500 focus-within:max-h-72 focus-within:opacity-100 ${showControls ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="mt-3 rounded-2xl border border-primary-foreground/15 bg-ink/60 p-4 backdrop-blur-md sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    Vidéo {String(index + 1).padStart(2, "0")} • {current.duration} sec
                  </p>
                  <p className="truncate text-xs text-primary-foreground/75">{current.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    aria-label={playing ? "Mettre en pause" : "Lire"}
                    onClick={() => {
                      reveal();
                      const video = videoRefs.current[index];
                      if (!video) return;
                      if (playing) video.pause();
                      else void video.play().catch(() => setPlaying(false));
                      setPlaying(!playing);
                    }}
                    className="grid size-10 place-items-center rounded-full bg-primary-foreground/15"
                  >
                    {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    aria-label={muted ? "Activer le son" : "Couper le son"}
                    onClick={() => {
                      reveal();
                      setMuted((value) => !value);
                    }}
                    className="grid size-10 place-items-center rounded-full bg-primary-foreground/15"
                  >
                    {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    aria-label="Plein écran"
                    onClick={() =>
                      void videoRefs.current[index]?.requestFullscreen?.().catch(() => undefined)
                    }
                    className="hidden size-10 place-items-center rounded-full bg-primary-foreground/15 sm:grid"
                  >
                    <Maximize2 className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs tabular-nums">
                <span className="shrink-0 font-mono opacity-80">
                  {fmt(time)} / {fmt(duration || current.duration)}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {slides.map((slide, i) => (
                    <motion.button
                      key={slide.id}
                      type="button"
                      onClick={() => {
                        reveal();
                        goTo(i);
                      }}
                      aria-label={`Afficher ${slide.title}`}
                      className={`relative grid size-8 place-items-center rounded-full text-xs font-semibold ${i === index ? "text-gold-foreground" : "bg-primary-foreground/10"}`}
                    >
                      {i === index && (
                        <motion.span
                          layoutId="hero-dot-active"
                          className="absolute inset-0 rounded-full bg-gold"
                        />
                      )}
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
