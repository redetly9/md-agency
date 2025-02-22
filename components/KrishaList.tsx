'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, setCity } from '@/store/store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ListingCard from '@/components/ListingCard';
import EmptyState from '@/components/EmptyState';
import { useDispatch } from 'react-redux';
import CitySelect from './inputs/CitySelect';
import Link from 'next/link';

const BASE_URL = process.env.NEXT_PUBLIC_PARSING_SERVER_URL;

const fetchData = async (city: string | null) => {
  if (!city) throw new Error('City is not defined');
  const response = await axios.get(`${BASE_URL}/api/parse/${city}`);
  return response.data;
};

const KrishaList: React.FC = () => {
  const city = useSelector((state: RootState) => state.city.selectedCity);
  const dispatch = useDispatch();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['krishaListings', city],
    queryFn: () => fetchData(city),
    enabled: !!city,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <EmptyState title="Error" subtitle="Failed to fetch data" />;
  if (!data || data.length === 0)
    return <EmptyState title="No Listings found" subtitle="Looks like you have no properties." />;

  const handleChange = (selectedCity: any) => {
    dispatch(setCity(selectedCity?.value || null));
  };

  return (
    <>
        <header className="bg-white border-b px-4 py-3">
            <div className="max-w-screen-md mx-auto">
                <Link href="/" className="text-2xl font-bold">
                    md.kz
                </Link>
            </div>
        </header>
          {/* Меню услуг */}
          <nav className="bg-white px-4">
          <div className="max-w-screen-md mx-auto">
            <ul className="divide-y">
              <li className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  <span className="text-gray-900">Аренда с выкупом</span>
                </div>
                {/* <CitySelect handleChange={handleChange} /> */}
              </li>
              <li className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-gray-900">Рефинансирование</span>
                </div>
              </li>
              <li className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  <span className="text-gray-900">Ипотека</span>
                </div>
              </li>
              <li className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span className="text-gray-900">Гид</span>
                </div>
              </li>
            </ul>
          </div>
        </nav>
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Список объявлений */}
      <main className="flex-grow px-4 py-4">
        <div className="max-w-screen-md mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...(data || [])].map((listing: any) => (
              <ListingCard key={listing.id} data={listing} hasFavorited={false} />
            ))}
          </div>
        </div>
      </main>
    </div>
    </>
  );
};

export default KrishaList;
