'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ListingCard from '@/components/ListingCard';
import Link from 'next/link';
import { Search, User, Filter } from 'lucide-react';

const arr = [
  {
    id: 1,
    text: "Аренда",
    icon: "/arenda.svg",
    href: "/rent-to-own"
  },
  {
    id: 2,
    text: "Рефинансирование ипотечных кредитов",
    icon: "/refinance.svg",
    href: "/refinance"
  },
  {
    id: 3,
    text: "Аренда с выкупом",
    icon: "/arenda_s_vykupom.svg",
    href: "/arenda-s-vykupom"
  }
]
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
  area: string;
  region: string | null;
  userId: string | null;
  country: string;
  latlng: { lat: number; lng: number; };
}

function HomeContent() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [priceValue, setPriceValue] = useState(50);
  const [areaValue, setAreaValue] = useState(70);
  const [amenities, setAmenities] = useState([
    { name: 'Балкон/Лоджия', enabled: true },
    { name: 'Лифт', enabled: false },
    { name: 'Парковка', enabled: false },
    { name: 'Мебель', enabled: false },
    { name: 'Можно с животными', enabled: false },
    { name: 'Интернет Wi-Fi', enabled: false }
  ]);

  const toggleAmenity = (index: number) => {
    const newAmenities = [...amenities];
    newAmenities[index].enabled = !newAmenities[index].enabled;
    setAmenities(newAmenities);
  };

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

  // Логирование данных listings
  useEffect(() => {
    if (listings.length > 0) {
      console.log('=== LISTINGS ARRAY ===');
      console.log('Количество объявлений:', listings.length);
      console.log('Полный массив listings:', listings);
      console.log('=== ПЕРВОЕ ОБЪЯВЛЕНИЕ ===');
      console.log('Первое объявление:', listings[0]);
      console.log('=== СТРУКТУРА ОБЪЯВЛЕНИЯ ===');
      if (listings[0]) {
        Object.entries(listings[0]).forEach(([key, value]) => {
          console.log(`${key}:`, value);
        });
      }
      console.log('=== КОНЕЦ ВЫВОДА ===');
    }
  }, [listings]);

  if (isLoading) {
    return (
      <>
        {/* Header */}
        <header className="bg-white px-4 py-3">
          <div className="max-w-screen-md mx-auto flex items-center justify-between">
            <div className="text-2xl font-medium">md.kz</div>
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
console.log(listings)
  return (
    <>
      {/* Header */}
      <header className="bg-white px-4 py-3">
        <div className="max-w-screen-md mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-medium">
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
              className="w-full pl-10 pr-12 py-3 bg-gray-50 rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
            />
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <img src="/filter_icon.svg" alt="filter" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <div className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${
        isFilterModalOpen 
          ? 'bg-black bg-opacity-50 pointer-events-auto' 
          : 'bg-transparent bg-opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          onClick={() => setIsFilterModalOpen(false)}
        ></div>

        {/* Modal Panel */}
        <div className={`absolute right-0 top-0 h-full w-[80%] bg-white shadow-xl transform transition-transform duration-300 ease-in-out rounded-l-2xl overflow-hidden ${isFilterModalOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b relative">
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Сбросить
                </button>
                <h2 className="text-base text-[#2C3E50]font-semibold absolute left-1/2 transform -translate-x-1/2">Фильтры</h2>
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto p-3">
                {/* Property Type */}
                <div className="mb-4">
                  <h3 className="text-sm text-[#2C3E50] font-medium mb-2">Тип недвижимости</h3>
                  <div className="space-y-1.5 text-[#2C3E50] font-light">
                    {['Квартиры', 'Дома', 'Комнаты', 'Офисы', 'Коммерческая недвижимость'].map((type) => (
                      <label key={type} className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded border-gray-300" />
                        <span className="text-xs">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-4">
                  <h3 className="text-sm text-[#2C3E50] font-medium mb-2">Цена, ₸</h3>
                  <div className="mb-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={priceValue}
                      onChange={(e) => setPriceValue(Number(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #4ECDC4 0%, #4ECDC4 ${priceValue}%, #e5e7eb ${priceValue}%, #e5e7eb 100%)`
                      }}
                    />
                    <style jsx>{`
                      .slider::-webkit-slider-thumb {
                        appearance: none;
                        height: 16px;
                        width: 16px;
                        border-radius: 50%;
                        background: #4ECDC4;
                        border: 2px solid #4ECDC4;
                        cursor: pointer;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                      }
                      .slider::-moz-range-thumb {
                        height: 16px;
                        width: 16px;
                        border-radius: 50%;
                        background: #4ECDC4;
                        border: 2px solid #4ECDC4;
                        cursor: pointer;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                      }
                    `}</style>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="От 0"
                      className="w-20 px-2 py-1.5 border border-gray-300 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="До ∞"
                      className="w-20 px-2 py-1.5 border border-gray-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="flex gap-1.5 text-[#7F8C8D] font-light">
                    {['До 50К', '50-100К', '100-200К', '200К+'].map((range) => (
                      <button key={range} className="px-2 py-1 text-xs bg-gray-100 rounded-full hover:bg-gray-200">
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rooms */}
                <div className="mb-4">
                  <h3 className="text-sm text-[#2C3E50] font-medium mb-2">Комнаты</h3>
                  <div className="grid grid-cols-6 gap-1 text-[#7F8C8D] font-light">
                    {['Студия', '1', '2', '3', '4', '5+'].map((room) => (
                      <button key={room} className="px-1 py-1 border border-gray-300 rounded text-xs hover:border-blue-500 hover:text-blue-500 min-h-[28px] flex items-center justify-center">
                        {room}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area */}
                <div className="mb-4">
                  <h3 className="text-sm text-[#2C3E50] font-medium mb-2">Площадь, м²</h3>
                  <div className="mb-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={areaValue}
                      onChange={(e) => setAreaValue(Number(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer slider-area"
                      style={{
                        background: `linear-gradient(to right, #4ECDC4 0%, #4ECDC4 ${areaValue}%, #e5e7eb ${areaValue}%, #e5e7eb 100%)`
                      }}
                    />
                    <style jsx>{`
                      .slider-area::-webkit-slider-thumb {
                        appearance: none;
                        height: 16px;
                        width: 16px;
                        border-radius: 50%;
                        background: #4ECDC4;
                        border: 2px solid #4ECDC4;
                        cursor: pointer;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                      }
                      .slider-area::-moz-range-thumb {
                        height: 16px;
                        width: 16px;
                        border-radius: 50%;
                        background: #4ECDC4;
                        border: 2px solid #4ECDC4;
                        cursor: pointer;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                      }
                    `}</style>
                  </div>
                </div>

                {/* Floor */}
                <div className="mb-4">
                  <h3 className="text-sm text-[#2C3E50] font-medium mb-2">Этаж</h3>
                  <div className="space-y-1.5 text-[#2C3E50] font-light">
                    {['Не первый этаж', 'Не последний этаж', 'Только первый этаж'].map((option) => (
                      <label key={option} className="flex items-center">
                        <input type="checkbox" className="mr-2 rounded border-gray-300" />
                        <span className="text-xs">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <h3 className="text-sm text-[#2C3E50] font-medium mb-2">Удобства</h3>
                  <div className="space-y-2 text-[#2C3E50] font-light">
                    {amenities.map((amenity, index) => (
                      <div key={amenity.name} className="flex items-center justify-between">
                        <span className="text-xs">{amenity.name}</span>
                        <button 
                          onClick={() => toggleAmenity(index)}
                          className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${amenity.enabled ? 'bg-[#4ECDC4]' : 'bg-gray-300'}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${amenity.enabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 border-t">
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="w-full py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
                >
                  Показать результаты
                </button>
              </div>
            </div>
          </div>
        </div>

      {/* Hero Banner */}
      <div
        className="relative h-44 overflow-hidden bg-cover bg-center bg-no-repeat mb-2"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url('/main_img.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          imageRendering: 'crisp-edges',
          WebkitBackgroundSize: 'cover',
          MozBackgroundSize: 'cover',
          OBackgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-start pb-12 px-4 text-white">
          <h1 className="text-2xl font-medium mb-1">
            Найдите свою идеальную квартиру
          </h1>
          <p className="text-base opacity-90 font-light">
            Более 10 000 вариантов жилья в базе
          </p>
        </div>
      </div>

      {/* Service buttons */}
      <div className="px-6 mb-2">
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-4">
          {/* Аренда */}
          {arr.map((item) => {

            return (
              <Link key={item.id} href={item.href} className="flex flex-col items-center">
                <div className="flex items-center justify-center mb-2">
                  <img src={item.icon} alt="Logo" />
                </div>
                <span className="text-[10px] font-normal text-center text-[#4FD1C5]">{item.text}</span>
              </Link>
            )
          })}
          </div>
        </div>
      </div>

      {/* Listings grid */}
      <div className="px-4 pb-4 ">
        <div className="max-w-screen-md mx-auto">
          <div className="grid grid-cols-2 gap-2">
            {/* <div 
            className='border border-[#9CA3AF] rounded-xl'
            >
asd
            </div> */}
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-xl border border-[#F3F4F6] p-0.5">
                <Link href={`/listings/view/${listing.id}`} className="block">
                  <div className="relative">
                                          <img
                        src={listing.imageSrc || '/images/placeholder.jpg'}
                        alt={listing.title}
                        className="w-full h-16 object-cover"
                      />
                  </div>
                                      <div className="p-1.5">
                      <div className="text-xs font-medium text-gray-900 mb-0.5">
                        {listing.roomCount}-комнатная
                      </div>
                      <div className="flex items-center text-xs text-gray-600 mb-0.5">
                        <img className='pr-1 flex-shrink-0' src="/location_icon.svg" alt="location" />
                        <span className='text-[#6B7280] text-xs font-light truncate flex-1 min-w-0'>ул. {listing.street || listing.district}, {listing.roomCount}</span>
                        <span className='text-[#6B7280] text-xs font-light flex-shrink-0 ml-1'>{listing.area}</span>
                      </div>
                      <div className='flex justify-between items-center'>
                      <div className="text-xs font-semibold text-[#2DD4BF] pr-1">
                        {new Intl.NumberFormat('ru-RU').format(listing.price)} ₸
                      </div>
                      <div className="text-xs text-[#6B7280] font-light">
                        {listing.city}
                      </div>
                      </div>
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
                {[1, 2, 3, 4].map((i) => (
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
