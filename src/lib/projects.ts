/**
 * Case studies for /work and the homepage "Selected work" section.
 *
 * Same rules as the rest of the site's copy: first person singular, and every
 * claim is something that can be checked on the live product, the repo or the
 * CI history. Newsbit, PromptX and StyleNest are the studio's own products, not client work, and the
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
  cover: { desktop: Shot; mobile?: Shot };
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
const px = "/work/promptx";
const sn = "/work/stylenest";

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
      src: "",
      poster: `${base}/01-home-hero-desktop.png`,
      note: "A walkthrough from the morning brief to asking Newsbit a question is on the way.",
    },
  },
  {
    slug: "promptx",
    name: "PromptX",
    kind: "AI prompt enhancer",
    service: "Product Build",
    summary:
      "A full-stack app that turns rough prompts into clear, AI-ready instructions formatted for ChatGPT, Claude, Gemini or Grok, with the AI work run as background jobs.",
    art: "deep",
    live: "https://promptx.co.in",
    repo: "https://github.com/jaypatel345/promptx",
    meta: [
      { label: "Type", value: "Own product" },
      { label: "Role", value: "Design, backend, frontend, deployment" },
      { label: "Status", value: "Live at promptx.co.in" },
      { label: "Service", value: "Product Build" },
    ],
    problem:
      "Vague, under-specified prompts produce weak AI answers, and rewriting every prompt by hand doesn't scale.",
    built:
      "PromptX takes a rough request and rewrites it into a structured prompt (role, mission, context, rules and output format) using Groq's OpenAI-compatible API. The Express backend queues each enhancement as a background job with BullMQ and Redis, so the request path stays fast while a dedicated worker makes the AI call.",
    features: [
      {
        title: "Prompt enhancement",
        body: "Type a rough request and get back a structured prompt with a role, mission, context, writing rules and output requirements, ready to paste into any assistant.",
      },
      {
        title: "Built for your model",
        body: "Pick ChatGPT, Claude, Gemini or Grok and the enhanced prompt is formatted for that model.",
      },
      {
        title: "Conversations",
        body: "Guests and signed-in users can create, list, rename, pin and delete conversations, and search across all of them from a quick-switch popup.",
      },
      {
        title: "Accounts",
        body: "Email and password or Google sign-in, with JWT access tokens and refresh tokens stored in MongoDB with TTL expiry.",
      },
      {
        title: "Site assistant",
        body: "A chat on the marketing site answers questions about PromptX itself, with suggested follow-ups.",
      },
      {
        title: "Observable by default",
        body: "A /health endpoint reports MongoDB, PostgreSQL and Redis status, a Bull Board dashboard shows the queue, and Pino logs carry request IDs.",
      },
    ],
    pipeline: [
      {
        title: "Validate",
        body: "The prompt hits /api/ask, where Zod validates the request before anything else runs.",
      },
      {
        title: "Queue",
        body: "The API adds an enhancement job to the ai-jobs queue in Redis with BullMQ and returns straight away.",
      },
      {
        title: "Enhance",
        body: "A dedicated worker picks up the job and calls Groq to rewrite the prompt for the chosen model.",
      },
      {
        title: "Store and serve",
        body: "Conversations, messages and job state live in MongoDB; prompt history is saved to PostgreSQL on Supabase.",
      },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4"] },
      { group: "Backend", items: ["Node.js 20", "Express 5", "JWT auth", "Zod", "Pino"] },
      {
        group: "Data and AI",
        items: ["MongoDB (Mongoose)", "PostgreSQL (Supabase)", "Redis + BullMQ", "Groq API"],
      },
      { group: "Delivery", items: ["Docker Compose", "GitHub Actions", "Render"] },
    ],
    result: {
      stat: "Tested",
      label:
        "before every deploy: the backend Jest + Supertest suite (unit, integration and API auth tests) runs on every push and pull request, and Render deploys from main only after it passes",
      source: "GitHub Actions workflow .github/workflows/test.yml",
    },
    cover: {
      desktop: {
        src: `${px}/01-landing-hero-desktop.png`,
        alt: "PromptX's landing page: “Refine prompts. Spark creative AI ideas. Get dependable outputs.” in the browser at promptx.co.in",
        caption: "The landing page",
        w: 2880,
        h: 1800,
      },
      mobile: {
        src: `${px}/11-landing-hero-mobile.png`,
        alt: "PromptX's landing page on a phone",
        caption: "The landing page on mobile",
        w: 1170,
        h: 2532,
      },
    },
    screens: [
      {
        title: "The site",
        body: "What PromptX does, and a preview of the chat on desktop and mobile.",
        kind: "desktop",
        shots: [
          {
            src: `${px}/01-landing-hero-desktop.png`,
            alt: "PromptX's landing page hero with Start Now and Learn about promptx buttons",
            caption: "The landing page",
            w: 2880,
            h: 1800,
          },
          {
            src: `${px}/02-stats-features-desktop.png`,
            alt: "PromptX's “Sharper prompts. Faster results.” section with three feature columns",
            caption: "What it does, in three lines",
            w: 2880,
            h: 1800,
          },
          {
            src: `${px}/03-desktop-mobile-preview-desktop.png`,
            alt: "PromptX's homepage section showing the chat on a desktop and a phone",
            caption: "The chat, previewed on desktop and mobile",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "Enhance a prompt",
        body: "Pick a model, send a rough request, and get back a structured prompt.",
        kind: "desktop",
        shots: [
          {
            src: `${px}/04-chat-start-desktop.png`,
            alt: "PromptX's chat: “What can I help with?” with a history sidebar and a model picker in the prompt box",
            caption: "The chat, with history in the sidebar",
            w: 2880,
            h: 1800,
          },
          {
            src: `${px}/05-model-picker-desktop.png`,
            alt: "PromptX's model picker open with ChatGPT, Claude, Gemini and Grok, each formatted for that model",
            caption: "1. Pick the model the prompt is for",
            w: 2880,
            h: 1800,
          },
          {
            src: `${px}/07-enhanced-prompt-desktop.png`,
            alt: "PromptX's answer: a LinkedIn Content Ideas Generator prompt with Role, Mission and Context sections",
            caption: "2. Get a structured prompt back",
            w: 2880,
            h: 1800,
          },
          {
            src: `${px}/08-enhanced-prompt-continued-desktop.png`,
            alt: "The rest of the enhanced prompt: content framework, writing rules and output requirements, with copy and rating actions",
            caption: "Rules and output format, ready to copy",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "Find your way around",
        body: "Search every conversation, and ask the site itself about PromptX.",
        kind: "desktop",
        shots: [
          {
            src: `${px}/09-conversation-search-desktop.png`,
            alt: "PromptX's conversation search popup listing past chats beside a preview of the selected one",
            caption: "Search and preview past conversations",
            w: 2880,
            h: 1800,
          },
          {
            src: `${px}/10-site-assistant-desktop.png`,
            alt: "PromptX's site assistant answering “who is building promptx?” with suggested follow-ups",
            caption: "The site assistant answers questions about PromptX",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "On mobile",
        body: "The same product on a phone, from the landing page to the chat.",
        kind: "phone",
        shots: [
          {
            src: `${px}/11-landing-hero-mobile.png`,
            alt: "PromptX's landing page on a phone",
            caption: "Landing page",
            w: 1170,
            h: 2532,
          },
          {
            src: `${px}/12-chat-preview-mobile.png`,
            alt: "PromptX's homepage on a phone, previewing the chat with links to the web, iOS and Android apps",
            caption: "The chat preview",
            w: 1170,
            h: 2532,
          },
          {
            src: `${px}/13-chat-mobile.png`,
            alt: "PromptX's chat on a phone with the model picker set to ChatGPT",
            caption: "The chat",
            w: 1170,
            h: 2532,
          },
        ],
      },
    ],
    video: {
      src: "",
      poster: `${px}/01-landing-hero-desktop.png`,
      note: "A walkthrough of enhancing a prompt end to end is on the way.",
    },
  },
  {
    slug: "stylenest",
    name: "StyleNest",
    kind: "Fashion e-commerce",
    service: "Product Build",
    summary:
      "A full-stack fashion store: a storefront with Stripe checkout, a separate admin dashboard for products and orders, and an Express + MongoDB API.",
    art: "haze",
    live: "https://style-nest-frontend-rho.vercel.app",
    repo: "https://github.com/jaypatel345/StyleNest",
    meta: [
      { label: "Type", value: "Own product" },
      { label: "Role", value: "Design, backend, frontend, deployment" },
      { label: "Status", value: "Live on Vercel" },
      { label: "Service", value: "Product Build" },
    ],
    problem:
      "A small fashion store needs an online shop for customers and a separate back office to manage products and orders.",
    built:
      "A monorepo with three parts that deploy separately: a React storefront, a React admin dashboard and an Express + MongoDB API. Customers browse, add to cart and check out with Cash on Delivery or Stripe; admins manage the catalog and order statuses.",
    features: [
      {
        title: "Catalog",
        body: "Pagination, search, category and sub-category filters, price sorting, and detail pages with size selection.",
      },
      {
        title: "Cart that follows you",
        body: "The cart syncs between local state and the signed-in customer's account.",
      },
      {
        title: "Checkout",
        body: "Cash on Delivery or Stripe Checkout, with server-side payment verification that clears the cart.",
      },
      {
        title: "Order history",
        body: "Customers see each order's status, payment method and items.",
      },
      {
        title: "Secure sign-in",
        body: "JWT auth with bcrypt-hashed passwords, and Redis-backed login rate limiting by IP.",
      },
      {
        title: "Admin dashboard",
        body: "Add products with up to four Cloudinary image uploads, delete products, and view and update order status.",
      },
    ],
    pipeline: [
      {
        title: "Browse",
        body: "The storefront asks the API for products; lists are cached in Redis and invalidated when the catalog changes.",
      },
      {
        title: "Cart",
        body: "Items live in local state and sync to the customer's account once they sign in.",
      },
      {
        title: "Pay",
        body: "Cash on Delivery, or Stripe Checkout with the payment verified on the server before the cart is cleared.",
      },
      {
        title: "Fulfil",
        body: "The order lands in MongoDB, and the admin dashboard moves it through its statuses.",
      },
    ],
    stack: [
      { group: "Frontend", items: ["React 18", "Vite 5", "React Router", "Tailwind CSS", "Axios"] },
      { group: "Backend", items: ["Node.js", "Express 4", "JWT", "bcrypt", "Multer", "Stripe"] },
      { group: "Data", items: ["MongoDB (Mongoose)", "Redis (ioredis)", "Cloudinary"] },
      { group: "Delivery", items: ["Vercel (API, storefront and admin deployed separately)"] },
    ],
    result: {
      stat: "3",
      label:
        "separate deployments on Vercel: the API, the storefront and the admin dashboard, each with its own config",
      source: "Storefront and admin both returned HTTP 200 on 4 Oct 2026",
    },
    cover: {
      desktop: {
        src: `${sn}/01-home-hero-desktop.png`,
        alt: "StyleNest's home page: “Latest Arrivals” hero with a fashion photo, in the browser",
        caption: "The home page",
        w: 2880,
        h: 1800,
      },
      mobile: {
        src: `${sn}/16-home-hero-mobile.png`,
        alt: "StyleNest's home page on a phone",
        caption: "The home page on mobile",
        w: 1170,
        h: 2532,
      },
    },
    screens: [
      {
        title: "Shop",
        body: "The home page, the latest collection and the full catalog with filters.",
        kind: "desktop",
        shots: [
          {
            src: `${sn}/01-home-hero-desktop.png`,
            alt: "StyleNest's home page hero: Latest Arrivals, Shop Now",
            caption: "The home page",
            w: 2880,
            h: 1800,
          },
          {
            src: `${sn}/02-latest-collection-desktop.png`,
            alt: "StyleNest's Latest Collections section on the home page",
            caption: "The latest collection",
            w: 2880,
            h: 1800,
          },
          {
            src: `${sn}/03-collection-filters-desktop.png`,
            alt: "StyleNest's All Collections page with category and type filters and a sort menu beside product cards",
            caption: "The catalog, with filters and sorting",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "Check out",
        body: "Pay with Stripe Checkout; the payment is verified on the server before the cart is cleared.",
        kind: "desktop",
        shots: [
          {
            src: `${sn}/06-stripe-checkout-desktop.png`,
            alt: "Stripe Checkout in sandbox mode for a StyleNest order, with card details and currency choice",
            caption: "Stripe Checkout",
            w: 2880,
            h: 1800,
          },
          {
            src: `${sn}/09-login-desktop.png`,
            alt: "StyleNest's sign-in page",
            caption: "Sign in to keep your cart and orders",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "Run the store",
        body: "A separate admin dashboard to add products, manage the catalog and move orders along.",
        kind: "desktop",
        shots: [
          {
            src: `${sn}/13-admin-add-product-desktop.png`,
            alt: "StyleNest admin: add a product with four image uploads, category, sub-category, price and sizes",
            caption: "Add a product with up to four images",
            w: 2880,
            h: 1800,
          },
          {
            src: `${sn}/14-admin-product-list-desktop.png`,
            alt: "StyleNest admin: the list of products in the catalog",
            caption: "The catalog",
            w: 2880,
            h: 1800,
          },
          {
            src: `${sn}/15-admin-orders-desktop.png`,
            alt: "StyleNest admin: orders with items, payment details and a status menu",
            caption: "Orders, with a status to update",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "The rest of the store",
        body: "About and contact pages.",
        kind: "desktop",
        shots: [
          {
            src: `${sn}/10-about-desktop.png`,
            alt: "StyleNest's About page",
            caption: "About",
            w: 2880,
            h: 1800,
          },
          {
            src: `${sn}/11-contact-desktop.png`,
            alt: "StyleNest's Contact page",
            caption: "Contact",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "On mobile",
        body: "The same store on a phone.",
        kind: "phone",
        shots: [
          {
            src: `${sn}/16-home-hero-mobile.png`,
            alt: "StyleNest's home page on a phone",
            caption: "Home",
            w: 1170,
            h: 2532,
          },
          {
            src: `${sn}/17-collection-mobile.png`,
            alt: "StyleNest's collection page on a phone with filters and sorting",
            caption: "The catalog",
            w: 1170,
            h: 2532,
          },
          {
            src: `${sn}/18-contact-mobile.png`,
            alt: "StyleNest's contact page on a phone",
            caption: "Contact",
            w: 1170,
            h: 2532,
          },
        ],
      },
    ],
    video: {
      src: "",
      poster: `${sn}/01-home-hero-desktop.png`,
      note: "A walkthrough from browsing to checkout and the admin dashboard is on the way.",
    },
  },
];

export function projectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
