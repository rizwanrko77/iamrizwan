'use client';

import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import TrackedLink from "@/components/TrackedLink";
import { useState } from "react";

const tabs = [
  { id: 'startups', label: 'My Startups' },
  { id: 'founders', label: 'For Founders' },
  { id: 'fun', label: 'Just for Fun' },
] as const;

type TabId = typeof tabs[number]['id'];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<TabId>('startups');

  return (
    <PageLayout>
      {/* Page Header */}
      <FadeIn>
        <header className="page-header">
          <span className="page-header__emoji">💡</span>
          <h1 className="page-header__title">Projects</h1>
          <p className="page-header__subtitle">I&apos;m obsessed with turning ideas into things that exist.</p>
        </header>
      </FadeIn>

      {/* Tab Navigation */}
      <FadeIn>
        <div className="tabs" role="tablist" aria-label="Project categories">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`tabs__tab ${activeTab === tab.id ? 'tabs__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Tab Content */}
      <div className="tabs__content">
        {/* My Startups */}
        {activeTab === 'startups' && (
          <FadeIn key="startups">
            <section className="section">
              <div className="projects-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>

                {/* Tharom AI */}
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-1)' }}>
                    <h3 className="card__title" style={{ marginBottom: 0 }}>Tharom AI</h3>
                    <span className="status-chip status-chip--active" style={{ marginBottom: 0 }}>
                      <span className="status-chip__dot"></span> Active
                    </span>
                  </div>
                  <p className="card__body">Building the next generation of AI-powered knowledge infrastructure. Where Knowledge Thinks.</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="project-card__tags" style={{ marginBottom: 0 }}>AI · knowledge infrastructure</span>
                    <TrackedLink href="https://tharom.com" target="_blank" rel="noopener noreferrer" className="card__link" eventName="project_clicked" eventParams={{ project: 'Tharom AI' }}>
                      Open Project <span>→</span>
                    </TrackedLink>
                  </div>
                </div>

                {/* XApproach */}
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-1)' }}>
                    <h3 className="card__title" style={{ marginBottom: 0 }}>Xapproach</h3>
                    <span className="status-chip status-chip--hold" style={{ marginBottom: 0 }}>
                      <span className="status-chip__dot"></span> On Hold
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

              </div>
            </section>
          </FadeIn>
        )}

        {/* For Founders */}
        {activeTab === 'founders' && (
          <FadeIn key="founders">
            <section className="section">
              <div className="projects-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>

                {/* Time */}
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-1)' }}>
                    <h3 className="card__title" style={{ marginBottom: 0 }}>Time</h3>
                    <span className="status-chip status-chip--active" style={{ marginBottom: 0 }}>
                      <span className="status-chip__dot"></span> Active
                    </span>
                  </div>
                  <p className="card__body">Allocate your hours across jobs, freelance gigs, and side projects. Track your time with a built-in timer. Share a live availability page so clients and collaborators know exactly when you&apos;re available.</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="project-card__tags" style={{ marginBottom: 0 }}>productivity · time-tracking · tool</span>
                    <TrackedLink href="https://time.iamrizwan.com/" target="_blank" rel="noopener noreferrer" className="card__link" eventName="project_clicked" eventParams={{ project: 'Time' }}>
                      Open Project <span>→</span>
                    </TrackedLink>
                  </div>
                </div>

                {/* Founder CTA Banner */}
                <div className="founder-cta">
                  <div className="founder-cta__icon">🚀</div>
                  <h3 className="founder-cta__title">Need something built for you or your startup?</h3>
                  <p className="founder-cta__body">
                    I can build custom tools, apps, and systems tailored to your unique requirements.
                    Fast, lean, and built by someone who understands what founders actually need.
                  </p>
                  <TrackedLink href="/contact" className="founder-cta__link" eventName="founder_cta_clicked" eventParams={{ source: 'projects_page' }}>
                    Let&apos;s talk <span>→</span>
                  </TrackedLink>
                </div>

              </div>
            </section>
          </FadeIn>
        )}

        {/* Just for Fun */}
        {activeTab === 'fun' && (
          <FadeIn key="fun">
            <section className="section">
              <div className="projects-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>

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
                    <TrackedLink href="https://resumetoolai.iamrizwan.com" target="_blank" rel="noopener noreferrer" className="card__link" eventName="project_clicked" eventParams={{ project: 'Resume Tool' }}>
                      Open Project <span>→</span>
                    </TrackedLink>
                  </div>
                </div>

              </div>
            </section>
          </FadeIn>
        )}
      </div>
    </PageLayout>
  );
}
