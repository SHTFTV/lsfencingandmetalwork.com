import { createServerFn } from "@tanstack/react-start";

export type GoogleReviewsSummary = {
  rating: number;
  total: number;
  url: string;
  live: boolean;
};

const FALLBACK: GoogleReviewsSummary = {
  rating: 4.9,
  total: 55,
  url: "https://www.google.com/search?q=L.S+Fencing+%26+Metal+Work+Abbotsford",
  live: false,
};

/**
 * Returns the LS Fencing Google Business rating/review count.
 * If GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID env vars are set, fetches live
 * data from the Google Places API. Otherwise returns known static values.
 */
export const getGoogleReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleReviewsSummary> => {
    const key = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;
    if (!key || !placeId) return FALLBACK;

    try {
      const res = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount,googleMapsUri`,
        { headers: { "X-Goog-Api-Key": key } },
      );
      if (!res.ok) return FALLBACK;
      const data = (await res.json()) as {
        rating?: number;
        userRatingCount?: number;
        googleMapsUri?: string;
      };
      return {
        rating: data.rating ?? FALLBACK.rating,
        total: data.userRatingCount ?? FALLBACK.total,
        url: data.googleMapsUri ?? FALLBACK.url,
        live: true,
      };
    } catch {
      return FALLBACK;
    }
  },
);
