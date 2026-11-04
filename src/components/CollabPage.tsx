import { useEffect } from 'react';
import { Navbar } from './Navbar';
import { ContactCTA } from './ContactCTA';
import { SiteFooter } from './SiteFooter';
import { ArrowUpRight } from './Icons';
import {
  FEATURED_PROJECT,
  SELECTED_COLLABORATIONS,
  BRAND_PARTNERSHIP,
  AI_INNOVATION,
} from '../data/collabData';
import '../collab.css';

export function CollabPage() {
  useEffect(() => {
    document.title = 'Collaborations & Production Work — Varun Nimbolkar';
    window.scrollTo(0, 0);
  }, []);

  const col1Projects = [SELECTED_COLLABORATIONS[0], SELECTED_COLLABORATIONS[2]]; // Tienas (02), Maya (04)
  const col2Projects = [SELECTED_COLLABORATIONS[1], SELECTED_COLLABORATIONS[3]]; // Amritha (03), Unposted Letter (05)

  return (
    <div className="collab-page">
      <a className="skip-link" href="#collab-content">
        Skip to collaborations
      </a>

      {/* NAVBAR */}
      <Navbar />

      <main id="top" className="collab-container">
        {/* SECTION 01 — INTRODUCTION */}
        <header className="collab-header" id="collab-content">
          <h1 className="collab-main-title">
            COLLABORATIONS &amp;<br />
            PRODUCTION<br />
            WORK
          </h1>
          <hr className="collab-header-rule" aria-hidden="true" />
        </header>

        {/* SECTION 02 — FEATURED PROJECT */}
        <section className="collab-featured-section" aria-labelledby="featured-project-heading">
          <span className="collab-kicker">{FEATURED_PROJECT.projectNumber}</span>
          <div className="collab-featured-grid">
            <a
              href={FEATURED_PROJECT.streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="collab-artwork-link"
              aria-label={`Listen to ${FEATURED_PROJECT.title} on Apple Music (opens in a new tab)`}
            >
              <img
                src={FEATURED_PROJECT.artwork}
                alt={FEATURED_PROJECT.artworkAlt}
                className="collab-featured-artwork"
                width={600}
                height={600}
              />
            </a>

            <div className="collab-featured-info">
              <h2 id="featured-project-heading" className="collab-featured-title">
                {FEATURED_PROJECT.title}
              </h2>
              {FEATURED_PROJECT.artist && (
                <p className="collab-featured-artist">{FEATURED_PROJECT.artist}</p>
              )}
              <p className="collab-featured-desc">{FEATURED_PROJECT.description}</p>
              <a
                href={FEATURED_PROJECT.streamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="collab-link"
              >
                <span>{FEATURED_PROJECT.streamLabel}</span>
                <ArrowUpRight width={14} height={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 03 — SELECTED COLLABORATIONS */}
        <section className="collab-selected-section" aria-label="Selected collaborations list">
          <div className="collab-asymmetric-grid">
            {/* Column 1 */}
            <div className="collab-column">
              {col1Projects.map((project) => (
                <article key={project.id} className="collab-card">
                  <div className="collab-card-artwork-wrap">
                    <a
                      href={project.streamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="collab-artwork-link"
                      aria-label={`Listen to ${project.title} (opens in a new tab)`}
                    >
                      <img
                        src={project.artwork}
                        alt={project.artworkAlt}
                        className="collab-card-artwork"
                        width={592}
                        height={592}
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <span className="collab-card-kicker">{project.projectNumber}</span>
                  <h3 className="collab-card-title">{project.title}</h3>
                  {project.artist && (
                    <p className="collab-card-subtitle">{project.artist}</p>
                  )}
                  {project.subtitle && (
                    <p className="collab-card-subtitle">{project.subtitle}</p>
                  )}
                  <p className="collab-card-desc">{project.description}</p>
                  <div className="collab-links-group">
                    <a
                      href={project.streamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="collab-link"
                    >
                      <span>{project.streamLabel}</span>
                      <ArrowUpRight width={14} height={14} aria-hidden="true" />
                    </a>
                    {project.secondaryUrl && (
                      <a
                        href={project.secondaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="collab-link"
                      >
                        <span>{project.secondaryLabel}</span>
                        <ArrowUpRight width={14} height={14} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Column 2 (Offset) */}
            <div className="collab-column collab-column--offset">
              {col2Projects.map((project) => (
                <article key={project.id} className="collab-card">
                  <div className="collab-card-artwork-wrap">
                    <a
                      href={project.streamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="collab-artwork-link"
                      aria-label={`Listen to ${project.title} (opens in a new tab)`}
                    >
                      <img
                        src={project.artwork}
                        alt={project.artworkAlt}
                        className="collab-card-artwork"
                        width={592}
                        height={592}
                        loading="lazy"
                      />
                    </a>
                  </div>
                  <span className="collab-card-kicker">{project.projectNumber}</span>
                  <h3 className="collab-card-title">{project.title}</h3>
                  {project.artist && (
                    <p className="collab-card-subtitle">{project.artist}</p>
                  )}
                  {project.subtitle && (
                    <p className="collab-card-subtitle">{project.subtitle}</p>
                  )}
                  <p className="collab-card-desc">{project.description}</p>
                  <div className="collab-links-group">
                    <a
                      href={project.streamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="collab-link"
                    >
                      <span>{project.streamLabel}</span>
                      <ArrowUpRight width={14} height={14} aria-hidden="true" />
                    </a>
                    {project.secondaryUrl && (
                      <a
                        href={project.secondaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="collab-link"
                      >
                        <span>{project.secondaryLabel}</span>
                        <ArrowUpRight width={14} height={14} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 04 — BRAND PARTNERSHIPS & IN-STORE CURATION */}
        <section className="collab-metric-section" aria-labelledby="brand-partnerships-heading">
          <hr className="collab-section-divider" aria-hidden="true" />
          <h2 id="brand-partnerships-heading" className="collab-metric-header">
            {BRAND_PARTNERSHIP.category}
          </h2>
          <div className="collab-metric-grid">
            <div className="collab-metric-media">
              <a
                href={BRAND_PARTNERSHIP.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="collab-artwork-link"
                aria-label="Listen to Watching Her Dance on Apple Music (opens in a new tab)"
              >
                <img
                  src={BRAND_PARTNERSHIP.artwork}
                  alt={BRAND_PARTNERSHIP.artworkAlt}
                  className="collab-metric-img"
                  width={592}
                  height={592}
                  loading="lazy"
                />
              </a>
            </div>

            <div className="collab-metric-info">
              <div className="collab-stat-number">{BRAND_PARTNERSHIP.metric}</div>
              <div className="collab-stat-label">{BRAND_PARTNERSHIP.metricLabel}</div>
              <h3 className="collab-metric-title">{BRAND_PARTNERSHIP.title}</h3>
              {BRAND_PARTNERSHIP.brand && (
                <p className="collab-metric-brand">{BRAND_PARTNERSHIP.brand}</p>
              )}
              <p className="collab-metric-desc">{BRAND_PARTNERSHIP.description}</p>
              <div className="collab-links-group">
                <a
                  href={BRAND_PARTNERSHIP.primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="collab-link"
                >
                  <span>{BRAND_PARTNERSHIP.primaryLabel}</span>
                  <ArrowUpRight width={14} height={14} aria-hidden="true" />
                </a>
                {BRAND_PARTNERSHIP.secondaryUrl && (
                  <a
                    href={BRAND_PARTNERSHIP.secondaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="collab-link"
                  >
                    <span>{BRAND_PARTNERSHIP.secondaryLabel}</span>
                    <ArrowUpRight width={14} height={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 05 — SOUND DESIGN & AI MUSIC INNOVATION */}
        <section className="collab-metric-section" aria-labelledby="sound-design-heading">
          <hr className="collab-section-divider" aria-hidden="true" />
          <h2 id="sound-design-heading" className="collab-metric-header">
            {AI_INNOVATION.category}
          </h2>
          <div className="collab-metric-grid">
            <div className="collab-metric-media collab-metric-media--wide">
              <a
                href={AI_INNOVATION.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="collab-artwork-link"
                aria-label="Visit Beatoven AI (opens in a new tab)"
              >
                <img
                  src={AI_INNOVATION.artwork}
                  alt={AI_INNOVATION.artworkAlt}
                  className="collab-metric-img"
                  width={508}
                  height={316}
                  loading="lazy"
                />
              </a>
            </div>

            <div className="collab-metric-info">
              <div className="collab-stat-number">{AI_INNOVATION.metric}</div>
              <div className="collab-stat-label">{AI_INNOVATION.metricLabel}</div>
              <h3 className="collab-metric-title">{AI_INNOVATION.title}</h3>
              <p className="collab-metric-desc">{AI_INNOVATION.description}</p>
              <div className="collab-links-group">
                <a
                  href={AI_INNOVATION.primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="collab-link"
                >
                  <span>{AI_INNOVATION.primaryLabel}</span>
                  <ArrowUpRight width={14} height={14} aria-hidden="true" />
                </a>
                {AI_INNOVATION.secondaryUrl && (
                  <a
                    href={AI_INNOVATION.secondaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="collab-link"
                  >
                    <span>{AI_INNOVATION.secondaryLabel}</span>
                    <ArrowUpRight width={14} height={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CTA SECTION */}
      <ContactCTA light />

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}

