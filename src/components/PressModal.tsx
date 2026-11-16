import { useEffect, useRef } from 'react';
import { Close } from './Icons';
import '../press.css';

export interface PressModalData {
  image: string;
  title: string;
  publication: string;
  date: string;
  author?: string;
  content?: string;
}

interface PressModalProps {
  data: PressModalData | null;
  onClose: () => void;
}

export function PressModal({ data, onClose }: PressModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!data) return;

    const previous = document.activeElement as HTMLElement | null;
    const bodyOverflow = document.body.style.overflow;
    dialogRef.current?.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = bodyOverflow;
      previous?.focus({ preventScroll: true });
    };
  }, [data]);

  if (!data) return null;

  return (
    <dialog
      ref={dialogRef}
      className="press-lightbox"
      aria-label={`${data.title} newspaper clipping`}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      }}
    >
      <div className="press-lightbox-card" onClick={(e) => e.stopPropagation()}>
        <header className="press-lightbox-header">
          <div className="press-lightbox-info">
            <span className="press-lightbox-pub">{data.publication}</span>
            <span className="press-lightbox-dot" aria-hidden="true">·</span>
            <span className="press-lightbox-date">{data.date}</span>
            {data.author && (
              <>
                <span className="press-lightbox-dot" aria-hidden="true">·</span>
                <span className="press-lightbox-author">By {data.author}</span>
              </>
            )}
          </div>
          <button
            autoFocus
            type="button"
            className="press-lightbox-close"
            onClick={onClose}
            aria-label="Close clipping (Escape)"
          >
            <span>Close</span>
            <Close width={18} height={18} aria-hidden="true" />
          </button>
        </header>

        <div className="press-lightbox-body">
          <img
            src={data.image}
            alt={`Full newspaper clipping: ${data.title} in ${data.publication}`}
            className="press-lightbox-image"
          />
        </div>

        {data.content && (
          <footer className="press-lightbox-footer">
            <p className="press-lightbox-content-desc">{data.content}</p>
          </footer>
        )}
      </div>
    </dialog>
  );
}
