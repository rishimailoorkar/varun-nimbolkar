import { useEffect, useRef, useState } from 'react';
import { NoisyTrailCanvas } from './NoisyTrailCanvas';
import { HeroAudio } from './HeroAudio';
import { ArrowDown, Play } from './Icons';

import { PRESS_ARTICLES } from '../data/press';

const featuredArticles = ['03', '02', '06'].map(number =>
  PRESS_ARTICLES.find(article => article.number === number)!
);

function FeaturedPress() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (hovered || focused) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(index => (index + 1) % featuredArticles.length);
    }, 9000);
    return () => window.clearInterval(timer);
  }, [hovered, focused]);

  return <aside className="hero-feature" aria-label="Featured press"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
    <div className="hero-headlines">{featuredArticles.map((article, index) =>
      <div key={article.number} className="hero-headline" aria-hidden={index !== active}>
        <strong>{article.publication}</strong><p>{article.headline}</p>
      </div>
    )}</div>
    <a href={featuredArticles[active].url} target="_blank" rel="noopener noreferrer"
      aria-label={`Read more: ${featuredArticles[active].headline}`}>Read more</a>
  </aside>;
}

export function HeroContent() {
  return <div className="hero-content"><a className="music-button" href="/music">EXPLORE MUSIC <Play width={20} height={20} aria-hidden="true"/></a></div>;
}
export function ScrollIndicator() {
  return <a className="scroll-indicator" href="#about">SCROLL TO EXPLORE<ArrowDown width={20} height={34} aria-hidden="true"/></a>;
}
export function HeroSection({ inverted = false }: { inverted?: boolean }) {
  const surface = useRef<HTMLElement>(null);
  return <section id="home" className="hero" ref={surface} aria-label="Varun Nimbolkar performing with sitar">
    <img className="hero-fallback" src={inverted ? "/images/stage-color.webp" : "/images/stage-mono.webp"} alt="Varun Nimbolkar seated onstage playing the sitar" fetchPriority="high" width="2560" height="1424"/>
    <NoisyTrailCanvas surface={surface} inverted={inverted}/><div className="readability-overlay" aria-hidden="true"/>
    <div className="hero-editorial">
      <div className="project-heading"><h1>The Sitara<br/>Devi Project</h1><p>Composer · Producer · Sitar Player</p></div>
      <FeaturedPress/>
    </div>
    <HeroContent/><HeroAudio surface={surface}/>
  </section>;
}
