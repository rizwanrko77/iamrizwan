'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TrackedLink from '@/components/TrackedLink';

/* 
 * Home page hero — signature entrance animation.
 * Words rise in sequence, hairline draws, body + links fade up.
 * Uses 'use client' for the entrance animation IntersectionObserver.
 * Metadata is exported from a separate layout or set in layout.tsx.
 */

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    // Trigger the entrance animation
    const timeout = setTimeout(() => {
      el.classList.add('is-visible');
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  // Split the headline into words for staggered animation
  const headlineWords = [
    'I', 'like', 'being', 'near', 'people',
    'building', 'something', 'real.'
  ];

  return (
    <>
      <div className="page-nav">
        <Nav />
      </div>
      <main>
        <div className="hero" ref={heroRef}>
          <p className="hero__eyebrow">Rizwan - Dehradun, India</p>

          <h1 className="hero__headline">
            {headlineWords.map((word, i) => (
              <span
                key={i}
                className="hero__headline-word"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {word}{' '}
              </span>
            ))}
          </h1>

          <div className="hero__rule" />

          <p className="hero__body">
            If you&apos;re building alone or with a small team, it&apos;s easy to get blind to your own product. I help founders enhance their product and user experience: spotting where flows break, catching friction before users churn, and pruning the noise. I care about deep focus, speed of execution, and solving problems that are actually worth solving.
          </p>

          <div className="hero__actions">
            <TrackedLink
              href="https://cal.com/meet-rizwan"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__cta-primary"
              eventName="home_cta_clicked"
              eventParams={{ action: "schedule_meeting" }}
            >
              Schedule a meeting <span>→</span>
            </TrackedLink>

            <div className="hero__links">
              <Link href="/bio" className="hero__link">
                Read my story <span>→</span>
              </Link>
              <Link href="/services" className="hero__link">
                My time-as-a-service <span>→</span>
              </Link>
              <Link href="/company" className="hero__link">
                See what I&apos;ve built <span>→</span>
              </Link>
              <Link href="/contact" className="hero__link">
                Start a conversation <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto', padding: '0 var(--space-3)' }}>
          <Footer />
        </div>
      </main>
    </>
  );
}
