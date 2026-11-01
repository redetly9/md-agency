import { NextRequest, NextResponse } from 'next/server';
import { q } from '@/lib/pg';
import { DEVICE_COOKIE } from '@/lib/device';
import { randomUUID } from 'crypto';
import { getUserFromRequest } from '@/lib/auth-server';

const KINDS = ['lead', 'preapproval', 'question', 'property', 'investor'];
const str = (v: any, n = 200) => (v == null ? null : String(v).trim().slice(0, n) || null);
const int = (v: any) => (v == null || v === '' || isNaN(Number(v)) ? null : Math.round(Number(v)));

function deviceFrom(req: NextRequest) {
  return req.cookies.get(DEVICE_COOKIE)?.value || null;
}

export async function POST(req: NextRequest) {
  let b: any;
  try { b = await req.json(); } catch { return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 }); }
  const contact = str(b.contact) || str(b.phone) || str(b.email);
  if (!contact) return NextResponse.json({ error: 'Укажите телефон или email' }, { status: 400 });
  const kind = KINDS.includes(b.kind) ? b.kind : 'lead';
  let device = deviceFrom(req);
  const setCookie = !device;
  if (!device) device = randomUUID();
  const user = await getUserFromRequest(req);

  try {
    const rows = await q(
      `INSERT INTO leads (kind, name, contact, phone, email, city, budget, down_payment, term_months, limit_price, property_price, listing_id, listing_title, message, source, role, device_id, locale, user_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19) RETURNING id, status, created_at`,
      [kind, str(b.name, 120), contact, str(b.phone, 40), str(b.email, 120), str(b.city, 80), int(b.budget), int(b.down_payment), int(b.term_months), int(b.limit_price), int(b.property_price),
       str(b.listing_id, 80), str(b.listing_title, 200), str(b.message, 4000), str(b.source, 120), str(b.role, 20) || 'client', device, str(b.locale, 5) || 'ru', user?.id ?? null],
    );
    await q(`INSERT INTO lead_events (lead_id, status, note, author) VALUES ($1, 'new', 'Заявка создана на сайте', 'site')`, [rows[0].id]);
    const res = NextResponse.json({ ok: true, id: rows[0].id, status: rows[0].status }, { status: 201 });
    if (setCookie) res.cookies.set(DEVICE_COOKIE, device, { httpOnly: true, sameSite: 'lax', secure: true, maxAge: 60 * 60 * 24 * 365, path: '/' });
    return res;
  } catch (e: any) {
    console.error('leads insert failed:', e?.message);
    return NextResponse.json({ error: 'Сервис временно недоступен' }, { status: 503 });
  }
}

export async function GET(req: NextRequest) {
  const device = deviceFrom(req);
  const user = await getUserFromRequest(req);
  if (!device && !user) return NextResponse.json({ leads: [] });
  try {
    const leads = await q(
      `SELECT l.id, l.kind, l.status, l.created_at, l.updated_at, l.city, l.limit_price, l.property_price, l.listing_title, l.message,
              COALESCE(json_agg(json_build_object('status', e.status, 'note', e.note, 'at', e.created_at) ORDER BY e.created_at) FILTER (WHERE e.id IS NOT NULL), '[]') AS events
       FROM leads l LEFT JOIN lead_events e ON e.lead_id = l.id
       WHERE ($1::text IS NOT NULL AND l.device_id = $1) OR ($2::uuid IS NOT NULL AND l.user_id = $2) GROUP BY l.id ORDER BY l.created_at DESC LIMIT 50`, [device, user?.id ?? null]);
    return NextResponse.json({ leads });
  } catch (e: any) {
    console.error('leads select failed:', e?.message);
    return NextResponse.json({ leads: [], error: 'unavailable' }, { status: 503 });
  }
}
