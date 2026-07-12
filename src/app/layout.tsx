import type { Metadata } from "next";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import "./globals.css";

const siteUrl = "https://iamrizwan.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mohd Rizwan",
  description: "Are you running a company alone or with a small team? I help with product, building, validation, and GTM - one thing at a time.",
  keywords: ["Mohd Rizwan", "Product Builder", "GTM Consultant", "Startups", "Founder"],
  authors: [{ name: "Mohd Rizwan", url: siteUrl }],
  creator: "Mohd Rizwan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Mohd Rizwan",
    title: "Mohd Rizwan | Product Builder & GTM",
    description: "Are you running a company alone or with a small team? I help with product, building, validation, and GTM - one thing at a time.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohd Rizwan | Product Builder & GTM",
    description: "Are you running a company alone or with a small team? I help with product, building, validation, and GTM - one thing at a time.",
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
    "jobTitle": "Product Builder & GTM Consultant",
    "description": "I help with product design, building, validation, and GTM for startups and small teams.",
    "sameAs": [
      "https://linkedin.com/in/rizwan-rko"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
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
