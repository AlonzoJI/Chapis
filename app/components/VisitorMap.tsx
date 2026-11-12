'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './VisitorMap.module.css';

// ─── Visitor Map ──────────────────────────────────────────────────────
// Shows the CURRENT visitor where the PREVIOUS visitor came from. The
// server (/api/visit) atomically stores your location and returns whoever
// visited just before you. First-ever visitor falls back to their own
// location so the map is never empty.

type Visitor = { city: string; country: string; lat: number; lon: number; ts: number };

function timeAgo(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 10) return 'just now';
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// CARTO Positron tiles. Unkeyed requests get an "API KEY REQUIRED"
// watermarked tile, so the key must be attached as ?key= (not ?api_key=).
// Ref: carto.com/basemaps/apikey — one key covers raster + vector basemaps.
const CARTO_KEY = process.env.NEXT_PUBLIC_CARTO_API_KEY ?? '';
const CARTO_TILE_URL = `https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png${CARTO_KEY ? `?key=${CARTO_KEY}` : ''}`;

export default function VisitorMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  // "previous" is who to display on the map. "isSelf" means we fell back to
  // the current visitor's own coordinates because no prior visitor exists.
  const [previous, setPrevious] = useState<Visitor | null>(null);
  const [isSelf, setIsSelf] = useState(false);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any = null;

    async function init() {
      // Seed the map with what the server already knows so tiles start loading
      // before the ipapi round-trip finishes.
      let seed: Visitor | null = null;
      try {
        const res = await fetch('/api/visit');
        const data = await res.json();
        seed = data.previous;
        if (typeof data.count === 'number') setCount(data.count);
        if (seed) setPrevious(seed);
      } catch {}

      const maplibregl = (await import('maplibre-gl')).default;
      await import('maplibre-gl/dist/maplibre-gl.css');

      const lat = seed?.lat ?? 20;
      const lon = seed?.lon ?? 0;

      map = new maplibregl.Map({
        container: mapRef.current!,
        style: {
          version: 8,
          sources: { carto: { type: 'raster', tiles: [CARTO_TILE_URL], tileSize: 256, attribution: '© CARTO, © OpenStreetMap contributors' } },
          layers: [{ id: 'carto', type: 'raster', source: 'carto', minzoom: 0, maxzoom: 19 }],
        },
        center: [lon, lat],
        zoom: seed ? 4 : 2,
        interactive: true,
        attributionControl: { compact: true },
      });

      const addMarker = (lng: number, lt: number) => {
        const el = document.createElement('div');
        el.style.cssText = 'width:10px;height:10px;border-radius:50%;background:#3b82f6;border:2px solid #fff;box-shadow:0 0 0 2px rgba(59,130,246,0.35);cursor:default;';
        new maplibregl.Marker({ element: el, anchor: 'center' }).setLngLat([lng, lt]).addTo(map);
      };

      if (seed) map.on('load', () => addMarker(seed!.lon, seed!.lat));

      // Look up the current visitor's own coordinates, then register them as
      // the latest visitor. The server returns the visitor who came before us.
      try {
        const r = await fetch('https://ipapi.co/json/');
        const d = await r.json();
        if (typeof d.latitude !== 'number') return;

        const me: Omit<Visitor, 'ts'> = {
          city: d.city || d.region || 'Unknown',
          country: d.country_code || '??',
          lat: d.latitude,
          lon: d.longitude,
        };

        const res = await fetch('/api/visit', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(me),
        });
        const { count: newCount, previous: newPrev } = await res.json();
        if (typeof newCount === 'number') setCount(newCount);

        const display: Visitor = newPrev ?? { ...me, ts: Date.now() };
        setPrevious(display);
        setIsSelf(!newPrev);

        // If the server-returned previous visitor differs from our seed (or
        // there was no seed), reposition the map.
        if (!seed || seed.lat !== display.lat || seed.lon !== display.lon) {
          map.flyTo({ center: [display.lon, display.lat], zoom: 4, duration: seed ? 1200 : 0 });
          map.once('idle', () => addMarker(display.lon, display.lat));
        }
      } catch {}
    }

    init();
    return () => { map?.remove(); };
  }, []);

  const statusLabel = previous
    ? (isSelf
        ? <>You’re the first here · {previous.city}, {previous.country}</>
        : <>{timeAgo(previous.ts)} · {previous.city}, {previous.country}</>)
    : 'Loading…';

  return (
    <div className={styles.widget}>
      <div className={styles.status}>
        <span className={styles.dot} data-live={previous ? 'true' : 'false'} aria-hidden />
        <span className={styles.label}>{statusLabel}</span>
        {count !== null && <span className={styles.count}>{count.toLocaleString()} visitors</span>}
      </div>
      <div ref={mapRef} className={styles.map} />
    </div>
  );
}
