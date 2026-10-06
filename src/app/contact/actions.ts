"use server";

/**
 * Sends a contact-form enquiry to the AI lead agent (n8n webhook). The URL
 * lives in LEAD_WEBHOOK_URL — server-only, never shipped to the browser.
 *
 * The webhook is called with ?mode=async: n8n acknowledges as soon as the lead
 * is validated (well under a second) and does the AI scoring, CRM write and
 * reply email in the background, so the visitor never waits on them.
 *
 * Any failure (unset URL, timeout, non-2xx) returns status "fallback" so the
 * form can hand the visitor the plain email route instead of losing the lead.
 */

export type LeadValues = { name: string; email: string; company: string; service: string; message: string };

export type LeadState = {
  status: "idle" | "sent" | "invalid" | "fallback";
  message?: string;
  /**
   * Echoed back so React's post-action form reset can re-fill the inputs on
   * failure, and so the booking embed can be pre-filled on success.
   */
  values?: LeadValues;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const field = (data: FormData, key: string, max: number) =>
  String(data.get(key) ?? "").trim().slice(0, max);

export async function submitLead(_prev: LeadState, data: FormData): Promise<LeadState> {
  // Honeypot: real visitors never see or fill this field.
  if (field(data, "website_url", 200)) return { status: "sent" };

  const lead = {
    name: field(data, "name", 120),
    email: field(data, "email", 200).toLowerCase(),
    company: field(data, "company", 160) || null,
    service_interest: field(data, "service", 60) || null,
    message: field(data, "message", 4000),
    source: "web_form",
  };

  const values: LeadValues = {
    name: lead.name, email: lead.email, company: lead.company ?? "", service: lead.service_interest ?? "", message: lead.message,
  };

  if (!lead.name || !EMAIL.test(lead.email) || lead.message.length < 10) {
    return { status: "invalid", message: "Add your name, a valid email and a line or two about the project.", values };
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return { status: "fallback", values };

  try {
    const url = new URL(webhook);
    url.searchParams.set("mode", "async");
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(lead),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return { status: "fallback", values };
    return { status: "sent", values };
  } catch {
    return { status: "fallback", values };
  }
}
