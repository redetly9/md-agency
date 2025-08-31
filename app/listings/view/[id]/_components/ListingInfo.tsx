import React from 'react';
import dynamic from 'next/dynamic';

import Avatar from '@/components/Avatar';
import ListingCategory from './ListingCategory';
import { Category } from '@/types';
// import styles from '../ListingIdStyles/styles.css';
import './styles.css';

interface ListingInfoProps {
  user?: {
    name: string;
    phone: string;
    image: string;
  };
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: Category | undefined;
  latlng: number[];
  buildYear: number;
  city: string;
  condition: string;
  floor: string;
  street?: string;
}

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

const parseDescription = (description: string) => {
  const lines = description.split('\n').filter((line) => line.trim() !== '');
  const details: { key: string; value: string }[] = [];

  let currentKey = '';
  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (currentKey === '') {
      // Считаем строку текущим ключом
      currentKey = trimmedLine;
    } else {
      // Следующая строка — значение, сохраняем пару
      details.push({ key: currentKey, value: trimmedLine });
      currentKey = ''; // Сбрасываем ключ
    }
  });

  return details;
};

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  latlng,
  buildYear,
  city,
  floor,
  condition,
  street,
}) => {
  const [mapCenter, setMapCenter] = React.useState<number[] | undefined>(Array.isArray(latlng) && latlng.length === 2 ? latlng : undefined);
  React.useEffect(() => {
    if ((!latlng || latlng.length !== 2) && (street || city)) {
      const query = encodeURIComponent([street, city].filter(Boolean).join(', '));
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            const { lat, lon } = data[0];
            setMapCenter([parseFloat(lat), parseFloat(lon)]);
          }
        })
        .catch(() => {})
      ;
    }
  }, [latlng, street, city]);
  const parsedDetails = parseDescription(description);

  const cleanDescription = (description: any) => {
    // Удаляем теги button
    const withoutButtonTags = description.replace(/<button[\s\S]*?<\/button>/gi, '');
    // Удаляем слово "Перевести"
    return withoutButtonTags.replace(/Перевести/g, '');
  };

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        {/* <div className="text-[16px] font-semibold flex flex-row items-center gap-2">
          <span className="mr-1">Hosted by</span> <Avatar src={user?.image} />
          <span> {user?.name}</span>
        </div> */}
        <div
          className="flex flex-col gap-4 font-light text-neutral-700
          ">
          <span>Площадь: {guestCount}</span>
          <span>Тип дома: {roomCount} </span>
          <span>Санузел: {bathroomCount}</span>
          <span>Cостояние: {condition}</span>
          <span>Этаж: {floor} </span>
          <span>Год посторойки: {buildYear}</span>
          <span>Город: {city}</span>
        </div>
      </div>
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description || ''}
        />
      )}
      <hr />
      <p
        className="font-light text-neutral-500 text-[16px]"
        dangerouslySetInnerHTML={{
          __html: cleanDescription(description),
        }}
      />

      {/* <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {parsedDetails.map((detail, index) => (
          <div key={index} className="flex flex-col">
            <span className="font-semibold text-sm text-neutral-600">{detail.key}</span>
            <span className="text-sm text-neutral-800">{detail.value}</span>
          </div>
        ))}
      </div> */}
<div className="h-[210px]">
          <Map center={(mapCenter || latlng) as number[]} />
        </div>
    </div>
  );
};

export default ListingInfo;
