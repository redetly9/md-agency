import { NextResponse } from 'next/server';
import axios from 'axios';
import { load } from 'cheerio';

interface Listing {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  price: number;
  city: string;
  district: string;
  street: string;
  link: string;
  category: string;
  createdAt: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  area: string;
  region: string | null;
  userId: string | null;
  country: string;
  latlng: {
    lat: number;
    lng: number;
  };
}

interface ApiResponse {
  listings: Listing[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dealType = searchParams.get('dealType') || 'prodazha';
  const propertyType = searchParams.get('propertyType') || 'kvartiry';
  const page = searchParams.get('page') || '1';
  
  // Получаем параметры фильтрации
  const region = searchParams.get('region') || 'almaty';
  // Поддерживаем оба варианта: rooms=1,2 и rooms=1&rooms=2
  const roomsRaw = searchParams.getAll('rooms');
  const rooms = roomsRaw.length > 0
    ? roomsRaw
        .flatMap((v) => v.split(','))
        .map((s) => s.trim())
        .filter(Boolean)
        .join(',')
    : null;
  const building = searchParams.get('building');
  const priceFrom = searchParams.get('priceFrom');
  const priceTo = searchParams.get('priceTo');
  const areaFrom = searchParams.get('areaFrom');
  const areaTo = searchParams.get('areaTo');
  const floorFrom = searchParams.get('floorFrom');
  const floorTo = searchParams.get('floorTo');
  const notFirstFloor = searchParams.get('notFirstFloor');
  const notLastFloor = searchParams.get('notLastFloor');
  const fromDeveloper = searchParams.get('fromDeveloper');
  const fromAgents = searchParams.get('fromAgents');
  
  try {
    // Формируем URL для запроса к Krisha.kz с учетом фильтров
    console.log('regionregion', region);
    
    let URL = `https://krisha.kz/${dealType}/${propertyType}/${region}/?page=${page}`;
    
    // Добавляем параметры фильтрации в формате das[параметр]
    const filterParams = new URLSearchParams();
    
    // Комнаты
    if (rooms) {
      const roomsArray = rooms.split(',');
      roomsArray.forEach(room => {
        // Используем массивную форму параметра как на Krisha: das[live.rooms][]=1
        filterParams.append('das[live.rooms][]', room);
      });
    }
    
    // Тип дома (кирпичный/панельный/монолитный/иной)
    if (building) {
      const buildingArray = building.split(',');
      buildingArray.forEach(code => {
        // Krisha ожидает числовые коды: 1-кирпичный, 2-панельный, 3-монолитный, 4-прочее
        filterParams.append('das[flat.building]', code);
      });
    }
    
    // Цена (в тенге), как на Krisha: das[price][from]=...&das[price][to]=...
    if (priceFrom && /^\d+$/.test(priceFrom)) filterParams.append('das[price][from]', priceFrom);
    if (priceTo && /^\d+$/.test(priceTo)) filterParams.append('das[price][to]', priceTo);
    
    // Площадь
    if (areaFrom) filterParams.append('das[live.square][from]', areaFrom);
    if (areaTo) filterParams.append('das[live.square][to]', areaTo);
    
    // Этаж
    if (floorFrom) filterParams.append('das[flat.floor][from]', floorFrom);
    if (floorTo) filterParams.append('das[flat.floor][to]', floorTo);
    
    // Не первый/последний этаж
    if (notFirstFloor === '1') filterParams.append('das[floor_not_first]', '1');
    if (notLastFloor === '1') filterParams.append('das[floor_not_last]', '1');
    
    // От застройщика/агентов
    if (fromDeveloper === '1') filterParams.append('das[_sys.frombuilder]', '1');
    if (fromAgents === '1') filterParams.append('das[_sys.fromagent]', '1');
    
    // Добавляем параметры к URL
    const filterParamsString = filterParams.toString();
    if (filterParamsString) {
      URL += `&${filterParamsString}`;
    }
    
    console.log('Fetching URL:', URL);

    const axiosResponse = await axios.get(URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0',
        'Referer': 'https://krisha.kz'
      },
      timeout: 10000,
      validateStatus: function (status) {
        return status >= 200 && status < 300; // Принимаем только успешные статусы
      }
    });

    // Проверяем ответ
    console.log('Response status:', axiosResponse.status);
    
    if (!axiosResponse.data || typeof axiosResponse.data !== 'string') {
      throw new Error('Invalid response data from Krisha');
    }

    const html = axiosResponse.data;
    const $ = load(html);

    const listings: Listing[] = [];
    
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
      const idMatch = link ? link.match(/\/show\/(\d+)/) : null;
      if (!idMatch) {
        // Пропускаем рекламные/промо карточки без ссылки вида /show/{id}
        return;
      }
      const id = idMatch[1];
      // Определяем количество комнат по шаблону "N-комнатн..." (чтобы не путать с площадью/этажом)
      let roomCount = 0;
      const roomsMatch = title.toLowerCase().match(/(\d+)\s*[-–]?\s*комнат/);
      if (roomsMatch) {
        roomCount = parseInt(roomsMatch[1], 10);
      } else if (/студ/i.test(title)) {
        roomCount = 0; // студия
      }
      
      // Парсим площадь из статистики карточки
      const area = $(element).find('.a-card__stats-item').toArray()
        .map(item => $(item).text().trim())
        .find(text => text.includes('м²'))?.match(/\d+\.?\d*/)?.[0] || '';

      listings.push({
        id: id || '',
        title,
        description,
        imageSrc: imageSrc || '',
        price,
        city,
        district: district || 'Неизвестный район',
        street: street || 'Неизвестная улица',
        link: link ? `https://krisha.kz${link}` : '',
        category: propertyType,
        createdAt: new Date().toISOString(),
        roomCount,
        bathroomCount: 1,
        guestCount: roomCount * 2,
        area,
        region: null,
        userId: null,
        country: 'Казахстан',
        latlng: {
          lat: 43.238949, // Примерные координаты центра Алматы
          lng: 76.889709
        }
      });
    });

    // Локальная фильтрация по комнатности на случай, если Krisha вернула промо-блоки
    let outputListings: Listing[] = listings;
    if (rooms) {
      const requested = rooms.split(',').map((r) => parseInt(r, 10)).filter((n) => !isNaN(n));
      outputListings = listings.filter((l) => {
        return requested.some((n) => (n >= 5 ? l.roomCount >= 5 : l.roomCount === n));
      });
    }

    // Строгая фильтрация по цене (иногда в ответе Krisha могут быть промо или соседние значения)
    const minPrice = priceFrom ? parseInt(priceFrom, 10) : undefined;
    const maxPrice = priceTo ? parseInt(priceTo, 10) : undefined;
    if (minPrice !== undefined || maxPrice !== undefined) {
      outputListings = outputListings.filter((l) => {
        if (typeof l.price !== 'number' || Number.isNaN(l.price)) return false;
        if (minPrice !== undefined && l.price < minPrice) return false;
        if (maxPrice !== undefined && l.price > maxPrice) return false;
        return true;
      });
    }

    const pagination = $('.paginator');
    const lastPage = pagination.find('a').last().prev().text() || '1';
    
    // Получаем общее количество объявлений
    const totalCount = $('.search-results-nb').text().match(/\d+/g)?.join('') || '0';
    
    const apiResponse: ApiResponse = {
      listings: outputListings,
      pagination: {
        currentPage: parseInt(page),
        totalPages: parseInt(lastPage),
      }
    };

    return NextResponse.json(apiResponse);

  } catch (error: any) {
    console.error('Detailed error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers
    });

    return NextResponse.json(
      { 
        error: 'Failed to fetch data',
        details: error.message,
        url: `https://krisha.kz/${dealType}/${propertyType}/?page=${page}`
      },
      { status: 500 }
    );
  }
} 