import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { quote, maxPrice } from '@/components/v2/calc';

export const runtime = 'nodejs';
export const maxDuration = 60;

const SYSTEM = `Ты консультант компании MD (md.kz) по программе «Аренда с выкупом» в Казахстане. Отвечай кратко, дружелюбно, на языке собеседника (русский, казахский или английский).

Условия программы:
- MD покупает квартиру, клиент живёт в ней и выкупает постепенно. Без подтверждения дохода и справок.
- Первоначальный взнос 30% или 50% от стоимости. Срок от 5 до 30 лет. Досрочный выкуп в любой момент.
- Платёж = выкуп + аренда. Выкуп: остаток после взноса делится на число месяцев. Аренда считается от остатка и снижается ступенями по третям срока: 0,8% в месяц → 0,4% → 0,168%. Пример: квартира 50 млн, взнос 50%, 30 лет: 269 400 → 169 400 → 111 400 ₸ в месяц.
- Отдельно оплачивается: консультация 35 000 ₸, комиссия за оформление 10% от стоимости объекта, оценка, страховка, нотариус.
- Юридически: собственник в период выплат MD, клиент имеет право пользования и выкупа по договору, при необходимости регистрируется обременение. Накопленные платежи в счёт выкупа при выходе возвращаются по условиям договора.
- Города: Астана, Алматы, Шымкент, Караганда, Актобе и другие регионы Казахстана.

Правила: для любого расчёта вызывай инструмент calc_payment, не считай в уме. Если спрашивают лимит, используй calc_limit. Не обещай конкретных квартир и одобрения, это решает менеджер. Если вопрос вне темы недвижимости и программы, вежливо верни к теме. Если клиент готов, предложи оставить заявку: ссылка /start для предодобрения или /arenda-s-vykupom#lead для заявки. Не используй markdown-таблицы, пиши короткими абзацами.`;

const tools: Anthropic.Tool[] = [
  { name: 'calc_payment', description: 'Рассчитать платёж по аренде с выкупом', strict: true,
    input_schema: { type: 'object', additionalProperties: false, required: ['price', 'down_percent', 'years'], properties: { price: { type: 'number', description: 'стоимость квартиры в тенге' }, down_percent: { type: 'number', description: '30 или 50' }, years: { type: 'number', description: 'срок в годах 5–30' } } } },
  { name: 'calc_limit', description: 'Максимальная стоимость квартиры по бюджету и взносу', strict: true,
    input_schema: { type: 'object', additionalProperties: false, required: ['monthly_budget', 'down_available', 'years'], properties: { monthly_budget: { type: 'number' }, down_available: { type: 'number' }, years: { type: 'number' } } } },
];

function run(name: string, input: any) {
  if (name === 'calc_payment') {
    const q = quote(+input.price, +input.down_percent === 50 ? 50 : 30, Math.max(5, Math.min(30, +input.years)) * 12);
    return { down: q.down, remaining: q.remaining, buyout_per_month: q.principal, tiers: q.tiers.map(t => ({ months: `${t.from}-${t.to}`, rent: t.rent, total: q.principal + t.rent })), first: q.first, last: q.last };
  }
  if (name === 'calc_limit') { const lim = maxPrice(+input.monthly_budget, +input.down_available, Math.max(5, Math.min(30, +input.years)) * 12); return { max_price: lim, first_payment: quote(lim, 30, +input.years * 12).first }; }
  return { error: 'unknown tool' };
}

/** Виджет чата показывается только если задан ключ. */
export async function OPTIONS() { return new NextResponse(null, { status: process.env.ANTHROPIC_API_KEY ? 200 : 503 }); }

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ error: 'disabled' }, { status: 503 });
  const body = await req.json().catch(() => null);
  const history: Anthropic.MessageParam[] = Array.isArray(body?.messages) ? body.messages.slice(-20) : [];
  if (!history.length) return NextResponse.json({ error: 'empty' }, { status: 400 });
  const client = new Anthropic();
  const messages: Anthropic.MessageParam[] = [...history];
  try {
    for (let i = 0; i < 4; i++) {
      const res = await client.messages.create({
        model: 'claude-opus-5-5', max_tokens: 2000, system: [{ type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } }],
        output_config: { effort: 'low' }, tools, messages,
      });
      if (res.stop_reason === 'refusal') return NextResponse.json({ text: 'Не могу ответить на этот вопрос. Напишите менеджеру, он поможет.' });
      messages.push({ role: 'assistant', content: res.content });
      const uses = res.content.filter((b): b is Anthropic.ToolUseBlock => b.type === 'tool_use');
      if (res.stop_reason !== 'tool_use' || uses.length === 0) {
        const text = res.content.filter((b): b is Anthropic.TextBlock => b.type === 'text').map(b => b.text).join('\n').trim();
        return NextResponse.json({ text });
      }
      messages.push({ role: 'user', content: uses.map(u => ({ type: 'tool_result' as const, tool_use_id: u.id, content: JSON.stringify(run(u.name, u.input)) })) });
    }
    return NextResponse.json({ text: 'Давайте уточним детали с менеджером.' });
  } catch (e: any) {
    console.error('chat failed:', e?.message);
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }
}
