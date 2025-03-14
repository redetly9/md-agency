'use client';
import React from 'react';
import Image from '@/components/Image';

import Heading from '@/components/Heading';
import HeartButton from '@/components/HeartButton';
import { getFavorites } from '@/services/favorite';
import { Gallery } from 'react-grid-gallery';
import CustomGallery from './Gallery';
interface ListingHeadProps {
  title: string;
  country: string | null;
  region: string | null;
  image: [];
  id: string;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  country = '',
  region = '',
  image,
  id,
}) => {
  // const favorites = getFavorites();
  // const hasFavorited = favorites.includes(id);
  const images = image.map((v, index) => ({ src: v }));
  console.log('images', images);

  return (
    <>
      <Heading title={title} subtitle={`${region}, ${country}`} backBtn />
      <div className={`w-full overflow-hidden  rounded-xl relative transition duration-300`}>
        {/* <Image imageSrc={image} fill className={`object-cover`} alt={title} sizes="100vw" /> */}
        {/* <div className="relative h-full w-full flex gap-2 overflow-x-scroll scrollbar-hide">
          {image.map((images, index) => (
            <div key={index} className="relative flex-shrink-0 w-full h-full">
              <Image
                imageSrc={images}
                fill
                className="object-cover"
                alt={`${title} - Image ${index + 1}`}
                sizes="100vw"
              />
            </div>
          ))}
        </div> */}
        {/* <Gallery images={images} /> */}
        {/* @ts-ignore */}
        <CustomGallery images={images} />
        {/* <div className="absolute top-5 right-5">
          <HeartButton listingId={id} hasFavorited={hasFavorited} />
        </div> */}
      </div>
    </>
  );
};

export default ListingHead;
