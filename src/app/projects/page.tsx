'use client';

import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import TrackedLink from "@/components/TrackedLink";
import Link from "next/link";

export default function Projects() {
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

      {/* Projects List */}
      <FadeIn>
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
      </FadeIn>

      {/* Quiet invitation */}
      <FadeIn>
        <p className="quiet-invite">
          If you&apos;re building something and any of this is useful, I&apos;d genuinely like to hear about it. — <Link href="/contact">start a conversation →</Link>
        </p>
      </FadeIn>
    </PageLayout>
  );
}
