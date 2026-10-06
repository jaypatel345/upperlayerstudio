"use client";

import { createContext, useContext, useState } from "react";

/**
 * Who just sent the contact form, shared with the booking embed so the
 * scheduler opens pre-filled. Booking with the same email is what lets the
 * lead agent match the booking to the enquiry.
 */
export type Lead = { name: string; email: string; message: string };

const LeadContext = createContext<{ lead: Lead | null; setLead: (lead: Lead) => void }>({
  lead: null,
  setLead: () => {},
});

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [lead, setLead] = useState<Lead | null>(null);
  return <LeadContext.Provider value={{ lead, setLead }}>{children}</LeadContext.Provider>;
}

export const useLead = () => useContext(LeadContext);
