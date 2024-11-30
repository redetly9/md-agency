'use client';
import React, { useState } from 'react';
import Select from 'react-select';
import cities from '@/data/cities.json';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export type CitySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CitySelectProps {
  handleChange: (filteredListings: any[]) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ handleChange }) => {
  const city = useSelector((state: RootState) => state.city.selectedCity);

  return (
    <Select
      className="ml-[20px]"
      placeholder="Выберите город"
      defaultValue={city}
      isClearable
      options={cities}
      onChange={handleChange}
      formatOptionLabel={(option: any) => (
        <div className="flex flex-row items-center gap-3 z-[10]">
          <div>
            {option.label}
            <span className="text-neutral-500 ml-1 bg-white"></span>
          </div>
        </div>
      )}
      classNames={{
        control: () => 'p-[6px] text-[14px] border-1',
        input: () => 'text-[14px]',
        option: () => 'text-[14px]',
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: 'black',
          primary25: '#ffe4e6',
        },
      })}
    />
  );
};

export default CitySelect;
