// @ts-nocheck
import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import Skeleton from 'react-loading-skeleton';

import HeartButton from './HeartButton';
import Image from './Image';
import { fixImageUrl, formatPrice } from '@/utils/helper';

interface ListingCardProps {
  data: any;
  reservation?: any;
  hasFavorited: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ data, reservation, hasFavorited }) => {
  const price = reservation ? reservation.totalPrice : data?.price;

  return (
    <div className="bg-white border-b">
      <Link href={`/listings/view/${data.id}`} className="block">
        <div className="p-4">
          {/* Цена */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold">{formatPrice(price)} ₸</h2>
            <div className="flex items-center gap-2">
              <div onClick={(e) => e.stopPropagation()}>
                <HeartButton listingId={data.id} key={data.id} hasFavorited={hasFavorited} />
              </div>
            </div>
          </div>

          {/* Основная информация о квартире */}
          <div className="text-blue-600 mb-3">
            {data.roomCount}-комнатная квартира · {data.area} м² · {data.floor}
          </div>

          {/* Изображение и адрес */}
          <div className="flex gap-4">
            <div className="relative w-[40%]">
              <div className="aspect-[4/3] relative">
                <img
                  src={fixImageUrl(data.imageSrc)}
                  alt={data.title}
                  className="object-cover w-full h-full rounded"
                />
                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-0.5 rounded text-sm">
                  1
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-base mb-1">{data.street || 'Улица не указана'}</div>
              <div className="text-gray-500">{data.city}, {data.district}</div>
            </div>
          </div>

          {/* Нижняя информация */}
          <div className="flex items-center justify-between mt-3">
            <span className="bg-yellow-50 text-[13px] text-yellow-800 px-2 py-0.5 rounded">
              Хозяин недвижимости
            </span>
            <div className="flex items-center gap-4 text-gray-500">
              <span>{format(new Date(), 'd MMMM')}</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                {data.viewCount || 0}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;

export const ListingSkeleton = () => {
  return (
    <div className="bg-white border-b p-4">
      <div className="flex justify-between mb-2">
        <Skeleton height={32} width={160} />
        <div className="flex gap-2">
          <Skeleton width={20} height={20} />
          <Skeleton width={20} height={20} />
        </div>
      </div>
      <Skeleton height={24} width={280} className="mb-3" />
      <div className="flex gap-4">
        <div className="w-[40%]">
          <Skeleton width={'100%'} height={'100%'} className="aspect-[4/3]" />
        </div>
        <div className="flex-1">
          <Skeleton height={24} width={'100%'} className="mb-1" />
          <Skeleton height={20} width={'80%'} />
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <Skeleton height={20} width={120} />
        <div className="flex gap-4">
          <Skeleton height={20} width={80} />
          <Skeleton height={20} width={40} />
        </div>
      </div>
    </div>
  );
};
