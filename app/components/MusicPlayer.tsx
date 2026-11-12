'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import {
  getMusicState,
  getServerMusicState,
  initMusic,
  stopMusic,
  subscribeMusic,
} from '@/app/lib/music';
import styles from './MusicPlayer.module.css';

/**
 * The single Spotify embed. It is never moved in the DOM (moving an iframe
 * reloads it); only its position changes with the music mode. Spotify
 * requires the player to stay visible while it plays.
 */
export default function MusicPlayer() {
  const embedRef = useRef<HTMLDivElement>(null);
  const music = useSyncExternalStore(subscribeMusic, getMusicState, getServerMusicState);

  useEffect(() => {
    if (embedRef.current) initMusic(embedRef.current);
  }, []);

  const visible = music.mode !== 'hidden' && music.status !== 'off';

  return (
    <div
      className={`${styles.card} ${music.mode === 'gallery' ? styles.gallery : styles.docked} ${visible ? styles.visible : ''}`}
      data-music-card
      aria-hidden={!visible}
      inert={!visible}
    >
      {music.status === 'blocked' && (
        <p className={styles.prompt}>
          <span aria-hidden>♪</span> Tap play to start the music
        </p>
      )}
      <div className={styles.frame}>
        <div ref={embedRef} className={styles.embed} />
        {music.mode === 'docked' && (
          <button type="button" className={styles.close} onClick={stopMusic} aria-label="Stop music">
            ×
          </button>
        )}
      </div>
    </div>
  );
}
