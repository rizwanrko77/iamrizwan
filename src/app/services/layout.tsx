import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rizwan - Time-as-a-service",
  description: "I find what's broken in your product before your users bother to tell you. Product review, MVP scoping, and advisory for founders.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iamrizwan.com/services",
    siteName: "Rizwan",
    title: "Rizwan - Time-as-a-service",
    description: "I find what's broken in your product before your users bother to tell you. Product review, MVP scoping, and advisory for founders.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Rizwan - Time-as-a-service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizwan - Time-as-a-service",
    description: "I find what's broken in your product before your users bother to tell you. Product review, MVP scoping, and advisory for founders.",
    images: ["/og-image.png"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
