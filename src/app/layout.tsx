import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://upperlayerstudio.com"),
  title: {
    default: `${site.name} | AI Automation, Agents & Product Build`,
    template: `%s | ${site.name}`,
  },
  description:
    "Upper Layer Studio designs and builds the AI automation, agents and products that take teams from manual work to systems running in production.",
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description:
      "AI automation, agents and product build for teams that need something running, not another prototype.",
    url: "https://upperlayerstudio.com",
    siteName: site.name,
    type: "website",
  },
  icons: { icon: "/brand/upper_layer_studio_logo_transparent.svg" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
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
