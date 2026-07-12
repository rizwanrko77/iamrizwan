import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import TrackedLink from "@/components/TrackedLink";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Mohd Rizwan",
  description: "Xapproach, client work, and tools I've built - one entry at a time, real status included.",
};

export default function Projects() {
  return (
    <PageLayout>
      {/* Page Header */}
      <FadeIn>
        <header className="page-header">
          <span className="page-header__emoji">💡</span>
          <h1 className="page-header__title">Projects</h1>
          <p className="page-header__subtitle">I'm obsessed with turning ideas into things that exist.</p>
        </header>
      </FadeIn>

      {/* Own Projects */}
      <FadeIn>
        <section className="section">
          <h2 className="section-heading">Own</h2>
          <div className="projects-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>

            {/* XApproach */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-1)' }}>
                <h3 className="card__title" style={{ marginBottom: 0 }}>Xapproach</h3>
                <span className="status-chip status-chip--active" style={{ marginBottom: 0 }}>
                  <span className="status-chip__dot"></span> Active
                </span>
              </div>
              <p className="card__body">Pay as you learn educational marketplace.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="project-card__tags" style={{ marginBottom: 0 }}>education · marketplace</span>
                <TrackedLink href="https://xapproach.com" target="_blank" rel="noopener noreferrer" className="card__link" eventName="project_clicked" eventParams={{ project: 'Xapproach' }}>
                  Open Project <span>→</span>
                </TrackedLink>
              </div>
            </div>

            {/* Time */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-1)' }}>
                <h3 className="card__title" style={{ marginBottom: 0 }}>Time</h3>
                <span className="status-chip status-chip--active" style={{ marginBottom: 0 }}>
                  <span className="status-chip__dot"></span> Active
                </span>
              </div>
              <p className="card__body">Allocate your hours across jobs, freelance gigs, and side projects. Track your time with a built-in timer. Share a live availability page so clients and collaborators know exactly when you're available.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="project-card__tags" style={{ marginBottom: 0 }}>productivity · time-tracking · tool</span>
                <TrackedLink href="https://time.iamrizwan.com/" target="_blank" rel="noopener noreferrer" className="card__link" eventName="project_clicked" eventParams={{ project: 'Time' }}>
                  Open Project <span>→</span>
                </TrackedLink>
              </div>
            </div>

            {/* Resume Tool */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-1)' }}>
                <h3 className="card__title" style={{ marginBottom: 0 }}>Simple AI Resume Tool</h3>
                <span className="status-chip status-chip--active" style={{ marginBottom: 0 }}>
                  <span className="status-chip__dot"></span> Active
                </span>
              </div>
              <p className="card__body">Simple resume building and updating tool.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="project-card__tags" style={{ marginBottom: 0 }}>tool · resume · productivity</span>
                <TrackedLink href="https://resumetool.iamrizwan.com" target="_blank" rel="noopener noreferrer" className="card__link" eventName="project_clicked" eventParams={{ project: 'Resume Tool' }}>
                  Open Project <span>→</span>
                </TrackedLink>
              </div>
            </div>

          </div>
        </section>
      </FadeIn>

      {/* Contributions */}
      <FadeIn>
        <section className="section">
          <h2 className="section-heading">Contributions</h2>
          <div className="projects-grid">
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Coming soon...</p>
          </div>
        </section>
      </FadeIn>
    </PageLayout>
  );
}
