// Blog posts, newest first. Each one renders at /writing/[slug].

export type Post = {
  slug: string;
  date: string;
  title: string;
  lede?: string;
  hero?: string;
  paragraphs: string[];
};

export function getPost(slug: string): Post | undefined {
  return POSTS.find(post => post.slug === slug);
}

export const POSTS: Post[] = [
  {
    slug: 'miguel-angel-asturias-came-home', date: '2026', title: 'Miguel Ángel Asturias Came Home',
    hero: '/blog/miguel-angel-asturias.jpg',
    paragraphs: [
      'I recently found myself in Guatemala for a beautiful wedding. By pure coincidence, my trip lined up with the public wake of Miguel Ángel Asturias, our first Nobel laureate.',
      'Earlier this year I stood in Père Lachaise Cemetery in Paris and left flowers for him. He is the only Central American to win the Nobel Prize in Literature, and he had rested in Paris for half a century, a long way from the country he spent his life writing about. A few months later I was walking through the Palacio Nacional and there he was again. Same man. New address. His ashes had finally come home in an urn shaped like a kernel of corn, a nod to Men of Maize and the cornfields that cover Maya country.',
      'Around me were elderly Indigenous men and women standing very still, staring at the urn. I kept wondering what they saw. A Nobel laureate? A man who wrote their grandparents into literature? Or the loved ones they never got to bury? Because the government murdered them.',
      'I will be honest. I didn’t know how to feel. So I did what any serious literary pilgrim would do and stepped outside for a cigarette.',
      'You cannot stand in front of Asturias without remembering what he stood for. He wrote El Señor Presidente about a dictator who ruled through fear, a man who decided who counted as a person and who did not. He wrote about dehumanization, tyranny and absolute power, and he paid for it with years in exile. Asturias loved Guatemala. He also knew exactly what was wrong with it and was never afraid to call out its hypocrisy.',
      'Outside, a taxi driver named Mario offered me a lighter. We talked about why I was in Guatemala and then about where we had each been. He told me he has only left Guatemala twice. The first time was for Colombia, to watch his son play soccer. The second time was El Salvador. Not once had he wanted to go north. My family is from Huehuetenango, where so many men grow up seeing the journey to the US as the only way forward, so that stuck with me.',
      'I asked what he was doing in El Salvador.',
      'Mario told me, in detail I will not forget, that he was arrested under the state of exception the Bukele government declared in 2022, with no due process and no formal charge. The same border agents who arrested him warned him that the judge did not like Guatemalans. They were right. The judge admitted there was no legal ground for the case and sentenced him to 30 years and 6 months anyway.',
      'For three years Mario had no lawyer and no way to reach his wife and young children. Mario is a big man. He showed me photos from the day he was released, 95 pounds with his ribs showing. What he worried about most was the men he left behind, men facing 20, 30 and 40 years who may never see their cases move or their children grow up.',
      'I felt small standing next to him.',
      'He did not tell it like a speech. He told it like a fact, the way you tell someone the bus is running late.',
      'I keep thinking about the distance between those two moments. Inside, a country honoring a man who warned it about absolute power. Outside, a man holding a lighter who had lived the warning.',
      'Seeing Miguel Ángel Asturias finally rest in Guatemala was one of the great honors of my life. But I do not think he came home to be admired. I think he came home to be read. The themes of El Señor Presidente never left Central America, and I do not think they will in my lifetime.',
      'If Miguel is watching, I do not think he would be surprised. I think he would ask what we plan to do about it. I hope we find a better answer than I had standing outside with a cigarette.',
    ],
  },
  {
    slug: 'my-favorite-movie-y-tu-mama-tambien', date: '2026', title: 'My Favorite Movie: Y Tu Mamá También',
    hero: '/blog/y-tu-mama-tambien.jpg',
    paragraphs: [
      'I came back from Mexico a month ago. Wow, how time passes. I’m still thinking about what Mexico means to me. Watching the World Cup these last few months, it has been on my mind even more. As a Latino, I felt proud walking around Alameda Central and seeing moms, students and teachers, your average Mexicans, protesting the injustice rooted in the violence of Mexico.',
      'I’ve been thinking about Y Tu Mamá También. I remember first hearing about Alfonso Cuarón and thinking, oh wow that’s cool, that’s my dad’s name, and he just won Best Director at the Oscars. I saw the movie when I was pretty young. Looking back, I didn’t really understand it. I just thought I had to like it because it was Mexican, because it was Latino.',
      'Coming back from Mexico, I understand it now. The wealth inequity across Latin America. The trauma done to the land and the trauma carried by its people. I’m not going to get into all of it here. If you catch me in person, buy me a beer.',
      'I’ll leave you with my favorite scene. The beauty and random chaos of Mexico City are like nowhere else in the world, but it’s all underlined by broken hearts. Let me change topics before I ramble. Oaxaca is beautiful. You feel the grandness of José María Velasco Gómez’s art just by opening your eyes. The virgin beaches remind you of a childhood dream of innocence and hope.',
      'The best scene, for me, is Doña Marta. How rich it must be to be 98 and look back at everything you can call yours. Not what you own in the physical world, but what you remember. The trauma, the violence, the love, the joy. It’s all yours to keep. As a young person, I can only imagine what she saw, and what I hope she was spared. Knowing Mexico, I’m sure violence and injustice are some of the memories she looks back on. I think about the grandmother I never met, and the war, the violence.',
      'I’m not Mexican, by the way. I’m Guatemalan.',
      'I’m not Mexican btw, I’m Guatemalan',
    ],
  },
  {
    slug: 'the-product-builder', date: '2026', title: 'The Product Builder',
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
    slug: 'what-food-means', date: '2026', title: 'What Food Means',
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
    slug: 'the-sign', date: '2025', title: 'The Sign',
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
