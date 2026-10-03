/**
 * Case studies for /work and the homepage "Selected work" section.
 *
 * Same rules as the rest of the site's copy: first person singular, and every
 * claim is something that can be checked on the live product, the repo or the
 * CI history. Newsbit is the studio's own product, not client work, and the
 * page says so.
 *
 * Adding a project: append to `projects`. The card, the case study route and
 * the static params all derive from this one list.
 */

import type { SkyVariant } from "@/components/ui/SkyPlate";

export type Shot = {
  src: string;
  alt: string;
  caption: string;
  w: number;
  h: number;
};

export type Project = {
  slug: string;
  name: string;
  /** Short category line shown on cards */
  kind: string;
  /** Which of the four services this project is proof of */
  service: string;
  /** One-sentence card summary */
  summary: string;
  art: SkyVariant;
  live: string;
  repo: string;
  meta: { label: string; value: string }[];
  problem: string;
  built: string;
  features: { title: string; body: string }[];
  pipeline: { title: string; body: string }[];
  stack: { group: string; items: string[] }[];
  result: { stat: string; label: string; source: string };
  /** Cover pair used on cards and the case-study hero */
  cover: { desktop: Shot; mobile: Shot };
  /** Screenshots grouped by what they show, in reading order */
  screens: ScreenGroup[];
  /**
   * Walkthrough video. Set `src` to "" to show the "coming soon" poster
   * instead; swap in a hosted URL and nothing else needs to change.
   */
  video: { src: string; poster: string; note: string };
};

export type ScreenGroup = {
  title: string;
  body: string;
  /** "desktop" shots are 16:10 captures, "phone" shots are bare phone screens */
  kind: "desktop" | "phone";
  shots: Shot[];
};

const base = "/work/newsbit";

export const projects: Project[] = [
  {
    slug: "newsbit",
    name: "Newsbit",
    kind: "AI news app",
    service: "Product Build",
    summary:
      "An AI news app that ranks the day's top 10 stories and summarises each one with a link to the original, refreshed automatically every morning.",
    art: "clear",
    live: "https://www.newsbit.in",
    repo: "https://github.com/jaypatel345/newsbit",
    meta: [
      { label: "Type", value: "Own product" },
      { label: "Role", value: "Design, backend, frontend, deployment" },
      { label: "Status", value: "Live at newsbit.in" },
      { label: "Service", value: "Product Build" },
    ],
    problem:
      "Busy people don't have time to read dozens of long articles just to know what happened today. Most news apps hand you more to read, not less.",
    built:
      "Newsbit pulls the day's headlines, ranks the top 10 and uses Groq's Llama 3.3 to write a short summary of each, with a link to the original article. A scheduled job refreshes everything at 6 AM IST, and a chat lets readers ask follow-up questions about the news.",
    features: [
      {
        title: "Today's Brief",
        body: "The day's biggest stories as short summaries, each tagged with the outlet it came from, so you can check the source before you trust the summary.",
      },
      {
        title: "Sources you can open",
        body: "A Sources list shows every outlet behind the brief, and each summary links straight to the original article.",
      },
      {
        title: "Top Stories",
        body: "Ranked story cards with a category, a headline, an AI summary, the publisher and how long ago it was published.",
      },
      {
        title: "Explore by topic",
        body: "Browse the same ranked, summarised stories by category: AI, Business, Education, Entertainment, Health, Politics, Science, Space, Sports, Technology and World.",
      },
      {
        title: "Ask Newsbit",
        body: "Ask about today's news in a chat, or start from a suggested thread such as a top-10 summary or “explain the biggest story”. Past chats are saved in a sidebar, and the app reminds you to check the original source.",
      },
      {
        title: "Talk to it",
        body: "Speak a question and Newsbit listens, looks into it and reads the answer back. Briefs and stories can also be read aloud with one tap.",
      },
    ],
    pipeline: [
      {
        title: "Fetch",
        body: "A scheduled job pulls the latest headlines from a news API every morning at 6 AM IST.",
      },
      {
        title: "De-duplicate",
        body: "Articles already stored are filtered out by URL, so the same story never appears twice.",
      },
      {
        title: "Summarise",
        body: "New articles go to Llama 3.3 on Groq, which writes a short summary of each.",
      },
      {
        title: "Store and serve",
        body: "Articles and summaries are saved in PostgreSQL and served by a FastAPI backend to the Next.js frontend.",
      },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["FastAPI", "SQLAlchemy (async)", "APScheduler"] },
      { group: "Data and AI", items: ["PostgreSQL", "Groq (Llama 3.3 70B)"] },
      { group: "Delivery", items: ["GitHub Actions", "Render"] },
    ],
    result: {
      stat: "98%",
      label:
        "of scheduled pipeline runs completed: 196 of the last 200, between 13 Aug and 2 Oct 2026",
      source: "GitHub Actions history for fetch-news.yml",
    },
    cover: {
      desktop: {
        src: `${base}/01-home-hero-desktop.png`,
        alt: "Newsbit's home screen: the headline “News for busy minds” above an ask box, in the browser at newsbit.in",
        caption: "The home screen",
        w: 2880,
        h: 1800,
      },
      mobile: {
        src: `${base}/11-home-hero-mobile.png`,
        alt: "Newsbit's home screen on a phone",
        caption: "The home screen on mobile",
        w: 780,
        h: 1688,
      },
    },
    screens: [
      {
        title: "Read the news",
        body: "The brief, its sources, the ranked top stories and a browse-by-topic view.",
        kind: "desktop",
        shots: [
          {
            src: `${base}/02-todays-brief-summaries-desktop.png`,
            alt: "Newsbit's Today's Brief: five short AI summaries, each tagged with its source outlet, with a Listen with AI voice button",
            caption: "Today's Brief: short summaries, each tagged with its source",
            w: 2880,
            h: 1800,
          },
          {
            src: `${base}/03-todays-brief-sources-desktop.png`,
            alt: "Newsbit's News Sources list open, showing the outlets behind the brief with links",
            caption: "The Sources list: every outlet behind the brief",
            w: 2880,
            h: 1800,
          },
          {
            src: `${base}/04-top-stories-desktop.png`,
            alt: "Newsbit's Top Stories: ranked cards with category, headline, AI summary, publisher and time",
            caption: "Top Stories: ranked, summarised, with publisher and time",
            w: 2880,
            h: 1800,
          },
          {
            src: `${base}/05-explore-topics-desktop.png`,
            alt: "Newsbit's Explore page with topic tabs from AI to World above ranked story cards",
            caption: "Explore: the same stories, by topic",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "Ask it anything",
        body: "A chat for follow-up questions, with suggested threads to start from.",
        kind: "desktop",
        shots: [
          {
            src: `${base}/06-ask-prompt-suggestions-desktop.png`,
            alt: "Newsbit's “Ask Newsbit anything” section with scrolling prompt suggestions",
            caption: "Prompt suggestions on the home page",
            w: 2880,
            h: 1800,
          },
          {
            src: `${base}/07-ai-chat-start-desktop.png`,
            alt: "Newsbit's chat start screen: “Where should we start?” with six suggested threads",
            caption: "The chat: suggested threads to start a conversation",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "Talk to it",
        body: "Ask out loud. It listens, looks into it and speaks the answer back while the stories appear in the chat.",
        kind: "desktop",
        shots: [
          {
            src: `${base}/08-voice-listening-desktop.png`,
            alt: "Newsbit's voice mode listening for a question",
            caption: "1. Listening",
            w: 2880,
            h: 1800,
          },
          {
            src: `${base}/09-voice-thinking-desktop.png`,
            alt: "Newsbit's voice mode working on the question “give me today's finance news”",
            caption: "2. Looking into it",
            w: 2880,
            h: 1800,
          },
          {
            src: `${base}/10-voice-speaking-desktop.png`,
            alt: "Newsbit's voice mode speaking the answer while the finance stories appear in the chat",
            caption: "3. Speaking the answer",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "On mobile",
        body: "The same product on a phone.",
        kind: "phone",
        shots: [
          {
            src: `${base}/11-home-hero-mobile.png`,
            alt: "Newsbit's home screen on a phone",
            caption: "Home",
            w: 780,
            h: 1688,
          },
          {
            src: `${base}/12-todays-brief-sources-mobile.png`,
            alt: "Newsbit's brief on a phone, with source tags under each summary",
            caption: "Today's Brief with sources",
            w: 780,
            h: 1688,
          },
          {
            src: `${base}/13-ask-prompt-suggestions-mobile.png`,
            alt: "Newsbit's prompt suggestions on a phone",
            caption: "Prompt suggestions",
            w: 780,
            h: 1688,
          },
        ],
      },
    ],
    video: {
      src: `${base}/demo-voice-chat-walkthrough.mp4`,
      poster: `${base}/demo-poster.jpg`,
      note: "A short, silent clip of the voice chat: ask out loud, and the answer is spoken while the stories appear.",
    },
  },
];

export function projectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
