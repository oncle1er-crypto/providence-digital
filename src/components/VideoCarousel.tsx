import { HCarousel } from "@/components/HCarousel";
import { VideoCard } from "@/components/VideoCard";
import { schoolLifeClips } from "@/data/site";

export function VideoCarousel() {
  return (
    <HCarousel
      label="Vie scolaire en vidéo"
      items={schoolLifeClips.map((clip) => (
        <VideoCard key={clip.id} clip={clip} />
      ))}
    />
  );
}
