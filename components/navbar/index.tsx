// @ts-nocheck

import React, { Suspense, useState } from 'react';
import Logo from './Logo';
import Search from './Search';
import Categories from './Categories';
import UserMenu from './UserMenu';
import { getCurrentUser } from '@/services/user';
import CitySelect from '../inputs/CitySelect';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = async () => {
  const user = await getCurrentUser();

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-10 mb-[64px]">
      <nav className="py-3 border-b-[1px]">
        <div className="flex main-container flex-row justify-between items-center gap-10 md:gap-0">
          <Logo />
          <Suspense fallback={<></>}>
            <Search />
          </Suspense>

          <UserMenu user={user} />
          <CitySelect />
        </div>
      </nav>
      <div>
        <Categories />
      </div>
    </header>
  );
};

export default Navbar;
