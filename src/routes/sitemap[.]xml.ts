import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/seo";

const publicRoutes = [
  "/",
  "/notre-ecole",
  "/formations",
  "/vie-scolaire",
  "/actualites",
  "/admissions",
  "/contact",
] as const;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = publicRoutes
          .map((path) => {
            const priority = path === "/" ? "<priority>1.0</priority>" : "";
            return `  <url><loc>${SITE_URL}${path}</loc>${priority}</url>`;
          })
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=3600",
          },
        });
      },
    },
  },
});
