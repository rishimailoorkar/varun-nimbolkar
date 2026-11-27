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
              PRESS RELEASE
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
                const hasClipping = Boolean(article.clippingImage);

                const openClipping = () => {
                  if (article.clippingImage) {
                    setActiveClipping({
                      image: article.clippingImage,
                      title: article.headline,
                      publication: article.publication,
                      date: article.date,
                      author: article.author,
                      content: article.content,
                    });
                  }
                };

                return (
                  <article key={article.number} className="press-card">
                    <div className="press-card-header">
                      <span className="press-card-number">{article.number}</span>
                      <span className="press-card-date">{article.date}</span>
                    </div>

                    <span className="press-card-pub">{article.publication}</span>
                    <h2 className="press-card-headline">{article.headline}</h2>

                    {article.author && (
                      <span className="press-card-author">By {article.author}</span>
                    )}

                    {article.content && (
                      <p className="press-card-desc">{article.content}</p>
                    )}

                    {hasClipping ? (
                      <button
                        type="button"
                        className="press-card-link press-card-link--button"
                        onClick={openClipping}
                        aria-label={`View full newspaper clipping: ${article.headline}`}
                      >
                        <span>VIEW CLIPPING</span>
                        <ArrowUpRight width={14} height={14} aria-hidden="true" />
                      </button>
                    ) : (
                      <a
                        href={article.url}
                        className="press-card-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Read article: ${article.headline} on ${article.publication} (opens in a new tab)`}
                      >
                        <span>READ MORE</span>
                        <ArrowUpRight width={14} height={14} aria-hidden="true" />
                      </a>
                    )}
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
