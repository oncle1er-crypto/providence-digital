import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/seo";
import { getPublicNews } from "@/lib/cms";

const publicRoutes: Array<{ path: string; priority?: string }> = [
  { path: "/", priority: "1.0" },
  { path: "/notre-ecole", priority: "0.8" },
  { path: "/formations", priority: "0.9" },
  { path: "/formations/maternelle", priority: "0.7" },
  { path: "/formations/primaire", priority: "0.7" },
  { path: "/formations/college", priority: "0.7" },
  { path: "/formations/lycee", priority: "0.7" },
  { path: "/vie-scolaire", priority: "0.7" },
  { path: "/actualites", priority: "0.8" },
  { path: "/admissions", priority: "0.9" },
  { path: "/contact", priority: "0.7" },
  { path: "/mentions-legales", priority: "0.3" },
  { path: "/politique-confidentialite", priority: "0.3" },
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);

        const news = await getPublicNews(50).catch(() => []);

        const urls = [
          ...publicRoutes.map(({ path, priority }) => {
            const priorityTag = priority ? `<priority>${priority}</priority>` : "";
            return `  <url><loc>${escapeXml(`${SITE_URL}${path}`)}</loc><lastmod>${today}</lastmod>${priorityTag}</url>`;
          }),
          ...news.map((item) => {
            const lastmod = item.published_at
              ? new Date(item.published_at).toISOString().slice(0, 10)
              : today;
            return `  <url><loc>${escapeXml(`${SITE_URL}/actualites/${item.slug}`)}</loc><lastmod>${lastmod}</lastmod><priority>0.6</priority></url>`;
          }),
        ].join("\n");

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
