import PageLayout from "@/components/PageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources — Mohd Rizwan",
  description: "Tools, templates, and resources — coming when they're ready.",
  robots: { index: false },
};

export default function Resources() {
  return (
    <PageLayout>
      <section style={{ padding: 'clamp(4rem, 12vh, 9rem) 0' }}>
        <p style={{ color: 'var(--ink-muted)', fontStyle: 'italic', fontSize: '1rem' }}>
          Nothing here yet — I&apos;m only publishing things I actually use.
        </p>
      </section>
    </PageLayout>
  );
}
