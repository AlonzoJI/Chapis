import { OPENER_PAINTING, type Painting } from "./paintings";
import { OPENER_SONG, type Song } from "./songs";

/** Always shown first. Never drawn from the random rotation. */
export const OPENER: { painting: Painting; song: Song } = {
  painting: OPENER_PAINTING,
  song: OPENER_SONG,
};
