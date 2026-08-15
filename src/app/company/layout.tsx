import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company — Mohd Rizwan",
  description: "RKO Services Private Limited — the company behind Tharom AI, Xapproach, and more.",
};

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
