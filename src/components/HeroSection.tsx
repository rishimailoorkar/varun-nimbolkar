import { useRef } from 'react';
import { NoisyTrailCanvas } from './NoisyTrailCanvas';
import { HeroAudio } from './HeroAudio';
import { ArrowDown, Play } from './Icons';

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
      <aside className="hero-feature" aria-label="Featured press">
        <strong>{inverted ? 'Mid-Day · The Guide' : 'The Navhind Times · Zest'}</strong>
        <p>{inverted ? 'String Theory' : 'Strings and Stories'}</p>
        <a href={inverted ? '/images/press%20kit/string-theory.webp' : '/images/press%20kit/strings-and-stories.webp'}>Read more</a>
      </aside>
    </div>
    <HeroContent/><HeroAudio surface={surface}/>
  </section>;
}
