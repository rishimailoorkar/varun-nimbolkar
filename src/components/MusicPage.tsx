import { ArrowUpRight, ArrowDown } from './Icons';
import { useEffect, useRef } from 'react';
import { SiteFooter } from './SiteFooter';
import { ContactCTA } from './ContactCTA';
export function MusicPage() {
 const frame = useRef<HTMLIFrameElement>(null);
 useEffect(() => {
  document.title = 'Music — Varun Nimbolkar';
  let observer: ResizeObserver | undefined;
  const el = frame.current;
  const loaded = () => {
   const body = el?.contentDocument?.body;
   if (!el || !body || !el.contentDocument?.URL.includes('/music-turntable.html')) return;
   observer?.disconnect();
   const resize = () => { el.style.height = `${Math.ceil(body.getBoundingClientRect().height)}px`; };
   observer = new ResizeObserver(resize);
   observer.observe(body);
   resize();
  };
  el?.addEventListener('load', loaded); loaded();
  return () => { observer?.disconnect(); el?.removeEventListener('load', loaded); };
 }, []);
 return <main className="music-page-shell" id="top">
  <header className="music-page-navbar"><a href="/" className="music-home-link" aria-label="Return to homepage">VARUN<br/>NIMBOLKAR</a><span className="music-navbar-label">THE LISTENING ROOM</span><a href="/" className="music-exit">EXIT <ArrowUpRight width={20} height={20} aria-hidden="true" /></a></header>
  <section className="music-page-hero" aria-labelledby="music-page-heading"><span className="music-page-kicker">VARUN NIMBOLKAR / MUSIC</span><h1 id="music-page-heading">Discover the <em>Soul</em><br/>of My <span>Music</span></h1><p>Where classical strings meet a restless electric spirit.</p><a className="music-scroll" href="#music-player">SCROLL TO LISTEN <ArrowDown width={20} height={20} aria-hidden="true" /></a></section>
  <section id="music-player" className="music-player-section"><iframe ref={frame} title="Interactive turntable and Spotify player" src="/music-turntable.html" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" /></section>
  <ContactCTA light />
  <SiteFooter />
 </main>;
}
