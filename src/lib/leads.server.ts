// Server-only helpers for lead notification emails.
// Imported by src/lib/leads.functions.ts (kept separate per TanStack server-fn
// splitting rules — sibling helpers in a .functions.ts file get stripped).

export const NOTIFY_EMAIL = "lsfencingandmetalwork@gmail.com";

export type LeadEmailData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  linearFeet: number | null;
  fenceHeight: string | null;
  gate: string | null;
  city: string;
  postal: string | null;
  timeline: string | null;
  notes: string | null;
  source: string | null;
};

export type EmailTemplate = {
  subject: string;
  intro: string;
  footer: string;
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const SAMPLE_LEAD: LeadEmailData = {
  name: "Sample Customer",
  phone: "604-555-0123",
  email: "sample.customer@example.com",
  service: "Cedar Fencing",
  linearFeet: 120,
  fenceHeight: "6 ft",
  gate: "Single walk gate",
  city: "Chilliwack",
  postal: "V2R 0A1",
  timeline: "Within 2 weeks",
  notes: "This is a preview / test message — no real customer submitted this.",
  source: "admin-test",
};

const tokenize = (tpl: string, lead: LeadEmailData) =>
  tpl
    .replace(/\{\{name\}\}/g, lead.name)
    .replace(/\{\{service\}\}/g, lead.service)
    .replace(/\{\{city\}\}/g, lead.city)
    .replace(/\{\{phone\}\}/g, lead.phone)
    .replace(/\{\{email\}\}/g, lead.email);

export function renderLeadEmail(tpl: EmailTemplate, lead: LeadEmailData) {
  const subject = tokenize(tpl.subject, lead);
  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Service", lead.service],
    ["Linear feet", lead.linearFeet ? `${lead.linearFeet} ft` : "—"],
    ["Fence height", lead.fenceHeight ?? "—"],
    ["Gate", lead.gate ?? "—"],
    ["City", lead.city],
    ["Postal", lead.postal ?? "—"],
    ["Timeline", lead.timeline ?? "—"],
    ["Notes", lead.notes ?? "—"],
    ["Source", lead.source ?? "—"],
  ];

  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#374151;width:140px;">${escapeHtml(
          k,
        )}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;">${escapeHtml(
          v,
        )}</td></tr>`,
    )
    .join("");

  const intro = tokenize(tpl.intro, lead);
  const footer = tokenize(tpl.footer, lead);

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#111827;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
    <div style="background:#111827;color:#f97316;padding:16px 24px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;font-size:12px;">LS Fencing &amp; Metal Work — New Lead</div>
    <div style="padding:20px 24px;">
      <p style="margin:0 0 16px;font-size:15px;line-height:1.5;">${escapeHtml(intro)}</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${rowsHtml}</table>
      <p style="margin:20px 0 0;font-size:13px;color:#6b7280;line-height:1.5;">${escapeHtml(footer)}</p>
    </div>
  </div>
</body></html>`;

  const text = [
    intro,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    footer,
  ].join("\n");

  return { subject, html, text };
}

export type DeliveryResult = { ok: true; attempts: number } | { ok: false; attempts: number; error: string };

// Send via Formsubmit with exponential backoff. No secret / no domain required.
export async function sendLeadNotification(
  tpl: EmailTemplate,
  lead: LeadEmailData,
  opts: { maxAttempts?: number } = {},
): Promise<DeliveryResult> {
  const maxAttempts = opts.maxAttempts ?? 3;
  const { subject, html, text } = renderLeadEmail(tpl, lead);
  const body = {
    _subject: subject,
    _template: "box",
    _captcha: "false",
    _replyto: lead.email,
    message: text,
    html_body: html,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    service: lead.service,
    city: lead.city,
  };

  let lastErr = "unknown error";
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_EMAIL)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(body),
        },
      );
      if (res.ok) return { ok: true, attempts: attempt };
      lastErr = `HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`;
      // 4xx (except 429) won't get better on retry
      if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        return { ok: false, attempts: attempt, error: lastErr };
      }
    } catch (e) {
      lastErr = (e as Error)?.message ?? String(e);
    }
    if (attempt < maxAttempts) {
      const delay = 500 * Math.pow(3, attempt - 1); // 500ms, 1.5s, 4.5s
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  return { ok: false, attempts: maxAttempts, error: lastErr };
}
