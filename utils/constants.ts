import { TbBeach, TbBuilding, TbHome, TbMountain, TbPool } from 'react-icons/tb';
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';

export const categories = [
  {
    label: 'Квартира',
    icon: TbBuilding,
    description:
      'Квартира — это жилое помещение, расположенное в многоквартирном доме и предназначенное для проживания одной или нескольких семей.',
  },
  {
    label: 'Частный дом',
    icon: TbHome,
    description:
      'Частный дом предназначен для проживания одной семьи и обычно располагается на отдельном участке земли.',
  },
];

export const LISTINGS_BATCH = 16;

export const menuItems = [
  {
    label: 'My trips',
    path: '/trips',
  },
  {
    label: 'My favorites',
    path: '/favorites',
  },
  {
    label: 'My reservations',
    path: '/reservations',
  },
  {
    label: 'My properties',
    path: '/properties',
  },
];
