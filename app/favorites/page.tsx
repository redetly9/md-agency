'use client';

import React, { useEffect, useState } from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import ListingCard from '@/components/ListingCard';
import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import EmptyState from '@/components/EmptyState';
import { adaptListing } from '@/utils/adapter';
import { useSearchParams } from 'next/navigation';
import FilterModal from '@/components/FilterModal';
import FilterBar from '@/components/FilterBar';
import { Filter } from 'lucide-react';

const BASE_URL = process.env.NEXT_PUBLIC_PARSING_SERVER_URL;

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
  region: string | null;
  userId: string | null;
  country: string;
  latlng: { lat: number; lng: number; };
}

const FavoritesPage = () => {
    const { favorites, loading: favoritesLoading } = useFavorites();
    const [isLoading, setIsLoading] = useState(true);
    const [listings, setListings] = useState<Listing[]>([]);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const searchParams = useSearchParams();

    const favoriteQueries = useQueries({
        queries: favorites.map(id => ({
            queryKey: ['listing', id],
            queryFn: async () => {
                const response = await axios.get(`${BASE_URL}/api/parse/show/${id}`);
                return adaptListing(response.data);
            },
            staleTime: 1000 * 60 * 5, // Кэшируем на 5 минут
        })), // @ts-ignore
        enabled: !favoritesLoading && favorites.length > 0,
    });

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                setIsLoading(true);
                
                // Создаем URL с параметрами фильтрации
                const url = new URL('/api/favorites', window.location.origin);
                
                // Добавляем параметры фильтрации
                const filterParams = [
                    'region', 'complex', 'rooms', 'priceFrom', 'priceTo', 
                    'areaFrom', 'areaTo', 'floorFrom', 'floorTo', 
                    'notFirstFloor', 'notLastFloor', 'fromDeveloper', 'fromAgents'
                ];
                
                filterParams.forEach(param => {
                    const value = searchParams.get(param);
                    if (value) {
                        url.searchParams.set(param, value);
                    }
                });

                const response = await fetch(url.toString());
                const data = await response.json();
                setListings(data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavorites();
    }, [searchParams]);

    const isLoadingFavorites = favoritesLoading || favoriteQueries.some(query => query.isLoading);
    const favoriteListings = favoriteQueries
        .filter(query => query.isSuccess)
        .map(query => query.data);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <header className="bg-white border-b px-4 py-3">
                    <div className="max-w-screen-md mx-auto flex items-center justify-between">
                        <h1 className="text-xl font-medium">Избранное</h1>
                        <button 
                            className="text-gray-500 p-2"
                            onClick={() => setIsFilterModalOpen(true)}
                        >
                            <Filter size={24} />
                        </button>
                    </div>
                </header>

                <FilterBar
                    onOpenModal={() => setIsFilterModalOpen(true)}
                    dealType="all"
                    propertyType="all"
                />

                <div className="max-w-screen-md mx-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1,2,3,4,5,6].map((i) => (
                            <div key={i} className="bg-white rounded-lg shadow animate-pulse">
                                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                                <div className="p-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (listings.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100">
                <header className="bg-white border-b px-4 py-3">
                    <div className="max-w-screen-md mx-auto">
                        <h1 className="text-xl font-medium">Избранное</h1>
                    </div>
                </header>
                <EmptyState
                    title="Избранное пусто"
                    subtitle="Сохраняйте понравившиеся объявления, чтобы не потерять их"
                    showReset={false}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white border-b px-4 py-3">
                <div className="max-w-screen-md mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-medium">Избранное</h1>
                    <button 
                        className="text-gray-500 p-2"
                        onClick={() => setIsFilterModalOpen(true)}
                    >
                        <Filter size={24} />
                    </button>
                </div>
            </header>

            <FilterBar
                onOpenModal={() => setIsFilterModalOpen(true)}
                dealType="all"
                propertyType="all"
            />

            <main className="max-w-screen-md mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {listings.map((listing) => (
                        <ListingCard
                            key={listing.id}
                            data={listing}
                            hasFavorited={true}
                        />
                    ))}
                </div>
            </main>

            <FilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                dealType="all"
                propertyType="all"
            />
        </div>
    );
};

export default FavoritesPage;
