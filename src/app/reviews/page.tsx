'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import FadeIn from '@/components/FadeIn';
import FeedbackModal from '@/components/FeedbackModal';

interface Review {
  id: number;
  name: string;
  company?: string;
  message: string;
  timestamp?: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      const endpoint =
        process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL ||
        process.env.NEXT_PUBLIC_CONTACT_FORM_URL;

      if (!endpoint) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(endpoint, { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.reviews && Array.isArray(data.reviews)) {
            setReviews(data.reviews);
          }
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return (
    <PageLayout>
      <div className="page-header">
        <FadeIn>
          <p className="page-header__kicker">- Words from founders</p>
          <div className="reviews-header__row">
            <div>
              <h1 className="page-header__title">What people say.</h1>
              <p className="page-header__subtitle">
                Unfiltered reviews and testimonials from founders, collaborators, and builders I&apos;ve worked with.
              </p>
            </div>
            <button
              className="services-cta__link services-cta__link--primary reviews-header__btn"
              onClick={() => setIsModalOpen(true)}
            >
              Leave a review <span>→</span>
            </button>
          </div>
        </FadeIn>
      </div>

      <div className="reviews-container">
        {isLoading ? (
          <div className="reviews-loading">
            <div className="feedback-modal__spinner" style={{ width: '24px', height: '24px', borderWidth: '3px', borderColor: 'var(--line)', borderTopColor: 'var(--accent)' }}></div>
            <p style={{ color: 'var(--ink-muted)', fontSize: '0.92rem' }}>Loading reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <FadeIn>
            {/* Desktop / Laptop Masonry (Left: 1,3,5 | Right: 2,4,6) */}
            <div className="reviews-masonry--desktop">
              <div className="reviews-column">
                {reviews
                  .filter((_, idx) => idx % 2 === 0)
                  .map((review) => (
                    <div key={review.id} className="review-card">
                      <div className="review-card__quote-mark">&ldquo;</div>
                      <p className="review-card__message">{review.message}</p>
                      <div className="review-card__footer">
                        <span className="review-card__author">{review.name}</span>
                        {review.company && (
                          <span className="review-card__role">{review.company}</span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="reviews-column">
                {reviews
                  .filter((_, idx) => idx % 2 === 1)
                  .map((review) => (
                    <div key={review.id} className="review-card">
                      <div className="review-card__quote-mark">&ldquo;</div>
                      <p className="review-card__message">{review.message}</p>
                      <div className="review-card__footer">
                        <span className="review-card__author">{review.name}</span>
                        {review.company && (
                          <span className="review-card__role">{review.company}</span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Mobile Sequential Feed (1, 2, 3, 4, 5) */}
            <div className="reviews-masonry--mobile">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-card__quote-mark">&ldquo;</div>
                  <p className="review-card__message">{review.message}</p>
                  <div className="review-card__footer">
                    <span className="review-card__author">{review.name}</span>
                    {review.company && (
                      <span className="review-card__role">{review.company}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <div className="reviews-empty">
              <p className="reviews-empty__title">No public reviews yet.</p>
              <p className="reviews-empty__desc">
                Have we worked together on a product, design, or project? I&apos;d love to hear your honest feedback.
              </p>
              <button
                className="services-cta__link services-cta__link--primary"
                onClick={() => setIsModalOpen(true)}
                style={{ marginTop: 'var(--space-2)' }}
              >
                Leave the first review <span>→</span>
              </button>
            </div>
          </FadeIn>
        )}
      </div>

      {/* Review Modal */}
      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab="review"
      />
    </PageLayout>
  );
}
