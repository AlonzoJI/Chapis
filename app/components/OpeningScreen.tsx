'use client';

import Image from 'next/image';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { OPENER } from '@/data/collection';
import {
  getOpeningSeen,
  getOpeningSeenOnServer,
  markOpeningSeen,
  OPENING_LEAVING_CLASS,
  subscribeOpeningSeen,
} from '@/app/lib/openingSeen';
import { paintingAlt, paintingImageStyle } from '@/app/lib/framing';
import { holdInert } from '@/app/lib/inertBackground';
import { nudgePlayback, startOpener, stopMusic } from '@/app/lib/music';
import styles from './OpeningScreen.module.css';

const FADE_MS = 1200;

export default function OpeningScreen({ onIdle }: { onIdle: () => void }) {
  const seen = useSyncExternalStore(subscribeOpeningSeen, getOpeningSeen, getOpeningSeenOnServer);
  const [leaving, setLeaving] = useState(false);

  // Sentry lives only on the opening screen. Try to autoplay it; if the
  // browser blocks sound, the first click, tap or key press starts it.
  // Entering the site stops it.
  useEffect(() => {
    if (seen) return;
    startOpener();
    const onFirstKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') nudgePlayback();
    };
    window.addEventListener('keydown', onFirstKey);
    return () => window.removeEventListener('keydown', onFirstKey);
  }, [seen]);

  // Keep the page underneath from scrolling or taking keyboard focus while
  // the opening screen is up.
  useEffect(() => {
    if (seen) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = 'hidden';
    const release = holdInert('opening');
    return () => {
      html.style.overflow = previous;
      release();
    };
  }, [seen]);

  if (seen) return null;

  const enter = () => {
    if (leaving) return;
    stopMusic();
    document.documentElement.classList.add(OPENING_LEAVING_CLASS);
    setLeaving(true);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.setTimeout(markOpeningSeen, reduced ? 0 : FADE_MS);
  };

  const p = OPENER.painting;

  return (
    <div
      className={`${styles.screen} ${leaving ? styles.isLeaving : ''}`}
      data-behind="gallery"
      onPointerDown={e => {
        // enter and idle have their own jobs; anywhere else starts the music.
        if (!(e.target instanceof Element && e.target.closest('button'))) nudgePlayback();
      }}
    >
      <Image
        src={p.image}
        alt={paintingAlt(p)}
        fill
        sizes="100vw"
        quality={85}
        preload
        style={paintingImageStyle(p)}
      />
      <div className={styles.scrim} aria-hidden />
      <p className={styles.name}>jared alonzo</p>
      <div className={styles.controls}>
        <button type="button" className={styles.button} onClick={enter} aria-label="enter the site">
          enter
        </button>
        <button type="button" className={styles.button} onClick={onIdle} aria-label="idle: open the painting gallery">
          idle
        </button>
      </div>
    </div>
  );
}
