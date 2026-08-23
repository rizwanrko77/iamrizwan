import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rizwan - Reviews & Testimonials",
  description: "Reviews, testimonials, and feedback from founders, collaborators, and builders working with Rizwan on product and UX enhancement.",
  alternates: {
    canonical: "/reviews",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iamrizwan.com/reviews",
    siteName: "Rizwan",
    title: "Rizwan - Reviews & Testimonials",
    description: "Reviews, testimonials, and feedback from founders, collaborators, and builders working with Rizwan on product and UX enhancement.",
    images: [{ url: "/og-reviews.png", width: 1200, height: 630, alt: "Rizwan - Reviews & Testimonials" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizwan - Reviews & Testimonials",
    description: "Reviews, testimonials, and feedback from founders, collaborators, and builders working with Rizwan on product and UX enhancement.",
    images: ["/og-reviews.png"],
  },
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Rizwan - Reviews & Testimonials",
    "description": "Reviews, testimonials, and feedback from founders, collaborators, and builders.",
    "url": "https://iamrizwan.com/reviews",
    "about": {
      "@type": "Person",
      "name": "Rizwan",
      "url": "https://iamrizwan.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
      {children}
    </>
  );
}
