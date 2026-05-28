'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────

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
  { logo: '/logos/bill__melinda_gates_foundation_logo.jpeg', name: 'Gates Foundation', year: '2023–Present', role: 'Gates Scholar' },
  { logo: '/logos/horatio_alger_association_logo.jpeg', name: 'Horatio Alger Association', year: '2022–Present', role: 'State Scholar' },
];

const programs = [
  { logo: '/logos/bloomberg_logo.jpeg', name: 'Bloomberg', program: 'Decoded: Data at Bloomberg', year: '2025' },
  { logo: '/logos/deloitte_logo.jpeg', name: 'Deloitte', program: 'Leadership Allyship & Mentorship Program', year: '2025' },
  { logo: '/logos/uber_logo.jpeg', name: 'Uber', program: 'Career Prep Fellowship', year: '2024' },
  { logo: '/logos/procter_and_gamble_logo.jpeg', name: 'Procter & Gamble', program: 'Standout Emerging Leaders Camp', year: '2024' },
  { logo: '/logos/nvidia_logo.jpeg', name: 'NVIDIA', program: 'Summer Bridge Program', year: '2024' },
  { logo: '/logos/rsm_logo.jpeg', name: 'RSM US LLP', program: 'RSM Excellence Academy', year: '2024' },
  { logo: '/logos/accenture_logo.jpeg', name: 'Accenture', program: 'Elevate to Innovate Externship', year: '2024' },
  { logo: '/logos/capital_one_logo.jpeg', name: 'Capital One', program: 'First-Gen Focus', year: '2024' },
  { logo: '/logos/hrt_logo.jpeg', name: 'Hudson River Trading', program: 'Inside HRT', year: '2024' },
  { logo: '/logos/google_logo.jpeg', name: 'Google', program: 'Latinx Student Leadership Summit', year: '2024' },
];

const projects = [
  { name: 'Hue — AI Language Coach', desc: 'AI-powered English fluency coach for ESL learners. Hue grades speaking through natural 1:1 conversations in a gamified format.', tags: ['React', 'TypeScript', 'Gemini 2.5'], link: 'https://hue-teal.vercel.app/' },
  { name: 'Hue iOS', desc: 'Native iOS port of Hue, bringing AI fluency coaching to iPhone with a JavaScript backend.', tags: ['Swift', 'Xcode', 'Node'], link: 'https://hue-teal.vercel.app/' },
  { name: 'QuikChek', desc: 'Mobile-first news + fact-checking app for Gen Z. Verifies TikTok links in real time using audio transcription and multi-source NLP.', tags: ['React Native', 'NLP', 'Audio'], link: 'https://quik-chek.vercel.app' },
  { name: 'SkillBridge', desc: 'A CLI that critiques your résumé and generates a new one from scratch. Parses PDF/DOCX, drafts impact bullets with GPT, outputs LaTeX.', tags: ['Python', 'GPT-3.5', 'LaTeX'], link: 'https://github.com/AlonzoJI/SkillBridge' },
  { name: 'NetPay', desc: 'Rails app for splitting trip expenses. Creates trips, tracks participants and expenses, and computes a minimal settlement graph.', tags: ['Rails', 'PostgreSQL'], link: 'https://github.com/cse3901-osu-2026sp-910/hexcode_final_project' },
  { name: 'Curriculum Visualization', desc: 'Interactive 4-year map of OSU CS&E. Hover any course to highlight its full prereq/postreq chain across all 8 semesters.', tags: ['D3', 'Graph traversal'], link: 'https://github.com/cse3901-osu-2026sp-910/hexcode_vis' },
];

const techCategories: Array<{ name: string; items: string[] }> = [
  { name: 'Languages', items: ['C/C++', 'Python', 'TypeScript', 'JavaScript', 'Java', 'Golang', 'Ruby', 'Swift/SwiftUI', 'SQL', 'HTML/CSS', 'kdb+/q'] },
  { name: 'Frameworks & Libraries', items: ['React', 'Next.js', 'Node.js', 'Flask', 'Django', 'Rails', 'NumPy', 'pandas', 'TailwindCSS', 'Storybook.js', 'discord.js'] },
  { name: 'Tools & Infrastructure', items: ['Git', 'Docker', 'AWS', 'CI/CD', 'MongoDB', 'PostgreSQL', 'Aurora DB', 'Terraform', 'Jira', 'Agile'] },
];

type Post = { date: string; title: string; lede?: string; hero?: string; paragraphs: string[] };

const posts: Post[] = [
  {
    date: '2026', title: 'The Product Builder',
    hero: 'https://damassets.autodesk.net/content/dam/autodesk/images/customer-stories/long-format-customer-story/hdr-apm-walk-train-thumb-1172x660.png',
    paragraphs: [
      'About eight months ago I gave a talk on product strategy to my Management Leadership for Tomorrow Career Prep cohort. I have been thinking about it lately and honestly I would scrap most of it.',
      'Not because the content was wrong. The frameworks were fine. The slide deck looked good. But I spent an hour talking about how to think about product and almost no time talking about how to build it. That is the wrong talk to give right now.',
      'The PM role is shifting and it is shifting fast. The archetype that is winning right now is not the PM who writes the best PRD or runs the tightest sprint. It is the PM who can actually sit down and build something. Ship a prototype over a weekend. Open a codebase and understand what is happening. Close the gap between the idea and the thing.',
      'I did not take vibe coding seriously until I brought it up casually over a game of cards with friends. One of them is a business analyst and she told me it had completely changed how she worked. She was building things she would have had to request from engineering six months ago. That conversation changed how I thought about what was possible.',
      'I started using Claude Code shortly after that. You know what it is. The first time I used it I gave it a rough description of what I wanted to build and watched it work through the problem. It was not perfect but it was fast and it gave me something real to react to. That feedback loop, idea to prototype to iteration, used to take days. Now it takes hours. It is useful but expensive so I try to use it sparingly.',
      'The closest thing I can compare it to is learning Ruby on Rails for the first time. Rails gives you so much out of the box that you can have something running in minutes. Scaffolding, routing, models, all of it just appears. The danger with Rails is that you can build without understanding what you built. Claude Code has the same energy. It moves fast and it fills in gaps you did not know you had. The difference is that with Rails the magic is predictable. With Claude Code the output depends entirely on how well you can describe what you want. That skill, knowing how to prompt, knowing how to react to what comes back, is its own kind of technical literacy. It is not the same as knowing how to code but it is not nothing either.',
      'This website is a product of that shift. I built it using Claude Code and Next.js. I did not start with a design system or a component library. I started with a conversation. I described what I wanted, Claude Code scaffolded it and I iterated from there. The visitor map, the tile proxy, the blog, all of it came together through that process. I learned more about Next.js in two days of building than I would have in two weeks of reading documentation.',
      'That is what vibe coding actually is at its best. It is not about replacing engineering skills. It is about compressing the distance between having an idea and understanding whether it works. For a PM that compression is everything.',
      'When I went through interviews this cycle I leaned too hard into strategy and too little on this. Companies kept asking me what I had built. Not what I had managed or prioritized or shipped through a team. What had I personally built. That question used to feel unfair. Now I think it is exactly the right question.',
      'The PM who can build has a different conversation with engineering. They can prototype instead of speculate. They can speak with specificity about what is hard and what is not. They earn a different kind of trust.',
      'If I gave that talk again I would spend ten minutes on frameworks and fifty minutes on tools. I would walk through Claude Code and Cursor and Replit. I would talk about what it feels like to go from zero to something in a day. I would tell people that the gap between product and engineering is closing and the PMs who close it themselves are going to have an enormous advantage.',
      'Thank you to James Silva for the opportunity and for pushing back thoughtfully in the comments. If you are on campus at Ohio State feel free to connect. I am working on a few things this summer to help students break into product and I would love to share more soon.',
    ],
  },
  {
    date: '2026', title: 'What Food Means',
    hero: 'https://www.lefoodist.com/images/A_NEW_WEBSITE/Product_Pages/cooking_class__and_lunch_steps/Step_1_of_Morning_Cooking_Class_and_Lunch_1.jpg',
    lede: 'What does food mean to you?',
    paragraphs: [
      'Food means a lot to me. Growing up it carried worry and anxiety around my body and around money. But it was also a passion. A focus activity in a world full of distractions. A connection to my roots, a love language and a substance that just fuels my body. Food has always held two truths at once for me and I have never fully figured out how to reconcile them.',
      'I am a Francophile. I think it was the football and the busy streets that got my 18 year old self’s attention. France felt like a place that took things seriously in a way that I respected but did not fully understand yet.',
      'I had the chance to revisit France while couch surfing in March. It was a pleasure to take in the city and share meals with friends. But what really pulled me back into Paris was the food. That is a strange thing for me to say because I think my taste in food has always been defined by seasoning, quantity and practicality. Those are Latin values around food. You season everything. You feed everyone. You do not waste anything. French cuisine at first glance feels like the opposite of all that.',
      'After speaking with my chef friend Paulo who is from São Paulo I started to understand the connection better. Paulo helped me see that French cuisine is not about restraint for its own sake. It is about intention. Every technique exists for a reason. Every ingredient is chosen. There is a discipline to it that once you understand it starts to feel less foreign and more familiar.',
      'That conversation led me to Le Foodist in Paris. Le Foodist runs cooking classes and market tours in the heart of the city and I signed up not knowing exactly what to expect. What I found was something I did not anticipate. The class was less about following a recipe and more about understanding why. Why you build a sauce a certain way. Why temperature matters at each step. Why the French treat the act of cooking as something worth slowing down for.',
      'For someone who grew up eating food that was made fast and made with love those two things always felt like they could not coexist. Le Foodist proved me wrong. The food we made that morning was simple. It was also the best thing I ate in Paris.',
      'I left that kitchen thinking about my grandmother’s cooking. About the way she moved through a kitchen without measuring anything. About how that same confidence and intention exists in both traditions even if the results taste completely different. Food does not have to come from the same place to come from the same feeling.',
      'I am still figuring out what food means to me. But I think it means more than I used to let myself admit.',
    ],
  },
  {
    date: '2025', title: 'The Sign',
    hero: 'https://www.cincinnati.com/gcdn/authoring/authoring-images/2025/05/28/PCIN/83896046007-cincinnati-sign.jpg',
    paragraphs: [
      'Imagine this. You are traveling the world and after hearing so many locals talk about their homes you feel your brain chemistry start to shift. After all that you land back home in Hebron, Kentucky at Cincinnati/Northern Kentucky International Airport. You are disappointed with your life decisions. You are on I-275 N and you see it. An ugly old beaten up sign that reminds you of the gray nights from your childhood. You drive past a disappointing skyline and then you see it. The CINCINNATI sign.',
      'That old sign was the best possible representation of the city. It was romantic in the way that only ugly things can be romantic. It was ugly like the city. I always imagined Cincinnati like drinking a martini at an airport bar or smoking a cigar near the Ohio River. There was something honest about it.',
      'I loved driving up from CVG just to see that dirty sign with its flickering lights. It felt authentic in a way that very few things in mid-sized American cities still do. It did not try to be anything it was not. It just sat there on the hillside looking tired and a little broken and somehow perfect.',
      'Cincinnati has always been a city that does not get enough credit. It sits in this strange middle space between the Midwest and the South, between old money and working class grit, between a city trying to grow and a city that remembers when it already was something. The sign captured all of that without trying.',
      'The new sign is cleaner. It is brighter and more legible and probably a better civic investment. I understand why the city did it. Cincinnati has spent the last decade trying to shake the rust off and show the country that it is worth paying attention to. The new sign fits that story.',
      'But it feels disingenuous. It looks like it could be anywhere. It does not have the weight of a place that has actually lived through something. The old sign had that weight. You could feel the decades in it.',
      'That has been my reality and the reality of this city for the past 20 years. Cincinnati keeps trying to become something new and in doing that it keeps leaving behind the things that made it worth coming home to in the first place.',
    ],
  },
];

// ─── Graph: Q₃ (3-cube hypercube). 8 vertices, 12 edges. ─────────────
// Sections traverse the cube in Gray-code order, so each step is a single edge.

type CubeVertex = { id: string; label: string; full: string; section: string };

const NODES: CubeVertex[] = [
  { id: 'intro',       label: '000', full: 'Intro',       section: '#intro' },
  { id: 'experience',  label: '001', full: 'Experience',  section: '#experience' },
  { id: 'involvement', label: '011', full: 'Involvement', section: '#experience' },
  { id: 'programs',    label: '010', full: 'Programs',    section: '#experience' },
  { id: 'projects',    label: '110', full: 'Projects',    section: '#projects' },
  { id: 'writing',     label: '111', full: 'Writing',     section: '#writing' },
  { id: 'visitor',     label: '101', full: 'Visitor',     section: '#last-visitor' },
  { id: 'contact',     label: '100', full: 'Contact',     section: '#contact' },
];

// Project a binary label (e.g. '101') to a 2D cabinet-projection position.
// Bit 2 = depth (back), bit 1 = vertical, bit 0 = horizontal.
const SCALE = 84;
const DEPTH_X = 40;
const DEPTH_Y = -40;

function cubePos(label: string) {
  const bz = label.charCodeAt(0) - 48; // back
  const by = label.charCodeAt(1) - 48; // top (SVG-flipped)
  const bx = label.charCodeAt(2) - 48; // right
  return {
    x: (bx === 0 ? -1 : 1) * SCALE + bz * DEPTH_X,
    y: (by === 0 ?  1 : -1) * SCALE + bz * DEPTH_Y,
    back: bz === 1,
  };
}

// All pairs of vertices that differ in exactly one bit (Hamming distance 1).
const EDGES: Array<{ a: string; b: string; kind: 'front' | 'back' | 'connector' }> = (() => {
  const out: Array<{ a: string; b: string; kind: 'front' | 'back' | 'connector' }> = [];
  for (let i = 0; i < NODES.length; i++) {
    for (let j = i + 1; j < NODES.length; j++) {
      const li = parseInt(NODES[i].label, 2);
      const lj = parseInt(NODES[j].label, 2);
      const diff = li ^ lj;
      if (diff > 0 && (diff & (diff - 1)) === 0) {
        const aBack = NODES[i].label[0] === '1';
        const bBack = NODES[j].label[0] === '1';
        const kind = aBack && bBack ? 'back' : (!aBack && !bBack ? 'front' : 'connector');
        out.push({ a: NODES[i].id, b: NODES[j].id, kind });
      }
    }
  }
  return out;
})();

// ─── Cube3D component ────────────────────────────────────────────────

type CubeProps = {
  size: number;
  active?: string | null;
  showLabels?: boolean;
  interactive?: boolean;
  building?: boolean;       // play the build-in animation
  onNodeClick?: (id: string) => void;
  className?: string;
};

function Cube3D({ size, active, showLabels, interactive, building, onNodeClick, className }: CubeProps) {
  const positions = NODES.reduce((acc, n) => { acc[n.id] = cubePos(n.label); return acc; }, {} as Record<string, ReturnType<typeof cubePos>>);

  return (
    <svg
      width={size}
      height={size}
      viewBox="-140 -140 280 280"
      className={`cube ${building ? 'is-building' : ''} ${className ?? ''}`}
      aria-hidden="true"
    >
      <g className="cube-edges">
        {EDGES.map((e, i) => {
          const pa = positions[e.a], pb = positions[e.b];
          return (
            <line
              key={i}
              x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
              className={`cube-edge cube-edge-${e.kind}`}
              pathLength={1}
              style={{ ['--ei' as string]: i } as React.CSSProperties}
            />
          );
        })}
      </g>
      <g className="cube-nodes">
        {NODES.map((n, i) => {
          const p = positions[n.id];
          const isActive = active === n.id;
          return (
            <g
              key={n.id}
              className={`cube-node-group ${p.back ? 'is-back' : 'is-front'} ${isActive ? 'is-active' : ''} ${interactive ? 'is-interactive' : ''}`}
              style={{ ['--tx' as string]: `${p.x}px`, ['--ty' as string]: `${p.y}px`, ['--ni' as string]: i } as React.CSSProperties}
              onClick={interactive && onNodeClick ? (e) => { e.stopPropagation(); onNodeClick(n.id); } : undefined}
            >
              <circle cx="0" cy="0" r={p.back ? 3.4 : 4.4} className="cube-node" />
              {interactive && <circle cx="0" cy="0" r={14} className="cube-node-hit" />}
              {showLabels && (
                <text
                  x="0"
                  y={p.back ? -10 : 14}
                  className="cube-label"
                  textAnchor="middle"
                  dominantBaseline={p.back ? 'auto' : 'hanging'}
                >
                  {n.full}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

// ─── CubeNav: single morphing widget (loading → docked → expanded) ──

type CubeMode = 'loading' | 'docked' | 'expanded';

function CubeNav({
  mode,
  active,
  onExpand,
  onCollapse,
  onNodeClick,
}: {
  mode: CubeMode;
  active: string | null;
  onExpand: () => void;
  onCollapse: () => void;
  onNodeClick: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Click-outside closes when expanded
  useEffect(() => {
    if (mode !== 'expanded') return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onCollapse();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mode, onCollapse]);

  return (
    <div
      ref={ref}
      className={`cube-nav is-${mode}`}
      role={mode === 'docked' ? 'button' : undefined}
      aria-label={mode === 'docked' ? 'Open navigation cube' : 'Section navigation cube'}
      tabIndex={mode === 'docked' ? 0 : -1}
      onClick={() => { if (mode === 'docked') onExpand(); }}
      onKeyDown={(e) => { if (mode === 'docked' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onExpand(); } }}
    >
      <Cube3D
        size={280}
        active={active}
        showLabels={mode !== 'docked'}
        interactive={mode === 'expanded'}
        building={mode === 'loading'}
        onNodeClick={onNodeClick}
      />
      {mode === 'docked' && <span className="cube-nav-hint">Q₃</span>}
    </div>
  );
}

// ─── LoadingScreen: just the dark overlay (cube lives in CubeNav) ────

const VISIT_KEY = 'portfolio_first_visit_v1';

function LoadingOverlay({ fading }: { fading: boolean }) {
  return (
    <div className={`loader-bg ${fading ? 'is-fading' : ''}`} aria-hidden="true">
      <div className="loader-stats" aria-hidden="true">
        <span className="ls-1">Q₃ = (V, E)</span>
        <span className="ls-2">|V| = 8</span>
        <span className="ls-3">|E| = 12</span>
        <span className="ls-4">— booting graph —</span>
      </div>
    </div>
  );
}

// ─── Visitor Map (unchanged) ──────────────────────────────────────────

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
      const getStored = () => { try { const r = localStorage.getItem(KEY_LAST); return r ? JSON.parse(r) : null; } catch { return null; } };
      const setStored = (d: StoredVisitor) => localStorage.setItem(KEY_LAST, JSON.stringify(d));
      const stored = getStored();
      if (stored) setStatus({ city: stored.city, country: stored.country, ts: stored.ts, live: false });
      try {
        const res = await fetch('/api/visit');
        const { count: globalCount } = await res.json();
        setCount(globalCount);
      } catch {}
      const maplibregl = (await import('maplibre-gl')).default;
      await import('maplibre-gl/dist/maplibre-gl.css');
      const lat = stored?.lat ?? 39.9;
      const lon = stored?.lon ?? -82.9;
      map = new maplibregl.Map({
        container: mapRef.current!,
        style: {
          version: 8,
          sources: { carto: { type: 'raster', tiles: ['https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png'], tileSize: 256, attribution: '© CARTO, © OpenStreetMap contributors' } },
          layers: [{ id: 'carto', type: 'raster', source: 'carto', minzoom: 0, maxzoom: 19 }],
        },
        center: [lon, lat], zoom: 4, interactive: true, attributionControl: { compact: true },
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
          const fresh = { city: d.city || d.region || 'Unknown', country: d.country_code || '??', lat: d.latitude, lon: d.longitude, ts: Date.now() };
          setStored(fresh);
          try { const res = await fetch('/api/visit', { method: 'POST' }); const { count: newCount } = await res.json(); setCount(newCount); } catch {}
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
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: status.live ? '#84a844' : '#888', flexShrink: 0, display: 'inline-block' }} />
              <span>
                {status.live ? <strong style={{ color: 'var(--text)' }}>{timeAgo(status.ts)}</strong> : timeAgo(status.ts)}
                <span style={{ color: 'var(--muted)' }}> · {status.city}, {status.country}</span>
              </span>
            </>
          ) : <span style={{ color: 'var(--muted)' }}>Loading…</span>}
        </div>
        {count !== null && (
          <span style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--muted)', border: '0.5px solid var(--border)', borderRadius: 20, padding: '3px 10px' }}>
            <span style={{ color: 'var(--text)' }}>{count.toLocaleString()}</span> visitors
          </span>
        )}
      </div>
      <div ref={mapRef} style={{ width: '100%', height: 360, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', background: '#e8eaed' }} />
      <style>{`
        .maplibregl-ctrl-attrib { font-family: monospace !important; font-size: 9px !important; }
        .maplibregl-ctrl-group { border-radius: 8px !important; overflow: hidden; }
        .maplibregl-ctrl-group button { background: white !important; }
      `}</style>
    </div>
  );
}

// ─── Section header (tiny cube indicator) ────────────────────────────

function SectionHead({ index, title, subtitle, nodeId }: { index: string; title: string; subtitle: string; nodeId: string }) {
  return (
    <header className="sect-head">
      <div className="sect-mini"><Cube3D size={56} active={nodeId} /></div>
      <div className="sect-meta">
        <div className="sect-row">
          <span className="sect-index">v_{index}</span>
          <h2 className="sect-title">{title}</h2>
        </div>
        <span className="sect-sub">/ {subtitle}</span>
      </div>
    </header>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────

type ExpTab = 'work' | 'involvement' | 'programs';

const EXP_TAB_TO_VERTEX: Record<ExpTab, string> = {
  work: 'experience',
  involvement: 'involvement',
  programs: 'programs',
};

const EXP_TAB_META: Record<ExpTab, { index: string; subtitle: string }> = {
  work: { index: '001', subtitle: 'longest path' },
  involvement: { index: '011', subtitle: 'connected components' },
  programs: { index: '010', subtitle: 'covering set' },
};

export default function Home() {
  const [cubeMode, setCubeMode] = useState<CubeMode>('loading');
  const [overlayFading, setOverlayFading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [expTab, setExpTab] = useState<ExpTab>('work');

  // The cube vertex that should be highlighted: when scrolled into the merged
  // Experience section, the highlight follows the active tab.
  const activeCubeVertex = activeSection === 'experience'
    ? EXP_TAB_TO_VERTEX[expTab]
    : activeSection;

  // First-visit gating
  useEffect(() => {
    let buildTimer: number | undefined;
    let fadeTimer: number | undefined;
    let removeTimer: number | undefined;
    let isReturning = false;
    try { isReturning = !!localStorage.getItem(VISIT_KEY); } catch {}

    if (isReturning) {
      setCubeMode('docked');
      setShowOverlay(false);
    } else {
      // Building animation duration ~2500ms, then transition to docked + fade overlay
      buildTimer = window.setTimeout(() => {
        setCubeMode('docked');
        setOverlayFading(true);
      }, 2800);
      fadeTimer = window.setTimeout(() => {
        try { localStorage.setItem(VISIT_KEY, '1'); } catch {}
      }, 3100);
      removeTimer = window.setTimeout(() => setShowOverlay(false), 3600);
    }
    return () => {
      if (buildTimer) clearTimeout(buildTimer);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (removeTimer) clearTimeout(removeTimer);
    };
  }, []);

  // Scroll-spy: track which section is in view. Includes #technologies
  // (a section without a cube vertex) so its mini cube renders with no
  // highlight while the user is reading it.
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id === 'last-visitor' ? 'visitor' : entry.target.id;
          setActiveSection(id);
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    const sectionIds = ['intro', 'experience', 'technologies', 'projects', 'writing', 'last-visitor', 'contact'];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const jumpTo = useCallback((id: string) => {
    const node = NODES.find(n => n.id === id);
    if (!node) return;
    const el = document.querySelector(node.section);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleNodeClick = useCallback((id: string) => {
    // Clicking one of the three experience-tab vertices also switches the tab.
    if (id === 'experience') setExpTab('work');
    else if (id === 'involvement') setExpTab('involvement');
    else if (id === 'programs') setExpTab('programs');
    jumpTo(id);
    setCubeMode('docked');
  }, [jumpTo]);

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
          --accent: oklch(0.78 0.13 80);
          --max: 720px;
          --serif: 'EB Garamond', Georgia, serif;
          --mono: 'DM Mono', monospace;
        }
        html { scroll-behavior: smooth; background: var(--bg); }
        body { background: var(--bg); color: var(--text); font-family: var(--serif); font-size: 16px; line-height: 1.7; -webkit-font-smoothing: antialiased; }

        /* ── Cube base ── */
        .cube { display: block; overflow: visible; }
        .cube-edge { fill: none; stroke-width: 1.2; transition: stroke-opacity 0.3s; }
        .cube-edge-front { stroke: oklch(0.40 0.008 255); }
        .cube-edge-back { stroke: oklch(0.30 0.008 255); stroke-dasharray: 2 2; opacity: 0.7; }
        .cube-edge-connector { stroke: oklch(0.34 0.008 255); }
        .cube-node-group { transform: translate(var(--tx), var(--ty)); transition: transform 0s; }
        .cube-node { fill: var(--muted); transition: fill 0.2s, r 0.2s; }
        .cube-node-group.is-front .cube-node { fill: oklch(0.78 0.006 255); }
        .cube-node-group.is-back .cube-node { fill: oklch(0.55 0.006 255); }
        .cube-node-group.is-active .cube-node { fill: var(--accent); r: 5.5; }
        .cube-node-group.is-interactive .cube-node-hit { fill: transparent; cursor: pointer; }
        .cube-node-group.is-interactive:hover .cube-node { fill: var(--text); }
        .cube-label { font-family: var(--mono); font-size: 9px; fill: var(--muted); letter-spacing: 0.04em; pointer-events: none; transition: opacity 0.3s, fill 0.2s; }
        .cube-node-group.is-active .cube-label { fill: var(--text); }

        /* ── Build-in animation (plays once on first visit) ── */
        .cube.is-building .cube-node-group {
          animation: cubeNodeIn 900ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
          animation-delay: calc(var(--ni) * 60ms + 100ms);
        }
        .cube.is-building .cube-edge {
          animation: cubeEdgeIn 600ms ease-out backwards;
          animation-delay: calc(var(--ei) * 35ms + 1100ms);
        }
        .cube.is-building .cube-label {
          animation: cubeLabelIn 500ms ease-out backwards;
          animation-delay: 1900ms;
        }
        @keyframes cubeNodeIn {
          0%   { opacity: 0; transform: translate(0px, 0px) scale(0.6); }
          40%  { opacity: 1; }
          100% { opacity: 1; transform: translate(var(--tx), var(--ty)) scale(1); }
        }
        @keyframes cubeEdgeIn {
          from { stroke-dasharray: 1; stroke-dashoffset: 1; }
          to   { stroke-dasharray: 1; stroke-dashoffset: 0; }
        }
        @keyframes cubeLabelIn {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── CubeNav: morphing widget ── */
        .cube-nav {
          position: fixed;
          top: 18px;
          right: 18px;
          width: 280px;
          height: 280px;
          z-index: 60;
          transform-origin: top right;
          transition: transform 760ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }
        .cube-nav.is-loading {
          /* Center on screen, full scale. Translate from top-right anchor
             to viewport center, accounting for cube half-size (140px). */
          transform: translate(calc(-50vw + 158px), calc(50vh - 158px)) scale(1);
          z-index: 1001;
        }
        .cube-nav.is-docked {
          transform: scale(0.26);
          cursor: pointer;
        }
        .cube-nav.is-docked:hover { transform: scale(0.30); }
        .cube-nav.is-docked:focus-visible { outline: none; transform: scale(0.30); }
        .cube-nav.is-expanded {
          transform: scale(0.82);
        }
        .cube-nav .cube-label { opacity: 1; }
        .cube-nav.is-docked .cube-label { opacity: 0; }
        .cube-nav-hint {
          position: absolute; right: 0; top: -22px;
          font-family: var(--mono); font-size: 9px; color: var(--muted);
          letter-spacing: 0.1em; opacity: 0;
          transform: scale(3.5);
          transform-origin: top right;
          pointer-events: none;
          transition: opacity 0.2s;
        }
        .cube-nav.is-docked .cube-nav-hint { opacity: 0.8; }

        /* ── Loader overlay (fades out as cube shrinks) ── */
        .loader-bg {
          position: fixed; inset: 0; z-index: 1000;
          background: var(--bg);
          display: flex; align-items: center; justify-content: center;
          opacity: 1;
          transition: opacity 700ms ease;
        }
        .loader-bg.is-fading { opacity: 0; pointer-events: none; }
        html.returning .loader-bg { display: none; }

        /* Returning visitors: skip the build-in animation and snap cube straight to docked */
        html.returning .cube.is-building .cube-node-group,
        html.returning .cube.is-building .cube-edge,
        html.returning .cube.is-building .cube-label { animation: none !important; }
        html.returning .cube-nav.is-loading { transform: scale(0.26); cursor: pointer; }
        html.returning .cube-nav.is-loading:hover { transform: scale(0.30); }
        html.returning .cube-nav.is-loading .cube-label { opacity: 0; }
        html.returning .cube-nav.is-loading .cube-node-group { transform: translate(var(--tx), var(--ty)); opacity: 1; }
        html.returning .cube-nav.is-loading .cube-edge { stroke-dashoffset: 0; }
        .loader-stats {
          position: absolute; bottom: 18%;
          font-family: var(--mono); font-size: 12px; color: var(--muted);
          letter-spacing: 0.08em; display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
        }
        .loader-stats span { opacity: 0; animation: fadeUp 500ms ease-out forwards; }
        .loader-stats .ls-1 { animation-delay: 2200ms; }
        .loader-stats .ls-2 { animation-delay: 2350ms; color: var(--text); }
        .loader-stats .ls-3 { animation-delay: 2500ms; color: var(--text); }
        .loader-stats .ls-4 { animation-delay: 2650ms; font-style: italic; font-family: var(--serif); letter-spacing: 0.02em; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }

        /* ── Nav (text only, cube is the visual graph) ── */
        nav { position: sticky; top: 0; z-index: 50; background: oklch(0.11 0.008 255 / 0.9); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); padding: 0 24px; }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; max-width: var(--max); margin: 0 auto; height: 56px; gap: 24px; }
        .nav-brand { display: flex; align-items: baseline; gap: 10px; color: var(--text); text-decoration: none; }
        .nav-brand .nav-name { font-size: 14px; font-weight: 500; font-family: var(--serif); }
        .nav-brand .nav-handle { font-size: 11px; color: var(--muted); font-family: var(--mono); }
        .nav-current { font-family: var(--mono); font-size: 11px; color: var(--accent); letter-spacing: 0.08em; text-align: right; }

        main { max-width: var(--max); margin: 0 auto; padding: 0 24px 120px; }
        section { padding-top: 88px; scroll-margin-top: 64px; }

        /* ── Hero (no graph here; cube widget handles that) ── */
        .hero { padding-top: 64px; }
        .hero h1 { font-size: 32px; font-weight: 400; letter-spacing: -0.01em; margin-bottom: 6px; }
        .hero .role { font-family: var(--mono); font-size: 12px; color: var(--muted); letter-spacing: 0.08em; margin-bottom: 32px; }
        .hero .role b { color: var(--text); font-weight: 500; }
        .hero-epigraph { font-style: italic; font-size: 14px; color: oklch(0.62 0.006 255); border-left: 1px solid var(--border); padding: 6px 0 6px 14px; margin-bottom: 32px; }
        .hero-epigraph .attr { font-style: normal; font-family: var(--mono); font-size: 11px; color: var(--muted); display: block; margin-top: 6px; letter-spacing: 0.04em; }
        .hero p.lede { color: oklch(0.76 0.006 255); font-size: 15.5px; margin-bottom: 16px; }
        .hero p.lede strong { color: var(--text); font-weight: 500; }
        .hero .cta { display: inline-block; margin-top: 24px; padding: 9px 22px; font-size: 13px; font-family: var(--mono); color: var(--text); border: 1px solid var(--border); border-radius: 6px; text-decoration: none; letter-spacing: 0.04em; transition: border-color 0.15s, background 0.15s; }
        .hero .cta:hover { border-color: var(--text); background: var(--bg2); }

        /* ── Section headers ── */
        .sect-head { display: flex; align-items: center; gap: 16px; margin-bottom: 28px; padding-bottom: 14px; border-bottom: 1px solid var(--border); }
        .sect-mini { flex-shrink: 0; width: 56px; height: 56px; opacity: 0.9; }
        .sect-mini .cube-label { display: none; }
        .sect-meta { display: flex; flex-direction: column; gap: 2px; flex: 1; }
        .sect-row { display: flex; align-items: baseline; gap: 12px; }
        .sect-index { font-family: var(--mono); font-size: 10px; color: var(--muted); letter-spacing: 0.06em; }
        .sect-title { font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text); font-family: var(--mono); }
        .sect-sub { font-family: var(--serif); font-style: italic; font-size: 12px; color: var(--muted); }

        /* ── Adjacency rows ── */
        .adj-list { display: flex; flex-direction: column; }
        .adj-row { display: grid; grid-template-columns: 44px 18px 1fr; gap: 0 14px; padding: 18px 0; border-bottom: 1px solid var(--border); align-items: center; }
        .adj-row:first-child { border-top: 1px solid var(--border); }
        .adj-row .adj-logo { width: 36px; height: 36px; border-radius: 8px; background: var(--bg2); border: 1px solid var(--border); overflow: hidden; }
        .adj-row .adj-logo img { width: 100%; height: 100%; object-fit: cover; }
        .adj-row .adj-arrow { font-family: var(--mono); color: oklch(0.40 0.008 255); font-size: 13px; text-align: center; }
        .adj-body { display: flex; flex-direction: column; gap: 1px; }
        .adj-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
        .adj-name { font-size: 14px; font-weight: 500; color: var(--text); }
        .adj-year { font-size: 11px; color: var(--muted); font-family: var(--mono); white-space: nowrap; }
        .adj-role { font-size: 13px; color: oklch(0.66 0.006 255); }

        /* ── Experience tabs ── */
        .tabs { display: flex; gap: 6px; margin-bottom: 24px; flex-wrap: wrap; }
        .tab { padding: 7px 14px; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); border: 1px solid var(--border); border-radius: 999px; cursor: pointer; background: transparent; transition: color 0.15s, border-color 0.15s, background 0.15s; }
        .tab:hover { color: var(--text); border-color: oklch(0.36 0.008 255); }
        .tab.is-active { color: var(--text); border-color: var(--accent); background: oklch(0.16 0.008 255); }

        /* ── Technologies ── */
        .tech-list { display: flex; flex-direction: column; gap: 20px; }
        .tech-cat { padding-bottom: 18px; border-bottom: 1px solid var(--border); }
        .tech-cat:last-child { border-bottom: none; padding-bottom: 0; }
        .tech-cat-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 8px; }
        .tech-cat-name { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; color: var(--text); text-transform: uppercase; }
        .tech-cat-count { font-family: var(--mono); font-size: 10px; color: var(--muted); }
        .tech-cat-items { font-family: var(--mono); font-size: 12px; color: var(--muted); letter-spacing: 0.02em; line-height: 1.85; }
        .tech-cat-items .br { color: oklch(0.40 0.008 255); }
        .tech-cat-items .tag { color: oklch(0.72 0.006 255); }
        .tech-cat-items .tag + .tag::before { content: ', '; color: oklch(0.40 0.008 255); }

        /* ── Projects ── */
        .proj-list { display: flex; flex-direction: column; }
        .proj-row { display: grid; grid-template-columns: 36px 1fr; gap: 14px; padding: 18px 0; border-bottom: 1px solid var(--border); text-decoration: none; color: inherit; transition: background 0.15s; }
        .proj-row:first-child { border-top: 1px solid var(--border); }
        .proj-row:hover { background: oklch(0.13 0.008 255); }
        .proj-row:hover .proj-name { color: var(--text); }
        .proj-id { font-family: var(--mono); font-size: 11px; color: var(--muted); letter-spacing: 0.04em; padding-top: 4px; }
        .proj-body { display: flex; flex-direction: column; gap: 6px; }
        .proj-headline { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
        .proj-name { font-size: 14.5px; font-weight: 500; color: oklch(0.84 0.006 255); transition: color 0.12s; }
        .proj-arr { font-family: var(--mono); font-size: 12px; color: var(--muted); }
        .proj-desc { font-size: 13.5px; color: var(--muted); line-height: 1.6; }
        .proj-tags { font-family: var(--mono); font-size: 11px; color: var(--muted); letter-spacing: 0.02em; margin-top: 2px; }
        .proj-tags .br { color: oklch(0.40 0.008 255); }
        .proj-tags .tag { color: oklch(0.65 0.006 255); }
        .proj-tags .tag + .tag::before { content: ', '; color: oklch(0.40 0.008 255); }

        /* ── Writing ── */
        details.post { border-bottom: 1px solid var(--border); padding: 16px 0; }
        details.post:first-of-type { border-top: 1px solid var(--border); }
        details.post > summary { list-style: none; cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 16px; }
        details.post > summary::-webkit-details-marker { display: none; }
        details.post .post-sum-left { display: flex; align-items: baseline; gap: 12px; }
        details.post .post-marker { font-family: var(--mono); font-size: 11px; color: var(--muted); transition: transform 0.2s; display: inline-block; }
        details.post[open] .post-marker { transform: rotate(90deg); color: var(--accent); }
        details.post .post-title { font-size: 14px; color: oklch(0.72 0.006 255); transition: color 0.12s; font-family: var(--serif); }
        details.post:hover .post-title, details.post[open] .post-title { color: var(--text); }
        details.post .post-date { font-size: 11px; color: var(--muted); font-family: var(--mono); white-space: nowrap; }
        details.post .post-content { padding: 22px 0 8px; }
        details.post .post-hero { width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 8px; border: 1px solid var(--border); margin-bottom: 22px; display: block; }
        details.post .post-content p { color: oklch(0.76 0.006 255); font-size: 15px; line-height: 1.8; margin-bottom: 18px; }
        details.post .post-content p.lede { font-size: 17px; color: var(--text); font-style: italic; }
        details.post .post-content p:last-child { margin-bottom: 0; }

        /* ── Contact section ── */
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .contact-card { border: 1px solid var(--border); border-radius: 10px; padding: 18px 20px; background: var(--bg2); text-decoration: none; color: inherit; transition: border-color 0.15s, background 0.15s; display: flex; flex-direction: column; gap: 4px; }
        .contact-card:hover { border-color: var(--text); background: oklch(0.16 0.008 255); }
        .contact-card .cc-label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; color: var(--muted); text-transform: uppercase; }
        .contact-card .cc-value { font-size: 14px; color: var(--text); }
        .contact-card .cc-arrow { font-family: var(--mono); font-size: 11px; color: var(--muted); margin-top: 6px; }
        .contact-intro { color: oklch(0.76 0.006 255); font-size: 15px; margin-bottom: 20px; }

        /* ── Footer ── */
        footer { max-width: var(--max); margin: 0 auto; padding: 32px 24px 48px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); flex-wrap: wrap; gap: 12px; }
        footer a { font-size: 13px; color: var(--muted); text-decoration: none; transition: color 0.15s; }
        footer a:hover { color: var(--text); }
        footer .copy { font-size: 11px; color: oklch(0.38 0.008 255); font-family: var(--mono); }
        footer .copy em { font-style: italic; font-family: var(--serif); color: oklch(0.48 0.008 255); }

        @media (max-width: 560px) {
          .nav-current { display: none; }
          .nav-inner { gap: 14px; }
          .hero h1 { font-size: 26px; }
          .sect-head { gap: 12px; }
          .sect-mini { width: 44px; height: 44px; }
          .cube-nav.is-expanded { transform: scale(0.62); }
          .contact-grid { grid-template-columns: 1fr; }
          footer { flex-direction: column; gap: 16px; }
        }
      `}</style>

      {showOverlay && <LoadingOverlay fading={overlayFading} />}

      <CubeNav
        mode={cubeMode}
        active={activeCubeVertex}
        onExpand={() => setCubeMode('expanded')}
        onCollapse={() => setCubeMode('docked')}
        onNodeClick={handleNodeClick}
      />

      <nav>
        <div className="nav-inner">
          <a className="nav-brand" href="#intro" onClick={() => jumpTo('intro')}>
            <span className="nav-name">Jared Alonzo</span>
            <span className="nav-handle">@chapis</span>
          </a>
          <span className="nav-current">
            {(NODES.find(n => n.id === activeCubeVertex)?.full ?? '').toLowerCase()}
          </span>
        </div>
      </nav>

      <main>
        <section id="intro" className="hero">
          <h1>Jared Alonzo</h1>
          <p className="role">Product + Systems  ·  <b>Q₃ = (V, E)</b>  ·  |V|=8, |E|=12</p>

          <div className="hero-epigraph">
            Mathematicians do not study objects, but the relations between them.
            <span className="attr">— Henri Poincaré</span>
          </div>

          <p className="lede">Welcome. You can call me <strong>Chapis</strong>. I am a first-generation Guatemalan-American who grew up in a low-income environment.</p>
          <p className="lede">I have always been interested in tech and engineering a better world. After dozens of summer camps I knew I wanted to be an engineer, and after time interning I knew I wanted to be in product.</p>
          <p className="lede">I am passionate about Social Innovation, Entrepreneurship and International Travel. I am a Cincinnati Bengals, Ohio State Buckeyes, Liverpool FC and Denver Nuggets fan.</p>
          <p className="lede">Currently studying <strong>Computer Science and Engineering + Theoretical Mathematics</strong> at <strong>The Ohio State University</strong>, with a minor in Education.</p>
          <p className="lede" style={{ marginTop: 16 }}>I am always excited to connect — feel free to reach out and add an edge to the graph. <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)' }}>(↗ cube on the right)</span></p>

          <a href="https://cal.com/alonzoji" target="_blank" rel="noopener" className="cta">Schedule a call →</a>
        </section>

        <section id="experience">
          <SectionHead
            index={EXP_TAB_META[expTab].index}
            title="Experience"
            subtitle={EXP_TAB_META[expTab].subtitle}
            nodeId={EXP_TAB_TO_VERTEX[expTab]}
          />
          <div className="tabs" role="tablist" aria-label="Experience type">
            {(['work', 'involvement', 'programs'] as const).map(t => (
              <button
                key={t}
                role="tab"
                aria-selected={expTab === t}
                className={`tab ${expTab === t ? 'is-active' : ''}`}
                onClick={() => setExpTab(t)}
              >
                {t === 'work' ? 'Work' : t === 'involvement' ? 'Involvement' : 'Programs'}
              </button>
            ))}
          </div>
          {expTab === 'work' && (
            <div className="adj-list">
              {experience.map((e, i) => (
                <div key={i} className="adj-row">
                  <div className="adj-logo"><img src={e.logo} alt={e.name} /></div>
                  <span className="adj-arrow">→</span>
                  <div className="adj-body">
                    <div className="adj-head">
                      <span className="adj-name">{e.name}</span>
                      <span className="adj-year">{e.year}</span>
                    </div>
                    <span className="adj-role">{e.role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {expTab === 'involvement' && (
            <div className="adj-list">
              {involvement.map((e, i) => (
                <div key={i} className="adj-row">
                  <div className="adj-logo"><img src={e.logo} alt={e.name} /></div>
                  <span className="adj-arrow">→</span>
                  <div className="adj-body">
                    <div className="adj-head">
                      <span className="adj-name">{e.name}</span>
                      <span className="adj-year">{e.year}</span>
                    </div>
                    <span className="adj-role">{e.role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {expTab === 'programs' && (
            <div className="adj-list">
              {programs.map((e, i) => (
                <div key={i} className="adj-row">
                  <div className="adj-logo"><img src={e.logo} alt={e.name} /></div>
                  <span className="adj-arrow">→</span>
                  <div className="adj-body">
                    <div className="adj-head">
                      <span className="adj-name">{e.program}</span>
                      <span className="adj-year">{e.year.split(' ').pop()}</span>
                    </div>
                    <span className="adj-role">{e.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="technologies">
          <SectionHead index="τ" title="Technologies" subtitle="working set" nodeId="technologies" />
          <div className="tech-list">
            {techCategories.map(cat => (
              <div key={cat.name} className="tech-cat">
                <div className="tech-cat-head">
                  <span className="tech-cat-name">{cat.name}</span>
                  <span className="tech-cat-count">{cat.items.length}</span>
                </div>
                <div className="tech-cat-items">
                  <span className="br">{'{ '}</span>
                  {cat.items.map(t => <span key={t} className="tag">{t}</span>)}
                  <span className="br">{' }'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects">
          <SectionHead index="110" title="Projects" subtitle="adjacency list" nodeId="projects" />
          <div className="proj-list">
            {projects.map((p, i) => (
              <a key={i} className="proj-row" href={p.link || '#'} target={p.link ? '_blank' : '_self'} rel="noopener">
                <span className="proj-id">p_{String(i + 1).padStart(2, '0')}</span>
                <div className="proj-body">
                  <div className="proj-headline">
                    <span className="proj-name">{p.name}</span>
                    <span className="proj-arr">↗</span>
                  </div>
                  <div className="proj-desc">{p.desc}</div>
                  <div className="proj-tags">
                    <span className="br">{'{ '}</span>
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    <span className="br">{' }'}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="writing">
          <SectionHead index="111" title="Writing" subtitle="leaf nodes" nodeId="writing" />
          <div>
            {posts.map((post, i) => (
              <details key={i} className="post">
                <summary>
                  <span className="post-sum-left">
                    <span className="post-marker">▸</span>
                    <span className="post-title">{post.title}</span>
                  </span>
                  <span className="post-date">{post.date}</span>
                </summary>
                <div className="post-content">
                  {post.hero && <img className="post-hero" src={post.hero} alt={post.title} />}
                  {post.lede && <p className="lede">{post.lede}</p>}
                  {post.paragraphs.map((para, j) => <p key={j}>{para}</p>)}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="last-visitor">
          <SectionHead index="101" title="Last Visitor" subtitle="neighborhood N(v)" nodeId="visitor" />
          <VisitorMap />
        </section>

        <section id="contact">
          <SectionHead index="100" title="Contact" subtitle="incident edges" nodeId="contact" />
          <p className="contact-intro">If anything here resonated, the easiest way to connect is the link below. I read every message.</p>
          <div className="contact-grid">
            <a className="contact-card" href="https://cal.com/alonzoji" target="_blank" rel="noopener">
              <span className="cc-label">Schedule</span>
              <span className="cc-value">cal.com/alonzoji</span>
              <span className="cc-arrow">15-min intro →</span>
            </a>
            <a className="contact-card" href="https://www.linkedin.com/in/jared-alonzo/" target="_blank" rel="noopener">
              <span className="cc-label">LinkedIn</span>
              <span className="cc-value">jared-alonzo</span>
              <span className="cc-arrow">connect →</span>
            </a>
            <a className="contact-card" href="https://github.com/AlonzoJI" target="_blank" rel="noopener">
              <span className="cc-label">GitHub</span>
              <span className="cc-value">AlonzoJI</span>
              <span className="cc-arrow">code →</span>
            </a>
            <a className="contact-card" href="https://x.com/chapisalonzo" target="_blank" rel="noopener">
              <span className="cc-label">X</span>
              <span className="cc-value">@chapisalonzo</span>
              <span className="cc-arrow">read →</span>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="https://github.com/AlonzoJI" target="_blank" rel="noopener">GitHub</a>
          <a href="https://x.com/chapisalonzo" target="_blank" rel="noopener">X</a>
          <a href="https://www.linkedin.com/in/jared-alonzo/" target="_blank" rel="noopener">LinkedIn</a>
        </div>
        <span className="copy">2026 Jared Alonzo  ·  <em>still adding edges</em></span>
      </footer>
    </>
  );
}
