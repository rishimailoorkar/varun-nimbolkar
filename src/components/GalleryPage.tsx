import { useEffect, useRef, useState } from 'react';
import photos from '../data/gallery.json';
import { Navbar } from './Navbar';
import { SiteFooter } from './SiteFooter';
import { ContactCTA } from './ContactCTA';
import { ArrowUpRight, ArrowLeft, ArrowRight, Close } from './Icons';
import '../gallery.css';

type Photo = (typeof photos)[number];

const filters = ['All', 'Live & Stage', 'Ensemble', 'Portraits', 'Sitar & Craft'];
const sizes = '(max-width: 540px) 44vw, (max-width: 900px) 43vw, (max-width: 1200px) 28vw, 21vw';

function Thumbnail({ photo, onOpen }: { photo: Photo; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [near, setNear] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const bounds = ref.current?.getBoundingClientRect();
    if (bounds && bounds.top < innerHeight + 400 && bounds.bottom > -400) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      className="gallery-tile"
      style={{ aspectRatio: `${photo.width}/${photo.height}` }}
      onClick={onOpen}
      aria-label={`Open photo: ${photo.alt}`}
    >
      {near && (
        <img
          src={photo.variants[0].src}
          srcSet={photo.variants.slice(0, 3).map((v) => `${v.src} ${v.width}w`).join(', ')}
          sizes={sizes}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          onError={() => setError(true)}
        />
      )}
      {error && <span className="gallery-image-error">Preview unavailable · Open photo</span>}
      <span className="gallery-tile-open" aria-hidden="true">
        <ArrowUpRight width={22} height={22} />
      </span>
    </button>
  );
}

function Lightbox({
  photo,
  index,
  total,
  onClose,
  onStep,
}: {
  photo: Photo;
  index: number;
  total: number;
  onClose: () => void;
  onStep: (direction: number) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [photo.id]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX.current;
    if (diff > 45) {
      onStep(-1); // Swipe right -> Previous
    } else if (diff < -45) {
      onStep(1); // Swipe left -> Next
    }
    touchStartX.current = null;
  };

  return (
    <dialog
      ref={dialog}
      className="gallery-lightbox"
      aria-label="Photo viewer"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          onStep(1);
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          onStep(-1);
        }
      }}
    >
      <div className="gallery-lightbox-toolbar">
        <span aria-live="polite">
          {index + 1} / {total}
        </span>
        <button autoFocus onClick={onClose} aria-label="Close photo viewer">
          Close <Close width={20} height={20} aria-hidden="true" />
        </button>
      </div>

      <div
        className="gallery-lightbox-stage"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {!loaded && !error && (
          <span className="gallery-lightbox-status" role="status">
            Loading photograph…
          </span>
        )}
        {error ? (
          <p role="alert">Unable to load this photo. Please try another image.</p>
        ) : (
          <img
            key={photo.id}
            src={photo.variants[3].src}
            width={photo.width}
            height={photo.height}
            alt={photo.alt}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            style={{ opacity: loaded ? 1 : 0 }}
          />
        )}
      </div>

      {photo.caption && photo.caption.trim().length > 0 && (
        <div className="gallery-lightbox-caption">
          <p>{photo.caption}</p>
        </div>
      )}

      <div className="gallery-lightbox-controls">
        <button onClick={() => onStep(-1)} aria-label="Previous photo">
          <ArrowLeft width={20} height={20} aria-hidden="true" />
          Previous
        </button>
        <span>{photo.categories.join(' / ') || 'Gallery'}</span>
        <button onClick={() => onStep(1)} aria-label="Next photo">
          Next
          <ArrowRight width={20} height={20} aria-hidden="true" />
        </button>
      </div>
    </dialog>
  );
}

export function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<number | null>(null);

  const visible = photos.filter(
    (photo) => filter === 'All' || photo.categories.includes(filter)
  );

  useEffect(() => {
    document.title = 'Gallery — Varun Nimbolkar';
  }, []);

  return (
    <div className="gallery-page">
      <Navbar />
      <main id="top">
        <section className="gallery-heading">
          <span className="home-kicker">THE VISUAL ARCHIVE</span>
          <div>
            <h1>
              Through the
              <br />
              <em>lens.</em>
            </h1>
            <p>
              On stage, between sessions, and in the moment.
              <br />A curated selection of live performances, classical sitar work, and festival stages.
            </p>
          </div>
        </section>

        <section className="gallery-collection" aria-label="Photo gallery">
          <div className="gallery-filter-row">
            <div className="gallery-filters" role="group" aria-label="Filter photographs">
              {filters.map((label) => (
                <button
                  key={label}
                  aria-pressed={filter === label}
                  onClick={() => {
                    setFilter(label);
                    setSelected(null);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <span className="gallery-count" role="status">
              {visible.length} photographs
            </span>
          </div>

          <div className="gallery-masonry" key={filter}>
            {visible.map((photo, index) => (
              <Thumbnail
                key={photo.id}
                photo={photo}
                onOpen={() => setSelected(index)}
              />
            ))}
          </div>
        </section>
        <ContactCTA light />
      </main>
      <SiteFooter />

      {selected !== null && (
        <Lightbox
          photo={visible[selected]}
          index={selected}
          total={visible.length}
          onClose={() => setSelected(null)}
          onStep={(direction) =>
            setSelected(
              (current) =>
                ((current ?? 0) + direction + visible.length) % visible.length
            )
          }
        />
      )}
    </div>
  );
}
