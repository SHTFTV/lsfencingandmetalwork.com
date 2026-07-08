// Lightweight analytics dispatcher for the multi-step quote flow.
// - Pushes to window.dataLayer so GTM / GA4 pick events up when configured.
// - Also emits a CustomEvent("lovable:analytics") for any listener.
// - Console-logs in dev so you can watch drop-off without any provider wired up.
//
// No PII should ever be passed in. Only shape/step metadata + selected service.

export type QuoteAnalyticsEvent =
  | { name: "quote_step_enter"; step: number; step_label: string; service?: string }
  | { name: "quote_step_complete"; step: number; step_label: string; service?: string }
  | {
      name: "quote_validation_error";
      step: number;
      step_label: string;
      service?: string;
      fields: string[];
    }
  | { name: "quote_review_view"; service?: string }
  | { name: "quote_submit_attempt"; service?: string }
  | { name: "quote_submit_success"; service?: string }
  | { name: "quote_submit_error"; service?: string; message?: string };

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
};

export function trackQuoteEvent(event: QuoteAnalyticsEvent) {
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
