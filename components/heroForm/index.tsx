// components/HeroForm.tsx
'use client'; // This directive tells Next.js to treat this file as a Client Component

import React from 'react';
import { Button } from '@/components/ui/button';

const HeroForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add form submission logic here
    console.log('Form submitted');
  };

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-lg" required />
      <Button type="submit" className="ml-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg">
        Join Waitlist
      </Button>
    </form>
  );
};

export default HeroForm;
