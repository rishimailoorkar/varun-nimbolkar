import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { ALL_TRACKS, type Track } from '../data/musicData';

interface AudioPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  isLoading: boolean;
  hasError: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (seconds: number) => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  allTracks: Track[];
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

const PLAYER_ACTIVE_KEY = 'varun-player-active';

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(() => ALL_TRACKS[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(ALL_TRACKS[0]?.duration || 0);
  const [volume, setVolumeState] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onPlay = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setHasError(false);
      sessionStorage.setItem(PLAYER_ACTIVE_KEY, 'true');
      window.postMessage({ type: 'varun-player', playing: true }, '*');
    };

    const onPause = () => {
      setIsPlaying(false);
      setIsLoading(false);
      sessionStorage.setItem(PLAYER_ACTIVE_KEY, 'false');
      window.postMessage({ type: 'varun-player', playing: false }, '*');
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
      setIsLoading(false);
    };

    const onWaiting = () => {
      setIsLoading(true);
    };

    const onPlaying = () => {
      setIsLoading(false);
    };

    const onEnded = () => {
      setIsPlaying(false);
      // Auto play next track
      nextTrackRef.current?.();
    };

    const onError = () => {
      setIsLoading(false);
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const nextTrackRef = useRef<(() => void) | undefined>(undefined);

  const playTrack = (track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;

    setHasError(false);
    setCurrentTrack(track);
    setDuration(track.duration);
    setCurrentTime(0);

    if (track.audioUrl) {
      setIsLoading(true);
      if (audio.src !== track.audioUrl) {
        audio.src = track.audioUrl;
      }
      audio.currentTime = 0;
      audio.play().catch(() => {
        setIsLoading(false);
        setHasError(true);
        setIsPlaying(false);
      });
    } else {
      // If no playable preview audio, report error/unauthorized audio state
      audio.pause();
      setIsPlaying(false);
      setIsLoading(false);
      setHasError(true);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.pause();
    } else {
      if (!audio.src && currentTrack.audioUrl) {
        audio.src = currentTrack.audioUrl;
      }
      if (currentTrack.audioUrl) {
        setIsLoading(true);
        audio.play().catch(() => {
          setIsLoading(false);
          setHasError(true);
          setIsPlaying(false);
        });
      } else {
        setHasError(true);
      }
    }
  };

  const nextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = ALL_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % ALL_TRACKS.length;
    playTrack(ALL_TRACKS[nextIndex]);
  };
  nextTrackRef.current = nextTrack;

  const prevTrack = () => {
    if (!currentTrack) return;
    const currentIndex = ALL_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + ALL_TRACKS.length) % ALL_TRACKS.length;
    playTrack(ALL_TRACKS[prevIndex]);
  };

  const seek = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = seconds;
    setCurrentTime(seconds);
  };

  const setVolume = (val: number) => {
    const audio = audioRef.current;
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audio) {
      audio.volume = isMuted ? 0 : clamped;
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    setIsMuted((prev) => {
      const next = !prev;
      if (audio) {
        audio.volume = next ? 0 : volume;
      }
      return next;
    });
  };

  return (
    <AudioPlayerContext.Provider
      value={{
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
        allTracks: ALL_TRACKS,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
}
