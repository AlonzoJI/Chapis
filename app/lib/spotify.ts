// Minimal typings and a one-time loader for the Spotify iFrame API.
// Reference: developer.spotify.com/documentation/embeds/references/iframe-api

export type PlaybackUpdate = {
  data: {
    playingURI: string;
    isPaused: boolean;
    isBuffering: boolean;
    /** Milliseconds. */
    duration: number;
    /** Milliseconds. */
    position: number;
  };
};

export interface EmbedController {
  /** startAt is in seconds. */
  loadUri(uri: string, preferVideo?: boolean, startAt?: number): void;
  play(): void;
  pause(): void;
  resume(): void;
  /** Seconds. */
  seek(seconds: number): void;
  destroy(): void;
  addListener(event: 'ready', handler: () => void): void;
  addListener(event: 'playback_update', handler: (e: PlaybackUpdate) => void): void;
}

export interface SpotifyIframeApi {
  createController(
    element: HTMLElement,
    options: { uri: string; width?: number | string; height?: number | string },
    callback: (controller: EmbedController) => void,
  ): void;
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}

const SCRIPT_SRC = 'https://open.spotify.com/embed/iframe-api/v1';

let apiPromise: Promise<SpotifyIframeApi> | null = null;

/** Loads the script once; later calls share the same promise. */
export function loadSpotifyIframeApi(timeoutMs = 10_000): Promise<SpotifyIframeApi> {
  apiPromise ??= new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error('Spotify iFrame API timed out')), timeoutMs);
    window.onSpotifyIframeApiReady = api => {
      window.clearTimeout(timer);
      resolve(api);
    };
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error('Spotify iFrame API failed to load'));
    };
    document.body.appendChild(script);
  });
  return apiPromise;
}
