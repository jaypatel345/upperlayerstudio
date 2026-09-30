/**
 * Every string on the site lives here. Edit copy without touching components.
 *
 * Voice: first person singular. This is a solo studio — "I" reads as specific
 * and confident; "we" writes a cheque the proof can't cash yet.
 *
 * Numbers rule: nothing here claims a past result. Every figure is a
 * commitment that can be kept from day one. Swap them for real outcome
 * metrics once there is delivered work to point at.
 */

export const site = {
  name: "Upper Layer Studio",
  wordmark: "UPPER LAYER",
  wordmarkSuffix: "®",
  tagline: "The AI layer that levels up your business.",
  email: "hello@upperlayerstudio.com",
  location: "Ahmedabad · Working globally",
  calendly: "#book-a-call",
  socials: [
    { label: "X.com", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ],
} as const;

export const nav = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "AI Automation", href: "/services/automation", desc: "Workflows that run without you" },
      { label: "AI Agents", href: "/services/agents", desc: "Custom agents wired into your stack" },
      { label: "AI Product Build", href: "/services/product", desc: "From prototype to production" },
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
  badge: "AI automation and AI products",
  headline: { lead: "Ship the AI layer", trail: "your business is missing" },
  body:
    "Drowning in manual work, sitting on data you never use, or trying to get an AI product out the door? I design and build the automation, agents and interfaces that turn that intent into something running in production.",
  primary: { label: "Book a call", href: "#book-a-call" },
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
  "LangChain",
  "Supabase",
  "Vercel",
  "n8n",
  "Pinecone",
  "Zapier",
];

export const services = {
  eyebrow: "How I can help",
  title: "What needs to change?",
  body:
    "Start with the problem you need to solve. We agree the scope together, keep what already works, and take the right work through to production.",
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
      art: { from: "#4d93e0", via: "#7db6ee", to: "#e8f3fc", label: "Automation" },
    },
    {
      n: "02",
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
      art: { from: "#171717", via: "#3b3b3b", to: "#7db6ee", label: "Agents" },
    },
    {
      n: "03",
      title: "AI Product Build",
      summary:
        "The whole thing: interface, model layer and infrastructure. For teams taking an AI product to market who need it designed and shipped, not prototyped again.",
      bullets: [
        "Product and interface design",
        "Full-stack build and deployment",
        "Model orchestration and fallbacks",
        "Launch support and iteration",
      ],
      href: "/services/product",
      art: { from: "#7db6ee", via: "#bcdcf7", to: "#ffffff", label: "Product" },
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
    link: { label: "Connect on LinkedIn", href: "#" },
    heading: "Your project, led by me",
    body: [
      "I'm Jay. Upper Layer Studio is me — I lead strategy and build on every project, and bring in specialist designers and engineers when production calls for it.",
      "We start by agreeing what needs to change and what should stay. You review the direction in working software, then I ship the scope and hand over the code, access and guidance your team needs.",
    ],
  },
  credentials: [
    { value: "Fixed", label: "Fee agreed up front", sub: "No hourly billing, no scope creep" },
    { value: "48h", label: "Proposal after our call", sub: "Scope, timeline and number in writing" },
    { value: "Yours", label: "Code, prompts and infra", sub: "In your own accounts. No lock-in" },
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
  primary: { label: "Book a call", href: "#book-a-call" },
  secondary: { label: "Or email the studio", href: `mailto:${site.email}` },
};

export const footer = {
  columns: [
    {
      title: "Services",
      links: [
        { label: "AI Automation", href: "/services/automation" },
        { label: "AI Agents", href: "/services/agents" },
        { label: "AI Product Build", href: "/services/product" },
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
        { label: "Process", href: "/studio#process" },
        { label: "Book a call", href: "#book-a-call" },
      ],
    },
  ],
};
