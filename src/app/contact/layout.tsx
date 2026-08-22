import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rizwan - Contact",
  description: "Get in touch with Rizwan. Send a message, connect on LinkedIn, or book a meeting.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iamrizwan.com/contact",
    siteName: "Rizwan",
    title: "Rizwan - Contact",
    description: "Get in touch with Rizwan. Send a message, connect on LinkedIn, or book a meeting.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Contact Rizwan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizwan - Contact",
    description: "Get in touch with Rizwan. Send a message, connect on LinkedIn, or book a meeting.",
    images: ["/og-image.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
