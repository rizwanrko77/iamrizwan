'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

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
    'building', 'something', 'real', '—',
    'and', 'helping', 'wherever', 'the',
    'day', 'needs', 'it.'
  ];

  return (
    <>
      <div className="page-nav">
        <Nav />
      </div>
      <main>
        <div className="hero" ref={heroRef}>
          <p className="hero__eyebrow">Mohd Rizwan — Bijnor, India</p>

          <h1 className="hero__headline">
            {headlineWords.map((word, i) => (
              <span key={i} className="hero__headline-word">
                {word}{' '}
              </span>
            ))}
          </h1>

          <div className="hero__rule" />

          <p className="hero__body">
            If you&apos;re running a company alone or with a small team, most of your day
            gets eaten by everything that isn&apos;t the actual work. I help with product,
            building, validation, and go-to-market — one thing at a time. I don&apos;t do
            it for what you&apos;d pay; I do it to be close to something real.
          </p>

          <div className="hero__links">
            <Link href="/bio" className="hero__link">
              Read my story <span>→</span>
            </Link>
            <Link href="/projects" className="hero__link">
              See what I&apos;ve built <span>→</span>
            </Link>
            <Link href="/contact" className="hero__link">
              Start a conversation <span>→</span>
            </Link>
          </div>
        </div>

        <div style={{ maxWidth: 'var(--page-max-width)', margin: '0 auto', padding: '0 var(--space-3)' }}>
          <Footer />
        </div>
      </main>
    </>
  );
}
