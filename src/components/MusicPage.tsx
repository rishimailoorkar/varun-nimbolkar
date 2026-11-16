import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDown, Play } from './Icons';
import { SiteFooter } from './SiteFooter';
import { ContactCTA } from './ContactCTA';
import { useAudioPlayer } from '../context/AudioPlayerContext';
import { ALL_RELEASES } from '../data/musicData';
import '../music.css';

function formatTime(secs: number): string {
  if (isNaN(secs) || secs < 0) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export function MusicPage() {
  const {
    currentTrack,
    isPlaying,
    isLoading,
    hasError,
    currentTime,
    duration,
    volume,
    isMuted,
    playTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    toggleMute,
    allTracks,
  } = useAudioPlayer();

  const [activeFilter, setActiveFilter] = useState<'All' | 'Single' | 'EP Track' | 'Collaboration'>('All');

  useEffect(() => {
    document.title = 'Music & The Listening Room — Varun Nimbolkar';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredTracks = allTracks.filter((t) => {
    if (activeFilter === 'All') return true;
    return t.type === activeFilter;
  });

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <main className="music-page-shell" id="top">
      {/* Header Navigation */}
      <header className="music-page-navbar">
        <a href="/" className="music-home-link" aria-label="Return to homepage">
          VARUN NIMBOLKAR
        </a>
        <span className="music-navbar-label">THE LISTENING ROOM</span>
        <a href="/contact" className="music-exit">
          BOOK VARUN <ArrowUpRight width={20} height={20} aria-hidden="true" />
        </a>
      </header>

      {/* Editorial Hero */}
      <section className="music-page-hero" aria-labelledby="music-page-heading">
        <span className="music-page-kicker">VARUN NIMBOLKAR / MUSIC</span>
        <h1 id="music-page-heading">
          Discover the <em>Soul</em>
          <br />
          of My <span>Music</span>
        </h1>
        <p>Where classical strings meet a restless electric spirit.</p>
        <a className="music-scroll" href="#music-player">
          SCROLL TO LISTEN <ArrowDown width={20} height={20} aria-hidden="true" />
        </a>
      </section>

      {/* Section 1: Master Player Console */}
      <section id="music-player" className="listening-room-player" aria-label="Music Player Console">
        {currentTrack && (
          <div className={`player-console ${isPlaying ? 'playing' : ''}`}>
            {/* Left: Track Artwork */}
            <div className="player-artwork-wrap">
              <img
                src={currentTrack.artwork}
                alt={currentTrack.artworkAlt}
                className="player-artwork-img"
                width={320}
                height={320}
              />
              <span className="player-artwork-badge">{currentTrack.type}</span>
            </div>

            {/* Right: Controls & Details */}
            <div className="player-main-controls">
              <div className="player-track-meta">
                <span className="player-kicker">
                  {isPlaying && <span className="player-live-dot" aria-hidden="true" />}
                  {isPlaying ? 'NOW PLAYING' : 'READY TO PLAY'} · {currentTrack.releaseYear}
                </span>
                <h2 className="player-title">{currentTrack.title}</h2>
                <span className="player-artists">
                  {currentTrack.artist}{' '}
                  {currentTrack.collaborators && `(${currentTrack.collaborators})`}
                </span>
                <span className="player-album-detail">
                  Album: {currentTrack.album} · Duration: {currentTrack.durationFormatted}
                </span>
              </div>

              {/* Scrubber / Progress Bar */}
              <div className="player-scrubber">
                <div
                  className="scrubber-track"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = (e.clientX - rect.left) / rect.width;
                    seek(pos * duration);
                  }}
                  role="slider"
                  aria-label="Seek track position"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') seek(Math.min(duration, currentTime + 5));
                    if (e.key === 'ArrowLeft') seek(Math.max(0, currentTime - 5));
                  }}
                >
                  <div className="scrubber-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="scrubber-timestamps">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls & Volume */}
              <div className="player-button-group">
                <div className="player-playback-btns">
                  <button
                    type="button"
                    className="playback-btn"
                    onClick={prevTrack}
                    aria-label="Previous track"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="19 20 9 12 19 4 19 20" />
                      <line x1="5" y1="19" x2="5" y2="5" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="playback-btn main-play"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isLoading ? (
                      <span className="mini-player-spinner" aria-hidden="true" />
                    ) : isPlaying ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <Play width={22} height={22} aria-hidden="true" />
                    )}
                  </button>

                  <button
                    type="button"
                    className="playback-btn"
                    onClick={nextTrack}
                    aria-label="Next track"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 4 15 12 5 20 5 4" />
                      <line x1="19" y1="5" x2="19" y2="19" />
                    </svg>
                  </button>
                </div>

                {/* Volume Slider */}
                <div className="player-volume-control">
                  <button
                    type="button"
                    className="volume-toggle"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="1" y1="1" x2="23" y2="23" />
                        <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                        <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="volume-slider"
                    aria-label="Volume slider"
                  />
                </div>

                {/* External Streaming Destination */}
                <a
                  href={currentTrack.streamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="player-stream-link"
                >
                  <span>Listen on Apple Music</span>
                  <ArrowUpRight width={16} height={16} aria-hidden="true" />
                </a>
              </div>

              {/* Status / Error feedback */}
              {isLoading && (
                <div className="player-state-notice loading" role="status">
                  Loading audio stream…
                </div>
              )}
              {hasError && (
                <div className="player-state-notice error" role="alert">
                  <span>Audio preview requires client-authorized audio file.</span>
                  <a href={currentTrack.streamUrl} target="_blank" rel="noopener noreferrer">
                    Open full track on Apple Music / Spotify →
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Section 2: Complete Music Library (All Songs & Releases Sorted Latest First) */}
      <section className="music-library-section" aria-labelledby="library-heading">
        <div className="music-library-header">
          <div className="library-heading-wrap">
            <span className="home-kicker">COMPLETE DISCOGRAPHY</span>
            <h2 id="library-heading">The Music Library</h2>
          </div>

          <div className="library-filter-pills" role="tablist" aria-label="Filter songs by category">
            {(['All', 'Single', 'EP Track', 'Collaboration'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === 'All' ? 'All Releases' : filter === 'Single' ? 'Singles' : filter === 'EP Track' ? 'EP Tracks' : 'Collaborations'}
              </button>
            ))}
          </div>
        </div>

        {/* Tracks Table */}
        <div className="tracks-list-container" role="list">
          {filteredTracks.map((track, idx) => {
            const isThisPlaying = currentTrack?.id === track.id && isPlaying;
            const isThisSelected = currentTrack?.id === track.id;

            return (
              <article
                key={track.id}
                className={`track-row ${isThisSelected ? 'active' : ''}`}
                onClick={() => playTrack(track)}
                tabIndex={0}
                role="listitem"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    playTrack(track);
                  }
                }}
                aria-label={`Play ${track.title}`}
              >
                <div className="track-number">
                  {isThisPlaying ? (
                    <span className="player-live-dot" aria-label="Playing" />
                  ) : (
                    <span>{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  )}
                </div>

                <div className="track-artwork-thumb">
                  <img src={track.artwork} alt={track.artworkAlt} loading="lazy" width={44} height={44} />
                </div>

                <div className="track-main-info">
                  <span className="track-row-title">
                    {track.title}
                  </span>
                  <span className="track-row-collab">
                    {track.artist} {track.collaborators && `· ${track.collaborators}`}
                  </span>
                </div>

                <span className="track-row-album">{track.album}</span>
                <span className="track-row-date">{track.releaseDate}</span>
                <span className="track-row-duration">{track.durationFormatted}</span>

                <div className="track-row-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className="track-play-btn"
                    onClick={() => {
                      if (isThisSelected) {
                        togglePlay();
                      } else {
                        playTrack(track);
                      }
                    }}
                    aria-label={isThisPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
                  >
                    {isThisPlaying ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <Play width={14} height={14} aria-hidden="true" />
                    )}
                  </button>

                  <a
                    href={track.streamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="track-stream-btn"
                    aria-label={`Stream ${track.title} on Apple Music`}
                  >
                    <span>Stream</span>
                    <ArrowUpRight width={12} height={12} aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 3: All Albums & Releases (Clickable Official Streaming Destinations) */}
      <section className="music-releases-section" aria-labelledby="albums-heading">
        <span className="home-kicker">DISCOGRAPHY CATALOGUE</span>
        <h2 id="albums-heading" style={{ fontFamily: 'Tinos, serif', fontSize: 'clamp(34px, 3.8vw, 54px)', fontWeight: 400, margin: '10px 0 0', color: '#141414' }}>
          Albums & Official Releases
        </h2>
        <p style={{ color: '#68646e', fontSize: '16px', marginTop: '8px', maxWidth: '680px' }}>
          Every release below connects directly to its official streaming destination on Apple Music and Spotify.
        </p>

        <div className="releases-grid">
          {ALL_RELEASES.map((release) => (
            <a
              key={release.id}
              href={release.streamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="release-card"
              aria-label={`Open ${release.title} on official streaming platform`}
            >
              <div className="release-card-art">
                <img src={release.artwork} alt={release.artworkAlt} loading="lazy" width={300} height={300} />
                <div className="release-card-overlay">
                  <div className="release-card-play-icon">
                    <ArrowUpRight width={24} height={24} aria-hidden="true" />
                  </div>
                </div>
              </div>
              <div className="release-card-meta">
                <span>{release.releaseYear} · {release.type}</span>
                <h3>{release.title}</h3>
                <p>{release.artist}</p>
                <p style={{ fontSize: '12px', color: '#88848f', marginTop: '2px' }}>{release.detail}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <ContactCTA light />
      <SiteFooter />
    </main>
  );
}
