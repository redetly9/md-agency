import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import axios from 'axios';

interface Listing {
  id: string;
  title: string;
  description: string;
  imageSrc: string[];
  price: number;
  city: string;
  district: string;
  street: string;
  category: string;
  roomCount: number;
  area: string;
  region: string | null;
  isFromDeveloper?: boolean;
  isFromAgent?: boolean;
}

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Получаем пользователя из Supabase Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json([]);
    }

    const { searchParams } = new URL(request.url);

    // Получаем избранные ID из Supabase
    const { data: favorites, error } = await supabase
      .from('favorites')
      .select('listing_id')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching favorites:', error);
      return NextResponse.json([]);
    }

    if (!favorites || favorites.length === 0) {
      return NextResponse.json([]);
    }

    // Получаем данные объявлений с Krisha.kz
    const listingIds = favorites.map(f => f.listing_id);
    const listings = await Promise.all(
      listingIds.map(async (id) => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_PARSING_SERVER_URL}/api/parse/show/${id}`);
          return response.data;
        } catch (error) {
          console.error(`Error fetching listing ${id}:`, error);
          return null;
        }
      })
    );

    // Фильтруем null значения и применяем фильтры
    const filteredListings = listings
      .filter(Boolean)
      .filter((listing: Listing) => {
        // Фильтр по региону
        const region = searchParams.get('region');
        if (region && listing.region && listing.region !== region) {
          return false;
        }

        // Фильтр по количеству комнат
        const rooms = searchParams.get('rooms');
        if (rooms) {
          const roomsArray = rooms.split(',').map(Number);
          if (!roomsArray.includes(listing.roomCount)) {
            return false;
          }
        }

        // Фильтр по цене
        const priceFrom = searchParams.get('priceFrom');
        const priceTo = searchParams.get('priceTo');
        if (priceFrom && listing.price < parseInt(priceFrom)) {
          return false;
        }
        if (priceTo && listing.price > parseInt(priceTo)) {
          return false;
        }

        // Фильтр по площади
        const areaFrom = searchParams.get('areaFrom');
        const areaTo = searchParams.get('areaTo');
        const listingArea = parseFloat(listing.area) || 0;
        if (areaFrom && listingArea < parseInt(areaFrom)) {
          return false;
        }
        if (areaTo && listingArea > parseInt(areaTo)) {
          return false;
        }

        // Фильтр "от застройщика"
        const fromDeveloper = searchParams.get('fromDeveloper');
        if (fromDeveloper === '1' && !listing.isFromDeveloper) {
          return false;
        }

        // Фильтр "от агентов"
        const fromAgents = searchParams.get('fromAgents');
        if (fromAgents === '1' && !listing.isFromAgent) {
          return false;
        }

        return true;
      });

    return NextResponse.json(filteredListings);
  } catch (error) {
    console.error('[FAVORITES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Получаем пользователя из Supabase Auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { listingId } = await request.json();

    if (!listingId) {
      return new NextResponse('Listing ID is required', { status: 400 });
    }

    // Проверяем, есть ли уже в избранном
    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('listing_id', listingId)
      .single();

    if (existing) {
      // Удаляем из избранного
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('listing_id', listingId);

      if (error) throw error;

      return NextResponse.json({ action: 'removed' });
    } else {
      // Добавляем в избранное
      const { error } = await supabase
        .from('favorites')
        .insert([
          {
            user_id: user.id,
            listing_id: listingId,
          },
        ]);

      if (error) throw error;

      return NextResponse.json({ action: 'added' });
    }
  } catch (error) {
    console.error('[FAVORITES_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 