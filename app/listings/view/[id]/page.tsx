'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Gallery from './_components/Gallery';
import { GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';

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

const parseDescription = (description: string) => {
  const lines = description.split('\n').filter((line) => line.trim() !== '');
  const details: { key: string; value: string }[] = [];

  let currentKey = '';
  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (currentKey === '') {
      currentKey = trimmedLine;
    } else {
      details.push({ key: currentKey, value: trimmedLine });
      currentKey = '';
    }
  });

  return details;
};

const cleanDescription = (description: string) => {
  // Удаляем теги button
  const withoutButtonTags = description.replace(/<button[\s\S]*?<\/button>/gi, '');
  // Удаляем слово "Перевести"
  return withoutButtonTags.replace(/Перевести/g, '');
};

const mapContainerStyle = {
  width: '100%',
  height: '200px',
  borderRadius: '0 0 12px 12px'
};

const defaultCenter = {
  lat: 43.2220,
  lng: 76.8512
};

export default function ListingViewPage() {
  const params = useParams();
  const [listing, setListing] = useState<DetailedListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [showHeader, setShowHeader] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCqVpS-EXUupXT-NHrv4cvvK6LyaKE_cvw",
    libraries: ['places']
  });

  console.log('listing', listing);
  

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  useEffect(() => {
    const geocodeAddress = async () => {
      if (!listing || !isLoaded) return;
      
      const address = `${listing.street}, ${listing.district}, Алматы`;
      const geocoder = new window.google.maps.Geocoder();
      
      try {
        const response = await geocoder.geocode({ address });
        if (response.results[0]) {
          const location = response.results[0].geometry.location;
          setMapCenter({
            lat: location.lat(),
            lng: location.lng()
          });
        }
      } catch (error) {
        console.error('Error geocoding address:', error);
      }
    };

    geocodeAddress();
  }, [listing, isLoaded]);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-[50vh] bg-gray-200"></div>
        <div className="p-4 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="p-4">
        <h1>Объявление не найдено</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-16">
      {/* Плавающая шапка */}
      <div 
        className={`fixed top-0 left-0 right-0 bg-white z-50 border-b transform transition-transform duration-300 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-screen-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </Link>
            <div>
              <div className="font-medium">{listing.price.toLocaleString()} ₸</div>
              <div className="text-sm text-gray-500">
                {listing.roomCount}-комнатная · {listing.area} м²
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Галерея */}
      <Gallery images={listing.imageSrc} />

      <div className="p-4">
        {/* Основная информация */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{listing.price.toLocaleString()} ₸</h1>
          <div className="text-lg mb-1">
            {listing.roomCount}-комнатная квартира · {listing.area} м² · {listing.floor} этаж
          </div>
          <div className="text-gray-500">{listing.district}, {listing.street}</div>
        </div>

        {/* Расположение */}
        <div className="bg-white rounded-xl mb-4">
          <div className="p-4 border-b">
            <h2 className="text-xl font-medium">Расположение</h2>
          </div>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={15}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                  }
                ]
              }}
            >
              <Marker 
                position={mapCenter}
                icon={{
                  url: '/marker.svg',
                  scaledSize: new window.google.maps.Size(32, 32),
                  anchor: new window.google.maps.Point(16, 32)
                }}
              />
            </GoogleMap>
          ) : (
            <div className="h-[200px] bg-gray-100 animate-pulse"></div>
          )}
          <div className="p-4">
            <div className="flex items-center gap-2 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>{listing?.district}, {listing?.street}</span>
            </div>
          </div>
        </div>

        {/* О квартире */}
        <div className="bg-white rounded-xl mb-4">
          <div className="p-4 border-b">
            <h2 className="text-xl font-medium">О квартире</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500 mb-1">Площадь</div>
                <div>{listing.additionalDetails.area}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Этаж</div>
                <div>{listing.additionalDetails.floor}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Санузел</div>
                <div>{listing.additionalDetails.bathroom}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Состояние</div>
                <div>{listing.additionalDetails.condition}</div>
              </div>
            </div>
          </div>
        </div>

        {/* О доме */}
        <div className="bg-white rounded-xl mb-4">
          <div className="p-4 border-b">
            <h2 className="text-xl font-medium">О доме</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-gray-500 mb-1">Тип строения</div>
                <div>{listing.additionalDetails.houseType}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Год постройки</div>
                <div>{listing.additionalDetails.buildYear}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Высота потолков</div>
                <div>{listing.additionalDetails.ceilingHeight}</div>
              </div>
              {listing.additionalDetails.complex && (
                <div>
                  <div className="text-gray-500 mb-1">Жилой комплекс</div>
                  <div>{listing.additionalDetails.complex}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Описание */}
        <div className="bg-white rounded-xl mb-4">
          <div className="p-4 border-b">
            <h2 className="text-xl font-medium">Описание</h2>
          </div>
          <div 
            className="p-4 space-y-4"
            dangerouslySetInnerHTML={{
              __html: cleanDescription(listing.description)
            }}
          />
        </div>

        {/* Контакты */}
        <div className="bg-white rounded-xl">
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={listing.user.image} 
                alt={listing.user.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-medium">{listing.user.name}</div>
                <div className="text-gray-500">Владелец</div>
              </div>
            </div>
            <a 
              href={`tel:${listing.user.phone}`}
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium"
            >
              {listing.user.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}