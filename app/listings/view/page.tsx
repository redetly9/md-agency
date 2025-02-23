// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import EmptyState from '@/components/EmptyState';
import ListingHead from './[id]/_components/ListingHead';
import ListingInfo from './[id]/_components/ListingInfo';
import ListingClient from './[id]/_components/ListingClient';
import { categories } from '@/utils/constants';

interface IParams {
  listingId: number;
}

const ListingPage = ({ params: { listingId } }: { params: IParams }) => {
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`/api/krisha/listings/${listingId}`);
        const data = await response.json();
        setListing(data);
      } catch (error) {
        console.error('Error fetching listing:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!listing) return <EmptyState />;

  const category = categories.find((cate) => cate.label === listing.category);

  return (
    <section className="main-container">
      <div className="flex flex-col gap-6">
        <ListingHead 
          title={listing.title} 
          image={listing.imageSrc} 
          country={listing.country} 
          region={listing.region} 
          id={listing.id} 
        />
      </div>

      <ListingClient
        id={listing.id}
        price={listing.price}
        title={listing.title}
        owner={listing.user}
      >
        <ListingInfo
          city={listing.additionalDetails?.city}
          buildYear={listing.additionalDetails?.buildYear}
          user={listing.user}
          category={category}
          description={listing.description}
          roomCount={listing.additionalDetails?.houseType}
          guestCount={listing.additionalDetails?.area}
          bathroomCount={listing.additionalDetails?.bathroom}
          floor={listing.additionalDetails?.floor}
          condition={listing.additionalDetails?.condition}
          latlng={listing.latlng}
        />
      </ListingClient>
    </section>
  );
};

export default ListingPage;
