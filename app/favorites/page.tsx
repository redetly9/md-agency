'use client';

import React from 'react';
import { useFavorites } from '@/hooks/useFavorites';
import ListingCard from '@/components/ListingCard';
import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import EmptyState from '@/components/EmptyState';
import { adaptListing } from '@/utils/adapter';

const BASE_URL = process.env.NEXT_PUBLIC_PARSING_SERVER_URL;

const FavoritesPage = () => {
    const { favorites, loading: favoritesLoading } = useFavorites();

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

    const isLoading = favoritesLoading || favoriteQueries.some(query => query.isLoading);
    const listings = favoriteQueries
        .filter(query => query.isSuccess)
        .map(query => query.data);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="bg-white border-b px-4 py-3 sticky top-0 z-10">
                <div className="max-w-screen-md mx-auto">
                    <h1 className="text-2xl font-bold text-textPrimary">Избранные</h1>
                </div>
            </header>

            <main className="flex-grow px-4 py-4">
                <div className="max-w-screen-md mx-auto">
                    {isLoading ? (
                        <div>Загрузка...</div>
                    ) : !favorites.length ? (
                        <EmptyState
                            title="Нет избранных объявлений"
                            subtitle="Добавляйте понравившиеся объявления в избранное"
                        />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {listings.map((listing) => (
                                <ListingCard
                                    key={listing.id} // @ts-ignore
                                    data={listing}
                                    hasFavorited={true}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default FavoritesPage;
