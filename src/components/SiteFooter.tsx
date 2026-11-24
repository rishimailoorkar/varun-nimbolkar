import { ArrowUp, ArrowUpRight } from './Icons';

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-identity"><a className="footer-wordmark" href="/">VARUN<br/>NIMBOLKAR</a><p>Composer · Producer · Sitar Player</p></div>
      <nav className="footer-nav" aria-label="Footer navigation"><span>EXPLORE</span><a href="/about">About</a><a href="/music">Music</a><a href="/gallery">Gallery</a><a href="/press">Press</a></nav>
      <nav className="footer-nav" aria-label="Music and social profiles"><span>CONNECT</span>{[
        ['Spotify', 'https://open.spotify.com/artist/3dmI9UkzIOZZeHcdLJfXZs'],
        ['Apple Music', 'https://music.apple.com/in/artist/varun-nimbolkar/1566186954'],
        ['YouTube', 'https://www.youtube.com/@varunnimbolkar'],
        ['Instagram', 'https://www.instagram.com/varun_nimbolkar/'],
      ].map(([label, url]) => <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label}<ArrowUpRight width={14} height={14} aria-hidden="true"/></a>)}</nav>
      <div className="footer-tagline"><h2>THE TUNES WHERE TRADITION<br/>MEETS ELECTRONICA</h2></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} VARUN NIMBOLKAR</span><span className="footer-bottom-tagline">THE TUNES WHERE TRADITION<br/>MEETS ELECTRONICA</span><a href="#top">BACK TO TOP <ArrowUp width={17} height={17} aria-hidden="true"/></a></div>
    <div className="footer-art" aria-hidden="true"/>
  </footer>;
}
