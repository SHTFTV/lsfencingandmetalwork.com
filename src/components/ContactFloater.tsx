import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Phone, MessageSquare, Mail, X, Star, ExternalLink } from "lucide-react";
import { SITE } from "@/lib/site";
import { getGoogleReviews } from "@/lib/google-reviews.functions";

/**
 * Persistent right-side contact floater. Visible on every page load.
 * Clicking X hides it for the current session only — it returns on refresh.
 * Google reviews rating/count is fetched live (with a static fallback) so
 * the number stays accurate automatically.
 */
export function ContactFloater() {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const fetchReviews = useServerFn(getGoogleReviews);

  const { data: reviews } = useQuery({
    queryKey: ["google-reviews"],
    queryFn: () => fetchReviews(),
    staleTime: 1000 * 60 * 60, // 1 hour
    initialData: { rating: 4.9, total: 55, url: "https://www.google.com/search?q=L.S+Fencing+%26+Metal+Work+Abbotsford", live: false },
  });

  // Show as a bottom sheet on mobile, side panel on md+.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setMobileOpen(false);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  if (!visible) return null;

  const dismiss = () => setVisible(false);
  const smsHref = `sms:${SITE.phoneHref.replace("tel:", "")}`;

  const rating = reviews.rating.toFixed(1);
  const total = reviews.total;
  const reviewsUrl = reviews.url;

  // Stars: full/half/empty based on rating.
  const stars = Array.from({ length: 5 }, (_, i) => {
    const diff = reviews.rating - i;
    if (diff >= 1) return "full" as const;
    if (diff >= 0.5) return "half" as const;
    return "empty" as const;
  });

  return (
    <aside
      aria-label="Contact LS Fencing"
      className="fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 w-[230px] rounded-2xl border border-border bg-background/95 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/80 md:block"
    >
      <FloaterBody
        dismiss={dismiss}
        smsHref={smsHref}
        rating={rating}
        total={total}
        stars={stars}
        reviewsUrl={reviewsUrl}
      />
      {/* Mobile trigger button + sheet */}
      <MobileTrigger open={mobileOpen} setOpen={setMobileOpen} />
      {mobileOpen && (
        <MobileSheet
          onClose={() => setMobileOpen(false)}
          smsHref={smsHref}
          rating={rating}
          total={total}
          stars={stars}
          reviewsUrl={reviewsUrl}
        />
      )}
    </aside>
  );
}

type Star = "full" | "half" | "empty";

function StarRow({ stars }: { stars: Star[] }) {
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

function FloaterBody({
  dismiss,
  smsHref,
  rating,
  total,
  stars,
  reviewsUrl,
}: {
  dismiss: () => void;
  smsHref: string;
  rating: string;
  total: number;
  stars: Star[];
  reviewsUrl: string;
}) {
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

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
          aria-label={`Email LS Fencing at ${SITE.email}`}
          className={`group inline-flex items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-muted ${focusRing}`}
        >
          <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Email</span>
            <span className="truncate">{SITE.email}</span>
          </span>
        </a>

        {/* Google reviews summary + CTA */}
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
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
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

function MobileTrigger({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  if (open) return null;
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open contact panel"
      aria-expanded={open}
      className="fixed bottom-4 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
    >
      <Phone className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}

function MobileSheet({
  onClose,
  smsHref,
  rating,
  total,
  stars,
  reviewsUrl,
}: {
  onClose: () => void;
  smsHref: string;
  rating: string;
  total: number;
  stars: Star[];
  reviewsUrl: string;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Contact LS Fencing"
      className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl border-t border-border bg-background shadow-2xl md:hidden"
    >
      <FloaterBody
        dismiss={onClose}
        smsHref={smsHref}
        rating={rating}
        total={total}
        stars={stars}
        reviewsUrl={reviewsUrl}
      />
    </div>
  );
}
