'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, Camera } from 'lucide-react';
import { IoMdShare } from 'react-icons/io';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';


interface DetailedListing {
  id: string;
  title: string;
  description: string;
  imageSrc: string[];
  price: number;
  city: string;
  district: string;
  street: string;
  category: string;
  roomCount: string;
  floor: string;
  area: string;
  additionalDetails: {
    city: string;
    houseType: string;
    complex: string;
    buildYear: string;
    area: string;
    bathroom: string;
    ceilingHeight: string;
    floor: string;
    condition: string;
  };
  user: {
    name: string;
    phone: string;
    image: string;
  };
}

export default function ListingViewPage() {
  const params = useParams();
  const [listing, setListing] = useState<DetailedListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/krisha/listings/${params.id}`);
        const data = await response.json();
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Объявление не найдено</p>
          <Link href="/" className="mt-4 inline-block text-red-600 hover:text-red-700">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  const cleanDescription = (description: string) => {
    const withoutButtonTags = description.replace(/<button[\s\S]*?<\/button>/gi, '');
    return withoutButtonTags.replace(/Перевести/g, '').trim();
  };

  const displayDescription = cleanDescription(listing.description);
  const shortDescription = displayDescription.length > 150 
    ? displayDescription.substring(0, 150) + '...'
    : displayDescription;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-[#ABABAB] z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-white bg-[#787878] rounded-full p-1.5">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="font-medium text-white">{listing.roomCount}-комн. квартира, {listing.area} м²</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-white bg-[#787878] rounded-full p-1.5">
              <IoMdShare size={24} />
            </button>
            <button 
              onClick={() => setIsFavorited(!isFavorited)}
              className={`${isFavorited ? 'text-white bg-[#787878] rounded-full p-1.5' : 'text-white bg-[#787878] rounded-full p-1.5'}`}
            >
              {isFavorited ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Image Gallery */}
      <div className="relative">
        <div className="aspect-[4/3] bg-gray-200 overflow-hidden">
          <img
            src={listing.imageSrc[currentImage] || '/images/placeholder.jpg'}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm flex items-center gap-1">
          <Camera size={14} />
          <span>{currentImage + 1}/{listing.imageSrc.length || 1}</span>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex gap-2 p-4 overflow-x-auto scrollbar-hide pb-12">
          {listing.imageSrc.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                currentImage === index ? 'border-red-600' : 'border-transparent'
              }`}
            >
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

     

      {/* Main Content */}
      <div className="px-4 pb-4">
        {/* Price and Status */}
        <div className="flex items-center justify-between py-4">
          <h2 className="text-3xl font-bold">{listing.price.toLocaleString()} ₽</h2>
          <span className="bg-[#4dcdc4] text-white px-4 py-1 rounded-full text-xs">
            В продаже
          </span>
        </div>
         {/* Divider */}
      <div className="h-[1px] bg-[#E0E0E0]"></div>

        {/* Property Stats */}
        <div className="grid grid-cols-4 gap-4 py-6">
          <div className="text-center">
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <img src="/general.svg" alt="Площадь" className="w-5 h-5" />
            </div>
            <div className="font-semibold">{listing.area} м²</div>
            <div className="text-xs font-light text-[#666666]">Общая</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <img src="/rooms.svg" alt="Комнаты" className="w-5 h-5" />
            </div>
            <div className="font-semibold">{listing.roomCount}</div>
            <div className="text-xs font-light text-[#666666]">Комнаты</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <img src="/floor.svg" alt="Этаж" className="w-5 h-5" />
            </div>
            <div className="font-semibold">{listing.floor || '8/12'}</div>
            <div className="text-xs font-light text-[#666666]">Этаж</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <img src="/calendar.svg" alt="Год" className="w-5 h-5" />
            </div>
            <div className="font-semibold">{listing.additionalDetails.buildYear || '2020'}</div>
            <div className="text-xs font-light text-[#666666]">Год</div>
          </div>
        </div>
         {/* Divider */}
      <div className="h-[1px] bg-[#E0E0E0]"></div>

        {/* Description */}
        <div className="py-6">
          <h3 className="text-xl font-semibold mb-3">Описание</h3>
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: showFullDescription ? displayDescription : shortDescription
            }}
          />
          {displayDescription.length > 150 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-[#4ECDC4] font-light mt-2"
            >
              {showFullDescription ? 'Скрыть' : 'Показать полностью'}
            </button>
          )}
        </div>
        

        {/* Amenities */}
        <div className="pb-6">
          <div className="flex flex-wrap gap-2">
            <span className="bg-[#F5F5F5] text-[#666666] font-light px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <img src="/parking.svg" alt="Парковка" className="w-3.5 h-3.5" />
              Парковка
            </span>
            <span className="bg-[#F5F5F5] text-[#666666] font-light px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <img src="/defence.svg" alt="Охрана" className="w-3.5 h-3.5" />
              Охрана
            </span>
            <span className="bg-[#F5F5F5] text-[#666666] font-light px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <img src="/lift.svg" alt="Лифт" className="w-3.5 h-3.5" />
              Лифт
            </span>
            <span className="bg-[#F5F5F5] text-[#666666] font-light px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <User size={14} />
              Консьерж
            </span>
            <span className="bg-[#F5F5F5] text-[#666666] font-light px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Camera size={14} />
              Видеонаблюдение
            </span>
          </div>
        </div>
        {/* Divider */}
      <div className="h-[1px] bg-[#E0E0E0]"></div>

        {/* Location */}
        <div className="pt-6">
          <h3 className="text-xl font-semibold mb-3">Расположение</h3>
          <div className="flex items-center gap-2 text-gray-600">
            <img src="/location_color.svg" alt="Местоположение" className="w-[12.5px] h-[17.5px] mr-2" />
            <span className='text-[#333333] font-light'>
              {listing.street && `ул. ${listing.district}`}
              {listing.street && listing.district && ', '}
              {listing.district}
              {(listing.street || listing.district) && listing.city && ', '}
              {listing.city}
            </span>
          </div>
        </div>

        {/* Service Buttons */}
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
            <Link href="/rent-to-own" className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto">
                <img src="/arenda.svg" alt="Аренда" className="w-10 h-10" />
              </div>
              <span className="text-xs text-[#4FD1C5] font-light">Аренда</span>
            </Link>
            <Link href="/refinance" className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto">
                <img src="/refinance.svg" alt="Рефинансирование" className="w-10 h-10" />
              </div>
              <span className="text-xs text-[#4FD1C5] font-light">Рефинансирование</span>
            </Link>
            <Link href="/arenda-s-vykupom" className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto">
                <img src="/arenda_s_vykupom.svg" alt="Аренда с выкупом" className="w-10 h-10" />
              </div>
              <span className="text-xs text-[#4FD1C5] font-light">Аренда с выкупом</span>
            </Link>
          </div>
        </div>
      </div>


    </div>
  );
}