'use client';

import { useEffect, useRef } from 'react';

export default function FadeIn({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Fallback: if element is already in viewport on mount, reveal it immediately
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('is-visible');
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0,
      rootMargin: '0px', // simplified root margin
    });

    observer.observe(el);

    // Safety fallback: reveal everything after 300ms just in case
    const timeout = setTimeout(() => {
      if (el) el.classList.add('is-visible');
    }, 300);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div ref={elementRef} className={`fade-in ${className}`}>
      {children}
    </div>
  );
}
