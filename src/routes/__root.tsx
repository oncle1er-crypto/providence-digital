import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ScrollToTop } from "../components/ScrollToTop";
import { RouteProgress } from "../components/RouteProgress";
import { PageTransition } from "../components/PageTransition";
import { CookieConsent } from "../components/CookieConsent";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { FloatingActions } from "../components/FloatingActions";
import { nav } from "../data/site";
import { DEFAULT_OG_IMAGE } from "../lib/seo";

function NotFoundComponent() {
  return (
    <>
      <Header />
      <main className="container-page flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
        <p className="font-display text-7xl font-semibold text-gold">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Page introuvable</h1>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">
          La page demandée n'existe pas ou a été déplacée. Vous pouvez revenir à l'accueil ou
          découvrir l'une des rubriques du site.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="btn-glow btn-press inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Retour à l'accueil
          </Link>
          <Link
            to="/contact"
            className="btn-press inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            Nous contacter
          </Link>
        </div>
        <nav
          aria-label="Rubriques du site"
          className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm"
        >
          {nav
            .filter((item) => item.to !== "/")
            .map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                {item.label}
              </Link>
            ))}
        </nav>
      </main>
      <Footer />
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Cette page n'a pas pu être chargée
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Une erreur est survenue. Vous pouvez réessayer ou revenir à l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "google-site-verification",
        content: "6JKvmCq86wcDPaJECkLCt4-HK8JP0JKfROk8BjVqYdE",
      },
      { title: "Complexe Scolaire La Providence de Don Orione | Bonoua" },
      {
        name: "description",
        content:
          "Site officiel du Complexe Scolaire La Providence de Don Orione à Bonoua : maternelle, primaire, collège et lycée.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "La Providence de Don Orione" },
      { property: "og:locale", content: "fr_CI" },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/logo-gsp.png" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <a href="#contenu" className="skip-link">
        Aller au contenu principal
      </a>
      <RouteProgress />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <PageTransition routeKey={pathname}>
        <div id="contenu" tabIndex={-1}>
          <Outlet />
        </div>
      </PageTransition>
      <ScrollToTop />
      <FloatingActions />
      <CookieConsent />
    </QueryClientProvider>
  );
}
