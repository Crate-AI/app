'use client';

import Image from 'next/image';
import Link from 'next/link';

interface BannerProps {
  username: string;
  avatarUrl: string;
  authElement: React.ReactNode;
}

export default function Banner({
  username,
  avatarUrl,
  authElement,
}: BannerProps) {
  return (
    <header className="text-black p-6 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Crate Logo"
            width={100}
            height={100}
            className="transition-transform duration-300 hover:scale-110"
          />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {username === 'Guest' ? (
          authElement
        ) : (
          <>
            <Image
              src={avatarUrl}
              alt={username}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full border-2 border-black shadow-light"
            />
            <span className="font-medium">{username}</span>
          </>
        )}
      </div>
    </header>
  );
}
