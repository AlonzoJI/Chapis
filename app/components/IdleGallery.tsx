'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { PAINTINGS, type Painting } from '@/data/collection';
import styles from './IdleGallery.module.css';

/** Open the gallery automatically after a stretch with no input. */
export const IDLE_ON_INACTIVITY = true;
export const INACTIVITY_MS = 60_000;
/** Flip to true to shuffle the rotation order. */
const SHUFFLE = false;
/** Time per painting. The music step will replace this timer. */
const ADVANCE_MS = 30_000;
const FADE_MS = 1200;
/** Paintings at least this wide (width / height) pan across instead of only zooming. */
const PAN_ASPECT = 1.45;
/** Ignore pointer noise right after opening or toggling fullscreen. */
const GRACE_MS = 800;
const IMAGE_QUALITY = 85;

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

let clientRotation: Painting[] | null = null;
const getClientRotation = () => (clientRotation ??= SHUFFLE ? shuffled(PAINTINGS) : PAINTINGS);
const getServerRotation = () => PAINTINGS;
const subscribeNever = () => () => {};

// Where the gallery picks up the next time it opens.
let resumeAt = 0;

const wrap = (i: number, n: number) => ((i % n) + n) % n;

function imageStyle(p: Painting): React.CSSProperties {
  const origin = `${p.focalX * 100}% ${p.focalY * 100}%`;
  return {
    objectFit: 'cover',
    objectPosition: origin,
    transform: p.zoom === 1 ? undefined : `scale(${p.zoom})`,
    transformOrigin: origin,
  };
}

// Ken Burns parameters for one painting, passed to CSS as custom properties.
// Zoom: scale up slowly around the focal point.
// Pan: scale up enough to overflow, then travel horizontally and finish over
// the focal point. 10% is the most a 1.25 scale can shift with no gap.
function motionStyle(p: Painting): React.CSSProperties {
  const durationMs = ADVANCE_MS + FADE_MS * 2;
  if (p.width / p.height >= PAN_ASPECT) {
    const end = (0.5 - p.focalX) * 20;
    const start = p.focalX >= 0.5 ? 10 : -10;
    return {
      '--kb-ms': `${durationMs}ms`,
      '--kb-pan-from': `${start}%`,
      '--kb-pan-to': `${end}%`,
    } as React.CSSProperties;
  }
  return {
    '--kb-ms': `${durationMs}ms`,
    transformOrigin: `${p.focalX * 100}% ${p.focalY * 100}%`,
  } as React.CSSProperties;
}

function toggleFullscreen(el: HTMLElement | null) {
  if (document.fullscreenElement) void document.exitFullscreen();
  else void el?.requestFullscreen?.().catch(() => {});
}

type View = { pos: number; leaving: number | null; pending: number | null };

/** Calls onIdle after `ms` with no pointer, key, touch, wheel or scroll input. */
export function useInactivity(ms: number, onIdle: () => void, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let timer = window.setTimeout(onIdle, ms);
    const reset = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(onIdle, ms);
    };
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'wheel', 'scroll'] as const;
    events.forEach(e => window.addEventListener(e, reset, { passive: true }));
    return () => {
      window.clearTimeout(timer);
      events.forEach(e => window.removeEventListener(e, reset));
    };
  }, [ms, onIdle, enabled]);
}

export default function IdleGallery({ onExit }: { onExit: () => void }) {
  const rotation = useSyncExternalStore(subscribeNever, getClientRotation, getServerRotation);
  const n = rotation.length;

  const [view, setView] = useState<View>(() => ({ pos: wrap(resumeAt, n), leaving: null, pending: null }));
  const { pos, leaving, pending } = view;
  const loadedIds = useRef(new Set<string>());
  const rootRef = useRef<HTMLDivElement>(null);
  const graceUntil = useRef(0);

  const goTo = useCallback(
    (step: number) =>
      setView(v => {
        const target = wrap((v.pending ?? v.pos) + step, n);
        if (target === v.pos) return { ...v, pending: null };
        if (loadedIds.current.has(rotation[target].id)) {
          return { pos: target, leaving: v.pos, pending: null };
        }
        return { ...v, pending: target };
      }),
    [n, rotation],
  );

  const markLoaded = useCallback(
    (id: string) => {
      loadedIds.current.add(id);
      setView(v =>
        v.pending !== null && rotation[v.pending].id === id
          ? { pos: v.pending, leaving: v.pos, pending: null }
          : v,
      );
    },
    [rotation],
  );

  useEffect(() => {
    resumeAt = pos + 1;
  }, [pos]);

  // Auto-advance. The timer restarts on every change, so arrow presses get a
  // full interval too.
  useEffect(() => {
    const timer = window.setTimeout(() => goTo(1), ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [pos, goTo]);

  const exit = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    onExit();
  }, [onExit]);

  // Input handling: arrows step, F toggles fullscreen, anything else exits.
  useEffect(() => {
    graceUntil.current = performance.now() + GRACE_MS;
    const inGrace = () => performance.now() < graceUntil.current;

    const onKey = (e: KeyboardEvent) => {
      if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(1); return; }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(-1); return; }
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        graceUntil.current = performance.now() + GRACE_MS;
        toggleFullscreen(rootRef.current);
        return;
      }
      e.preventDefault();
      exit();
    };
    const onMove = (e: MouseEvent) => {
      if (inGrace()) return;
      if (Math.abs(e.movementX) + Math.abs(e.movementY) < 3) return;
      exit();
    };
    const onTouch = () => { if (!inGrace()) exit(); };
    const onFullscreenChange = () => { graceUntil.current = performance.now() + GRACE_MS; };

    window.addEventListener('keydown', onKey);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchstart', onTouch, { passive: true });
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchstart', onTouch);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [goTo, exit]);

  // Lock page scroll underneath while the gallery is open.
  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => { html.style.overflow = previous; };
  }, []);

  const mounted = useMemo(() => {
    const set = new Set<number>([pos, wrap(pos + 1, n), wrap(pos - 1, n)]);
    if (leaving !== null) set.add(leaving);
    if (pending !== null) set.add(pending);
    return [...set];
  }, [pos, leaving, pending, n]);

  const current = rotation[pos];

  return (
    <div
      ref={rootRef}
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-label="Idle gallery. Press any key to exit."
      onDoubleClick={() => {
        graceUntil.current = performance.now() + GRACE_MS;
        toggleFullscreen(rootRef.current);
      }}
    >
      {mounted.map(i => {
        const p = rotation[i];
        const showing = i === pos;
        const animating = showing || i === leaving;
        const pans = p.width / p.height >= PAN_ASPECT;
        return (
          <div
            key={p.id}
            className={`${styles.layer} ${showing ? styles.isActive : ''}`}
            aria-hidden={!showing}
            onTransitionEnd={() => setView(v => (v.leaving === i ? { ...v, leaving: null } : v))}
          >
            <div
              className={`${styles.motion} ${animating ? (pans ? styles.pan : styles.zoom) : ''}`}
              style={motionStyle(p)}
            >
              <Image
                src={p.image}
                alt={showing ? `${p.title} by ${p.artist}` : ''}
                fill
                sizes="100vw"
                quality={IMAGE_QUALITY}
                loading="eager"
                style={imageStyle(p)}
                onLoad={() => markLoaded(p.id)}
              />
            </div>
          </div>
        );
      })}

      <div className={styles.caption} aria-live="polite">
        <span className={styles.title}>{current.title}</span>
        <span>{current.artist}, {current.year}</span>
        {current.credit && <span className={styles.credit}>{current.credit}</span>}
      </div>
    </div>
  );
}
