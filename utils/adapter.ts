import { ApiListing, Listing } from '@/types';

export const adaptListing = (apiListing: ApiListing): Listing => {
  return {
    id: apiListing.id,
    title: apiListing.title,
    description: apiListing.description,
    imageSrc: apiListing.imageSrc[0] || '',
    category: apiListing.category,
    roomCount: apiListing.roomCount || 0,
    bathroomCount: apiListing.bathroomCount || 0,
    guestCount: 0,
    locationValue: apiListing.location.address,
    price: apiListing.price,
    user: {
      name: apiListing.user.name,
      image: apiListing.user.image
    }
  };
}; 