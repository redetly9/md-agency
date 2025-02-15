// @ts-nocheck
import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Listing } from '@prisma/client';
import Skeleton from 'react-loading-skeleton';

import HeartButton from './HeartButton';
import Image from './Image';
import { fixImageUrl, formatPrice } from '@/utils/helper';
import ListingMenu from './ListingMenu';

interface ListingCardProps {
  data: Listing;
  reservation?: any;
  hasFavorited: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({ data, reservation, hasFavorited }) => {
  const price = reservation ? reservation.totalPrice : data?.price;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow">
      <div className="relative">
        <div className="absolute top-0 left-0 p-3 flex items-center justify-between w-full z-10">
          <div>
            <ListingMenu id={reservation?.id || data.id} />
          </div>
          <div className="w-[28px] h-[28px] flex items-center justify-center">
            <HeartButton listingId={data.id} key={data.id} hasFavorited={hasFavorited} />
          </div>
        </div>

        <Link href={`/listings/${data.id}`}>
          <div className="p-4">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-xl font-bold">{formatPrice(price)} ₸</h2>
            </div>

            <div className="text-primary mb-2">
              {data.category} · {data.roomCount} м² · {data.bathroomCount}/{data.guestCount} этаж
            </div>

            <div className="relative mb-3">
              <div className="aspect-[1/0.95] relative overflow-hidden rounded">
                <img
                  src={fixImageUrl(data.imageSrc)}
                  alt={data.title}
                  className="object-cover w-full h-full"
                />
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                  {data.imageCount || 1}
                </span>
              </div>
            </div>

            <div className="mb-2">
              <h3 className="font-medium">{data.title}</h3>
              <p className="text-gray-500">{data.street}</p>
              <p className="text-gray-500">{data.city}</p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="bg-yellow-100 px-2 py-1 rounded">
                  {data.user?.type || 'Специалист'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  {new Date(data.createdAt).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  {data.viewCount || 0}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;

export const ListingSkeleton = () => {
  return (
    <div className="col-span-1 ">
      <div className="flex flex-col gap-1 w-full">
        <Skeleton width={'100%'} height={'100%'} borderRadius={'12px'} className="aspect-square" />

        <div className="flex flex-row gap-3">
          <Skeleton height={'18px'} width={'84px'} />
          <Skeleton height={'18px'} width={'84px'} />
        </div>
        <Skeleton height={'16px'} width={'102px'} />
        <Skeleton height={'18px'} width={'132px'} />
      </div>
    </div>
  );
};
