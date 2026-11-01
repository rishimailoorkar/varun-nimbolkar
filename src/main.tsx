import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/tinos/400.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import './styles.css';
import { MusicPage } from './components/MusicPage';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HomeSections } from './components/HomeSections';
import { SiteFooter } from './components/SiteFooter';
import { ContactCTA } from './components/ContactCTA';

const inverted = location.pathname.startsWith("/color");
document.documentElement.classList.toggle("color-home", inverted);

function App() {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !('IntersectionObserver' in window)) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(
      '.home-about-copy, .home-about-image-wrap, .home-recognition .home-wide-inner, .temporary-gallery, .home-discography-intro, .home-album, .temporary-press, .contact-cta-panel, .site-footer > *, .music-page h1, .music-page section'
    ));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    targets.forEach(target => { target.classList.add('scroll-reveal'); observer.observe(target); });
    return () => { observer.disconnect(); targets.forEach(target => target.classList.remove('scroll-reveal')); };
  }, []);
  if (location.pathname.startsWith("/music")) return <MusicPage/>;
  return <><a className="skip-link" href="#about">Skip to content</a><Navbar/><main id="top"><HeroSection inverted={inverted}/>
    <HomeSections/>
    <ContactCTA/>
  </main><SiteFooter/></>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
