export default function CincinnatiSign() {
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
        .article-meta { padding-top: 56px; margin-bottom: 32px; }
        .article-date { font-size: 11px; font-family: var(--mono); color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 16px; }
        .article-title { font-size: 34px; font-weight: 400; line-height: 1.2; letter-spacing: -0.01em; }
        .hero { width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 10px; border: 1px solid var(--border); margin-bottom: 40px; display: block; }
        .body p { color: oklch(0.76 0.006 255); font-size: 16px; line-height: 1.8; margin-bottom: 24px; }
        .body p:last-child { margin-bottom: 0; }
      `}</style>

      <nav>
        <div className="nav-inner">
          <a className="nav-name" href="/">Jared Alonzo</a>
          <a href="/blog">← Blog</a>
        </div>
      </nav>

      <main>
        <div className="article-meta">
          <div className="article-date">2025</div>
          <h1 className="article-title">The Sign</h1>
        </div>

        <img
          className="hero"
          src="https://www.cincinnati.com/gcdn/authoring/authoring-images/2025/05/28/PCIN/83896046007-cincinnati-sign.jpg"
          alt="The Cincinnati sign on the hillside"
        />

        <div className="body">
          <p>Imagine this. You are traveling the world and after hearing so many locals talk about their homes you feel your brain chemistry start to shift. After all that you land back home in Hebron, Kentucky at Cincinnati/Northern Kentucky International Airport. You are disappointed with your life decisions. You are on I-275 N and you see it. An ugly old beaten up sign that reminds you of the gray nights from your childhood. You drive past a disappointing skyline and then you see it. The CINCINNATI sign.</p>
          <p>That old sign was the best possible representation of the city. It was romantic in the way that only ugly things can be romantic. It was ugly like the city. I always imagined Cincinnati like drinking a martini at an airport bar or smoking a cigar near the Ohio River. There was something honest about it.</p>
          <p>I loved driving up from CVG just to see that dirty sign with its flickering lights. It felt authentic in a way that very few things in mid-sized American cities still do. It did not try to be anything it was not. It just sat there on the hillside looking tired and a little broken and somehow perfect.</p>
          <p>Cincinnati has always been a city that does not get enough credit. It sits in this strange middle space between the Midwest and the South, between old money and working class grit, between a city trying to grow and a city that remembers when it already was something. The sign captured all of that without trying.</p>
          <p>The new sign is cleaner. It is brighter and more legible and probably a better civic investment. I understand why the city did it. Cincinnati has spent the last decade trying to shake the rust off and show the country that it is worth paying attention to. The new sign fits that story.</p>
          <p>But it feels disingenuous. It looks like it could be anywhere. It does not have the weight of a place that has actually lived through something. The old sign had that weight. You could feel the decades in it.</p>
          <p>That has been my reality and the reality of this city for the past 20 years. Cincinnati keeps trying to become something new and in doing that it keeps leaving behind the things that made it worth coming home to in the first place.</p>
        </div>
      </main>
    </>
  );
}
