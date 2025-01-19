'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
            <Avatar>
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{username.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{username}</span>
          </>
        )}
      </div>
    </header>
  );
}
