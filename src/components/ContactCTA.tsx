import { SOCIAL_LINKS } from '../config';
import { ArrowUpRight } from './Icons';

export function ContactCTA({ light = false }: { light?: boolean }) {
  return <section id="contact" className={`contact-cta-section${light ? ' contact-cta-section--light' : ''}`} aria-labelledby="contact-cta-title">
    <div className="contact-cta-panel">
      <div className="contact-cta-intro">
        <h2 id="contact-cta-title">Its Time To Make<br/><em>Some Noise.</em></h2>
        <nav className="contact-cta-socials" aria-label="Connect with Varun">{SOCIAL_LINKS.map(({ name, image, href }) =>
          <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} — opens in a new tab`}><img src={image} width="49" height="49" alt="" /></a>
        )}</nav>
      </div>
      <div className="contact-cta-action">
        <p>Bring your vision for the stage, film, or collaboration. Let's find its sound.</p>
        <a href="https://www.instagram.com/varun_nimbolkar/" target="_blank" rel="noopener noreferrer">BOOK VARUN <ArrowUpRight width={24} height={24} aria-hidden="true" /></a>
      </div>
    </div>
  </section>;
}
