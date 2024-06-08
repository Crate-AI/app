
import React from 'react';
import CrateLogo from '@/components/crateLogo'; // Make sure the path is correct based on your file structure

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-primary to-secondary">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/10 to-transparent animate-pulse"></div>
      <div className="flex flex-col justify-center items-center h-full z-10 text-white">
        <div className="flex flex-col items-center p-10">
          <CrateLogo /> {/* Include the logo here */}          
        </div>
        <h1 className="text-6xl font-bold mb-4">Crate</h1>
        <p className="text-xl">Smart digging 💿 </p>
        <form className="mt-8">
          <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-lg" required />
          <button type="submit" className="ml-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg">
            Join Waitlist
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
