'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import FadeIn from '@/components/FadeIn';
import { getAllResources, getAllCategories, Resource } from '@/data/resources';

function ResourceCardPlaceholder({ category }: { category: string }) {
  return (
    <div className="resource-card__placeholder" aria-hidden="true">
      <svg
        className="resource-card__placeholder-icon"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="9" y1="7" x2="15" y2="7" />
        <line x1="9" y1="11" x2="13" y2="11" />
      </svg>
      <span className="resource-card__placeholder-tag">{category}</span>
    </div>
  );
}

function ResourceCardItem({ resource }: { resource: Resource }) {
  const resourceUrl = `/resources/${resource.slug}`;

  return (
    <div className="resource-card">
      <Link href={resourceUrl} className="resource-card__media-link" tabIndex={-1} aria-hidden="true">
        {resource.image ? (
          <div className="resource-card__img-wrap">
            <img
              src={resource.image}
              alt={resource.title}
              className="resource-card__img"
              loading="lazy"
            />
          </div>
        ) : (
          <ResourceCardPlaceholder category={resource.category} />
        )}
      </Link>

      <div className="resource-card__content">
        <div className="resource-card__meta-top">
          <span className="resource-badge">{resource.category}</span>
          {resource.readTime && (
            <span className="resource-card__read-time">{resource.readTime}</span>
          )}
        </div>

        <h2 className="resource-card__title">
          <Link href={resourceUrl} className="resource-card__title-link">
            {resource.title}
          </Link>
        </h2>

        <p className="resource-card__desc">{resource.description}</p>

        {resource.tags && resource.tags.length > 0 && (
          <div className="resource-card__tags">
            {resource.tags.map((tag) => (
              <span key={tag} className="resource-card__tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="resource-card__footer">
          <span className="resource-card__date">{resource.date}</span>
          <Link href={resourceUrl} className="resource-card__cta">
            Read resource <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ResourceSkeletonPlaceholder() {
  return (
    <div className="resource-card resource-card--skeleton" aria-hidden="true">
      <div className="resource-card__media-link">
        <div className="resource-card__placeholder resource-skeleton__media">
          <div className="resource-skeleton__shimmer-dot" />
        </div>
      </div>
      <div className="resource-card__content resource-skeleton__content">
        <div className="resource-card__meta-top">
          <div className="resource-skeleton__bar resource-skeleton__bar--badge" />
          <div className="resource-skeleton__bar resource-skeleton__bar--time" />
        </div>

        <div className="resource-skeleton__bar resource-skeleton__bar--title" />
        <div className="resource-skeleton__bar resource-skeleton__bar--title-short" />

        <div className="resource-skeleton__bar resource-skeleton__bar--desc" />
        <div className="resource-skeleton__bar resource-skeleton__bar--desc-short" />

        <div className="resource-card__footer" style={{ borderTopColor: 'rgba(224, 219, 208, 0.4)' }}>
          <div className="resource-skeleton__bar resource-skeleton__bar--date" />
          <div className="resource-skeleton__bar resource-skeleton__bar--cta" />
        </div>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const allResources = useMemo(() => getAllResources(), []);
  const categories = useMemo(() => getAllCategories(), []);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = useMemo(() => {
    return allResources.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category.toLowerCase() === activeCategory.toLowerCase();
      
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [allResources, activeCategory, searchQuery]);

  return (
    <PageLayout>
      <div className="page-header">
        <FadeIn>
          <p className="page-header__kicker">- Curated Knowledge</p>
          <div className="resources-header__row">
            <div>
              <h1 className="page-header__title">Resources &amp; Playbooks</h1>
              <p className="page-header__desc">
                Architectural blueprints, interactive tools, and pragmatic workflows for building products without unnecessary friction.
              </p>
            </div>
            <div className="resources-header__stats">
              <span className="resources-header__count">{allResources.length}</span>
              <span className="resources-header__count-label">Playbooks &amp; Tools</span>
            </div>
          </div>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="resources-controls">
          {/* Categories Tab Pills */}
          <div className="resources-categories" role="tablist" aria-label="Filter resources by category">
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`resources-category-btn ${
                    isActive ? 'resources-category-btn--active' : ''
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="resources-search">
            <svg
              className="resources-search__icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="resources-search__input"
              placeholder="Search resources, topics, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search resources"
            />
            {searchQuery && (
              <button
                type="button"
                className="resources-search__clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </FadeIn>

      <div className="resources-container">
        {filteredResources.length > 0 ? (
          <FadeIn>
            <div className="resources-grid">
              {filteredResources.map((resource) => (
                <ResourceCardItem key={resource.slug} resource={resource} />
              ))}
              <ResourceSkeletonPlaceholder />
            </div>
          </FadeIn>
        ) : allResources.length === 0 ? (
          <FadeIn>
            <div className="resources-empty">
              <p className="resources-empty__title">Resources coming soon.</p>
              <p className="resources-empty__desc">
                Curated playbooks, checklists, and tools for founders and builders will be published here shortly.
              </p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <div className="resources-empty">
              <p className="resources-empty__title">No resources found</p>
              <p className="resources-empty__desc">
                No matching resources found for &ldquo;{searchQuery || activeCategory}&rdquo;. Try resetting your filters.
              </p>
              <button
                type="button"
                className="services-cta__link services-cta__link--primary"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                style={{ marginTop: 'var(--space-2)' }}
              >
                Reset filters <span>→</span>
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </PageLayout>
  );
}
