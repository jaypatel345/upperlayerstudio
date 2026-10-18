import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { site } from "@/lib/site";
import { siteSchema, siteUrl } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "AI automation agency building workflow automation, AI voice agents, AI receptionists and custom AI agents for businesses worldwide. Fixed-fee scope in 48h.";

const socialTitle = `AI Automation Services & AI Voice Agents | ${site.name}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: socialTitle,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: "Jay Patel", url: "https://www.linkedin.com/in/jaypatel3405/" }],
  creator: "Jay Patel",
  publisher: site.name,
  keywords: [
    "AI automation services",
    "AI automation agency",
    "AI voice agent",
    "AI voice agent development",
    "AI receptionist",
    "AI phone answering service",
    "voice AI agency",
    "custom AI agents",
    "AI agent development",
    "workflow automation services",
    "business process automation",
    "n8n automation agency",
    "AI product development",
    "AI automation agency India",
  ],
  category: "technology",
  alternates: { canonical: "/", languages: { en: "/" } },
  openGraph: {
    title: socialTitle,
    description,
    url: "/",
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@UpperLayerAI",
    creator: "@UpperLayerAI",
    title: socialTitle,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://media.upperlayerstudio.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://media.upperlayerstudio.com" />
      </head>
      <body className="antialiased">
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-X3049BT33Q');
            `,
          }}
        />
        <Analytics />
        <JsonLd data={siteSchema()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-[var(--radius-sm)] focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
