'use client';

import { useEffect, useRef, useState } from 'react';

const experience = [
  { logo: '/logos/autodesk_logo.jpeg', name: 'Autodesk', year: '2026', role: 'Associate Product Manager Intern' },
  { logo: '/logos/capital_one_logo.jpeg', name: 'Capital One', year: '2025', role: 'Associate Product Manager Intern' },
  { logo: '/logos/capital_one_logo.jpeg', name: 'Capital One', year: '2024', role: 'Software Engineer Intern' },
  { logo: '/logos/procter_and_gamble_logo.jpeg', name: 'Procter & Gamble', year: '2023', role: 'Software Engineer Intern' },
  { logo: '/logos/procter_and_gamble_logo.jpeg', name: 'Procter & Gamble', year: '2022', role: 'Software Engineer Intern' },
];

const involvement = [
  { logo: '/logos/buckeye_careers_students_logo.jpeg', name: 'Buckeye Leadership Fellowship', year: '2024–Present', role: '2027 Fellow' },
  { logo: '/logos/mlt_logo.jpeg', name: 'Management Leadership for Tomorrow', year: '2024–Present', role: '2027 Career Prep Fellow' },
  { logo: '/logos/seousa_logo.jpeg', name: 'Sponsors for Educational Opportunity', year: '2025', role: 'Tech Developer' },
  { logo: '/logos/colorstack_logo.jpeg', name: 'ColorStack', year: '2023–Present', role: 'Member' },
  { logo: '/logos/bill__melinda_gates_foundation_logo.jpeg', name: 'Gates Millennium Scholars Program', year: '2023–Present', role: 'Gates Scholar' },
  { logo: '/logos/horatio_alger_association_logo.jpeg', name: 'Horatio Alger Association', year: '2022–Present', role: 'State Scholar' },
];

const programs = [
  { logo: '/logos/bloomberg_logo.jpeg', name: 'Bloomberg', program: 'Decoded: Data at Bloomberg', year: 'Jul–Aug 2025' },
  { logo: '/logos/deloitte_logo.jpeg', name: 'Deloitte', program: 'Leadership Allyship & Mentorship Program', year: 'Mar–Jul 2025' },
  { logo: '/logos/uber_logo.jpeg', name: 'Uber', program: 'Career Prep Fellowship', year: 'Feb–Sep 2024' },
  { logo: '/logos/procter_and_gamble_logo.jpeg', name: 'Procter & Gamble', program: 'Standout Emerging Leaders Camp', year: 'Aug 2024' },
  { logo: '/logos/nvidia_logo.jpeg', name: 'NVIDIA', program: 'Summer Bridge Program', year: 'May–Aug 2024' },
  { logo: '/logos/rsm_logo.jpeg', name: 'RSM US LLP', program: 'RSM Excellence Academy', year: 'Jul 2024' },
  { logo: '/logos/accenture_logo.jpeg', name: 'Accenture', program: 'Elevate to Innovate Externship', year: 'May 2024' },
  { logo: '/logos/capital_one_logo.jpeg', name: 'Capital One', program: 'First-Gen Focus', year: 'Jan–Jun 2024' },
  { logo: '/logos/hrt_logo.jpeg', name: 'Hudson River Trading', program: 'Inside HRT', year: 'Apr 2024' },
  { logo: '/logos/google_logo.jpeg', name: 'Google', program: 'Latinx Student Leadership Summit', year: 'Apr 2024' },
];

const projects = [
  { name: 'Project One', desc: 'A short description of what this project does and what problem it solves.' },
  { name: 'Project Two', desc: 'A short description of what this project does and what problem it solves.' },
  { name: 'Project Three', desc: 'A short description of what this project does and what problem it solves.' },
  { name: 'Project Four', desc: 'A short description of what this project does and what problem it solves.' },
  { name: 'Project Five', desc: 'A short description of what this project does and what problem it solves.' },
  { name: 'Project Six', desc: 'A short description of what this project does and what problem it solves.' },
];

const posts = [
  { title: 'Coming soon: first post title here', date: '2026' },
  { title: 'Another post placeholder', date: '2026' },
  { title: 'One more post placeholder', date: '2025' },
];

type StoredVisitor = { city: string; country: string; lat: number; lon: number; ts: number };

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

function VisitorMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<{ city: string; country: string; ts: number; live: boolean } | null>(null);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any = null;

    async function init() {
      const KEY_LAST = 'portfolio_last_visitor_v2';
      const KEY_COUNT = 'portfolio_visitor_count_v2';

      const getCount = () => parseInt(localStorage.getItem(KEY_COUNT) || '0');
      const incrementCount = () => {
        const next = getCount() + 1;
        localStorage.setItem(KEY_COUNT, String(next));
        return next;
      };
      const getStored = () => {
        try { const r = localStorage.getItem(KEY_LAST); return r ? JSON.parse(r) : null; } catch { return null; }
      };
      const setStored = (d: StoredVisitor) => localStorage.setItem(KEY_LAST, JSON.stringify(d));

      const c = getCount();
      if (c > 0) setCount(c);

      const stored = getStored();
      if (stored) {
        setStatus({ city: stored.city, country: stored.country, ts: stored.ts, live: false });
      }

      const maplibregl = (await import('maplibre-gl')).default;
      await import('maplibre-gl/dist/maplibre-gl.css');

      const lat = stored?.lat ?? 39.9;
      const lon = stored?.lon ?? -82.9;

      map = new maplibregl.Map({
        container: mapRef.current!,
        style: {
          version: 8,
          sources: {
            carto: {
              type: 'raster',
              tiles: ['https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png'],
              tileSize: 256,
              attribution: '© CARTO, © OpenStreetMap contributors',
            },
          },
          layers: [{ id: 'carto', type: 'raster', source: 'carto', minzoom: 0, maxzoom: 19 }],
        },
        center: [lon, lat],
        zoom: 4,
        interactive: true,
        attributionControl: { compact: true },
      });

      const addMarker = (lng: number, lt: number) => {
        const el = document.createElement('div');
        el.style.cssText = 'width:10px;height:10px;border-radius:50%;background:#3b82f6;border:2px solid #fff;box-shadow:0 0 0 2px rgba(59,130,246,0.35);cursor:default;';
        new maplibregl.Marker({ element: el, anchor: 'center' }).setLngLat([lng, lt]).addTo(map);
      };

      if (stored) map.on('load', () => addMarker(lon, lat));

      try {
        const r = await fetch('https://ipapi.co/json/');
        const d = await r.json();
        if (d.latitude) {
          const fresh = {
            city: d.city || d.region || 'Unknown',
            country: d.country_code || '??',
            lat: d.latitude,
            lon: d.longitude,
            ts: Date.now(),
          };
          setStored(fresh);
          const newCount = incrementCount();
          setCount(newCount);
          setStatus({ ...fresh, live: true });
          map.flyTo({ center: [fresh.lon, fresh.lat], zoom: 5, duration: stored ? 1200 : 0 });
          map.once('idle', () => addMarker(fresh.lon, fresh.lat));
        }
      } catch {}
    }

    init();
    return () => { map?.remove(); };
  }, []);

  return (
    <div style={{ fontFamily: 'var(--mono)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, minHeight: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted)' }}>
          {status ? (
            <>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: status.live ? '#84a844' : '#888',
                flexShrink: 0, display: 'inline-block',
              }} />
              <span>
                {status.live
                  ? <strong style={{ color: 'var(--text)' }}>{timeAgo(status.ts)}</strong>
                  : timeAgo(status.ts)}
                <span style={{ color: 'var(--muted)' }}> · {status.city}, {status.country}</span>
              </span>
            </>
          ) : (
            <span style={{ color: 'var(--muted)' }}>Loading…</span>
          )}
        </div>
        {count !== null && (
          <span style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--muted)', border: '0.5px solid var(--border)', borderRadius: 20, padding: '3px 10px' }}>
            <span style={{ color: 'var(--text)' }}>{count.toLocaleString()}</span> visitors
          </span>
        )}
      </div>
      <div
        ref={mapRef}
        style={{ width: '100%', height: 360, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', background: '#e8eaed' }}
      />
      <style>{`
        .maplibregl-ctrl-attrib { font-family: monospace !important; font-size: 9px !important; }
        .maplibregl-ctrl-group { border-radius: 8px !important; overflow: hidden; }
        .maplibregl-ctrl-group button { background: white !important; }
      `}</style>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: oklch(0.11 0.008 255);
          --bg2: oklch(0.15 0.008 255);
          --border: oklch(0.22 0.008 255);
          --muted: oklch(0.52 0.008 255);
          --text: oklch(0.90 0.006 255);
          --max: 680px;
          --serif: 'EB Garamond', Georgia, serif;
          --mono: 'DM Mono', monospace;
        }
        html { scroll-behavior: smooth; background: var(--bg); }
        body { background: var(--bg); color: var(--text); font-family: var(--serif); font-size: 16px; line-height: 1.7; -webkit-font-smoothing: antialiased; }
        nav { position: sticky; top: 0; z-index: 100; background: var(--bg); border-bottom: 1px solid var(--border); padding: 0 24px; }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; max-width: var(--max); margin: 0 auto; height: 52px; }
        nav a.nav-name { font-size: 14px; font-weight: 500; color: var(--text); text-decoration: none; font-family: var(--serif); }
        nav ul { display: flex; gap: 28px; list-style: none; }
        nav ul a { font-size: 13px; color: var(--muted); text-decoration: none; transition: color 0.15s; font-family: var(--serif); }
        nav ul a:hover { color: var(--text); }
        main { max-width: var(--max); margin: 0 auto; padding: 0 24px 120px; }
        section { padding-top: 72px; }
        h2 { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 32px; padding-bottom: 12px; border-bottom: 1px solid var(--border); font-family: var(--mono); }
        .item { display: grid; grid-template-columns: 48px 1fr; gap: 0 18px; padding: 20px 0; border-bottom: 1px solid var(--border); }
        .item:first-child { border-top: 1px solid var(--border); }
        .item-logo { width: 36px; height: 36px; border-radius: 8px; background: var(--bg2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-family: var(--mono); font-size: 10px; color: var(--muted); overflow: hidden; flex-shrink: 0; margin-top: 2px; }
        .item-logo img { width: 100%; height: 100%; object-fit: cover; border-radius: 7px; }
        .item-body { display: flex; flex-direction: column; gap: 2px; }
        .item-header { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
        .item-name { font-size: 14px; font-weight: 500; color: var(--text); font-family: var(--serif); }
        .item-year { font-size: 11px; color: var(--muted); font-family: var(--mono); white-space: nowrap; }
        .item-role { font-size: 13px; color: oklch(0.65 0.006 255); font-family: var(--serif); }
        .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .project-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 20px; transition: border-color 0.15s; cursor: pointer; }
        .project-card:hover { border-color: oklch(0.36 0.008 255); }
        .project-placeholder { width: 100%; height: 80px; background: repeating-linear-gradient(45deg,transparent,transparent 4px,oklch(0.18 0.008 255) 4px,oklch(0.18 0.008 255) 5px); border-radius: 6px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; font-family: var(--mono); font-size: 10px; color: oklch(0.35 0.008 255); letter-spacing: 0.05em; }
        .project-name { font-size: 14px; font-weight: 500; color: var(--text); margin-bottom: 6px; font-family: var(--serif); }
        .project-desc { font-size: 13px; color: var(--muted); line-height: 1.55; font-family: var(--serif); }
        .blog-item { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; padding: 18px 0; border-bottom: 1px solid var(--border); cursor: pointer; }
        .blog-item:first-child { border-top: 1px solid var(--border); }
        .blog-title { font-size: 14px; color: oklch(0.72 0.006 255); transition: color 0.12s; font-family: var(--serif); }
        .blog-item:hover .blog-title { color: var(--text); }
        .blog-date { font-size: 11px; color: var(--muted); font-family: var(--mono); white-space: nowrap; }
        footer { max-width: var(--max); margin: 0 auto; padding: 32px 24px 48px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); flex-wrap: wrap; gap: 12px; }
        footer a { font-size: 13px; color: var(--muted); text-decoration: none; transition: color 0.15s; font-family: var(--serif); }
        footer a:hover { color: var(--text); }
        footer .copy { font-size: 11px; color: oklch(0.38 0.008 255); font-family: var(--mono); }
        @media (max-width: 520px) { .projects-grid { grid-template-columns: 1fr; } nav ul { gap: 18px; } footer { flex-direction: column; gap: 16px; } }
      `}</style>

      <nav>
        <div className="nav-inner">
          <a className="nav-name" href="#intro">Jared Alonzo</a>
          <ul>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#involvement">Involvement</a></li>
            <li><a href="#programs">Programs</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>
      </nav>

      <main>
        <section id="intro" style={{ paddingTop: 64 }}>
          <h1 style={{ fontSize: 28, fontWeight: 400, letterSpacing: '-0.01em', marginBottom: 4, fontFamily: 'var(--serif)' }}>Jared Alonzo</h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--mono)', marginBottom: 32 }}>Product + Engineering</p>
          <p style={{ color: 'oklch(0.76 0.006 255)', fontSize: 15.5, marginBottom: 16 }}>Welcome to my portfolio. You can call me <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Chapis</strong>. I am a first-generation Guatemalan-American who grew up in a low-income environment.</p>
          <p style={{ color: 'oklch(0.76 0.006 255)', fontSize: 15.5, marginBottom: 16 }}>I have always been interested in tech and engineering a better world. After dozens of summer camps, I knew I wanted to be an engineer, and after time interning I knew I wanted to be in product.</p>
          <p style={{ color: 'oklch(0.76 0.006 255)', fontSize: 15.5, marginBottom: 16 }}>I am passionate about Social Innovation, Entrepreneurship, and International Travel. I am a Cincinnati Bengals, Ohio State Buckeyes, Liverpool FC, and Denver Nuggets fan.</p>
          <p style={{ color: 'oklch(0.76 0.006 255)', fontSize: 15.5 }}>Currently studying <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Computer Science and Engineering + Theoretical Mathematics</strong> at <strong style={{ color: 'var(--text)', fontWeight: 500 }}>The Ohio State University</strong>, with a minor in Education.</p>
        </section>

        <section id="experience">
          <h2>Experience</h2>
          <div>
            {experience.map((e, i) => (
              <div key={i} className="item">
                <div className="item-logo"><img src={e.logo} alt={e.name} /></div>
                <div className="item-body">
                  <div className="item-header">
                    <span className="item-name">{e.name}</span>
                    <span className="item-year">{e.year}</span>
                  </div>
                  <span className="item-role">{e.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="involvement">
          <h2>Involvement</h2>
          <div>
            {involvement.map((e, i) => (
              <div key={i} className="item">
                <div className="item-logo"><img src={e.logo} alt={e.name} /></div>
                <div className="item-body">
                  <div className="item-header">
                    <span className="item-name">{e.name}</span>
                    <span className="item-year">{e.year}</span>
                  </div>
                  <span className="item-role">{e.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="programs">
          <h2>Professional Development</h2>
          <div>
            {programs.map((e, i) => (
              <div key={i} className="item">
                <div className="item-logo"><img src={e.logo} alt={e.name} /></div>
                <div className="item-body">
                  <div className="item-header">
                    <span className="item-name">{e.program}</span>
                    <span className="item-year">{e.year.split(' ').pop()}</span>
                  </div>
                  <span className="item-role">{e.name}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects">
          <h2>Projects</h2>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div key={i} className="project-card">
                <div className="project-placeholder">project screenshot</div>
                <div className="project-name">{p.name}</div>
                <div className="project-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="blog">
          <h2>Blog</h2>
          <div>
            {posts.map((p, i) => (
              <div key={i} className="blog-item">
                <span className="blog-title">{p.title}</span>
                <span className="blog-date">{p.date}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="last-visitor">
          <h2>Last Visitor</h2>
          <VisitorMap />
        </section>
      </main>

      <footer>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="https://github.com/AlonzoJI" target="_blank" rel="noopener">GitHub</a>
          <a href="https://x.com/chapisalonzo" target="_blank" rel="noopener">X</a>
          <a href="https://www.linkedin.com/in/jared-alonzo/" target="_blank" rel="noopener">LinkedIn</a>
        </div>
        <span className="copy">2026 Jared Alonzo</span>
      </footer>
    </>
  );
}