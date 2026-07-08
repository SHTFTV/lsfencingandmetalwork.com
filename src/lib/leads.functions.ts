import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

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

    return { ok: true as const, id: inserted.id };
  });

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const isAdmin = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (isAdmin.error) throw new Error("Could not verify permissions");
    if (!isAdmin.data) throw new Error("Forbidden");

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
    const isAdmin = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (isAdmin.error || !isAdmin.data) throw new Error("Forbidden");

    const { error } = await context.supabase
      .from("leads")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });
