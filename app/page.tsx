'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ListingCard from '@/components/ListingCard';
import Link from 'next/link';
import { Search, User, Filter } from 'lucide-react';

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

function HomeContent() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const url = new URL('/api/krisha/listings', window.location.origin);
        url.searchParams.set('dealType', 'prodazha');
        url.searchParams.set('propertyType', 'kvartiry');
        url.searchParams.set('page', '1');

        const response = await fetch(url);
        const data = await response.json();
        setListings(data.listings.slice(0, 4)); // Показываем только 4 карточки
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (isLoading) {
    return (
      <>
        {/* Header */}
        <header className="bg-white px-4 py-3">
          <div className="max-w-screen-md mx-auto flex items-center justify-between">
            <div className="text-2xl font-bold">md.kz</div>
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </header>

        {/* Search bar */}
        <div className="bg-white px-4 pb-4">
          <div className="max-w-screen-md mx-auto">
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Banner */}
        <div className="bg-gray-200 h-48 animate-pulse mx-4 rounded-lg"></div>

        {/* Service buttons */}
        <div className="px-4 py-6">
          <div className="max-w-screen-md mx-auto grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Listings grid */}
        <div className="px-4 pb-4">
          <div className="max-w-screen-md mx-auto grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow animate-pulse">
                <div className="h-32 bg-gray-200 rounded-t-lg"></div>
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white px-4 py-3">
        <div className="max-w-screen-md mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            md.kz
          </Link>
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </button>
        </div>
      </header>

      {/* Search bar */}
      <div className="bg-white px-4 pb-4">
        <div className="max-w-screen-md mx-auto">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск недвижимости..."
              className="w-full pl-10 pr-12 py-3 bg-gray-50 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Filter size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsFilterModalOpen(false)}
          ></div>
          
          {/* Modal Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsFilterModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Сбросить
                  </button>
                  <h2 className="text-lg font-semibold">Фильтры</h2>
                </div>
                <button 
                  onClick={() => setIsFilterModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {/* Property Type */}
                <div className="mb-6">
                  <h3 className="text-base font-medium mb-3">Тип недвижимости</h3>
                  <div className="space-y-2">
                    {['Квартиры', 'Дома', 'Комнаты', 'Офисы', 'Коммерческая недвижимость'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="mr-3 rounded border-gray-300" />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-base font-medium mb-3">Цена, ₸</h3>
                  <div className="mb-3">
                    <div className="h-2 bg-teal-500 rounded-full relative">
                      <div className="absolute left-0 top-1/2 w-4 h-4 bg-teal-500 rounded-full transform -translate-y-1/2 -translate-x-1/2 border-2 border-white shadow"></div>
                      <div className="absolute right-0 top-1/2 w-4 h-4 bg-teal-500 rounded-full transform -translate-y-1/2 translate-x-1/2 border-2 border-white shadow"></div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      placeholder="От 0" 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <input 
                      type="text" 
                      placeholder="До ∞" 
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {['До 50К', '50-100К', '100-200К', '200К+'].map((range) => (
                      <button key={range} className="px-3 py-1 text-xs bg-gray-100 rounded-full hover:bg-gray-200">
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rooms */}
                <div className="mb-6">
                  <h3 className="text-base font-medium mb-3">Комнаты</h3>
                  <div className="flex gap-2">
                    {['Студия', '1', '2', '3', '4', '5+'].map((room) => (
                      <button key={room} className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-blue-500 hover:text-blue-500">
                        {room}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area */}
                <div className="mb-6">
                  <h3 className="text-base font-medium mb-3">Площадь, м²</h3>
                  <div className="mb-3">
                    <div className="h-2 bg-teal-500 rounded-full relative">
                      <div className="absolute left-0 top-1/2 w-4 h-4 bg-teal-500 rounded-full transform -translate-y-1/2 -translate-x-1/2 border-2 border-white shadow"></div>
                      <div className="absolute right-0 top-1/2 w-4 h-4 bg-teal-500 rounded-full transform -translate-y-1/2 translate-x-1/2 border-2 border-white shadow"></div>
                    </div>
                  </div>
                </div>

                {/* Floor */}
                <div className="mb-6">
                  <h3 className="text-base font-medium mb-3">Этаж</h3>
                  <div className="space-y-2">
                    {['Не первый этаж', 'Не последний этаж', 'Только первый этаж'].map((option) => (
                      <label key={option} className="flex items-center">
                        <input type="checkbox" className="mr-3 rounded border-gray-300" />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h3 className="text-base font-medium mb-3">Удобства</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Балкон/Лоджия', enabled: true },
                      { name: 'Лифт', enabled: false },
                      { name: 'Парковка', enabled: false },
                      { name: 'Мебель', enabled: false },
                      { name: 'Можно с животными', enabled: false },
                      { name: 'Интернет Wi-Fi', enabled: false }
                    ].map((amenity) => (
                      <div key={amenity.name} className="flex items-center justify-between">
                        <span className="text-sm">{amenity.name}</span>
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors ${amenity.enabled ? 'bg-teal-500' : 'bg-gray-300'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${amenity.enabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t">
                <button 
                  onClick={() => setIsFilterModalOpen(false)}
                  className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Показать результаты
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <div className="mx-4 mb-6">
        <div className="max-w-screen-md mx-auto">
          <div 
            className="relative h-48 rounded-xl overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/placeholder.jpg')`
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-white">
              <h1 className="text-2xl font-bold mb-2">
                Найдите свою идеальную квартиру
              </h1>
              <p className="text-sm opacity-90">
                Более 10 000 вариантов жилья в базе
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Service buttons */}
      <div className="px-4 mb-6">
        <div className="max-w-screen-md mx-auto grid grid-cols-3 gap-4">
          {/* Аренда */}
          <Link href="/rent-to-own" className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-center text-gray-700">Аренда</span>
          </Link>

          {/* Рефинансирование */}
          <Link href="/refinance.html" className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-center text-gray-700">Рефинансирование</span>
          </Link>

          {/* Аренда с выкупом */}
          <Link href="/arenda_s_vykupom.html" className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-center text-gray-700">Аренда с выкупом</span>
          </Link>
        </div>
      </div>

                           {/* Listings grid */}
        <div className="px-4 pb-4">
          <div className="max-w-screen-md mx-auto">
            <div className="grid grid-cols-2 gap-3">
              {listings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <Link href={`/listings/view/${listing.id}`} className="block">
                    <div className="relative">
                      <img
                        src={listing.imageSrc || '/images/placeholder.jpg'}
                        alt={listing.title}
                        className="w-full h-24 object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <div className="text-sm font-bold text-gray-900 mb-1">
                        {listing.roomCount}-комнатная квартира
                      </div>
                      <div className="flex items-center text-xs text-gray-600 mb-1">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span>ул. {listing.street || listing.district}, {listing.roomCount}</span>
                        <span className="ml-auto">{listing.guestCount || 120} м²</span>
                      </div>
                      <div className="text-sm font-semibold text-teal-600 mb-1">
                        {new Intl.NumberFormat('ru-RU').format(listing.price)} ₸/мес
                      </div>
                      <button className="text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded-full border border-teal-200 hover:bg-teal-100 transition-colors">
                        Подробнее
                      </button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="bg-white px-4 py-3">
          <div className="max-w-screen-md mx-auto">
            <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </header>
        <main className="flex-grow">
          <div className="px-4 py-4">
            <div className="max-w-screen-md mx-auto">
              <div className="grid grid-cols-2 gap-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow animate-pulse">
                    <div className="h-32 bg-gray-200 rounded-t-lg"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
