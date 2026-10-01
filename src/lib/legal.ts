/**
 * Privacy policy and terms of use.
 *
 * NOT legal advice, and not a reviewed document — it is an accurate, plain
 * description of what this site actually does today, which is a better starting
 * point than boilerplate copied from a site that behaves differently.
 *
 * Verified true at the time of writing: no analytics, no cookies, no tracking
 * pixels, no forms, no local or session storage, and no third-party runtime
 * requests (Inter is downloaded at build time by next/font and self-hosted).
 *
 * UPDATE THIS the moment any of those change — in particular when
 * site.scheduler points at a real scheduler, because that scheduler will then
 * collect visitor data and has to be named here.
 */

import { site } from "./site";

export type LegalDoc = {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  sections: { heading: string; paragraphs: string[]; list?: string[] }[];
};

const UPDATED = "2026-10-01";

export const privacy: LegalDoc = {
  slug: "privacy",
  title: "Privacy policy",
  summary:
    "This website collects nothing about you. No cookies, no analytics, no tracking. The long version is below, and it stays short because there is not much to describe.",
  updated: UPDATED,
  sections: [
    {
      heading: "The short version",
      paragraphs: [
        "Upper Layer Studio's website is a set of static pages. It sets no cookies, runs no analytics, loads no tracking pixels, and has no forms. Nothing you do while reading it is recorded by me or sent anywhere.",
        "If you email the studio or book a call, that is different — you are giving me your details on purpose, and the section on correspondence below explains what happens to them.",
      ],
    },
    {
      heading: "What this site does not do",
      paragraphs: ["Specifically, and verifiably if you want to open your browser's network tab:"],
      list: [
        "No cookies of any kind, including analytics or preference cookies.",
        "No analytics or measurement service — no Google Analytics, no alternatives.",
        "No advertising or social tracking pixels.",
        "No forms, so nothing is submitted from these pages.",
        "No browser storage — nothing is written to local storage or session storage.",
        "No third-party requests while you read. The typeface is downloaded when the site is built and served from the same domain, so your browser never contacts a font provider.",
      ],
    },
    {
      heading: "Server logs",
      paragraphs: [
        "Whoever hosts this site keeps standard server logs, which typically record the page requested, the time, your IP address and your browser's user-agent string. That is ordinary infrastructure logging, it happens for every website you visit, and I do not analyse it, build profiles from it, or connect it to anything else.",
      ],
    },
    {
      heading: "If you email or book a call",
      paragraphs: [
        `When you write to ${site.email}, I keep the email and my reply so that I have a record of the conversation. I use it to answer you and to carry out any work we agree. I do not add you to a mailing list, and I do not sell, rent or share your details.`,
        "If the booking scheduler is connected, booking a time goes through a third-party provider that will collect your name, your email address and anything you type into the booking form, under its own privacy policy. This section will name that provider once one is in use.",
      ],
    },
    {
      heading: "Links to other sites",
      paragraphs: [
        "Some links here go elsewhere — the studio's own profiles, and the row in the footer that opens a research prompt in an AI assistant. Once you follow a link you are on somebody else's site, under their privacy policy, and I have no control over or visibility into what they collect.",
      ],
    },
    {
      heading: "Your rights over what I hold",
      paragraphs: [
        `You can ask me what correspondence I hold about you, ask for a copy of it, ask me to correct it, or ask me to delete it. Email ${site.email} and I will do it. There is no process and no form — it is one person reading his own inbox.`,
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "If the site starts doing something it does not do today — analytics, a contact form, an embedded scheduler — this page gets updated before that goes live, and the date at the top changes with it.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `Questions about any of this go to ${site.email}, and they reach me rather than a support queue.`,
      ],
    },
  ],
};

export const terms: LegalDoc = {
  slug: "terms",
  title: "Terms of use",
  summary:
    "The terms that apply to reading this website. They do not govern client projects — that is what a written scope and an agreed fee are for.",
  updated: UPDATED,
  sections: [
    {
      heading: "What these terms cover",
      paragraphs: [
        "These terms apply to your use of this website. They do not govern any work the studio does for you. Projects are covered by the written scope, deliverables and fee that we agree before work starts, and where those disagree with anything here, the project agreement wins.",
      ],
    },
    {
      heading: "The site is information, not an offer",
      paragraphs: [
        "Everything described here — services, process, timelines, the way projects are structured — is a description of how the studio works, not a binding offer or a quotation. A price and a commitment exist only once they are in a written scope that we have both agreed.",
        "Where this site states a commitment about timing, such as a written scope within 48 hours of a call, it is a service standard rather than a contractual guarantee.",
      ],
    },
    {
      heading: "Accuracy",
      paragraphs: [
        "I write what I believe to be accurate and correct mistakes when I find them, but the content is provided as it is, with no warranty that it is complete, current or fit for a particular purpose. Technical opinions published under Insights and the Lab are opinions, held honestly, and they will age.",
        "Nothing here is legal, financial or professional advice, and you should not make a decision with consequences on the strength of a web page alone — including this one.",
      ],
    },
    {
      heading: "Content and ownership",
      paragraphs: [
        `The text, design, code and visual system of this site belong to ${site.name} unless stated otherwise. You are welcome to read it, quote it with attribution and link to it. Republishing substantial parts as your own, or reusing the design wholesale, is not permitted without asking.`,
        "Product and company names mentioned belong to their respective owners, and mentioning a tool is not a claim of affiliation or endorsement in either direction.",
      ],
    },
    {
      heading: "Links to other sites",
      paragraphs: [
        "This site links to places I do not control, including the studio's profiles and the AI assistants in the footer. Those links are there because they are useful, not as an endorsement, and I am not responsible for what those sites contain or do.",
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "To the extent the law allows, I am not liable for loss arising from your use of, or reliance on, this website. Nothing in these terms limits liability where the law does not permit it to be limited.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "These terms may change as the site does. The current version is always the one on this page, and the date at the top tells you when it last moved.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [`Anything you want to query about these terms goes to ${site.email}.`],
    },
  ],
};

export const legalDocs = [privacy, terms];
