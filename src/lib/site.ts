/**
 * Every string on the site lives here. Edit copy without touching components.
 *
 * Voice: first person singular. This is a solo studio — "I" reads as specific
 * and confident; "we" writes a cheque the proof can't cash yet. The exception
 * is "we" meaning me-and-the-client working together, which is fine.
 *
 * Positioning: automation is the entry door, product is the destination.
 * Services are ordered as a ladder — 01 and 02 are where clients start, 04 is
 * where the work ends up once an automation has earned its keep. Copy should
 * never imply the models are mine; the architecture around them is.
 *
 * Numbers rule: nothing here claims a past result. Every figure is a
 * commitment that can be kept from day one. Swap them for real outcome
 * metrics once there is delivered work to point at.
 */

import type { SkyVariant } from "@/components/ui/SkyPlate";
import { projects } from "./projects";

export const site = {
  name: "Upper Layer Studio",
  wordmark: "UPPER LAYER",
  wordmarkSuffix: "®",
  tagline: "Automate the slow work, then own the software.",
  email: "jaypatel@upperlayerstudio.com",
  location: "India · Working globally",
  /**
   * Where every "Book a call" button goes.
   *
   * A plain path, deliberately. It used to be the bare anchor "#book-a-call",
   * which was dead on any page without a CTA block (/privacy, /terms) and a
   * no-op inside the CTA block itself, since that block *is* the target. The
   * fix is one destination — /contact, where the scheduler lives.
   *
   * No "#book-a-call" fragment on the end either: that hash does not scroll
   * reliably here, and it isn't needed. The booking panel sits ~450px down on
   * desktop and ~410px on mobile, so it is above the fold on both, and the
   * visitor reads the page's one line of context on the way to it. The panel
   * keeps its id so an existing deep link still finds it.
   */
  book: "/contact",
  /**
   * The real scheduler URL (Calendly, Cal.com…), embedded by BookingPanel.
   * Empty until one is connected — the panel shows the email fallback instead
   * of an iframe pointing nowhere. Setting this is the only step needed to put
   * live booking on the site.
   */
  scheduler: "https://cal.com/jaypatel345/upper-layer-studio-discovery-call",
  socials: [
    { label: "X.com", href: "https://x.com/UpperLayerAI" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/jaypatel3405/" },
    { label: "GitHub", href: "https://github.com/jaypatel345/upperlayerstudio" },
  ],
} as const;

export const nav = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "AI Automation", href: "/services/automation", desc: "Workflows that run without you" },
      { label: "Voice AI", href: "/services/voice", desc: "Agents that answer the phone" },
      { label: "AI Agents", href: "/services/agents", desc: "Custom agents wired into your stack" },
      { label: "Product Build", href: "/services/product", desc: "From prototype to production" },
    ],
  },
  {
    label: "Our work",
    href: "/work",
    children: [
      { label: "Selected work", href: "/work", desc: "Case studies in context" },
      { label: "The Lab", href: "/lab", desc: "Experiments and internal tools" },
    ],
  },
  {
    label: "Studio",
    href: "/studio",
    children: [
      { label: "About the studio", href: "/studio", desc: "How I work and who you get" },
      { label: "Process", href: "/studio#process", desc: "Scope, review, ship" },
    ],
  },
  { label: "Contact", href: "/contact" },
  { label: "Insights", href: "/insights" },
] as const;

export const hero = {
  badge: "AI automation, voice agents and AI products",
  headline: { lead: "Automate the work", trail: "that's slowing you down" },
  body:
    "I start with the work that repeats — the manual workflows, the missed calls, the copy-paste between tools — and replace it with systems that run on their own. Once those are earning their keep, I turn them into software you own outright.",
  primary: { label: "Book a call", href: site.book },
  secondary: { label: "See what I build", href: "#services" },
  stat: {
    value: "48h",
    title: "A written scope and a fixed fee within 48 hours of our call",
    sub: "No drawn-out discovery phase before you know the number",
    link: { label: "See how I work", href: "#process" },
  },
};

export const collaborators = [
  "OpenAI",
  "Anthropic",
  "ElevenLabs",
  "LangChain",
  "Supabase",
  "Vercel",
  "n8n",
  "Pinecone",
];

export const services: {
  eyebrow: string;
  title: string;
  body: string;
  items: {
    n: string;
    title: string;
    summary: string;
    bullets: string[];
    href: string;
    art: { sky: SkyVariant; label: string };
    /** Slug in `projects`: shows that project's screens instead of the plain plate */
    project?: string;
  }[];
} = {
  eyebrow: "How I can help",
  title: "What needs to change?",
  body:
    "Start with the problem you need to solve. Most projects begin with one automation, prove themselves in weeks, and grow from there — we agree the scope together and keep what already works.",
  items: [
    {
      n: "01",
      title: "AI Automation",
      summary:
        "I find the repeated work inside your operation and replace it with systems that run on their own — with a human in the loop exactly where it matters.",
      bullets: [
        "Workflow audit and opportunity map",
        "Automations built and deployed",
        "Integrations across your existing tools",
        "Monitoring, logging and handover docs",
      ],
      href: "/services/automation",
      art: { sky: "clear", label: "Automation" },
    },
    {
      n: "02",
      title: "Voice AI",
      summary:
        "A voice agent that answers every call in your tone, qualifies the caller, books the job and logs it — on your number, without anyone picking up the phone.",
      bullets: [
        "Inbound call handling and qualification",
        "Booking straight into your calendar",
        "Transcript and summary after every call",
        "Hand-off to a human when it matters",
      ],
      href: "/services/voice",
      art: { sky: "deep", label: "Voice" },
    },
    {
      n: "03",
      title: "AI Agents",
      summary:
        "Assistants and agents that know your product, your data and your rules — scoped tightly enough to be trusted, and evaluated so you know when they drift.",
      bullets: [
        "Retrieval over your own knowledge base",
        "Tool use wired into real systems",
        "Guardrails and evaluation suite",
        "Cost and latency tuning",
      ],
      href: "/services/agents",
      art: { sky: "dusk", label: "Agents" },
    },
    {
      n: "04",
      title: "Product Build",
      summary:
        "The whole thing: interface, model layer and infrastructure. For teams taking an AI product to market, and for clients whose automations have outgrown the tools they were built in.",
      bullets: [
        "Product and interface design",
        "Full-stack build and deployment",
        "Model orchestration and fallbacks",
        "Image and content generation where the product needs it",
        "Launch support and iteration",
      ],
      href: "/services/product",
      art: { sky: "cumulus", label: "Product" },
      project: "newsbit",
    },
  ],
};

export const twoUp = [
  {
    title: "Start with an audit",
    body: "A focused review of your workflows, data and tooling, with the highest-leverage automations ranked and a recommended scope.",
    cta: "Explore",
    href: "/services/automation",
  },
  {
    title: "How I work",
    body: "See how I establish what needs to change, agree the scope, review the direction, and take it through to production.",
    cta: "Explore",
    href: "/studio#process",
  },
];

export const process = {
  eyebrow: "The studio",
  title: "Meet Upper Layer",
  body:
    "I lead strategy and build on every project directly, bringing in specialist designers and engineers when a scope calls for it. We establish what needs to change, preserve what already works, and agree the scope around that need.",
  steps: [
    {
      n: "01",
      title: "Agree what needs to change",
      body: "I review the brief, map your current workflow, preserve what works, and define the deliverables, responsibilities and fee.",
    },
    {
      n: "02",
      title: "Review the direction before full build",
      body: "You assess a working prototype against the agreed brief while changes are still cheap and focused.",
    },
    {
      n: "03",
      title: "Ship the scope and hand over",
      body: "I deploy into your environment, document it, and give your team the access, runbooks and guidance to own it.",
    },
  ],
  founder: {
    name: "Jay Patel",
    role: "Founder, Upper Layer Studio",
    photo: { src: "/brand/jay-patel-founder.jpg", alt: "Jay Patel, founder of Upper Layer Studio" },
    link: { label: "Connect on LinkedIn", href: "https://www.linkedin.com/in/jaypatel3405/" },
    heading: "Your project, led by me",
    body: [
      "I'm Jay, and I'm drawn to automating work with AI, building products and AI voice agents, and to the real-world applications of all of them.",
      "We start by agreeing what needs to change and what should stay. You review the direction in working software, then I ship the scope and hand over the code, access and guidance your team needs.",
    ],
  },
  credentials: [
    { value: "2+ yrs", label: "Software development", sub: "Full-stack, backend and AI" },
    {
      // Counts the case studies actually published, so it can never overstate.
      value: String(projects.length),
      label: projects.length === 1 ? "Case study" : "Case studies",
      sub: "Real products, with the build explained",
    },
    { value: "4", label: "Services", sub: "Automation, Voice AI, Agents, Product Build" },
  ],
};

export const faqs = {
  eyebrow: "A few useful answers",
  title: "Read the FAQs",
  items: [
    {
      q: "Do we need an AI strategy before we build anything?",
      a: "No. Strategy that isn't grounded in a working system tends to age badly. We start with one high-leverage workflow, ship it, and let what we learn there shape the wider plan.",
    },
    {
      q: "Do you build your own AI models?",
      a: "No, and be wary of anyone who says they do. The intelligence comes from models like Claude and GPT, and from dedicated speech providers for voice. What I build is everything around them — the architecture, the integrations, the guardrails and the interface. That's the part that's specific to your business, and it's the part you own.",
    },
    {
      q: "Do I have to end up with a custom product?",
      a: "No. Plenty of work stops at an automation that quietly runs forever, and that's a good outcome. But when a workflow becomes central to how you operate, paying per task inside someone else's tool stops making sense. At that point I'll tell you it's worth rebuilding as your own software, and show you the maths.",
    },
    {
      q: "Can you work with the tools we already use?",
      a: "That's the default. I build on top of your existing stack — CRM, helpdesk, warehouse, spreadsheets, whatever is actually in use — rather than asking you to migrate first.",
    },
    {
      q: "Who will I actually be working with?",
      a: "Me, directly, start to finish. Upper Layer is a one-person studio by design: you talk to the person writing the code. When a scope needs specialist design or infrastructure work I bring in people I've worked with before, but I stay on the project throughout.",
    },
    {
      q: "How are projects priced?",
      a: "Fixed fee against an agreed scope, split across milestones. You'll have the number and the deliverables in writing before any work starts. Ongoing support is a separate monthly retainer if you want it.",
    },
    {
      q: "What happens on the call?",
      a: "Thirty minutes. You describe the problem, I ask about your current workflow and constraints, and you leave with an honest read on whether AI is the right answer and what it would take. If it isn't, I'll tell you.",
    },
    {
      q: "Who owns what you build?",
      a: "You do. Code, prompts, infrastructure and documentation are handed over in your own accounts. I'm not building a dependency on me.",
    },
  ],
};

export const cta = {
  eyebrow: "Start a project",
  title: "Tell me what needs to change",
  body: "Share your product and the work you need. I'll help you find the right scope and next step.",
  primary: { label: "Book a call", href: site.book },
  secondary: { label: "Or email the studio", href: `mailto:${site.email}` },
};

export const footer = {
  /**
   * The reference footer links visitors to AI engines with a pre-filled
   * research prompt. It is a good idea: people vet suppliers through an
   * assistant now, and this makes sure the assistant reads the site rather
   * than guessing. The prompt deliberately asks for scepticism — it names the
   * studio as new, so the answer can't be contradicted by the /work page.
   */
  aiPrompt:
    "Review Upper Layer Studio as an AI automation and product partner using https://upperlayerstudio.com. Explain its services, how it scopes and prices work, and likely project fit. It is a new studio with no published case studies yet, so separate what the site evidences from what it only claims, and list useful questions to ask before hiring.",
  aiEngines: [
    { label: "ChatGPT", base: "https://chatgpt.com/?q=" },
    { label: "Claude", base: "https://claude.ai/new?q=" },
    { label: "Gemini", base: "https://gemini.google.com/app?q=" },
    { label: "Perplexity", base: "https://www.perplexity.ai/search?q=" },
    { label: "Grok", base: "https://grok.com/?q=" },
  ],
  columns: [
    {
      title: "Services",
      links: [
        { label: "AI Automation", href: "/services/automation" },
        { label: "Voice AI", href: "/services/voice" },
        { label: "AI Agents", href: "/services/agents" },
        { label: "Product Build", href: "/services/product" },
      ],
    },
    {
      title: "Studio",
      links: [
        { label: "Selected work", href: "/work" },
        { label: "About the studio", href: "/studio" },
        { label: "The Lab", href: "/lab" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Insights", href: "/insights" },
        { label: "The Lab", href: "/lab" },
        { label: "Process", href: "/studio#process" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
};
