import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import TrackedLink from "@/components/TrackedLink";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Mohd Rizwan",
  description: "Get in touch with Mohd Rizwan. The best way in is a message, not a form. LinkedIn, email, or book a meeting.",
};

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
              <TrackedLink href="mailto:hello@iamrizwan.com" className="contact-channel__link" eventName="contact_clicked" eventParams={{ method: 'Email' }}>
                hello@iamrizwan.com
              </TrackedLink>
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
