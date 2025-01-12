import React, { ReactNode } from 'react';
import Layout from './Layout';
import HeroSection from './HeroSection';
import Features from './Features';
import Stats from './Stats';
import Testimonials from './Testimonials';
import CallToAction from './CallToAction';
import Blog from './Blog';

interface indexProps {
  children?: ReactNode;
}

const index: React.FC<indexProps> = ({ children }) => {
  return (

<Layout>
	<main className="space-y-40 mb-40">
		<HeroSection/>
		<Features/>
		<Stats/>
		<Testimonials/>
		<CallToAction/>
		<Blog/>
	</main>
</Layout>
  );
};

export default index;