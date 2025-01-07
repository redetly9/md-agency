import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="sm:h-[70px] w-[70px] relative hidden s:block s:h-[50px]">
      <Image src="/images/logo2.png" alt="logo" width="100" height='130' priority className='object-cover h-[130%]' />
    </Link>
  );
};

export default Logo;
