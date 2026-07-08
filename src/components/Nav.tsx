'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Nav */}
      <nav className="nav" aria-label="Main navigation">
        <Link href="/" className="nav__logo" onClick={closeMenu}>
          Rizwan <span className="nav__logo-separator">·</span>
        </Link>
        <div className="nav__links">
          <Link href="/bio" className={`nav__link ${isActive('/bio') ? 'nav__link--active' : ''}`}>Bio</Link>
          <Link href="/resources" className={`nav__link ${isActive('/resources') ? 'nav__link--active' : ''}`}>Resources</Link>
          <Link href="/projects" className={`nav__link ${isActive('/projects') ? 'nav__link--active' : ''}`}>Projects</Link>
          <Link href="/contact" className={`nav__link ${isActive('/contact') ? 'nav__link--active' : ''}`}>Contact</Link>
        </div>
        <button 
          className="nav__hamburger" 
          aria-label="Toggle menu" 
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {isOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="14" x2="20" y2="14" />
                <line x1="4" y1="20" x2="20" y2="20" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`nav__mobile-menu ${isOpen ? 'is-open' : ''}`} role="navigation" aria-label="Mobile navigation">
        <Link href="/bio" className={`nav__mobile-link ${isActive('/bio') ? 'nav__mobile-link--active' : ''}`} onClick={closeMenu}>Bio</Link>
        <Link href="/resources" className={`nav__mobile-link ${isActive('/resources') ? 'nav__mobile-link--active' : ''}`} onClick={closeMenu}>Resources</Link>
        <Link href="/projects" className={`nav__mobile-link ${isActive('/projects') ? 'nav__mobile-link--active' : ''}`} onClick={closeMenu}>Projects</Link>
        <Link href="/contact" className={`nav__mobile-link ${isActive('/contact') ? 'nav__mobile-link--active' : ''}`} onClick={closeMenu}>Contact</Link>
      </div>
    </>
  );
}
