import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import "./globals.css";

const siteUrl = "https://iamrizwan.com";

/* ── Fonts via next/font (no render-blocking @import) ── */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: './',
  },
  title: "Mohd Rizwan — Product Builder & GTM",
  description: "I like being near people building something real — and helping wherever the day needs it. Product, building, validation, and go-to-market — one thing at a time.",
  keywords: ["Mohd Rizwan", "Product Builder", "GTM", "Startups", "Founder", "Tharom AI"],
  authors: [{ name: "Mohd Rizwan", url: siteUrl }],
  creator: "Mohd Rizwan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Mohd Rizwan",
    title: "Mohd Rizwan — Product Builder & GTM",
    description: "I like being near people building something real — and helping wherever the day needs it.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Mohd Rizwan — Product Builder & GTM" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohd Rizwan — Product Builder & GTM",
    description: "I like being near people building something real — and helping wherever the day needs it.",
    images: ["/og-image.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Mohd Rizwan",
    "url": siteUrl,
    "image": `${siteUrl}/images/Rizwan-image.png`,
    "jobTitle": "Product Builder & GTM",
    "description": "I help with product design, building, validation, and GTM for startups and small teams.",
    "sameAs": [
      "https://linkedin.com/in/rizwan-rko",
      "https://github.com/rizwanrko77"
    ],
    "knowsAbout": ["product", "go-to-market", "startups", "recruitment", "AI"]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
        suppressHydrationWarning
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
        {process.env.NEXT_PUBLIC_GTM_ID && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />}
      </body>
    </html>
  );
}
