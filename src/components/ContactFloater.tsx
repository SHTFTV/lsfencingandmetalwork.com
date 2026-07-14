import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Phone,
  MessageSquare,
  Mail,
  X,
  Star,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { trackFloaterClick } from "@/lib/analytics";
import {
  getGoogleReviews,
  type GoogleReviewsSummary,
  type StarBreakdown,
} from "@/lib/google-reviews.functions";


const INITIAL: GoogleReviewsSummary = {
  rating: 4.9,
  total: 55,
  url: "https://www.google.com/search?q=L.S+Fencing+%26+Metal+Work+Abbotsford",
  status: "missing_config",
};

/**
 * Persistent right-side contact floater. Visible on every page load.
 * Clicking X hides it for the current session only — it returns on refresh.
 * Google review data is fetched live (Places API v1) when secrets are set,
 * otherwise the static fallback 4.9 / 55 is shown.
 */
export function ContactFloater() {
  const [visible, setVisible] = useState(true);
  const fetchReviews = useServerFn(getGoogleReviews);

  const { data: reviews } = useQuery({
    queryKey: ["google-reviews"],
    queryFn: () => fetchReviews(),
    staleTime: 1000 * 60 * 60,
    initialData: INITIAL,
  });

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    if (reviews.status === "missing_config") {
      // eslint-disable-next-line no-console
      console.warn(
        `[ContactFloater] Google reviews are showing the static fallback. ${reviews.message ?? ""} Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID to enable live data.`,
      );
    } else if (reviews.status === "error") {
      // eslint-disable-next-line no-console
      console.warn(`[ContactFloater] Google Places fetch failed: ${reviews.message ?? "unknown error"}. Showing fallback.`);
    }
  }, [reviews.status, reviews.message]);

  // Escape key dismisses — matches native dialog/menu keyboard expectations
  // and helps keyboard/screen-reader users who land on the floater on mobile.
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setVisible(false);
        trackFloaterClick({ action: "dismiss", to: "keyboard:escape" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => {
    trackFloaterClick({ action: "dismiss" });
    setVisible(false);
  };
  const smsNumber = "604-808-7496";
  const smsHref = `sms:+16048087496`;
  const rating = reviews.rating.toFixed(1);

  const stars = Array.from({ length: 5 }, (_, i) => {
    const diff = reviews.rating - i;
    if (diff >= 1) return "full" as const;
    if (diff >= 0.5) return "half" as const;
    return "empty" as const;
  });

  return (
    <aside
      aria-label="Contact LS Fencing"
      data-testid="contact-floater"
      className="fixed right-2 top-1/2 z-40 -translate-y-1/2 w-[230px] max-w-[calc(100vw-1rem)] rounded-2xl border border-border bg-background/95 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <FloaterBody
        dismiss={dismiss}
        smsHref={smsHref}
        smsNumber={smsNumber}
        rating={rating}
        total={reviews.total}
        stars={stars}
        reviewsUrl={reviews.url}
        status={reviews.status}
        message={reviews.message}
        breakdown={reviews.breakdown}
      />
    </aside>
  );
}


type StarKind = "full" | "half" | "empty";

function StarRow({ stars }: { stars: StarKind[] }) {
  return (
    <span className="flex shrink-0" aria-hidden="true">
      {stars.map((s, i) => (
        <span key={i} className="relative inline-block h-3.5 w-3.5">
          <Star className="absolute inset-0 h-3.5 w-3.5 text-yellow-400/30" />
          {s !== "empty" && (
            <span
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: s === "full" ? "100%" : "50%" }}
            >
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            </span>
          )}
        </span>
      ))}
    </span>
  );
}

function BreakdownBar({ label, count, max }: { label: string; count: number; max: number }) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
      <span className="w-4 shrink-0 text-right tabular-nums">{label}</span>
      <Star className="h-2.5 w-2.5 shrink-0 fill-yellow-400 text-yellow-400" aria-hidden="true" />
      <span className="relative h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-yellow-400"
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="w-4 shrink-0 text-right tabular-nums">{count}</span>
    </div>
  );
}

function FloaterBody({
  dismiss,
  smsHref,
  smsNumber,
  rating,
  total,
  stars,
  reviewsUrl,
  status,
  message,
  breakdown,
}: {
  dismiss: () => void;
  smsHref: string;
  smsNumber: string;
  rating: string;
  total: number;
  stars: StarKind[];
  reviewsUrl: string;
  status: GoogleReviewsSummary["status"];
  message?: string;
  breakdown?: StarBreakdown;
}) {
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const maxCount = breakdown
    ? Math.max(breakdown.five, breakdown.four, breakdown.three, breakdown.two, breakdown.one, 1)
    : 1;

  return (
    <>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Hide contact panel"
        className={`absolute -top-2 -right-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-md hover:text-foreground hover:bg-muted ${focusRing}`}
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
          onClick={() => trackFloaterClick({ action: "call", to: SITE.phoneHref })}
          aria-label={`Call LS Fencing at ${SITE.phone}`}
          className={`group inline-flex items-center gap-2.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 ${focusRing}`}
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">Call</span>
            <span className="truncate">{SITE.phone}</span>
          </span>
        </a>

        <a
          href={smsHref}
          onClick={() => trackFloaterClick({ action: "text", to: smsHref })}
          aria-label={`Text LS Fencing at ${SITE.phone}`}
          className={`group inline-flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted ${focusRing}`}
        >
          <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Text</span>
            <span className="truncate">{SITE.phone}</span>
          </span>
        </a>

        <a
          href={SITE.emailHref}
          onClick={() => trackFloaterClick({ action: "email", to: SITE.emailHref })}
          aria-label={`Email LS Fencing at ${SITE.email}`}
          className={`group inline-flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-muted ${focusRing}`}
        >
          <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Email</span>
            <span className="truncate">{SITE.email}</span>
          </span>
        </a>

        <div className="mt-1 rounded-lg border border-border bg-muted/30 p-2.5">
          <div
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2"
            role="group"
            aria-label={`Rated ${rating} out of 5 from ${total} Google reviews`}
          >
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Google Reviews
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-foreground">{rating}</span>
                <StarRow stars={stars} />
              </span>
            </div>
            <span className="shrink-0 rounded-full bg-background px-2 py-0.5 text-[11px] font-medium text-foreground border border-border">
              {total}
            </span>
          </div>

          {/* Dev-only debug hint when live data is unavailable */}
          {import.meta.env.DEV && status === "missing_config" && (
            <p
              role="status"
              className="mt-2 flex items-start gap-1.5 rounded-md border border-dashed border-amber-500/50 bg-amber-500/10 p-1.5 text-[10px] leading-tight text-amber-700 dark:text-amber-300"
            >
              <AlertTriangle className="mt-px h-3 w-3 shrink-0" aria-hidden="true" />
              <span className="min-w-0">
                Live data off — set <code className="font-mono">GOOGLE_PLACES_API_KEY</code> &{" "}
                <code className="font-mono">GOOGLE_PLACE_ID</code>.
              </span>
            </p>
          )}

          {status === "error" && (
            <p
              role="status"
              className="mt-2 flex items-start gap-1.5 rounded-md border border-dashed border-border bg-background/60 p-1.5 text-[10px] leading-tight text-muted-foreground"
            >
              <AlertTriangle className="mt-px h-3 w-3 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="min-w-0">
                Live rating unavailable — showing recent snapshot.
                {import.meta.env.DEV && message ? <span className="block opacity-70">{message}</span> : null}
              </span>
            </p>
          )}

          {status === "ok" && breakdown && breakdown.sampleSize > 0 && (
            <div
              className="mt-2 space-y-0.5"
              aria-label={`Star breakdown from ${breakdown.sampleSize} recent reviews`}
            >
              <BreakdownBar label="5" count={breakdown.five} max={maxCount} />
              <BreakdownBar label="4" count={breakdown.four} max={maxCount} />
              <BreakdownBar label="3" count={breakdown.three} max={maxCount} />
              <BreakdownBar label="2" count={breakdown.two} max={maxCount} />
              <BreakdownBar label="1" count={breakdown.one} max={maxCount} />
              <p className="pt-0.5 text-[9px] italic text-muted-foreground">
                Based on {breakdown.sampleSize} recent reviews
              </p>
            </div>
          )}

          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackFloaterClick({ action: "reviews", to: reviewsUrl })}
            aria-label={`Read all ${total} Google reviews (opens in a new tab)`}
            className={`mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-foreground px-2.5 py-1.5 text-[11px] font-semibold text-background hover:bg-foreground/90 ${focusRing}`}
          >
            <span>Read Google Reviews</span>
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </>
  );
}
