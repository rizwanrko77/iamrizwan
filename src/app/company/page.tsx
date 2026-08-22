'use client';

import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import TrackedLink from "@/components/TrackedLink";
import Link from "next/link";

export default function Company() {
  return (
    <PageLayout>
      {/* Page Header */}
      <FadeIn>
        <header className="page-header">
          <p className="page-header__kicker">- Company</p>
          <h1 className="page-header__title">RKO Services Private Limited</h1>
          <p className="page-header__subtitle">Founded in 2023, RKOSPL is the company behind everything I build, from AI infrastructure to education platforms. Every project starts here.</p>
        </header>
      </FadeIn>

      {/* Products */}
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
            <p className="card__body">AI infrastructure for education and beyond knowledge bases. Where Knowledge Thinks.</p>
            <div className="card__footer">
              <span className="card__tags">AI · knowledge infrastructure</span>
              <TrackedLink href="https://tharom.com" target="_blank" rel="noopener noreferrer" className="card__link" eventName="project_clicked" eventParams={{ project: 'Tharom AI' }}>
                Open project <span>→</span>
              </TrackedLink>
            </div>
          </div>

          {/* TIME */}
          <div className="card">
            <div className="card__header">
              <h3 className="card__title">TIME</h3>
              <span className="status-chip status-chip--active">
                <span className="status-chip__dot"></span> Active
              </span>
            </div>
            <p className="card__body">Time allocation, tracking, and live availability platform built for founders and anyone looking to spend time wisely and keep clear records. Features built-in timers, voice notes, and shareable availability pages.</p>
            <div className="card__footer">
              <span className="card__tags">productivity · time management · availability</span>
              <TrackedLink href="https://time.rkospl.com" target="_blank" rel="noopener noreferrer" className="card__link" eventName="project_clicked" eventParams={{ project: 'TIME' }}>
                Open project <span>→</span>
              </TrackedLink>
            </div>
          </div>

          {/* Xapproach */}
          <div className="card">
            <div className="card__header">
              <h3 className="card__title">Xapproach</h3>
              <span className="status-chip status-chip--hold">
                <span className="status-chip__dot"></span> Paused
              </span>
            </div>
            <p className="card__body">Pay-per-minute educational marketplace for the Indian market. MVP built, paused for legal and financial compliance.</p>
            <div className="card__footer">
              <span className="card__tags">education · marketplace</span>
              <TrackedLink href="https://xapproach.com" target="_blank" rel="noopener noreferrer" className="card__link" eventName="project_clicked" eventParams={{ project: 'Xapproach' }}>
                Open project <span>→</span>
              </TrackedLink>
            </div>
          </div>

          {/* Humgrow */}
          <div className="card">
            <div className="card__header">
              <h3 className="card__title">Humgrow</h3>
              <span className="status-chip status-chip--closed">
                <span className="status-chip__dot"></span> Closed
              </span>
            </div>
            <p className="card__body">A super app for jobs and earnings: job portal, ATS, HRM, and freelance marketplace. Scaled to 32 people, signed 20+ contracts with leading banks and NBFCs. Shut down in 2025.</p>
            <div className="card__footer">
              <span className="card__tags">jobs · recruitment · HRM</span>
            </div>
          </div>

        </div>
      </FadeIn>

      {/* Quiet invitation */}
      <FadeIn>
        <p className="quiet-invite">
          If you&apos;re building something and any of this is useful, I&apos;d genuinely like to hear about it. <Link href="/contact">Start a conversation →</Link>
        </p>
      </FadeIn>
    </PageLayout>
  );
}
