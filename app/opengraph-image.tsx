import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'MD — квартира в собственность без ипотеки';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 64, background: 'linear-gradient(135deg,#ffffff 0%,#E6F4EC 100%)', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: '#0B7A4B', color: '#fff', fontSize: 28, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>MD</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}><div style={{ fontSize: 30, fontWeight: 800, color: '#0F172A' }}>md.kz</div><div style={{ fontSize: 14, letterSpacing: 4, color: '#94A3B8' }}>RENT · LIVE · OWN</div></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, fontWeight: 800, color: '#0F172A', lineHeight: 1.05, letterSpacing: -2 }}>Квартира в собственность</div>
          <div style={{ fontSize: 76, fontWeight: 800, color: '#0B7A4B', lineHeight: 1.05, letterSpacing: -2 }}>без ипотеки</div>
          <div style={{ marginTop: 24, fontSize: 30, color: '#475569' }}>Аренда с выкупом · взнос от 30% · до 30 лет · без справок о доходах</div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {['Платёж снижается каскадом', 'Одобрение за 2 минуты', 'Казахстан'].map(t => (
            <div key={t} style={{ padding: '12px 20px', borderRadius: 999, background: '#fff', border: '1px solid #E5E7EB', color: '#0B7A4B', fontSize: 22, fontWeight: 600 }}>{t}</div>
          ))}
        </div>
      </div>
    ), { ...size },
  );
}
