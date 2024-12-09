'use client';

import React from 'react';
import Link from 'next/link';

interface ListingReservationProps {
  price: number;
  totalPrice: number;
}

const ListingReservation: React.FC<ListingReservationProps> = ({ price, totalPrice }) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <span className="text-lg font-semibold">{price} тг.</span>
      </div>
      <div className="flex p-4 gap-[8px] justify-center items-center">
        {/* Ссылка на калькулятор для ипотеки */}
        <Link
          href={`/calculator?totalPrice=${totalPrice}&activeTab=mortgage`}
          className="disabled:opacity-70 disabled:cursor-not-allowed rounded hover:opacity-80 transition w-full bg-blue-500 text-white py-[8px] text-center rounded-[18px] s:w-[40%] sm:w-full">
          <button>В ипотеку</button>
        </Link>
        {/* Ссылка на калькулятор для аренды с выкупом */}
        <Link
          href={`/calculator?totalPrice=${totalPrice}&activeTab=rent`}
          className="disabled:opacity-70 disabled:cursor-not-allowed rounded hover:opacity-80 transition w-full bg-blue-500 text-white py-[8px] text-center rounded-[18px] s:w-[60%] sm:w-full">
          <button
            title={`Аренда с выкупом:
- Без первоначального взноса
- Без подтверждения официального дохода
- Без анализа кредитной истории
- На срок 60 месяцев с последующей пролонгацией
- Ежемесячная оплата состоит из суммы аренды и суммы первоначального взноса
- В ежемесячную сумму оплаты входит (от цены недвижимости):
  1% аренда + 0.3% часть возвратного первоначального взноса
- Вне зависимости от того, есть у вас жильё или нет, одно или несколько.
- Вне зависимости от статуса категории.`}>
            Аренда с выкупом
          </button>
        </Link>
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <span>Общая стоимость:</span>
        <span>{totalPrice} тг.</span>
      </div>
    </div>
  );
};

export default ListingReservation;
