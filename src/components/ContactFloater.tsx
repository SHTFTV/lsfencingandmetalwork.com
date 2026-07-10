import { useState } from "react";
import { Phone, MessageSquare, Mail, X, Star } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Persistent right-side contact floater. Visible on every page load.
 * Clicking X hides it for the current session only — it returns on refresh.
 */
export function ContactFloater() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const dismiss = () => setVisible(false);


  const smsHref = `sms:${SITE.phoneHref.replace("tel:", "")}`;

  return (
    <aside
      aria-label="Contact LS Fencing"
      className="fixed right-3 top-1/2 z-40 -translate-y-1/2 w-[220px] rounded-2xl border border-border bg-background/95 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Hide contact panel"
        className="absolute -top-2 -right-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-md hover:text-foreground hover:bg-muted"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <div className="px-4 pt-4 pb-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Talk to LS Fencing
        </p>
        <p className="mt-0.5 text-sm font-semibold text-foreground leading-tight">
          Free on-site quotes
        </p>
      </div>

      <div className="flex flex-col gap-1.5 px-3 pb-3">
        <a
          href={SITE.phoneHref}
          className="group inline-flex items-center gap-2.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          <Phone className="h-4 w-4 shrink-0" />
          <span className="flex flex-col leading-tight">
            <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">
              Call
            </span>
            <span>{SITE.phone}</span>
          </span>
        </a>

        <a
          href={smsHref}
          className="group inline-flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted"
        >
          <MessageSquare className="h-4 w-4 shrink-0" />
          <span className="flex flex-col leading-tight">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Text
            </span>
            <span>{SITE.phone}</span>
          </span>
        </a>

        <a
          href={SITE.emailHref}
          className="group inline-flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-muted break-all"
        >
          <Mail className="h-4 w-4 shrink-0" />
          <span className="flex flex-col leading-tight min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              Email
            </span>
            <span className="truncate">{SITE.email}</span>
          </span>
        </a>
      </div>
    </aside>
  );
}
