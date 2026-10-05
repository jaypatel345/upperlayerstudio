import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { siteSchema, siteUrl } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Upper Layer Studio builds AI automation, voice AI agents, custom AI agents and AI products — taking teams from manual work to software they own. Fixed-fee scope in 48 hours.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | AI Automation, Voice AI, Agents & Product Build`,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: "Jay Patel", url: "https://www.linkedin.com/in/jaypatel3405/" }],
  creator: "Jay Patel",
  publisher: site.name,
  keywords: [
    "AI automation agency",
    "AI automation services",
    "voice AI agent",
    "AI receptionist",
    "custom AI agents",
    "AI product development",
    "n8n automation",
    "workflow automation",
    "AI studio India",
  ],
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description:
      "AI automation, voice agents and product build for teams that need something running, not another prototype.",
    url: "/",
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@UpperLayerAI",
    creator: "@UpperLayerAI",
    title: `${site.name} | ${site.tagline}`,
    description:
      "AI automation, voice agents and product build for teams that need something running, not another prototype.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <JsonLd data={siteSchema()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-[var(--radius-sm)] focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
