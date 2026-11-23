// Каталог берётся из внешнего источника и иногда отвечает ошибкой — повторяем запрос, прежде чем показать «ничего не нашли».
export async function fetchListings(url: URL | string, tries = 3): Promise<{ listings: any[]; totalPages: number }> {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) { const d = await r.json(); if (Array.isArray(d.listings)) return { listings: d.listings, totalPages: d.pagination?.totalPages || 1 }; }
    } catch {}
    if (i < tries - 1) await new Promise(res => setTimeout(res, 800 * (i + 1)));
  }
  return { listings: [], totalPages: 1 };
}
