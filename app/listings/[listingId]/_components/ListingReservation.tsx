'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Modal from './Modal';

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onCreateReservation: any
}

const ListingReservation: React.FC<ListingReservationProps> = ({ price, totalPrice, onCreateReservation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  return (
    <>
      <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
        <div className="flex flex-row items-center gap-1 p-4">
          <span className="text-lg font-semibold">{price} тг.</span>
        </div>
        <div className="flex p-4 gap-[8px] justify-center items-center">
          <a
            onClick={openModal}
            className="disabled:opacity-70 disabled:cursor-not-allowed rounded hover:opacity-80 transition w-full bg-blue-500 text-white py-[8px] text-center rounded-[18px] s:w-[60%] sm:w-full">
            <button>
              Оставить заявку
            </button>
          </a>
        </div>
        <hr />
        <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
          <span>Общая стоимость:</span>
          <span>{totalPrice} тг.</span>
        </div>
      </div>
      <Modal isOpen={isOpen} openModal={openModal} closeModal={closeModal} onCreateReservation={onCreateReservation} />
    </>
  );
};

export default ListingReservation;
