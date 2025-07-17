import { NextResponse } from 'next/server';
import axios from 'axios';
import { load } from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dealType = searchParams.get('dealType') || 'prodazha'; // prodazha или arenda
  const propertyType = searchParams.get('propertyType') || 'kvartiry';
  const page = searchParams.get('page') || '1';
  
  try {
    const URL = `https://krisha.kz/${dealType}/${propertyType}/?page=${page}`;
    const response = await axios.get(URL);
    const html = response.data;
    const $ = load(html);

    const listings: any[] = [];
    
    $('.a-card__inc').each((_, element) => {
      const title = $(element).find('.a-card__title').text().trim();
      const description = $(element).find('.a-card__text-preview').text().trim() || 'Описание отсутствует';
      const imageSrc = $(element).find('.a-card__image img').attr('src') || 
                      $(element).find('.a-card__image img').attr('data-src');
      const price = parseInt($(element).find('.a-card__price').text().replace(/[^\d]/g, '') || '0');
      const city = $(element).find('.a-card__stats-item').first().text().trim();
      const subtitle = $(element).find('.a-card__subtitle').text().trim();
      const [district, street] = subtitle.split(',').map(item => item.trim());
      const link = $(element).find('a').attr('href');
      const id = link ? link.match(/\/show\/(\d+)/)?.[1] : null;
      
      // Парсим площадь из заголовка или описания
      const roomCount = title.match(/\d+/)?.[0] || '';
      const area = $(element).find('.a-card__subtitle-additional').text().match(/(\d+\.?\d*)\s*м²/)?.[1] ||
                   title.match(/(\d+\.?\d*)\s*м²/)?.[1] ||
                   $(element).find('.a-card__stats-item').text().match(/(\d+\.?\d*)\s*м²/)?.[1] || 
                   '60'; // значение по умолчанию

      listings.push({
        id,
        title,
        description,
        imageSrc,
        price,
        city,
        district: district || 'Неизвестный район',
        street: street || 'Неизвестная улица',
        roomCount: parseInt(roomCount) || 1,
        area: area + ' м²',
        link: link ? `https://krisha.kz${link}` : null,
      });
    });

    // Получаем общее количество страниц
    const pagination = $('.paginator');
    const lastPage = pagination.find('a').last().prev().text() || '1';
    
    return NextResponse.json({
      listings,
      pagination: {
        currentPage: parseInt(page),
        totalPages: parseInt(lastPage),
      }
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
} 