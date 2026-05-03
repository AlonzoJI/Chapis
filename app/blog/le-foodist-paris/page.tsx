export default function LeFoodistParis() {
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
        .body .lede { font-size: 18px; color: var(--text); font-style: italic; }
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
          <h1 className="article-title">What Food Means</h1>
        </div>

        <img
          className="hero"
          src="https://www.lefoodist.com/images/A_NEW_WEBSITE/Product_Pages/cooking_class__and_lunch_steps/Step_1_of_Morning_Cooking_Class_and_Lunch_1.jpg"
          alt="Le Foodist cooking class in Paris"
        />

        <div className="body">
          <p className="lede">What does food mean to you?</p>
          <p>Food means a lot to me. Growing up it carried worry and anxiety around my body and around money. But it was also a passion. A focus activity in a world full of distractions. A connection to my roots, a love language and a substance that just fuels my body. Food has always held two truths at once for me and I have never fully figured out how to reconcile them.</p>
          <p>I am a Francophile. I think it was the football and the busy streets that got my 18 year old self's attention. France felt like a place that took things seriously in a way that I respected but did not fully understand yet.</p>
          <p>I had the chance to revisit France while couch surfing in March. It was a pleasure to take in the city and share meals with friends. But what really pulled me back into Paris was the food. That is a strange thing for me to say because I think my taste in food has always been defined by seasoning, quantity and practicality. Those are Latin values around food. You season everything. You feed everyone. You do not waste anything. French cuisine at first glance feels like the opposite of all that.</p>
          <p>After speaking with my chef friend Paulo who is from São Paulo I started to understand the connection better. Paulo helped me see that French cuisine is not about restraint for its own sake. It is about intention. Every technique exists for a reason. Every ingredient is chosen. There is a discipline to it that once you understand it starts to feel less foreign and more familiar.</p>
          <p>That conversation led me to Le Foodist in Paris. Le Foodist runs cooking classes and market tours in the heart of the city and I signed up not knowing exactly what to expect. What I found was something I did not anticipate. The class was less about following a recipe and more about understanding why. Why you build a sauce a certain way. Why temperature matters at each step. Why the French treat the act of cooking as something worth slowing down for.</p>
          <p>For someone who grew up eating food that was made fast and made with love those two things always felt like they could not coexist. Le Foodist proved me wrong. The food we made that morning was simple. It was also the best thing I ate in Paris.</p>
          <p>I left that kitchen thinking about my grandmother's cooking. About the way she moved through a kitchen without measuring anything. About how that same confidence and intention exists in both traditions even if the results taste completely different. Food does not have to come from the same place to come from the same feeling.</p>
          <p>I am still figuring out what food means to me. But I think it means more than I used to let myself admit.</p>
        </div>
      </main>
    </>
  );
}
