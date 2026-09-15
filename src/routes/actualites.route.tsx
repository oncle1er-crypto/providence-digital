import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Route « layout » des actualités : elle héberge la liste (`actualites.index.tsx`)
 * et les pages d'article (`actualites.$slug.tsx`).
 */
export const Route = createFileRoute("/actualites")({
  component: () => <Outlet />,
});
