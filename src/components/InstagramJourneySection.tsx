import { ArrowUpRight } from './Icons';

interface InstagramSliderProps {
  instagramUrl?: string;
}

const INSTA_IMAGES = [
  {
    src: '/images/images%20instaa/Screenshot%202026-11-02%20175147.png',
    alt: 'Varun Nimbolkar - Vibes Meet Sitar Sarangi',
  },
  {
    src: '/images/images%20instaa/Screenshot%202026-11-02%20175225.png',
    alt: 'Varun Nimbolkar playing sitar outdoors',
  },
  {
    src: '/images/images%20instaa/Screenshot%202026-11-02%20175234.png',
    alt: 'Varun Nimbolkar - Amrita Live version',
  },
  {
    src: '/images/images%20instaa/Screenshot%202026-11-02%20175308.png',
    alt: 'Varun Nimbolkar Band - Magnetic Music Season 04',
  },
  {
    src: '/images/images%20instaa/Screenshot%202026-11-02%20175334.png',
    alt: 'Varun Nimbolkar live performance with sitar under stage lighting',
  },
  {
    src: '/images/images%20instaa/Screenshot%202026-11-02%20180916.png',
    alt: 'Varun Nimbolkar with Junaid Ahmed',
  },
];

export function InstagramJourneySection({
  instagramUrl = 'https://www.instagram.com/varun_nimbolkar/',
}: InstagramSliderProps) {
  // Duplicate for smooth seamless infinite looping
  const loopedImages = [...INSTA_IMAGES, ...INSTA_IMAGES, ...INSTA_IMAGES];

  return (
    <section className="home-journey-section" aria-labelledby="home-journey-title">
      <div className="home-journey-header">
        <span className="home-journey-kicker">LET'S STAY CONNECTED</span>
        <h2 id="home-journey-title" className="home-journey-title">
          Follow Me<br />
          <em className="home-journey-gradient">On My Journey</em>
        </h2>
      </div>

      <div className="home-journey-slider-wrapper" aria-label="Instagram photo carousel">
        <div className="home-journey-slider-track">
          {loopedImages.map((img, idx) => (
            <div key={idx} className="home-journey-card">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={360}
                height={550}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="home-journey-action">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="home-journey-btn"
          aria-label="Follow Varun Nimbolkar on Instagram (opens in a new tab)"
        >
          <span>FOLLOW ME</span>
          <ArrowUpRight width={18} height={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
