import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Mohd Rizwan",
  description: "Get in touch with Mohd Rizwan. The best way in is a message, not a form. LinkedIn, email, or book a meeting.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
