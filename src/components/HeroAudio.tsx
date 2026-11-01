import { SoundHigh, SoundOff } from './Icons';
import { useEffect, useRef, useState, type RefObject } from 'react';

const KEY = 'varun-hero-sound';
const PLAYER_KEY = 'varun-player-active';
const NOTES = [0.84, 0.94, 1, 1.12, 1.26];

export function HeroAudio({ surface }: { surface: RefObject<HTMLElement | null> }) {
  const [enabled, setEnabled] = useState(() => localStorage.getItem(KEY) === 'on');
  const audio = useRef<AudioContext | null>(null);
  const buffer = useRef<AudioBuffer | null>(null);
  const master = useRef<GainNode | null>(null);
  const active = useRef<{ source: AudioBufferSourceNode; gain: GainNode }[]>([]);
  const last = useRef({ x: 0, y: 0, time: 0, note: -1, played: 0, distance: 0 });
  const suspended = useRef(sessionStorage.getItem(PLAYER_KEY) === 'true');

  const fade = () => {
    const ctx = audio.current;
    if (!ctx) return;
    active.current.forEach(({ source, gain }) => {
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setTargetAtTime(0, ctx.currentTime, .035);
      try { source.stop(ctx.currentTime + .16); } catch { /* already ended */ }
    });
    active.current = [];
  };
  const toggle = async () => {
    if (enabled) { fade(); setEnabled(false); localStorage.setItem(KEY, 'off'); return; }
    try {
      const ctx = audio.current ?? new AudioContext(); audio.current = ctx;
      await ctx.resume();
      if (!master.current) { master.current = ctx.createGain(); master.current.gain.value = .12; master.current.connect(ctx.destination); }
      if (!buffer.current) {
        const response = await fetch('/sitar-pluck.mp3');
        buffer.current = await ctx.decodeAudioData(await response.arrayBuffer());
      }
      setEnabled(true); localStorage.setItem(KEY, 'on');
    } catch { setEnabled(false); localStorage.setItem(KEY, 'off'); }
  };
  useEffect(() => {
    const host = surface.current;
    if (!host || !enabled) return;
    // A saved preference still requires a fresh user gesture before the context can resume.
    const start = async () => { if (!audio.current) { const ctx = new AudioContext(); audio.current = ctx; master.current = ctx.createGain(); master.current.gain.value = .12; master.current.connect(ctx.destination); try { const response = await fetch('/sitar-pluck.mp3'); buffer.current = await ctx.decodeAudioData(await response.arrayBuffer()); } catch { return; } } if (audio.current.state === 'suspended') await audio.current.resume(); };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      if (suspended.current || document.hidden || !buffer.current || !master.current || !audio.current || audio.current.state !== 'running') return;
      if ((event.target as Element).closest('a,button,nav,[role="link"]')) return;
      const now = performance.now();
      const prev = last.current;
      if (!prev.time) { prev.x = event.clientX; prev.y = event.clientY; prev.time = now; return; }
      const distance = Math.hypot(event.clientX - prev.x, event.clientY - prev.y);
      const elapsed = Math.max(1, now - prev.time);
      prev.x = event.clientX; prev.y = event.clientY; prev.time = now; prev.distance += distance;
      if (prev.distance < 36 || now - prev.played < 400 || active.current.length >= 2) return;
      const velocity = distance / elapsed;
      let choice = Math.floor(Math.random() * NOTES.length);
      if (choice === prev.note) choice = (choice + 1 + Math.floor(Math.random() * (NOTES.length - 1))) % NOTES.length;
      prev.note = choice; prev.played = now; prev.distance = 0;
      const ctx = audio.current;
      const source = ctx.createBufferSource(); source.buffer = buffer.current;
      source.playbackRate.value = NOTES[choice] * (velocity > 1.5 ? 1.015 : 1);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(.35, ctx.currentTime + .025);
      gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + 1.15);
      source.connect(gain).connect(master.current);
      const voice = { source, gain };
      active.current.push(voice);
      source.onended = () => { active.current = active.current.filter(item => item !== voice); source.disconnect(); gain.disconnect(); };
      source.start(); source.stop(ctx.currentTime + 1.2);
    };
    const player = (event: StorageEvent | MessageEvent) => {
      if (event instanceof MessageEvent) { if (event.origin !== location.origin || event.data?.type !== 'varun-player') return; suspended.current = !!event.data.playing; }
      else if (event.key === PLAYER_KEY) suspended.current = event.newValue === 'true';
      if (suspended.current) fade();
    };
    const visibility = () => { if (document.hidden) { fade(); void audio.current?.suspend(); } };
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerdown', start);
    window.addEventListener('message', player);
    window.addEventListener('storage', player);
    document.addEventListener('visibilitychange', visibility);
    return () => { host.removeEventListener('pointermove', move); host.removeEventListener('pointerdown', start); window.removeEventListener('message', player); window.removeEventListener('storage', player); document.removeEventListener('visibilitychange', visibility); fade(); };
  }, [enabled, surface]);
  useEffect(() => () => { fade(); void audio.current?.close(); audio.current = null; }, []);
  return <button className="sound-toggle" type="button" onClick={() => void toggle()} aria-pressed={enabled} aria-label={enabled ? 'Sound On' : 'Sound Off'}>{enabled ? <SoundHigh width={18} height={18} aria-hidden="true" /> : <SoundOff width={18} height={18} aria-hidden="true" />}<span>{enabled ? 'SOUND ON' : 'SOUND OFF'}</span></button>;
}
