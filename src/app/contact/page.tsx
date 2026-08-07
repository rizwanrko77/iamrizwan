'use client';

import { useState, FormEvent } from 'react';
import PageLayout from "@/components/PageLayout";
import FadeIn from "@/components/FadeIn";
import TrackedLink from "@/components/TrackedLink";
import Link from "next/link";

/*
 * Contact page — channels + "Send a message" form.
 * Form submits to a Google Apps Script Web App that:
 *   1. Appends data to a Google Sheet
 *   2. Sends a confirmation email to the submitter (CC rizwanrko77@gmail.com)
 *
 * Metadata is set via export const metadata in a separate layout
 * or handled by the parent layout since this is now 'use client'.
 */

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user starts typing
    if (formStatus === 'error') setFormStatus('idle');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Client-side validation — all fields mandatory
    const { name, email, subject, message } = formData;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setFormStatus('error');
      setErrorMsg('All fields are required.');
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setFormStatus('sending');
    setErrorMsg('');

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_URL;
    if (!endpoint) {
      console.error('Contact form URL not configured');
      setFormStatus('error');
      setErrorMsg('Form is not configured yet. Please try again later.');
      return;
    }

    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
        mode: 'no-cors', // Apps Script requires no-cors from browser
      });

      // no-cors returns opaque response, so we assume success if no error thrown
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setFormStatus('error');
      setErrorMsg('Something went wrong. Please try again, or reach out on LinkedIn.');
    }
  };

  return (
    <PageLayout>
      {/* Page Header */}
      <FadeIn>
        <header className="page-header">
          <p className="page-header__kicker">— Contact</p>
          <h1 className="page-header__title">Let&apos;s talk.</h1>
          <p className="page-header__subtitle">The best way in is a message.</p>
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

      {/* Send a Message Form */}
      <FadeIn>
        <section className="contact-content contact-form-section">
          <h2>Send a message</h2>
          <p className="contact-form-intro">
            Drop me a note and I&apos;ll get back to you.
          </p>

          {formStatus === 'success' ? (
            <div className="contact-form-success">
              <p>
                <strong>Message sent.</strong> Thank you — I&apos;ll get back to you soon.
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', marginTop: '-8px', marginBottom: 'var(--space-3)' }}>
                I just sent an automated confirmation to your email. If you don&apos;t see it, <strong>please check your spam folder</strong> and mark it as "Not spam" to ensure my reply reaches your inbox.
              </p>
              <button
                type="button"
                className="contact-form__btn contact-form__btn--outline"
                onClick={() => setFormStatus('idle')}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="contact-name" className="contact-form__label">Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={formStatus === 'sending'}
                    className="contact-form__input"
                  />
                </div>
                <div className="contact-form__field">
                  <label htmlFor="contact-email" className="contact-form__label">Email</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={formStatus === 'sending'}
                    className="contact-form__input"
                  />
                </div>
              </div>

              <div className="contact-form__field">
                <label htmlFor="contact-subject" className="contact-form__label">Subject</label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  required
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={formStatus === 'sending'}
                  className="contact-form__input"
                />
              </div>

              <div className="contact-form__field">
                <label htmlFor="contact-message" className="contact-form__label">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={formStatus === 'sending'}
                  className="contact-form__input contact-form__textarea"
                />
              </div>

              {formStatus === 'error' && errorMsg && (
                <p className="contact-form-error">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="contact-form__btn"
              >
                {formStatus === 'sending' ? (
                  <span className="contact-form__btn-sending">
                    <span className="contact-form__spinner" />
                    Sending…
                  </span>
                ) : (
                  'Send message'
                )}
              </button>
            </form>
          )}
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
