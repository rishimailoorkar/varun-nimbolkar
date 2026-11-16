import { useEffect, useRef } from 'react';
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

interface TourHighlight {
  id: string;
  order: string;
  eventName: string;
  venue?: string;
  location: string;
  date?: string;
  description: string;
  image: string;
  imageAlt: string;
}

const TOUR_HIGHLIGHTS: TourHighlight[] = [
  {
    id: 'nehru-centre',
    order: '01',
    eventName: 'The Nehru Centre',
    venue: 'Cultural Wing of the High Commission of India',
    location: 'London, United Kingdom',
    date: 'May 2026',
    description:
      'A 90-minute headline solo performance exploring Indian classical ragas in dialogue with contemporary ambient looping, guitar pedals, and original electronica.',
    image: '/images/about/tours/01-nehru-centre.webp',
    imageAlt: 'Varun Nimbolkar performing solo headline sitar recital at The Nehru Centre London',
  },
  {
    id: 'happy-place',
    order: '02',
    eventName: 'Happy Place Festival',
    venue: 'Festival Main Stage',
    location: 'London, United Kingdom',
    date: '2026',
    description:
      'A vibrant open-air festival performance bringing expressive sitar textures and dynamic electronic grooves to diverse UK audiences.',
    image: '/images/about/tours/02-happy-place.webp',
    imageAlt: 'Varun Nimbolkar live performance with sitar at Happy Place Festival',
  },
  {
    id: 'mind-body-spirit',
    order: '03',
    eventName: 'Mind Body Spirit Festival',
    venue: 'Olympia London',
    location: 'London, United Kingdom',
    date: '2026',
    description:
      'An immersive solo set weaving transcendent classical ragas with lush ambient soundscapes, curated for deep listening and meditative movement.',
    image: '/images/about/tours/03-mind-body-spirit.webp',
    imageAlt: 'Varun Nimbolkar performing meditative sitar set at Mind Body Spirit Festival',
  },
  {
    id: 'world-yoga-festival',
    order: '04',
    eventName: 'World Yoga Festival',
    venue: 'Festival Stage',
    location: 'United Kingdom',
    date: '2026',
    description:
      'A contemplative live experience integrating deep classical discipline with harmonic ambient soundscapes against tranquil open festival grounds.',
    image: '/images/about/tours/04-world-yoga-festival.webp',
    imageAlt: 'Varun Nimbolkar performing sitar at World Yoga Festival UK',
  },
  {
    id: 'magnetic-music',
    order: '05',
    eventName: 'Magnetic Music at ZLB',
    venue: 'ZLB, The Leela Palace',
    location: 'Bengaluru, India',
    date: 'Season 04',
    description:
      'Featured on the curated series lineup alongside Indian Ocean and Rajasthani Roots, delivering an electric, intimate ensemble performance.',
    image: '/images/about/tours/05-magnetic-music.webp',
    imageAlt: 'Varun Nimbolkar ensemble live at Magnetic Music at ZLB, The Leela Palace Bengaluru',
  },
  {
    id: 'india-touring',
    order: '06',
    eventName: 'India Touring Highlights',
    venue: 'Concert Halls & Curated Listening Rooms',
    location: 'Bengaluru · Mumbai · Goa · Pune',
    description:
      'Extensive national touring across six cities, presenting both intimate Solo Sets with live looping and high-energy ensemble shows with The Sitara Devi Project.',
    image: '/images/about/tours/06-india-tour.webp',
    imageAlt: 'Audience and stage during Varun Nimbolkar live performance in India',
  },
];

export function AboutPage() {
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
              alt="Varun Nimbolkar performing sitar with live electronics with audience visible"
              className="about-hero-img"
              width={2400}
              height={1603}
              fetchPriority="high"
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
                width={1200}
                height={1500}
              />
            </div>

            <div className="about-bio-copy">
              <div>
                <h1 id="about-bio-heading" className="about-bio-title">
                  Biography
                </h1>

                <p className="about-bio-lead">
                  Varun Nimbolkar is a composer, producer, performing sitar player and vocalist. He brings Indian classical training into conversation with electronic music, ambient soundscapes, rock and contemporary grooves.
                </p>

                <h2 className="about-bio-subheading">Musical Journey</h2>

                <p className="about-bio-text">
                  His classical foundation includes more than a decade studying under Ustad Usman Khan, along with time with Pt. Vijay Koparkar and mentorship under Pt. Kushal Das. That background informs a practice that moves between acoustic and electric sitar, effects pedals, live looping and original production.
                </p>

                <p className="about-bio-text">
                  Across recordings and stages, Varun treats the sitar as a lead voice in evolving musical stories. His independent releases include <em>Bah Bah Black Sheep</em>, <em>Dreams for a Living</em> and <em>Watching Her Dance</em>, bridging classical heritage with a restless contemporary spirit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. LISTEN & CONNECT */}
        <section className="about-connect" id="listen-and-connect" aria-labelledby="about-connect-heading">
          <div className="about-connect-inner">
            <h2 id="about-connect-heading" className="about-connect-title">
              Listen &amp; Connect
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

        {/* 4. TOURS & STAGES — EDITORIAL ALTERNATING REDESIGN */}
        <section className="about-tours" id="tours" aria-labelledby="about-tours-heading">
          <div className="about-tours-inner">
            <div className="about-tours-header">
              <h2 id="about-tours-heading" className="about-tours-title">
                Tours &amp; Stages
              </h2>
              <p className="about-tours-desc">
                Varun combines acoustic and electric sitar with live electronic production, looping, and ambient
                grooves for immersive live concert experiences across the UK and India.
              </p>
            </div>

            <div className="about-tours-list">
              {TOUR_HIGHLIGHTS.map((item, idx) => {
                const isReversed = idx % 2 === 1;
                return (
                  <article
                    key={item.id}
                    className={`about-tour-item ${isReversed ? 'about-tour-item--reversed' : ''}`}
                    aria-labelledby={`tour-heading-${item.id}`}
                  >
                    <div className="about-tour-media">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        width={1200}
                        height={800}
                        loading="lazy"
                      />
                    </div>
                    <div className="about-tour-content">
                      <div className="about-tour-meta-row">
                        <span className="about-tour-num">{item.order}</span>
                        {item.date && <span className="about-tour-date">{item.date}</span>}
                      </div>
                      <h3 id={`tour-heading-${item.id}`} className="about-tour-item-title">
                        {item.eventName}
                      </h3>
                      {item.venue && <p className="about-tour-venue">{item.venue}</p>}
                      <p className="about-tour-location">{item.location}</p>
                      <p className="about-tour-item-desc">{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. CONTACT CTA */}
        <ContactCTA light hideSocials />
      </main>

      {/* 6. SITE FOOTER */}
      <SiteFooter />
    </div>
  );
}
