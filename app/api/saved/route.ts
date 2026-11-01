import { NextRequest, NextResponse } from 'next/server';
import { q } from '@/lib/pg';
import { DEVICE_COOKIE } from '@/lib/device';
import { randomUUID } from 'crypto';

function dev(req: NextRequest) { return req.cookies.get(DEVICE_COOKIE)?.value || null; }

export async function GET(req: NextRequest) {
  const d = dev(req);
  if (!d) return NextResponse.json({ items: [] });
  try { return NextResponse.json({ items: await q('SELECT listing_id, snapshot, created_at FROM saved_listings WHERE device_id=$1 ORDER BY created_at DESC', [d]) }); }
  catch { return NextResponse.json({ items: [] }, { status: 503 }); }
}

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => null);
  if (!b?.listing_id) return NextResponse.json({ error: 'listing_id' }, { status: 400 });
  let d = dev(req); const set = !d; if (!d) d = randomUUID();
  try {
    await q('INSERT INTO saved_listings (device_id, listing_id, snapshot) VALUES ($1,$2,$3) ON CONFLICT (device_id, listing_id) DO UPDATE SET snapshot = EXCLUDED.snapshot', [d, String(b.listing_id), JSON.stringify(b.snapshot ?? {})]);
    const res = NextResponse.json({ ok: true });
    if (set) res.cookies.set(DEVICE_COOKIE, d, { httpOnly: true, sameSite: 'lax', secure: true, maxAge: 31536000, path: '/' });
    return res;
  } catch { return NextResponse.json({ error: 'unavailable' }, { status: 503 }); }
}

export async function DELETE(req: NextRequest) {
  const d = dev(req); const id = new URL(req.url).searchParams.get('listing_id');
  if (!d || !id) return NextResponse.json({ ok: true });
  try { await q('DELETE FROM saved_listings WHERE device_id=$1 AND listing_id=$2', [d, id]); } catch {}
  return NextResponse.json({ ok: true });
}
