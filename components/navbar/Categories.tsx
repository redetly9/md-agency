'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import throttle from 'lodash.throttle';
import 'swiper/css';

import CategoryBox from './CategoryBox';
import { categories } from '@/utils/constants';
import { Category } from '@/types';

const Categories = () => {
  const [isActive, setIsActive] = useState(false);
  const params = useSearchParams();
  const pathname = usePathname();
  const category = params?.get('category');

  const isMainPage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    const throttledHandleScroll = throttle(handleScroll, 150);
    window.addEventListener('scroll', throttledHandleScroll);

    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  if (!isMainPage) {
    return null;
  }

  return (
    <div
      className={` ${
        isActive ? 'shadow-md shadow-[rgba(0,0,0,.045)]' : ''
      } transition-all duration-150`}>
      <div className="flex justify-center gap-[10px]">
        {categories.map((item: Category) => (
          <div key={item.label}>
            <CategoryBox label={item.label} icon={item.icon} selected={category === item.label} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
