export default function ProductStrategyTalk() {
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
          <div className="article-date">2026</div>
          <h1 className="article-title">The Product Builder</h1>
        </div>

        <img
          className="hero"
          src="https://damassets.autodesk.net/content/dam/autodesk/images/customer-stories/long-format-customer-story/hdr-apm-walk-train-thumb-1172x660.png"
          alt="Product strategy and building"
        />

        <div className="body">
          <p>About eight months ago I gave a talk on product strategy to my Management Leadership for Tomorrow Career Prep cohort. I have been thinking about it lately and honestly I would scrap most of it.</p>
          <p>Not because the content was wrong. The frameworks were fine. The slide deck looked good. But I spent an hour talking about how to think about product and almost no time talking about how to build it. That is the wrong talk to give right now.</p>
          <p>The PM role is shifting and it is shifting fast. The archetype that is winning right now is not the PM who writes the best PRD or runs the tightest sprint. It is the PM who can actually sit down and build something. Ship a prototype over a weekend. Open a codebase and understand what is happening. Close the gap between the idea and the thing.</p>
          <p>I did not take vibe coding seriously until I brought it up casually over a game of cards with friends. One of them is a business analyst and she told me it had completely changed how she worked. She was building things she would have had to request from engineering six months ago. That conversation changed how I thought about what was possible.</p>
          <p>I started using Claude Code shortly after that. You know what it is. The first time I used it I gave it a rough description of what I wanted to build and watched it work through the problem. It was not perfect but it was fast and it gave me something real to react to. That feedback loop, idea to prototype to iteration, used to take days. Now it takes hours. It is useful but expensive so I try to use it sparingly.</p>
          <p>The closest thing I can compare it to is learning Ruby on Rails for the first time. Rails gives you so much out of the box that you can have something running in minutes. Scaffolding, routing, models, all of it just appears. The danger with Rails is that you can build without understanding what you built. Claude Code has the same energy. It moves fast and it fills in gaps you did not know you had. The difference is that with Rails the magic is predictable. With Claude Code the output depends entirely on how well you can describe what you want. That skill, knowing how to prompt, knowing how to react to what comes back, is its own kind of technical literacy. It is not the same as knowing how to code but it is not nothing either.</p>
          <p>This website is a product of that shift. I built it using Claude Code and Next.js. I did not start with a design system or a component library. I started with a conversation. I described what I wanted, Claude Code scaffolded it and I iterated from there. The visitor map, the tile proxy, the blog, all of it came together through that process. I learned more about Next.js in two days of building than I would have in two weeks of reading documentation.</p>
          <p>That is what vibe coding actually is at its best. It is not about replacing engineering skills. It is about compressing the distance between having an idea and understanding whether it works. For a PM that compression is everything.</p>
          <p>When I went through interviews this cycle I leaned too hard into strategy and too little on this. Companies kept asking me what I had built. Not what I had managed or prioritized or shipped through a team. What had I personally built. That question used to feel unfair. Now I think it is exactly the right question.</p>
          <p>The PM who can build has a different conversation with engineering. They can prototype instead of speculate. They can speak with specificity about what is hard and what is not. They earn a different kind of trust.</p>
          <p>If I gave that talk again I would spend ten minutes on frameworks and fifty minutes on tools. I would walk through Claude Code and Cursor and Replit. I would talk about what it feels like to go from zero to something in a day. I would tell people that the gap between product and engineering is closing and the PMs who close it themselves are going to have an enormous advantage.</p>
          <p>Thank you to James Silva for the opportunity and for pushing back thoughtfully in the comments. If you are on campus at Ohio State feel free to connect. I am working on a few things this summer to help students break into product and I would love to share more soon.</p>
        </div>
      </main>
    </>
  );
}
