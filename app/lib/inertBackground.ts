// Full-screen overlays (opening screen, idle gallery) make whatever sits
// behind them unreachable by keyboard and screen readers using `inert`.
// Elements opt in with a data attribute naming the overlays they sit behind,
// e.g. data-behind="opening gallery". A per-element count lets two overlays
// hold the same element without one releasing it early.

export function holdInert(overlay: 'opening' | 'gallery') {
  const elements = [...document.querySelectorAll<HTMLElement>('[data-behind]')].filter(el =>
    (el.dataset.behind ?? '').split(' ').includes(overlay),
  );
  for (const el of elements) {
    const count = Number(el.dataset.inertCount ?? '0') + 1;
    el.dataset.inertCount = String(count);
    el.inert = true;
  }
  return () => {
    for (const el of elements) {
      const count = Number(el.dataset.inertCount ?? '1') - 1;
      el.dataset.inertCount = String(count);
      if (count <= 0) el.inert = false;
    }
  };
}
