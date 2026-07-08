import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { PageShell, CtaStrip } from "@/components/PageShell";
import { SITE } from "@/lib/site";
import { submitLead } from "@/lib/leads.functions";
import { useState } from "react";
import { useForm, type UseFormRegister, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Check, ArrowRight, ArrowLeft, Loader2, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact LS Fencing & Metal Work — Free On-Site Quote" },
      { name: "description", content: "Call 604-808-7496 or request a fast quote for fencing, gates, welding or excavation across the Fraser Valley & Lower Mainland." },
      { property: "og:title", content: "Contact LS Fencing & Metal Work" },
      { property: "og:description", content: "Fast, free on-site quotes across the Fraser Valley." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: SITE.name,
        telephone: SITE.phone,
        email: SITE.email,
        areaServed: "Fraser Valley & Lower Mainland, BC",
      }),
    }],
  }),
  component: Contact,
});

const SERVICE_OPTIONS = [
  "Chain Link Fencing",
  "Cedar Fencing",
  "Ornamental Fencing",
  "Metal / Driveway Gate",
  "Barrier Gates & Railings",
  "Welding / Repair",
  "Excavation",
  "Snow Removal",
  "Other",
] as const;

const GATE_OPTIONS = [
  "No gate needed",
  "Single walk gate",
  "Double walk gate",
  "Single drive gate",
  "Double drive gate",
  "Cantilever slide gate",
  "Automated / motorized gate",
] as const;

const schema = z.object({
  service: z.enum(SERVICE_OPTIONS, { message: "Pick a service" }),
  linearFeet: z.coerce.number({ message: "Enter a number" }).min(1, "Enter linear feet").max(100000, "Too large"),
  fenceHeight: z.enum(["3 ft","4 ft","5 ft","6 ft","7 ft","8 ft","10 ft+","Not sure"], { message: "Pick a height" }),
  gate: z.enum(GATE_OPTIONS, { message: "Pick a gate option" }),
  city: z.string().trim().min(2, "Enter your city").max(60),
  postal: z.string().trim().max(10).optional().or(z.literal("")),
  timeline: z.enum(["ASAP","Within 2 weeks","1–2 months","Just planning"], { message: "Pick a timeline" }),
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().min(7, "Enter a phone number").max(30),
  email: z.string().trim().email("Invalid email").max(120),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

const STEPS = [
  { id: 0, label: "Service" },
  { id: 1, label: "Project" },
  { id: 2, label: "Contact" },
] as const;

function Contact() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [webhookDelivered, setWebhookDelivered] = useState(false);
  const submit = useServerFn(submitLead);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      service: undefined as unknown as FormValues["service"],
      linearFeet: undefined as unknown as number,
      fenceHeight: undefined as unknown as FormValues["fenceHeight"],
      gate: undefined as unknown as FormValues["gate"],
      city: "",
      postal: "",
      timeline: undefined as unknown as FormValues["timeline"],
      name: "",
      phone: "",
      email: "",
      notes: "",
    },
  });

  const { register, handleSubmit, trigger, formState: { errors }, getValues } = form;

  const next = async () => {
    const fields: (keyof FormValues)[] =
      step === 0 ? ["service"] :
      step === 1 ? ["linearFeet", "fenceHeight", "gate", "city", "timeline"] : [];
    const ok = await trigger(fields);
    if (ok) setStep((s) => (s + 1) as 0 | 1 | 2);
  };
  const back = () => setStep((s) => (s > 0 ? ((s - 1) as 0 | 1 | 2) : s));

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await submit({
        data: {
          service: values.service,
          linearFeet: Number.isFinite(values.linearFeet) ? Number(values.linearFeet) : null,
          fenceHeight: values.fenceHeight,
          gate: values.gate,
          city: values.city,
          postal: values.postal || null,
          timeline: values.timeline,
          name: values.name,
          phone: values.phone,
          email: values.email,
          notes: values.notes || null,
          source: "contact-form",
        },
      });
      setWebhookDelivered(Boolean(res?.webhookDelivered));
      setDone(true);
    } catch (e) {
      setSubmitError(
        (e as Error)?.message ||
          "Something went wrong sending your request. Please call us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (done) return <ThankYou values={getValues()} webhookDelivered={webhookDelivered} />;

  return (
    <PageShell>
      <section className="border-b border-border grid-lines">
        <div className="container-industrial py-14">
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Contact</div>
          <h1 className="font-display uppercase text-4xl md:text-5xl">Get a fast, free quote</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">Three quick steps. Same-day callback across the Fraser Valley & Lower Mainland — or call us directly.</p>
        </div>
      </section>

      <section className="container-industrial py-14 grid lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 border border-border rounded-sm bg-card p-6 md:p-10">
          <Stepper step={step} />

          {step === 0 && <StepService register={register} errors={errors} />}
          {step === 1 && <StepProject register={register} errors={errors} />}
          {step === 2 && <StepContact register={register} errors={errors} />}

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm uppercase tracking-wide border border-border rounded-sm disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < 2 ? (
              <button type="button" onClick={next} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold uppercase tracking-wide rounded-sm">
                Next <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold uppercase tracking-wide rounded-sm disabled:opacity-70">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending</> : <>Send request <Check className="h-4 w-4" /></>}
              </button>
            )}
          </div>
          {submitError && (
            <div className="mt-4 flex items-start gap-2 border border-destructive/40 bg-destructive/10 text-destructive rounded-sm p-3 text-sm">
              <AlertTriangle className="h-4 w-4 mt-0.5" /> {submitError}
            </div>
          )}
        </form>

        <aside className="space-y-4">
          <div className="border border-border rounded-sm bg-card p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Prefer to talk?</div>
            <a href={SITE.phoneHref} className="mt-3 flex items-center gap-3 text-2xl font-display uppercase hover:text-primary transition">
              <Phone className="h-5 w-5" /> {SITE.phone}
            </a>
            <a href={SITE.emailHref} className="mt-3 flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground break-all">
              <Mail className="h-4 w-4" /> {SITE.email}
            </a>
            <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {SITE.territory}
            </div>
          </div>
          <div className="border border-border rounded-sm bg-card p-6 text-sm text-muted-foreground space-y-3">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Hours</div>
            <div className="flex justify-between"><span>Mon–Fri</span><span className="text-foreground">7:00 – 18:00</span></div>
            <div className="flex justify-between"><span>Saturday</span><span className="text-foreground">8:00 – 16:00</span></div>
            <div className="flex justify-between"><span>Sunday</span><span className="text-foreground">By appointment</span></div>
          </div>
        </aside>
      </section>
      <CtaStrip />
    </PageShell>
  );
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="grid grid-cols-3 gap-2 mb-8">
      {STEPS.map((s) => {
        const state = step === s.id ? "current" : step > s.id ? "done" : "pending";
        return (
          <li key={s.id} className="flex items-center gap-3">
            <span className={
              "h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold border " +
              (state === "current" ? "bg-primary text-primary-foreground border-primary" :
               state === "done" ? "bg-primary/20 text-primary border-primary" :
               "bg-background text-muted-foreground border-border")
            }>
              {state === "done" ? <Check className="h-4 w-4" /> : s.id + 1}
            </span>
            <span className={"text-xs uppercase tracking-widest " + (state === "pending" ? "text-muted-foreground" : "text-foreground")}>{s.label}</span>
          </li>
        );
      })}
    </ol>
  );
}

type StepProps = { register: UseFormRegister<FormValues>; errors: FieldErrors<FormValues> };

function StepService({ register, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <FieldLabel>What do you need built?</FieldLabel>
      <div className="grid sm:grid-cols-2 gap-2">
        {SERVICE_OPTIONS.map((opt) => (
          <label key={opt} className="flex items-center gap-3 border border-border rounded-sm px-4 py-3 cursor-pointer hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/10 transition">
            <input type="radio" value={opt} {...register("service")} className="accent-primary" />
            <span className="text-sm">{opt}</span>
          </label>
        ))}
      </div>
      <FieldError msg={errors.service?.message} />
    </div>
  );
}

function StepProject({ register, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Approximate linear feet</FieldLabel>
          <input type="number" inputMode="numeric" min={1} placeholder="e.g. 120" {...register("linearFeet")} className={inputCls} />
          <FieldError msg={errors.linearFeet?.message} />
        </div>
        <div>
          <FieldLabel>Fence height</FieldLabel>
          <select {...register("fenceHeight")} className={inputCls}>
            <option value="">Choose…</option>
            {["3 ft","4 ft","5 ft","6 ft","7 ft","8 ft","10 ft+","Not sure"].map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
          <FieldError msg={errors.fenceHeight?.message} />
        </div>
      </div>
      <div>
        <FieldLabel>Gate requirements</FieldLabel>
        <div className="grid sm:grid-cols-2 gap-2">
          {GATE_OPTIONS.map((opt) => (
            <label key={opt} className="flex items-center gap-3 border border-border rounded-sm px-4 py-3 cursor-pointer hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/10 transition">
              <input type="radio" value={opt} {...register("gate")} className="accent-primary" />
              <span className="text-sm">{opt}</span>
            </label>
          ))}
        </div>
        <FieldError msg={errors.gate?.message} />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <FieldLabel>City / neighbourhood</FieldLabel>
          <input placeholder="e.g. Chilliwack" maxLength={60} {...register("city")} className={inputCls} />
          <FieldError msg={errors.city?.message} />
        </div>
        <div>
          <FieldLabel>Postal code (optional)</FieldLabel>
          <input placeholder="V2R 0A1" maxLength={10} {...register("postal")} className={inputCls} />
        </div>
      </div>
      <div>
        <FieldLabel>Timeline</FieldLabel>
        <select {...register("timeline")} className={inputCls}>
          <option value="">Choose…</option>
          {["ASAP","Within 2 weeks","1–2 months","Just planning"].map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <FieldError msg={errors.timeline?.message} />
      </div>
    </div>
  );
}

function StepContact({ register, errors }: StepProps) {
  return (
    <div className="space-y-5">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <FieldLabel>Your name</FieldLabel>
          <input maxLength={80} {...register("name")} className={inputCls} />
          <FieldError msg={errors.name?.message} />
        </div>
        <div>
          <FieldLabel>Phone</FieldLabel>
          <input type="tel" maxLength={30} {...register("phone")} className={inputCls} />
          <FieldError msg={errors.phone?.message} />
        </div>
      </div>
      <div>
        <FieldLabel>Email</FieldLabel>
        <input type="email" maxLength={120} {...register("email")} className={inputCls} />
        <FieldError msg={errors.email?.message} />
      </div>
      <div>
        <FieldLabel>Anything else? (optional)</FieldLabel>
        <textarea rows={4} maxLength={1000} placeholder="Site access, terrain, existing fence to remove…" {...register("notes")} className={inputCls} />
      </div>
    </div>
  );
}

const inputCls =
  "w-full bg-background border border-border rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">{children}</label>;
}
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-2 text-xs text-destructive">{msg}</p>;
}

function ThankYou({ values }: { values: FormValues }) {
  return (
    <PageShell>
      <section className="border-b border-border grid-lines">
        <div className="container-industrial py-20 max-w-2xl">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary text-primary-foreground mb-6">
            <Check className="h-6 w-6" />
          </div>
          <h1 className="font-display uppercase text-4xl md:text-5xl">Request received</h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Thanks {values.name?.split(" ")[0] || "—"}. We'll call {values.phone} within one business day
            to walk your {values.city} project.
          </p>
          <div className="mt-8 border border-border rounded-sm bg-card p-6 text-sm space-y-2">
            <SummaryRow label="Service" value={values.service} />
            <SummaryRow label="Approx." value={`${values.linearFeet} ft @ ${values.fenceHeight}`} />
            <SummaryRow label="Gate" value={values.gate} />
            <SummaryRow label="Timeline" value={values.timeline} />
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={SITE.phoneHref} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold uppercase tracking-wide rounded-sm">
              <Phone className="h-4 w-4" /> Call now — {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/60 last:border-none pb-2 last:pb-0">
      <span className="text-muted-foreground uppercase tracking-widest text-xs">{label}</span>
      <span className="text-foreground text-right">{value || "—"}</span>
    </div>
  );
}
