'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import FadeIn from './FadeIn';
import TrackedLink from './TrackedLink';

const productsList = [
  { name: 'Tharom AI', href: 'https://tharom.com' },
  { name: 'TIME', href: 'https://time.rkospl.com' },
  { name: 'Xapproach', href: 'https://xapproach.com' },
];

export default function Footer() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (feedbackRef.current && !feedbackRef.current.contains(event.target as Node)) {
        setIsFeedbackOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <FadeIn>
      <footer className="footer">
        <div className="footer__top">
          {/* Connect Group */}
          <div className="footer__group">
            <span className="footer__group-label">Connect</span>
            <div className="footer__group-links">
              <TrackedLink href="https://linkedin.com/in/rizwan-rko" target="_blank" rel="noopener noreferrer" eventName="footer_clicked" eventParams={{ link: 'LinkedIn' }}>LinkedIn</TrackedLink>
              <TrackedLink href="mailto:hello@iamrizwan.com?subject=Reaching%20out%20via%20iamrizwan.com&body=Hi%20Rizwan%2C%0A%0A" eventName="footer_clicked" eventParams={{ link: 'Email' }}>Send an email</TrackedLink>
              <TrackedLink href="https://cal.com/meet-rizwan" target="_blank" rel="noopener noreferrer" eventName="footer_clicked" eventParams={{ link: 'Cal.com' }}>Book a meeting</TrackedLink>
            </div>
          </div>

          {/* Navigate Group */}
          <div className="footer__group">
            <span className="footer__group-label">Navigate</span>
            <div className="footer__group-links">
              <Link href="/bio">Bio</Link>
              <Link href="/services">Services</Link>
              <Link href="/company">Company</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          {/* Company Dropdown Group */}
          <div className="footer__group">
            <span className="footer__group-label">Company</span>
            <div className="footer__group-links" ref={dropdownRef}>
              <div className="footer-dropdown">
                <button
                  className="footer-dropdown__trigger"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  View products
                  <svg
                    className={`footer-dropdown__arrow ${isDropdownOpen ? 'footer-dropdown__arrow--open' : ''}`}
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="2,7 5,3 8,7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="footer-dropdown__menu" role="menu">
                    <span className="footer-dropdown__title">RKO Services Private</span>
                    {productsList.map((product) => (
                      <TrackedLink
                        key={product.name}
                        href={product.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-dropdown__item"
                        role="menuitem"
                        eventName="footer_project_clicked"
                        eventParams={{ project: product.name }}
                      >
                        <span className="footer-dropdown__item-name">{product.name}</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '6px', opacity: 0.5 }}>
                          <path d="M4.5 1.5H10.5V7.5" />
                          <path d="M10.5 1.5L1.5 10.5" />
                        </svg>
                      </TrackedLink>
                    ))}
                    <div className="footer-dropdown__divider" />
                    <Link href="/company" className="footer-dropdown__view-all" onClick={() => setIsDropdownOpen(false)}>
                      View all →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: copyright + feedback */}
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Rizwan</span>
          <div className="footer-feedback" ref={feedbackRef}>
            <button
              className="footer-feedback__trigger"
              onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
              aria-expanded={isFeedbackOpen}
              aria-haspopup="true"
            >
              Got feedback for me?
            </button>
            {isFeedbackOpen && (
              <div className="footer-dropdown__menu footer-feedback__menu" role="menu">
                <TrackedLink
                  href="mailto:hello@iamrizwan.com?subject=Feedback%20for%20Rizwan%20via%20iamrizwan.com&body=Hi%20Rizwan%2C%0A%0AHere%E2%80%99s%20my%20feedback%3A%0A%0A"
                  className="footer-dropdown__item"
                  role="menuitem"
                  eventName="footer_feedback_clicked"
                  eventParams={{ method: 'Email' }}
                  onClick={() => setIsFeedbackOpen(false)}
                >
                  <span className="footer-dropdown__item-name">Send an email</span>
                </TrackedLink>
                <Link
                  href="/contact"
                  className="footer-dropdown__item"
                  role="menuitem"
                  onClick={() => setIsFeedbackOpen(false)}
                >
                  <span className="footer-dropdown__item-name">Fill the contact form</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </footer>
    </FadeIn>
  );
}
