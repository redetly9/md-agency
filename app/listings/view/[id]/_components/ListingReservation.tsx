'use client';

import React, { useState } from 'react';
import Modal from './Modal';

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onCreateReservation: any;
}

const ListingReservation: React.FC<ListingReservationProps> = ({ price, totalPrice, onCreateReservation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Ипотека');

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <div className="bg-[#122037] rounded-xl border border-neutral-200 shadow-none overflow-hidden">
        <div className="flex flex-row items-center gap-1 p-4">
          <span className="text-lg font-semibold">{price} тг.</span>
        </div>
        <div className="p-4">
          <label htmlFor="options" className="block text-sm font-medium text-white/75 mb-2">
            Выберите вариант:
          </label>
          <div className="relative">
            <select
              id="options"
              value={selectedOption}
              onChange={handleOptionChange}
              className="block w-full appearance-none rounded-lg border border-white/10 bg-[#0b1626] p-3 text-sm font-medium text-white/75 focus:border-[#d4af5a]/40 focus:ring-2 focus:ring-[#d4af5a] transition"
            >
              <option value="Ипотека">Ипотека</option>
              <option value="Рефинансирование">Рефинансирование</option>
              <option value="Аренда">Аренда</option>
              <option value="Аренда с выкупом">Аренда с выкупом</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-white/40"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex p-4 gap-2 justify-center items-center">
          <button
            onClick={openModal}
            className="w-full bg-[#d4af5a] text-[#0b1626] py-2 px-4 rounded-xl hover:bg-[#e6c87a] transition"
          >
            Оставить заявку
          </button>
        </div>
        <hr />
        <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
          <span>Общая стоимость:</span>
          <span>{totalPrice} тг.</span>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
        onCreateReservation={() => onCreateReservation(selectedOption)}
      />
    </>
  );
};

export default ListingReservation;
