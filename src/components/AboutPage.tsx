import { useEffect, useRef, useState } from 'react';
import { Navbar } from './Navbar';
import { ContactCTA } from './ContactCTA';
import { SiteFooter } from './SiteFooter';
import '../about.css';

const SOCIALS = [
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/artist/3dmI9UkzIOZZeHcdLJfXZs',
    icon: '/images/spotify.svg',
  },
  {
    name: 'Apple Music',
    href: 'https://music.apple.com/in/artist/varun-nimbolkar/1566186954',
    icon: '/images/apple-music.svg',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@varunnimbolkar',
    icon: '/images/youtube.svg',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/varun_nimbolkar/',
    icon: '/images/instagram.svg',
  },
];

type TourTab = 'formats' | 'uk' | 'india' | 'featured';

export function AboutPage() {
  const [activeTab, setActiveTab] = useState<TourTab>('formats');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'About — Varun Nimbolkar';
    window.scrollTo(0, 0);
  }, []);

  // Parallax animation for the Hero stage photo
  useEffect(() => {
    const stage = heroRef.current;
    if (!stage) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = stage.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)));
      const shift = (progress - 0.5) * 80;
      stage.style.setProperty('--hero-shift', `${shift.toFixed(1)}px`);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const handleTabClick = (tab: TourTab, sectionId: string) => {
    setActiveTab(tab);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div className="about-page">
      <a className="skip-link" href="#biography">
        Skip to biography
      </a>

      {/* 1. NAVBAR */}
      <Navbar />

      <main id="top">
        {/* 2. HERO WITH PHOTO AND PARALLAX ANIMATION */}
        <section className="about-hero" aria-label="Varun Nimbolkar performing live on stage">
          <div className="about-hero-stage" ref={heroRef}>
            <img
              src="/images/about/hero-stage.webp"
              alt="Varun Nimbolkar performing sitar with live electronics in front of an audience"
              className="about-hero-img"
              width={1920}
              height={1080}
            />
          </div>
        </section>

        {/* 2B. BIOGRAPHY SECTION */}
        <section className="about-bio" id="biography" aria-labelledby="about-bio-heading">
          <div className="about-bio-inner">
            <div className="about-bio-media">
              <img
                src="/images/about/bio-varun.webp"
                alt="Varun Nimbolkar playing sitar indoors"
                className="about-bio-photo"
                width={700}
                height={800}
              />
            </div>

            <div className="about-bio-copy">
              <h1 id="about-bio-heading" className="about-bio-title">
                BIOGRAPHY
              </h1>

              <p className="about-bio-lead">
                Varun Nimbolkar, a sitarist whose music merges traditional Indian classical instruments with
                electronic beats and ambient sounds, invites listeners into an auditory journey spanning diverse
                genres and cross-disciplinary collaborations that define contemporary Indian experimental music
                across global landscapes.
              </p>

              <h2 className="about-bio-subheading">Musical Journey</h2>

              <p className="about-bio-text">
                Born in May 1990 and based in Pune, India, Varun is a pioneering composer, producer, sitar player,
                and vocalist. Trained under legendary masters—including over a decade under Ustad Usman Khan, time
                with Pt. Vijay Koparkar, and mentorship under Pt. Kushal Das—Varun bridges deep-rooted Indian
                classical traditions with contemporary global genres.
              </p>
            </div>
          </div>
        </section>

        {/* 3. LISTEN & CONNECT */}
        <section className="about-connect" id="listen-and-connect" aria-labelledby="about-connect-heading">
          <div className="about-connect-inner">
            <h2 id="about-connect-heading" className="about-connect-title">
              LISTEN &amp; CONNECT
            </h2>
            <p className="about-connect-subtitle">
              Explore Varun's music and follow his journey.
            </p>

            <nav className="about-connect-socials" aria-label="Social and streaming platforms">
              {SOCIALS.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-connect-link"
                  aria-label={`${soc.name} (opens in a new tab)`}
                >
                  <img src={soc.icon} alt="" width={38} height={38} />
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* 4. TOURS & STAGES */}
        <section className="about-tours" id="tours" aria-labelledby="about-tours-heading">
          <div className="about-tours-inner">
            <div className="about-tours-header">
              <h2 id="about-tours-heading" className="about-tours-title">
                TOURS &amp; STAGES
              </h2>
              <p className="about-tours-desc">
                Varun combines acoustic and electric sitar with live electronic production, looping, and ambient
                grooves for immersive live experiences.
              </p>
            </div>

            {/* Banner stage photo */}
            <div className="about-tours-banner-wrap">
              <img
                src="/images/about/tour-banner.webp"
                alt="Varun Nimbolkar Band live with illuminated monkey neon backdrop"
                className="about-tours-banner"
                width={1140}
                height={440}
                loading="lazy"
              />
            </div>

            {/* Navigation Tabs Bar */}
            <div className="about-tours-nav" role="tablist" aria-label="Tour formats and highlights">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'formats'}
                className={`about-tour-tab ${activeTab === 'formats' ? 'active' : ''}`}
                onClick={() => handleTabClick('formats', 'tour-formats-section')}
              >
                Live Formats
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'uk'}
                className={`about-tour-tab ${activeTab === 'uk' ? 'active' : ''}`}
                onClick={() => handleTabClick('uk', 'tour-uk-section')}
              >
                UK Tour
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'india'}
                className={`about-tour-tab ${activeTab === 'india' ? 'active' : ''}`}
                onClick={() => handleTabClick('india', 'tour-india-section')}
              >
                India Tour
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'featured'}
                className={`about-tour-tab ${activeTab === 'featured' ? 'active' : ''}`}
                onClick={() => handleTabClick('featured', 'tour-featured-section')}
              >
                Featured Show
              </button>
            </div>

            {/* Formats Grid: Solo Sets & The Sitara Devi Project */}
            <div className="about-formats-grid" id="tour-formats-section">
              <article className="about-format-card">
                <div className="about-format-thumb">
                  <img
                    src="/images/about/solo-sets.webp"
                    alt="Varun Nimbolkar performing solo set with electric sitar"
                    width={540}
                    height={360}
                    loading="lazy"
                  />
                </div>
                <span className="about-format-num">01 —</span>
                <h3 className="about-format-title">SOLO SETS</h3>
                <p className="about-format-desc">
                  Intimate ethnic electronica, ambient soundscapes, and live looping.
                </p>
              </article>

              <article className="about-format-card">
                <div className="about-format-thumb">
                  <img
                    src="/images/about/sitara-devi.webp"
                    alt="The Sitara Devi Project live ensemble performance"
                    width={540}
                    height={360}
                    loading="lazy"
                  />
                </div>
                <span className="about-format-num">02 —</span>
                <h3 className="about-format-title">THE SITARA DEVI PROJECT</h3>
                <p className="about-format-desc">
                  High-energy ensemble performances by The Sitara Devi &amp; her Bois.
                </p>
              </article>
            </div>

            {/* Tour Highlights Summary Boxes */}
            <div className="about-tour-boxes" id="tour-india-section">
              <div className="about-tour-summary-card">
                <span className="about-tour-summary-kicker">UK TOUR — 2026</span>
                <span className="about-tour-summary-val">MANCHESTER · LONDON</span>
              </div>
              <div className="about-tour-summary-card">
                <span className="about-tour-summary-kicker">INDIA TOUR — 6 CITIES</span>
                <span className="about-tour-summary-val">NATIONAL RUN</span>
              </div>
            </div>

            {/* UK Tour Details Box */}
            <div className="about-tour-detail-card" id="tour-uk-section">
              <h3 className="about-tour-detail-title">UK TOUR 2026</h3>
              <div className="about-tour-detail-sections">
                <div className="about-tour-subblock">
                  <span className="about-tour-subkicker">THE NEHRU CENTRE</span>
                  <p className="about-tour-subtext">
                    90-minute headline solo performance at the cultural wing of the High Commission of India in London.
                  </p>
                </div>
                <div className="about-tour-subblock">
                  <span className="about-tour-subkicker">MAIN STAGES</span>
                  <ul className="about-tour-fest-list">
                    <li>Mind Body Spirit Festival 2026</li>
                    <li>Happy Place Festival 2026</li>
                    <li>World Yoga Festival 2026</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Featured Show: Magnetic Music at ZLB */}
            <div className="about-featured-show" id="tour-featured-section">
              <div className="about-featured-info">
                <div>
                  <h3 className="about-featured-title">MAGNETIC MUSIC AT ZLB</h3>
                  <p className="about-featured-venue">The Leela Palace, Bengaluru</p>
                </div>
                <div>
                  <p className="about-featured-desc">
                    Featured on the lineup alongside Indian Ocean and Rajasthani Roots as part of the prestigious
                    Magnetic Music series.
                  </p>
                </div>
              </div>

              <div className="about-featured-photo-wrap">
                <img
                  src="/images/about/magnetic-music.webp"
                  alt="Band performing live on stage at Magnetic Music, Leela Palace Bengaluru"
                  className="about-featured-photo"
                  width={1140}
                  height={480}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. CONTACT CTA */}
        <ContactCTA light />
      </main>

      {/* 6. SITE FOOTER */}
      <SiteFooter />
    </div>
  );
}

