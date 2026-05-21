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
  {
    name: 'Hue — AI Language Coach',
    desc: 'An AI-powered English fluency coach for ESL learners. Hue grades speaking skills through natural 1:1 conversations in a gamified format, built with React, TypeScript and Gemini 2.5 Flash.',
    link: 'https://hue-teal.vercel.app/'
  },
  {
    name: 'Hue — AI Language Coach iOS',
    desc: 'A native iOS version of Hue built with Swift and Xcode, bringing AI-powered English fluency coaching to iPhone with a JavaScript backend.',
    link: 'https://hue-teal.vercel.app/'
  },
  {
    name: 'QuikChek',
    desc: 'A mobile-first news and fact-checking app for Gen Z. Delivers daily news at an 8th-grade reading level and verifies TikTok links in real time using audio transcription and multi-source claim analysis.',
    link: 'https://quik-chek.vercel.app'
  },
  {
    name: 'SkillBridge',
    desc: 'A CLI tool that critiques your résumé and generates a new one from scratch using GPT-3.5. Parses PDF/DOCX input, drafts impact bullets with AI and outputs a polished LaTeX/PDF résumé.',
    link: 'https://github.com/AlonzoJI/SkillBridge'
  },
  {
    name: 'NetPay',
    desc: 'A Ruby on Rails app for splitting group trip expenses. Users create trips, add participants and expenses and get an automatic settlement strategy showing exactly who owes whom.',
    link: 'https://github.com/cse3901-osu-2026sp-910/hexcode_final_project'
  },
  {
    name: 'Curriculum Visualization',
    desc: 'An interactive 4-year course map for the OSU CS&E curriculum. Hover over any course to highlight its full prerequisite and postrequisite chain across all 8 semesters.',
    link: 'https://github.com/cse3901-osu-2026sp-910/hexcode_vis'
  },
];

type Post = { date: string; title: string; lede?: string; hero?: string; paragraphs: string[] };

const posts: Post[] = [
  {
    date: '2026',
    title: 'The Product Builder',
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
    date: '2026',
    title: 'What Food Means',
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
    date: '2025',
    title: 'The Sign',
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

      const getStored = () => {
        try { const r = localStorage.getItem(KEY_LAST); return r ? JSON.parse(r) : null; } catch { return null; }
      };
      const setStored = (d: StoredVisitor) => localStorage.setItem(KEY_LAST, JSON.stringify(d));

      const stored = getStored();
      if (stored) {
        setStatus({ city: stored.city, country: stored.country, ts: stored.ts, live: false });
      }

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
          try {
            const res = await fetch('/api/visit', { method: 'POST' });
            const { count: newCount } = await res.json();
            setCount(newCount);
          } catch {}
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
        .project-name { font-size: 14px; font-weight: 500; color: var(--text); margin-bottom: 6px; font-family: var(--serif); }
        .project-desc { font-size: 13px; color: var(--muted); line-height: 1.55; font-family: var(--serif); }
        details.post { border-bottom: 1px solid var(--border); padding: 16px 0; }
        details.post:first-of-type { border-top: 1px solid var(--border); }
        details.post > summary { list-style: none; cursor: pointer; display: flex; align-items: baseline; justify-content: space-between; gap: 16px; }
        details.post > summary::-webkit-details-marker { display: none; }
        details.post .post-sum-left { display: flex; align-items: baseline; gap: 12px; }
        details.post .post-marker { font-family: var(--mono); font-size: 11px; color: var(--muted); transition: transform 0.2s; display: inline-block; }
        details.post[open] .post-marker { transform: rotate(90deg); color: var(--text); }
        details.post .post-title { font-size: 14px; color: oklch(0.72 0.006 255); transition: color 0.12s; font-family: var(--serif); }
        details.post:hover .post-title, details.post[open] .post-title { color: var(--text); }
        details.post .post-date { font-size: 11px; color: var(--muted); font-family: var(--mono); white-space: nowrap; }
        details.post .post-content { padding: 22px 0 8px; }
        details.post .post-hero { width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 8px; border: 1px solid var(--border); margin-bottom: 22px; display: block; }
        details.post .post-content p { color: oklch(0.76 0.006 255); font-size: 15px; line-height: 1.8; margin-bottom: 18px; }
        details.post .post-content p.post-lede { font-size: 17px; color: var(--text); font-style: italic; }
        details.post .post-content p:last-child { margin-bottom: 0; }
        .contact-intro { color: oklch(0.76 0.006 255); font-size: 15px; margin-bottom: 20px; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .contact-card { border: 1px solid var(--border); border-radius: 10px; padding: 18px 20px; background: var(--bg2); text-decoration: none; color: inherit; transition: border-color 0.15s, background 0.15s; display: flex; flex-direction: column; gap: 4px; }
        .contact-card:hover { border-color: var(--text); background: oklch(0.16 0.008 255); }
        .contact-card .cc-label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.08em; color: var(--muted); text-transform: uppercase; }
        .contact-card .cc-value { font-size: 14px; color: var(--text); }
        .contact-card .cc-arrow { font-family: var(--mono); font-size: 11px; color: var(--muted); margin-top: 6px; }
        footer { max-width: var(--max); margin: 0 auto; padding: 32px 24px 48px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); flex-wrap: wrap; gap: 12px; }
        footer a { font-size: 13px; color: var(--muted); text-decoration: none; transition: color 0.15s; font-family: var(--serif); }
        footer a:hover { color: var(--text); }
        footer .copy { font-size: 11px; color: oklch(0.38 0.008 255); font-family: var(--mono); }
        @media (max-width: 520px) { .projects-grid { grid-template-columns: 1fr; } .contact-grid { grid-template-columns: 1fr; } nav ul { gap: 18px; } footer { flex-direction: column; gap: 16px; } }
      `}</style>

      <nav>
        <div className="nav-inner">
          <a className="nav-name" href="#intro">Jared Alonzo</a>
          <ul>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#involvement">Involvement</a></li>
            <li><a href="#programs">Programs</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#writing">Writing</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      <main>
        <section id="intro" style={{ paddingTop: 64 }}>
          <h1 style={{ fontSize: 28, fontWeight: 400, letterSpacing: '-0.01em', marginBottom: 4, fontFamily: 'var(--serif)' }}>Jared Alonzo</h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'var(--mono)', marginBottom: 32 }}>Product + Systems</p>
          <p style={{ color: 'oklch(0.76 0.006 255)', fontSize: 15.5, marginBottom: 16 }}>Welcome to my portfolio. You can call me <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Chapis</strong>. I am a first-generation Guatemalan-American who grew up in a low-income environment.</p>
          <p style={{ color: 'oklch(0.76 0.006 255)', fontSize: 15.5, marginBottom: 16 }}>I have always been interested in tech and engineering a better world. After dozens of summer camps, I knew I wanted to be an engineer and after time interning I knew I wanted to be in product.</p>
          <p style={{ color: 'oklch(0.76 0.006 255)', fontSize: 15.5, marginBottom: 16 }}>I am passionate about Social Innovation, Entrepreneurship and International Travel. I am a Cincinnati Bengals, Ohio State Buckeyes, Liverpool FC and Denver Nuggets fan.</p>
          <p style={{ color: 'oklch(0.76 0.006 255)', fontSize: 15.5 }}>Currently studying <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Computer Science and Engineering + Theoretical Mathematics</strong> at <strong style={{ color: 'var(--text)', fontWeight: 500 }}>The Ohio State University</strong>, with a minor in Education.</p>
          <p style={{ color: 'oklch(0.76 0.006 255)', fontSize: 15.5, marginTop: 16 }}>I am always excited to connect with like-minded people, so feel free to reach out!</p>
          <a
            href="https://cal.com/alonzoji"
            target="_blank"
            rel="noopener"
            style={{
              display: 'inline-block',
              marginTop: 24,
              padding: '8px 20px',
              fontSize: 13,
              fontFamily: 'var(--mono)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            Schedule a call →
          </a>
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
              <a
                key={i}
                className="project-card"
                href={p.link || '#'}
                target={p.link ? '_blank' : '_self'}
                rel="noopener"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div className="project-name">{p.name}</div>
                <div className="project-desc">{p.desc}</div>
              </a>
            ))}
          </div>
        </section>

        <section id="writing">
          <h2>Writing</h2>
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
                  {post.lede && <p className="post-lede">{post.lede}</p>}
                  {post.paragraphs.map((para, j) => <p key={j}>{para}</p>)}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="last-visitor">
          <h2>Last Visitor</h2>
          <VisitorMap />
        </section>

        <section id="contact">
          <h2>Contact</h2>
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
        <span className="copy">2026 Jared Alonzo</span>
      </footer>
    </>
  );
}