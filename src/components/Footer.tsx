'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import FadeIn from './FadeIn';
import TrackedLink from './TrackedLink';

const brandsList = [
  { name: 'Tharom AI', href: 'https://tharom.com' },
  { name: 'Xapproach', href: 'https://xapproach.com' },
];

export default function Footer() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
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
              <TrackedLink href="https://github.com/rizwanrko77" target="_blank" rel="noopener noreferrer" eventName="footer_clicked" eventParams={{ link: 'GitHub' }}>GitHub</TrackedLink>
            </div>
          </div>

          {/* Navigate Group */}
          <div className="footer__group">
            <span className="footer__group-label">Navigate</span>
            <div className="footer__group-links">
              <Link href="/bio">Bio</Link>
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
                  View brands
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
                    {brandsList.map((brand) => (
                      <TrackedLink
                        key={brand.name}
                        href={brand.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-dropdown__item"
                        role="menuitem"
                        eventName="footer_project_clicked"
                        eventParams={{ project: brand.name }}
                      >
                        <span className="footer-dropdown__item-name">{brand.name}</span>
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

        {/* Bottom row: copyright */}
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Mohd Rizwan</span>
        </div>
      </footer>
    </FadeIn>
  );
}
