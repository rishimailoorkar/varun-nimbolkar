import { ArrowUp, ArrowUpRight, Download } from './Icons';

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-identity"><a className="footer-wordmark" href="/">VARUN<br/>NIMBOLKAR</a><p>Sitarist · Composer · Producer</p></div>
      <nav className="footer-nav" aria-label="Footer navigation"><span>EXPLORE</span><a href="/about">About</a><a href="/music">Music</a><a href="/gallery">Gallery</a><a href="/press">Press</a></nav>
      <nav className="footer-nav" aria-label="Music and social profiles"><span>CONNECT</span>{[
        ['Spotify', 'https://open.spotify.com/artist/3dmI9UkzIOZZeHcdLJfXZs'],
        ['Apple Music', 'https://music.apple.com/in/artist/varun-nimbolkar/1566186954'],
        ['YouTube', 'https://www.youtube.com/@varunnimbolkar'],
        ['Instagram', 'https://www.instagram.com/varun_nimbolkar/'],
      ].map(([label, url]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight width={14} height={14} aria-hidden="true"/></a>)}</nav>
      <div className="footer-cta"><h2>Let’s make<br/>something sound</h2><a href="/varun-nimbolkar-epk.pdf" download="Varun-Nimbolkar-EPK.pdf"><Download width={20} height={20} aria-hidden="true"/>Download EPK</a></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} VARUN NIMBOLKAR</span><span>TRADITION MEETS ELECTRICITY.</span><a href="#top">BACK TO TOP <ArrowUp width={17} height={17} aria-hidden="true"/></a></div>
    <div className="footer-art" aria-hidden="true"/>
  </footer>;
}
