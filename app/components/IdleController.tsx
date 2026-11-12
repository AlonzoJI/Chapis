'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { PAINTINGS, SONGS } from '@/data/collection';
import { OPEN_IDLE_EVENT } from '@/app/lib/idleEvents';
import { playClip, primeRotation, setMusicDebug, startOpener, stopMusic } from '@/app/lib/music';
import { getOpeningSeen } from '@/app/lib/openingSeen';
import IdleGallery, { IDLE_ON_INACTIVITY, INACTIVITY_MS, useInactivity } from './IdleGallery';
import IdleLink from './IdleLink';
import MusicPlayer from './MusicPlayer';
import OpeningScreen from './OpeningScreen';
import styles from './IdleController.module.css';

// Test helpers, read from the URL:
//   ?song=<id>      shows a button that plays just that clip (audio needs a click)
//   ?painting=<id>  opens idle mode on that painting and holds it there
const subscribeNever = () => () => {};
const readParam = (name: string) => () => new URLSearchParams(window.location.search).get(name);
const readSongParam = readParam('song');
const readPaintingParam = readParam('painting');
const noParam = () => null;

/** Owns the opening screen, the idle gallery, the music player and the corner idle link. */
export default function IdleController() {
  const songParam = useSyncExternalStore(subscribeNever, readSongParam, noParam);
  const paintingParam = useSyncExternalStore(subscribeNever, readPaintingParam, noParam);
  const testSong = SONGS.find(s => s.id === songParam) ?? null;
  const testPaintingId = PAINTINGS.some(p => p.id === paintingParam) ? paintingParam : null;

  const [userOpened, setUserOpened] = useState(false);
  const [testPaintingClosed, setTestPaintingClosed] = useState(false);
  const showTestPainting = testPaintingId !== null && !testPaintingClosed;
  const idleOpen = userOpened || showTestPainting;

  // Called from clicks (a user gesture), so the first song may start right away.
  const openIdle = useCallback(() => {
    primeRotation();
    setUserOpened(true);
  }, []);
  const closeIdle = useCallback(() => {
    stopMusic();
    // Back on the opening screen: Sentry plays again.
    if (!getOpeningSeen()) startOpener();
    setUserOpened(false);
    setTestPaintingClosed(true);
  }, []);

  useInactivity(INACTIVITY_MS, openIdle, IDLE_ON_INACTIVITY && !idleOpen);

  useEffect(() => {
    window.addEventListener(OPEN_IDLE_EVENT, openIdle);
    return () => window.removeEventListener(OPEN_IDLE_EVENT, openIdle);
  }, [openIdle]);

  useEffect(() => {
    if (testSong) setMusicDebug(true);
  }, [testSong]);

  return (
    <>
      <IdleLink className={styles.cornerLink} />
      <OpeningScreen onIdle={openIdle} />
      {idleOpen && (
        <IdleGallery onExit={closeIdle} pinnedId={showTestPainting && !userOpened ? testPaintingId : null} />
      )}
      <MusicPlayer />
      {testSong && (
        <div className={styles.testPanel}>
          <span>test clip: {testSong.title} ({testSong.startSec}–{testSong.endSec}s)</span>
          <button type="button" onClick={() => playClip(testSong, 'docked')}>play</button>
        </div>
      )}
    </>
  );
}
