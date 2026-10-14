import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

type Question = { name: string; contact: string; message: string; role: string };

// 1) Supabase: таблица public.questions (см. supabase_support_tables.sql)
async function saveToSupabase(q: Question): Promise<boolean> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return false;
  try {
    const { error } = await supabase.from('questions').insert({ ...q, source: 'messages' });
    if (error) { console.error('questions: supabase insert failed:', error.message); return false; }
    return true;
  } catch (e: any) {
    console.error('questions: supabase unreachable:', e?.message);
    return false;
  }
}

// 2) Telegram: если заданы TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID, вопрос уходит в чат
async function sendToTelegram(q: Question): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;
  const roleLabel = q.role === 'investor' ? 'Инвестор' : q.role === 'partner' ? 'Партнёр' : 'Клиент';
  const text = `📩 Новый вопрос с сайта (${roleLabel})\n\n${q.message}\n\n👤 ${q.name || 'без имени'}\n📞 ${q.contact}`;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    return res.ok;
  } catch (e: any) {
    console.error('questions: telegram failed:', e?.message);
    return false;
  }
}

// POST — вопрос от клиента или инвестора из раздела «Сообщения».
export async function POST(request: NextRequest) {
  let body: any;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 }); }

  const q: Question = {
    name: String(body.name ?? '').trim().slice(0, 120),
    contact: String(body.contact ?? '').trim().slice(0, 120),
    message: String(body.message ?? '').trim().slice(0, 4000),
    role: ['client', 'investor', 'partner'].includes(body.role) ? body.role : 'client',
  };
  if (!q.contact || !q.message) {
    return NextResponse.json({ error: 'Укажите контакт и текст вопроса' }, { status: 400 });
  }

  const [db, tg] = await Promise.all([saveToSupabase(q), sendToTelegram(q)]);
  if (db || tg) return NextResponse.json({ ok: true, saved: db, notified: tg }, { status: 201 });

  return NextResponse.json(
    { error: 'Сервис приёма вопросов временно недоступен. Напишите нам в WhatsApp.', fallback: 'whatsapp' },
    { status: 503 },
  );
}
