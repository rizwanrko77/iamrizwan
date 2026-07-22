'use client';

import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import TrackedLink from "@/components/TrackedLink";
import Link from "next/link";
import { useCallback } from "react";

/* Metadata moved to contact/layout.tsx for client component compatibility */

const EMAIL_PARTS = ['hello', 'iamrizwan', 'com'] as const;

function buildMailto() {
  return `mailto:${EMAIL_PARTS[0]}@${EMAIL_PARTS[1]}.${EMAIL_PARTS[2]}`;
}

/*
 * Metadata is in contact/layout.tsx
 */

export default function Contact() {
  return (
    <PageLayout>
      {/* Page Header */}
      <FadeIn>
        <header className="page-header">
          <p className="page-header__kicker">— Contact</p>
          <h1 className="page-header__title">Let&apos;s talk.</h1>
          <p className="page-header__subtitle">The best way in is a message, not a form.</p>
        </header>
      </FadeIn>

      {/* Contact Content */}
      <FadeIn>
        <section className="contact-content">
          <p>
            If you&apos;re a founder building something interesting, or a team that needs someone who can do product thinking, research, design, or ship — I&apos;m especially responsive.
          </p>

          {/* Channels — quiet list with mono labels */}
          <div className="contact-channels">
            <div className="contact-channel">
              <span className="contact-channel__label">LinkedIn</span>
              <TrackedLink href="https://linkedin.com/in/rizwan-rko" target="_blank" rel="noopener noreferrer" className="contact-channel__link" eventName="contact_clicked" eventParams={{ method: 'LinkedIn' }}>
                Connect on LinkedIn →
              </TrackedLink>
            </div>
            <div className="contact-channel">
              <span className="contact-channel__label">Email</span>
              <a href="#" className="contact-channel__link" onClick={(e) => { e.preventDefault(); window.location.href = buildMailto(); }}>Send an email →</a>
            </div>
            <div className="contact-channel">
              <span className="contact-channel__label">Meeting</span>
              <TrackedLink href="https://cal.com/meet-rizwan" target="_blank" rel="noopener noreferrer" className="contact-channel__link" eventName="contact_clicked" eventParams={{ method: 'Cal.com' }}>
                Book a meeting →
              </TrackedLink>
            </div>
            <div className="contact-channel">
              <span className="contact-channel__label">GitHub</span>
              <TrackedLink href="https://github.com/rizwanrko77" target="_blank" rel="noopener noreferrer" className="contact-channel__link" eventName="contact_clicked" eventParams={{ method: 'GitHub' }}>
                github.com/rizwanrko77
              </TrackedLink>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Availability Section */}
      <FadeIn>
        <section className="contact-content availability-section">
          <h2>When I&apos;m around</h2>
          <p>
            My current schedule, live. <Link href="/my-time">See full availability →</Link>
          </p>
        </section>
      </FadeIn>

      {/* Closing Note */}
      <FadeIn>
        <p className="contact-content contact-closing">
          I read everything myself. If you&apos;re building, I&apos;ll write back.
        </p>
      </FadeIn>
    </PageLayout>
  );
}
