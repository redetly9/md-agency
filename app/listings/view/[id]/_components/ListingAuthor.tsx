'use client';

import React from 'react';

interface ListingAuthorProps {
  name: string;
  phone: string;
  image: string;
}

const ListingAuthor: React.FC<ListingAuthorProps> = ({ name, phone, image }) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden mt-[20px] gap-1 p-4 flex flex-col gap-[20px]">
      <div className="flex justify-between">
        <div>
          <span className="text-[#888b94] ">Автор объявления</span>
          <p className="text-lg font-semibold">{name}</p>
          <p>Хозяин недвижимости</p>
        </div>
        <img
          className="h-[36px] w-[36px] rounded-full"
          src={image.startsWith('//') ? `https:${image}` : image}
          alt="Изображение"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder.jpg';
          }}
        />
      </div>
      <div>
        <span className="text-lg font-semibold">{phone}</span>
      </div>
      <div>
        <button className="disabled:opacity-70 disabled:cursor-not-allowed rounded hover:opacity-80 transition w-full bg-blue-500 text-white py-[10px] px-[10px] text-center rounded-[18px]">
          Написать сообщение
        </button>
      </div>
    </div>
  );
};

export default ListingAuthor;
