/**
 * Per-service page content. Kept out of site.ts because this is long-form copy
 * for five routes, where site.ts is the shared chrome.
 *
 * One entry here renders one page at /services/<slug> through the shared
 * template. Adding a fifth service means adding an object, not a route.
 *
 * Section order is deliberate and is the same on every page:
 *   hero        what is this
 *   problem     do you understand me          <- the one that earns the scroll
 *   deliverables what am I actually buying
 *   process     how will this go              <- shared, from site.ts
 *   faqs        answer the objection
 *   related     where this sits in the ladder
 *   cta         ask
 *
 * Voice rules carry over from site.ts: first person singular, and no claim
 * about a past result until there is delivered work to point at.
 */

import type { SkyVariant } from "@/components/ui/SkyPlate";

export type ServiceDetail = {
  slug: string;
  /** Gutter number — also the order services appear everywhere on the site */
  n: string;
  name: string;
  /** One line used by the nav dropdown and the related-services cards */
  blurb: string;
  /** Sky plate standing in for service artwork — see SkyPlate */
  art: { sky: SkyVariant; label: string };
  /** Slug of the case study whose walkthrough video proves this service */
  proof: string;
  meta: { title: string; description: string };
  hero: {
    headline: { lead: string; trail: string };
    body: string;
    tags: string[];
  };
  problem: { eyebrow: string; title: string; items: { title: string; body: string }[] };
  deliverables: {
    eyebrow: string;
    title: string;
    body: string;
    items: { n: string; title: string; body: string }[];
  };
  faqs: { q: string; a: string }[];
  /** Slugs of the services this one most often leads to */
  related: string[];
};

export const serviceDetails: ServiceDetail[] = [
  /* ---------------------------------------------------------------- 01 */
  {
    slug: "automation",
    n: "01",
    name: "AI Automation",
    blurb: "Workflows that run without you",
    art: { sky: "clear", label: "Automation" },
    proof: "ai-lead-agent",
    meta: {
      title: "AI Automation Services & Workflow Automation",
      description:
        "I map the work your team repeats and replace it with automations that run on their own — built on the tools you already use, documented and handed over.",
    },
    hero: {
      headline: { lead: "Automations that run", trail: "the work you repeat" },
      body: "Every operation has work that happens the same way every time — quotes rebuilt from scratch, data retyped between tools, updates chased by hand. I map that work, replace it with systems that run on their own, and make sure you hear about it when they don't.",
      tags: ["Workflow audit", "n8n and custom code", "Human in the loop", "Monitoring and docs"],
    },
    problem: {
      eyebrow: "The problem",
      title: "You can feel the cost, but you can't point at it",
      items: [
        {
          title: "The same thing, typed twice",
          body: "Information arrives in one tool and gets retyped into the next. Nobody logs the time, but it is hours a week and it is where the mistakes come from.",
        },
        {
          title: "Work that waits for a person",
          body: "A quote, an onboarding, an invoice chase. None of it is difficult, all of it sits in a queue until somebody gets around to it.",
        },
        {
          title: "Tools that don't talk",
          body: "Your CRM, your inbox, your spreadsheets and your accounting software each hold part of the picture, and none of them share it.",
        },
        {
          title: "Growth means hiring",
          body: "The only way to handle twice the volume is twice the people, because the process exists in somebody's head rather than in a system.",
        },
      ],
    },
    deliverables: {
      eyebrow: "What you get",
      title: "What's included",
      body: "Scoped to your operation after the audit. Everything is built in your own accounts and documented so your team can run it without me.",
      items: [
        {
          n: "01",
          title: "Workflow audit and opportunity map",
          body: "I sit with how the work actually happens, write it down, and rank every candidate automation by hours saved against effort to build. The map is yours whether or not you build it with me.",
        },
        {
          n: "02",
          title: "Automations built and deployed",
          body: "The approved workflows, running in your environment. n8n where it fits and keeps things readable for your team, custom code where it doesn't.",
        },
        {
          n: "03",
          title: "Integrations across your existing tools",
          body: "Connected to the CRM, inbox, sheets and database already in use. No migration first, and nothing new for your team to learn.",
        },
        {
          n: "04",
          title: "A human in the loop where it matters",
          body: "Approval steps on anything that reaches a customer or costs money. The system drafts and prepares, a person confirms.",
        },
        {
          n: "05",
          title: "Monitoring, logging and alerts",
          body: "Every run is logged. When something fails you hear it from the system rather than from a customer.",
        },
        {
          n: "06",
          title: "Handover docs and a walkthrough",
          body: "A written runbook and a session with your team, so the people using it every day can change what I built.",
        },
      ],
    },
    faqs: [
      {
        q: "How long before something is actually running?",
        a: "The audit takes about a week. Most first automations are live two to four weeks after that. If a workflow is going to take longer than that, I'll tell you before you commit rather than after.",
      },
      {
        q: "What happens when one of our tools changes its API?",
        a: "Things break, and any automation needs an owner. Monitoring tells you the moment a run fails, the runbook tells your team what to do about it, and if you'd rather that owner were me, that's a monthly retainer.",
      },
      {
        q: "Is n8n the only thing you build on?",
        a: "No. n8n covers most workflows and has the advantage that your team can read it. When a job needs real code — volume, complex logic, anything performance-sensitive — I write it properly and deploy it alongside.",
      },
      {
        q: "What if the audit says we don't need much?",
        a: "Then that's the finding, and you'll have it in writing with the reasoning. It happens. I'd rather lose a build than sell you automation you don't need.",
      },
    ],
    related: ["voice", "product"],
  },

  /* ---------------------------------------------------------------- 02 */
  {
    slug: "voice",
    n: "02",
    name: "Voice AI",
    blurb: "Agents that answer the phone",
    art: { sky: "deep", label: "Voice" },
    proof: "frontdeskai",
    meta: {
      title: "Voice AI Agents & AI Phone Receptionist",
      description:
        "A voice agent that answers every call in your tone, qualifies the caller, books the job into your calendar and writes it down — on your number, in your accounts.",
    },
    hero: {
      headline: { lead: "A voice agent that", trail: "answers every call" },
      body: "Missed calls are lost revenue, and most businesses miss them after hours, mid-job, and whenever everyone is already on the phone. A voice agent picks up every time, asks your questions, books the work and writes down what was said.",
      tags: ["Inbound call handling", "Calendar booking", "Transcripts and summaries", "Human hand-off"],
    },
    problem: {
      eyebrow: "The problem",
      title: "The calls you miss never tell you they called",
      items: [
        {
          title: "After hours is dead air",
          body: "Someone with a problem at nine in the evening calls the first three results they find. Whoever picks up gets the job.",
        },
        {
          title: "Everyone is already busy",
          body: "Your team is on a job, in a meeting, or on another call. The phone rings out and most callers don't leave a message.",
        },
        {
          title: "Voicemail doesn't convert",
          body: "The few who do leave one expect a callback within the hour. By the time anybody listens, they have booked somewhere else.",
        },
        {
          title: "Nobody writes it down",
          body: "What was said on the call lives in one person's memory. None of it reaches the CRM, so none of it is there next time.",
        },
      ],
    },
    deliverables: {
      eyebrow: "What you get",
      title: "What's included",
      body: "Built around how your business actually answers the phone, deployed on your number, and handed over in your own provider accounts.",
      items: [
        {
          n: "01",
          title: "Inbound call handling in your voice",
          body: "Scripted around what you offer, what you don't, what you charge, and what you need to know before you'll book something in.",
        },
        {
          n: "02",
          title: "Caller qualification",
          body: "The agent asks your questions, so what reaches your team is a qualified job rather than a cold enquiry to work through.",
        },
        {
          n: "03",
          title: "Booking straight into your calendar",
          body: "Live availability, confirmed during the call, with a confirmation message sent before the caller has hung up.",
        },
        {
          n: "04",
          title: "Transcript and summary after every call",
          body: "In your inbox or your CRM within seconds, and searchable — so you can finally see what callers actually ask for.",
        },
        {
          n: "05",
          title: "Hand-off to a human when it matters",
          body: "Explicit rules for when it transfers, takes a message or escalates. It never pretends to handle what it can't handle.",
        },
        {
          n: "06",
          title: "Your number, your accounts",
          body: "Deployed on your telephony and your provider accounts, with the call logic and scripts handed over. You own it.",
        },
      ],
    },
    faqs: [
      {
        q: "Will callers know they're talking to an AI?",
        a: "Yes, and it should say so up front. Trying to pass as human backfires the moment it gets something wrong. What callers actually care about is being understood and getting booked in, and done well that beats a voicemail by a distance.",
      },
      {
        q: "What happens when it doesn't understand someone?",
        a: "It stops and hands over — to a person if one is available, to a message and a callback promise if not. The worst case is an ordinary voicemail, which is exactly where you are today.",
      },
      {
        q: "Which part of this is actually yours?",
        a: "The speech and the language model are rented from providers like ElevenLabs and Anthropic, and should be. The call logic, the qualification script, the integrations and the guardrails are built for your business and handed over in your accounts.",
      },
      {
        q: "Can it handle outbound calls too?",
        a: "Technically yes, and I'd usually advise against starting there. Inbound is someone who already wants to talk to you, which makes it the easier win and the safer place to learn what the agent gets wrong.",
      },
    ],
    related: ["automation", "agents"],
  },

  /* ---------------------------------------------------------------- 03 */
  {
    slug: "agents",
    n: "03",
    name: "AI Agents",
    blurb: "Custom agents wired into your stack",
    art: { sky: "dusk", label: "Agents" },
    proof: "aslioffer",
    meta: {
      title: "Custom AI Agents & RAG Assistants",
      description:
        "Agents grounded in your own data and wired into your real systems, with guardrails and an evaluation suite so you know when the answers drift.",
    },
    hero: {
      headline: { lead: "Agents that know", trail: "your business, not the internet" },
      body: "A general chatbot can't answer a question about your pricing, your stock or your policies — and it will invent an answer rather than admit that. An agent grounded in your own data and wired into your own systems answers from what's true, and is tested so you know when it stops.",
      tags: ["Retrieval over your data", "Tool use", "Guardrails and evals", "Cost and latency tuning"],
    },
    problem: {
      eyebrow: "The problem",
      title: "Most AI assistants fail for the same four reasons",
      items: [
        {
          title: "It doesn't know anything about you",
          body: "Out of the box it knows the public internet. It doesn't know your SKUs, your lead times, or what you told this customer last month.",
        },
        {
          title: "It can read but it can't act",
          body: "Answering the question is half the job. The useful version checks the order, updates the record and sends the confirmation.",
        },
        {
          title: "It makes things up, confidently",
          body: "Without grounding and guardrails it will invent a policy, a price or a delivery date — in your brand voice, to your customer.",
        },
        {
          title: "Nobody can tell when it gets worse",
          body: "A prompt change or a model update quietly degrades the answers, and you find out about it from a complaint.",
        },
      ],
    },
    deliverables: {
      eyebrow: "What you get",
      title: "What's included",
      body: "Scoped tightly on purpose. An agent that does four things reliably is worth more than one that attempts forty and is trusted for none of them.",
      items: [
        {
          n: "01",
          title: "Retrieval over your own knowledge base",
          body: "Your documents, tickets, product data and past conversations, indexed so answers come from your material — with the source attached to the answer.",
        },
        {
          n: "02",
          title: "Tool use wired into real systems",
          body: "Look up an order, check availability, raise a ticket, update a record. Scoped tightly to what the agent is allowed to touch.",
        },
        {
          n: "03",
          title: "Guardrails on what it can say and do",
          body: "Explicit boundaries on topics, claims and actions, with anything consequential routed to a person instead.",
        },
        {
          n: "04",
          title: "An evaluation suite",
          body: "Real questions with expected answers, run on every change, so a regression shows up in your tests rather than in your inbox.",
        },
        {
          n: "05",
          title: "Cost and latency tuning",
          body: "The right model for each step rather than the largest one everywhere, with caching and fallbacks. Usually the difference between a demo and something you can afford to run.",
        },
        {
          n: "06",
          title: "Deployment and handover",
          body: "Running in your infrastructure, with the prompts, evaluations and documentation in your own repository.",
        },
      ],
    },
    faqs: [
      {
        q: "Do you train a model on our data?",
        a: "Almost never. It's expensive, slow to update and usually worse than the alternative. Retrieval puts your data in front of a strong general model at the moment it answers, which means correcting a document is all it takes to change what the agent knows.",
      },
      {
        q: "Is our data safe?",
        a: "It stays in your accounts and your vector store. The major providers' business tiers don't train on API traffic, and I'll tell you exactly which provider sees what before anything gets built.",
      },
      {
        q: "How do we know it's actually working?",
        a: "The evaluation suite is the answer, which is why it's in the scope rather than an upsell. You get a number you can watch over time instead of a feeling about whether it seems better this week.",
      },
      {
        q: "How is this different from the automation service?",
        a: "An automation follows a path you defined. An agent decides which path to take. Automation is the right answer far more often than people expect, and if your problem is really an automation I'll build that instead — it's cheaper and it breaks less.",
      },
    ],
    related: ["automation", "product"],
  },

  /* ---------------------------------------------------------------- 04 */
  {
    slug: "product",
    n: "04",
    name: "Product Build",
    blurb: "From prototype to production",
    art: { sky: "cumulus", label: "Product" },
    proof: "newsbit",
    meta: {
      title: "AI Product Development",
      description:
        "The full build — interface, model layer and infrastructure — for teams taking an AI product to market, or outgrowing the automations they started with.",
    },
    hero: {
      headline: { lead: "The software", trail: "you actually own" },
      body: "When a workflow becomes how your business runs, renting it inside somebody else's tool stops making sense. This is the full build — interface, model layer and infrastructure — whether you're taking an AI product to market or outgrowing the automations we started with.",
      tags: ["Product and interface design", "Full-stack build", "Model orchestration", "Launch and iteration"],
    },
    problem: {
      eyebrow: "The problem",
      title: "The point where automation stops being enough",
      items: [
        {
          title: "You're paying per run, forever",
          body: "Per-task pricing is cheap at a hundred runs and absurd at a hundred thousand. Past some volume, owning the software costs less than renting it.",
        },
        {
          title: "The logic has outgrown the canvas",
          body: "What started as five steps is now forty, with branches nobody can follow. It needs to be code with tests, not boxes on a screen.",
        },
        {
          title: "Your team needs a front door",
          body: "The system works, but using it means opening a tool they have no logins for. It needs a screen, an account and a dashboard.",
        },
        {
          title: "You're selling it, not just using it",
          body: "The moment customers touch it, it needs an interface, accounts, billing and uptime. That's a product, not an internal workflow.",
        },
      ],
    },
    deliverables: {
      eyebrow: "What you get",
      title: "What's included",
      body: "Designed before it's built, reviewed while changes are still cheap, and handed over complete — repository, infrastructure and documentation in your own accounts.",
      items: [
        {
          n: "01",
          title: "Product and interface design",
          body: "Screens designed and reviewed against the agreed brief before anything gets built, so the expensive changes happen on the cheap end.",
        },
        {
          n: "02",
          title: "Full-stack build and deployment",
          body: "Frontend, backend, database and authentication, deployed to your accounts with environments and CI set up properly from the start.",
        },
        {
          n: "03",
          title: "Model orchestration and fallbacks",
          body: "The AI layer built to survive reality — retries, fallbacks between providers, and sensible behaviour when a model is slow or simply down.",
        },
        {
          n: "04",
          title: "Image and content generation where the product needs it",
          body: "Generated assets, documents and copy as a feature of the product, on your brand and inside your rules.",
        },
        {
          n: "05",
          title: "Launch support and iteration",
          body: "I stay on through launch and the first round of changes that real users ask for, which is always the round that matters.",
        },
        {
          n: "06",
          title: "Everything handed over",
          body: "Repository, infrastructure, prompts and documentation in your accounts. I'm not building a dependency on me.",
        },
      ],
    },
    faqs: [
      {
        q: "What do you build it with?",
        a: "Typically Next.js, TypeScript, Postgres and Vercel, with the model layer on Claude or GPT. Deliberately boring, well-documented choices — so any competent developer can pick it up after me, which is rather the point of handing it over.",
      },
      {
        q: "Can you take over something another developer started?",
        a: "Often, yes. I'll review what exists first and tell you honestly whether it's worth continuing or whether rebuilding costs less than untangling. That review is a small fixed piece of work on its own, with no obligation after it.",
      },
      {
        q: "Do we have to start with automation first?",
        a: "No. If you already know what you're building, we start here. The ladder is how most clients arrive, not a rule I'll hold you to.",
      },
      {
        q: "Who owns the code?",
        a: "You do, from the first commit — it's written in your repository, in your accounts. There's no licence, no hosting arrangement through me, and nothing you'd have to buy back later.",
      },
    ],
    related: ["automation", "agents"],
  },
];

export const serviceBySlug = (slug: string) => serviceDetails.find((s) => s.slug === slug);

/** Copy for the /services index itself. */
export const servicesIndex = {
  hero: {
    eyebrow: "Services",
    headline: { lead: "What needs", trail: "to change?" },
    body: "Start with the problem you need to solve. We agree the scope together, keep what already works, and take the right work through to production.",
    tags: serviceDetails.map((s) => s.name),
  },
  showcase: {
    eyebrow: "What I do",
    title: "Automate the work, then own the software",
    body: "Four services, ordered the way most projects actually run. Automation proves the value in weeks. The product is where it ends up once it has.",
  },
};
