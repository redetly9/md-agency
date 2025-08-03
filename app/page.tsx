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
    icon: "", // не используется, инлайн SVG
    href: "/rent-to-own"
  },
  {
    id: 2,
    text: "Рефинансирование ипотечных кредитов",
    icon: "", // не используется, инлайн SVG
    href: "/refinance"
  },
  {
    id: 3,
    text: "Аренда с выкупом",
    icon: "", // не используется, инлайн SVG
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
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
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

  const fetchListings = async (page: number, append: boolean = false) => {
    if (append) {
      setIsLoadingMore(true);
    } else {
      setIsLoading(true);
    }
    
    try {
      const url = new URL('/api/krisha/listings', window.location.origin);
      url.searchParams.set('dealType', 'prodazha');
      url.searchParams.set('propertyType', 'kvartiry');
      url.searchParams.set('page', page.toString());

      const response = await fetch(url);
      const data = await response.json();
      
      if (append) {
        setListings(prev => [...prev, ...data.listings]);
      } else {
        setListings(data.listings);
      }
      
      // Проверяем, есть ли еще данные (предполагаем, что если пришло меньше данных, то это последняя страница)
      setHasMore(data.listings.length > 0 && data.listings.length >= 10);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchListings(nextPage, true);
    }
  };

  // Intersection Observer для бесконечной прокрутки
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById('scroll-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [hasMore, isLoadingMore, currentPage]);

  useEffect(() => {
    fetchListings(1);
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
          <div className="max-w-screen-md mx-auto">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-[#F3F4F6] p-2 animate-pulse">
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-2"></div>
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
          <Link href="/profiles" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <User size={20} className="text-gray-600" />
          </Link>
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
                <div className="p-3 border-t">
                <button
                  onClick={() => setIsFilterModalOpen(false)}
                  className="w-full py-2.5 text-white rounded-lg font-medium transition-colors text-sm"
                  style={{ backgroundColor: '#016a80' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#015a70'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#016a80'}
                >
                  Применить
                </button>
              </div>
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
                  {item.id === 1 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="17" viewBox="0 0 19 17" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M2.84065 6.03699C2.50049 6.03699 2.22473 6.29419 2.22473 6.61146V15.0849C2.22473 15.4021 2.345 15.6729 2.58553 15.8973C2.82606 16.1216 3.11641 16.2338 3.45657 16.2338H7.1521C7.19255 16.2338 7.2326 16.2301 7.27227 16.2228C7.31193 16.2154 7.35044 16.2045 7.38781 16.1901C7.42517 16.1756 7.46067 16.1579 7.49429 16.137C7.52792 16.1161 7.55903 16.0922 7.58763 16.0655C7.61622 16.0389 7.64175 16.0099 7.66422 15.9785C7.68669 15.9471 7.70566 15.914 7.72114 15.8792C7.73662 15.8443 7.7483 15.8084 7.75619 15.7714C7.76408 15.7344 7.76803 15.6971 7.76803 15.6593V10.7763C7.76803 10.697 7.79809 10.6293 7.85822 10.5732C7.91836 10.5172 7.99095 10.4891 8.07599 10.4891H11.1556C11.2406 10.4891 11.3132 10.5172 11.3734 10.5732C11.4335 10.6293 11.4636 10.697 11.4636 10.7763V15.6593C11.4636 15.6971 11.4675 15.7344 11.4754 15.7714C11.4833 15.8084 11.495 15.8443 11.5105 15.8792C11.5259 15.914 11.5449 15.9471 11.5674 15.9785C11.5898 16.0099 11.6154 16.0389 11.644 16.0655C11.6726 16.0922 11.7037 16.1161 11.7373 16.137C11.7709 16.1579 11.8064 16.1756 11.8438 16.1901C11.8811 16.2045 11.9196 16.2154 11.9593 16.2228C11.999 16.2301 12.039 16.2338 12.0795 16.2338H15.775C16.1151 16.2338 16.4055 16.1216 16.6461 15.8973C16.8866 15.6729 17.0068 15.4021 17.0068 15.0849V6.61146C17.0068 6.29419 16.7311 6.03699 16.3909 6.03699C16.0507 6.03699 15.775 6.29419 15.775 6.61146V15.0849H12.6954V10.7763C12.6954 10.3798 12.545 10.0412 12.2444 9.76082C11.9437 9.4804 11.5808 9.34018 11.1556 9.34018H8.07599C7.65078 9.34018 7.28785 9.4804 6.98718 9.76082C6.68652 10.0412 6.53618 10.3798 6.53618 10.7763V15.0849H3.45657V6.61146C3.45657 6.29419 3.18081 6.03699 2.84065 6.03699Z" fill="#086072"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M17.8128 8.60693L9.62801 1.2993L9.61594 1.29893L9.60362 1.29929L1.41878 8.60693C1.17306 8.8263 0.783167 8.81833 0.547945 8.58916C0.312725 8.35997 0.32124 7.99632 0.566965 7.77694L8.76236 0.459872C8.98029 0.252699 9.26556 0.149407 9.61816 0.149996C9.96975 0.150584 10.2536 0.254045 10.4698 0.460378L12.6954 2.44747V1.2983C12.6954 1.26058 12.6994 1.22322 12.7073 1.18623C12.7151 1.14923 12.7268 1.11331 12.7423 1.07846C12.7578 1.04361 12.7768 1.01051 12.7992 0.979146C12.8217 0.947783 12.8472 0.918765 12.8759 0.892093C12.9044 0.865421 12.9355 0.841607 12.9691 0.820651C13.0028 0.799694 13.0383 0.781999 13.0757 0.767564C13.113 0.753129 13.1515 0.742232 13.1912 0.734873C13.2308 0.727515 13.2709 0.723835 13.3114 0.723835H15.1591C15.1996 0.723835 15.2396 0.727515 15.2793 0.734873C15.319 0.742232 15.3575 0.753129 15.3948 0.767564C15.4322 0.781999 15.4677 0.799694 15.5013 0.820651C15.5349 0.841607 15.566 0.865421 15.5946 0.892093C15.6233 0.918765 15.6488 0.947783 15.6712 0.979146C15.6937 1.01051 15.7127 1.04361 15.7282 1.07846C15.7436 1.11331 15.7553 1.14923 15.7632 1.18623C15.7711 1.22322 15.775 1.26058 15.775 1.2983V5.19703L18.6646 7.77694C18.9103 7.99632 18.9189 8.35997 18.6837 8.58916C18.4485 8.81833 18.0586 8.8263 17.8128 8.60693ZM14.5432 1.87277V4.09721L13.9273 3.5473V1.87277H14.5432Z" fill="#086072"/>
                    </svg>
                  ) : item.id === 2 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                      <path d="M14.376 1.44699H3.61206C2.16231 1.44699 0.987061 2.62224 0.987061 4.07199V10.3114C0.987061 11.7611 2.16231 12.9364 3.61206 12.9364H14.376C15.8258 12.9364 17.001 11.7611 17.001 10.3114V4.07199C17.001 2.62224 15.8258 1.44699 14.376 1.44699Z" stroke="#086072" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M17.0011 3.81601H0.987061V5.97027H17.0011V3.81601ZM2.91182 8.7708V9.48888C2.91182 9.52416 2.91367 9.55936 2.91738 9.59446C2.92108 9.62957 2.92662 9.66442 2.93401 9.69902C2.94139 9.73362 2.95056 9.7678 2.96154 9.80155C2.97252 9.83531 2.98525 9.86849 2.99972 9.90108C3.0142 9.93367 3.03035 9.96552 3.04818 9.99664C3.06601 10.0277 3.08543 10.058 3.10645 10.0873C3.12746 10.1166 3.14996 10.1449 3.17395 10.1722C3.19795 10.1995 3.22332 10.2256 3.25006 10.2505C3.27681 10.2755 3.3048 10.2991 3.33403 10.3215C3.36327 10.3439 3.39362 10.3649 3.42507 10.3845C3.45651 10.4041 3.48892 10.4222 3.52228 10.4388C3.55563 10.4554 3.58978 10.4705 3.62472 10.484C3.65967 10.4975 3.69524 10.5094 3.73143 10.5196C3.76763 10.5299 3.80427 10.5384 3.84136 10.5453C3.87846 10.5522 3.91583 10.5574 3.95347 10.5608C3.99112 10.5643 4.02885 10.566 4.06667 10.566H5.91443C5.95226 10.566 5.98999 10.5643 6.02763 10.5608C6.06527 10.5574 6.10264 10.5522 6.13974 10.5453C6.17683 10.5384 6.21347 10.5299 6.24967 10.5196C6.28586 10.5094 6.32143 10.4975 6.35638 10.484C6.39132 10.4705 6.42547 10.4554 6.45883 10.4388C6.49219 10.4222 6.52459 10.4041 6.55604 10.3845C6.58748 10.3649 6.61783 10.3439 6.64707 10.3215C6.6763 10.2991 6.70429 10.2755 6.73104 10.2505C6.75778 10.2256 6.78315 10.1995 6.80715 10.1722C6.83114 10.1449 6.85364 10.1166 6.87466 10.0873C6.89567 10.058 6.91509 10.0277 6.93292 9.99664C6.95075 9.96552 6.9669 9.93367 6.98137 9.90108C6.99585 9.86849 7.00858 9.83531 7.01956 9.80155C7.03054 9.7678 7.03972 9.73362 7.0471 9.69902C7.05448 9.66442 7.06002 9.62957 7.06373 9.59446C7.06743 9.55936 7.06929 9.52416 7.06929 9.48888V8.7708C7.06929 8.73552 7.06743 8.70033 7.06373 8.66522C7.06002 8.63011 7.05448 8.59526 7.0471 8.56066C7.03972 8.52606 7.03054 8.49188 7.01956 8.45813C7.00858 8.42437 6.99585 8.39119 6.98137 8.3586C6.9669 8.32601 6.95075 8.29416 6.93292 8.26304C6.91509 8.23193 6.89567 8.20171 6.87466 8.17238C6.85364 8.14305 6.83114 8.11474 6.80715 8.08747C6.78315 8.0602 6.75778 8.0341 6.73104 8.00915C6.70429 7.98421 6.6763 7.96054 6.64707 7.93816C6.61783 7.91579 6.58748 7.8948 6.55604 7.8752C6.52459 7.8556 6.49219 7.83748 6.45883 7.82086C6.42547 7.80423 6.39132 7.78916 6.35638 7.77566C6.32143 7.76216 6.28586 7.75029 6.24967 7.74005C6.21347 7.72981 6.17683 7.72125 6.13974 7.71437C6.10264 7.70748 6.06527 7.70231 6.02763 7.69886C5.98999 7.6954 5.95226 7.69367 5.91443 7.69367H4.06667C4.02885 7.69367 3.99112 7.6954 3.95347 7.69886C3.91583 7.70231 3.87846 7.70748 3.84136 7.71437C3.80427 7.72125 3.76763 7.72981 3.73143 7.74005C3.69524 7.75029 3.65967 7.76216 3.62472 7.77566C3.58978 7.78916 3.55563 7.80423 3.52228 7.82086C3.48892 7.83748 3.45651 7.8556 3.42507 7.8752C3.39362 7.8948 3.36327 7.91579 3.33403 7.93816C3.3048 7.96054 3.27681 7.98421 3.25006 8.00915C3.22332 8.0341 3.19795 8.0602 3.17395 8.08747C3.14996 8.11474 3.12746 8.14305 3.10645 8.17238C3.08543 8.20171 3.06601 8.23193 3.04818 8.26304C3.03035 8.29416 3.0142 8.32601 2.99972 8.3586C2.98525 8.39119 2.97252 8.42437 2.96154 8.45813C2.95056 8.49188 2.94139 8.52606 2.93401 8.56066C2.92662 8.59526 2.92108 8.63011 2.91738 8.66522C2.91367 8.70033 2.91182 8.73552 2.91182 8.7708Z" fill="#086072"/>
                    </svg>
                  ) : item.id === 3 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M2.59569 0.574005H9.98675C10.497 0.574005 10.9325 0.742263 11.2933 1.07878C11.6541 1.41529 11.8345 1.82151 11.8345 2.29741V6.31869H16.1459C16.6562 6.31869 17.0917 6.48695 17.4525 6.82346C17.8133 7.15998 17.9937 7.56618 17.9937 8.0421V17.2336C17.9937 17.2713 17.9898 17.3087 17.9819 17.3456C17.974 17.3827 17.9623 17.4186 17.9468 17.4534C17.9313 17.4883 17.9124 17.5214 17.8899 17.5528C17.8675 17.5841 17.8419 17.6131 17.8133 17.6398C17.7847 17.6665 17.7536 17.6903 17.72 17.7112C17.6864 17.7322 17.6509 17.7499 17.6135 17.7643C17.5761 17.7788 17.5376 17.7897 17.4979 17.797C17.4583 17.8044 17.4182 17.808 17.3778 17.808H11.2186C11.195 17.808 11.1716 17.8068 11.1482 17.8043C11.1209 17.8068 11.093 17.808 11.0646 17.808H1.36385C1.3234 17.808 1.28335 17.8044 1.24369 17.797C1.20402 17.7897 1.16551 17.7788 1.12814 17.7643C1.09078 17.7499 1.05528 17.7322 1.02166 17.7112C0.988033 17.6903 0.956921 17.6665 0.928324 17.6398C0.899728 17.6131 0.874195 17.5841 0.851727 17.5528C0.829258 17.5214 0.810286 17.4883 0.794809 17.4534C0.779332 17.4186 0.767649 17.3827 0.75976 17.3456C0.75187 17.3087 0.747925 17.2713 0.747925 17.2336V2.29741C0.747925 1.82151 0.928324 1.41529 1.28912 1.07878C1.64992 0.742263 2.08544 0.574005 2.59569 0.574005ZM6.90715 16.6591V14.9357C6.90715 14.6184 6.63138 14.3612 6.29122 14.3612C5.95106 14.3612 5.67529 14.6184 5.67529 14.9357V16.6591H1.97976V2.29741C1.97976 2.13878 2.0399 2.00338 2.16016 1.8912C2.28043 1.77903 2.4256 1.72295 2.59569 1.72295H9.98675C10.1569 1.72295 10.302 1.77903 10.4222 1.8912C10.5425 2.00338 10.6027 2.13878 10.6027 2.29741V16.6591H6.90715ZM11.8345 16.6591H16.7619V8.0421C16.7619 7.88346 16.7017 7.74806 16.5814 7.63589C16.4612 7.52371 16.316 7.46763 16.1459 7.46763H11.8345V16.6591Z" fill="#086072"/>
                    </svg>
                  ) : (
                    <img src={item.icon} alt="Logo" />
                  )}
                </div>
                <span className="text-[10px] font-normal text-center text-[#086072]">{item.text}</span>
              </Link>
            )
          })}
          </div>
        </div>
      </div>

      {/* Listings grid */}
      <div className="px-4 pb-4">
        <div className="max-w-screen-md mx-auto">
          <div className="grid grid-cols-2 gap-3">
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
                  <div className="space-y-1 ">
                    <div className="text-xs font-medium text-[#6B7280] mb-0.5">
                      {listing.roomCount}-комнатная
                    </div>
                    <div className="flex items-center text-xs text-gray-600 mb-0.5">
                      <img className='w-3 h-3 mr-1 flex-shrink-0' src="/location_icon.svg" alt="location" />
                      <span className='text-[#6B7280] text-xs font-light truncate flex-1 min-w-0'>
                        ул. {listing.street || listing.district}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold text-[#086072] pr-1">
                        {new Intl.NumberFormat('ru-RU').format(listing.price)} ₸
                      </div>
                      <div className="text-xs text-[#6B7280] font-light">
                        {listing.area}
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
          
          {/* Sentinel для бесконечной прокрутки */}
          <div id="scroll-sentinel" className="h-1"></div>
          
          {/* Индикатор загрузки */}
          {isLoadingMore && (
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#4ECDC4] border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-gray-600">Загрузка...</span>
              </div>
            </div>
          )}
          
          {/* Сообщение об окончании списка */}
          {!hasMore && listings.length > 0 && (
            <div className="mt-6 text-center text-gray-500 text-sm">
              Все объявления загружены
            </div>
          )}
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
