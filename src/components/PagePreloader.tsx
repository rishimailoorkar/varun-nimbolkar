import { useEffect, useState, type ReactNode } from 'react';

export function PagePreloader({ children, music = false }: { children: ReactNode; music?: boolean }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(1);
  useEffect(() => {
    let active = true;
    let complete = false;
    let exitTimer: number | undefined;
    const started = performance.now();
    setProgress(1);
    const progressTimer = window.setInterval(() => {
      if (!complete) setProgress(Math.min(94, Math.round(1 + 93 * (1 - Math.exp(-(performance.now() - started) / 850)))));
    }, 50);
    const finish = () => {
      if (!active || complete) return;
      complete = true;
      clearInterval(progressTimer);
      setProgress(100);
      exitTimer = window.setTimeout(() => { if (active) setLoading(false); }, 180);
    };
    const portrait = new Image();
    portrait.src = '/images/preloader-portrait.webp';
    let minimumTimer: number;
    const minimum = new Promise<void>(resolve => { minimumTimer = window.setTimeout(resolve, 1100); });
    const fallbackTimer = window.setTimeout(finish, 3500);
    Promise.all([minimum, portrait.decode().catch(() => {}), Promise.resolve()]).then(() => {
      finish();
    });
    return () => { active = false; clearInterval(progressTimer); clearTimeout(exitTimer); clearTimeout(minimumTimer); clearTimeout(fallbackTimer); };
  }, []);
  useEffect(() => {
    if (!loading) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [loading]);
  return <>
    {loading && <div className="music-preloader" role="status" aria-live="polite">
      <div className="loader-record" aria-hidden="true"><div className="loader-label"><img src="/images/preloader-portrait.webp" alt="" fetchPriority="high" /></div><div className="loader-spindle"/></div>
      <span className="loader-eyebrow">LOADING EXPERIENCE</span>
      <p className="loader-title">{music ? 'Entering the music room' : 'Entering the experience'}</p>
      <div className="loader-meter" aria-live="off">
        <div className="loader-progress" role="progressbar" aria-label="Preparing page" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ transform: `scaleX(${progress / 100})` }}/></div>
        <span className="loader-percentage" aria-hidden="true">{progress}<span>%</span></span>
      </div>
    </div>}
    <div inert={loading} aria-hidden={loading || undefined}>{children}</div>
  </>;
}
