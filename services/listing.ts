// @ts-nocheck

'use server';
import { db } from '@/lib/db';
import { LISTINGS_BATCH } from '@/utils/constants';
import { getCurrentUser } from './user';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_PARSING_SERVER_URL;
export const getListings = async (query?: {
  [key: string]: string | string[] | undefined | null;
}) => {
  console.log('getListings');
  console.log('PARSING_SERVER_URL:', BASE_URL);

  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      country,
      startDate,
      endDate,
      category,
      cursor,
      city, // Добавлено поле для фильтрации по городу
    } = query || {};

    let where: any = {};

    if (userId) {
      where.userId = userId;
    }

    if (category) {
      where.category = category;
    }

    if (roomCount) {
      where.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      where.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      where.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (country) {
      where.country = country;
    }

    if (city) {
      where.city = city; // Добавляем фильтрацию по городу
    }

    if (startDate && endDate) {
      where.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const filterQuery: any = {
      where,
      take: LISTINGS_BATCH,
      orderBy: { createdAt: 'desc' },
    };

    if (cursor) {
      filterQuery.cursor = { id: cursor };
      filterQuery.skip = 1;
    }

    const listings = await db.listing.findMany(filterQuery);

    console.log('listings 1', listings);

    const nextCursor = listings.length === LISTINGS_BATCH ? listings[LISTINGS_BATCH - 1].id : null;

    return {
      listings,
      nextCursor,
    };
  } catch (error) {
    console.log('error 1', error);

    return {
      listings: [],
      nextCursor: null,
    };
  }
};

export const getListingById = async (id: number) => {
  console.log('id', id);

  const listing = await db.listing.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      reservations: {
        select: {
          startDate: true,
          endDate: true,
        },
      },
    },
  });
  try {
    const response = await axios.get(`${BASE_URL}/api/parse/show/${id}`);
    return response.data; // Возвращаем данные объявления
  } catch (error) {
    console.error('Ошибка при получении объявления по ID:', error);
    return null; // Возвращаем null в случае ошибки
  }

  return listing;
};

export const createListing = async (data: { [x: string]: any }) => {
  const {
    category,
    location: { region, label: country, latlng },
    guestCount,
    bathroomCount,
    roomCount,
    image: imageSrc,
    price,
    title,
    description,
  } = data;

  Object.keys(data).forEach((value: any) => {
    if (!data[value]) {
      throw new Error('Invalid data');
    }
  });

  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized!');

  const listing = await db.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      country,
      region,
      latlng,
      price: parseInt(price, 10),
      userId: user.id,
    },
  });

  return listing;
};
