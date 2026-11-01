import { useEffect, useRef, type RefObject } from 'react';
import { ArrowUpRight, Play } from './Icons';

const releases = [
  { title: 'Watching her Dance', detail: 'Single / Featured in Rolling Stone India', image: '/images/home/watching-her-dance.png', href: 'https://open.spotify.com/track/6SGGfkRmvRVJzdOimZFEa6' },
  { title: 'RishiKesh (Child of the Ganges)', detail: 'EP / 2022', image: '/images/home/rishikesh.png', href: 'https://open.spotify.com/search/RishiKesh%20Child%20of%20the%20Ganges%20Varun%20Nimbolkar' },
  { title: 'The Unposted Letter', detail: 'EP / In collaboration with Saee Tembhekar', image: '/images/home/unposted-letter.png', href: 'https://open.spotify.com/search/The%20Unposted%20Letter%20Varun%20Nimbolkar' },
];

function useScrollMotion(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const elements = Array.from(host.querySelectorAll<HTMLElement>('[data-parallax]'));
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
      const center = innerHeight / 2;
      for (const element of elements) {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > innerHeight + 120) continue;
        const speed = Number(element.dataset.parallax) || 0;
        const limit = Number(element.dataset.parallaxLimit) || 36;
        const offset = Math.max(-limit, Math.min(limit, -(rect.top + rect.height / 2 - center) * speed));
        element.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
        if (element.matches('h2')) {
          const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (innerHeight * .75)));
          element.style.setProperty('--type-progress', String(progress));
        }
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const setup = () => {
      if (media.matches) {
        elements.forEach(element => element.style.removeProperty('--parallax-y'));
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
  return <div className="home-sections" ref={root}>
    <section className="home-about" id="about" aria-labelledby="home-about-title">
      <div className="home-about-inner">
        <div className="home-about-image-wrap" data-parallax="0.07"><img src="/images/home/about-varun.png" width="347" height="520" loading="lazy" alt="Varun Nimbolkar playing sitar in front of colourful artwork" /></div>
        <div className="home-about-copy">
          <span className="home-kicker" data-parallax="0.04">MEET VARUN NIMBOLKAR</span>
          <h2 id="home-about-title" data-parallax="0.06">Classical roots.<br/><em>An Evolving Sound.</em></h2>
          <p data-parallax="0.035">A composer, producer, sitar player and vocalist from Pune, India. Varun brings Indian classical roots into conversation with contemporary genres, electronic production and experimental sound.</p>
          <a className="home-about-button" href="#recognition" data-parallax="0.035">About us <ArrowUpRight width={20} height={20} aria-hidden="true" /></a>
          <div className="home-about-meta" data-parallax="0.025"><span>SITAR · VOICE · EXPLORATION</span><span>Pune, India</span></div>
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

    <section className="home-gallery-placeholder" id="gallery" aria-labelledby="gallery-title">
      <div className="temporary-gallery">
        <span className="home-kicker home-kicker--plain">A COLLECTION IN THE MAKING</span>
        <h2 id="gallery-title" data-parallax="0.055">Selected Art Work</h2>
        <p>Live moments, collaborations and visual stories. Coming soon.</p>
        <div className="selected-work-placeholder" aria-label="Selected artwork placeholder"><span>01 — SELECTED WORK</span><span>New stories<br/><em>taking shape.</em></span><span>COLLECTION COMING SOON</span></div>
      </div>
    </section>

    <section className="home-interlude" id="live" aria-label="Varun Nimbolkar performing live">
      <div className="home-interlude-stage">
        <img src="/images/home/performance-parallax.png" width="1440" height="961" loading="lazy" alt="Varun Nimbolkar and a fellow musician performing on stage" />
        <div className="home-interlude-caption"><span>SITARIST / COMPOSER / PRODUCER</span><span>CLASSICAL ROOTS. ELECTRIC SOUL.</span></div>
      </div>
    </section>

    <section className="home-discography" id="music" aria-labelledby="discography-title">
      <div className="home-wide-inner">
        <div className="home-discography-intro">
          <span className="home-kicker home-kicker--plain" data-parallax="0.035">DISCOGRAPHY</span>
          <h2 id="discography-title" data-parallax="0.055">For The<br/><em>Curious One's</em></h2>
          <p data-parallax="0.035">Records that wander between sitar-driven melody, electronic atmospheres, blues and everything in between.</p>
          <a className="home-music-button" href="/music" data-parallax="0.025">EXPLORE MUSIC <Play width={20} height={20} aria-hidden="true" /></a>
        </div>
        <div className="home-albums">{releases.map(release => <article className="home-album" key={release.title} data-parallax="0.04">
          <img src={release.image} width="408" height="406" loading="lazy" alt={`${release.title} cover artwork`} />
          <div className="home-album-caption"><div><h3>{release.title}</h3><p>{release.detail}</p></div><a href={release.href} target="_blank" rel="noopener noreferrer" aria-label={`Find ${release.title} on Spotify`}><Play width={17} height={17} aria-hidden="true" /></a></div>
        </article>)}</div>
      </div>
    </section>

    <section className="home-press-placeholder" id="press" aria-labelledby="press-title"><div className="temporary-press"><span className="home-kicker home-kicker--plain" data-parallax="0.03">PRESS &amp; MEDIA</span><h2 id="press-title" data-parallax="0.055">In the press.</h2><p data-parallax="0.04">Explore the stories and sounds behind Varun’s music.</p><div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap',marginTop:'35px'}}><a href="/press" data-parallax="0.03" style={{display:'inline-flex',alignItems:'center',gap:'12px',padding:'15px 25px',background:'#fff',color:'#111',borderRadius:'40px',fontSize:'12px',letterSpacing:'.1em',textDecoration:'none',fontWeight:500}}>VIEW PRESS COVERAGE <ArrowUpRight width={19} height={19} aria-hidden="true"/></a><a href="/varun-nimbolkar-epk.pdf" download data-parallax="0.03" style={{marginTop:0}}>DOWNLOAD PRESS KIT <ArrowUpRight width={19} height={19} aria-hidden="true"/></a></div></div></section>
  </div>;
}
