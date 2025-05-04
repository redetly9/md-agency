import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Listing {
  id: string;
  region: string;
  roomCount: number;
  price: number;
  area: number;
  floor: number;
  totalFloors: number;
  isFromDeveloper: boolean;
  isFromAgent: boolean;
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json([]);
    }

    const { searchParams } = new URL(request.url);

    // Получаем избранные ID из Supabase
    const { data: favorites, error } = await supabase
      .from('favorites')
      .select('listing_id')
      .eq('user_email', session.user.email);

    if (error) {
      console.error('Error fetching favorites:', error);
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
        if (region && listing.region !== region) {
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
        if (areaFrom && listing.area < parseInt(areaFrom)) {
          return false;
        }
        if (areaTo && listing.area > parseInt(areaTo)) {
          return false;
        }

        // Фильтр по этажу
        const floorFrom = searchParams.get('floorFrom');
        const floorTo = searchParams.get('floorTo');
        if (floorFrom && listing.floor < parseInt(floorFrom)) {
          return false;
        }
        if (floorTo && listing.floor > parseInt(floorTo)) {
          return false;
        }

        // Фильтр "не первый этаж"
        const notFirstFloor = searchParams.get('notFirstFloor');
        if (notFirstFloor === '1' && listing.floor === 1) {
          return false;
        }

        // Фильтр "не последний этаж"
        const notLastFloor = searchParams.get('notLastFloor');
        if (notLastFloor === '1' && listing.floor === listing.totalFloors) {
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