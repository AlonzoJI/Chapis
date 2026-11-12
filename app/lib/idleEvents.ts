// Lets any "idle" link on the page open the gallery without prop drilling.
// IdleController listens for this event.

export const OPEN_IDLE_EVENT = 'chapis:open-idle';

export function openIdleGallery() {
  window.dispatchEvent(new Event(OPEN_IDLE_EVENT));
}
