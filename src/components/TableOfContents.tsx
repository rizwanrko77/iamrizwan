'use client';

import { useState, useEffect } from 'react';

export interface TocItem {
  id: string;
  title: string;
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    // Set first item active initially
    setActiveId(items[0].id);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0% -60% 0%',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  const activeTitle = items.find((it) => it.id === activeId)?.title || items[0].title;

  return (
    <>
      {/* Mobile Chapter Dropdown Bar */}
      <div className="toc-mobile">
        <button
          type="button"
          className="toc-mobile__trigger"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-expanded={isMobileOpen}
        >
          <div className="toc-mobile__label">
            <span className="toc-mobile__kicker">Chapter:</span>
            <span className="toc-mobile__active-title">{activeTitle}</span>
          </div>
          <svg
            className={`toc-mobile__chevron ${isMobileOpen ? 'toc-mobile__chevron--open' : ''}`}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {isMobileOpen && (
          <div className="toc-mobile__dropdown">
            <nav aria-label="Table of contents mobile">
              <ul className="toc-mobile__list">
                {items.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`toc-mobile__link ${
                        activeId === item.id ? 'toc-mobile__link--active' : ''
                      }`}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <span className="toc-mobile__num">{index + 1}.</span>
                      <span className="toc-mobile__text">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Desktop Sticky Sidebar */}
      <aside className="toc-desktop" aria-label="Table of contents">
        <div className="toc-desktop__inner">
          <div className="toc-desktop__header">
            <span className="toc-desktop__title">Chapters</span>
            <span className="toc-desktop__count">{items.length}</span>
          </div>
          <nav className="toc-desktop__nav">
            <ul className="toc-desktop__list">
              {items.map((item, index) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id} className="toc-desktop__item">
                    <a
                      href={`#${item.id}`}
                      className={`toc-desktop__link ${
                        isActive ? 'toc-desktop__link--active' : ''
                      }`}
                      title={item.title}
                    >
                      <span className="toc-desktop__num">{index + 1}</span>
                      <span className="toc-desktop__text">{item.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
