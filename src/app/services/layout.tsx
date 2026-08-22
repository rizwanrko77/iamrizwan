import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Mohd Rizwan",
  description: "I find what's broken in your product before your users bother to tell you. Product review, MVP scoping, and advisory for founders.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
