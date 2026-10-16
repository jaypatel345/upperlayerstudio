/**
 * Insights — the studio's written pieces, and the Lab index.
 *
 * Both exist for the same reason: with no case studies yet, published thinking
 * and published experiments are the only proof a visitor can actually inspect.
 * Every piece here takes a position Jay already holds, so nothing has to be
 * walked back in a sales call.
 *
 * Posts are authored as structured sections rather than raw HTML so the article
 * template controls the typography and nothing can drift.
 */


export type PostSection = { heading?: string; paragraphs: string[]; list?: string[] };

export type Post = {
  slug: string;
  title: string;
  /** Shown on the card and under the article title */
  summary: string;
  date: string;
  lastUpdated?: string;
  readingTime: string;
  topic: string;
  /**
   * Cover screenshot, borrowed from the case study the article draws on:
   * the project's slug and the shot's src, both as they appear in projects.ts.
   */
  cover: { project: string; src: string };
  serviceSlug?: string;
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "automation-or-agent",
    title: "Automation or agent? Pick the boring one",
    summary:
      "Most problems sold as AI agents are automations wearing a costume. Here's the test I use before quoting either.",
    date: "2026-09-24",
    lastUpdated: "2026-10-16",
    readingTime: "4 min read",
    topic: "Automation",
    serviceSlug: "automation",
    cover: { project: "ai-lead-agent", src: "/work/ai-agent-lead/04-n8n-lead-intake-desktop.webp" },
    sections: [
      {
        paragraphs: [
          "The difference matters commercially, not just technically. An automation follows a path you defined. An agent decides which path to take. One of those is predictable and cheap to run; the other needs guardrails, evaluations and a budget for the days it surprises you.",
          "Most briefs that arrive asking for an agent describe an automation. That is good news for the person asking, because the automation is cheaper, ships sooner and breaks less often.",
        ],
      },
      {
        heading: "The test",
        paragraphs: [
          "Write down the decision the system has to make. Then ask whether you could write the rule for it on one page.",
          "If you can, it is an automation. A quote that follows your pricing table, an onboarding that always runs the same seven steps, an invoice chase that fires on day thirty — all rules. Write them down once and they run forever, at a cost you can predict to the rupee.",
          "If you genuinely cannot — because the input is a customer writing in free text about a problem you have never seen phrased that way — then you need something that can reason about it. That is an agent, and it should be scoped as narrowly as you can stand.",
        ],
      },
      {
        heading: "Why people reach for the agent anyway",
        paragraphs: [
          "Partly because it is the thing being sold. Partly because an agent feels future-proof: if the rules change, surely the clever system adapts?",
          "In practice it is the reverse. When rules change, you edit an automation in an afternoon and you know exactly what changed. You edit an agent by adjusting a prompt and then you need an evaluation suite to tell you what else you broke. The flexible option is the one that costs more to change, which is not the trade most people think they are making.",
        ],
      },
      {
        heading: "Where agents genuinely win",
        paragraphs: ["Four situations, in my experience:"],
        list: [
          "The input is unstructured and written by a human who does not know your categories.",
          "The number of possible paths is large enough that enumerating them is its own project.",
          "The system has to read something — a document, a thread, a transcript — and decide what matters in it.",
          "You need it to use several tools in an order that depends on what it finds.",
        ],
      },
      {
        heading: "The honest version of the pitch",
        paragraphs: [
          "If you ask me for an agent and your problem is an automation, I will build the automation and tell you why. It is a smaller invoice and it is the right answer, and I would rather have the second project than the first argument.",
        ],
      },
    ],
  },
  {
    slug: "nobody-builds-the-model",
    title: "Nobody in this business builds the model",
    summary:
      "What an AI studio actually makes, what it rents, and why the distinction should be on the invoice.",
    date: "2026-09-17",
    lastUpdated: "2026-10-16",
    readingTime: "3 min read",
    topic: "Working with AI",
    serviceSlug: "product",
    cover: { project: "promptx", src: "/work/promptx/05-model-picker-desktop.webp" },
    sections: [
      {
        paragraphs: [
          "There is an impression — encouraged by a lot of marketing — that hiring an AI studio means someone builds you an artificial intelligence. Almost nobody does that, and the handful who do are training foundation models at a cost measured in the tens of millions.",
          "What everyone else does, including me, is build the system around a model somebody else trained.",
        ],
      },
      {
        heading: "Rented versus built",
        paragraphs: [
          "The intelligence is rented. Claude, GPT, a speech provider for voice. You pay per token or per minute and you get a capability that would be irrational to reproduce.",
          "The system is built. The architecture, the integrations, the retrieval over your data, the guardrails, the evaluation suite, the interface, the deployment. That is the part that is specific to your business, and it is the part that determines whether the rented intelligence is useful or embarrassing.",
        ],
      },
      {
        heading: "Why say so out loud",
        paragraphs: [
          "Because the client finds out eventually, and it is better coming from the person they are paying.",
          "It also reframes the conversation usefully. If the model is rented, then the model is not the differentiator — your competitor can rent the same one tomorrow. What they cannot rent is a system that knows your pricing, your stock, your policies and your tools. That is where the value sits, and that is what the invoice is actually for.",
        ],
      },
      {
        heading: "The question to ask any studio",
        paragraphs: [
          "Not \"which model do you use\" — that answer changes every few months and should. Ask what happens when the model they chose gets worse, gets expensive, or gets deprecated.",
          "A good answer involves fallbacks, an evaluation suite that would catch the regression, and a model layer that can be swapped without rewriting the product. A bad answer is a brand name said with confidence.",
        ],
      },
    ],
  },
  {
    slug: "voice-agent-real-cost",
    title: "What a voice agent actually costs to run",
    summary:
      "Per-minute pricing looks trivial until you multiply it. A plain look at the running costs nobody quotes.",
    date: "2026-09-10",
    lastUpdated: "2026-10-16",
    readingTime: "4 min read",
    topic: "Voice AI",
    serviceSlug: "voice",
    cover: { project: "frontdeskai", src: "/work/frontdeskai/01-dashboard-overview-desktop.webp" },
    sections: [
      {
        paragraphs: [
          "The build fee is the part everyone asks about. The running cost is the part that decides whether the thing survives its first busy month, and it is made of four bills, not one.",
        ],
      },
      {
        heading: "The four bills",
        paragraphs: ["Every voice agent is paying for all of these simultaneously:"],
        list: [
          "Telephony — the number and the minutes. Cheap, predictable, the one everyone budgets for.",
          "Speech to text — converting the caller's words. Priced per minute of audio.",
          "The language model — deciding what to say. Priced per token, and it grows with how much context you hand it on every turn.",
          "Text to speech — saying it back. Priced per character, and the good voices cost noticeably more than the acceptable ones.",
        ],
      },
      {
        heading: "Where the surprise usually comes from",
        paragraphs: [
          "Not from volume. From context length.",
          "A naive implementation sends the entire conversation history to the model on every single turn. A six-minute call with thirty turns re-sends a growing transcript thirty times. The per-token price was never the problem; the multiplication was. Summarising older turns instead of resending them is the single change that most often halves a bill.",
          "The second surprise is the voice. Teams pick the most natural-sounding option during a demo nobody is paying for, then discover it is several times the cost of one that callers would not have noticed.",
        ],
      },
      {
        heading: "What this means for the brief",
        paragraphs: [
          "Decide early what a call is worth to you. A business where a booked job is worth ₹15,000 can afford a generous per-minute cost and a premium voice. A business triaging support queries at low value per call needs the cheap path, shorter prompts and a quick hand-off.",
          "That number should be in the scope before anything is built, because it changes the architecture — not just the invoice.",
        ],
      },
      {
        heading: "The one that is free",
        paragraphs: [
          "Hanging up quickly. An agent that identifies what the caller needs in forty seconds and books it costs a fraction of one that explores. Most of the tuning work on a voice agent is making it shorter, which is also what the caller wanted.",
        ],
      },
    ],
  },
  {
    slug: "ai-receptionist-cost-india",
    title: "AI receptionist cost in India: real setup, running and API numbers",
    summary:
      "Per-minute voice AI costs in India, telephony rates on Exotel and Twilio, and how an AI phone receptionist compares to a full-time clinic front desk.",
    date: "2026-10-12",
    lastUpdated: "2026-10-16",
    readingTime: "5 min read",
    topic: "Voice AI",
    serviceSlug: "voice",
    cover: { project: "frontdeskai", src: "/work/frontdeskai/01-dashboard-overview-desktop.webp" },
    sections: [
      {
        paragraphs: [
          "A full-time front-desk receptionist in Mumbai, Delhi, or Bangalore costs between ₹20,000 and ₹40,000 per month. For that salary, you get someone who handles walk-in clients, manages the register, and picks up the phone during business hours. What you do not get is someone who answers calls at 8:30 PM when someone is searching for a dental consultation, or on a Sunday morning when an enquiry comes in.",
          "An AI phone receptionist doesn't replace the human running your front desk; it catches the 30% to 50% of inbound calls that happen when that person is already on another line or the clinic is closed. Here is what that system actually costs to build and run in India, without agency markup.",
        ],
      },
      {
        heading: "The four API bills on an Indian number",
        paragraphs: [
          "Every production voice agent — including the system I built in the FrontDesk AI case study — pays for four separate services simultaneously:",
        ],
        list: [
          "Telephony (Twilio or Exotel): An Indian local DID or 1800 toll-free virtual number costs ₹800 to ₹1,500/month rental, plus approx. ₹0.50 to ₹0.90 per incoming call minute.",
          "Speech-to-Text (Deepgram Nova-3): Transcribing Indian English, accents, and local speech patterns costs $0.0043 per minute (~₹0.36/min).",
          "The Language Model (GPT-4o mini or Claude 3.5 Haiku): Processing caller intent, checking FAQs, and deciding how to reply runs about $0.15 per million input tokens. On a 2-minute call with trimmed context, that is under ₹0.25.",
          "Text-to-Speech (Cartesia or ElevenLabs Turbo): Synthesizing natural conversational speech costs approx. $0.015 per 1,000 characters (~₹1.20 to ₹1.80 per minute of spoken audio).",
        ],
      },
      {
        heading: "The monthly total for 500 calls",
        paragraphs: [
          "Assume a typical high-intent clinic or firm receiving 500 calls a month, averaging two minutes each (1,000 total conversation minutes):",
        ],
        list: [
          "Telephony rental + inbound minutes: ~₹1,800/month",
          "Transcription (Deepgram): ~₹360/month",
          "LLM logic and extraction: ~₹250/month",
          "Voice synthesis (TTS): ~₹1,500/month",
          "WhatsApp notification API (confirmations): ~₹450/month",
        ],
      },
      {
        paragraphs: [
          "The total running cost comes out to ₹4,300 to ₹5,500 ($50–$65) per month for 500 completed, fully transcribed phone calls. If a single cosmetic procedure or legal retainer is worth ₹5,000 to ₹25,000, saving even one missed after-hours enquiry pays for the entire monthly run.",
        ],
      },
      {
        heading: "Where Indian implementations waste money",
        paragraphs: [
          "First, latency routing. If your voice orchestration server is deployed in North America (us-east-1), the round-trip latency to a caller in Pune or Gurgaon adds 300ms of lag. Combined with model inference, the awkward pause stretches to nearly two seconds. Hosting the orchestration in AWS Mumbai (ap-south-1) cuts round-trip audio transport to under 40ms.",
          "Second, context accumulation. A naive implementation sends the full transcript of all previous turns back into the model on every single turn. A 10-turn call resends a 500-token prompt ten times. Pruning older turns into rolling summaries halves model token costs and speeds up voice responses by 200ms.",
          "Third, over-promising on languages. Indian businesses frequently ask for an agent that speaks Hindi, English, Marathi, and Tamil out of the box. In practice, starting with bilingual English and conversational Hindi covers 90% of urban enquiries. Trying to support five languages before mastering one leads to hallucinated bookings and angry callers.",
        ],
      },
      {
        heading: "Own the system or rent a wrapper?",
        paragraphs: [
          "Many third-party SaaS vendors charge ₹15,000 to ₹35,000 per month for a closed dashboard that wraps standard Vapi or Twilio APIs. The moment you want to customize your booking logic, integrate your internal CRM, or adjust your qualification questions, you hit a wall.",
          "With our voice AI service, the logic, scripts, telephony number, and integrations are built and handed over directly in your own accounts. You pay the raw API bills with no markup, and your software remains yours from day one.",
        ],
      },
    ],
  },
  {
    slug: "n8n-vs-zapier-lead-automation",
    title: "n8n vs Zapier for lead automation: cost, control, and where Zapier breaks",
    summary:
      "Why I run lead qualification and CRM pipelines on n8n instead of Zapier: execution speed, branching, data privacy, and the 50,000-task bill.",
    date: "2026-10-14",
    lastUpdated: "2026-10-16",
    readingTime: "5 min read",
    topic: "Automation",
    serviceSlug: "automation",
    cover: { project: "ai-lead-agent", src: "/work/ai-agent-lead/03-n8n-workflows-desktop.webp" },
    sections: [
      {
        paragraphs: [
          "Zapier is usually the first tool any operator sets up. It takes a form submission from Typeform and sends an email via Gmail in under ten minutes. It is friendly, well-documented, and works seamlessly for basic two-step automations.",
          "However, when your pipeline grows from a simple notification into a serious lead qualification system — validating schemas, enriching domains, scoring intent with Gemini or Claude, routing based on score tiers, writing custom properties to HubSpot, and scheduling WhatsApp follow-ups — Zapier starts breaking down both architecturally and commercially.",
        ],
      },
      {
        heading: "The task pricing trap",
        paragraphs: [
          "Zapier charges by the task: every single step in a Zap consumes one task from your monthly quota. Let's look at the math for a standard lead qualification workflow:",
        ],
        list: [
          "Step 1: Webhook intake and validation (1 task)",
          "Step 2: Company website domain enrichment (1 task)",
          "Step 3: AI model evaluation and JSON parsing (1 task)",
          "Step 4: Branching logic / filter (1 task)",
          "Step 5: CRM contact upsert in HubSpot (1 task)",
          "Step 6: Telegram / Slack founder alert (1 task)",
          "Step 7: WhatsApp or Email personalized reply (1 task)",
        ],
      },
      {
        paragraphs: [
          "That is 7 tasks for every single lead submission. If you generate 2,000 inbound enquiries or lead imports a month, that is 14,000 tasks. If you run a periodic 24-hour and 48-hour follow-up check across open leads, you easily burn 30,000 to 50,000 tasks per month. On Zapier's pricing ladder, that pushes your monthly bill to $300–$600+ every month.",
          "With self-hosted n8n running on a lightweight VPS (like a $6–$10/month Hetzner or DigitalOcean droplet), execution counts are unlimited. Whether you run 1,000 or 500,000 tasks, your hosting cost remains static.",
        ],
      },
      {
        heading: "Complex branching versus linear chains",
        paragraphs: [
          "Real-world lead automation is rarely linear. In our AI Client Acquisition System case study, an enquiry can arrive from a website form, Typeform, Tally, or Apollo. It must be normalised into a common schema, evaluated for spam, categorized into hot/warm/cold tiers, and routed to different communication channels.",
          "Zapier handles branching through separate Path filters or sub-zaps, which quickly become untangleable webs where finding an error requires opening four different browser tabs. In n8n, complex conditional branching, loops, and custom JavaScript or Python code nodes sit cleanly on one visual canvas.",
        ],
      },
      {
        heading: "Observability and error recovery",
        paragraphs: [
          "When a lead submission fails in production — perhaps because a prospect entered an invalid phone number or an AI API returned a temporary 503 — you need to know immediately, inspect the exact payload, fix the prompt or schema, and replay the execution.",
          "n8n records the complete JSON input and output at every single node of every execution. You can pin test data, tweak code inline, and retry failed executions with one click. In Zapier, debugging custom payload errors is frustratingly opaque, and replaying failed webhook tasks often requires re-triggering external events.",
        ],
      },
      {
        heading: "Data residency and client ownership",
        paragraphs: [
          "When handling customer leads containing phone numbers, personal emails, budgets, and business requirements, routing that data through third-party multi-tenant SaaS servers can violate compliance policies. Self-hosting n8n inside your own cloud account ensures your lead data never leaves your infrastructure.",
          "If you have two simple zaps moving spreadsheets to Slack, keep Zapier. But if you want a robust system that qualifies leads in 14 seconds and costs nothing to scale, explore our AI automation services.",
        ],
      },
    ],
  },
  {
    slug: "how-to-automate-lead-follow-up",
    title: "How to automate lead follow-up: speed-to-lead, WhatsApp, and when to stop",
    summary:
      "Most leads go cold in the first five minutes. How I built a 14-second response system with AI scoring, WhatsApp messaging, and automatic shut-off.",
    date: "2026-10-15",
    lastUpdated: "2026-10-16",
    readingTime: "4 min read",
    topic: "Automation",
    serviceSlug: "automation",
    cover: { project: "ai-lead-agent", src: "/work/ai-agent-lead/08-gmail-ai-reply-desktop.webp" },
    sections: [
      {
        paragraphs: [
          "A study published in the Harvard Business Review established that businesses contacting inbound leads within an hour are nearly seven times more likely to qualify the prospect than those that wait even two hours. Contact them within five minutes, and conversion jumps by 21x.",
          "Yet in most B2B service firms, an inbound form submission lands in a general inbox. Someone notices it three hours later, forwards it to a colleague, and an email goes out the next morning — by which time the prospect has already booked a discovery call with a competitor.",
        ],
      },
      {
        heading: "The three tiers: hot, warm, and spam",
        paragraphs: [
          "Automating follow-up does not mean sending the exact same canned template to every person who fills out your form. Doing that destroys credibility.",
          "A modern lead workflow pipes the submission to a fast model (such as Gemini 3 Flash or Claude 3.5 Haiku) with strict JSON schema instructions to extract four signals: intent, budget, urgency, and fit. Code nodes then enforce rigid business rules:",
        ],
        list: [
          "Hot (Score 70+): Urgent need with clear budget. Immediate personalized reply with direct calendar link, plus instant alert sent to founder's Telegram and WhatsApp.",
          "Warm (Score 40-69): Good fit, exploratory timing. Tailored reply answering their specific question and referencing a relevant case study.",
          "Cold / Spam (Score <40): Off-topic pitches, link exchanges, or incoherent requests. Stored in CRM for records, but no outbound reply is sent.",
        ],
      },
      {
        paragraphs: [
          "Filtering spam automatically ensures you never send an automated calendar link to someone trying to sell you backlink packages.",
        ],
      },
      {
        heading: "Why email alone is losing the race",
        paragraphs: [
          "Average business email open rates hover around 25% to 35%, and spam filters frequently swallow messages containing booking links. In international markets — especially across India, the UK, Europe, and the Middle East — WhatsApp is where business communication actually happens.",
          "When an enquiry includes a phone number, the automation should fire two parallel actions: a clean plain-text email with your signature, and a polite, conversational WhatsApp message through the official WhatsApp Business Cloud API. Our production metrics on the AI Client Acquisition System show a 14-second average turnaround from form submission to WhatsApp delivery.",
        ],
      },
      {
        heading: "The most important feature: reply detection",
        paragraphs: [
          "The biggest danger with automated follow-up sequences is lack of awareness. Nothing looks more amateur than receiving an automated 'Just bumping this to the top of your inbox!' message when the prospect has already replied and agreed to a meeting.",
          "Any follow-up engine must implement two-way synchronization:",
        ],
        list: [
          "Cal.com / Calendly Webhook: If the prospect books a call, all subsequent email and WhatsApp nudges are immediately canceled.",
          "Inbound Reply Listener: Webhooks listening to Gmail/IMAP and WhatsApp parse incoming messages. The instant a reply is detected, the automated sequence halts, the CRM status updates to 'In Conversation', and an alert notifies you to take over.",
        ],
      },
      {
        heading: "Start with your highest-leverage leak",
        paragraphs: [
          "You do not need an enterprise marketing cloud to achieve this. With self-hosted n8n, free Gemini API tiers, and HubSpot's free CRM, you can deploy a lead follow-up system that runs 24/7 for under $10 a month. If you want this engineered and deployed for your business, take a look at our AI automation services.",
        ],
      },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const insightsIndex = {
  meta: {
    title: "Insights on AI Automation & Voice Agents",
    description:
      "Written positions on AI automation, voice agents and shipping AI products — the thinking behind how Upper Layer Studio scopes work.",
  },
  hero: {
    eyebrow: "Insights & Articles",
    headline: { lead: "AI Automation & Voice Insights:", trail: "Positions, not predictions" },
    body: "Short pieces on how this work actually goes — what to build, what to rent, and what things cost once they are running. Everything here is a position I will defend on a call, which is the only reason to publish it.",
    tags: ["Automation", "Voice AI", "Working with AI"],
  },
};

/* -------------------------------------------------------------------- Lab */

export type LabEntry = {
  title: string;
  kind: string;
  body: string;
  detail: string;
  /** Which live demo fills the entry's tile on /lab */
  demo: "marquee" | "copy" | "docs";
};

export const lab = {
  meta: {
    title: "The Lab: Experiments & Internal Tools",
    description:
      "Experiments and internal tools from Upper Layer Studio — the techniques behind the studio's own site and tooling, written up in full.",
  },
  hero: {
    eyebrow: "Experiments and internal tools",
    title: "The Lab",
    body: "Studio work that isn't a client project: techniques worth keeping, problems worth writing down, and tools built because the alternative was doing something by hand twice. Each tile is the real thing running, not a picture of it.",
  },

  entries: [
    {
      title: "The marquee that didn't loop",
      kind: "Bug write-up",
      body: "The logo strip scrolls a duplicated list and translates by exactly -50%, so one loop travels the width of one copy. That copy measured 1,033px while the strip spans the full viewport — so on any wider screen the names ran out before the reset and left a visible gap.",
      detail: "The fix isn't a faster animation, it's more repeats: enough that one loop distance always exceeds the screen. Duration scales with the repeat count so the speed never changes.",
      demo: "marquee",
    },
    {
      title: "Copy that lives in one file",
      kind: "Architecture",
      body: "No string on this site is written inside a component. Everything resolves to a typed content layer, which means the voice can be audited in one place and a service page is an object rather than a route.",
      detail: "Adding a fifth service means adding data, not building a page. The template, the metadata, the nav entry and the related-service links all follow from it.",
      demo: "copy",
    },
    {
      title: "Reading the docs that shipped with the framework",
      kind: "Practice",
      body: "This site runs on a Next.js version newer than most training data, where conventions have genuinely changed. The project instructs any agent working on it to read the docs bundled inside the installed package before writing a line.",
      detail: "It costs two minutes and it is the difference between code that matches the framework you actually installed and code that matches the one that was current eighteen months ago.",
      demo: "docs",
    },
  ] as LabEntry[],
};
