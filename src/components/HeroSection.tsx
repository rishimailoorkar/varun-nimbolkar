import { useRef } from 'react';
import { NoisyTrailCanvas } from './NoisyTrailCanvas';
import { HeroAudio } from './HeroAudio';
import { ArrowDown, Play } from './Icons';

export function HeroContent() {
  return <div className="hero-content"><span className="accent"/><h1>THE TUNES WHERE TRADITION<br className="desktop-break"/> MEETS ELECTRICITY.</h1><a className="music-button" href="/music">EXPLORE MUSIC <Play width={20} height={20} aria-hidden="true"/></a></div>;
}
export function ScrollIndicator() {
  return <a className="scroll-indicator" href="#about">SCROLL TO EXPLORE<ArrowDown width={20} height={34} aria-hidden="true"/></a>;
}
export function HeroSection({ inverted = false }: { inverted?: boolean }) {
  const surface = useRef<HTMLElement>(null);
  return <section id="home" className="hero" ref={surface} aria-label="Varun Nimbolkar performing with sitar">
    <img className="hero-fallback" src={inverted ? "/images/neon-aligned.webp" : "/images/monochrome.webp"} alt="Varun Nimbolkar seated onstage playing the sitar" fetchPriority="high" width="1672" height="941"/>
    <NoisyTrailCanvas surface={surface} inverted={inverted}/><div className="readability-overlay" aria-hidden="true"/>
    <div className="hero-presenting"><span>PRESENTING</span><p>Varun<br/>Nimbolkar</p></div>
    <HeroContent/><ScrollIndicator/><HeroAudio surface={surface}/>
  </section>;
}
