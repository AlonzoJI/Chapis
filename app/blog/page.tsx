export default function Blog() {
  const posts = [
    { slug: 'product-strategy-talk', title: 'The Product Builder', date: '2026' },
    { slug: 'le-foodist-paris', title: 'What Food Means', date: '2026' },
    { slug: 'cincinnati-sign', title: 'The Sign', date: '2025' },
  ];

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
        html { background: var(--bg); }
        body { background: var(--bg); color: var(--text); font-family: var(--serif); font-size: 16px; line-height: 1.7; -webkit-font-smoothing: antialiased; }
        nav { position: sticky; top: 0; z-index: 100; background: var(--bg); border-bottom: 1px solid var(--border); padding: 0 24px; }
        .nav-inner { display: flex; align-items: center; justify-content: space-between; max-width: var(--max); margin: 0 auto; height: 52px; }
        nav a { font-size: 14px; color: var(--muted); text-decoration: none; transition: color 0.15s; font-family: var(--serif); }
        nav a:hover { color: var(--text); }
        nav a.nav-name { color: var(--text); font-weight: 500; }
        main { max-width: var(--max); margin: 0 auto; padding: 0 24px 120px; }
        h2 { font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 32px; padding-bottom: 12px; border-bottom: 1px solid var(--border); font-family: var(--mono); padding-top: 72px; }
        .post-link { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; padding: 18px 0; border-bottom: 1px solid var(--border); text-decoration: none; color: inherit; }
        .post-link:first-child { border-top: 1px solid var(--border); }
        .post-title { font-size: 14px; color: oklch(0.72 0.006 255); transition: color 0.12s; font-family: var(--serif); }
        .post-link:hover .post-title { color: var(--text); }
        .post-date { font-size: 11px; color: var(--muted); font-family: var(--mono); white-space: nowrap; }
      `}</style>

      <nav>
        <div className="nav-inner">
          <a className="nav-name" href="/">Jared Alonzo</a>
          <a href="/">← Home</a>
        </div>
      </nav>

      <main>
        <h2>Blog</h2>
        <div>
          {posts.map((p) => (
            <a key={p.slug} className="post-link" href={`/blog/${p.slug}`}>
              <span className="post-title">{p.title}</span>
              <span className="post-date">{p.date}</span>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
