'use client';

import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import TrackedLink from "@/components/TrackedLink";
import Link from "next/link";
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
          <p className="page-header__kicker">— Projects</p>
          <h1 className="page-header__title">Things I&apos;ve built.</h1>
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
              id={`tab-${tab.id}`}
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
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
            <section
              role="tabpanel"
              id="panel-startups"
              aria-labelledby="tab-startups"
            >
              <div className="projects-list">

                {/* Tharom AI */}
                <div className="card">
                  <div className="card__header">
                    <h3 className="card__title">Tharom AI</h3>
                    <span className="status-chip status-chip--active">
                      <span className="status-chip__dot"></span> Active
                    </span>
                  </div>
                  <p className="card__body">Building the next generation of AI-powered knowledge infrastructure. Where Knowledge Thinks.</p>
                  <div className="card__footer">
                    <span className="card__tags">AI · knowledge infrastructure</span>
                    <TrackedLink href="https://tharom.com" target="_blank" rel="noopener noreferrer" className="card__link" eventName="project_clicked" eventParams={{ project: 'Tharom AI' }}>
                      Open project <span>→</span>
                    </TrackedLink>
                  </div>
                </div>

                {/* XApproach */}
                <div className="card">
                  <div className="card__header">
                    <h3 className="card__title">Xapproach</h3>
                    <span className="status-chip status-chip--hold">
                      <span className="status-chip__dot"></span> On Hold
                    </span>
                  </div>
                  <p className="card__body">Pay as you learn educational marketplace.</p>
                  <div className="card__footer">
                    <span className="card__tags">education · marketplace</span>
                    <TrackedLink href="https://xapproach.com" target="_blank" rel="noopener noreferrer" className="card__link" eventName="project_clicked" eventParams={{ project: 'Xapproach' }}>
                      Open project <span>→</span>
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
            <section
              role="tabpanel"
              id="panel-founders"
              aria-labelledby="tab-founders"
            >
              <div className="projects-list">

                {/* Time */}
                <div className="card">
                  <div className="card__header">
                    <h3 className="card__title">Time</h3>
                    <span className="status-chip status-chip--active">
                      <span className="status-chip__dot"></span> Active
                    </span>
                  </div>
                  <p className="card__body">Allocate your hours across jobs, freelance gigs, and side projects. Track your time with a built-in timer. Share a live availability page so clients and collaborators know exactly when you&apos;re available.</p>
                  <div className="card__footer">
                    <span className="card__tags">productivity · time-tracking · tool</span>
                    <TrackedLink href="https://time.iamrizwan.com/" target="_blank" rel="noopener noreferrer" className="card__link" eventName="project_clicked" eventParams={{ project: 'Time' }}>
                      Open project <span>→</span>
                    </TrackedLink>
                  </div>
                </div>

                {/* Quiet invitation — replaces the old founder-cta sales banner */}
                <p className="quiet-invite">
                  If you&apos;re building something and any of this is useful, I&apos;d genuinely like to hear about it. — <Link href="/contact">start a conversation →</Link>
                </p>

              </div>
            </section>
          </FadeIn>
        )}

        {/* Just for Fun */}
        {activeTab === 'fun' && (
          <FadeIn key="fun">
            <section
              role="tabpanel"
              id="panel-fun"
              aria-labelledby="tab-fun"
            >
              <div className="projects-list">

                {/* Resume Tool */}
                <div className="card">
                  <div className="card__header">
                    <h3 className="card__title">Simple AI Resume Tool</h3>
                    <span className="status-chip status-chip--active">
                      <span className="status-chip__dot"></span> Active
                    </span>
                  </div>
                  <p className="card__body">Simple resume building and updating tool.</p>
                  <div className="card__footer">
                    <span className="card__tags">tool · resume · productivity</span>
                    <TrackedLink href="https://resumetoolai.iamrizwan.com" target="_blank" rel="noopener noreferrer" className="card__link" eventName="project_clicked" eventParams={{ project: 'Resume Tool' }}>
                      Open project <span>→</span>
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
