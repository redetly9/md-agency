'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { toast } from 'react-hot-toast';

interface FavoriteListing {
  id: string;
  title: string;
  price: number;
  roomCount: number;
  area: string;
  city?: string;
  district?: string;
  street?: string;
  region?: string;
  imageSrc: string[];
  description?: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toggleFavorite } = useFavorites();

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch('/api/favorites');
        
        if (!response.ok) {
          throw new Error('Failed to load favorites');
        }
        
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Error loading favorites:', error);
        toast.error('Ошибка при загрузке избранного');
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  const removeFavorite = async (id: string) => {
    try {
      await toggleFavorite(id);
      setFavorites(prev => prev.filter(item => item.id !== id));
      toast.success('Удалено из избранного');
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Ошибка при удалении');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  // Если пользователь не авторизован
  if (!user) {
    return (
      <>
        {/* Header */}
        <header className="bg-white px-4 py-4 border-b border-line">
          <div className="max-w-screen-md mx-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold">Избранное</h1>
          </div>
        </header>

        {/* Not authenticated state */}
        <div className="bg-white min-h-screen pb-20 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Heart size={24} className="text-ink-3" />
            </div>
            <h2 className="text-lg font-medium text-ink mb-2">Войдите в систему</h2>
            <p className="text-ink-2 mb-4">
              Чтобы просматривать избранные объявления, необходимо войти в систему
            </p>
            <Link 
              href="/login"
              className="inline-block bg-brand text-ink px-6 py-2 rounded-lg font-medium"
            >
              Войти
            </Link>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        {/* Header */}
        <header className="bg-white px-4 py-4 border-b border-line">
          <div className="max-w-screen-md mx-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold">Избранное</h1>
            <div className="h-6 w-20 bg-slate-100 rounded animate-pulse"></div>
          </div>
        </header>

        {/* Loading cards */}
        <div className="bg-white min-h-screen pb-20">
          <div className="max-w-screen-md mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border-b animate-pulse">
                <div className="p-4 flex gap-4">
                  <div className="w-24 h-20 bg-slate-100 rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-slate-100 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                  </div>
                  <div className="w-8 h-8 bg-slate-100 rounded-full"></div>
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
        <header className="bg-white px-4 py-4 border-b border-line">
          <div className="max-w-screen-md mx-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold">Избранное</h1>
            <span className="text-ink-2">0 объектов</span>
          </div>
        </header>

        {/* Empty state */}
        <div className="bg-white min-h-screen pb-20 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Heart size={24} className="text-ink-3" />
            </div>
            <h2 className="text-lg font-medium text-ink mb-2">Избранное пусто</h2>
            <p className="text-ink-2 mb-4">
              Сохраняйте понравившиеся объявления, чтобы не потерять их
            </p>
            <Link 
              href="/"
              className="inline-block bg-brand text-ink px-6 py-2 rounded-lg font-medium"
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
      <header className="bg-white px-4 py-4 border-b border-line">
        <div className="max-w-screen-md mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Избранное</h1>
          <span className="text-ink-2 font-light">{favorites.length} объектов</span>
        </div>
      </header>

      {/* Favorites list */}
      <div className="bg-white min-h-screen pb-20">
        <div className="max-w-screen-md mx-auto">
          {favorites.map((listing) => (
            <div key={listing.id} className="bg-white border-b border-line">
              <Link href={`/listings/view/${listing.id}`} className="block">
                <div className="p-4 flex gap-4">
                  {/* Image */}
                  <div className="relative w-[96px] h-[80px] rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={listing.imageSrc?.[0] || '/images/placeholder.jpg'}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Price */}
                    <div className="text-xl font-semibold text-ink mb-1">
                      {formatPrice(listing.price)} ₸
                    </div>

                    {/* Property info */}
                    <div className="text-ink-2 mb-2 text-sm font-light">
                      {listing.roomCount} комн. • {listing.area} м²
                    </div>

                    {/* Address */}
                    <div className="text-ink-3 font-light mb-2 text-sm">
                      {listing.district && `${listing.district}`}
                      {listing.street && listing.district && ', '}
                      {listing.street}
                      {(listing.district || listing.street) && listing.city && ', '}
                      {listing.city}
                    </div>
                  </div>

                  {/* Heart button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeFavorite(listing.id);
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors"
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
