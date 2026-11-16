import { useEffect, useRef, useState, useCallback } from 'react';
import photos from '../data/gallery.json';
import { Navbar } from './Navbar';
import { SiteFooter } from './SiteFooter';
import { ContactCTA } from './ContactCTA';
import { ArrowUpRight, ArrowLeft, ArrowRight, Close } from './Icons';
import '../gallery.css';

type Photo = typeof photos[number];

const FILTERS = ['All', 'Live & Stage', 'Portraits', 'Sitar & Craft', 'Ensemble'];
const SIZES = '(max-width: 540px) 92vw, (max-width: 900px) 46vw, (max-width: 1280px) 30vw, 22vw';

function Thumbnail({
  photo,
  onOpen,
}: {
  photo: Photo;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [inView, setInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      className={`gallery-tile ${isLoaded ? 'gallery-tile--loaded' : ''}`}
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      onClick={onOpen}
      aria-label={`Open photograph: ${photo.alt}`}
    >
      {inView && (
        <img
          src={photo.variants[0].src}
          srcSet={photo.variants.slice(0, 3).map((v) => `${v.src} ${v.width}w`).join(', ')}
          sizes={SIZES}
          width={photo.width}
          height={photo.height}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}
      {hasError && (
        <span className="gallery-image-error" role="alert">
          Preview unavailable · Click to open
        </span>
      )}
      <span className="gallery-tile-open" aria-hidden="true">
        <ArrowUpRight width={20} height={20} />
      </span>
      {photo.categories && photo.categories.length > 0 && (
        <span className="gallery-tile-badge" aria-hidden="true">
          {photo.categories[0]}
        </span>
      )}
    </button>
  );
}

function Lightbox({
  photo,
  index,
  total,
  allPhotos,
  onClose,
  onStep,
}: {
  photo: Photo;
  index: number;
  total: number;
  allPhotos: Photo[];
  onClose: () => void;
  onStep: (direction: number) => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Touch swipe state
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);

  // Preload adjacent images
  useEffect(() => {
    const nextIdx = (index + 1) % total;
    const prevIdx = (index - 1 + total) % total;
    [nextIdx, prevIdx].forEach((idx) => {
      const candidate = allPhotos[idx];
      if (candidate?.variants?.[3]?.src) {
        const img = new Image();
        img.src = candidate.variants[3].src;
      }
    });
  }, [index, total, allPhotos]);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const bodyOverflow = document.body.style.overflow;
    dialogRef.current?.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = bodyOverflow;
      previous?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    setLoaded(false);
    setError(false);
    setSwipeOffset(0);
  }, [photo.id]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY, time: Date.now() };
    setSwipeOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.touches.length !== 1) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      setSwipeOffset(dx * 0.4); // soft resistance feedback
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    const dt = Date.now() - touchStartRef.current.time;

    // Minimum swipe threshold 45px, horizontal priority, under 600ms
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3 && dt < 600) {
      if (dx < 0) {
        onStep(1); // Swipe left -> Next
      } else {
        onStep(-1); // Swipe right -> Previous
      }
    }
    setSwipeOffset(0);
    touchStartRef.current = null;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      onStep(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onStep(-1);
    }
  };

  // 2400w variant for crystal-clear lightbox viewing
  const highResSrc = photo.variants[3]?.src || photo.variants[2]?.src;

  return (
    <dialog
      ref={dialogRef}
      className="gallery-lightbox"
      aria-label="Full-screen photograph viewer"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="gallery-lightbox-toolbar">
        <div className="gallery-lightbox-meta">
          <span className="gallery-lightbox-count" aria-live="polite">
            {index + 1} / {total}
          </span>
          <span className="gallery-lightbox-category">
            {photo.categories?.join(' · ') || 'Visual Archive'}
          </span>
        </div>
        <button
          autoFocus
          onClick={onClose}
          className="gallery-lightbox-close"
          aria-label="Close photograph viewer (Escape)"
        >
          <span>Close</span>
          <Close width={18} height={18} aria-hidden="true" />
        </button>
      </div>

      <div
        className="gallery-lightbox-stage"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: swipeOffset ? `translateX(${swipeOffset}px)` : undefined,
          transition: swipeOffset ? 'none' : 'transform 0.25s ease-out',
        }}
      >
        <button
          type="button"
          className="gallery-lightbox-arrow gallery-lightbox-arrow--prev"
          onClick={() => onStep(-1)}
          aria-label="Previous photograph (Left Arrow)"
        >
          <ArrowLeft width={22} height={22} aria-hidden="true" />
        </button>

        <div className="gallery-lightbox-stage-inner">
          {!loaded && !error && (
            <span className="gallery-lightbox-status" role="status">
              Loading photograph…
            </span>
          )}
          {error ? (
            <p className="gallery-lightbox-error" role="alert">
              Unable to load this photograph. Please try another image.
            </p>
          ) : (
            <img
              key={photo.id}
              src={highResSrc}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              className={loaded ? 'gallery-lightbox-img--loaded' : ''}
            />
          )}
          {photo.caption && photo.caption.trim().length > 0 && (
            <p className="gallery-lightbox-caption">{photo.caption}</p>
          )}
        </div>

        <button
          type="button"
          className="gallery-lightbox-arrow gallery-lightbox-arrow--next"
          onClick={() => onStep(1)}
          aria-label="Next photograph (Right Arrow)"
        >
          <ArrowRight width={22} height={22} aria-hidden="true" />
        </button>
      </div>

      <div className="gallery-lightbox-controls">
        <button
          type="button"
          onClick={() => onStep(-1)}
          aria-label="Previous photograph"
          className="gallery-lightbox-nav-btn"
        >
          <ArrowLeft width={18} height={18} aria-hidden="true" />
          <span>Previous</span>
        </button>
        <span className="gallery-lightbox-hint" aria-hidden="true">
          Use ← / → keys or swipe to navigate
        </span>
        <button
          type="button"
          onClick={() => onStep(1)}
          aria-label="Next photograph"
          className="gallery-lightbox-nav-btn"
        >
          <span>Next</span>
          <ArrowRight width={18} height={18} aria-hidden="true" />
        </button>
      </div>
    </dialog>
  );
}

export function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<number | null>(null);

  // Filter photos based on editorial categories
  const visible = photos.filter(
    (photo) => filter === 'All' || photo.categories.includes(filter)
  );

  useEffect(() => {
    document.title = 'Gallery — Varun Nimbolkar';
  }, []);

  // Mouse drag support for category pills
  const filtersRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = filtersRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !filtersRef.current) return;
    e.preventDefault();
    const x = e.pageX - filtersRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    filtersRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleFilterChange = (category: string) => {
    setFilter(category);
    setSelected(null);
  };

  return (
    <div className="gallery-page">
      <Navbar />

      <main id="top">
        {/* EDITORIAL GALLERY HERO */}
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
              <br />
              A curated photographic record of Varun Nimbolkar.
            </p>
          </div>
        </section>

        {/* STICKY EDITORIAL FILTER BAR & COLLECTION */}
        <section className="gallery-collection" aria-label="Curated photograph gallery">
          <div className="gallery-filter-row">
            <div
              ref={filtersRef}
              className="gallery-filters"
              role="group"
              aria-label="Filter photographs by category"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {FILTERS.map((label) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={filter === label}
                  onClick={() => handleFilterChange(label)}
                  className={`gallery-filter-btn ${filter === label ? 'gallery-filter-btn--active' : ''}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <span className="gallery-count" role="status">
              {visible.length} {visible.length === 1 ? 'photograph' : 'photographs'}
            </span>
          </div>

          {/* EDITORIAL MASONRY GRID */}
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

        {/* FOOTER CTA */}
        <ContactCTA light />
      </main>

      <SiteFooter />

      {/* FULL-SCREEN LIGHTBOX VIEWER WITH SWIPE & KEYBOARD SUPPORT */}
      {selected !== null && (
        <Lightbox
          photo={visible[selected]}
          index={selected}
          total={visible.length}
          allPhotos={visible}
          onClose={() => setSelected(null)}
          onStep={(direction) =>
            setSelected((current) => {
              if (current === null) return 0;
              return (current + direction + visible.length) % visible.length;
            })
          }
        />
      )}
    </div>
  );
}
