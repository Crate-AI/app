import React from 'react';
import dynamic from 'next/dynamic';
import CrateLogo from '@/components/crateLogo'; // Make sure the path is correct based on your file structure

const HeroForm = dynamic(() => import('@/components/heroForm'), { ssr: false });

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-primary to-secondary">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/10 to-transparent animate-pulse"></div>
      <div className="flex flex-col justify-center items-center h-full z-10 text-white">
        <div className="flex flex-col items-center p-10">
          <CrateLogo />
        </div>
        <h1 className="text-6xl font-bold mb-4">Crate</h1>
        <p className="text-xl">Smart digging 💿</p>
        <HeroForm />
      </div>
    </div>
  );
};

export default HeroSection;
