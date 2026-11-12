// Songs that play a short clip alongside each painting.
//
// spotifyUri values are placeholders until real track URIs are pasted in
// (see README "Art and music assets"). startSec / endSec mark the clip and
// default to the first 30 seconds until each one is picked by ear.

export type Song = {
  id: string;
  title: string;
  artist: string;
  /** Format: spotify:track:<22-character id> */
  spotifyUri: string;
  startSec: number;
  endSec: number;
};

const PLACEHOLDER_URI = "spotify:track:TODO";

export const OPENER_SONG: Song = {
  id: "earl-alchemist-sentry",
  title: "Sentry",
  artist: "Earl Sweatshirt & The Alchemist feat. MIKE",
  // Found by search; the embed shows "Hip-Hop Big Ones" art, so this may be a
  // compilation copy. Swap in the VOIR DIRE album URI if you prefer that one.
  spotifyUri: "spotify:track:2BToiLz6TkBEfxaQoNLx1o",
  startSec: 0,
  endSec: 30,
};

/** Random rotation. The opener is deliberately not in this list. */
export const SONGS: Song[] = [
  { id: "earl-shattered-dreams", title: "... Shattered Dreams", artist: "Earl Sweatshirt", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "earl-azucar", title: "Azucar", artist: "Earl Sweatshirt", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "earl-red-water", title: "Red Water", artist: "Earl Sweatshirt", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "earl-fire-in-the-hole", title: "Fire in the Hole", artist: "Earl Sweatshirt", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "earl-tabula-rasa", title: "Tabula Rasa", artist: "Earl Sweatshirt feat. Armand Hammer", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "alchemist-nobles", title: "Nobles", artist: "The Alchemist feat. Earl Sweatshirt & Navy Blue", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "armand-hammer-falling-out-the-sky", title: "Falling out the Sky", artist: "Armand Hammer & The Alchemist feat. Earl Sweatshirt", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "tyler-puppet", title: "PUPPET", artist: "Tyler, The Creator", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "kendrick-untitled-05", title: "untitled 05 | 09.21.2014.", artist: "Kendrick Lamar", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "kendrick-these-walls", title: "These Walls", artist: "Kendrick Lamar", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "kendrick-mortal-man", title: "Mortal Man", artist: "Kendrick Lamar", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "kendrick-sing-about-me", title: "Sing About Me, I'm Dying Of Thirst", artist: "Kendrick Lamar", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "outkast-rosa-parks", title: "Rosa Parks", artist: "Outkast", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "ugk-intl-players-anthem", title: "Int'l Players Anthem (I Choose You)", artist: "UGK feat. Outkast", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "mach-hommy-stellar-ray-theory", title: "The Stellar Ray Theory", artist: "Mach-Hommy", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "mach-hommy-marie", title: "Marie", artist: "Mach-Hommy", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "westside-gunn-margiela-split-toes", title: "Margiela Split Toes", artist: "Westside Gunn feat. Mach-Hommy", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "gibbs-madlib-practice", title: "Practice", artist: "Freddie Gibbs & Madlib", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "gibbs-blackest-in-the-room", title: "Blackest in the Room", artist: "Freddie Gibbs", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "boldy-alchemist-great-adventures", title: "Great Adventures", artist: "Boldy James & The Alchemist", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "alchemist-ocean-prime", title: "Ocean Prime", artist: "The Alchemist feat. Boldy James", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "gang-starr-mass-appeal", title: "Mass Appeal", artist: "Gang Starr", spotifyUri: "spotify:track:3lGBvPUgO7MJltUnBlOpe9", startSec: 0, endSec: 30 },
  { id: "gza-4th-chamber", title: "4th Chamber", artist: "GZA", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "nas-nas-is-like", title: "Nas Is Like", artist: "Nas", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
  { id: "ghostface-apollo-kids", title: "Apollo Kids", artist: "Ghostface Killah feat. Raekwon", spotifyUri: PLACEHOLDER_URI, startSec: 0, endSec: 30 },
];
