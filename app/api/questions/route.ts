import { NextRequest } from 'next/server';
import { POST as createLead } from '@/app/api/leads/route';

// Совместимость: старая форма вопросов пишет в общую таблицу заявок.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const forwarded = new NextRequest(req.url, { method: 'POST', headers: req.headers, body: JSON.stringify({ ...body, kind: 'question', source: body.source || 'messages' }) });
  return createLead(forwarded);
}
