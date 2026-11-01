import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/tinos/400.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import './styles.css';
import { MusicPage } from './components/MusicPage';
import { PressPage } from './components/PressPage';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HomeSections } from './components/HomeSections';
import { SiteFooter } from './components/SiteFooter';
import { ContactCTA } from './components/ContactCTA';

const inverted = location.pathname.startsWith("/color");
document.documentElement.classList.toggle("color-home", inverted);

function App() {
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    const handlePop = () => setPath(location.pathname);
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  if (path.startsWith("/press")) return <PressPage/>;
  if (path.startsWith("/music")) return <MusicPage/>;
  return <><a className="skip-link" href="#about">Skip to content</a><Navbar/><main id="top"><HeroSection inverted={inverted}/>
    <HomeSections/>
    <ContactCTA/>
  </main><SiteFooter/></>;
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
