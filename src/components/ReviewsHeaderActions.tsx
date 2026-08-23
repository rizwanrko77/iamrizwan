'use client';

import { useState } from 'react';
import FeedbackModal from '@/components/FeedbackModal';

export default function ReviewsHeaderActions({
  isFirstReview = false,
}: {
  isFirstReview?: boolean;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className={`services-cta__link services-cta__link--primary ${
          isFirstReview ? '' : 'reviews-header__btn'
        }`}
        onClick={() => setIsModalOpen(true)}
        style={isFirstReview ? { marginTop: 'var(--space-2)' } : undefined}
      >
        {isFirstReview ? 'Leave the first review' : 'Leave a review'} <span>→</span>
      </button>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab="review"
      />
    </>
  );
}
