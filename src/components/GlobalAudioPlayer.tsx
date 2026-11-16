import React from 'react';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { ArrowUpRight, Play } from './Icons';

function formatTime(secs: number): string {
  if (isNaN(secs) || secs < 0) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export function GlobalAudioPlayer({ currentPath }: { currentPath: string }) {
  const {
    currentTrack,
    isPlaying,
    isLoading,
    togglePlay,
    nextTrack,
    prevTrack,
    currentTime,
    duration,
    seek,
  } = useAudioPlayer();

  // If on /music or no track, do not show persistent floating bar (it's already on the full page)
  if (!currentTrack || currentPath.startsWith('/music')) {
    return null;
  }

  // Only show floating mini player if playback has started or is actively paused
  if (currentTime === 0 && !isPlaying) {
    return null;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <aside
      className="global-mini-player"
      aria-label="Audio player"
      role="region"
    >
      {/* Clickable progress seek bar */}
      <div
        className="mini-player-progress-bar"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickPos = (e.clientX - rect.left) / rect.width;
          seek(clickPos * duration);
        }}
        role="slider"
        aria-label="Seek audio"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') seek(Math.min(duration, currentTime + 5));
          if (e.key === 'ArrowLeft') seek(Math.max(0, currentTime - 5));
        }}
      >
        <div className="mini-player-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="mini-player-content">
        <div className="mini-player-track">
          <img
            src={currentTrack.artwork}
            alt={currentTrack.artworkAlt}
            className="mini-player-artwork"
            width={44}
            height={44}
            loading="lazy"
          />
          <div className="mini-player-info">
            <span className="mini-player-title">{currentTrack.title}</span>
            <span className="mini-player-artist">
              {currentTrack.artist} {currentTrack.collaborators ? `· ${currentTrack.collaborators}` : ''}
            </span>
          </div>
        </div>

        <div className="mini-player-controls">
          <button
            type="button"
            className="mini-player-btn"
            onClick={prevTrack}
            aria-label="Previous track"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="19 20 9 12 19 4 19 20" />
              <line x1="5" y1="19" x2="5" y2="5" />
            </svg>
          </button>

          <button
            type="button"
            className="mini-player-play-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isLoading ? (
              <span className="mini-player-spinner" aria-hidden="true" />
            ) : isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <Play width={16} height={16} aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            className="mini-player-btn"
            onClick={nextTrack}
            aria-label="Next track"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1="19" y1="5" x2="19" y2="19" />
            </svg>
          </button>

          <span className="mini-player-timer">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="mini-player-actions">
          <a
            href="/music"
            className="mini-player-open-link"
            onClick={(e) => {
              e.preventDefault();
              history.pushState(null, '', '/music');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span>LISTENING ROOM</span>
            <ArrowUpRight width={16} height={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </aside>
  );
}
