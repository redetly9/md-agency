import { NextRequest, NextResponse } from 'next/server';
import { q } from '@/lib/pg';
import { DEVICE_COOKIE } from '@/lib/device';
import { getUserFromRequest } from '@/lib/auth-server';

/** После входа: привязать заявки и избранное этого устройства к пользователю, обновить профиль. */
export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const device = req.cookies.get(DEVICE_COOKIE)?.value || null;
  const b = await req.json().catch(() => ({}));
  try {
    await q(`INSERT INTO profiles (user_id, email, phone, name, device_id) VALUES ($1,$2,$3,$4,$5)
             ON CONFLICT (user_id) DO UPDATE SET email = COALESCE(EXCLUDED.email, profiles.email), phone = COALESCE(EXCLUDED.phone, profiles.phone), name = COALESCE(EXCLUDED.name, profiles.name), device_id = COALESCE(EXCLUDED.device_id, profiles.device_id)`,
      [user.id, user.email ?? null, user.phone ?? b.phone ?? null, b.name ?? null, device]);
    if (device) {
      await q('UPDATE leads SET user_id = $1 WHERE device_id = $2 AND user_id IS NULL', [user.id, device]);
      await q('UPDATE saved_listings SET user_id = $1 WHERE device_id = $2 AND user_id IS NULL', [user.id, device]);
    }
    const prof = await q('SELECT name, phone, email, city FROM profiles WHERE user_id = $1', [user.id]);
    return NextResponse.json({ ok: true, profile: prof[0] ?? null });
  } catch (e: any) { console.error('me failed:', e?.message); return NextResponse.json({ error: 'unavailable' }, { status: 503 }); }
}
