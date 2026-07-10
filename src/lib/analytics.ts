// Lightweight analytics dispatcher for the multi-step quote flow.
// - Pushes to window.dataLayer so GTM / GA4 pick events up when configured.
// - Also emits a CustomEvent("lovable:analytics") for any listener.
// - Console-logs in dev so you can watch drop-off without any provider wired up.
//
// No PII should ever be passed in. Only shape/step metadata + selected service.

export type QuoteSource = {
  source?: "contact-form" | "gallery-tile" | "gallery-lightbox";
  photo?: string;
  category?: string;
};

export type QuoteAnalyticsEvent =
  | ({ name: "quote_step_enter"; step: number; step_label: string; service?: string } & QuoteSource)
  | ({ name: "quote_step_complete"; step: number; step_label: string; service?: string } & QuoteSource)
  | ({
      name: "quote_validation_error";
      step: number;
      step_label: string;
      service?: string;
      fields: string[];
    } & QuoteSource)
  | ({ name: "quote_review_view"; service?: string } & QuoteSource)
  | ({ name: "quote_submit_attempt"; service?: string } & QuoteSource)
  | ({ name: "quote_submit_success"; service?: string } & QuoteSource)
  | ({ name: "quote_submit_error"; service?: string; message?: string } & QuoteSource);

export type GallerySurface = "gallery" | "lightbox" | "tile" | (string & {});

export type GalleryAnalyticsEvent =
  | { name: "gallery_tile_click"; index: number; title: string; category: string; surface?: GallerySurface }
  | { name: "gallery_lightbox_open"; index: number; title: string; category: string; surface?: GallerySurface }
  | { name: "gallery_lightbox_close"; index: number; title: string; surface?: GallerySurface }
  | { name: "gallery_lightbox_navigate"; direction: "prev" | "next"; index: number; title: string; surface?: GallerySurface }
  | { name: "gallery_quote_cta_click"; index: number; title: string; category: string; service: string; surface: GallerySurface };

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
};

export function trackQuoteEvent(event: QuoteAnalyticsEvent) {
  emit(event);
}

export function trackGalleryEvent(event: GalleryAnalyticsEvent) {
  emit(event);
}

function emit(event: QuoteAnalyticsEvent | GalleryAnalyticsEvent) {
  if (typeof window === "undefined") return;
  const payload = { ...event, event: event.name, ts: Date.now() };
  try {
    const w = window as DataLayerWindow;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(payload);
    window.dispatchEvent(new CustomEvent("lovable:analytics", { detail: payload }));
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug("[analytics]", payload);
    }
  } catch {
    // Never let analytics break the UI.
  }
}
