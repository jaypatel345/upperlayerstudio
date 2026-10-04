/**
 * Copy for /work, /studio and /contact. Same rules as site.ts: first person
 * singular, and no claim about a result that hasn't happened.
 *
 * /work is the sharp edge of that second rule. The studio has no delivered
 * client projects yet, so there are no case studies and no testimonials on the
 * site — inventing either would be the one mistake a prospect can actually
 * catch, and it would poison every true claim next to it. The page instead
 * publishes what IS real, states plainly what's missing, and spends its length
 * on de-risking a new studio. Replace `work.built` with real projects as they
 * ship, then delete `work.standIn`.
 */

import type { Feature } from "@/components/ui/FeatureGrid";
import type { SkyVariant } from "@/components/ui/SkyPlate";
import { site } from "./site";

/* ------------------------------------------------------------------ /work */

export type BuiltItem = {
  name: string;
  kind: string;
  body: string;
  tags: string[];
  href?: string;
  art: SkyVariant;
};

export const work = {
  meta: {
    title: "Work",
    description:
      "What Upper Layer Studio has built, what a case study here will contain, and how to hire a new studio without carrying the risk.",
  },
  hero: {
    eyebrow: "Selected work",
    headline: { lead: "The studio is new.", trail: "The standard isn't." },
    body: "There are no client case studies here yet, and I'm not going to dress my own projects up as client results to fill the gap. What follows is what's actually real: products I've built and shipped myself, what a client case study will contain when the first one lands, and how I structure projects so being early costs you nothing.",
    tags: ["Honest about what's missing", "Fixed fee", "You own everything"],
  },

  /** Real, verifiable work only. Add client projects here as they ship. */
  built: {
    eyebrow: "What I've built",
    title: "Start with the thing you're reading",
    body: "The most honest sample available is the site itself. Click anything, read the source, judge the standard.",
    items: [
      {
        name: "Upper Layer Studio",
        kind: "This website",
        body: "Designed and built from scratch: a token-driven design system, a typed content layer, server-rendered pages and a fully static build. Every page you've clicked through to get here, including this one. The source is public, so you can check the standard rather than take my word for it.",
        tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Static build"],
        href: site.socials.find((s) => s.label === "GitHub")?.href,
        art: "high",
      },
    ] as BuiltItem[],
  },

  standIn: {
    eyebrow: "What's coming",
    title: "What a case study here will contain",
    body: "When client work ships, this is the shape it gets published in — and what I'll ask permission to include. No logo walls without a story attached.",
    items: [
      {
        n: "01",
        title: "The problem, in their words",
        body: "What was actually slowing the business down and what it was costing, described the way the client described it to me before anything got built.",
      },
      {
        n: "02",
        title: "What I built",
        body: "The system, the stack and the reasoning — including what I decided not to build, which is usually the more interesting half.",
      },
      {
        n: "03",
        title: "What changed",
        body: "Measured against the state before. Hours returned, response times, conversion — whichever the scope was actually aimed at, not whichever number looks best.",
      },
      {
        n: "04",
        title: "What they own now",
        body: "The repository, the accounts and the documentation that went across at handover, so you can see what you'd be left holding.",
      },
    ] as Feature[],
  },

  derisk: {
    eyebrow: "Hiring a new studio",
    title: "How I make being early cost you nothing",
    body: "A studio without case studies is a risk, and pretending otherwise would insult your judgement. So the projects are structured to carry that risk instead of you.",
    items: [
      {
        n: "01",
        title: "Start with the audit",
        body: "A week, a fixed fee, and a written map of what's worth automating and what isn't. It's yours either way — which makes it the cheapest possible way to find out whether I'm any good.",
      },
      {
        n: "02",
        title: "Fixed fee, agreed first",
        body: "The number and the deliverables are in writing before work starts, split across milestones. No hourly billing, no scope creep, no invoice you didn't see coming.",
      },
      {
        n: "03",
        title: "You own it from the first commit",
        body: "Code, prompts and infrastructure live in your accounts, not mine. If this doesn't work out, you keep everything and hire somebody else to continue it.",
      },
      {
        n: "04",
        title: "You talk to the person building it",
        body: "No account manager relaying your requirements to someone you'll never meet. When something's wrong there's exactly one person to tell, and he's the one who can fix it.",
      },
    ] as Feature[],
  },
};

/* ---------------------------------------------------------------- /studio */

export const studio = {
  meta: {
    title: "Studio",
    description:
      "Upper Layer Studio is a one-person AI studio in India, working globally. How I work, who I work with, and what you get.",
  },
  hero: {
    eyebrow: "The studio",
    headline: { lead: "One person,", trail: "start to finish" },
    body: "Upper Layer Studio is deliberately small. You talk to the person writing the code, so nothing is lost between the brief and the build — and when something isn't right, there's exactly one person to tell.",
    tags: [site.location, "Solo studio", "Fixed-fee projects"],
  },
  audience: {
    eyebrow: "Who I work with",
    title: "Built around the work you need",
    items: [
      {
        title: "Operations teams losing the week to manual work",
        body: "You already know which tasks are eating the time. You need them to stop happening by hand, without ripping out the tools your team knows.",
      },
      {
        title: "Founders with an AI product to ship",
        body: "You have the idea and possibly a prototype. What you need is it designed, built and live — not prototyped for a third time.",
      },
      {
        title: "Businesses losing calls and enquiries",
        body: "The phone rings when nobody can answer it. You need something that picks up every time, qualifies the caller and books the work in.",
      },
    ] as Feature[],
  },
  principles: {
    eyebrow: "How I work",
    title: "A few things I care about",
    body: "These are the three that change what I'd actually recommend to you, which is why they're here rather than on a values page nobody reads.",
    items: [
      {
        n: "01",
        title: "Keep what works",
        body: "The scope gets agreed around the real problem. If part of your current process is fine, I'll say so and we'll leave it alone — replacing working things is how projects quietly get expensive.",
      },
      {
        n: "02",
        title: "Ship something small, early",
        body: "One workflow running in production teaches more than three months of planning. We start with the highest-leverage piece and let what it teaches us shape the rest of the plan.",
      },
      {
        n: "03",
        title: "Build it so you could leave",
        body: "Everything lands in your accounts with documentation your team can follow. If you couldn't take this in-house a year from now, I've built it wrong.",
      },
    ] as Feature[],
  },
};

/* --------------------------------------------------------------- /contact */

export const contact = {
  meta: {
    title: "Contact",
    description:
      "Book a 30-minute call about your project, or email the studio. Written scope and a fixed fee within 48 hours of the call.",
  },
  hero: {
    eyebrow: "Book a call",
    title: "Book a call with Jay",
    body: "A 30-minute conversation about your project, what needs to change and whether Upper Layer Studio is the right fit. Choose a time below.",
  },
  steps: {
    eyebrow: "What happens on the call",
    title: "One call, then a written scope",
    body: "No discovery phase to pay for before you know the number, and no deck required at your end.",
    items: [
      {
        n: "01",
        title: "You describe the problem",
        body: "Where the time goes, what keeps breaking, and what you've already tried. Bring the messy version — it's more useful than a tidy brief.",
      },
      {
        n: "02",
        title: "I ask about the workflow",
        body: "Which tools are actually in use, who touches what, and the real constraints: budget, timeline, and whoever else needs convincing internally.",
      },
      {
        n: "03",
        title: "You get an honest read",
        body: "Whether this is worth building and what it would take. If the answer is that you don't need me, you'll hear it on the call rather than in a proposal.",
      },
    ] as Feature[],
  },
  direct: {
    prompt: "Can't find a suitable time?",
    promptBody: "Email the studio with your project and a few times that work for you.",
    title: "Prefer email?",
    body: "Send over the problem and a couple of times that suit you, and I'll come back with a time or with questions.",
    responseNote: "I answer every email myself, usually within one working day.",
  },
};
