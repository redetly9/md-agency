/** Тарифы для продавцов. Структура как на Krisha.kz, цены наши — меняются здесь. */
export type Tariff = { id: string; name: string; desc: string; price: number; period: string; badge?: string; highlight?: boolean };

export const LISTING_TARIFFS: Tariff[] = [
  { id: 'free', name: 'Размещение', desc: 'Объявление в каталоге MD на 30 дней. Первое объявление бесплатно.', price: 0, period: '30 дней' },
  { id: 'urgent', name: 'Срочно / Торг', desc: 'Жёлтая метка «Срочно» или «Торг» на карточке на всё время размещения.', price: 190, period: 'разово' },
  { id: 'top', name: 'ТОП', desc: 'Поднятие объявления в начало списка в своём городе.', price: 1490, period: '24 часа' },
  { id: 'hot', name: 'Горячее предложение', desc: 'Объявление попадает в блок «Горячие предложения» на главной и в каталоге.', price: 1490, period: '24 часа' },
  { id: 'top8', name: 'ТОП на сутки ×8', desc: '8 поднятий каждые 2 часа с 8:00 до 23:45.', price: 2990, period: '24 часа' },
  { id: 'week5', name: 'Пакет на неделю ×5', desc: 'Ежедневное поднятие в ТОП и в «Горячие», зелёная подсветка карточки.', price: 7990, period: '7 дней', badge: 'Популярно', highlight: true },
  { id: 'month15', name: 'Пакет на месяц ×15', desc: 'Ежедневный ТОП, 12 выходов в «Горячие», красная подсветка, менеджер MD.', price: 19990, period: '28 дней', badge: 'Максимум' },
];

export const SELLER_COMMISSION = { consult: 35000, dealPercent: 10 };
