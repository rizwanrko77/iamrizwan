'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { createPortal } from 'react-dom';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'feedback' | 'review';
}

type SubmissionStatus = 'idle' | 'sending' | 'success' | 'error';

export default function FeedbackModal({
  isOpen,
  onClose,
  initialTab = 'feedback',
}: FeedbackModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'feedback' | 'review'>(initialTab);
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Form fields
  const [feedbackSubject, setFeedbackSubject] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackContact, setFeedbackContact] = useState('');

  const [reviewName, setReviewName] = useState('');
  const [reviewCompany, setReviewCompany] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const [reviewContact, setReviewContact] = useState('');
  const [allowFeature, setAllowFeature] = useState(true);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync initialTab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setStatus('idle');
      setErrorMsg('');
    }
  }, [isOpen, initialTab]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const endpoint =
      process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL ||
      process.env.NEXT_PUBLIC_CONTACT_FORM_URL;

    if (!endpoint) {
      setStatus('error');
      setErrorMsg('Feedback endpoint is not configured yet.');
      return;
    }

    if (activeTab === 'feedback') {
      if (!feedbackSubject.trim() || !feedbackMessage.trim()) {
        setStatus('error');
        setErrorMsg('Please enter both a subject and your feedback message.');
        return;
      }
    } else {
      if (!reviewName.trim() || !reviewMessage.trim()) {
        setStatus('error');
        setErrorMsg('Please enter both your name and review message.');
        return;
      }
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const payload =
        activeTab === 'feedback'
          ? {
            type: 'Feedback',
            subject: feedbackSubject.trim(),
            message: feedbackMessage.trim(),
            contact: feedbackContact.trim() || 'Anonymous',
          }
          : {
            type: 'Testimonial',
            name: reviewName.trim(),
            company: reviewCompany.trim(),
            message: reviewMessage.trim(),
            contact: reviewContact.trim() || 'Not provided',
            allowFeature: allowFeature,
          };

      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors',
      });

      setStatus('success');
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or reach out directly.');
    }
  };

  const handleResetAndClose = () => {
    setFeedbackSubject('');
    setFeedbackMessage('');
    setFeedbackContact('');
    setReviewName('');
    setReviewCompany('');
    setReviewMessage('');
    setReviewContact('');
    setAllowFeature(true);
    setStatus('idle');
    onClose();
  };

  return createPortal(
    <div
      className="feedback-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="feedback-modal-card" ref={modalRef}>
        {/* Header */}
        <div className="feedback-modal__header">
          <h2 id="modal-title" className="feedback-modal__title">
            {status === 'success' ? 'Thank you' : 'Feedback & Reviews'}
          </h2>
          <button
            type="button"
            className="feedback-modal__close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {status === 'success' ? (
          <div className="feedback-modal__success-state">
            <p className="feedback-modal__success-msg">
              {activeTab === 'feedback'
                ? 'Thank you for your feedback! I appreciate you taking the time to share your thoughts.'
                : 'Thank you for your review! I truly appreciate your support.'}
            </p>
            <button
              type="button"
              className="feedback-modal__btn feedback-modal__btn--primary"
              onClick={handleResetAndClose}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* Segmented Tab Switcher */}
            <div className="feedback-modal__tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'feedback'}
                className={`feedback-modal__tab ${activeTab === 'feedback' ? 'feedback-modal__tab--active' : ''
                  }`}
                onClick={() => {
                  setActiveTab('feedback');
                  setStatus('idle');
                  setErrorMsg('');
                }}
              >
                Quick Feedback
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'review'}
                className={`feedback-modal__tab ${activeTab === 'review' ? 'feedback-modal__tab--active' : ''
                  }`}
                onClick={() => {
                  setActiveTab('review');
                  setStatus('idle');
                  setErrorMsg('');
                }}
              >
                Leave a Review
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="feedback-modal__form">
              {errorMsg && (
                <div className="feedback-modal__error" role="alert">
                  {errorMsg}
                </div>
              )}

              {activeTab === 'feedback' ? (
                <>
                  <div className="feedback-modal__field">
                    <label
                      htmlFor="feedback-subject"
                      className="feedback-modal__label"
                    >
                      Subject / Topic <span className="required">*</span>
                    </label>
                    <input
                      id="feedback-subject"
                      type="text"
                      className="feedback-modal__input"
                      placeholder="e.g. Suggestion for TIME, spotted a typo..."
                      value={feedbackSubject}
                      onChange={(e) => {
                        setFeedbackSubject(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      required
                      disabled={status === 'sending'}
                    />
                  </div>

                  <div className="feedback-modal__field">
                    <label
                      htmlFor="feedback-message"
                      className="feedback-modal__label"
                    >
                      Your Feedback <span className="required">*</span>
                    </label>
                    <textarea
                      id="feedback-message"
                      className="feedback-modal__input feedback-modal__textarea"
                      placeholder="Share your thoughts, suggestions, or what could be improved..."
                      value={feedbackMessage}
                      onChange={(e) => {
                        setFeedbackMessage(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      rows={4}
                      required
                      disabled={status === 'sending'}
                    />
                  </div>

                  <div className="feedback-modal__field">
                    <label
                      htmlFor="feedback-contact"
                      className="feedback-modal__label"
                    >
                      Your Name / Email{' '}
                      <span className="optional">(optional)</span>
                    </label>
                    <input
                      id="feedback-contact"
                      type="text"
                      className="feedback-modal__input"
                      placeholder="If you would like a reply"
                      value={feedbackContact}
                      onChange={(e) => setFeedbackContact(e.target.value)}
                      disabled={status === 'sending'}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="feedback-modal__row">
                    <div className="feedback-modal__field">
                      <label
                        htmlFor="review-name"
                        className="feedback-modal__label"
                      >
                        Your Name <span className="required">*</span>
                      </label>
                      <input
                        id="review-name"
                        type="text"
                        className="feedback-modal__input"
                        placeholder="e.g. Alex Smith"
                        value={reviewName}
                        onChange={(e) => {
                          setReviewName(e.target.value);
                          if (status === 'error') setStatus('idle');
                        }}
                        required
                        disabled={status === 'sending'}
                      />
                    </div>

                    <div className="feedback-modal__field">
                      <label
                        htmlFor="review-company"
                        className="feedback-modal__label"
                      >
                        Company &amp; Role{' '}
                        <span className="optional">(optional)</span>
                      </label>
                      <input
                        id="review-company"
                        type="text"
                        className="feedback-modal__input"
                        placeholder="e.g. Founder, Acme"
                        value={reviewCompany}
                        onChange={(e) => setReviewCompany(e.target.value)}
                        disabled={status === 'sending'}
                      />
                    </div>
                  </div>

                  <div className="feedback-modal__field">
                    <label
                      htmlFor="review-message"
                      className="feedback-modal__label"
                    >
                      Your Review / Testimonial <span className="required">*</span>
                    </label>
                    <textarea
                      id="review-message"
                      className="feedback-modal__input feedback-modal__textarea"
                      placeholder="How was your experience working with Rizwan or using products like Tharom AI / TIME?"
                      value={reviewMessage}
                      onChange={(e) => {
                        setReviewMessage(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      rows={4}
                      required
                      disabled={status === 'sending'}
                    />
                  </div>

                  <div className="feedback-modal__field">
                    <label
                      htmlFor="review-contact"
                      className="feedback-modal__label"
                    >
                      LinkedIn / Website / Profile{' '}
                      <span className="optional">(optional)</span>
                    </label>
                    <input
                      id="review-contact"
                      type="text"
                      className="feedback-modal__input"
                      placeholder="e.g. https://linkedin.com/in/username or yoursite.com"
                      value={reviewContact}
                      onChange={(e) => setReviewContact(e.target.value)}
                      disabled={status === 'sending'}
                    />
                    <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', marginTop: '4px' }}>
                      If provided and your review is published, your name will link directly to your profile so others can connect with you.
                    </p>
                  </div>

                  <div className="feedback-modal__checkbox-field">
                    <label className="feedback-modal__checkbox-label">
                      <input
                        type="checkbox"
                        checked={allowFeature}
                        onChange={(e) => setAllowFeature(e.target.checked)}
                        disabled={status === 'sending'}
                      />
                      <span>
                        Allow Rizwan to feature this review on the website
                      </span>
                    </label>
                  </div>
                </>
              )}

              <div className="feedback-modal__actions">
                <button
                  type="submit"
                  className="feedback-modal__btn feedback-modal__btn--primary"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <span className="feedback-modal__btn-sending">
                      <span className="feedback-modal__spinner"></span>
                      Sending...
                    </span>
                  ) : activeTab === 'feedback' ? (
                    'Send feedback →'
                  ) : (
                    'Submit review →'
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
