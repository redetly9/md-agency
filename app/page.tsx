import KrishaList from '@/components/KrishaList';
import React from 'react';

interface HomeProps {
  searchParams?: { [key: string]: string | undefined };
}

const Home: React.FC<HomeProps> = ({ searchParams }) => {
  return <KrishaList searchParams={searchParams} />;
};

export default Home;
