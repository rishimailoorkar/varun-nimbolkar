import { ArrowUpRight } from './Icons';
export function SelectedWork() {
 return <section className="selected-work" id="gallery" aria-labelledby="selected-work-title"><div className="home-wide-inner">
  <div className="selected-work-heading"><div><span className="home-kicker">SELECTED WORK · COLLABORATIONS</span><h2 id="selected-work-title">Thoda Sa.</h2></div><p>Gunda feat. Varun Nimbolkar &amp; Unkill Ji. Sitar meets contemporary hip-hop in a genre-crossing collaboration that puts texture and musical storytelling at the forefront.</p></div>
  <div className="selected-work-player"><iframe src="https://www.youtube-nocookie.com/embed/MtqOyo2ykPU?rel=0" title="Thoda Sa — Gunda (Official Music Video) | Azadi Records" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen/></div>
  <div className="selected-work-credit"><span>OFFICIAL MUSIC VIDEO · AZADI RECORDS</span><a href="https://www.youtube.com/watch?v=MtqOyo2ykPU" target="_blank" rel="noopener noreferrer">Watch on YouTube <ArrowUpRight width={18} height={18}/></a></div>
  <a className="selected-work-gallery-link" href="/gallery">Explore the gallery <ArrowUpRight width={18} height={18} aria-hidden="true"/></a><div className="selected-work-collaborators"><span>ALSO WORKED WITH</span><span>Tienas</span><span>Amritha Thankachy</span><span>Derek &amp; The Cats</span></div>
 </div></section>;
}
