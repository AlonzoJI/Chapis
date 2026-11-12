// The one Spotify controller for the whole app, shared by the opening screen
// and the idle gallery. Components read MusicState through
// useSyncExternalStore and drive playback with the functions below.
//
// A "clip" is the startSec..endSec slice of a song. Every clip is guaranteed
// to end: by reaching endSec, by the track (or 30 s preview) finishing, or by
// a watchdog when playback never starts or stalls. Listeners registered with
// onClipEnd use that to advance the gallery.

import { OPENER, SONGS, type Song } from '@/data/collection';
import { ShuffleBag } from './shuffleBag';
import { loadSpotifyIframeApi, type EmbedController, type PlaybackUpdate } from './spotify';

export type MusicMode = 'hidden' | 'docked' | 'gallery';
/** blocked: the browser refused to start audio; the visitor must tap play in the embed. */
export type MusicStatus = 'off' | 'loading' | 'playing' | 'blocked';

export type MusicState = {
  mode: MusicMode;
  status: MusicStatus;
  song: Song | null;
  muted: boolean;
  /** False once the embed failed to load; callers fall back to timers. */
  available: boolean;
};

/** If playback has not started this long after play(), assume the browser blocked it. */
const BLOCKED_AFTER_MS = 4000;
/** Extra time past the clip length before the watchdog ends a clip anyway. */
const WATCHDOG_SLACK_MS = 6000;
/** End conditions are ignored this long after audio starts, so a seek can land. */
const SETTLE_MS = 1500;

const SERVER_STATE: MusicState = { mode: 'hidden', status: 'off', song: null, muted: false, available: true };

let state: MusicState = SERVER_STATE;
const stateListeners = new Set<() => void>();
const clipEndListeners = new Set<() => void>();

function setState(patch: Partial<MusicState>) {
  state = { ...state, ...patch };
  stateListeners.forEach(listener => listener());
}

export function subscribeMusic(listener: () => void) {
  stateListeners.add(listener);
  return () => { stateListeners.delete(listener); };
}
export const getMusicState = () => state;
export const getServerMusicState = () => SERVER_STATE;

/** Fires once each time the current clip ends for any reason. */
export function onClipEnd(listener: () => void) {
  clipEndListeners.add(listener);
  return () => { clipEndListeners.delete(listener); };
}

export const isPlayableUri = (uri: string) => /^spotify:track:[A-Za-z0-9]{22}$/.test(uri);
const PLAYABLE_SONGS = SONGS.filter(song => isPlayableUri(song.spotifyUri));

let debug = false;
export function setMusicDebug(on: boolean) { debug = on; }
const log = (...args: unknown[]) => { if (debug) console.info('[music]', ...args); };

// ── Controller ───────────────────────────────────────────────────────────

let controller: EmbedController | null = null;
let initStarted = false;

/** Creates the embed inside `container`. Safe to call more than once. */
export function initMusic(container: HTMLElement) {
  if (initStarted) return;
  initStarted = true;

  const firstUri = [OPENER.song, ...PLAYABLE_SONGS].find(song => isPlayableUri(song.spotifyUri))?.spotifyUri;
  if (!firstUri) {
    markUnavailable('no playable Spotify URIs in data/songs.ts');
    return;
  }

  // The API replaces the element it is given, so hand it a node React does not own.
  const host = document.createElement('div');
  container.appendChild(host);

  const giveUp = window.setTimeout(() => markUnavailable('controller never became ready'), 15_000);
  loadSpotifyIframeApi()
    .then(api => {
      api.createController(host, { uri: firstUri, width: '100%', height: 80 }, created => {
        window.clearTimeout(giveUp);
        controller = created;
        created.addListener('playback_update', handleUpdate);
        log('controller ready');
        if (clip && !clip.sentToPlayer) sendToPlayer(clip);
      });
    })
    .catch((error: unknown) => {
      window.clearTimeout(giveUp);
      markUnavailable(error instanceof Error ? error.message : 'load failed');
    });
}

function markUnavailable(reason: string) {
  log('unavailable:', reason);
  setState({ available: false });
  if (clip) endClip('embed unavailable');
}

// ── Clips ────────────────────────────────────────────────────────────────

type Clip = {
  song: Song;
  sentToPlayer: boolean;
  started: boolean;
  /** performance.now() when audio actually started. */
  startedAt: number;
  /** Where this clip ends, in seconds. Shorter than endSec on a 30 s preview. */
  endAt: number;
  /** startSec was out of reach (preview), so the track was reloaded at 0. */
  previewRetry: boolean;
  watchdog?: number;
  blockedTimer?: number;
};

let clip: Clip | null = null;

function clipMs(song: Song) {
  return Math.max(1, song.endSec - song.startSec) * 1000;
}

function clearClipTimers(c: Clip) {
  window.clearTimeout(c.watchdog);
  window.clearTimeout(c.blockedTimer);
}

function armWatchdog(c: Clip, ms: number) {
  window.clearTimeout(c.watchdog);
  c.watchdog = window.setTimeout(() => endClip('watchdog'), ms);
}

function sendToPlayer(c: Clip) {
  if (!controller) return;
  c.sentToPlayer = true;
  // loadUri, then play, then (once audio is actually running) seek to startSec.
  controller.loadUri(c.song.spotifyUri, false, c.song.startSec);
  controller.play();
  c.blockedTimer = window.setTimeout(() => {
    if (clip === c && !c.started) {
      log('blocked: waiting for a tap on the embed');
      setState({ status: 'blocked' });
    }
  }, BLOCKED_AFTER_MS);
}

function handleUpdate({ data }: PlaybackUpdate) {
  const c = clip;
  if (!c || data.playingURI !== c.song.spotifyUri) return;
  const positionSec = data.position / 1000;
  log('update', `${positionSec.toFixed(1)}/${(data.duration / 1000).toFixed(1)}s`, data.isPaused ? 'paused' : 'playing', data.isBuffering ? 'buffering' : '');

  if (!c.started && !data.isPaused && !data.isBuffering) {
    window.clearTimeout(c.blockedTimer);
    const durationSec = data.duration / 1000;
    const clipSec = c.song.endSec - c.song.startSec;

    // Signed-out visitors only get a 30 s preview, so startSec may be out of
    // reach: the player parks at the end of the preview and stops. Reload at
    // 0 and play the clip's length from the start of what is playable.
    const reachable = c.previewRetry || durationSec <= 0 || c.song.startSec < durationSec - 2;
    if (!reachable) {
      c.previewRetry = true;
      log('startSec out of reach, reloading preview at 0');
      controller?.loadUri(c.song.spotifyUri, false, 0);
      controller?.play();
      return;
    }

    c.started = true;
    c.startedAt = performance.now();
    setState({ status: 'playing' });
    const startAt = c.previewRetry ? 0 : c.song.startSec;
    c.endAt = c.previewRetry ? Math.min(clipSec, durationSec) : c.song.endSec;
    if (Math.abs(positionSec - startAt) > 1.5) controller?.seek(startAt);

    // Restart the watchdog from now, in case the visitor tapped play late.
    armWatchdog(c, (c.endAt - startAt) * 1000 + WATCHDOG_SLACK_MS);
    log('started', c.song.id, 'at', positionSec.toFixed(1), c.previewRetry ? `(preview: 0-${c.endAt.toFixed(0)}s)` : '');
    return;
  }

  if (!c.started || performance.now() - c.startedAt < SETTLE_MS) return;
  if (positionSec >= c.endAt) return endClip('reached end of clip');
  // Track or 30 s preview finished. Previews may never reach endSec.
  if (data.duration > 0 && data.position >= data.duration - 400) return endClip('track ended');
  if (data.isPaused && data.position === 0) return endClip('track reset');
}

function endClip(reason: string) {
  const ended = clip;
  if (!ended) return;
  clearClipTimers(ended);
  clip = null;
  log('clip end:', ended.song.id, reason);
  if (state.mode === 'docked') {
    controller?.pause();
    setState({ mode: 'hidden', status: 'off', song: null });
  }
  clipEndListeners.forEach(listener => listener());
}

/** Drops the current clip without notifying onClipEnd listeners. */
function abandonClip() {
  if (clip) clearClipTimers(clip);
  clip = null;
}

/**
 * Plays one clip. Call it directly inside a click handler the first time so
 * the browser treats it as user-initiated. Returns false if the song cannot
 * be played (placeholder URI or no embed); callers then use a timer.
 */
export function playClip(song: Song, mode: MusicMode): boolean {
  if (!state.available || !isPlayableUri(song.spotifyUri)) return false;
  abandonClip();
  const c: Clip = { song, sentToPlayer: false, started: false, startedAt: 0, endAt: song.endSec, previewRetry: false };
  clip = c;
  armWatchdog(c, clipMs(song) + BLOCKED_AFTER_MS + WATCHDOG_SLACK_MS);
  setState({ mode, song, status: 'loading' });
  sendToPlayer(c);
  log('play', song.id, `${song.startSec}-${song.endSec}s`, controller ? '' : '(queued until ready)');
  return true;
}

/** Stops audio and hides the card. Used by the close button and when leaving idle. */
export function stopMusic() {
  abandonClip();
  rotationKey = null;
  controller?.pause();
  setState({ mode: 'hidden', status: 'off', song: null });
}

// ── Idle rotation ────────────────────────────────────────────────────────

let songBag: ShuffleBag<Song> | null = null;
let rotationKey: string | null = null;

function nextRotationSong() {
  songBag ??= new ShuffleBag(PLAYABLE_SONGS);
  return songBag.next();
}

const rotationEnabled = () => state.available && !state.muted && PLAYABLE_SONGS.length > 0;

/**
 * Starts the first rotation song. Call synchronously from the gesture that
 * opens the gallery; the gallery then claims it for its first painting.
 */
export function primeRotation() {
  rotationKey = null;
  if (!rotationEnabled()) return;
  if (playClip(nextRotationSong(), 'gallery')) rotationKey = '0';
}

/**
 * Makes sure a clip is playing for the painting identified by `key`.
 * Reuses the current clip if it was already started for this key.
 */
export function ensureRotationClip(key: string): boolean {
  if (!rotationEnabled()) return false;
  if (rotationKey === key) return clip !== null;
  rotationKey = key;
  return playClip(nextRotationSong(), 'gallery');
}

/** Mute pauses music; the gallery falls back to its timer until unmuted. */
export function setMuted(muted: boolean) {
  if (muted) {
    abandonClip();
    rotationKey = null;
    controller?.pause();
    setState({ muted, status: 'off', song: null });
  } else {
    setState({ muted });
  }
}
