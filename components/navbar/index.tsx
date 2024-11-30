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

  // styles for fixed navbar " "

  return (
    <header className="mb-[32px]">
      <nav className="py-3 border-b-[1px]">
        <div className="flex main-container flex-row justify-between items-center gap-10 s:gap-5 md:gap-0">
          <Logo />
          <Suspense fallback={<></>}>
            <Search />
          </Suspense>

          <UserMenu user={user} />
        </div>
      </nav>
      {/* <div>
        <Categories />
      </div> */}
    </header>
  );
};

export default Navbar;
