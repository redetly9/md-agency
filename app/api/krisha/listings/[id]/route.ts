import { NextResponse } from 'next/server';
import { load } from 'cheerio';
import axios from 'axios';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const URL = `https://krisha.kz/a/show/${params.id}`;
    
    const response = await axios.get(URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://krisha.kz'
      }
    });

    const html = response.data;
    const $ = load(html);

    // Парсим все изображения
    const imageSrc: string[] = [];
    $('.gallery__small-item').each((_, element) => {
      const imgSrc = $(element).attr('data-photo-url');
      if (imgSrc) {
        imageSrc.push(imgSrc.startsWith('http') ? imgSrc : `https:${imgSrc}`);
      }
    });

    // Парсим детали объявления
    const additionalDetails: Record<string, string> = {};
    $('.offer__info-item').each((_, element) => {
      const key = $(element).attr('data-name')?.trim();
      let value = $(element).text().trim();
      if (key && value) {
        additionalDetails[key] = value;
      }
    });

    const listing = {
      id: params.id,
      title: $('h1').text().trim(),
      description: $('.offer__description .text').html() || '',
      imageSrc,
      price: parseInt($('.offer__price').text().replace(/[^\d]/g, '') || '0'),
      city: $('.offer__location').first().text().trim(),
      district: $('.offer__location span').first().text().trim(),
      street: $('.offer__location span').last().text().trim(),
      additionalDetails: {
        city: additionalDetails['city'] || '',
        houseType: additionalDetails['flat.building'] || '',
        complex: additionalDetails['map.complex'] || '',
        buildYear: additionalDetails['house.year'] || '',
        area: additionalDetails['live.square'] || '',
        bathroom: additionalDetails['flat.toilet'] || '',
        ceilingHeight: additionalDetails['ceiling'] || '',
        floor: additionalDetails['flat.floor'] || '',
        condition: additionalDetails['flat.renovation'] || '',
      },
      user: {
        name: $('.owners__name').text().trim() || 'Владелец',
        phone: $('.offer__contacts-phones').text().trim() || 'Нет телефона',
        image: $('.owners__image img').attr('src') || '/placeholder.png',
      }
    };

    return NextResponse.json(listing);

  } catch (error) {
    console.error('Error fetching listing:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listing' },
      { status: 500 }
    );
  }
} 