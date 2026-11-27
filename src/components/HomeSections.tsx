import { useEffect, useRef, useState, type RefObject } from 'react';
import { ArrowUpRight, Play } from './Icons';
import { InstagramJourneySection } from './InstagramJourneySection';
import { PressModal, type PressModalData } from './PressModal';

const releases = [
  {
    title: 'Meera',
    detail: '2026 · Single',
    image: '/images/discovery%20section/meera.webp',
    href: 'https://open.spotify.com/track/7lDrYmlCO2YzFSLLzlmyRv?autoplay_ok=1',
  },
  {
    title: 'Amrita 2.0',
    detail: '2025 · EP – Bah Bah Black Sheep',
    image: '/images/discovery%20section/amritha%202.0.webp',
    href: 'https://open.spotify.com/track/73A1OKz2pcuu7FlPMpglpB?autoplay_ok=1',
  },
  {
    title: "Queen's Bath",
    detail: '2025 · EP – Bah Bah Black Sheep',
    image: '/images/discovery%20section/queens%20bath.webp',
    href: 'https://open.spotify.com/track/4evm9RtGfq6V8kGJEB4qU5?autoplay_ok=1',
  },
  {
    title: '!Okay',
    detail: '2025 · EP – Bah Bah Black Sheep',
    image: '/images/discovery%20section/!Okay.webp',
    href: 'https://open.spotify.com/track/0Gz7XEiXXFldwytS3MQh7Z?autoplay_ok=1',
  },
  {
    title: 'Amrita',
    detail: '2025 · Single / EP track – Bah Bah Black Sheep',
    image: '/images/discovery%20section/amrita.webp',
    href: 'https://open.spotify.com/track/4rtUWUAqAWLh0jJIdAPRDl?autoplay_ok=1',
  },
  {
    title: 'Rosemary, For Remembrance',
    detail: '2023 · Single',
    image: '/images/discovery%20section/rosemary.webp',
    href: 'https://open.spotify.com/track/6djK9hRBbatFZ4EaiVMTB5?autoplay_ok=1',
  },
  {
    title: 'Remnants',
    detail: '2023 · Single – Dreams For A Living',
    image: '/images/discovery%20section/remnanrts.webp',
    href: 'https://open.spotify.com/track/1T697gcRlo6nVYzKj6ryNL?autoplay_ok=1',
  },
  {
    title: 'Rishikesh (Child of the Ganges)',
    detail: '2022 · Single',
    image: '/images/discovery%20section/rishikesh.webp',
    href: 'https://open.spotify.com/track/1iIMMjVR4YMSoLkXwI4qLR?autoplay_ok=1',
  },
  {
    title: 'Watching Her Dance',
    detail: '2021 · Single',
    image: '/images/discovery%20section/Watching%20her%20dance.webp',
    href: 'https://open.spotify.com/track/6SGGfkRmvRVJzdOimZFEa6?autoplay_ok=1',
  },
  {
    title: 'The Unposted Letter',
    detail: '2021 · Single',
    image: '/images/discovery%20section/the%20unposted%20letter.webp',
    href: 'https://open.spotify.com/track/1xuLfcXNcA3J2qLZGFQ3kB?autoplay_ok=1',
  },
];

function useScrollMotion(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const scene = host.querySelector<HTMLElement>('.home-interlude');
    let frame = 0;
    const update = () => {
      frame = 0;
      if (media.matches) return;
      if (scene) {
        const bounds = scene.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (innerHeight - bounds.top) / (innerHeight + bounds.height)));
        scene.style.setProperty('--image-shift', `${((0.5 - progress) * bounds.height * 0.28).toFixed(1)}px`);
      }

    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const setup = () => {
      if (media.matches) {
        scene?.style.removeProperty('--image-shift');
      }
      else schedule();
    };
    const change = () => { cancelAnimationFrame(frame); frame = 0; setup(); };
    setup();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    media.addEventListener('change', change);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); media.removeEventListener('change', change); };
  }, [root]);
}

export function HomeSections() {
  const root = useRef<HTMLDivElement>(null);
  useScrollMotion(root);
  const [modalClipping, setModalClipping] = useState<PressModalData | null>(null);

  const homePressItems = [
    {
      number: '01',
      date: 'September 2026',
      source: 'MID-DAY',
      title: 'Witness this immersive fusion performance in Bandra this week with a sitar',
      url: 'https://www.mid-day.com/mumbai-guide/things-to-do/article/witness-this-immersive-fusion-performance-by-varun-nimbolkar-in-bandra-this-week-with-a-sitar-23650986',
    },
    {
      number: '02',
      date: 'October 2025',
      source: 'HOMEGROWN MAGAZINE',
      title: 'Varun Nimbolkar’s Indian Experimental Fusion EP Doubles Down On Emotive Storytelling',
      url: 'https://homegrown.co.in/homegrown-creators/varun-nimbolkars-indian-experimental-fusion-ep-doubles-down-on-emotive-storytelling',
    },
    {
      number: '03',
      date: '21 September 2026',
      source: 'MID-DAY — THE GUIDE',
      title: 'String Theory',
      author: 'Devashish Kamble',
      content: 'Feature about Varun Nimbolkar and his fusion music, combining sitar with genres such as Hip-Hop, Afro and Rock.',
      clippingImage: '/images/press kit/string-theory.webp',
    },
  ];
  return <div className="home-sections" ref={root}>
    <section className="home-about" id="about" aria-labelledby="home-about-title">
      <div className="home-about-inner">
        <div className="home-about-image-wrap" data-parallax="0.07"><img src="/images/home/about-varun.png" width="347" height="520" loading="lazy" alt="Varun Nimbolkar playing sitar in front of colourful artwork" /></div>
        <div className="home-about-copy">
          <span className="home-kicker" data-parallax="0.04">MEET VARUN NIMBOLKAR</span>
          <h2 id="home-about-title" data-parallax="0.06">Classical roots.<br/><em>An Evolving Sound.</em></h2>
          <p data-parallax="0.035">A composer, producer, sitar player and vocalist. Varun brings Indian classical roots into conversation with contemporary genres, electronic production and experimental sound.</p>
          <a
            className="home-about-button"
            href="/about"
            onClick={(e) => {
              e.preventDefault();
              history.pushState(null, '', '/about');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            data-parallax="0.035"
          >
            About us <ArrowUpRight width={20} height={20} aria-hidden="true" />
          </a>
          <div className="home-about-meta" data-parallax="0.025"><span>COMPOSER · PRODUCER · SITAR PLAYER</span></div>
        </div>
      </div>
    </section>

    <section className="home-recognition" id="recognition" aria-labelledby="recognition-title">
      <div className="home-wide-inner">
        <span className="home-kicker home-kicker--dark" data-parallax="0.04">RECOGNITION</span>
        <h2 id="recognition-title" data-parallax="0.055">Milestones Along the Way</h2>
        <div className="home-stats">
          <div data-parallax="0.04"><strong>400K+</strong><p>All-time streams across major digital platforms.</p></div>
          <div data-parallax="0.05"><strong>16K+</strong><p>Peak monthly listeners across Spotify and streaming networks.</p></div>
          <div data-parallax="0.06"><strong>1.3K+</strong><p>Dedicated followers across his independent music catalogue.</p></div>
          <div data-parallax="0.07"><strong>12 MONTHS</strong><p>Nationwide in-store rotation of the single Watching Her Dance through FabIndia.</p></div>
        </div>
      </div>
    </section>

    <section className="home-discography" id="music" aria-labelledby="discography-title">
      <div className="home-wide-inner">
        <div className="home-discography-intro">
          <span className="home-kicker home-kicker--plain" data-parallax="0.035">DISCOGRAPHY</span>
          <h2 id="discography-title" data-parallax="0.055">For The<br/><em>Curious Ones</em></h2>
          <p data-parallax="0.035">Records that wander between sitar-driven melody, electronic atmospheres, blues and everything in between.</p>
          <a className="home-music-button" href="/music" data-parallax="0.025">EXPLORE MUSIC <Play width={20} height={20} aria-hidden="true" /></a>
        </div>
        <div className="home-albums">{releases.map(release => <article className="home-album" key={release.title} data-parallax="0.04">
          <img src={release.image} width="408" height="406" loading="lazy" alt={`${release.title} cover artwork`} />
          <div className="home-album-caption"><div><h3>{release.title}</h3><p>{release.detail}</p></div><a href={release.href} target="_blank" rel="noopener noreferrer" aria-label={`Find ${release.title} on Spotify`}><Play width={17} height={17} aria-hidden="true" /></a></div>
        </article>)}</div>
      </div>
    </section>


    <section className="home-press" id="press" aria-labelledby="press-title">
      <div className="home-wide-inner">
        <div className="press-heading"><div><span className="home-kicker">MEDIA COVERAGE</span><h2 id="press-title">In The Press</h2></div><a className="press-view" href="/press">View All <ArrowUpRight width={20} height={20} aria-hidden="true"/></a></div>
        <div className="press-grid">
          {homePressItems.map((item) => {
            const hasClipping = Boolean(item.clippingImage);
            const openClipping = () => {
              if (item.clippingImage) {
                setModalClipping({
                  image: item.clippingImage,
                  title: item.title,
                  publication: item.source,
                  date: item.date,
                  author: item.author,
                  content: item.content,
                });
              }
            };

            return (
              <article className="press-item" key={item.number}>
                <div className="press-meta">
                  <span>{item.number}</span>
                  <span>{item.date}</span>
                </div>
                <p className="press-source">{item.source}</p>
                <h3>{item.title}</h3>

                {hasClipping ? (
                  <button
                    type="button"
                    className="press-item-btn"
                    onClick={openClipping}
                    aria-label={`View full newspaper clipping: ${item.title}`}
                  >
                    <span>READ MORE</span>
                    <ArrowUpRight width={15} height={15} aria-hidden="true" />
                  </button>
                ) : (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    READ MORE <ArrowUpRight width={15} height={15} aria-hidden="true" />
                    <span className="visually-hidden">: {item.title} (opens in a new tab)</span>
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>

    <InstagramJourneySection />

    {/* Lightbox Modal for Newspaper Clippings */}
    <PressModal
      data={modalClipping}
      onClose={() => setModalClipping(null)}
    />

  </div>;
}
