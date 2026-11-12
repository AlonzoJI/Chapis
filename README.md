This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Art and music assets

Painting data lives in `data/paintings.ts` and song data in `data/songs.ts`. `data/opener.ts` pairs the fixed opener painting and song, which always show first and are never part of the random rotation.

### Images

Full-size originals from Wikimedia Commons go in `art-originals/`, which is gitignored. The committed working copies in `public/art/` use the file name from each painting's `image` field. They are capped at 3200px on the long edge and saved as quality 90 JPGs with `sips -s format jpeg -s formatOptions 90 -Z 3200`. Originals already under 3200px are copied as-is. Whistlejacket is kept as the full painting, since its zoom crop happens in CSS.

Wikimedia rate-limits generic clients with HTTP 429. Send a descriptive User-Agent and download one file at a time.

Four originals were supplied by hand instead of downloaded from Commons, after the rate limit blocked them: Moran (1555x895), Green Wheat Fields (4096x3215), The Ambassadors (1280x1261) and The Starry Night (1280x1014, WebP converted to JPG). Moran, The Ambassadors and The Starry Night are well under the 3200px cap, so replace them with the Commons originals if they look soft at full width.

| File (`public/art/`) | Painting | Museum page | Wikimedia Commons |
| --- | --- | --- | --- |
| `ruisdael-jewish-cemetery.jpg` | Ruisdael, The Jewish Cemetery (opener) | [DIA collection search](https://dia.org/collection?search_api_fulltext=jewish%20cemetery) | [file](https://commons.wikimedia.org/wiki/File:Jacob_Isaackszoon_van_Ruisdael_-_The_Jewish_Cemetery_(1654_or_1655).jpg) |
| `caillebotte-paris-street-rainy-day.jpg` | Caillebotte, Paris Street; Rainy Day | [AIC (CC0 download)](https://www.artic.edu/artworks/20684) | [file](https://commons.wikimedia.org/wiki/File:Gustave_Caillebotte_-_Paris_Street%3B_Rainy_Day_-_Google_Art_Project.jpg) |
| `friedrich-abbey-in-the-oakwood.jpg` | Friedrich, The Abbey in the Oakwood | [SMB online collection](https://recherche.smb.museum/?language=en&question=Abtei%20im%20Eichwald) | [file](https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Abtei_im_Eichwald_-_Google_Art_Project.jpg) |
| `cole-the-oxbow.jpg` | Cole, The Oxbow | [The Met (open access)](https://www.metmuseum.org/art/collection/search/10497) | [file](https://commons.wikimedia.org/wiki/File:View_from_Mount_Holyoke,_Northampton,_Massachusetts,_after_a_Thunderstorm%E2%80%94The_Oxbow_MET_DP-12550-007.jpg) |
| `gericault-raft-of-the-medusa.jpg` | Géricault, The Raft of the Medusa | [Louvre collections search](https://collections.louvre.fr/en/recherche?q=radeau%20de%20la%20m%C3%A9duse) | [file](https://commons.wikimedia.org/wiki/File:JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_(Museo_del_Louvre,_1818-19).jpg) |
| `veronese-wedding-at-cana.jpg` | Veronese, The Wedding at Cana | [Louvre collections search](https://collections.louvre.fr/en/recherche?q=noces%20de%20cana) | [file](https://commons.wikimedia.org/wiki/File:Les_Noces_de_Cana_-_Paolo_Veronese_-_Mus%C3%A9e_du_Louvre_Peintures_INV_142_%3B_MR_384.jpg) |
| `delacroix-liberty-leading-the-people.jpg` | Delacroix, Liberty Leading the People | [Louvre collections search](https://collections.louvre.fr/en/recherche?q=libert%C3%A9%20guidant%20le%20peuple) | [file (post-2024 restoration)](https://commons.wikimedia.org/wiki/File:La_Libert%C3%A9_guidant_le_peuple_-_Eug%C3%A8ne_Delacroix_-_Mus%C3%A9e_du_Louvre_Peintures_RF_129_-_apr%C3%A8s_restauration_2024.jpg) |
| `shahnama-feast-of-sada.jpg` | Shahnama of Shah Tahmasp, The Feast of Sada (folio 22v) | [The Met (open access)](https://www.metmuseum.org/art/collection/search/452111) | [file](https://commons.wikimedia.org/wiki/File:%22The_Feast_of_Sada%22,_Folio_22v_from_the_Shahnama_(Book_of_Kings)_of_Shah_Tahmasp_MET_DP107689.jpg) |
| `rivera-man-controller-of-the-universe.jpg` | Rivera, Man, Controller of the Universe | [Palacio de Bellas Artes](https://museopalaciodebellasartes.gob.mx/) | [file (partial view)](https://commons.wikimedia.org/wiki/File:Palacio_de_Bellas_Artes_-_Mural_El_Hombre_in_cruce_de_caminos_Rivera_3.jpg) |
| `rivera-dream-of-a-sunday-afternoon.jpg` | Rivera, Dream of a Sunday Afternoon in Alameda Park | [Museo Mural Diego Rivera](https://inba.gob.mx/recinto/52/museo-mural-diego-rivera) | [file](https://commons.wikimedia.org/wiki/File:Sue%C3%B1o_de_una_tarde_dominical_en_la_Alameda_Central_(Dream_of_a_Sunday_Afternoon_in_the_Alameda_Central).jpg) |
| `moran-grand-canyon-of-the-yellowstone.jpg` | Moran, The Grand Canyon of the Yellowstone | [SAAM collection search](https://americanart.si.edu/search?query=grand%20canyon%20of%20the%20yellowstone) | [file](https://commons.wikimedia.org/wiki/File:Smithsonian-Moran-The_Grand_Canyon_of_the_Yellowstone-2283.jpg) |
| `van-gogh-green-wheat-fields-auvers.jpg` | Van Gogh, Green Wheat Fields, Auvers | [NGA collection search (open access)](https://www.nga.gov/collection-search-result.html?title=Green%20Wheat%20Fields) | [file](https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_Green_Wheat_Fields,_Auvers_(1890).jpg) |
| `hopper-nighthawks.jpg` | Hopper, Nighthawks | [AIC](https://www.artic.edu/artworks/111628) | [file](https://commons.wikimedia.org/wiki/File:Nighthawks_by_Edward_Hopper_1942.jpg) |
| `van-gogh-starry-night.jpg` | Van Gogh, The Starry Night | [MoMA](https://www.moma.org/collection/works/79802) | [file](https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg) |
| `holbein-the-ambassadors.jpg` | Holbein, The Ambassadors | [National Gallery search](https://www.nationalgallery.org.uk/search?q=ambassadors) | [file](https://commons.wikimedia.org/wiki/File:Hans_Holbein_the_Younger_-_The_Ambassadors_-_Google_Art_Project.jpg) |
| `stubbs-whistlejacket.jpg` | Stubbs, Whistlejacket | [National Gallery search](https://www.nationalgallery.org.uk/search?q=whistlejacket) | [file](https://commons.wikimedia.org/wiki/File:Whistlejacket_by_George_Stubbs.jpg) |

Notes:

- Ruisdael painted two versions of The Jewish Cemetery (Detroit and Dresden). The Commons file is 2700x2079 (about 1.30), which matches the Detroit canvas (142 x 189 cm, about 1.33) rather than Dresden (84 x 95 cm, about 1.13). It's still worth comparing against the DIA page by eye.
- Both Rivera murals are still under copyright and are not open access. Show the credit line from `data/paintings.ts` with them, and get permission from ARS before relying on them publicly. The Commons photo of Man, Controller of the Universe shows only part of the mural, so look for a fuller view.
- After the images are in place, adjust `focalX`, `focalY` and `zoom` by eye at phone and desktop widths.

### Spotify track URIs

Every song in `data/songs.ts` has the placeholder `spotify:track:TODO`. To get the real one:

1. In the Spotify desktop app, right-click the track (or click `...`), choose **Share**, then hold **Option** (Mac) or **Alt** (Windows) and click **Copy Spotify URI**. It looks like `spotify:track:` followed by a 22-character id.
2. Without the desktop app, use **Share > Copy Song Link** instead. That gives `https://open.spotify.com/track/<id>?si=...`. Take the `<id>` and write it as `spotify:track:<id>`.

Also set `startSec` and `endSec` for each clip. They default to `0` and `30`.
