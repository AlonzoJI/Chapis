// Songs that play a short clip alongside each painting.
//
// Track URIs were checked against Spotify's embed data (title and artists).
// startSec / endSec mark the clip and default to the first 30 seconds until
// each one is picked by ear.

export type Song = {
  id: string;
  title: string;
  artist: string;
  /** Format: spotify:track:<22-character id> */
  spotifyUri: string;
  startSec: number;
  endSec: number;
};

export const OPENER_SONG: Song = {
  id: "earl-alchemist-sentry",
  title: "Sentry",
  artist: "Earl Sweatshirt & The Alchemist feat. MIKE",
  // VOIR DIRE (2023) album version.
  spotifyUri: "spotify:track:48gtujiZ77wSZ29aWZe84V",
  startSec: 0,
  endSec: 30,
};

/** Random rotation. The opener is deliberately not in this list. */
export const SONGS: Song[] = [
  { id: "earl-shattered-dreams", title: "... Shattered Dreams", artist: "Earl Sweatshirt", spotifyUri: "spotify:track:2LQb3iYBzoxbxct2IexjBc", startSec: 0, endSec: 30 },
  { id: "earl-azucar", title: "Azucar", artist: "Earl Sweatshirt", spotifyUri: "spotify:track:1mAEQbdq0dZQWfujWG6rCd", startSec: 0, endSec: 30 },
  { id: "earl-red-water", title: "Red Water", artist: "Earl Sweatshirt", spotifyUri: "spotify:track:6GsLY75eZHnOAWFqdKmZ4b", startSec: 0, endSec: 30 },
  { id: "earl-fire-in-the-hole", title: "Fire in the Hole", artist: "Earl Sweatshirt", spotifyUri: "spotify:track:77ybhTvFC7kr5IeUqBP2qp", startSec: 0, endSec: 30 },
  { id: "earl-tabula-rasa", title: "Tabula Rasa", artist: "Earl Sweatshirt feat. Armand Hammer", spotifyUri: "spotify:track:5Qb5Crn9sefQ27M2lKahPM", startSec: 0, endSec: 30 },
  { id: "alchemist-nobles", title: "Nobles", artist: "The Alchemist feat. Earl Sweatshirt & Navy Blue", spotifyUri: "spotify:track:6Ecv0YG6QR0Zggsdw3u3mb", startSec: 0, endSec: 30 },
  { id: "armand-hammer-falling-out-the-sky", title: "Falling out the Sky", artist: "Armand Hammer & The Alchemist feat. Earl Sweatshirt", spotifyUri: "spotify:track:1jvbeXQgI7SA47MaXXGixh", startSec: 0, endSec: 30 },
  { id: "tyler-puppet", title: "PUPPET", artist: "Tyler, The Creator", spotifyUri: "spotify:track:0wEC0GNF74lAqrEFZJMl1m", startSec: 0, endSec: 30 },
  { id: "kendrick-untitled-05", title: "untitled 05 | 09.21.2014.", artist: "Kendrick Lamar", spotifyUri: "spotify:track:5N1BkOJ1CTHbSC1RZ6LFJu", startSec: 0, endSec: 30 },
  { id: "kendrick-these-walls", title: "These Walls", artist: "Kendrick Lamar", spotifyUri: "spotify:track:4xybr92r9x00MfLwQSvRDa", startSec: 0, endSec: 30 },
  { id: "kendrick-mortal-man", title: "Mortal Man", artist: "Kendrick Lamar", spotifyUri: "spotify:track:1zXys0cNTefboiSz6U4vYO", startSec: 0, endSec: 30 },
  { id: "kendrick-sing-about-me", title: "Sing About Me, I'm Dying Of Thirst", artist: "Kendrick Lamar", spotifyUri: "spotify:track:2FrMRG4VXI9BsffnBU7gmd", startSec: 0, endSec: 30 },
  { id: "outkast-rosa-parks", title: "Rosa Parks", artist: "Outkast", spotifyUri: "spotify:track:0shK5iZQppbHPQYiy60xs9", startSec: 0, endSec: 30 },
  { id: "ugk-intl-players-anthem", title: "Int'l Players Anthem (I Choose You)", artist: "UGK feat. Outkast", spotifyUri: "spotify:track:0DgY053iwPDydoRymeGVZX", startSec: 0, endSec: 30 },
  { id: "mach-hommy-stellar-ray-theory", title: "The Stellar Ray Theory", artist: "Mach-Hommy", spotifyUri: "spotify:track:52emBfS1l9frzMlxvaRSbE", startSec: 0, endSec: 30 },
  { id: "mach-hommy-marie", title: "Marie", artist: "Mach-Hommy", spotifyUri: "spotify:track:41glcw7981FPbxErG2iee6", startSec: 0, endSec: 30 },
  { id: "westside-gunn-margiela-split-toes", title: "Margiela Split Toes", artist: "Westside Gunn feat. Mach-Hommy", spotifyUri: "spotify:track:10RJKj63vLhQe10ZZWsbaf", startSec: 0, endSec: 30 },
  { id: "gibbs-madlib-practice", title: "Practice", artist: "Freddie Gibbs & Madlib", spotifyUri: "spotify:track:5Dx5nWIf6QKWjLsLUCXoml", startSec: 0, endSec: 30 },
  { id: "gibbs-blackest-in-the-room", title: "Blackest in the Room", artist: "Freddie Gibbs", spotifyUri: "spotify:track:5whawbmOtjIogkTeWv8PW3", startSec: 0, endSec: 30 },
  { id: "boldy-alchemist-great-adventures", title: "Great Adventures", artist: "Boldy James & The Alchemist", spotifyUri: "spotify:track:47FkzJm1bUaIc0OaGZvslL", startSec: 0, endSec: 30 },
  { id: "alchemist-ocean-prime", title: "Ocean Prime", artist: "The Alchemist feat. Boldy James", spotifyUri: "spotify:track:5467KZaTToEB680WvOd9w5", startSec: 0, endSec: 30 },
  { id: "gang-starr-mass-appeal", title: "Mass Appeal", artist: "Gang Starr", spotifyUri: "spotify:track:3lGBvPUgO7MJltUnBlOpe9", startSec: 0, endSec: 30 },
  { id: "gza-4th-chamber", title: "4th Chamber", artist: "GZA", spotifyUri: "spotify:track:4qfUlchVD7WM4JhA5xio6m", startSec: 0, endSec: 30 },
  { id: "nas-nas-is-like", title: "Nas Is Like", artist: "Nas", spotifyUri: "spotify:track:3gY6tiCNsuVi6s8kPV6aQg", startSec: 0, endSec: 30 },
  { id: "ghostface-apollo-kids", title: "Apollo Kids", artist: "Ghostface Killah feat. Raekwon", spotifyUri: "spotify:track:1sYdT3XzOKaduGUHc8sShQ", startSec: 0, endSec: 30 },
];
