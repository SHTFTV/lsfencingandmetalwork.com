import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  SAMPLE_LEAD,
  sendLeadNotification,
  renderLeadEmail,
  type EmailTemplate,
  type LeadEmailData,
} from "./leads.server";

const leadSchema = z.object({
  service: z.string().min(1).max(80),
  linearFeet: z.number().int().min(0).max(100000).optional().nullable(),
  fenceHeight: z.string().max(20).optional().nullable(),
  gate: z.string().max(80).optional().nullable(),
  city: z.string().min(1).max(80),
  postal: z.string().max(20).optional().nullable(),
  timeline: z.string().max(40).optional().nullable(),
  name: z.string().min(1).max(120),
  phone: z.string().min(4).max(40),
  email: z.string().email().max(160),
  notes: z.string().max(2000).optional().nullable(),
  source: z.string().max(80).optional().nullable(),
});

export type LeadInput = z.infer<typeof leadSchema>;

const DEFAULT_TEMPLATE: EmailTemplate = {
  subject: "New lead: {{name}} — {{service}} ({{city}})",
  intro: "You have a new fencing inquiry from the LS Fencing website.",
  footer: "Reply to this email or call the customer directly.",
};

async function loadTemplate(): Promise<EmailTemplate> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("email_settings")
    .select("subject, intro, footer")
    .eq("id", 1)
    .maybeSingle();
  if (!data) return DEFAULT_TEMPLATE;
  return { subject: data.subject, intro: data.intro, footer: data.footer };
}

async function requireAdmin(context: { supabase: { rpc: Function }; userId: string }) {
  const isAdmin = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (isAdmin.error || !isAdmin.data) throw new Error("Forbidden");
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const userAgent = getRequestHeader("user-agent") ?? null;
    const ip =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
      null;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const row = {
      service: data.service,
      linear_feet: data.linearFeet ?? null,
      fence_height: data.fenceHeight ?? null,
      gate: data.gate ?? null,
      city: data.city,
      postal: data.postal ?? null,
      timeline: data.timeline ?? null,
      name: data.name,
      phone: data.phone,
      email: data.email,
      notes: data.notes ?? null,
      source: data.source ?? "contact-form",
      user_agent: userAgent,
      ip,
      delivery_status: "pending",
      retry_count: 0,
    };

    const { data: inserted, error } = await supabaseAdmin
      .from("leads")
      .insert(row)
      .select("id, created_at")
      .single();

    if (error) {
      console.error("[submitLead] insert failed", error);
      throw new Error("Could not save request. Please call us instead.");
    }

    // Send notification (up to 3 attempts, exponential backoff) and record outcome.
    const tpl = await loadTemplate();
    const leadForEmail: LeadEmailData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: data.service,
      linearFeet: data.linearFeet ?? null,
      fenceHeight: data.fenceHeight ?? null,
      gate: data.gate ?? null,
      city: data.city,
      postal: data.postal ?? null,
      timeline: data.timeline ?? null,
      notes: data.notes ?? null,
      source: data.source ?? "contact-form",
    };
    const result = await sendLeadNotification(tpl, leadForEmail, { maxAttempts: 3 });

    await supabaseAdmin
      .from("leads")
      .update(
        result.ok
          ? {
              delivery_status: "sent",
              retry_count: result.attempts - 1,
              delivered_at: new Date().toISOString(),
              last_delivery_error: null,
            }
          : {
              delivery_status: "failed",
              retry_count: result.attempts,
              last_delivery_error: result.error.slice(0, 500),
            },
      )
      .eq("id", inserted.id);

    return { ok: true as const, id: inserted.id, delivered: result.ok };
  });

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const { data, error } = await context.supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw error;
    return { leads: data ?? [] };
  });

export const updateLeadStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({
      id: z.string().uuid(),
      status: z.enum(["new", "contacted", "quoted", "won", "lost"]),
    }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { error } = await context.supabase
      .from("leads")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

export const getEmailTemplate = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const tpl = await loadTemplate();
    return { template: tpl, sample: SAMPLE_LEAD, preview: renderLeadEmail(tpl, SAMPLE_LEAD) };
  });

const templateSchema = z.object({
  subject: z.string().trim().min(3).max(200),
  intro: z.string().trim().min(1).max(1000),
  footer: z.string().trim().min(1).max(1000),
});

export const saveEmailTemplate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => templateSchema.parse(data))
  .handler(async ({ data, context }) => {
    await requireAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("email_settings")
      .upsert({ id: 1, ...data, updated_at: new Date().toISOString() });
    if (error) throw error;
    return { ok: true, template: data, preview: renderLeadEmail(data, SAMPLE_LEAD) };
  });

export const sendTestEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const tpl = await loadTemplate();
    const result = await sendLeadNotification(tpl, SAMPLE_LEAD, { maxAttempts: 3 });
    return result;
  });
