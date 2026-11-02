import { NavArrowDown, ArrowUpRight } from './Icons';
import { useEffect, useRef, useState } from 'react';

export function Navbar() {
  const [mobile, setMobile] = useState(false);
  const [more, setMore] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const moreButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const close = (e: PointerEvent) => { if (!nav.current?.contains(e.target as Node)) { setMore(false); setMobile(false); } };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);

  const navigate = (to: string) => {
    setMobile(false);
    setMore(false);
    if (to.startsWith('/#')) {
      if (location.pathname !== '/') {
        location.href = to;
      } else {
        const id = to.replace('/#', '');
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          history.pushState(null, '', to);
        } else {
          location.href = to;
        }
      }
      return;
    }
    if (to === '/press' || to === '/music' || to === '/' || to === '/presspage') {
      history.pushState(null, '', to);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      location.href = to;
    }
  };

  const isCurrent = (route: string) => {
    const p = location.pathname.toLowerCase();
    const h = location.hash.toLowerCase();
    if (route === 'Music') return p.startsWith('/music');
    if (route === 'Press') return p.startsWith('/press') || p.startsWith('/presspage') || h === '#press' || h === '#presspage';
    if (route === 'Home') return p === '/' && (!h || h === '#home');
    return false;
  };

  return <header className="navbar" ref={nav} onKeyDown={e => { if (e.key === 'Escape') { setMore(false); setMobile(false); moreButton.current?.focus(); } }}>
    <a className="wordmark" href="/#home" aria-label="Varun Nimbolkar home" onClick={e => { e.preventDefault(); navigate('/#home'); }}>VARUN<br/>NIMBOLKAR</a>
    <button className="menu-toggle" aria-expanded={mobile} aria-controls="main-navigation" onClick={() => setMobile(!mobile)}>{mobile ? 'CLOSE −' : 'MENU +'}</button>
    <nav id="main-navigation" aria-label="Main navigation" className={mobile ? 'nav-links open' : 'nav-links'}>
      {['Home', 'About', 'Music', 'Gallery'].map(label => {
        const href = label === 'Music' ? '/music' : `/#${label.toLowerCase()}`;
        return <a key={label} href={href} className={isCurrent(label) ? 'active' : ''} onClick={e => { e.preventDefault(); navigate(href); }}>{label}</a>;
      })}
      <div className="more-wrap">
        <button ref={moreButton} aria-expanded={more} aria-controls="more-navigation" onClick={() => setMore(!more)}>MORE <NavArrowDown width={18} height={18} aria-hidden="true"/></button>
        {more && <div id="more-navigation" className="dropdown">{['Live', 'Press', 'Contact'].map(label => {
          const href = label === 'Music' ? '/music' : label === 'Press' ? '/press' : label === 'Contact' ? '/contact' : `/#${label.toLowerCase()}`;
          return <a key={label} href={href} className={isCurrent(label) ? 'active' : ''} onClick={e => { e.preventDefault(); navigate(href); }}>{label}</a>;
        })}</div>}
      </div>
    </nav>
    <a className="book-button" href="/contact" onClick={e => { e.preventDefault(); navigate('/contact'); }}>BOOK VARUN <ArrowUpRight width={20} height={20} aria-hidden="true" /></a>
  </header>;
}
