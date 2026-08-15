import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Mohd Rizwan",
  description: "How I spend my time with founders - idea validation, MVP development, UX reviews, and startup operations. No rate card, just real help.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
