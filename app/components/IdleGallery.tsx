'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { PAINTINGS, type Painting } from '@/data/collection';
import {
  ensureRotationClip,
  getMusicState,
  nudgePlayback,
  getServerMusicState,
  onClipEnd,
  setMuted,
  subscribeMusic,
} from '@/app/lib/music';
import { ShuffleBag } from '@/app/lib/shuffleBag';
import styles from './IdleGallery.module.css';

/** Open the gallery automatically after a stretch with no input. */
export const IDLE_ON_INACTIVITY = true;
export const INACTIVITY_MS = 60_000;
/** Time per painting when muted or when Spotify is unavailable. */
const FALLBACK_MS = 30_000;
/** No painting leaves sooner than this, even if its clip ends early. */
const MIN_DWELL_MS = 8000;
/** Ken Burns travel time. Longer than most clips so motion never stops early. */
const KEN_BURNS_MS = 45_000;
/** Paintings at least this wide (width / height) pan across instead of only zooming. */
const PAN_ASPECT = 1.45;
/** Ignore pointer noise right after opening or toggling fullscreen. */
const GRACE_MS = 800;
/** How long the leave button and cursor stay visible after the last input. */
const CONTROLS_VISIBLE_MS = 3000;
const IMAGE_QUALITY = 85;

// One bag for the whole page load, so reopening the gallery keeps going
// through paintings that have not been shown yet.
let paintingBag: ShuffleBag<Painting> | null = null;
const nextPainting = () => (paintingBag ??= new ShuffleBag(PAINTINGS)).next();

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * object-position that puts the focal point at the center of the screen, as
 * far as the cover crop allows. cqw/cqh are the layer's size (it is a size
 * container); W and H are the painting's rendered size under object-fit: cover.
 */
function centeredPosition(p: Painting) {
  const aspect = p.width / p.height;
  const w = `max(100cqw, 100cqh * ${aspect})`;
  const h = `max(100cqh, 100cqw / ${aspect})`;
  const x = `clamp(100cqw - ${w}, 50cqw - ${w} * ${p.focalX}, 0px)`;
  const y = `clamp(100cqh - ${h}, 50cqh - ${h} * ${p.focalY}, 0px)`;
  return `${x} ${y}`;
}

function imageStyle(p: Painting): React.CSSProperties {
  if (p.zoom === 1) return { objectFit: 'cover', objectPosition: centeredPosition(p) };

  // Zoomed in: scale around the focal point and pull it toward the center,
  // but only as far as the extra size allows, so no edge of the painting shows.
  const origin = `${p.focalX * 100}% ${p.focalY * 100}%`;
  const shift = (focal: number) =>
    clamp((0.5 - focal) * 100, -(1 - focal) * (p.zoom - 1) * 100, focal * (p.zoom - 1) * 100);
  return {
    objectFit: 'cover',
    objectPosition: origin,
    transformOrigin: origin,
    transform: `translate(${shift(p.focalX)}%, ${shift(p.focalY)}%) scale(${p.zoom})`,
  };
}

// Ken Burns parameters for one painting, passed to CSS as custom properties.
// The focal point already sits at (or near) the center of the screen, so:
// Zoom: scale up slowly around the center.
// Pan: scale up enough to overflow, then travel horizontally and finish with
// the focal point centered. 10% is the most a 1.25 scale can shift with no gap.
function motionStyle(p: Painting): React.CSSProperties {
  if (p.width / p.height >= PAN_ASPECT) {
    return {
      '--kb-ms': `${KEN_BURNS_MS}ms`,
      '--kb-pan-from': `${p.focalX >= 0.5 ? 10 : -10}%`,
      '--kb-pan-to': '0%',
    } as React.CSSProperties;
  }
  return {
    '--kb-ms': `${KEN_BURNS_MS}ms`,
    transformOrigin: p.zoom === 1 ? '50% 50%' : `${p.focalX * 100}% ${p.focalY * 100}%`,
  } as React.CSSProperties;
}

function toggleFullscreen(el: HTMLElement | null) {
  if (document.fullscreenElement) void document.exitFullscreen();
  else void el?.requestFullscreen?.().catch(() => {});
}

/** Pointer and touch input on the music card or controls never exits idle. */
const isOnControls = (target: EventTarget | null) =>
  target instanceof Element && target.closest('[data-music-card], [data-idle-control]') !== null;

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

type View = { pos: number; leaving: number | null; pending: number | null };

type Props = {
  onExit: () => void;
  /** Test helper: show only this painting, with no auto-advance or music. */
  pinnedId?: string | null;
};

export default function IdleGallery({ onExit, pinnedId = null }: Props) {
  const pinned = pinnedId ? PAINTINGS.find(p => p.id === pinnedId) ?? null : null;

  // history[pos] is on screen; one painting past it is always kept ready so
  // it can preload before the transition.
  const [history, setHistory] = useState<Painting[]>(() =>
    pinned ? [pinned] : [nextPainting(), nextPainting()],
  );
  const [view, setView] = useState<View>({ pos: 0, leaving: null, pending: null });
  const historyRef = useRef(history);
  const viewRef = useRef(view);
  const loadedIds = useRef(new Set<string>());
  const rootRef = useRef<HTMLDivElement>(null);
  const graceUntil = useRef(0);
  const [controlsVisible, setControlsVisible] = useState(false);
  const hideControlsTimer = useRef<number | undefined>(undefined);

  const music = useSyncExternalStore(subscribeMusic, getMusicState, getServerMusicState);
  const { pos, leaving, pending } = view;

  const commitView = useCallback((next: View) => {
    viewRef.current = next;
    setView(next);
  }, []);

  // Swap only once the target image has loaded; otherwise park it as pending
  // and keep the current painting up until its onLoad fires.
  const step = useCallback(
    (delta: number) => {
      if (pinned) return;
      const v = viewRef.current;
      const target = (v.pending ?? v.pos) + delta;
      if (target < 0 || target === v.pos) return;
      let hist = historyRef.current;
      while (hist.length <= target + 1) hist = [...hist, nextPainting()];
      if (hist !== historyRef.current) {
        historyRef.current = hist;
        setHistory(hist);
      }
      commitView(
        loadedIds.current.has(hist[target].id)
          ? { pos: target, leaving: v.pos, pending: null }
          : { ...v, pending: target },
      );
    },
    [pinned, commitView],
  );

  const markLoaded = useCallback(
    (id: string) => {
      loadedIds.current.add(id);
      const v = viewRef.current;
      if (v.pending !== null && historyRef.current[v.pending].id === id) {
        commitView({ pos: v.pending, leaving: v.pos, pending: null });
      }
    },
    [commitView],
  );

  const clearLeaving = useCallback(
    (i: number) => {
      const v = viewRef.current;
      if (v.leaving === i) commitView({ ...v, leaving: null });
    },
    [commitView],
  );

  // Advance when the song's clip ends. When muted or when Spotify cannot
  // play, fall back to a fixed timer.
  useEffect(() => {
    if (pinned) return;
    let timer: number | undefined;
    if (ensureRotationClip(String(pos))) {
      const shownAt = performance.now();
      const unsubscribe = onClipEnd(() => {
        const wait = Math.max(0, MIN_DWELL_MS - (performance.now() - shownAt));
        timer = window.setTimeout(() => step(1), wait);
      });
      return () => { unsubscribe(); window.clearTimeout(timer); };
    }
    timer = window.setTimeout(() => step(1), FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [pos, music.muted, music.available, pinned, step]);

  // Leaving takes a deliberate action: input only reveals the "leave gallery"
  // button (and cursor) for a few seconds. The button or Esc exits.
  const revealControls = useCallback(() => {
    setControlsVisible(true);
    window.clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = window.setTimeout(() => setControlsVisible(false), CONTROLS_VISIBLE_MS);
  }, []);
  useEffect(() => () => window.clearTimeout(hideControlsTimer.current), []);

  // Input handling: arrows step, F toggles fullscreen, M toggles music,
  // Esc exits, and any other input reveals the leave button. The music card
  // and controls are exempt so the embed can be tapped (iPhone Safari may
  // require it to start audio).
  useEffect(() => {
    graceUntil.current = performance.now() + GRACE_MS;
    const inGrace = () => performance.now() < graceUntil.current;

    const onKey = (e: KeyboardEvent) => {
      if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); return; }
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); return; }
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        graceUntil.current = performance.now() + GRACE_MS;
        toggleFullscreen(rootRef.current);
        return;
      }
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setMuted(!getMusicState().muted);
        return;
      }
      if (e.key === 'Escape') { e.preventDefault(); onExit(); return; }
      revealControls();
    };
    const onMove = (e: MouseEvent) => {
      if (inGrace()) return;
      if (Math.abs(e.movementX) + Math.abs(e.movementY) < 3) return;
      revealControls();
    };
    const onTouch = (e: TouchEvent) => {
      if (isOnControls(e.target)) return;
      nudgePlayback();
      if (inGrace()) return;
      revealControls();
    };
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
      if (document.fullscreenElement) void document.exitFullscreen();
    };
  }, [step, onExit, revealControls]);

  // Lock page scroll underneath while the gallery is open.
  useEffect(() => {
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => { html.style.overflow = previous; };
  }, []);

  const mounted = useMemo(() => {
    const set = new Set<number>([pos]);
    if (pos + 1 < history.length) set.add(pos + 1);
    if (pos > 0) set.add(pos - 1);
    if (leaving !== null) set.add(leaving);
    if (pending !== null) set.add(pending);
    return [...set];
  }, [pos, leaving, pending, history.length]);

  const current = history[pos];
  const song = music.mode === 'gallery' && music.status !== 'off' ? music.song : null;

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${controlsVisible ? styles.showControls : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Idle gallery. Press Escape or use the leave gallery button to exit. Arrow keys change paintings, M toggles music, F toggles fullscreen."
      onDoubleClick={e => {
        if (isOnControls(e.target)) return;
        graceUntil.current = performance.now() + GRACE_MS;
        toggleFullscreen(rootRef.current);
      }}
    >
      {mounted.map(i => {
        const p = history[i];
        const showing = i === pos;
        const animating = showing || i === leaving;
        const pans = p.width / p.height >= PAN_ASPECT;
        return (
          <div
            key={`${i}-${p.id}`}
            className={`${styles.layer} ${showing ? styles.isActive : ''}`}
            aria-hidden={!showing}
            onTransitionEnd={() => clearLeaving(i)}
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

      <button
        type="button"
        className={styles.leave}
        data-idle-control
        onClick={onExit}
        tabIndex={controlsVisible ? 0 : -1}
      >
        leave gallery <span className={styles.key}>esc</span>
      </button>

      <div className={styles.bottomBar}>
        <div className={styles.caption} aria-live="polite">
          <span>
            <span className={styles.title}>{current.title}</span>
            {' '}{current.artist}, {current.year}
          </span>
          {song && (
            <span className={styles.song}>
              <span aria-hidden>♪</span> {song.title} · {song.artist}
            </span>
          )}
          {current.credit && <span className={styles.credit}>{current.credit}</span>}
        </div>
        {!pinned && music.available && (
          <button
            type="button"
            className={styles.mute}
            data-idle-control
            aria-pressed={music.muted}
            onClick={() => setMuted(!music.muted)}
          >
            {music.muted ? 'sound off' : 'sound on'} <span className={styles.key}>M</span>
          </button>
        )}
      </div>
    </div>
  );
}
