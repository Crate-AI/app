import React from 'react';
import dynamic from 'next/dynamic';
import CrateLogo from '@/components/CrateLogo';

const WaitlistForm = dynamic(() => import('@/components/WaitListForm'), { ssr: false });

const HeroSection: React.FC = () => {
  return (
      <div className="relaive w-full justify-center items-center h-screen flex flex-col bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
           <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/10 to-transparent">
       <div className="flex flex-col items-center mt-20">
          <div className="mb-6">
            <CrateLogo />
          </div>
          <h1 className="text-6xl font-bold mb-4 drop-shadow-lg transition-transform duration-300 hover:scale-110">Crate</h1>
          <p className="text-xl mb-6 drop-shadow-lg">Smart digging 💿</p>
        <div className="w-full max-w-lg px-8 py-6 bg-gradient-to-r from-indigo-700 to-purple-700 shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
          <WaitlistForm />
        </div>
      </div>
    </div>
    </div>
  );
};

export default HeroSection;
