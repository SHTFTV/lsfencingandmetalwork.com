import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/ls-fencing-logo.png";
import { SITE, NAV_PRIMARY, SERVICES } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-steel/95 backdrop-blur">
      {/* Top strip */}
      <div className="hidden md:block border-b border-border/40 bg-black/40">
        <div className="container-industrial flex items-center justify-between text-xs py-1.5 text-muted-foreground">
          <span className="uppercase tracking-widest">{SITE.territory}</span>
          <a href={SITE.emailHref} className="hover:text-foreground transition">{SITE.email}</a>
        </div>
      </div>

      <div className="container-industrial flex items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="LS Fencing & Metal Work" width={44} height={44} className="h-11 w-11" />
          <div className="leading-tight">
            <div className="font-display text-lg uppercase tracking-wide">LS Fencing</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">& Metal Work</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {NAV_PRIMARY.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="uppercase tracking-wide text-muted-foreground hover:text-foreground transition"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground uppercase tracking-wide shadow-[var(--shadow-weld)] hover:brightness-110 transition"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">{SITE.phone}</span>
            <span className="sm:hidden">Call</span>
          </a>
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-sm border border-border p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-card">
          <div className="container-industrial py-4 grid gap-1">
            {NAV_PRIMARY.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-sm uppercase tracking-wide">
                {n.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-border/60 text-xs uppercase tracking-widest text-muted-foreground">Services</div>
            {SERVICES.map((s) => (
              <Link key={s.to} to={s.to} onClick={() => setOpen(false)} className="py-1.5 text-sm text-muted-foreground">
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
