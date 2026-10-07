/**
 * Case studies for /work and the homepage "Selected work" section.
 *
 * Same rules as the rest of the site's copy: first person singular, and every
 * claim is something that can be checked on the live product, the repo or the
 * CI history. Newsbit, PromptX and StyleNest are the studio's own products,
 * Borrower Copilot and FrontDesk AI were built to a written brief, AsliOffer
 * was a two-person hackathon build, and the AI Lead Agent is the studio's own
 * lead pipeline; none of them is client work, and the page says so.
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
  /** Live URL, or "" when there is no public deployment */
  live: string;
  /** Source repo, or "" when the code is private */
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
   * `src` is the 1080p cut; `srcSmall` is an optional 720p cut served to
   * phones and other small screens.
   */
  video: { src: string; srcSmall?: string; poster: string; note: string };
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
const bc = "/work/borrower-copilot";
const ao = "/work/aslioffer";
const fd = "/work/frontdeskai";
const al = "/work/ai-agent-lead";

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
        src: `${base}/01-home-hero-desktop.webp`,
        alt: "Newsbit's home screen: the headline “News for busy minds” above an ask box, in the browser at newsbit.in",
        caption: "The home screen",
        w: 2880,
        h: 1800,
      },
      mobile: {
        src: `${base}/11-home-hero-mobile.webp`,
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
            src: `${base}/02-todays-brief-summaries-desktop.webp`,
            alt: "Newsbit's Today's Brief: five short AI summaries, each tagged with its source outlet, with a Listen with AI voice button",
            caption: "Today's Brief: short summaries, each tagged with its source",
            w: 2880,
            h: 1800,
          },
          {
            src: `${base}/03-todays-brief-sources-desktop.webp`,
            alt: "Newsbit's News Sources list open, showing the outlets behind the brief with links",
            caption: "The Sources list: every outlet behind the brief",
            w: 2880,
            h: 1800,
          },
          {
            src: `${base}/04-top-stories-desktop.webp`,
            alt: "Newsbit's Top Stories: ranked cards with category, headline, AI summary, publisher and time",
            caption: "Top Stories: ranked, summarised, with publisher and time",
            w: 2880,
            h: 1800,
          },
          {
            src: `${base}/05-explore-topics-desktop.webp`,
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
            src: `${base}/06-ask-prompt-suggestions-desktop.webp`,
            alt: "Newsbit's “Ask Newsbit anything” section with scrolling prompt suggestions",
            caption: "Prompt suggestions on the home page",
            w: 2880,
            h: 1800,
          },
          {
            src: `${base}/07-ai-chat-start-desktop.webp`,
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
            src: `${base}/08-voice-listening-desktop.webp`,
            alt: "Newsbit's voice mode listening for a question",
            caption: "1. Listening",
            w: 2880,
            h: 1800,
          },
          {
            src: `${base}/09-voice-thinking-desktop.webp`,
            alt: "Newsbit's voice mode working on the question “give me today's finance news”",
            caption: "2. Looking into it",
            w: 2880,
            h: 1800,
          },
          {
            src: `${base}/10-voice-speaking-desktop.webp`,
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
            src: `${base}/11-home-hero-mobile.webp`,
            alt: "Newsbit's home screen on a phone",
            caption: "Home",
            w: 780,
            h: 1688,
          },
          {
            src: `${base}/12-todays-brief-sources-mobile.webp`,
            alt: "Newsbit's brief on a phone, with source tags under each summary",
            caption: "Today's Brief with sources",
            w: 780,
            h: 1688,
          },
          {
            src: `${base}/13-ask-prompt-suggestions-mobile.webp`,
            alt: "Newsbit's prompt suggestions on a phone",
            caption: "Prompt suggestions",
            w: 780,
            h: 1688,
          },
        ],
      },
    ],
    video: {
      src: `${base}/showcase.mp4`,
      srcSmall: `${base}/showcase-720.mp4`,
      poster: `${base}/showcase-poster.jpg`,
      note: "From the morning brief to asking Newsbit a question, in one minute.",
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
        src: `${px}/01-landing-hero-desktop.webp`,
        alt: "PromptX's landing page: “Refine prompts. Spark creative AI ideas. Get dependable outputs.” in the browser at promptx.co.in",
        caption: "The landing page",
        w: 2880,
        h: 1800,
      },
      mobile: {
        src: `${px}/11-landing-hero-mobile.webp`,
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
            src: `${px}/01-landing-hero-desktop.webp`,
            alt: "PromptX's landing page hero with Start Now and Learn about promptx buttons",
            caption: "The landing page",
            w: 2880,
            h: 1800,
          },
          {
            src: `${px}/02-stats-features-desktop.webp`,
            alt: "PromptX's “Sharper prompts. Faster results.” section with three feature columns",
            caption: "What it does, in three lines",
            w: 2880,
            h: 1800,
          },
          {
            src: `${px}/03-desktop-mobile-preview-desktop.webp`,
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
            src: `${px}/04-chat-start-desktop.webp`,
            alt: "PromptX's chat: “What can I help with?” with a history sidebar and a model picker in the prompt box",
            caption: "The chat, with history in the sidebar",
            w: 2880,
            h: 1800,
          },
          {
            src: `${px}/05-model-picker-desktop.webp`,
            alt: "PromptX's model picker open with ChatGPT, Claude, Gemini and Grok, each formatted for that model",
            caption: "1. Pick the model the prompt is for",
            w: 2880,
            h: 1800,
          },
          {
            src: `${px}/07-enhanced-prompt-desktop.webp`,
            alt: "PromptX's answer: a LinkedIn Content Ideas Generator prompt with Role, Mission and Context sections",
            caption: "2. Get a structured prompt back",
            w: 2880,
            h: 1800,
          },
          {
            src: `${px}/08-enhanced-prompt-continued-desktop.webp`,
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
            src: `${px}/09-conversation-search-desktop.webp`,
            alt: "PromptX's conversation search popup listing past chats beside a preview of the selected one",
            caption: "Search and preview past conversations",
            w: 2880,
            h: 1800,
          },
          {
            src: `${px}/10-site-assistant-desktop.webp`,
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
            src: `${px}/11-landing-hero-mobile.webp`,
            alt: "PromptX's landing page on a phone",
            caption: "Landing page",
            w: 1170,
            h: 2532,
          },
          {
            src: `${px}/12-chat-preview-mobile.webp`,
            alt: "PromptX's homepage on a phone, previewing the chat with links to the web, iOS and Android apps",
            caption: "The chat preview",
            w: 1170,
            h: 2532,
          },
          {
            src: `${px}/13-chat-mobile.webp`,
            alt: "PromptX's chat on a phone with the model picker set to ChatGPT",
            caption: "The chat",
            w: 1170,
            h: 2532,
          },
        ],
      },
    ],
    video: {
      src: `${px}/showcase.mp4`,
      srcSmall: `${px}/showcase-720.mp4`,
      poster: `${px}/showcase-poster.jpg`,
      note: "Enhancing a prompt end to end, in one minute.",
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
        src: `${sn}/01-home-hero-desktop.webp`,
        alt: "StyleNest's home page: “Latest Arrivals” hero with a fashion photo, in the browser",
        caption: "The home page",
        w: 2880,
        h: 1800,
      },
      mobile: {
        src: `${sn}/16-home-hero-mobile.webp`,
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
            src: `${sn}/01-home-hero-desktop.webp`,
            alt: "StyleNest's home page hero: Latest Arrivals, Shop Now",
            caption: "The home page",
            w: 2880,
            h: 1800,
          },
          {
            src: `${sn}/02-latest-collection-desktop.webp`,
            alt: "StyleNest's Latest Collections section on the home page",
            caption: "The latest collection",
            w: 2880,
            h: 1800,
          },
          {
            src: `${sn}/03-collection-filters-desktop.webp`,
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
            src: `${sn}/06-stripe-checkout-desktop.webp`,
            alt: "Stripe Checkout in sandbox mode for a StyleNest order, with card details and currency choice",
            caption: "Stripe Checkout",
            w: 2880,
            h: 1800,
          },
          {
            src: `${sn}/09-login-desktop.webp`,
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
            src: `${sn}/13-admin-add-product-desktop.webp`,
            alt: "StyleNest admin: add a product with four image uploads, category, sub-category, price and sizes",
            caption: "Add a product with up to four images",
            w: 2880,
            h: 1800,
          },
          {
            src: `${sn}/14-admin-product-list-desktop.webp`,
            alt: "StyleNest admin: the list of products in the catalog",
            caption: "The catalog",
            w: 2880,
            h: 1800,
          },
          {
            src: `${sn}/15-admin-orders-desktop.webp`,
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
            src: `${sn}/10-about-desktop.webp`,
            alt: "StyleNest's About page",
            caption: "About",
            w: 2880,
            h: 1800,
          },
          {
            src: `${sn}/11-contact-desktop.webp`,
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
            src: `${sn}/16-home-hero-mobile.webp`,
            alt: "StyleNest's home page on a phone",
            caption: "Home",
            w: 1170,
            h: 2532,
          },
          {
            src: `${sn}/17-collection-mobile.webp`,
            alt: "StyleNest's collection page on a phone with filters and sorting",
            caption: "The catalog",
            w: 1170,
            h: 2532,
          },
          {
            src: `${sn}/18-contact-mobile.webp`,
            alt: "StyleNest's contact page on a phone",
            caption: "Contact",
            w: 1170,
            h: 2532,
          },
        ],
      },
    ],
    video: {
      src: `${sn}/showcase.mp4`,
      srcSmall: `${sn}/showcase-720.mp4`,
      poster: `${sn}/showcase-poster.jpg`,
      note: "From browsing to checkout and the admin dashboard, in one minute.",
    },
  },
  {
    slug: "borrower-copilot",
    name: "Borrower Copilot",
    kind: "Loan self-assessment",
    service: "Product Build",
    summary:
      "A loan self-check for Indian borrowers: about nine adaptive questions, then a verdict, a safe amount next to the lender's number, a fair rate and an EMI ceiling, all computed in the browser.",
    art: "cumulus",
    live: "https://borrower-copilot-one.vercel.app",
    repo: "https://github.com/jaypatel345/Borrower-Copilot",
    meta: [
      { label: "Type", value: "Built to a written brief" },
      { label: "Role", value: "Rules engine, design, frontend, deployment" },
      { label: "Status", value: "Live on Vercel" },
      { label: "Service", value: "Product Build" },
    ],
    problem:
      "A lender tells a borrower how much they can get, not how much they can safely repay, and the borrower usually walks into the branch with only the lender's number.",
    built:
      "Borrower Copilot asks about nine questions that adapt to the borrower (a salaried employee isn't asked about ITRs or collateral) and runs the answers through a deterministic rules engine. It returns four outputs, each with a one-sentence reason, plus a Negotiation Card to show a lender. There is no login and no backend: every number is calculated in the browser.",
    features: [
      {
        title: "A clear verdict",
        body: "Borrow, borrow less or don't borrow, with the reasons behind it.",
      },
      {
        title: "Two different numbers",
        body: "What a lender might sanction next to what your income can safely carry. The safe amount survives a 15% income drop, and collateral never raises it.",
      },
      {
        title: "A fair rate, all in",
        body: "A rate band for your profile, with each adjustment listed, plus the all-in cost (APR) once fees and GST are added.",
      },
      {
        title: "An EMI ceiling",
        body: "The monthly payment not to cross, a tenure table showing total interest, and one stress test.",
      },
      {
        title: "Honest about gaps",
        body: "“I'm not sure” is never treated as zero. Skipped answers lower the confidence and widen the ranges instead.",
      },
      {
        title: "Negotiation Card",
        body: "A one-screen summary with the amount, rate, EMI and tenure to ask for, ready to screenshot or copy before visiting a lender.",
      },
    ],
    pipeline: [
      {
        title: "Ask",
        body: "A question engine picks the next question from 9 core and 14 adaptive ones, based on the answers so far.",
      },
      {
        title: "Derive",
        body: "Answers become stable income, essential costs, a credit tier and a product route, with unknowns kept separate from zeros.",
      },
      {
        title: "Compute",
        body: "Pure functions work out the confidence, the rate band and APR, the safe EMI, the safe amount, the lender's estimate and a stress test.",
      },
      {
        title: "Explain",
        body: "Each output gets a one-sentence reason built from the numbers actually used, and the results become the Negotiation Card.",
      },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js 14 (static export)", "React 18", "TypeScript", "Tailwind CSS"] },
      { group: "Rules engine", items: ["Pure TypeScript functions", "Config-driven thresholds", "IRR-based APR"] },
      { group: "Testing", items: ["Vitest", "Testing Library"] },
      { group: "Delivery", items: ["Vercel"] },
    ],
    result: {
      stat: "78",
      label:
        "automated tests across the rules, the question engine and the UI, all passing; every threshold and rate is documented in RULES.md",
      source: "npm test on the repo's main branch, run 4 Oct 2026",
    },
    cover: {
      desktop: {
        src: `${bc}/01-home-hero-desktop.webp`,
        alt: "Borrower Copilot's home page: “Know what you can safely borrow — before you meet a lender.” beside an example result, in the browser",
        caption: "The home page",
        w: 2880,
        h: 1800,
      },
      mobile: {
        src: `${bc}/14-home-hero-mobile.webp`,
        alt: "Borrower Copilot's home page on a phone",
        caption: "The home page on mobile",
        w: 1170,
        h: 2532,
      },
    },
    screens: [
      {
        title: "The site",
        body: "What you get, how it works, sample borrowers to try, and what the tool is and isn't.",
        kind: "desktop",
        shots: [
          {
            src: `${bc}/01-home-hero-desktop.webp`,
            alt: "Borrower Copilot's home page hero with an example result: safe to borrow ₹7.5L–₹9.5L against a lender's ₹21.5L–₹27.0L",
            caption: "The home page, with an example result",
            w: 2880,
            h: 1800,
          },
          {
            src: `${bc}/02-what-you-get-desktop.webp`,
            alt: "Borrower Copilot's “Four answers you can act on” cards above a lender's view vs your safe view comparison",
            caption: "Four answers, and why the lender's number differs",
            w: 2880,
            h: 1800,
          },
          {
            src: `${bc}/03-how-it-works-desktop.webp`,
            alt: "Borrower Copilot's three-step How it works section and three sample borrowers: Priya, Ravi and Anita",
            caption: "How it works, and three sample borrowers",
            w: 2880,
            h: 1800,
          },
          {
            src: `${bc}/04-good-to-know-desktop.webp`,
            alt: "Borrower Copilot's “What this is — and isn't” section: private by design, market references not offers, honest about gaps",
            caption: "What it is, and what it isn't",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "Answer the questions",
        body: "One question at a time. Unsure answers are allowed, and you can skip to a result once there's enough.",
        kind: "desktop",
        shots: [
          {
            src: `${bc}/05-question-loan-purpose-desktop.webp`,
            alt: "Borrower Copilot asking “What's the money for?” with options from a wedding to paying off other debt",
            caption: "1. What the money is for",
            w: 2880,
            h: 1800,
          },
          {
            src: `${bc}/06-question-household-costs-desktop.webp`,
            alt: "Borrower Copilot asking for monthly household costs, with an “I'm not sure” option",
            caption: "2. Household costs, or “I'm not sure”",
            w: 2880,
            h: 1800,
          },
          {
            src: `${bc}/07-question-credit-score-desktop.webp`,
            alt: "Borrower Copilot asking for a credit score on a 300–900 slider, with an “I don't know it” option",
            caption: "3. Credit score, if you know it",
            w: 2880,
            h: 1800,
          },
          {
            src: `${bc}/08-question-existing-loans-desktop.webp`,
            alt: "Borrower Copilot asking about existing loans, with an option to skip the rest and see the result",
            caption: "4. Existing loans, or skip to the result",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "Get the result",
        body: "The sample borrower Ravi: four outputs, each with the numbers behind it, and a Negotiation Card.",
        kind: "desktop",
        shots: [
          {
            src: `${bc}/09-result-verdict-desktop.webp`,
            alt: "Borrower Copilot's result for Ravi: “Borrow — but less than you planned”, routed to a secured loan, safe amount ₹3.0L–₹5.0L",
            caption: "The verdict and the safe amount",
            w: 2880,
            h: 1800,
          },
          {
            src: `${bc}/10-result-fair-rate-desktop.webp`,
            alt: "Borrower Copilot's lender estimate with its reasoning, and a fair rate band of 10.8%–15.0% with each adjustment listed",
            caption: "The lender's number, and a fair rate with its reasons",
            w: 2880,
            h: 1800,
          },
          {
            src: `${bc}/11-result-emi-ceiling-desktop.webp`,
            alt: "Borrower Copilot's EMI ceiling of ₹11,500/month with a tenure trade-off table and a passed stress test",
            caption: "The EMI ceiling, tenure trade-off and stress test",
            w: 2880,
            h: 1800,
          },
          {
            src: `${bc}/12-negotiation-card-desktop.webp`,
            alt: "Borrower Copilot's Negotiation Card: safe amount, lender estimate, EMI ceiling, fair rate, tenure and a line to say to the lender",
            caption: "The Negotiation Card",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "On mobile",
        body: "Built mobile-first: the same flow on a phone, shown here with the sample borrower Priya.",
        kind: "phone",
        shots: [
          {
            src: `${bc}/14-home-hero-mobile.webp`,
            alt: "Borrower Copilot's home page on a phone",
            caption: "Home",
            w: 1170,
            h: 2532,
          },
          {
            src: `${bc}/16-result-verdict-mobile.webp`,
            alt: "Borrower Copilot's result for Priya on a phone: Borrow, with high confidence",
            caption: "The result",
            w: 1170,
            h: 2532,
          },
          {
            src: `${bc}/17-negotiation-card-mobile.webp`,
            alt: "Borrower Copilot's Negotiation Card for Priya on a phone",
            caption: "The Negotiation Card",
            w: 1170,
            h: 2532,
          },
        ],
      },
    ],
    video: {
      src: `${bc}/showcase.mp4`,
      srcSmall: `${bc}/showcase-720.mp4`,
      poster: `${bc}/showcase-poster.jpg`,
      note: "From the first question to the Negotiation Card, in one minute.",
    },
  },
  {
    slug: "aslioffer",
    name: "AsliOffer",
    kind: "Job offer verification agent",
    service: "AI Agents",
    summary:
      "An AI agent that checks a job offer against the employer's public footprint in live search results and flags scam signals for Indian freshers, citing a source for each finding.",
    art: "dusk",
    live: "https://aslioffer.vercel.app",
    repo: "https://github.com/jaypatel345/aslioffer",
    meta: [
      { label: "Type", value: "Hackathon build, two-person team" },
      {
        label: "My part",
        value: "Frontend, document reading, live search wiring, API contract, deployment",
      },
      { label: "Status", value: "Live on Vercel and Render" },
      { label: "Service", value: "AI Agents" },
    ],
    problem:
      "Freshers in India get fake job and internship offers that borrow the names of real companies, then ask for a “refundable” laptop or training deposit over UPI. The offer letter looks real; the company's public footprint doesn't match it.",
    built:
      "AsliOffer reads an offer from pasted text, a PDF or a screenshot, pulls out the claims it makes, and sends four agents to check them against live Google results through SerpApi. It returns one of four outcomes with every finding linked to its source, and says “cannot verify” rather than guessing when the evidence isn't there. Built with a teammate for the SerpApi India Hackathon 2026, AI Agents track.",
    features: [
      {
        title: "Reads the offer",
        body: "Paste a message or upload a PDF or screenshot. Screenshots are read by a Groq vision model, with Gemini as the fallback if Groq is busy.",
      },
      {
        title: "Four agents",
        body: "Company, Recruiter, Salary and Scam agents each check one part of the offer: the employer's domain and careers page, the recruiter's email, the pay, and fee demands.",
      },
      {
        title: "Evidence, not vibes",
        body: "Every finding in the report links to the search result it came from, and the report lists what was checked and what wasn't.",
      },
      {
        title: "Honest outcomes",
        body: "High risk, Needs review, Cannot verify, or No strong risk signals. It never stamps an offer “verified”, and a failed search is reported as missing evidence, not as a pass.",
      },
      {
        title: "What to do next",
        body: "Each report ends with next steps, the employer's official contact routes and, for a high-risk offer, how to report it to the national cyber-crime helpline.",
      },
      {
        title: "Live progress",
        body: "A checklist shows each stage as it runs, from reading the offer to assembling the report.",
      },
    ],
    pipeline: [
      {
        title: "Extract",
        body: "The offer is turned into separate claims (employer, role, recruiter, pay, any fee), with the candidate's own details kept out of searches.",
      },
      {
        title: "Plan",
        body: "A planner picks which checks to run, within a fixed budget of searches and a deadline, and adds follow-ups only when the first results call for them.",
      },
      {
        title: "Investigate",
        body: "The four agents query SerpApi in parallel, and each result is kept as evidence with its source.",
      },
      {
        title: "Assess and report",
        body: "A risk engine weighs the evidence into one of four outcomes, and the report explains each finding from the evidence behind it.",
      },
    ],
    stack: [
      { group: "Frontend", items: ["React 18", "Vite", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Python 3.12", "FastAPI", "SQLModel", "Pydantic"] },
      { group: "Agents and AI", items: ["SerpApi", "Groq (vision)", "Gemini (fallback)"] },
      { group: "Delivery", items: ["Vercel (frontend)", "Render (API)", "Docker Compose"] },
    ],
    result: {
      stat: "27/27",
      label:
        "evaluation cases passed, with no legitimate offer flagged high risk (0 of 9) and no scam missed (0 of 5); 616 backend tests also pass. These are synthetic cases, not real-world accuracy",
      source: "Offline evaluation runner and pytest on the repo's main branch, run 4 Oct 2026",
    },
    cover: {
      desktop: {
        src: `${ao}/01-landing-hero-desktop.webp`,
        alt: "AsliOffer's landing page: “Verify Job Offers With Real Public Footprint Proof”, in the browser at aslioffer.vercel.app",
        caption: "The landing page",
        w: 2880,
        h: 1800,
      },
      mobile: {
        src: `${ao}/10-landing-hero-mobile.webp`,
        alt: "AsliOffer's landing page on a phone",
        caption: "The landing page on mobile",
        w: 1170,
        h: 2531,
      },
    },
    screens: [
      {
        title: "Check an offer",
        body: "Paste the offer or upload it, then watch each check run.",
        kind: "desktop",
        shots: [
          {
            src: `${ao}/02-agent-pipeline-sample-offers-desktop.webp`,
            alt: "AsliOffer's four agent cards, Company, Recruiter, Salary and Scam, above two illustrative sample offers",
            caption: "The four agents",
            w: 2880,
            h: 1800,
          },
          {
            src: `${ao}/03-verify-offer-form-desktop.webp`,
            alt: "AsliOffer's Verify Offer page with quick test scenarios and tabs to paste text or upload a PDF or screenshot",
            caption: "1. Paste the offer, or upload a PDF or screenshot",
            w: 2880,
            h: 1800,
          },
          {
            src: `${ao}/04-offer-pasted-desktop.webp`,
            alt: "An Infosys offer letter pasted into AsliOffer, above the Investigate Offer with AI Agents button",
            caption: "2. Send it to the agents",
            w: 2880,
            h: 1800,
          },
          {
            src: `${ao}/05-investigation-progress-desktop.webp`,
            alt: "AsliOffer's progress checklist: entity extraction, company footprint and recruiter domain done, salary check running",
            caption: "3. Each check, as it runs",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "Read the report",
        body: "The app's illustrative sample report for a fake TCS offer. It is written by hand to show the layout, and the app labels it that way; it is not a live run.",
        kind: "desktop",
        shots: [
          {
            src: `${ao}/06-sample-report-verdict-desktop.webp`,
            alt: "AsliOffer's illustrative sample report: High risk for a TCS offer, with red flags and green flags",
            caption: "The verdict, red flags and green flags",
            w: 2880,
            h: 1800,
          },
          {
            src: `${ao}/07-sample-report-evidence-desktop.webp`,
            alt: "The claims pulled from the sample offer, including a Gmail recruiter address and a ₹15,000 deposit, above the Company agent's evidence",
            caption: "The claims it found, and the first agent's evidence",
            w: 2880,
            h: 1800,
          },
          {
            src: `${ao}/08-sample-report-agents-desktop.webp`,
            alt: "Recruiter, Salary and Scam agent findings in the sample report, each with a source link",
            caption: "Each agent's findings, with sources",
            w: 2880,
            h: 1800,
          },
          {
            src: `${ao}/09-sample-report-next-steps-desktop.webp`,
            alt: "The employer's official website and careers page, and recommended next steps including the 1930 cyber-crime helpline",
            caption: "Official contact routes and next steps",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "On mobile",
        body: "The same app on a phone.",
        kind: "phone",
        shots: [
          {
            src: `${ao}/10-landing-hero-mobile.webp`,
            alt: "AsliOffer's landing page on a phone",
            caption: "Home",
            w: 1170,
            h: 2531,
          },
          {
            src: `${ao}/11-agent-pipeline-mobile.webp`,
            alt: "AsliOffer's agent cards on a phone",
            caption: "The four agents",
            w: 1170,
            h: 2531,
          },
          {
            src: `${ao}/13-sample-report-mobile.webp`,
            alt: "AsliOffer's illustrative sample report on a phone, marked as hand-written",
            caption: "The sample report",
            w: 1170,
            h: 2531,
          },
        ],
      },
    ],
    video: {
      src: `${ao}/showcase.mp4`,
      srcSmall: `${ao}/showcase-720.mp4`,
      poster: `${ao}/showcase-poster.jpg`,
      note: "Checking a real offer end to end, in one minute.",
    },
  },
  {
    slug: "frontdeskai",
    name: "FrontDesk AI",
    kind: "AI phone receptionist",
    service: "Voice AI",
    summary:
      "An AI phone receptionist for a demo cosmetic clinic, running on Vapi: it answers questions, qualifies the caller, books the appointment in Cal.com and logs the caller and the full transcript to HubSpot.",
    art: "high",
    live: "",
    repo: "https://github.com/jaypatel345/FrontDeskAI",
    meta: [
      { label: "Type", value: "Built to a written brief" },
      { label: "Role", value: "Call flow, prompt, backend, integrations, dashboard" },
      { label: "Status", value: "Deployed on Render, tested with Vapi browser calls; no phone number yet" },
      { label: "Service", value: "Voice AI" },
    ],
    problem:
      "A busy clinic misses calls while the front desk is with a patient or already on the phone, and most of those callers want something simple: a price range, the opening hours or a time to come in.",
    built:
      "FrontDesk AI is a voice receptionist on Vapi for a made-up clinic, Demo Aesthetics Clinic. It answers from the clinic's FAQ, finds out what the caller wants, and books, moves or cancels the appointment in Cal.com. The caller becomes a HubSpot contact and the call is logged against them with its transcript, and every call shows up on a dashboard. Cal.com and HubSpot are connected to real accounts; text confirmations (Twilio) and vector search (Qdrant) are built but run as mocks until their keys are added. The clinic, its prices and its doctors are invented, and every call so far is one of my own tests.",
    features: [
      {
        title: "Answers from the clinic's FAQ",
        body: "Services, price ranges, hours, doctors and aftercare come from the clinic's knowledge base. It quotes ranges, not exact prices, and offers a callback when the answer isn't there.",
      },
      {
        title: "Books while the caller is on the line",
        body: "It checks real Cal.com availability up to three weeks ahead, offers times, reads the name and number back to confirm them, and books. Existing appointments can be moved or cancelled on the same call.",
      },
      {
        title: "Every caller lands in the CRM",
        body: "The caller is created or updated as a HubSpot contact, and the call is logged on their record with the full transcript, so the front desk can pick it up from there.",
      },
      {
        title: "Knows when to hand over",
        body: "Clinical questions, an upset caller or a request for a person go to the front desk by call transfer. It never gives medical advice.",
      },
      {
        title: "Honest from the first line",
        body: "The greeting says the call may be recorded, and if asked, it says plainly that the clinic is a demo of an AI receptionist.",
      },
      {
        title: "A call dashboard behind a login",
        body: "Calls, bookings, conversion, escalations, missed calls and Vapi's average reply time, a list of every call, and which integrations are live or mocked. Phone numbers are masked to the last four digits.",
      },
    ],
    pipeline: [
      {
        title: "Answer",
        body: "Vapi picks up, Deepgram Nova-3 transcribes the caller and GPT-4.1 mini replies in Vapi's Savannah voice, following one shared receptionist prompt.",
      },
      {
        title: "Call a tool",
        body: "When it needs the FAQ, the calendar or a booking, Vapi calls one webhook on a Node backend. The request must carry a shared secret, and every argument is checked with zod before anything runs.",
      },
      {
        title: "Act",
        body: "Adapters reach Cal.com for bookings, HubSpot for contacts, Twilio for texts and Qdrant for the FAQ. Any adapter without a key falls back to in-memory slots, a console log or keyword search, so the whole call can be tested with no paid accounts.",
      },
      {
        title: "Log",
        body: "Vapi's end-of-call report, with the transcript, recording link and average reply time, is saved to SQLite for the dashboard and logged to HubSpot as a call.",
      },
    ],
    stack: [
      { group: "Voice", items: ["Vapi", "Deepgram Nova-3", "GPT-4.1 mini", "Retell and Bland (kept as backups)"] },
      { group: "Backend", items: ["Node.js", "Express", "zod", "SQLite (node:sqlite)"] },
      { group: "Integrations", items: ["Cal.com", "HubSpot", "Twilio", "Qdrant"] },
      { group: "Delivery", items: ["node:test and supertest", "GitHub Actions", "Render"] },
    ],
    result: {
      stat: "64",
      label:
        "automated tests, all passing, covering endpoint auth, webhook signatures, rate limiting, argument checks and the book → reschedule → cancel round trip; GitHub Actions runs them on every push",
      source: "npm test on the repo's main branch and the Tests workflow in GitHub Actions, 5 Oct 2026",
    },
    cover: {
      desktop: {
        src: `${fd}/01-dashboard-overview-desktop.webp`,
        alt: "FrontDesk AI's dashboard overview: call stats, calls over the last seven days, the integrations panel and recent calls",
        caption: "The call dashboard",
        w: 2880,
        h: 1800,
      },
      mobile: {
        src: `${fd}/12-dashboard-overview-mobile.webp`,
        alt: "FrontDesk AI's dashboard overview on a phone",
        caption: "The dashboard on mobile",
        w: 1170,
        h: 2532,
      },
    },
    screens: [
      {
        title: "The call dashboard",
        body: "The deployed dashboard on Render. The calls on it are my own browser test calls to the demo clinic, not patients.",
        kind: "desktop",
        shots: [
          {
            src: `${fd}/01-dashboard-overview-desktop.webp`,
            alt: "The dashboard overview: total calls, answer rate, bookings, conversion, drop-off, escalation, missed calls and an average response latency of 1.58 seconds",
            caption: "Overview after one test call that ended in a booking",
            w: 2880,
            h: 1800,
          },
          {
            src: `${fd}/02-calls-list-desktop.webp`,
            alt: "The Calls page listing two web test calls, both ended and handled",
            caption: "Every call, with its status and outcome",
            w: 2880,
            h: 1800,
          },
          {
            src: `${fd}/03-integrations-desktop.webp`,
            alt: "The Integrations page: Cal.com and HubSpot live, SMS and the knowledge base on mocks",
            caption: "Which integrations are live and which are mocked",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "The call, on Vapi",
        body: "One booking call from Vapi's side: the recording, the transcript and where the reply time goes.",
        kind: "desktop",
        shots: [
          {
            src: `${fd}/04-vapi-call-transcript-desktop.webp`,
            alt: "Vapi's log of a 4 minute 18 second browser test call, with the recording waveform and the start of the transcript",
            caption: "The recording and transcript",
            w: 2880,
            h: 1800,
          },
          {
            src: `${fd}/05-vapi-latency-desktop.webp`,
            alt: "Vapi's latency summary for the same call: 16 turns, 1,584 ms average, split into transport, transcriber, endpointing, LLM and voice",
            caption: "Latency per stage: 1.58 s average over 16 turns",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "Booked and logged",
        body: "Where the call ends up. The booking lands in Cal.com (the clinic runs on Los Angeles time, so a 9 PM slot shows as 9:30 AM in India), and the caller becomes a HubSpot contact with the call and its full transcript on their record. The summary and sentiment panels are HubSpot's own AI reading that logged call.",
        kind: "desktop",
        shots: [
          {
            src: `${fd}/06-calcom-booking-desktop.webp`,
            alt: "A confirmed 30 minute Cal.com booking for the test caller on 6 October 2026, with contact details blurred",
            caption: "The confirmed booking in Cal.com",
            w: 2880,
            h: 1800,
          },
          {
            src: `${fd}/07-hubspot-call-transcript-desktop.webp`,
            alt: "The HubSpot contact with a logged call open, showing the start of the transcript",
            caption: "The call logged with its transcript",
            w: 2880,
            h: 1800,
          },
          {
            src: `${fd}/08-hubspot-transcript-booking-desktop.webp`,
            alt: "Further down the logged transcript: the agent offers times, takes the caller's details and confirms the Botox booking",
            caption: "The transcript through to the booking",
            w: 2880,
            h: 1800,
          },
          {
            src: `${fd}/09-hubspot-contact-insights-desktop.webp`,
            alt: "HubSpot's contact insights summarising a Botox inquiry, the booked appointment and the details collected",
            caption: "HubSpot's summary of the call",
            w: 2880,
            h: 1800,
          },
          {
            src: `${fd}/10-hubspot-recent-interactions-desktop.webp`,
            alt: "HubSpot's recent interactions panel showing the inbound logged call",
            caption: "The inbound call on the contact's timeline",
            w: 2880,
            h: 1800,
          },
          {
            src: `${fd}/11-hubspot-sentiment-desktop.webp`,
            alt: "HubSpot's sentiment panel rating the caller as receptive",
            caption: "HubSpot's sentiment read of the call",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "On mobile",
        body: "The dashboard on a phone.",
        kind: "phone",
        shots: [
          {
            src: `${fd}/12-dashboard-overview-mobile.webp`,
            alt: "FrontDesk AI's dashboard overview on a phone",
            caption: "Overview",
            w: 1170,
            h: 2532,
          },
          {
            src: `${fd}/13-dashboard-integrations-mobile.webp`,
            alt: "The dashboard's integrations and recent calls on a phone",
            caption: "Integrations and recent calls",
            w: 1170,
            h: 2532,
          },
        ],
      },
    ],
    video: {
      src: `${fd}/showcase.mp4`,
      srcSmall: `${fd}/showcase-720.mp4`,
      poster: `${fd}/showcase-poster.jpg`,
      note: "A test call, from the first question to a confirmed booking, in one minute.",
    },
  },
  {
    slug: "ai-lead-agent",
    name: "AI Lead Agent",
    kind: "Lead automation",
    service: "AI Automation",
    summary:
      "Three n8n workflows that answer every website enquiry in under a minute: they score the lead with Gemini, log it in HubSpot, send a reply written for that lead, brief me before the call and follow up until the lead books. It runs on free tiers for $0 a month.",
    art: "clear",
    live: "https://upperlayerstudio.com/contact",
    repo: "",
    meta: [
      { label: "Type", value: "The studio's own lead pipeline" },
      { label: "Role", value: "Workflows, prompts, integrations, site form" },
      { label: "Status", value: "Live behind this site's contact form" },
      { label: "Service", value: "AI Automation" },
    ],
    problem:
      "Small service businesses lose leads between “form submitted” and “someone replies”. The enquiry sits in an inbox for hours, nobody records it, the owner can't tell a serious buyer from a spammer, and if the lead doesn't book straight away nobody follows up.",
    built:
      "The AI Lead Agent is three n8n workflows behind the “Prefer to write first?” form on this site. Lead Intake scores each enquiry with Gemini, writes it to HubSpot, emails a reply that restates what the lead asked for with a booking link, and pings me on Telegram when a lead is hot. Booking catches the Cal.com webhook, moves the contact to “Call Booked” and sends me a pre-call brief. Follow-up runs every hour and nudges warm and hot leads who haven't booked, twice, before moving them to Nurture. Everything runs on free tiers. The leads in these screens are my own test enquiries; “Priya Mehta” and BrightSmile Dental are a sample lead, not a client.",
    features: [
      {
        title: "A reply in seconds, not hours",
        body: "Hot and warm leads get an email written for them: it restates their problem in plain words, asks one concrete question and links to the booking page. The visitor sees “Thanks” in about half a second while the rest runs in the background.",
      },
      {
        title: "Scored by the model, tiered by code",
        body: "Gemini returns a score, intent, budget, urgency and a summary as strict JSON. A code node applies the rule itself: 70 and up is hot, 40 to 69 warm, under 40 cold, and spam is always cold and never emailed.",
      },
      {
        title: "Every lead lands in the CRM",
        body: "A HubSpot upsert keyed on email writes the contact with eight custom fields: score, tier, stage, service fit, AI summary, source, follow-ups sent and last contacted.",
      },
      {
        title: "A brief before every call",
        body: "When a lead books on Cal.com, Gemini writes a pre-call brief from the stored summary, with what they want, what to ask and the angle to lead with, and sends it to my Telegram.",
      },
      {
        title: "Follow-up that knows when to stop",
        body: "Open leads get a nudge after 24 hours and a second, with a link to my work, 48 hours later. Silent leads move to Nurture with no more email, and a lead who books gets none.",
      },
      {
        title: "Honest by rule",
        body: "Every writing prompt carries a rule never to invent clients, results or numbers. An early nudge claimed work for “a similar design firm” that doesn't exist; the rule fixed it in 4 of 4 re-samples.",
      },
    ],
    pipeline: [
      {
        title: "Normalise and enrich",
        body: "Each source maps to one lead shape, and a missing or invalid email is turned away with a 400. If the lead has a company domain or website, its homepage title and description are fetched as context, with a 5-second timeout.",
      },
      {
        title: "Qualify",
        body: "Gemini scores the lead and code sets the tier. Every Gemini call has a fallback model on its error output, since free-tier 429s and 503s are common, and a reply that can't be parsed defaults the lead to warm so it is never dropped.",
      },
      {
        title: "Log and reply",
        body: "The contact is upserted into HubSpot, the reply goes out over Gmail, and a hot lead triggers a Telegram alert. Telegram, enrichment and email fail soft, so a broken side channel never blocks the reply or the CRM write.",
      },
      {
        title: "Book and follow up",
        body: "The Cal.com webhook flips the contact to Call Booked and sends the brief. An hourly run picks up open leads, times nudges from the last email rather than from sign-up, and moves silent leads to Nurture.",
      },
    ],
    stack: [
      { group: "Orchestration", items: ["n8n (self-hosted, Docker)", "Cloudflare tunnel"] },
      { group: "AI", items: ["Gemini 3.1 Flash-Lite", "Gemini 3.5 Flash (fallback)"] },
      { group: "Integrations", items: ["HubSpot Free CRM", "Cal.com", "Gmail SMTP", "Telegram bot"] },
      { group: "Website", items: ["Next.js 16 Server Action"] },
    ],
    result: {
      stat: "14.0s",
      label:
        "average from form submit to reply sent, across 16 test leads; every one under 60 seconds, the slowest 32.6s when the fallback model stepped in",
      source: "n8n execution history and the repo's metrics script, 6 Oct 2026",
    },
    cover: {
      desktop: {
        src: `${al}/04-n8n-lead-intake-desktop.webp`,
        alt: "The AI Lead Agent's Lead Intake workflow in n8n, from the webhook through scoring, HubSpot, the reply and the Telegram alert",
        caption: "The Lead Intake workflow",
        w: 2880,
        h: 1800,
      },
      mobile: {
        src: `${al}/10-telegram-brief-mobile.webp`,
        alt: "A pre-call brief from the AI Lead Agent in Telegram",
        caption: "A pre-call brief on Telegram",
        w: 1206,
        h: 2622,
      },
    },
    screens: [
      {
        title: "The enquiry",
        body: "The form on this site's contact page, filled in with a sample lead. The visitor gets a thank-you straight away, and the calendar below is already filled in with their details.",
        kind: "desktop",
        shots: [
          {
            src: `${al}/01-contact-form-desktop.webp`,
            alt: "The “Prefer to write first?” form on upperlayerstudio.com filled in for Priya Mehta of BrightSmile Dental, asking for AI automation for sales calls; the email address is blurred",
            caption: "A sample lead fills in the form",
            w: 2880,
            h: 1800,
          },
          {
            src: `${al}/02-form-success-desktop.webp`,
            alt: "The form replaced by “Thanks — that's with me.” and a Pick a time button",
            caption: "The thank-you, shown about half a second later",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "The three workflows",
        body: "The workflows as they run in production on n8n.",
        kind: "desktop",
        shots: [
          {
            src: `${al}/03-n8n-workflows-desktop.webp`,
            alt: "n8n's workflow list with AI Lead Agent 01 Lead Intake, 02 Booking and 03 Follow-up, all published",
            caption: "Lead Intake, Booking and Follow-up, all published",
            w: 2880,
            h: 1800,
          },
          {
            src: `${al}/04-n8n-lead-intake-desktop.webp`,
            alt: "The Lead Intake workflow: webhook, normalise, email check, website enrichment, Gemini qualify with a fallback, HubSpot upsert, route by tier, reply, email and Telegram alert",
            caption: "Lead Intake: score, log, reply and alert",
            w: 2880,
            h: 1800,
          },
          {
            src: `${al}/05-n8n-booking-desktop.webp`,
            alt: "The Booking workflow: Cal.com webhook, find or create the HubSpot contact, set Call Booked, write the pre-call brief with Gemini and a fallback, and send it to Telegram",
            caption: "Booking: update the CRM and brief me",
            w: 2880,
            h: 1800,
          },
          {
            src: `${al}/06-n8n-follow-up-desktop.webp`,
            alt: "The Follow-up workflow: an hourly trigger finds open leads, decides, then either writes and sends a nudge or sets the lead to Nurture",
            caption: "Follow-up: nudge or move to Nurture",
            w: 2880,
            h: 1800,
          },
          {
            src: `${al}/07-n8n-execution-desktop.webp`,
            alt: "A successful Follow-up execution in n8n on 6 October at 21:00, finished in 1.468 seconds",
            caption: "An hourly Follow-up run, done in 1.5 seconds",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "What the lead and I get",
        body: "The reply the agent wrote for the sample lead, and the booking it led to. The test inbox address and the meeting link are blurred.",
        kind: "desktop",
        shots: [
          {
            src: `${al}/08-gmail-ai-reply-desktop.webp`,
            alt: "The AI-written reply in Gmail: it restates BrightSmile Dental's request, asks which CRM they use and links to a 30-minute discovery call",
            caption: "The reply, written for this lead",
            w: 2880,
            h: 1800,
          },
          {
            src: `${al}/09-calcom-booking-desktop.webp`,
            alt: "A confirmed Cal.com discovery call on Wednesday 7 October 2026, booked from a test enquiry",
            caption: "The discovery call, booked on Cal.com",
            w: 2880,
            h: 1800,
          },
        ],
      },
      {
        title: "On my phone",
        body: "What arrives on Telegram when a call is booked: who it is, what they want, what to ask and how to pitch it.",
        kind: "phone",
        shots: [
          {
            src: `${al}/10-telegram-brief-mobile.webp`,
            alt: "A Telegram pre-call brief for the sample lead: founder of BrightSmile Dental Clinics, wants AI booking across 4 clinics, with three questions to ask and a pitch angle",
            caption: "A pre-call brief",
            w: 1206,
            h: 2622,
          },
          {
            src: `${al}/11-telegram-booking-brief-mobile.webp`,
            alt: "A second Telegram brief for a booked call about AI automation for sales calls, with questions on call volume, pain points and budget",
            caption: "The brief for the booked test call",
            w: 1206,
            h: 2622,
          },
        ],
      },
    ],
    video: {
      src: `${al}/showcase.mp4`,
      srcSmall: `${al}/showcase-720.mp4`,
      poster: `${al}/showcase-poster.jpg`,
      note: "From the enquiry to the booked call, in one minute.",
    },
  },
];

export function projectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
