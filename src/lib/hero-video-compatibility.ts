import classe from "@/assets/video/hero-classe.webm.asset.json";
import cour from "@/assets/video/hero-cour.webm.asset.json";
import groupe from "@/assets/video/hero-groupe.webm.asset.json";
import sport from "@/assets/video/hero-sport.webm.asset.json";
import institutionnel from "@/assets/video/la-providence-01-institutionnel.webm.asset.json";
import vie from "@/assets/video/la-providence-02-vie-scolaire.webm.asset.json";
import excellence from "@/assets/video/la-providence-03-excellence.webm.asset.json";
import espaces from "@/assets/video/la-providence-04-espaces.webm.asset.json";

/** Original MP4s remain the default; these derivatives cover browsers without H.264. */
export const heroCompatibleVideos: Record<string, string> = {
  "/media/hero-classe.mp4": classe.url,
  "/media/hero-cour.mp4": cour.url,
  "/media/hero-groupe.mp4": groupe.url,
  "/media/hero-sport.mp4": sport.url,
  "/media/la-providence-01-institutionnel.mp4": institutionnel.url,
  "/media/la-providence-02-vie-scolaire.mp4": vie.url,
  "/media/la-providence-03-excellence.mp4": excellence.url,
  "/media/la-providence-04-espaces.mp4": espaces.url,
};
