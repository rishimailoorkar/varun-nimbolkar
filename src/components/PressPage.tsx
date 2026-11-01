import { useEffect } from 'react';
import { ArrowUpRight } from './Icons';
import { Navbar } from './Navbar';
import { ContactCTA } from './ContactCTA';
import { SiteFooter } from './SiteFooter';
import '../press.css';

interface PressArticle {
  number: string;
  date: string;
  publication: string;
  headline: string;
  url: string;
}

const PRESS_ARTICLES: PressArticle[] = [
  {
    number: '01',
    date: 'October 2025',
    publication: 'HOMEGROWN MAGAZINE',
    headline: "Varun Nimbolkar's Indian Experimental Fusion EP Doubles Down On Emotive Storytelling",
    url: 'https://homegrown.co.in/homegrown-creators/varun-nimbolkars-indian-experimental-fusion-ep-doubles-down-on-emotive-storytelling',
  },
  {
    number: '02',
    date: 'October 2025',
    publication: 'THE INDIAN MUSIC DIARIES',
    headline: "Varun Nimbolkar's 'Bah Bah Black Sheep' Sits Comfortably Between Indian Classical and Electronica",
    url: 'https://theindianmusicdiaries.com/varun-nimbolkars-bah-bah-black-sheep-sits-comfortably-between-indian-classical-and-electronica/',
  },
  {
    number: '03',
    date: 'January 2024',
    publication: 'THE INDIAN MUSIC DIARIES',
    headline: 'Varun Nimbolkar\'s "Dreams For A Living" EP Melds Classical Essence With Rock Resonance',
    url: 'https://theindianmusicdiaries.com/varun-nimbolkars-dreams-for-a-living-ep-melds-classical-essence-with-rock-resonance/',
  },
  {
    number: '04',
    date: 'February 2026',
    publication: 'HOMEGROWN MAGAZINE',
    headline: 'Art That Inspires: 7 Homegrown Musicians On The Books That Shaped Their Sound',
    url: 'https://homegrown.co.in/homegrown-creators/art-that-inspires-7-homegrown-musicians-on-the-books-that-shaped-their-sound',
  },
  {
    number: '05',
    date: 'June 2021',
    publication: 'THE INDIAN MUSIC DIARIES',
    headline: 'Singles Roundup #29: Diversify Your Playlist With These Latest Tracks',
    url: 'https://theindianmusicdiaries.com/singles-roundup-29-diversify-your-playlist-with-these-latest-tracks/',
  },
  {
    number: '06',
    date: 'Not specified',
    publication: 'THE INDIAN MUSIC DIARIES',
    headline: "Derek & The Cats' 'People to Meet, Places to See' is a Record Both You and Your Dad Can Dance To",
    url: 'https://theindianmusicdiaries.com/derek-the-cats-people-to-meet-places-to-see-is-a-record-both-you-and-your-dad-can-dance-to/',
  },
];

export function PressPage() {
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
              <span>06 FEATURES</span>
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

        {/* SECTION D — SIX PRESS ARTICLES */}
        <section id="press-articles" className="press-articles-section" aria-label="Press articles grid">
          <div className="press-articles-inner">
            <div className="press-grid">
              {PRESS_ARTICLES.map((article) => (
                <article key={article.number} className="press-card">
                  <div className="press-card-header">
                    <span className="press-card-number">{article.number}</span>
                    <span className="press-card-date">{article.date}</span>
                  </div>
                  <span className="press-card-pub">{article.publication}</span>
                  <h2 className="press-card-headline">{article.headline}</h2>
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
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION E — EXISTING CTA */}
        <ContactCTA light />
      </main>

      {/* SECTION F — EXISTING FOOTER */}
      <SiteFooter />
    </div>
  );
}

