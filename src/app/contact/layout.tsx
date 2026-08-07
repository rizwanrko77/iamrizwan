import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Mohd Rizwan",
  description: "Get in touch with Mohd Rizwan. Send a message, connect on LinkedIn, or book a meeting.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
