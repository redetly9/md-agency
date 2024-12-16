'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, setCity } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ListingCard from '@/components/ListingCard';
import EmptyState from '@/components/EmptyState';
import { useDispatch } from 'react-redux';
import CitySelect from './inputs/CitySelect';
import Button from './Button';
import Link from 'next/link';
import { getListings } from '@/services/listing';

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
  const dispatch = useDispatch();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['krishaListings', city],
    queryFn: () => fetchData(city),
    enabled: !!city,
  });

  const {
    data: dataFromDB,
    isError: isErrorOnGettingFromDB,
    isLoading: isLoadingFromGettingDB,
  } = useQuery({
    queryKey: ['krishaListings'],
    queryFn: () => getListings(),
  });

  console.log('dataFromDB', dataFromDB);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <EmptyState title="Error" subtitle="Failed to fetch data" />;
  if (!data || data.length === 0)
    return <EmptyState title="No Listings found" subtitle="Looks like you have no properties." />;
  const handleChange = (selectedCity: any) => {
    dispatch(setCity(selectedCity?.value || null));
  };

  return (
    <div className="px-[40px] s:px-[10px]">
      <div className="flex justify-end mb-[25px] gap-[20px] items-center">
        <div className="flex gap-[10px] items-center s:flex-col md:flex-row">
          <p>Сортировать по: </p>
          <CitySelect handleChange={handleChange} />
        </div>
        <div>
          {/* Ссылка на страницу калькулятора */}
          <Link href="/calculator">
            <Button className="p-[10px]">Калькулятор</Button>
          </Link>
        </div>
      </div>
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8 ">
        {[...(dataFromDB?.listings || []), ...(data || [])].map((listing: any) => (
          <ListingCard key={listing.id} data={listing} hasFavorited={false} />
        ))}
      </section>
    </div>
  );
};

export default KrishaList;
