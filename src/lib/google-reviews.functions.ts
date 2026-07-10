import { createServerFn } from "@tanstack/react-start";

export type ReviewStatus = "ok" | "missing_config" | "error";

export type StarBreakdown = {
  five: number;
  four: number;
  three: number;
  two: number;
  one: number;
  sampleSize: number;
};

export type GoogleReviewsSummary = {
  rating: number;
  total: number;
  url: string;
  status: ReviewStatus;
  message?: string;
  breakdown?: StarBreakdown;
};

const FALLBACK_URL =
  "https://www.google.com/search?q=L.S+Fencing+%26+Metal+Work+Abbotsford";

const fallback = (
  status: ReviewStatus,
  message?: string,
): GoogleReviewsSummary => ({
  rating: 4.9,
  total: 55,
  url: FALLBACK_URL,
  status,
  message,
});

/**
 * Returns the LS Fencing Google Business rating/review count.
 * Live from Places API v1 when GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID are set.
 * Otherwise returns fallback with status="missing_config" so the UI can hint.
 */
export const getGoogleReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleReviewsSummary> => {
    const key = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!key || !placeId) {
      const missing = [
        !key && "GOOGLE_PLACES_API_KEY",
        !placeId && "GOOGLE_PLACE_ID",
      ]
        .filter(Boolean)
        .join(", ");
      return fallback("missing_config", `Missing env var(s): ${missing}`);
    }

    try {
      const res = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount,googleMapsUri,reviews`,
        { headers: { "X-Goog-Api-Key": key } },
      );
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        return fallback("error", `Places API ${res.status}: ${text.slice(0, 120)}`);
      }
      const data = (await res.json()) as {
        rating?: number;
        userRatingCount?: number;
        googleMapsUri?: string;
        reviews?: { rating?: number }[];
      };

      let breakdown: StarBreakdown | undefined;
      if (Array.isArray(data.reviews) && data.reviews.length > 0) {
        const b: StarBreakdown = { five: 0, four: 0, three: 0, two: 0, one: 0, sampleSize: 0 };
        for (const r of data.reviews) {
          const n = Math.round(r.rating ?? 0);
          if (n === 5) b.five++;
          else if (n === 4) b.four++;
          else if (n === 3) b.three++;
          else if (n === 2) b.two++;
          else if (n === 1) b.one++;
          b.sampleSize++;
        }
        breakdown = b;
      }

      return {
        rating: data.rating ?? 4.9,
        total: data.userRatingCount ?? 55,
        url: data.googleMapsUri ?? FALLBACK_URL,
        status: "ok",
        breakdown,
      };
    } catch (err) {
      return fallback(
        "error",
        err instanceof Error ? err.message : "Unknown fetch error",
      );
    }
  },
);
