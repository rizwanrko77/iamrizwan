'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import FadeIn from './FadeIn';
import TrackedLink from './TrackedLink';

const projectsList = [
  { name: 'Tharom AI', href: 'https://tharom.com', category: 'Startup' },
  { name: 'Xapproach', href: 'https://xapproach.com', category: 'Startup · On Hold' },
  { name: 'Time', href: 'https://time.iamrizwan.com/', category: 'For Founders' },
  { name: 'Simple AI Resume Tool', href: 'https://resumetoolai.iamrizwan.com', category: 'Just for Fun' },
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
              <TrackedLink href="mailto:hello@iamrizwan.com" eventName="footer_clicked" eventParams={{ link: 'Email' }}>Email</TrackedLink>
              <TrackedLink href="https://cal.com/meet-rizwan" target="_blank" rel="noopener noreferrer" eventName="footer_clicked" eventParams={{ link: 'Cal.com' }}>Book a meeting</TrackedLink>
              <TrackedLink href="https://github.com/rizwanrko77" target="_blank" rel="noopener noreferrer" eventName="footer_clicked" eventParams={{ link: 'GitHub' }}>GitHub</TrackedLink>
            </div>
          </div>

          {/* Navigate Group */}
          <div className="footer__group">
            <span className="footer__group-label">Navigate</span>
            <div className="footer__group-links">
              <Link href="/bio">Bio</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/my-time">My Time</Link>
            </div>
          </div>

          {/* Projects Dropdown Group */}
          <div className="footer__group">
            <span className="footer__group-label">Projects</span>
            <div className="footer__group-links" ref={dropdownRef}>
              <div className="footer-dropdown">
                <button
                  className="footer-dropdown__trigger"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  View all
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
                      </TrackedLink>
                    ))}
                    <div className="footer-dropdown__divider" />
                    <Link href="/projects" className="footer-dropdown__view-all" onClick={() => setIsDropdownOpen(false)}>
                      All Projects →
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
