// Tracks whether the opening screen has been dismissed in this browser
// session. Read it with useSyncExternalStore so the server and the first
// client render agree (both "not seen"), then the client corrects itself.
//
// app/layout.tsx also reads this key before first paint and adds the
// OPENING_SEEN_CLASS to <html>, so a returning visitor never sees a flash of
// the opening screen while the page hydrates.

export const OPENING_SEEN_KEY = 'chapis_opening_seen_v1';
export const OPENING_SEEN_CLASS = 'opening-seen';

const listeners = new Set<() => void>();

export function subscribeOpeningSeen(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getOpeningSeen(): boolean {
  try {
    return sessionStorage.getItem(OPENING_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

export function getOpeningSeenOnServer(): boolean {
  return false;
}

export function markOpeningSeen() {
  try {
    sessionStorage.setItem(OPENING_SEEN_KEY, '1');
  } catch {
    // Private mode or blocked storage: the screen just shows again next load.
  }
  document.documentElement.classList.add(OPENING_SEEN_CLASS);
  listeners.forEach(listener => listener());
}
