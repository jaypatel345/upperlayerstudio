"use client";

import { useActionState, useEffect } from "react";
import { submitLead, type LeadState } from "@/app/contact/actions";
import { useLead } from "./LeadContext";
import { contact } from "@/lib/pages";
import { site } from "@/lib/site";

const input =
  "mt-1.5 block w-full rounded-[var(--radius-card)] border border-line bg-white px-3.5 py-2.5 text-[15px] " +
  "outline-none transition-colors placeholder:text-muted focus:border-line-strong";
const label = "block text-[14px] font-medium tracking-[-0.01em]";

/**
 * Short project form that feeds the AI lead agent — the secondary path under
 * the scheduler. On success it pre-fills the booking embed with the visitor's
 * details and offers to jump back up to it. If the agent can't be reached the
 * visitor is pointed to the studio email instead, so email stays the fallback.
 */
export function ContactForm() {
  const [state, action, pending] = useActionState<LeadState, FormData>(submitLead, { status: "idle" });
  const { setLead } = useLead();
  const copy = contact.form;
  const v = state.values;
  const mailto = v
    ? `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry from ${v.name}`)}&body=${encodeURIComponent(v.message)}`
    : `mailto:${site.email}`;

  useEffect(() => {
    if (state.status === "sent" && state.values) {
      const { name, email, message } = state.values;
      setLead({ name, email, message });
    }
  }, [state, setLead]);

  const emailNote = (
    <p className="mt-4 text-[14px] text-ink-70">
      {copy.emailNote}{" "}
      <a href={mailto} className="font-medium text-ink underline-offset-2 hover:underline">
        {site.email}
      </a>
    </p>
  );

  if (state.status === "sent") {
    return (
      <>
        <div role="status" className="rounded-lg bg-tint p-6">
          <p className="text-[17px] font-medium tracking-[-0.025em]">{copy.sentTitle}</p>
          <p className="mt-1 text-[16px] leading-[1.5] text-ink-70">{copy.sentBody}</p>
          <button
            type="button"
            onClick={() => document.getElementById("book-a-call")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="mt-6 inline-flex h-[45px] items-center justify-center rounded-[var(--radius-card)] bg-ink px-[18px] text-[15px] font-medium text-white shadow-[0_1px_2px_rgba(10,10,10,0.2)] transition-all hover:bg-[#2a2a2a] active:scale-[0.985]"
          >
            {copy.sentCta} ↑
          </button>
        </div>
        {emailNote}
      </>
    );
  }

  return (
    <>
      <form action={action} className="rounded-lg bg-tint p-6">
        <p className="text-[17px] font-medium tracking-[-0.025em]">{copy.title}</p>
        <p className="mt-1 text-[16px] leading-[1.5] text-ink-70">{copy.body}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Name
            <input name="name" required autoComplete="name" defaultValue={v?.name} className={input} />
          </label>
          <label className={label}>
            Email
            <input name="email" type="email" required autoComplete="email" defaultValue={v?.email} className={input} />
          </label>
          <label className={label}>
            Company <span className="font-normal text-muted">(optional)</span>
            <input name="company" autoComplete="organization" defaultValue={v?.company} className={input} />
          </label>
          <label className={label}>
            Service
            <select key={v?.service} name="service" defaultValue={v?.service ?? ""} className={input}>
              <option value="">Not sure yet</option>
              <option>AI Automation</option>
              <option>Web Development</option>
              <option>Design</option>
            </select>
          </label>
          <label className={`${label} sm:col-span-2`}>
            What do you need?
            <textarea name="message" required minLength={10} rows={4} placeholder={copy.placeholder} defaultValue={v?.message} className={input} />
          </label>
          {/* Honeypot — hidden from people, tempting to bots. */}
          <input name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        </div>

        <p aria-live="polite" className="mt-4 text-[14px] leading-[1.5] text-ink-70 empty:hidden">
          {state.status === "invalid" && state.message}
          {state.status === "fallback" && (
            <>
              {copy.fallback}{" "}
              <a href={mailto} className="font-medium text-ink underline underline-offset-2">
                {site.email}
              </a>
            </>
          )}
        </p>

        <button
          type="submit"
          disabled={pending}
          className="mt-6 inline-flex h-[45px] items-center justify-center rounded-[var(--radius-card)] bg-ink px-[18px] text-[15px] font-medium text-white shadow-[0_1px_2px_rgba(10,10,10,0.2)] transition-all hover:bg-[#2a2a2a] active:scale-[0.985] disabled:opacity-60"
        >
          {pending ? copy.pending : copy.submit}
        </button>
      </form>
      {emailNote}
    </>
  );
}
