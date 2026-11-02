import { ArrowUpRight } from './Icons';

interface InstagramSliderProps {
  instagramUrl?: string;
}

interface InstaImage {
  src: string;
  alt: string;
  url: string;
}

const INSTA_IMAGES: InstaImage[] = [
  {
    src: '/images/images%20instaa/Screenshot%202026-11-02%20175147.png',
    alt: 'Varun Nimbolkar - Afro House Vibes Meet Sitar & Sarangi',
    url: 'https://www.instagram.com/reel/DeUoOb2IBz2/?utm_source=ig_web_copy_link&exln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
  },
  {
    src: '/images/images%20instaa/Screenshot%202026-11-02%20175225.png',
    alt: 'Varun Nimbolkar playing sitar outdoors',
    url: 'https://www.instagram.com/reel/DSY7wViDA6I/?utm_source=ig_web_copy_link&dlrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
  },
  {
    src: '/images/images%20instaa/Screenshot%202026-11-02%20175234.png',
    alt: 'Varun Nimbolkar - Amrita Live version',
    url: 'https://www.instagram.com/reel/DQULcutiLNX/?utm_source=ig_web_copy_link&exln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
  },
  {
    src: '/images/images%20instaa/Screenshot%202026-11-02%20175308.png',
    alt: 'Varun Nimbolkar Band - Magnetic Music Season 04',
    url: 'https://www.instagram.com/reel/DMk5LJ3tqgF/?utm_source=ig_web_copy_link&srtk=MzRlODBiNWFlZA==',
  },
  {
    src: '/images/images%20instaa/Screenshot%202026-11-02%20175334.png',
    alt: 'Varun Nimbolkar live performance with sitar under stage lighting',
    url: 'https://www.instagram.com/reel/DC0qjMroQP4/?utm_source=ig_web_copy_link&dlrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
  },
  {
    src: '/images/images%20instaa/Screenshot%202026-11-02%20180916.png',
    alt: 'Varun Nimbolkar - The Trial Room with Junaid Ahmed',
    url: 'https://www.instagram.com/reel/DDjR75ssSSz/?utm_source=ig_web_copy_link&obrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
  },
];

export function InstagramJourneySection({
  instagramUrl = 'https://www.instagram.com/varun_nimbolkar/',
}: InstagramSliderProps) {
  // Duplicate 3 times for seamless infinite looping
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

      <div className="home-journey-slider-wrapper" aria-label="Instagram reels and posts carousel">
        <div className="home-journey-slider-track">
          {loopedImages.map((img, idx) => (
            <a
              key={idx}
              href={img.url}
              target="_blank"
              rel="noopener noreferrer"
              className="home-journey-card"
              aria-label={`View "${img.alt}" on Instagram (opens in a new tab)`}
              title={`Watch on Instagram: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={360}
                height={550}
              />
            </a>
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
