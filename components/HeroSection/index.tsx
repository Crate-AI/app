import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const WaitlistForm = dynamic(() => import('@/components/WaitListForm'), {
  ssr: false,
});

const HeroSection: React.FC = () => {
  return (
    <div
      className="relative w-full h-screen flex flex-col justify-center items-center bg-white text-black"
      style={{
        backgroundImage: 'radial-gradient(#FFDC58 1px, transparent 1px)',
        backgroundSize: '10px 10px',
      }}
    >
      <div className="flex flex-col items-center mt-10">
        {' '}
        {/* Adjusted margin-top */}
        <h1 className="text-large-title font-mono font-bold mb-4 drop-shadow-lg transition-transform duration-300 hover:scale-110">
          Crate
        </h1>
        <p className="text-medium-title font-mono mb-6 drop-shadow-lg inline-flex items-center">
          Beta under construction, join our waitlist for early access
          <Image
            src="/Smile.svg"
            alt="Smile"
            width={27}
            height={27}
            className="ml-2"
          />
        </p>
        <div className="w-full max-w-lg px-8 py-6 text-black shadow-xs rounded-lg transition-transform duration-300 hover:scale-105">
          <WaitlistForm />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
