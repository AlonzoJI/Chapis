// Paintings for the hero backdrop. Images live under /public/art and are not
// downloaded yet; see README "Art and music assets" for sources.
//
// focalX / focalY are 0..1 fractions of the image width / height. The idle
// gallery moves that point to the center of the screen, as far as the crop
// allows, on both wide and portrait screens.
//
// Focal points and zoom values below are starting estimates. Tune them once the
// real files are in /public/art.

export type Painting = {
  id: string;
  title: string;
  artist: string;
  year: string;
  museum: string;
  /** What is in the picture, for screen readers. Title and artist are added automatically. */
  alt: string;
  image: `/art/${string}`;
  /** Pixel size of the working copy in public/art. */
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  /** 1 fills the screen; higher values zoom in around the focal point. */
  zoom: number;
  credit?: string;
};

const RIVERA_CREDIT =
  "© Banco de México Diego Rivera Frida Kahlo Museums Trust / ARS, New York";

export const OPENER_PAINTING: Painting = {
  id: "ruisdael-jewish-cemetery",
  title: "The Jewish Cemetery",
  artist: "Jacob van Ruisdael",
  year: "c. 1654-1655",
  museum: "Detroit Institute of Arts",
  alt: "Ruined church towers and pale tombs in a wooded cemetery under a stormy sky, with a faint rainbow and a stream in the foreground.",
  image: "/art/ruisdael-jewish-cemetery.jpg",
  width: 2700,
  height: 2079,
  focalX: 0.45,
  focalY: 0.45,
  zoom: 1,
};

/** Random rotation. The opener is deliberately not in this list. */
export const PAINTINGS: Painting[] = [
  {
    id: "caillebotte-paris-street-rainy-day",
    title: "Paris Street; Rainy Day",
    artist: "Gustave Caillebotte",
    year: "1877",
    museum: "Art Institute of Chicago",
    alt: "A wet cobblestone intersection in Paris with people under grey umbrellas, and a well-dressed couple walking toward the viewer.",
    image: "/art/caillebotte-paris-street-rainy-day.jpg",
    width: 3200,
    height: 2424,
    focalX: 0.7,
    focalY: 0.5,
    zoom: 1,
  },
  {
    id: "friedrich-abbey-in-the-oakwood",
    title: "The Abbey in the Oakwood",
    artist: "Caspar David Friedrich",
    year: "1809-1810",
    museum: "Alte Nationalgalerie, Berlin",
    alt: "Monks carry a coffin toward the ruined Gothic doorway of an abbey among bare oak trees at a snowy winter dusk.",
    image: "/art/friedrich-abbey-in-the-oakwood.jpg",
    width: 3200,
    height: 2050,
    focalX: 0.5,
    focalY: 0.55,
    zoom: 1,
  },
  {
    id: "cole-the-oxbow",
    title: "The Oxbow",
    artist: "Thomas Cole",
    year: "1836",
    museum: "The Metropolitan Museum of Art",
    alt: "A storm clears over a wooded mountainside on the left while the Connecticut River loops through sunlit farmland on the right.",
    image: "/art/cole-the-oxbow.jpg",
    width: 3200,
    height: 2186,
    focalX: 0.6,
    focalY: 0.55,
    zoom: 1,
  },
  {
    id: "gericault-raft-of-the-medusa",
    title: "The Raft of the Medusa",
    artist: "Théodore Géricault",
    year: "1818-1819",
    museum: "Musée du Louvre",
    alt: "Shipwreck survivors heaped on a makeshift raft in rough seas, some reaching and waving toward a distant ship.",
    image: "/art/gericault-raft-of-the-medusa.jpg",
    width: 3200,
    height: 2184,
    focalX: 0.55,
    focalY: 0.45,
    zoom: 1,
  },
  {
    // Focal point on Jesus, seated at the center of the table.
    id: "veronese-wedding-at-cana",
    title: "The Wedding at Cana",
    artist: "Paolo Veronese",
    year: "1563",
    museum: "Musée du Louvre",
    alt: "A crowded banquet in a grand courtyard, with Christ seated at the center of the table among guests, musicians and servants.",
    image: "/art/veronese-wedding-at-cana.jpg",
    width: 3200,
    height: 2143,
    focalX: 0.5,
    focalY: 0.65,
    zoom: 1,
  },
  {
    id: "delacroix-liberty-leading-the-people",
    title: "Liberty Leading the People",
    artist: "Eugène Delacroix",
    year: "1830",
    museum: "Musée du Louvre",
    alt: "Liberty, holding the French tricolor flag and a musket, leads armed Parisians over a barricade of fallen bodies.",
    image: "/art/delacroix-liberty-leading-the-people.jpg",
    width: 3200,
    height: 2560,
    focalX: 0.5,
    focalY: 0.35,
    zoom: 1,
  },
  {
    id: "shahnama-feast-of-sada",
    title: "The Feast of Sada, Folio 22v from the Shahnama of Shah Tahmasp",
    artist: "Attributed to Sultan Muhammad",
    year: "c. 1525",
    museum: "The Metropolitan Museum of Art",
    alt: "A Persian manuscript painting of a king and his court gathered around a bonfire in a rocky landscape with animals and panels of calligraphy.",
    image: "/art/shahnama-feast-of-sada.jpg",
    width: 2241,
    height: 3200,
    focalX: 0.5,
    focalY: 0.45,
    zoom: 1,
  },
  {
    // Focal point on the man at the controls.
    id: "rivera-man-controller-of-the-universe",
    title: "Man, Controller of the Universe",
    artist: "Diego Rivera",
    year: "1934",
    museum: "Palacio de Bellas Artes, Mexico City",
    alt: "A worker in overalls at the controls of a machine, gripping a glowing sphere, with views of the cosmos and of living cells on either side.",
    image: "/art/rivera-man-controller-of-the-universe.jpg",
    width: 2560,
    height: 1920,
    focalX: 0.52,
    focalY: 0.3,
    zoom: 1,
    credit: RIVERA_CREDIT,
  },
  {
    // The source is a photo of the mural in its room; the zoom crops out the
    // curved ceiling border and the wooden base.
    id: "rivera-dream-of-a-sunday-afternoon",
    title: "Dream of a Sunday Afternoon in Alameda Park",
    artist: "Diego Rivera",
    year: "1947",
    museum: "Museo Mural Diego Rivera, Mexico City",
    alt: "A crowded Sunday promenade in Mexico City’s Alameda Park, with an elegant skeleton in a feathered hat at the center beside a young Diego Rivera and Frida Kahlo.",
    image: "/art/rivera-dream-of-a-sunday-afternoon.jpg",
    width: 3200,
    height: 1800,
    focalX: 0.47,
    focalY: 0.46,
    zoom: 1.6,
    credit: RIVERA_CREDIT,
  },
  {
    id: "moran-grand-canyon-of-the-yellowstone",
    title: "The Grand Canyon of the Yellowstone",
    artist: "Thomas Moran",
    year: "1872",
    museum: "Smithsonian American Art Museum",
    alt: "A golden, steep-walled canyon in Yellowstone with a waterfall and mist at its far end and tiny figures on a rock ledge in the foreground.",
    image: "/art/moran-grand-canyon-of-the-yellowstone.jpg",
    width: 1555,
    height: 895,
    focalX: 0.34,
    focalY: 0.5,
    zoom: 1,
  },
  {
    id: "van-gogh-green-wheat-fields-auvers",
    title: "Green Wheat Fields, Auvers",
    artist: "Vincent van Gogh",
    year: "1890",
    museum: "National Gallery of Art, Washington",
    alt: "Rolling green wheat fields with small yellow flowers under swirling white and blue clouds, painted in thick brushstrokes.",
    image: "/art/van-gogh-green-wheat-fields-auvers.jpg",
    width: 3200,
    height: 2511,
    focalX: 0.5,
    focalY: 0.5,
    zoom: 1,
  },
  {
    id: "hopper-nighthawks",
    title: "Nighthawks",
    artist: "Edward Hopper",
    year: "1942",
    museum: "Art Institute of Chicago",
    alt: "A brightly lit corner diner at night seen through a large window, with three customers at the counter and a server in white.",
    image: "/art/hopper-nighthawks.jpg",
    width: 3200,
    height: 1746,
    focalX: 0.71,
    focalY: 0.58,
    zoom: 1,
  },
  {
    id: "van-gogh-starry-night",
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    year: "1889",
    museum: "The Museum of Modern Art",
    alt: "A swirling night sky full of glowing stars and a crescent moon over a quiet village, with a dark cypress tree in the foreground.",
    image: "/art/van-gogh-starry-night.jpg",
    width: 1280,
    height: 1014,
    focalX: 0.5,
    focalY: 0.4,
    zoom: 1,
  },
  {
    id: "holbein-the-ambassadors",
    title: "The Ambassadors",
    artist: "Hans Holbein the Younger",
    year: "1533",
    museum: "The National Gallery, London",
    alt: "Two richly dressed men stand beside a shelf of globes, instruments and a lute, with a distorted skull stretched across the floor.",
    image: "/art/holbein-the-ambassadors.jpg",
    width: 1280,
    height: 1261,
    focalX: 0.5,
    focalY: 0.38,
    zoom: 1,
  },
  {
    // Tight crop on the horse's head, which faces right at the upper right.
    id: "stubbs-whistlejacket",
    title: "Whistlejacket",
    artist: "George Stubbs",
    year: "c. 1762",
    museum: "The National Gallery, London",
    alt: "A chestnut racehorse with a pale mane and tail rears up against a plain background.",
    image: "/art/stubbs-whistlejacket.jpg",
    width: 2622,
    height: 3200,
    focalX: 0.82,
    focalY: 0.36,
    zoom: 2.4,
  },
];
