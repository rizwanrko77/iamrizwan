import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import FadeIn from '@/components/FadeIn';
import TrackedLink from '@/components/TrackedLink';
import CopyPromptBox from '@/components/CopyPromptBox';
import TableOfContents, { TocItem } from '@/components/TableOfContents';
import { getAllResources, getResourceBySlug } from '@/data/resources';

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const resources = getAllResources();
  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    return {
      title: 'Resource Not Found - Rizwan',
    };
  }

  const ogImg = resource.ogImage || resource.image || '/og-resources.png';

  return {
    title: `${resource.title} - Rizwan`,
    description: resource.description,
    alternates: {
      canonical: `/resources/${resource.slug}`,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: `https://iamrizwan.com/resources/${resource.slug}`,
      siteName: 'Rizwan',
      title: `${resource.title} - Rizwan`,
      description: resource.description,
      images: [{ url: ogImg, width: 1200, height: 630, alt: resource.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${resource.title} - Rizwan`,
      description: resource.description,
      images: [ogImg],
    },
  };
}

function extractHeadings(content?: string, promptSnippet?: string): TocItem[] {
  if (!content) return [];
  const lines = content.split('\n');
  const headings: TocItem[] = [];

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      const rawTitle = trimmed
        .replace('## ', '')
        .replace(/\*\*/g, '')
        .replace(/`/g, '')
        .replace(/\*/g, '')
        .trim();
      const id = rawTitle
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      headings.push({ id, title: rawTitle });
    }
  });

  if (promptSnippet) {
    headings.push({
      id: 'ai-prompt',
      title: 'Build with AI prompt',
    });
  }

  return headings;
}

function parseInline(text: string): React.ReactNode {
  if (!text) return null;

  // Split tokens by markdown links [text](url), bold **bold**, italic *italic*, code `code`
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*|`.*?`)/g;
  const segments = text.split(regex);

  return segments.map((seg, i) => {
    if (!seg) return null;

    // Link: [text](url)
    const linkMatch = seg.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const isInternal = linkMatch[2].startsWith('/');
      if (isInternal) {
        return (
          <Link key={i} href={linkMatch[2]} className="resource-inline-link">
            {linkMatch[1]}
          </Link>
        );
      }
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="resource-inline-link"
        >
          {linkMatch[1]}
        </a>
      );
    }

    // Bold: **text**
    const boldMatch = seg.match(/^\*\*(.*?)\*\*$/);
    if (boldMatch) {
      return <strong key={i}>{parseInline(boldMatch[1])}</strong>;
    }

    // Italic: *text*
    const italicMatch = seg.match(/^\*(.*?)\*$/);
    if (italicMatch) {
      return <em key={i}>{parseInline(italicMatch[1])}</em>;
    }

    // Code: `code`
    const codeMatch = seg.match(/^`(.*?)`$/);
    if (codeMatch) {
      return <code key={i} className="resource-inline-code">{codeMatch[1]}</code>;
    }

    return seg;
  });
}

function renderFormattedContent(content?: string) {
  if (!content) return null;

  // Split content into blocks (preserving code blocks and tables)
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Code block
    if (trimmed.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push(
        <div key={blocks.length} className="resource-body__code-wrap">
          <pre className="resource-body__pre">
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
      continue;
    }

    // Table block
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const headerRow = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        const dataRows = tableLines.slice(2).map((r) =>
          r
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim())
        );

        blocks.push(
          <div key={blocks.length} className="resource-body__table-wrap">
            <table className="resource-body__table">
              <thead>
                <tr>
                  {headerRow.map((h, hi) => (
                    <th key={hi}>{parseInline(h)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci}>{parseInline(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      blocks.push(
        <blockquote key={blocks.length} className="resource-body__quote">
          {parseInline(quoteLines.join(' '))}
        </blockquote>
      );
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed === '***') {
      blocks.push(<hr key={blocks.length} className="resource-body__hr" />);
      i++;
      continue;
    }

    // H2 with Heading ID for TOC Jump
    if (trimmed.startsWith('## ')) {
      const rawHeading = trimmed
        .replace('## ', '')
        .replace(/\*\*/g, '')
        .replace(/`/g, '')
        .replace(/\*/g, '')
        .trim();
      const headingId = rawHeading
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      blocks.push(
        <h2 key={blocks.length} id={headingId} className="resource-body__h2">
          {parseInline(trimmed.replace('## ', ''))}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (trimmed.startsWith('### ')) {
      blocks.push(
        <h3 key={blocks.length} className="resource-body__h3">
          {parseInline(trimmed.replace('### ', ''))}
        </h3>
      );
      i++;
      continue;
    }

    // Unordered List
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const listItems: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))
      ) {
        listItems.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={blocks.length} className="resource-body__list">
          {listItems.map((item, idx) => (
            <li key={idx} className="resource-body__list-item">
              {parseInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered List (1. 2. 3.)
    if (/^\d+\.\s+/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={blocks.length} className="resource-body__ol">
          {listItems.map((item, idx) => (
            <li key={idx} className="resource-body__ol-item">
              {parseInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Standard Paragraph
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].trim().startsWith('## ') &&
      !lines[i].trim().startsWith('### ') &&
      !lines[i].trim().startsWith('- ') &&
      !lines[i].trim().startsWith('* ') &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      lines[i].trim() !== '---'
    ) {
      paragraphLines.push(lines[i].trim());
      i++;
    }

    if (paragraphLines.length > 0) {
      blocks.push(
        <p key={blocks.length} className="resource-body__p">
          {parseInline(paragraphLines.join(' '))}
        </p>
      );
    }
  }

  return <div className="resource-body">{blocks}</div>;
}

export default async function ResourceDetailPage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const siteUrl = 'https://iamrizwan.com';
  const ogImg = resource.ogImage || resource.image || '/og-resources.png';
  const headings = extractHeadings(resource.content, resource.promptSnippet);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resource.title,
    description: resource.description,
    image: ogImg.startsWith('http') ? ogImg : `${siteUrl}${ogImg.startsWith('/') ? ogImg : `/${ogImg}`}`,
    datePublished: resource.date,
    author: {
      '@type': 'Person',
      name: resource.author?.name || 'Mohd Rizwan',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RKO Services Private Limited',
      url: 'https://rkospl.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/resources/${resource.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <PageLayout>
        <div className="resource-layout">
          {/* Sticky Table of Contents Sidebar */}
          {headings.length > 0 && <TableOfContents items={headings} />}

          {/* Main Article Content */}
          <article className="resource-detail">
            {/* Breadcrumb Navigation */}
            <FadeIn>
              <nav className="resource-breadcrumbs" aria-label="Breadcrumbs">
                <Link href="/" className="resource-breadcrumbs__link">
                  Home
                </Link>
                <span className="resource-breadcrumbs__sep">/</span>
                <Link href="/resources" className="resource-breadcrumbs__link">
                  Resources
                </Link>
                <span className="resource-breadcrumbs__sep">/</span>
                <span className="resource-breadcrumbs__current" aria-current="page">
                  {resource.title}
                </span>
              </nav>
            </FadeIn>

            {/* Article Header */}
            <FadeIn>
              <header className="resource-detail__header">
                <div className="resource-detail__meta-top">
                  <span className="resource-badge">{resource.category}</span>
                  {resource.readTime && (
                    <span className="resource-card__read-time">{resource.readTime}</span>
                  )}
                  <span className="resource-detail__bullet">·</span>
                  <span className="resource-detail__date">{resource.date}</span>
                </div>

                <h1 className="resource-detail__title">{resource.title}</h1>

                <p className="resource-detail__subtitle">{resource.description}</p>

                {/* Author Row */}
                <div className="resource-detail__author-bar">
                  <img
                    src="/images/Rizwan-image.png"
                    alt="Mohd Rizwan"
                    className="resource-detail__author-avatar"
                    width={44}
                    height={44}
                    loading="lazy"
                  />
                  <div>
                    <div className="resource-detail__author-name">
                      {resource.author?.name || 'Mohd Rizwan'}
                    </div>
                    <div className="resource-detail__author-role">
                      {resource.author?.role || 'Founder & UX Enhancement Specialist'}
                    </div>
                  </div>
                </div>
              </header>
            </FadeIn>

            {/* Action Links (Demo + GitHub) */}
            {(resource.externalUrl || resource.githubUrl) && (
              <FadeIn>
                <div className="resource-actions-bar">
                  {resource.externalUrl && (
                    <TrackedLink
                      href={resource.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="services-cta__link services-cta__link--primary"
                      eventName="resource_demo_clicked"
                      eventParams={{ resource: resource.title, url: resource.externalUrl }}
                    >
                      Open Live Demo <span>↗</span>
                    </TrackedLink>
                  )}
                  {resource.githubUrl && (
                    <TrackedLink
                      href={resource.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-secondary-action"
                      eventName="resource_github_clicked"
                      eventParams={{ resource: resource.title, url: resource.githubUrl }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      View Source on GitHub <span>↗</span>
                    </TrackedLink>
                  )}
                </div>
              </FadeIn>
            )}

            {/* Cover Media if available */}
            {resource.image && (
              <FadeIn>
                <div className="resource-detail__media">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="resource-detail__cover-img"
                  />
                </div>
              </FadeIn>
            )}

            {/* Main Content Body */}
            <FadeIn>
              <div className="resource-detail__content-wrap">
                {renderFormattedContent(resource.content)}
              </div>
            </FadeIn>

            {/* Tags */}
            {resource.tags && resource.tags.length > 0 && (
              <FadeIn>
                <div className="resource-detail__tags-section">
                  <span className="resource-detail__tags-label">Topics:</span>
                  <div className="resource-detail__tags-list">
                    {resource.tags.map((tag) => (
                      <span key={tag} className="resource-detail__tag-pill">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* AI Prompt Box (if provided) */}
            {resource.promptSnippet && (
              <FadeIn>
                <CopyPromptBox prompt={resource.promptSnippet} />
              </FadeIn>
            )}

            {/* Founder Advisory Callout */}
            <FadeIn>
              <div className="resource-callout">
                <div className="resource-callout__content">
                  <h3 className="resource-callout__title">
                    Want a custom screening system or UX audit?
                  </h3>
                  <p className="resource-callout__desc">
                    I work with founders to design high-signal technical evaluations, streamline user onboarding, and eliminate product friction.
                  </p>
                </div>
                <div className="resource-callout__actions">
                  <Link
                    href="/contact"
                    className="services-cta__link services-cta__link--primary"
                  >
                    Contact Rizwan <span>→</span>
                  </Link>
                  <Link href="/resources" className="resource-callout__back-link">
                    ← Back to all resources
                  </Link>
                </div>
              </div>
            </FadeIn>
          </article>
        </div>
      </PageLayout>
    </>
  );
}
