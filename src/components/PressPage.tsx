import { useEffect, useState } from 'react';
import { ArrowUpRight } from './Icons';
import { Navbar } from './Navbar';
import { ContactCTA } from './ContactCTA';
import { SiteFooter } from './SiteFooter';
import { PressModal, type PressModalData } from './PressModal';
import '../press.css';

export interface PressArticle {
  number: string;
  date: string;
  publication: string;
  headline: string;
  url?: string;
  author?: string;
  content?: string;
  image?: string;
  clippingImage?: string;
}

const PRESS_ARTICLES: PressArticle[] = [
  {
    number: '01',
    date: 'October 2025',
    publication: 'Homegrown Magazine',
    headline: "Varun Nimbolkar's Indian Experimental Fusion EP Doubles Down On Emotive Storytelling",
    image: '/images/press%20kit/Screenshot%202026-11-27%20234948.webp',
    url: 'https://homegrown.co.in/homegrown-creators/varun-nimbolkars-indian-experimental-fusion-ep-doubles-down-on-emotive-storytelling',
  },
  {
    number: '02',
    date: 'October 2025',
    publication: 'The Indian Music Diaries',
    headline: "Varun Nimbolkar's 'Bah Bah Black Sheep' Sits Comfortably Between Indian Classical and Electronica",
    image: '/images/press%20kit/Screenshot%202026-11-27%20235023.webp',
    url: 'https://theindianmusicdiaries.com/varun-nimbolkars-bah-bah-black-sheep-sits-comfortably-between-indian-classical-and-electronica/',
  },
  {
    number: '03',
    date: 'January 2024',
    publication: 'The Indian Music Diaries',
    headline: 'Varun Nimbolkar\'s "Dreams For A Living" EP Melds Classical Essence With Rock Resonance',
    image: '/images/press%20kit/dreams-for-a-living.webp',
    url: 'https://theindianmusicdiaries.com/',
  },
  {
    number: '04',
    date: 'February 2026',
    publication: 'Homegrown Magazine',
    headline: 'Art That Inspires: 7 Homegrown Musicians On The Books That Shaped Their Sound',
    image: '/images/press%20kit/Screenshot%202026-11-27%20235120.webp',
    url: 'https://homegrown.co.in/homegrown-creators/art-that-inspires-7-homegrown-musicians-on-the-books-that-shaped-their-sound',
  },
  {
    number: '05',
    date: 'June 2021',
    publication: 'The Indian Music Diaries',
    headline: 'Singles Roundup #29: Diversify Your Playlist With These Latest Tracks',
    image: '/images/press%20kit/singles-roundup.webp',
    url: 'https://theindianmusicdiaries.com/',
  },
  {
    number: '06',
    date: 'Not specified in the supplied PDF',
    publication: 'The Indian Music Diaries',
    headline: "Derek & The Cats' 'People to Meet, Places to See' is a Record Both You and Your Dad Can Dance To",
    image: '/images/press%20kit/Screenshot%202026-11-27%20235139.webp',
    url: 'https://theindianmusicdiaries.com/derek-the-cats-people-to-meet-places-to-see-is-a-record-both-you-and-your-dad-can-dance-to/',
  },
  {
    number: '07',
    date: 'September 2026',
    publication: 'Mid-Day',
    headline: 'Witness this immersive fusion performance in Bandra this week with a sitar',
    image: '/images/press%20kit/Screenshot%202026-11-27%20234929.webp',
    url: 'https://www.mid-day.com/mumbai-guide/things-to-do/article/witness-this-immersive-fusion-performance-by-varun-nimbolkar-in-bandra-this-week-with-a-sitar-23650986',
  },
  {
    number: '08',
    date: '26 July 2025',
    publication: 'The Navhind Times — Zest',
    headline: 'Strings and Stories',
    author: 'Adithi Sharma',
    content: 'Feature about the Varun Nimbolkar Collective and its debut performance in Goa.',
    image: '/images/press%20kit/Screenshot%202026-11-27%20235046.webp',
    clippingImage: '/images/press kit/strings-and-stories.webp',
  },
  {
    number: '09',
    date: '21 September 2026',
    publication: 'Mid-Day — The Guide',
    headline: 'String Theory',
    author: 'Devashish Kamble',
    content: 'Feature about Varun Nimbolkar and his fusion music, combining sitar with genres such as Hip-Hop, Afro and Rock.',
    image: '/images/press%20kit/Screenshot%202026-11-27%20235107.webp',
    clippingImage: '/images/press kit/string-theory.webp',
  },
];

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
                    {article.image && (
                      <div className="press-card-thumb-wrap">
                        <img
                          src={article.image}
                          alt={article.headline}
                          className="press-card-thumb"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="press-card-info">
                      <span className="press-card-pub">{article.publication}</span>
                      <span className="press-card-date">{article.date}</span>
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
