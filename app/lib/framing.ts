// How a painting is framed when it fills the screen. Used by the opening
// screen and the idle gallery. The <img> must sit inside an element with
// `container-type: size`, because the math below uses cqw/cqh.

import type { CSSProperties } from 'react';
import type { Painting } from '@/data/paintings';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * object-position that puts the focal point at the center of the screen, as
 * far as the cover crop allows. W and H are the painting's rendered size
 * under object-fit: cover.
 */
function centeredPosition(p: Painting) {
  const aspect = p.width / p.height;
  const w = `max(100cqw, 100cqh * ${aspect})`;
  const h = `max(100cqh, 100cqw / ${aspect})`;
  const x = `clamp(100cqw - ${w}, 50cqw - ${w} * ${p.focalX}, 0px)`;
  const y = `clamp(100cqh - ${h}, 50cqh - ${h} * ${p.focalY}, 0px)`;
  return `${x} ${y}`;
}

export function paintingImageStyle(p: Painting): CSSProperties {
  if (p.zoom === 1) return { objectFit: 'cover', objectPosition: centeredPosition(p) };

  // Zoomed in: scale around the focal point and pull it toward the center,
  // but only as far as the extra size allows, so no edge of the painting shows.
  const origin = `${p.focalX * 100}% ${p.focalY * 100}%`;
  const shift = (focal: number) =>
    clamp((0.5 - focal) * 100, -(1 - focal) * (p.zoom - 1) * 100, focal * (p.zoom - 1) * 100);
  return {
    objectFit: 'cover',
    objectPosition: origin,
    transformOrigin: origin,
    transform: `translate(${shift(p.focalX)}%, ${shift(p.focalY)}%) scale(${p.zoom})`,
  };
}

/** Alt text: the title and artist, then what is in the picture. */
export const paintingAlt = (p: Painting) => `${p.title} by ${p.artist}. ${p.alt}`;
