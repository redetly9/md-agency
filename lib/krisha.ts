import axios from 'axios';
import { unstable_cache } from 'next/cache';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Referer': 'https://krisha.kz',
};

/**
 * Загружает страницу Krisha и кэширует её на ttl секунд, чтобы один и тот же
 * запрос не уходил на Krisha при каждом открытии каталога. Неудачные ответы
 * (ошибка или страница без ожидаемой разметки) не кэшируются.
 */
export function krishaHtml(url: string, mustContain: string, ttl: number): Promise<string> {
  return unstable_cache(
    async () => {
      const res = await axios.get(url, { headers: HEADERS, timeout: 10000 });
      const html = res.data;
      if (typeof html !== 'string' || !html.includes(mustContain)) throw new Error('Unexpected response from Krisha');
      return html;
    },
    ['krisha-html', url],
    { revalidate: ttl },
  )();
}
