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

import type { SkyVariant } from "@/components/ui/SkyPlate";

export type PostSection = { heading?: string; paragraphs: string[]; list?: string[] };

export type Post = {
  slug: string;
  title: string;
  /** Shown on the card and under the article title */
  summary: string;
  date: string;
  readingTime: string;
  topic: string;
  sky: SkyVariant;
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "automation-or-agent",
    title: "Automation or agent? Pick the boring one",
    summary:
      "Most problems sold as AI agents are automations wearing a costume. Here's the test I use before quoting either.",
    date: "2026-09-24",
    readingTime: "4 min read",
    topic: "Automation",
    sky: "clear",
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
    readingTime: "3 min read",
    topic: "Working with AI",
    sky: "high",
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
    readingTime: "4 min read",
    topic: "Voice AI",
    sky: "deep",
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
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const insightsIndex = {
  meta: {
    title: "Insights on AI Automation & Voice Agents",
    description:
      "Written positions on AI automation, voice agents and shipping AI products — the thinking behind how Upper Layer Studio scopes work.",
  },
  hero: {
    eyebrow: "Insights",
    headline: { lead: "Positions,", trail: "not predictions" },
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
  sky: SkyVariant;
};

export const lab = {
  meta: {
    title: "The Lab: Experiments & Internal Tools",
    description:
      "Experiments and internal tools from Upper Layer Studio — the techniques behind the studio's own site and tooling, written up in full.",
  },
  hero: {
    eyebrow: "The Lab",
    headline: { lead: "Things built", trail: "to find out" },
    body: "The Lab is where studio work that isn't a client project goes: techniques worth keeping, problems worth writing down, and tools built because the alternative was doing something by hand twice.",
    tags: ["Open techniques", "Built in public", "No client data"],
  },
  intro: {
    eyebrow: "What's in here",
    title: "Small things, solved properly",
    body: "None of this is a product. It's the working-out — published because a studio with no client case studies yet should at least show its hands.",
  },
  entries: [
    {
      title: "A sky with no photograph in it",
      kind: "Technique",
      body: "Every piece of imagery on this site is built from layered CSS gradients rather than a photo: a base wash, a stack of cloud radials, one blurred pass to keep the edges atmospheric, and a noise overlay to stop wide screens banding.",
      detail: "Six variants, zero image bytes, no pixelation at any size, and the whole system recolours from design tokens instead of fighting them.",
      sky: "cumulus",
    },
    {
      title: "The marquee that didn't loop",
      kind: "Bug write-up",
      body: "The logo strip scrolls a duplicated list and translates by exactly -50%, so one loop travels the width of one copy. That copy measured 1,033px while the strip spans the full viewport — so on any wider screen the names ran out before the reset and left a visible gap.",
      detail: "The fix isn't a faster animation, it's more repeats: enough that one loop distance always exceeds the screen. Duration scales with the repeat count so the speed never changes.",
      sky: "haze",
    },
    {
      title: "Copy that lives in one file",
      kind: "Architecture",
      body: "No string on this site is written inside a component. Everything resolves to a typed content layer, which means the voice can be audited in one place and a service page is an object rather than a route.",
      detail: "Adding a fifth service means adding data, not building a page. The template, the metadata, the nav entry and the related-service links all follow from it.",
      sky: "high",
    },
    {
      title: "Reading the docs that shipped with the framework",
      kind: "Practice",
      body: "This site runs on a Next.js version newer than most training data, where conventions have genuinely changed. The project instructs any agent working on it to read the docs bundled inside the installed package before writing a line.",
      detail: "It costs two minutes and it is the difference between code that matches the framework you actually installed and code that matches the one that was current eighteen months ago.",
      sky: "dusk",
    },
  ] as LabEntry[],
};
