'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/utils';

export const CollectionNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const username = pathname.split('/')[1];

  const items = [
    { name: 'Tracks', href: `/${username}/tracks` },
    { name: 'Playlists', href: `/${username}/playlists` },
  ];

  return (
    <nav className="flex space-x-2 mb-8">
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => router.push(item.href)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-full transition-colors',
            pathname === item.href
              ? 'bg-primary text-black'
              : 'text-gray-500 hover:text-gray-900'
          )}
        >
          {item.name}
        </button>
      ))}
    </nav>
  );
}; 