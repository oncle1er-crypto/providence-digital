import { Link } from "@tanstack/react-router";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/60">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src={site.logo} alt={`Logo ${site.name}`} className="h-12 w-auto" />
            <span className="font-display text-lg font-semibold">La Providence</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">{site.intro}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">Navigation</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/notre-ecole" className="hover:text-foreground">Notre école</Link></li>
            <li><Link to="/vie-scolaire" className="hover:text-foreground">Vie scolaire</Link></li>
            <li><Link to="/admissions" className="hover:text-foreground">Admissions</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">Coordonnées</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>{site.contact.address}</li>
            <li>{site.contact.phone}</li>
            <li>{site.contact.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {site.name}. Tous droits réservés.
      </div>
    </footer>
  );
}
