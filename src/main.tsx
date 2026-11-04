import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/tinos/400.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import './styles.css';
import { GalleryPage } from './components/GalleryPage';
import { MusicPage } from './components/MusicPage';
import { PressPage } from './components/PressPage';
import { AboutPage } from './components/AboutPage';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HomeSections } from './components/HomeSections';
import { SiteFooter } from './components/SiteFooter';
import { ContactPage } from './components/ContactPage';
import { ContactCTA } from './components/ContactCTA';
import { PagePreloader } from './components/PagePreloader';

const inverted = location.pathname.startsWith("/color");
document.documentElement.classList.toggle("color-home", inverted);

function isAboutRoute(pathname: string, hash: string): boolean {
  const p = pathname.toLowerCase();
  const h = hash.toLowerCase();
  return (
    p === '/about' ||
    p.startsWith('/about/') ||
    p === '/aboutpage' ||
    p.startsWith('/aboutpage/') ||
    h === '#about-page'
  );
}

function isPressRoute(pathname: string, hash: string): boolean {
  const p = pathname.toLowerCase();
  const h = hash.toLowerCase();
  return (
    p.startsWith('/press') ||
    p.startsWith('/presspage') ||
    p.startsWith('/press-release') ||
    p.startsWith('/press-and-media') ||
    h === '#press' ||
    h === '#presspage'
  );
}

function App() {
  const [path, setPath] = useState(location.pathname);
  const [hash, setHash] = useState(location.hash);

  useEffect(() => {
    const handlePop = () => {
      setPath(location.pathname);
      setHash(location.hash);
    };
    window.addEventListener('popstate', handlePop);
    window.addEventListener('hashchange', handlePop);
    return () => {
      window.removeEventListener('popstate', handlePop);
      window.removeEventListener('hashchange', handlePop);
    };
  }, []);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const targets = Array.from(document.querySelectorAll<HTMLElement>(
      'main h1, main h2, main h3, main p, .home-kicker, .home-stats strong'
    )).filter(el => !el.closest('.hero, .gallery-page, .music-preloader, .home-interlude-caption, .booking-form-wrap'));
    // Keep each hero text/CTA composition together, with zero offset at page top.
    const heroGroups = Array.from(document.querySelectorAll<HTMLElement>('.hero-content, .hero-presenting'));
    const portrait = document.querySelector<HTMLElement>('.home-about-image-wrap img');
    let frame = 0;
    const reset = () => { [...targets, ...heroGroups].forEach(el => { el.classList.remove('text-scroll-motion'); el.style.removeProperty('--text-shift'); el.style.removeProperty('--text-opacity'); }); portrait?.style.removeProperty('--portrait-shift'); };
    const update = () => {
      frame = 0;
      if (media.matches) return;
      const height = innerHeight;
      let unsettled = false;
      heroGroups.forEach(el => {
        const hero = el.closest('.hero')!;
        const distance = Math.max(0, -hero.getBoundingClientRect().top);
        const desired = -Math.min(distance * .12, 70);
        const shift = parseFloat(el.style.getPropertyValue('--text-shift')) || 0;
        const next = distance === 0 || Math.abs(desired - shift) < .1 ? desired : shift + (desired - shift) * .16;
        if (Math.abs(desired - next) > .1) unsettled = true;
        el.style.setProperty('--text-shift', `${next.toFixed(2)}px`);
        el.style.setProperty('--text-opacity', '1');
      });
      targets.forEach(el => {
        const shift = parseFloat(el.style.getPropertyValue('--text-shift')) || 0;
        const top = el.getBoundingClientRect().top - shift;
        const item = el.closest('.home-stats > div, .press-item');
        const index = item ? Array.from(item.parentElement?.children || []).indexOf(item) : 0;
        const delay = Math.min(index, 3) * 0.035;
        const mobile = innerWidth < 760;
        const progress = Math.max(0, Math.min(1, (height - top) / (height * 1.1)));
        const strength = el.matches('h1, h2') ? 150 : el.matches('strong, h3') ? 100 : 65;
        const desired = ((.58 - progress) * strength + delay * 100) * (mobile ? .65 : 1);
        const next = Math.abs(desired - shift) < .1 ? desired : shift + (desired - shift) * .16;
        if (Math.abs(desired - next) > .1) unsettled = true;
        el.style.setProperty('--text-shift', `${next.toFixed(2)}px`);
        const reveal = Math.max(0, Math.min(1, (height - top) / (height * .3)));
        el.style.setProperty('--text-opacity', String(.3 + reveal * .7));
      });
      if (portrait) {
        const bounds = portrait.parentElement!.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (height - bounds.top) / (height + bounds.height)));
        portrait.style.setProperty('--portrait-shift', `${((.5 - progress) * 7).toFixed(2)}%`);
      }
      if (unsettled) frame = requestAnimationFrame(update);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const setup = () => { cancelAnimationFrame(frame); frame = 0; reset(); if (!media.matches) { [...targets, ...heroGroups].forEach(el => el.classList.add('text-scroll-motion')); update(); } };
    setup();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    media.addEventListener('change', setup);
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); media.removeEventListener('change', setup); reset(); };
  }, [path, hash]);

  if (isAboutRoute(path, hash)) return <PagePreloader key="about"><AboutPage/></PagePreloader>;
  if (path.startsWith("/gallery")) return <PagePreloader key="gallery"><GalleryPage/></PagePreloader>;
  if (path.startsWith("/contact") || path.startsWith("/book")) return <PagePreloader key="contact"><ContactPage/></PagePreloader>;
  if (isPressRoute(path, hash)) return <PagePreloader key="press"><PressPage/></PagePreloader>;
  if (path.startsWith("/music")) return <PagePreloader key="music" music><MusicPage/></PagePreloader>;
  return <PagePreloader key={path}><a className="skip-link" href="#about">Skip to content</a><Navbar/><main id="top"><HeroSection inverted={inverted}/>
    <HomeSections/>
    <ContactCTA/>
  </main><SiteFooter/></PagePreloader>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
