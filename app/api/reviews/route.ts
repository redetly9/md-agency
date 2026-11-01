import { NextRequest, NextResponse } from 'next/server';
import { q } from '@/lib/pg';
import { DEVICE_COOKIE } from '@/lib/device';

export async function GET() {
  try { return NextResponse.json({ reviews: await q('SELECT id, name, city, rating, text, created_at FROM reviews WHERE approved ORDER BY created_at DESC LIMIT 20') }); }
  catch { return NextResponse.json({ reviews: [] }); }
}

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => null);
  const name = String(b?.name ?? '').trim().slice(0, 80); const text = String(b?.text ?? '').trim().slice(0, 2000);
  const rating = Math.min(5, Math.max(1, parseInt(b?.rating, 10) || 5));
  if (!name || !text) return NextResponse.json({ error: 'Укажите имя и текст' }, { status: 400 });
  try {
    await q('INSERT INTO reviews (name, city, rating, text, device_id) VALUES ($1,$2,$3,$4,$5)', [name, String(b?.city ?? '').slice(0, 80) || null, rating, text, req.cookies.get(DEVICE_COOKIE)?.value || null]);
    return NextResponse.json({ ok: true, pending: true }, { status: 201 });
  } catch { return NextResponse.json({ error: 'unavailable' }, { status: 503 }); }
}
