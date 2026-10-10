'use client';

import Link from 'next/link';

const propertyTypes = [
  { id: 'kvartiry', name: 'Квартиры', count: '214 925' },
  { id: 'doma-dachi', name: 'Дома и дачи', count: '86 608' },
  { id: 'garazhi', name: 'Гаражи и паркинги', count: '3 684' },
  { id: 'uchastkov', name: 'Участки', count: '34 708' },
  { id: 'kommercheskaya-nedvizhimost', name: 'Коммерческая недвижимость', count: '21 971' },
  { id: 'biznes', name: 'Бизнес', count: '4 167' },
  { id: 'prombazy', name: 'Промбазы и заводы', count: '2 409' },
];

export default function MortgagePage() {
  return (
    <>
      <header className="bg-[#122037] border-b px-4 py-3">
        <div className="max-w-screen-md mx-auto flex items-center gap-3">
          <Link href="/" className="text-white/55">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </Link>
          <h1 className="text-xl font-medium">Ипотека</h1>
        </div>
      </header>

      <div className="bg-[#122037]">
        <div className="max-w-screen-md mx-auto">
          <div className="divide-y">
            {propertyTypes.map((type) => (
              <Link
                key={type.id}
                href={`/listings/search/prodazha/${type.id}`}
                className="flex items-center justify-between p-4 hover:bg-white/10"
              >
                <span className="text-white">{type.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-white/55">{type.count}</span>
                  <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 