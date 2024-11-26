'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ListingCard from '@/components/ListingCard';
import EmptyState from '@/components/EmptyState';

interface KrishaListProps {
  searchParams?: { [key: string]: string | undefined };
}

// Берем базовый URL из переменной окружения
const BASE_URL = process.env.NEXT_PUBLIC_PARSING_SERVER_URL;

const fetchData = async (city: string | null) => {
  if (!city) throw new Error('City is not defined');
  const response = await axios.get(`${BASE_URL}/api/parse/${city}`);
  return response.data;
};

const KrishaList: React.FC<KrishaListProps> = () => {
  const city = useSelector((state: RootState) => state.city.selectedCity);

  const { data, isError, isLoading } = useQuery({
    queryKey: ['krishaListings', city],
    queryFn: () => fetchData(city),
    enabled: !!city,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <EmptyState title="Error" subtitle="Failed to fetch data" />;
  if (!data || data.length === 0)
    return <EmptyState title="No Listings found" subtitle="Looks like you have no properties." />;

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8 mt-[70px] px-[40px]">
      {data.map((listing: any) => (
        <ListingCard key={listing.id} data={listing} hasFavorited={false} />
      ))}
    </section>
  );
};

export default KrishaList;
