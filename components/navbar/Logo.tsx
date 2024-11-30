import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="sm:h-[70px] w-[150px] relative hidden s:block s:h-[50px]">
      <Image src="/images/vacationhub.png" alt="logo" fill sizes="150px" priority />
    </Link>
  );
};

export default Logo;
