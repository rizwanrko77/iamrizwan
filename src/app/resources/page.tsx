import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - Mohd Rizwan",
  description: "Tools, templates, and research I've built for myself - sharing what's actually useful.",
};

export default function Resources() {
  return (
    <PageLayout>
      {/* Page Header */}
      <FadeIn>
        <header className="page-header">
          <span className="page-header__emoji">🛠️</span>
          <h1 className="page-header__title">Resources</h1>
          <p className="page-header__subtitle">Free templates, guides, and tools I use to build and ship faster.</p>
        </header>
      </FadeIn>

      {/* Grid */}
      <FadeIn>
        <section className="section">
          <h2 className="section-heading">FEATURED RESOURCES</h2>

          <div className="projects-grid">
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Resources coming soon...</p>
          </div>
        </section>
      </FadeIn>
    </PageLayout>
  );
}
