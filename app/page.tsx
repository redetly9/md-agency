'use client';

import { useEffect, useState } from 'react';
import ListingCard from '@/components/ListingCard';
import Pagination from '@/components/Pagination';
import Link from 'next/link';

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

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState('1');

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/krisha/listings?dealType=prodazha&propertyType=kvartiry&page=${page}`
        );
        const data = await response.json();
        setListings(data.listings);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [page]);

  if (isLoading) {
    return (
      <>
        <header className="bg-white border-b px-4 py-3">
          <div className="max-w-screen-md mx-auto">
            <Link href="/" className="text-2xl font-bold">
              md.kz
            </Link>
          </div>
        </header>

        <nav className="bg-white px-4">
          <div className="max-w-screen-md mx-auto">
            <div className="divide-y">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>

        <div className="flex flex-col min-h-screen bg-gray-100">
          <main className="flex-grow px-4 py-4">
            <div className="max-w-screen-md mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pb-16 flex justify-center gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

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
            <li className="py-3">
              <Link href="/rent-to-own" className="flex items-center justify-between hover:opacity-70">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  <span className="text-gray-900">Аренда с выкупом</span>
                </div>
              </Link>
            </li>
            <li className="py-3">
              <Link href="/mortgage" className="flex items-center justify-between hover:opacity-70">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                  <span className="text-gray-900">Ипотека</span>
                </div>
              </Link>
            </li>
            <li className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <Link href="/hr-progress/hr-progress.kz/index.html" className="text-gray-900">Рефинансирование</Link>
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
              {listings.map((listing) => (
                // @ts-ignore
                <ListingCard key={listing.id} data={listing} hasFavorited={false} />
              ))}
            </div>
            <div className="mt-4">
              <Pagination 
                currentPage={parseInt(page)} 
                totalPages={totalPages} // @ts-ignore
                onPageChange={(newPage) => setPage(newPage.toString())} 
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
