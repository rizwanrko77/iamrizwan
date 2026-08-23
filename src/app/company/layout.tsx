import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rizwan - Company",
  description: "RKO Services Private Limited, the company behind Tharom AI, TIME, Xapproach, and more.",
  alternates: {
    canonical: "/company",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iamrizwan.com/company",
    siteName: "Rizwan",
    title: "Rizwan - Company",
    description: "RKO Services Private Limited, the company behind Tharom AI, TIME, Xapproach, and more.",
    images: [{ url: "/og-company.png", width: 1200, height: 630, alt: "RKO Services Private Limited" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizwan - Company",
    description: "RKO Services Private Limited, the company behind Tharom AI, TIME, Xapproach, and more.",
    images: ["/og-company.png"],
  },
};

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
