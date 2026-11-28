import { useEffect, useState } from 'react';
import { ArrowUpRight } from './Icons';
import { Navbar } from './Navbar';
import { ContactCTA } from './ContactCTA';
import { SiteFooter } from './SiteFooter';
import { PressModal, type PressModalData } from './PressModal';
import '../press.css';

import { PRESS_ARTICLES } from '../data/press';

export function PressPage() {
  const [activeClipping, setActiveClipping] = useState<PressModalData | null>(null);

  useEffect(() => {
    document.title = 'Press Release — Varun Nimbolkar';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="press-page">
      <a className="skip-link" href="#press-articles">Skip to press coverage</a>
      <Navbar />

      <main id="top">
        {/* SECTION A — PRESS RELEASE INTRODUCTION */}
        <section className="press-hero" aria-labelledby="press-hero-heading">
          <div className="press-hero-inner">
            <div className="press-brand-kicker">
              <span className="press-kicker-bar" aria-hidden="true" />
              <span className="press-brand-label">VARUN NIMBOLKAR</span>
            </div>
            <h1 id="press-hero-heading" className="press-hero-title">
              PRESS <em>RELEASE</em>
            </h1>
            <p className="press-hero-desc">
              A selection of editorial features, music reviews, and cultural conversations from India and beyond.
            </p>
          </div>
        </section>

        {/* SECTION B — COVERAGE LABEL */}
        <section className="press-coverage-bar" aria-label="Coverage count">
          <div className="press-coverage-inner">
            <div className="press-coverage-left">
              <span className="press-coverage-dash" aria-hidden="true" />
              <span>COVERAGE</span>
            </div>
            <div className="press-coverage-right">
              <span>{String(PRESS_ARTICLES.length).padStart(2, '0')} FEATURES</span>
            </div>
          </div>
        </section>

        {/* SECTION C — MAIN PERFORMANCE IMAGE */}
        <section className="press-performance-image-section" aria-label="Performance photograph">
          <div className="press-performance-image-wrap">
            <img
              src="/images/DSC00337.JPEG"
              alt="Varun Nimbolkar seated cross-legged on a stage playing electric sitar"
              className="press-performance-image"
              width="6000"
              height="4000"
              fetchPriority="high"
            />
          </div>
        </section>

        {/* SECTION D — SEVEN PRESS ARTICLES */}
        <section id="press-articles" className="press-articles-section" aria-label="Press articles grid">
          <div className="press-articles-inner">
            <div className="press-grid">
              {PRESS_ARTICLES.map((article) => {
                const thumbSrc = article.thumbnailImage || article.clippingImage;
                const targetUrl = article.url || article.clippingImage || article.thumbnailImage || '#';

                return (
                  <article key={article.number} className="press-card">
                    <div className="press-card-header">
                      <span className="press-card-number">{article.number}</span>
                      <span className="press-card-date">{article.date}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginTop: '12px' }}>
                      {thumbSrc && (
                        <a
                          href={targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="press-card-media"
                          style={{
                            width: '84px',
                            minWidth: '84px',
                            height: '108px',
                            margin: 0,
                            borderRadius: '3px',
                            flexShrink: 0,
                            display: 'block',
                            overflow: 'hidden',
                            cursor: 'pointer',
                          }}
                          aria-label={`Read article: ${article.headline} (opens in a new tab)`}
                        >
                          <img
                            src={thumbSrc}
                            alt={`Clipping: ${article.headline}`}
                            className="press-card-clipping-img"
                            loading="lazy"
                            width="84"
                            height="108"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                          />
                          <span className="press-card-media-zoom">
                            <ArrowUpRight width={10} height={10} aria-hidden="true" />
                          </span>
                        </a>
                      )}

                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                        <span className="press-card-pub" style={{ marginBottom: '4px' }}>{article.publication}</span>
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '11px', color: '#8e929b', marginBottom: '12px', display: 'block' }}>{article.date}</span>
                        <h2 className="press-card-headline" style={{ margin: '0 0 10px 0', flexGrow: 0 }}>
                          <a href={targetUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                            {article.headline}
                          </a>
                        </h2>

                        {article.author && (
                          <span className="press-card-author" style={{ margin: '0 0 12px 0', display: 'block' }}>By {article.author}</span>
                        )}

                        {article.content && (
                          <p className="press-card-desc" style={{ margin: '0 0 20px 0' }}>{article.content}</p>
                        )}

                        <a
                          href={targetUrl}
                          className="press-card-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Read article: ${article.headline} on ${article.publication} (opens in a new tab)`}
                          style={{ marginTop: 'auto' }}
                        >
                          <span>READ MORE</span>
                          <ArrowUpRight width={14} height={14} aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION E — EXISTING CTA */}
        <ContactCTA light />
      </main>

      {/* SECTION F — EXISTING FOOTER */}
      <SiteFooter />

      {/* POPUP LIGHTBOX FOR NEWSPAPER CLIPPINGS */}
      <PressModal
        data={activeClipping}
        onClose={() => setActiveClipping(null)}
      />
    </div>
  );
}
