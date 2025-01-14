import React, { ReactNode } from 'react';
import Layout from './_components/Layout';
import HeroSection from './_components/HeroSection';
import Features from './_components/Features';
import Stats from './_components/Stats';
import Testimonials from './_components/Testimonials';
import CallToAction from './_components/CallToAction';
import Blog from './_components/Blog';


const index: React.FC = () => {
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