import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { TRAIL_CONFIG as config } from '../config';
import { vertexShader, trailFragment, revealFragment } from '../shaders/trail';

export function NoisyTrailCanvas({ surface, inverted = false }: { surface: RefObject<HTMLElement | null>; inverted?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current, host = surface.current;
    if (!el || !host) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = matchMedia('(hover: hover) and (pointer: fine)');
    let dispose: (() => void) | undefined;
    const setup = () => {
      dispose?.(); dispose = undefined;
      if (media.matches || !pointer.matches) return;
      let renderer: THREE.WebGLRenderer;
      try { renderer = new THREE.WebGLRenderer({ canvas: el, alpha: false, antialias: false, powerPreference: 'high-performance' }); }
      catch { return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, config.maxDevicePixelRatio));
      // Texture and shader output both use display-space colours, matching the fallback image.
      renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
      const geometry = new THREE.PlaneGeometry(2, 2);
      const camera = new THREE.Camera();
      const scene = new THREE.Scene();
      const size = new THREE.Vector2(1, 1);
      let read = new THREE.WebGLRenderTarget(1, 1, { depthBuffer: false, stencilBuffer: false });
      let write = read.clone();
      const from = new THREE.Vector2(-1, -1), to = from.clone(), target = from.clone();
      const trail = new THREE.ShaderMaterial({ vertexShader, fragmentShader: trailFragment, uniforms: {
        uPrevious: { value: read.texture }, uSize: { value: size }, uFrom: { value: from }, uTo: { value: to },
        uDelta: { value: 0 }, uDecay: { value: config.trailDecaySeconds }, uRadius: { value: inverted ? 240 : config.brushRadius },
        uSpeed: { value: 0 }, uPaint: { value: 0 }, uTime: { value: 0 }, uNoise: { value: config.noiseStrength }, uScale: { value: config.noiseScale },
      }});
      const reveal = new THREE.ShaderMaterial({ vertexShader, fragmentShader: revealFragment, uniforms: {
        uMono: { value: null }, uColor: { value: null }, uTrail: { value: read.texture }, uSize: { value: size },
        uTime: { value: 0 }, uNoise: { value: config.noiseStrength }, uScale: { value: config.noiseScale },
        uDistortion: { value: config.distortionStrength }, uRgb: { value: config.rgbSplitStrength },
      }});
      const mesh = new THREE.Mesh(geometry, reveal); scene.add(mesh);
      const textures: THREE.Texture[] = [];
      let ready = false, dead = false, visible = true, lost = false, frame = 0, last = 0, lastMove = -Infinity, previousEvent = 0, speed = 0, inside = false;
      let rect = host.getBoundingClientRect();
      const clear = () => {
        for (const rt of [read, write]) { renderer.setRenderTarget(rt); renderer.setClearColor(0, 1); renderer.clear(); }
        renderer.setRenderTarget(null);
      };
      const draw = () => {
        mesh.material = reveal; reveal.uniforms.uTrail.value = read.texture;
        renderer.setRenderTarget(null); renderer.render(scene, camera);
      };
      const tick = (now: number) => {
        frame = 0;
        if (dead || lost || !ready || !visible || document.hidden) return;
        const dt = Math.min((now - (last || now - 16.7)) / 1000, .05); last = now;
        from.copy(to);
        to.lerp(target, 1 - Math.pow(1 - config.pointerSmoothing, dt * 60));
        const distance = Math.hypot((to.x - from.x) * size.x, (to.y - from.y) * size.y);
        trail.uniforms.uPaint.value = inside && now - lastMove < 100 && distance > .12 ? Math.min(1, distance / 1.5) : 0;
        trail.uniforms.uSpeed.value = speed;
        trail.uniforms.uDelta.value = dt;
        trail.uniforms.uTime.value = now / 1000;
        trail.uniforms.uPrevious.value = read.texture;
        mesh.material = trail; renderer.setRenderTarget(write); renderer.render(scene, camera);
        [read, write] = [write, read];
        reveal.uniforms.uTime.value = now / 1000; draw();
        if (now - lastMove < config.trailDecaySeconds * 2.5) frame = requestAnimationFrame(tick);
        else { clear(); draw(); last = 0; }
      };
      const wake = () => { if (!frame && ready && visible && !lost && !document.hidden) frame = requestAnimationFrame(tick); };
      const resize = () => {
        if (lost || dead) return;
        rect = host.getBoundingClientRect(); size.set(rect.width, rect.height);
        renderer.setSize(rect.width, rect.height, false);
        const w = Math.max(1, Math.round(rect.width * config.trailResolutionScale));
        const h = Math.max(1, Math.round(rect.height * config.trailResolutionScale));
        read.setSize(w, h); write.setSize(w, h); clear();
        inside = false; lastMove = -Infinity;
        if (ready) draw();
      };
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
        rect = host.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width, y = 1 - (event.clientY - rect.top) / rect.height;
        const now = performance.now();
        if (!inside) { from.set(x, y); to.copy(from); target.copy(from); inside = true; previousEvent = now; return; }
        const distance = Math.hypot((x - target.x) * size.x, (y - target.y) * size.y);
        if (distance < .2) return;
        const velocity = distance / Math.max(8, now - previousEvent);
        speed = THREE.MathUtils.lerp(speed, Math.min(1, velocity / 1.8 * config.velocityInfluence), .35);
        target.set(x, y); previousEvent = now; lastMove = now; wake();
      };
      const leave = () => { inside = false; };
      const contextLost = (event: Event) => { event.preventDefault(); lost = true; el.style.opacity = '0'; cancelAnimationFrame(frame); frame = 0; };
      const contextRestored = () => { setup(); };
      const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else { clear(); lastMove = -Infinity; inside = false; last = 0; wake(); } };
      const observer = new ResizeObserver(resize); observer.observe(host);
      const intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) { cancelAnimationFrame(frame); frame = 0; }
        else { clear(); lastMove = -Infinity; inside = false; last = 0; wake(); }
      }); intersection.observe(host);
      host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave);
      el.addEventListener('webglcontextlost', contextLost); el.addEventListener('webglcontextrestored', contextRestored);
      document.addEventListener('visibilitychange', visibility);
      const loader = new THREE.TextureLoader();
      Promise.all(['/images/monochrome.webp', '/images/neon-aligned.webp'].map(url => loader.loadAsync(url).then(texture => {
        if (dead) { texture.dispose(); return texture; }
        texture.minFilter = THREE.LinearFilter; texture.magFilter = THREE.LinearFilter; texture.generateMipmaps = false;
        textures.push(texture); return texture;
      }))).then(([mono, color]) => {
        if (dead) return;
        reveal.uniforms.uMono.value = inverted ? color : mono; reveal.uniforms.uColor.value = inverted ? mono : color;
        ready = true; resize(); el.style.opacity = '1';
      }).catch(() => { el.style.opacity = '0'; });
      dispose = () => {
        dead = true; cancelAnimationFrame(frame); el.style.opacity = '0';
        observer.disconnect(); intersection.disconnect();
        host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave);
        el.removeEventListener('webglcontextlost', contextLost); el.removeEventListener('webglcontextrestored', contextRestored);
        document.removeEventListener('visibilitychange', visibility);
        textures.forEach(t => t.dispose()); read.dispose(); write.dispose(); trail.dispose(); reveal.dispose(); geometry.dispose(); renderer.dispose();
      };
    };
    setup(); media.addEventListener('change', setup); pointer.addEventListener('change', setup);
    return () => { dispose?.(); media.removeEventListener('change', setup); pointer.removeEventListener('change', setup); };
  }, [surface, inverted]);
  return <canvas ref={canvas} className="trail-canvas" aria-hidden="true" />;
}

