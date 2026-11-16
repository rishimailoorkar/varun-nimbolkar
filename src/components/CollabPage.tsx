import { useEffect } from 'react';
import { Navbar } from './Navbar';
import { ContactCTA } from './ContactCTA';
import { SiteFooter } from './SiteFooter';
import { ArrowUpRight } from './Icons';
import { SELECTED_COLLABORATIONS } from '../data/collabData';
import '../collab.css';

export function CollabPage() {
  useEffect(() => {
    document.title = 'Collaborations & Production Work — Varun Nimbolkar';
    window.scrollTo(0, 0);
  }, []);

  const col1Projects = [SELECTED_COLLABORATIONS[0], SELECTED_COLLABORATIONS[2]]; // Tienas (01), Amritha (03)
  const col2Projects = [SELECTED_COLLABORATIONS[1], SELECTED_COLLABORATIONS[3]]; // Thoda Sa (02), Maya (04)

  return (
    <div className="collab-page">
      <a className="skip-link" href="#collab-content">
        Skip to collaborations
      </a>

      {/* NAVBAR */}
      <Navbar />

      <main id="top">
        {/* SECTION A — HERO INTRODUCTION (matching Press Page style) */}
        <section className="collab-hero" aria-labelledby="collab-hero-heading">
          <div className="collab-hero-inner">
            <div className="collab-brand-kicker">
              <span className="collab-kicker-bar" aria-hidden="true" />
              <span className="collab-brand-label">Varun Nimbolkar</span>
            </div>
            <h1 id="collab-hero-heading" className="collab-hero-title">
              Collaborations &amp;<br />
              <em>Production Work</em>
            </h1>
            <p className="collab-hero-desc">
              A curated showcase of genre-crossing releases, artist features, and collaborative productions.
            </p>
          </div>
        </section>

        {/* SECTION B — COVERAGE BAR */}
        <section className="collab-coverage-bar" aria-label="Collaborations overview">
          <div className="collab-coverage-inner">
            <div className="collab-coverage-left">
              <span className="collab-coverage-dash" aria-hidden="true" />
              <span>Collaborations</span>
            </div>
            <div className="collab-coverage-right">
              <span>04 Selected Projects</span>
            </div>
          </div>
        </section>

        {/* SECTION C — PERFORMANCE IMAGE */}
        <section className="collab-performance-image-section" aria-label="Performance photograph">
          <div className="collab-performance-image-wrap">
            <img
              src="/images/collab/collab-performance.webp"
              alt="Varun Nimbolkar performing live with sitar on stage"
              className="collab-performance-image"
              width="1024"
              height="682"
              fetchPriority="high"
            />
          </div>
        </section>

        {/* CONTENT SECTIONS */}
        <div className="collab-container" id="collab-content">
          {/* SECTION 02 — SELECTED COLLABORATIONS */}
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
                    <h2 className="collab-card-title">{project.title}</h2>
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
                    <h2 className="collab-card-title">{project.title}</h2>
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
        </div>
      </main>

      {/* CTA SECTION */}
      <ContactCTA light />

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}
