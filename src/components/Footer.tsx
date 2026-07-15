'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import FadeIn from './FadeIn';
import TrackedLink from './TrackedLink';

const projectsList = [
  { name: 'Xapproach', href: 'https://xapproach.com', category: 'Startup' },
  { name: 'Time', href: 'https://time.iamrizwan.com/', category: 'For Founders' },
  { name: 'Simple AI Resume Tool', href: 'https://resumetool.iamrizwan.com', category: 'Just for Fun' },
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
      <footer className="footer mt-8">
        <div className="footer__row">
          <p className="footer__text">
            Connect with me ·{' '}
            <TrackedLink href="https://linkedin.com/in/rizwan-rko" target="_blank" rel="noopener noreferrer" eventName="footer_clicked" eventParams={{ link: 'LinkedIn' }}>LinkedIn</TrackedLink> ·{' '}
            <TrackedLink href="mailto:hello@iamrizwan.com" eventName="footer_clicked" eventParams={{ link: 'Email' }}>Email</TrackedLink> ·{' '}
            <TrackedLink href="https://cal.com/meet-rizwan" target="_blank" rel="noopener noreferrer" eventName="footer_clicked" eventParams={{ link: 'Cal.com' }}>Book a meeting</TrackedLink> ·{' '}
            <Link href="/my-time">My Time</Link>
          </p>

          {/* Projects Dropdown */}
          <div className="footer-dropdown" ref={dropdownRef}>
            <button
              className="footer-dropdown__trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Projects
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
                {projectsList.map((project) => (
                  <TrackedLink
                    key={project.name}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-dropdown__item"
                    role="menuitem"
                    eventName="footer_project_clicked"
                    eventParams={{ project: project.name }}
                  >
                    <span className="footer-dropdown__item-name">{project.name}</span>
                    <span className="footer-dropdown__item-category">{project.category}</span>
                  </TrackedLink>
                ))}
                <div className="footer-dropdown__divider" />
                <Link href="/projects" className="footer-dropdown__view-all" onClick={() => setIsDropdownOpen(false)}>
                  View All Projects →
                </Link>
              </div>
            )}
          </div>
        </div>
      </footer>
    </FadeIn>
  );
}
