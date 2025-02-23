import { IconType } from "react-icons";

export interface Category {
  label: string;
  icon: IconType;
  description?: string;
}

export interface ApiListing {
  id: string;
  title: string;
  description: string;
  imageSrc: string[];
  price: number;
  category: string;
  location: {
    country: string;
    city: string;
    address: string;
  };
  additionalDetails: {
    area: string;
    bathroom: string;
    floor: string;
    condition: string;
  };
  roomCount: number;
  bathroomCount: number;
  user: {
    name: string;
    phone: string;
    image: string;
  };
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  price: number;
  user: {
    name: string;
    image: string;
  };
}