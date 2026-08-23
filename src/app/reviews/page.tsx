import PageLayout from '@/components/PageLayout';
import FadeIn from '@/components/FadeIn';
import ReviewsModalButton from '@/components/ReviewsModalButton';

export const revalidate = 60; // Next.js ISR: Edge cache revalidates in background every 60s

interface Review {
  id: number;
  name: string;
  company?: string;
  message: string;
  link?: string;
  timestamp?: string;
}

function formatReviewUrl(link?: string): string | null {
  if (!link || link === 'Not provided' || link === 'Anonymous') return null;
  const trimmed = link.trim();
  if (!trimmed) return null;
  if (trimmed.includes('@') && !trimmed.startsWith('http') && !trimmed.includes('/')) {
    return `mailto:${trimmed}`;
  }
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function getPlatformIcon(url: string) {
  const lower = url.toLowerCase();

  // LinkedIn
  if (lower.includes('linkedin.com') || lower.includes('linkedin')) {
    return (
      <svg className="review-card__platform-icon" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.81a1.45 1.45 0 0 0-1.45 1.45 1.45 1.45 0 0 0 1.45 1.45 1.45 1.45 0 0 0 1.45-1.45 1.45 1.45 0 0 0-1.45-1.45Z"/>
      </svg>
    );
  }

  // X / Twitter
  if (lower.includes('twitter.com') || lower.includes('x.com')) {
    return (
      <svg className="review-card__platform-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-label="X (Twitter)">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  }

  // GitHub
  if (lower.includes('github.com')) {
    return (
      <svg className="review-card__platform-icon" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    );
  }

  // Product Hunt
  if (lower.includes('producthunt.com')) {
    return (
      <svg className="review-card__platform-icon" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-label="Product Hunt">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2.5V7.5H13c2.21 0 4 1.79 4 4s-1.79 4-4 4zm0-5.5h-1v3h1c.83 0 1.5-.67 1.5-1.5S13.83 11 13 11z"/>
      </svg>
    );
  }

  // Substack
  if (lower.includes('substack.com')) {
    return (
      <svg className="review-card__platform-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-label="Substack">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
      </svg>
    );
  }

  // YouTube
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) {
    return (
      <svg className="review-card__platform-icon" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-label="YouTube">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    );
  }

  // Medium
  if (lower.includes('medium.com')) {
    return (
      <svg className="review-card__platform-icon" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-label="Medium">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    );
  }

  // Dribbble
  if (lower.includes('dribbble.com')) {
    return (
      <svg className="review-card__platform-icon" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-label="Dribbble">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.845 10.875a10.024 10.024 0 0 1-.84 3.01 19.345 19.345 0 0 0-4.887-.624c-.382 0-.756.02-1.12.054a22.502 22.502 0 0 0-.585-1.258c2.617-1.134 4.542-2.73 5.485-4.103.882.87 1.558 1.956 1.947 2.921zm-2.91-4.832c-.822 1.253-2.585 2.723-5.019 3.774-1.077-2.023-2.348-3.924-3.79-5.658A9.972 9.972 0 0 1 12 2c2.535 0 4.851.944 6.619 2.506.11.169.215.35.316.537zM8.536 2.871a24.238 24.238 0 0 1 3.654 5.412C8.36 9.356 4.675 9.4 4.675 9.4a9.98 9.98 0 0 1 3.86-6.529zM2.155 13.125c.01-.176.03-.349.053-.52.27.01 3.727.106 7.64-1.282.203.44.398.88.583 1.32a13.916 13.916 0 0 0-6.19 8.272A9.957 9.957 0 0 1 2.155 13.125zm12.39 8.653c-.354-.606-.757-1.247-1.218-1.92-1.24-1.81-2.695-3.415-4.293-4.757a12.016 12.016 0 0 1 4.966-7.042c1.782.02 3.528.32 5.176.88a9.96 9.96 0 0 1-4.631 12.839z"/>
      </svg>
    );
  }

  // Instagram
  if (lower.includes('instagram.com')) {
    return (
      <svg className="review-card__platform-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Instagram">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    );
  }

  // Bluesky
  if (lower.includes('bsky.app') || lower.includes('bsky.social')) {
    return (
      <svg className="review-card__platform-icon" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-label="Bluesky">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.865.139 2.558-.003 3.827.001 4.922c.01 3.513 1.954 13.064 7.643 14.654 2.871.803 5.485-.758 4.356-4.776 1.129 4.018 3.743 5.579 6.356 4.776 5.689-1.59 7.633-11.141 7.643-14.654.004-1.095-.138-2.364-.901-3.057-.659-.599-1.664-.921-4.3 1.04C18.046 4.747 15.087 8.686 12 10.8z"/>
      </svg>
    );
  }

  // Email
  if (lower.startsWith('mailto:') || lower.includes('@')) {
    return (
      <svg className="review-card__platform-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Email">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    );
  }

  // Default Website / Globe
  return (
    <svg className="review-card__platform-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Website">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  );
}

function ReviewCardItem({ review }: { review: Review }) {
  const url = formatReviewUrl(review.link);

  return (
    <div className="review-card">
      <div className="review-card__quote-mark">&ldquo;</div>
      <p className="review-card__message">{review.message}</p>
      <div className="review-card__footer">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="review-card__author review-card__author--link"
            title={`Open profile: ${url}`}
          >
            <span>{review.name}</span>
            <span className="review-card__platform-icon-wrap">
              {getPlatformIcon(url)}
            </span>
          </a>
        ) : (
          <span className="review-card__author">{review.name}</span>
        )}
        {review.company && (
          <span className="review-card__role">{review.company}</span>
        )}
      </div>
    </div>
  );
}

async function getApprovedReviews(): Promise<Review[]> {
  const endpoint =
    process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL ||
    process.env.NEXT_PUBLIC_CONTACT_FORM_URL;

  if (!endpoint) return [];

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.reviews && Array.isArray(data.reviews)) {
        return data.reviews;
      }
    }
  } catch (err) {
    console.error('Error fetching approved reviews:', err);
  }

  return [];
}

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();

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
            <ReviewsModalButton />
          </div>
        </FadeIn>
      </div>

      <div className="reviews-container">
        {reviews.length > 0 ? (
          <FadeIn>
            {/* Desktop / Laptop Masonry (Left: 1,3,5 | Right: 2,4,6) */}
            <div className="reviews-masonry--desktop">
              <div className="reviews-column">
                {reviews
                  .filter((_, idx) => idx % 2 === 0)
                  .map((review) => (
                    <ReviewCardItem key={review.id} review={review} />
                  ))}
              </div>
              <div className="reviews-column">
                {reviews
                  .filter((_, idx) => idx % 2 === 1)
                  .map((review) => (
                    <ReviewCardItem key={review.id} review={review} />
                  ))}
              </div>
            </div>

            {/* Mobile Sequential Feed (1, 2, 3, 4, 5) */}
            <div className="reviews-masonry--mobile">
              {reviews.map((review) => (
                <ReviewCardItem key={review.id} review={review} />
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
              <ReviewsModalButton isFirstReview />
            </div>
          </FadeIn>
        )}
      </div>
    </PageLayout>
  );
}
