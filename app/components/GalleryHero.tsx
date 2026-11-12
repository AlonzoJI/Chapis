'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { OPENER, PAINTINGS, type Painting } from '@/data/collection';
import styles from './GalleryHero.module.css';

/** Flip to true to shuffle the rotation. The opener always stays first. */
const SHUFFLE = false;
/** How long each painting stays up once rotation has started. */
const ROTATE_MS = 9000;
const IMAGE_QUALITY = 85;

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Position 0 is the opener. Positions 1..n are the rotation, which wraps onto
// itself so the opener is never shown again after the first visit to it.
function nextPos(pos: number, n: number) {
  return pos >= n ? 1 : pos + 1;
}
function prevPos(pos: number, n: number) {
  return pos <= 1 ? n : pos - 1;
}

function imageStyle(p: Painting): React.CSSProperties {
  const origin = `${p.focalX * 100}% ${p.focalY * 100}%`;
  return {
    objectFit: 'cover',
    objectPosition: origin,
    transform: p.zoom === 1 ? undefined : `scale(${p.zoom})`,
    transformOrigin: origin,
  };
}

// The shuffled order is computed once per page load on the client. The server
// snapshot is always the fixed order, so hydration matches either way.
let clientRotation: Painting[] | null = null;
const getClientRotation = () => (clientRotation ??= SHUFFLE ? shuffled(PAINTINGS) : PAINTINGS);
const getServerRotation = () => PAINTINGS;
const subscribeNever = () => () => {};

type View = { pos: number; leaving: number | null; pending: number | null };

export default function GalleryHero() {
  const rotation = useSyncExternalStore(subscribeNever, getClientRotation, getServerRotation);
  const sequence = useMemo(() => [OPENER.painting, ...rotation], [rotation]);
  const n = rotation.length;

  const [view, setView] = useState<View>({ pos: 0, leaving: null, pending: null });
  const { pos, leaving, pending } = view;
  const [rotating, setRotating] = useState(false);
  const loadedIds = useRef(new Set<string>());
  const heroRef = useRef<HTMLElement>(null);
  const heroVisible = useRef(true);

  // Swap only once the target image has loaded; otherwise park it as pending
  // and keep the current painting up until its onLoad fires.
  const goTo = useCallback(
    (pickTarget: (from: number) => number) =>
      setView(v => {
        const target = pickTarget(v.pending ?? v.pos);
        if (target === v.pos) return { ...v, pending: null };
        if (loadedIds.current.has(sequence[target].id)) {
          return { pos: target, leaving: v.pos, pending: null };
        }
        return { ...v, pending: target };
      }),
    [sequence],
  );
  const next = useCallback(() => goTo(from => nextPos(from, n)), [goTo, n]);
  const prev = useCallback(() => goTo(from => prevPos(from, n)), [goTo, n]);

  const markLoaded = useCallback(
    (id: string) => {
      loadedIds.current.add(id);
      setView(v =>
        v.pending !== null && sequence[v.pending].id === id
          ? { pos: v.pending, leaving: v.pos, pending: null }
          : v,
      );
    },
    [sequence],
  );

  // Auto-rotation. Restarts its timer whenever the painting changes, so a
  // manual arrow press gets a full interval before the next automatic step.
  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(next, ROTATE_MS);
    return () => window.clearTimeout(timer);
  }, [rotating, pos, next]);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { heroVisible.current = entry.isIntersecting; },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!heroVisible.current || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Mount only the layers that matter: what is showing, what is fading out,
  // what is waiting to load, and the neighbours on either side so they are
  // already downloaded before the transition.
  const mounted = new Set<number>([pos, nextPos(pos, n), prevPos(pos, n)]);
  if (leaving !== null) mounted.add(leaving);
  if (pending !== null) mounted.add(pending);

  const current = sequence[pos];
  const isOpenerOnFirstPaint = pos === 0 && leaving === null;

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Gallery">
      <div className={styles.stage}>
        {[...mounted].map(i => {
          const p = sequence[i];
          const isLcp = i === 0 && isOpenerOnFirstPaint;
          return (
            <div
              key={p.id}
              className={`${styles.layer} ${i === pos ? styles.isActive : ''}`}
              aria-hidden={i !== pos}
              onTransitionEnd={() => setView(v => (v.leaving === i ? { ...v, leaving: null } : v))}
            >
              <Image
                src={p.image}
                alt={i === pos ? `${p.title} by ${p.artist}` : ''}
                fill
                sizes="100vw"
                quality={IMAGE_QUALITY}
                preload={isLcp}
                loading={isLcp ? undefined : 'eager'}
                style={imageStyle(p)}
                onLoad={() => markLoaded(p.id)}
              />
            </div>
          );
        })}
      </div>

      <div className={styles.scrimTop} aria-hidden />
      <div className={styles.scrimBottom} aria-hidden />

      <p className={styles.name}>jared alonzo</p>

      <div className={styles.caption} aria-live="polite">
        <p className={styles.title}>{current.title}</p>
        <p className={styles.meta}>
          {current.artist}, {current.year} · {current.museum}
        </p>
        {current.credit && <p className={styles.credit}>{current.credit}</p>}
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.button}
          aria-pressed={rotating}
          onClick={() => {
            if (!rotating) next();
            setRotating(true);
          }}
        >
          enter gallery ♪
        </button>
        <button type="button" className={styles.button}>
          idle
        </button>
      </div>
    </section>
  );
}
