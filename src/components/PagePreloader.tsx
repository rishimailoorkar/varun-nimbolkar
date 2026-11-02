import { useEffect, useState, type ReactNode } from 'react';

export function PagePreloader({ children, music = false }: { children: ReactNode; music?: boolean }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    const portrait = new Image();
    portrait.src = '/images/music-room-portrait.jpeg';
    let minimumTimer: number;
    const minimum = new Promise<void>(resolve => { minimumTimer = window.setTimeout(resolve, 2200); });
    const fallbackTimer = window.setTimeout(() => { if (active) setLoading(false); }, 6000);
    Promise.all([minimum, portrait.decode().catch(() => {}), document.fonts.ready]).then(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; clearTimeout(minimumTimer); clearTimeout(fallbackTimer); };
  }, []);
  useEffect(() => {
    if (!loading) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [loading]);
  return <>
    {loading && <div className="music-preloader" role="status" aria-live="polite">
      <div className="loader-record" aria-hidden="true"><div className="loader-label"><img src="/images/music-room-portrait.jpeg" alt="" fetchPriority="high" /></div><div className="loader-spindle"/></div>
      <span className="loader-eyebrow">LOADING EXPERIENCE</span>
      <p className="loader-title">{music ? 'Entering the music room' : 'Entering the experience'}</p>
      <div className="loader-progress" aria-hidden="true"><span/></div>
    </div>}
    <div inert={loading} aria-hidden={loading || undefined}>{children}</div>
  </>;
}
