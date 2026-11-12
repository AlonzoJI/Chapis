'use client';

import Image from 'next/image';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { OPENER } from '@/data/collection';
import {
  getOpeningSeen,
  getOpeningSeenOnServer,
  markOpeningSeen,
  subscribeOpeningSeen,
} from '@/app/lib/openingSeen';
import { playClip } from '@/app/lib/music';
import styles from './OpeningScreen.module.css';

const FADE_MS = 1200;

export default function OpeningScreen({ onIdle }: { onIdle: () => void }) {
  const seen = useSyncExternalStore(subscribeOpeningSeen, getOpeningSeen, getOpeningSeenOnServer);
  const [leaving, setLeaving] = useState(false);

  // Keep the page underneath from scrolling while the opening screen is up.
  useEffect(() => {
    if (seen) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => { html.style.overflow = previous; };
  }, [seen]);

  if (seen) return null;

  const enter = () => {
    if (leaving) return;
    // Must run inside the click handler: browsers only allow audio to start
    // from a user gesture. The player docks bottom right once the fade ends.
    playClip(OPENER.song, 'docked');
    setLeaving(true);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(markOpeningSeen, reduced ? 0 : FADE_MS);
  };

  const p = OPENER.painting;
  const origin = `${p.focalX * 100}% ${p.focalY * 100}%`;

  return (
    <div className={`${styles.screen} ${leaving ? styles.isLeaving : ''}`}>
      <Image
        src={p.image}
        alt={`${p.title} by ${p.artist}`}
        fill
        sizes="100vw"
        quality={85}
        preload
        style={{
          objectFit: 'cover',
          objectPosition: origin,
          transform: p.zoom === 1 ? undefined : `scale(${p.zoom})`,
          transformOrigin: origin,
        }}
      />
      <div className={styles.scrim} aria-hidden />
      <p className={styles.name}>jared alonzo</p>
      <div className={styles.controls}>
        <button type="button" className={styles.button} onClick={enter}>
          enter ♪
        </button>
        <button type="button" className={styles.button} onClick={onIdle}>
          idle
        </button>
      </div>
    </div>
  );
}
