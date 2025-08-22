const hits = new Map<string, { count: number; ts: number }>();
export function rateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const rec = hits.get(key) ?? { count: 0, ts: now };
  if (now - rec.ts > windowMs) { rec.count = 0; rec.ts = now; }
  rec.count++;
  hits.set(key, rec);
  return rec.count <= limit;
}