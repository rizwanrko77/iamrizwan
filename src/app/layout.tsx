import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohd Rizwan",
  description: "Are you running a company alone or with a small team? I help with product, building, validation, and GTM - one thing at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
