'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { ExperienceItem } from '@/data/site';
import styles from '@/app/site.module.css';

type Tab = { id: string; label: string; items: ExperienceItem[] };

function ExperienceList({ items }: { items: ExperienceItem[] }) {
  return (
    <ul className={styles.expList}>
      {items.map(item => (
        <li key={`${item.name}-${item.role}-${item.year}`} className={styles.expRow}>
          <span className={styles.expLogo}>
            <Image src={item.logo} alt="" width={36} height={36} />
          </span>
          <div className={styles.expBody}>
            <div className={styles.expHead}>
              <span className={styles.expName}>{item.name}</span>
              <span className={styles.expYear}>{item.year}</span>
            </div>
            <span className={styles.expRole}>{item.role}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Tabs over a sliding track; the viewport height follows the active panel. */
export default function ExperienceTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const measure = () => {
      const panel = panelRefs.current[active];
      const viewport = viewportRef.current;
      if (panel && viewport) viewport.style.height = `${panel.offsetHeight}px`;
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  return (
    <>
      <div className={styles.tabs} role="tablist" aria-label="Experience type">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === i}
            aria-controls={`panel-${tab.id}`}
            className={styles.tab}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div ref={viewportRef} className={styles.carousel}>
        <div className={styles.track} style={{ transform: `translateX(-${active * 100}%)` }}>
          {tabs.map((tab, i) => (
            <div
              key={tab.id}
              ref={el => { panelRefs.current[i] = el; }}
              id={`panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              aria-hidden={active !== i}
              inert={active !== i}
              className={styles.panel}
            >
              <ExperienceList items={tab.items} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
