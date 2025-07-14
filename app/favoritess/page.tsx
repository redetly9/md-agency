'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface FavoriteListing {
  id: string;
  title: string;
  price: number;
  rooms: number;
  area: number;
  floor: number;
  totalFloors: number;
  street: string;
  imageSrc: string;
  priceTag?: 'снижена' | 'выросла';
}

// Моковые данные для демонстрации
const mockFavorites: FavoriteListing[] = [
  {
    id: '1',
    title: 'Элитная недвижимость',
    price: 15900000,
    rooms: 3,
    area: 78,
    floor: 9,
    totalFloors: 12,
    street: 'ул. Ленина, 45',
    imageSrc: '/images/placeholder.jpg',
    priceTag: 'снижена'
  },
  {
    id: '2',
    title: 'Современная квартира',
    price: 12500000,
    rooms: 2,
    area: 65,
    floor: 5,
    totalFloors: 9,
    street: 'пр. Гагарина, 12',
    imageSrc: '/images/placeholder.jpg'
  },
  {
    id: '3',
    title: 'Квартира с видом',
    price: 18300000,
    rooms: 4,
    area: 95,
    floor: 3,
    totalFloors: 16,
    street: 'ул. Пушкина, 28',
    imageSrc: '/images/placeholder.jpg',
    priceTag: 'выросла'
  }
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Симулируем загрузку избранного
    const loadFavorites = async () => {
      try {
        // В реальном приложении здесь будет запрос к API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setFavorites(mockFavorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  if (isLoading) {
    return (
      <>
        {/* Header */}
        <header className="bg-white px-4 py-4 border-b border-gray-200">
          <div className="max-w-screen-md mx-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold">Избранное</h1>
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </header>

        {/* Loading cards */}
        <div className="bg-gray-50 min-h-screen pb-20">
          <div className="max-w-screen-md mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border-b animate-pulse">
                <div className="p-4 flex gap-4">
                  <div className="w-24 h-20 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (favorites.length === 0) {
    return (
      <>
        {/* Header */}
        <header className="bg-white px-4 py-4 border-b border-gray-200">
          <div className="max-w-screen-md mx-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold">Избранное</h1>
            <span className="text-gray-500">0 объектов</span>
          </div>
        </header>

        {/* Empty state */}
        <div className="bg-gray-50 min-h-screen pb-20 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Heart size={24} className="text-gray-400" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Избранное пусто</h2>
            <p className="text-gray-500 mb-4">
              Сохраняйте понравившиеся объявления, чтобы не потерять их
            </p>
            <Link 
              href="/"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg font-medium"
            >
              Найти жилье
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="max-w-screen-md mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold">Избранное</h1>
          <span className="text-gray-500">{favorites.length} объектов</span>
        </div>
      </header>

      {/* Favorites list */}
      <div className="bg-gray-50 min-h-screen pb-20">
        <div className="max-w-screen-md mx-auto">
          {favorites.map((listing) => (
            <div key={listing.id} className="bg-white border-b border-gray-200">
              <Link href={`/listings/view/${listing.id}`} className="block">
                <div className="p-4 flex gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={listing.imageSrc}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Price */}
                    <div className="text-xl font-semibold text-gray-900 mb-1">
                      {formatPrice(listing.price)} ₽
                    </div>

                    {/* Property info */}
                    <div className="text-[#666666] mb-2 text-sm font-light">
                      {listing.rooms} комн. • {listing.area} м² • {listing.floor}/{listing.totalFloors} эт.
                    </div>

                    {/* Address */}
                    <div className="text-[#999999] font-light mb-2 text-sm">
                      {listing.street}
                    </div>

                    {/* Price tag */}
                    {listing.priceTag && (
                      <span 
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          listing.priceTag === 'снижена' 
                            ? 'bg-teal-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        Цена {listing.priceTag}
                      </span>
                    )}
                  </div>

                  {/* Heart button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeFavorite(listing.id);
                      }}
                      className="text-teal-500 hover:text-teal-600 transition-colors"
                    >
                      <Heart size={24} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
