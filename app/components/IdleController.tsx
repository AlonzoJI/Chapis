'use client';

import { useCallback, useEffect, useState } from 'react';
import { OPEN_IDLE_EVENT } from '@/app/lib/idleEvents';
import IdleGallery, { IDLE_ON_INACTIVITY, INACTIVITY_MS, useInactivity } from './IdleGallery';
import IdleLink from './IdleLink';
import OpeningScreen from './OpeningScreen';
import styles from './IdleController.module.css';

/** Owns the opening screen, the idle gallery overlay and the corner idle link. */
export default function IdleController() {
  const [idleOpen, setIdleOpen] = useState(false);
  const openIdle = useCallback(() => setIdleOpen(true), []);
  const closeIdle = useCallback(() => setIdleOpen(false), []);

  useInactivity(INACTIVITY_MS, openIdle, IDLE_ON_INACTIVITY && !idleOpen);

  useEffect(() => {
    window.addEventListener(OPEN_IDLE_EVENT, openIdle);
    return () => window.removeEventListener(OPEN_IDLE_EVENT, openIdle);
  }, [openIdle]);

  return (
    <>
      <IdleLink className={styles.cornerLink} />
      <OpeningScreen onIdle={openIdle} />
      {idleOpen && <IdleGallery onExit={closeIdle} />}
    </>
  );
}
