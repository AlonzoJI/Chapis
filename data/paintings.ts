// Paintings for the hero backdrop. Images live under /public/art and are not
// downloaded yet; see README "Art and music assets" for sources.
//
// focalX / focalY are 0..1 fractions of the image width / height. They feed
// CSS object-position (and transform-origin when zoom > 1), so a crop keeps the
// subject in frame on both wide and portrait screens.
//
// Focal points and zoom values below are starting estimates. Tune them once the
// real files are in /public/art.

export type Painting = {
  id: string;
  title: string;
  artist: string;
  year: string;
  museum: string;
  image: `/art/${string}`;
  /** Pixel size of the working copy in public/art. */
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  /** 1 shows the full crop; higher values zoom in around the focal point. */
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
    image: "/art/gericault-raft-of-the-medusa.jpg",
    width: 3200,
    height: 2184,
    focalX: 0.55,
    focalY: 0.45,
    zoom: 1,
  },
  {
    id: "veronese-wedding-at-cana",
    title: "The Wedding at Cana",
    artist: "Paolo Veronese",
    year: "1563",
    museum: "Musée du Louvre",
    image: "/art/veronese-wedding-at-cana.jpg",
    width: 3200,
    height: 2143,
    focalX: 0.5,
    focalY: 0.5,
    zoom: 1,
  },
  {
    id: "delacroix-liberty-leading-the-people",
    title: "Liberty Leading the People",
    artist: "Eugène Delacroix",
    year: "1830",
    museum: "Musée du Louvre",
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
    image: "/art/shahnama-feast-of-sada.jpg",
    width: 2241,
    height: 3200,
    focalX: 0.5,
    focalY: 0.45,
    zoom: 1,
  },
  {
    id: "rivera-man-controller-of-the-universe",
    title: "Man, Controller of the Universe",
    artist: "Diego Rivera",
    year: "1934",
    museum: "Palacio de Bellas Artes, Mexico City",
    image: "/art/rivera-man-controller-of-the-universe.jpg",
    width: 2560,
    height: 1920,
    focalX: 0.5,
    focalY: 0.5,
    zoom: 1,
    credit: RIVERA_CREDIT,
  },
  {
    id: "rivera-dream-of-a-sunday-afternoon",
    title: "Dream of a Sunday Afternoon in Alameda Park",
    artist: "Diego Rivera",
    year: "1947",
    museum: "Museo Mural Diego Rivera, Mexico City",
    image: "/art/rivera-dream-of-a-sunday-afternoon.jpg",
    width: 3200,
    height: 1800,
    focalX: 0.5,
    focalY: 0.5,
    zoom: 1,
    credit: RIVERA_CREDIT,
  },
  {
    id: "moran-grand-canyon-of-the-yellowstone",
    title: "The Grand Canyon of the Yellowstone",
    artist: "Thomas Moran",
    year: "1872",
    museum: "Smithsonian American Art Museum",
    image: "/art/moran-grand-canyon-of-the-yellowstone.jpg",
    width: 1555,
    height: 895,
    focalX: 0.5,
    focalY: 0.45,
    zoom: 1,
  },
  {
    id: "van-gogh-green-wheat-fields-auvers",
    title: "Green Wheat Fields, Auvers",
    artist: "Vincent van Gogh",
    year: "1890",
    museum: "National Gallery of Art, Washington",
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
    image: "/art/hopper-nighthawks.jpg",
    width: 3200,
    height: 1746,
    focalX: 0.6,
    focalY: 0.55,
    zoom: 1,
  },
  {
    id: "van-gogh-starry-night",
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    year: "1889",
    museum: "The Museum of Modern Art",
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
    image: "/art/holbein-the-ambassadors.jpg",
    width: 1280,
    height: 1261,
    focalX: 0.5,
    focalY: 0.45,
    zoom: 1,
  },
  {
    // Tight crop on the horse's head, upper left of the canvas.
    id: "stubbs-whistlejacket",
    title: "Whistlejacket",
    artist: "George Stubbs",
    year: "c. 1762",
    museum: "The National Gallery, London",
    image: "/art/stubbs-whistlejacket.jpg",
    width: 2622,
    height: 3200,
    focalX: 0.3,
    focalY: 0.22,
    zoom: 2.4,
  },
];
