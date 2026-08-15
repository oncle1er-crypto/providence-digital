import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { VideoSlide } from "@/data/site";

export function VideoCard({ clip }: { clip: VideoSlide }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <video
          ref={ref}
          className="size-full object-cover"
          poster={clip.poster}
          src={clip.src}
          preload="none"
          muted
          loop
          playsInline
          aria-label={`Vidéo : ${clip.title}`}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        <button
          type="button"
          aria-label={playing ? `Mettre en pause : ${clip.title}` : `Lire la vidéo : ${clip.title}`}
          onClick={() => {
            const v = ref.current;
            if (!v) return;
            if (v.paused) void v.play().catch(() => undefined);
            else v.pause();
          }}
          className="absolute inset-0 grid place-items-center bg-primary/25 transition-colors hover:bg-primary/35 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
        >
          <span className="grid size-14 place-items-center rounded-full bg-gold text-gold-foreground shadow-lg">
            {playing ? <Pause className="size-6" /> : <Play className="size-6" />}
          </span>
        </button>
        <span className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-primary/80 px-3 py-1 text-xs font-semibold text-primary-foreground">
          {clip.duration} sec
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold">{clip.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{clip.description}</p>
      </div>
    </article>
  );
}
