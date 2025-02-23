import React from 'react';

import EmptyState from '@/components/EmptyState';
import ListingHead from './[id]/_components/ListingHead';
import ListingInfo from './[id]/_components/ListingInfo';
import ListingClient from './[id]/_components/ListingClient';

import { getCurrentUser } from '@/services/user';
import { getListingById } from '@/services/listing';
import { categories } from '@/utils/constants';

interface IParams {
  listingId: number;
}

const ListingPage = async ({ params: { listingId } }: { params: IParams }) => {
  const listing = await getListingById(+listingId);
  const currentUser = await getCurrentUser();

  if (!listing) return <EmptyState />;

  const {
    title,
    imageSrc,
    country,
    region,
    id,
    user: owner, // Данные пользователя
    price,
    description,
    roomCount,
    guestCount,
    bathroomCount,
    latlng,
    reservations,
    additionalDetails,
  } = listing;

  const category = categories.find((cate) => cate.label === listing.category);

  return (
    <section className="main-container">
      <div className="flex flex-col gap-6">
        <ListingHead title={title} image={imageSrc} country={country} region={region} id={id} />
      </div>

      <ListingClient
        id={id}
        price={price}
        reservations={reservations}
        user={currentUser}
        title={title}
        owner={owner} // Передаем данные пользователя
      >
        <ListingInfo
          city={additionalDetails?.city}
          buildYear={additionalDetails?.buildYear}
          user={owner}
          category={category}
          description={description}
          roomCount={additionalDetails?.houseType}
          guestCount={additionalDetails?.area}
          bathroomCount={additionalDetails?.bathroom}
          floor={additionalDetails?.floor}
          condition={additionalDetails?.condition}
          latlng={latlng}
        />
      </ListingClient>
    </section>
  );
};

export default ListingPage;
