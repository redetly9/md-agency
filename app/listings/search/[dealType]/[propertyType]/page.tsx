'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import ListingCard from '@/components/ListingCard';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import FilterModal from '@/components/FilterModal';
import FilterBar from '@/components/FilterBar';
import { Filter } from 'lucide-react';

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

export default function ListingsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  
  const [listings, setListings] = useState<Listing[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        // Создаем URL с параметрами фильтрации
        const url = new URL(`/api/krisha/listings`, window.location.origin);
        
        // Базовые параметры
        url.searchParams.set('dealType', params.dealType as string);
        url.searchParams.set('propertyType', params.propertyType as string);
        url.searchParams.set('page', page);
        
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
        
        const response = await fetch(url);
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
  }, [params.dealType, params.propertyType, page, searchParams]);

  if (isLoading) {
    return (
      <>
        <header className="bg-white border-b px-4 py-3">
          <div className="max-w-screen-md mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </Link>
              <h1 className="text-xl font-medium">
                {params.dealType === 'arenda' ? 'Аренда' : 'Продажа'}
              </h1>
            </div>
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
          dealType={params.dealType as string}
          propertyType={params.propertyType as string}
        />

        <div className="flex flex-col min-h-screen bg-gray-100">
          <main className="flex-grow py-4">
            <div className="max-w-screen-md mx-auto">
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
              <div className="mt-4 pb-16">
                <div className="flex justify-center gap-2">
                  {[1,2,3].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
        
        <FilterModal 
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          dealType={params.dealType as string}
          propertyType={params.propertyType as string}
        />
      </>
    );
  }

  return (
    <>
      <header className="bg-white border-b px-4 py-3">
        <div className="max-w-screen-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </Link>
            <h1 className="text-xl font-medium">
              {params.dealType === 'arenda' ? 'Аренда' : 'Продажа'}
            </h1>
          </div>
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
        dealType={params.dealType as string}
        propertyType={params.propertyType as string}
      />

      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Список объявлений */}
        <main className="flex-grow py-4">
          <div className="max-w-screen-md mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((listing) => ( // @ts-ignore
                <ListingCard key={listing.id} data={listing} hasFavorited={false} />
              ))}
            </div>
            <div className="mt-4 pb-16">
              <Pagination 
                currentPage={parseInt(page)} 
                totalPages={totalPages} // @ts-ignore
                onPageChange={(newPage) => setPage(newPage.toString())} 
              />
            </div>
          </div>
        </main>
      </div>
      
      <FilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        dealType={params.dealType as string}
        propertyType={params.propertyType as string}
      />
    </>
  );
} 