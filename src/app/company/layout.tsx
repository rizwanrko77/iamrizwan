import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company - Mohd Rizwan",
  description: "RKO Services Private Limited — the company behind Tharom AI, Xapproach, and more.",
  alternates: {
    canonical: "/company",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iamrizwan.com/company",
    siteName: "Mohd Rizwan",
    title: "Company - Mohd Rizwan",
    description: "RKO Services Private Limited — the company behind Tharom AI, Xapproach, and more.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "RKO Services Private Limited" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Company - Mohd Rizwan",
    description: "RKO Services Private Limited — the company behind Tharom AI, Xapproach, and more.",
    images: ["/og-image.png"],
  },
};

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
