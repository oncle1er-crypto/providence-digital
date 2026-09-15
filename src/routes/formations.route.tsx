import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Route « layout » des formations : elle héberge la présentation des cycles
 * (`formations.index.tsx`) et le détail de chaque cycle (`formations.$slug.tsx`).
 */
export const Route = createFileRoute("/formations")({
  component: () => <Outlet />,
});
