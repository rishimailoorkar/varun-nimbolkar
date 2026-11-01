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
  return <header className="navbar" ref={nav} onKeyDown={e => { if (e.key === 'Escape') { setMore(false); setMobile(false); moreButton.current?.focus(); } }}>
    <a className="wordmark" href="/#home" aria-label="Varun Nimbolkar home">VARUN<br/>NIMBOLKAR</a>
    <button className="menu-toggle" aria-expanded={mobile} aria-controls="main-navigation" onClick={() => setMobile(!mobile)}>{mobile ? 'CLOSE −' : 'MENU +'}</button>
    <nav id="main-navigation" aria-label="Main navigation" className={mobile ? 'nav-links open' : 'nav-links'}>
      {['Home', 'About', 'Music', 'Gallery'].map(label => <a key={label} href={label === 'Music' ? '/music' : `/#${label.toLowerCase()}`} className={label === (location.pathname.startsWith('/music') ? 'Music' : location.pathname.startsWith('/press') ? '' : 'Home') ? 'active' : ''} onClick={() => {setMobile(false); setMore(false);}}>{label}</a>)}
      <div className="more-wrap">
        <button ref={moreButton} aria-expanded={more} aria-controls="more-navigation" onClick={() => setMore(!more)}>MORE <NavArrowDown width={18} height={18} aria-hidden="true"/></button>
        {more && <div id="more-navigation" className="dropdown">{['Live', 'Press', 'Contact'].map(label => <a key={label} href={label === 'Music' ? '/music' : label === 'Press' ? '/press' : `/#${label.toLowerCase()}`} onClick={() => {setMore(false);setMobile(false);}}>{label}</a>)}</div>}
      </div>
    </nav>
    <a className="book-button" href="/#contact">BOOK VARUN <ArrowUpRight width={20} height={20} aria-hidden="true" /></a>
  </header>;
}
