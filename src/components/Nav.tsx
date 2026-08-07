'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    // Return focus to hamburger when closing
    hamburgerRef.current?.focus();
  }, []);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const isActive = (path: string) => pathname === path;

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
        return;
      }

      // Focus trap: keep Tab within the mobile menu
      if (e.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Nav */}
      <nav className="nav" aria-label="Main navigation">
        <Link href="/" className="nav__logo" onClick={closeMenu}>
          Rizwan <span className="nav__logo-separator">·</span>
        </Link>
        <div className="nav__links">
          <Link href="/bio" className={`nav__link ${isActive('/bio') ? 'nav__link--active' : ''}`}>Bio</Link>
          <Link href="/projects" className={`nav__link ${isActive('/projects') ? 'nav__link--active' : ''}`}>Projects</Link>
          <Link href="/contact" className={`nav__link ${isActive('/contact') ? 'nav__link--active' : ''}`}>Contact</Link>
        </div>
        <button
          ref={hamburgerRef}
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

      {/* Mobile overlay (closes menu on tap outside) */}
      {isOpen && (
        <div
          className="nav__mobile-overlay is-open"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`nav__mobile-menu ${isOpen ? 'is-open' : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <Link href="/bio" className={`nav__mobile-link ${isActive('/bio') ? 'nav__mobile-link--active' : ''}`} onClick={closeMenu}>Bio</Link>
        <Link href="/projects" className={`nav__mobile-link ${isActive('/projects') ? 'nav__mobile-link--active' : ''}`} onClick={closeMenu}>Projects</Link>
        <Link href="/contact" className={`nav__mobile-link ${isActive('/contact') ? 'nav__mobile-link--active' : ''}`} onClick={closeMenu}>Contact</Link>
      </div>
    </>
  );
}
