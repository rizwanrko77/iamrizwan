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
  title: "Rizwan - Product & UX Enhancement",
  description: "I like being near people building something real. Product, building, validation, and go-to-market, one thing at a time.",
  keywords: [
    "Mohd Rizwan",
    "Rizwan",
    "Product Builder",
    "Product Experience",
    "UX Enhancement",
    "UX Audit",
    "MVP Scoping",
    "GTM",
    "Startups",
    "Founder",
    "Tharom AI",
    "TIME",
    "RKO Services Private Limited"
  ],
  authors: [{ name: "Rizwan", url: siteUrl }],
  creator: "Rizwan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Rizwan",
    title: "Rizwan - Product & UX Enhancement",
    description: "I like being near people building something real.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Rizwan - Product & UX Enhancement" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizwan - Product & UX Enhancement",
    description: "I like being near people building something real.",
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
    "alternateName": "Rizwan",
    "url": siteUrl,
    "image": `${siteUrl}/images/Rizwan-image.png`,
    "jobTitle": "Product Builder & Founder",
    "description": "Founder of RKO Services Private Limited, building Tharom AI. Product thinking, UX enhancement, AI infrastructure, and go-to-market.",
    "worksFor": {
      "@type": "Organization",
      "name": "RKO Services Private Limited",
      "url": "https://rkospl.com"
    },
    "founder": {
      "@type": "Organization",
      "name": "Tharom AI",
      "url": "https://tharom.com"
    },
    "sameAs": [
      "https://linkedin.com/in/rizwan-rko"
    ],
    "knowsAbout": [
      "Product Experience (PX)",
      "User Experience (UX)",
      "Product Strategy",
      "UX Audits & Optimization",
      "MVP Scoping",
      "Artificial Intelligence",
      "AI Infrastructure",
      "Knowledge Systems",
      "Go-to-Market",
      "Startups"
    ]
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
