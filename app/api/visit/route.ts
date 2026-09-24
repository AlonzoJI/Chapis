import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const COUNT_KEY = 'chapis_visitor_count';
const LAST_KEY = 'chapis_last_visitor';

type Visitor = { city: string; country: string; lat: number; lon: number; ts: number };

function sanitize(input: unknown): Visitor | null {
  if (!input || typeof input !== 'object') return null;
  const v = input as Record<string, unknown>;
  const city = typeof v.city === 'string' ? v.city.slice(0, 80) : null;
  const country = typeof v.country === 'string' ? v.country.slice(0, 8) : null;
  const lat = typeof v.lat === 'number' && isFinite(v.lat) ? v.lat : null;
  const lon = typeof v.lon === 'number' && isFinite(v.lon) ? v.lon : null;
  if (city === null || country === null || lat === null || lon === null) return null;
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
  return { city, country, lat, lon, ts: Date.now() };
}

// POST body: { city, country, lat, lon }
// Atomically swaps the stored "last visitor" with the incoming one and returns
// the previous value (whoever visited just before you) plus the visitor count.
export async function POST(req: Request) {
  let visitor: Visitor | null = null;
  try {
    visitor = sanitize(await req.json());
  } catch {}

  const count = await redis.incr(COUNT_KEY);

  if (!visitor) {
    // No usable body — just return the current last visitor without overwriting.
    const previous = await redis.get<Visitor>(LAST_KEY);
    return NextResponse.json({ count, previous: previous ?? null });
  }

  // GETSET is atomic: return old value, install new one.
  const previous = await redis.getset<Visitor>(LAST_KEY, visitor);
  return NextResponse.json({ count, previous: previous ?? null });
}

// Read-only: current count + last visitor on record.
export async function GET() {
  const [count, previous] = await Promise.all([
    redis.get<number>(COUNT_KEY),
    redis.get<Visitor>(LAST_KEY),
  ]);
  return NextResponse.json({ count: count ?? 0, previous: previous ?? null });
}
