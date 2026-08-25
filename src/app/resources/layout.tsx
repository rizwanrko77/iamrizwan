import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rizwan - Resources & Blueprints",
  description: "Curated tools, blueprints, checklists, and actionable resources for founders, builders, and product teams.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iamrizwan.com/resources",
    siteName: "Rizwan",
    title: "Rizwan - Resources & Blueprints",
    description: "Curated tools, blueprints, checklists, and actionable resources for founders, builders, and product teams.",
    images: [{ url: "/og-resources.png", width: 1200, height: 630, alt: "Rizwan - Resources & Blueprints" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizwan - Resources & Blueprints",
    description: "Curated tools, blueprints, checklists, and actionable resources for founders, builders, and product teams.",
    images: ["/og-resources.png"],
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  const resourcesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Rizwan - Resources & Blueprints",
    "description": "Curated tools, blueprints, checklists, and actionable resources for founders, builders, and product teams.",
    "url": "https://iamrizwan.com/resources",
    "about": {
      "@type": "Person",
      "name": "Rizwan",
      "url": "https://iamrizwan.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resourcesSchema) }}
      />
      {children}
    </>
  );
}
