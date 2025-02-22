'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect, forwardRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDiscogsCollection } from '@/lib/hooks/useDiscogsCollection';

interface UserDropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void; // Add refresh handler prop
}

const UserDropdownMenu = forwardRef<HTMLDivElement, UserDropdownMenuProps>(
  ({ isOpen, onClose, onRefresh }, ref) => {
    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
      >
        <div className="p-2 space-y-1">
          <button
            onClick={() => {
              onRefresh();
              onClose();
            }}
            className="w-full text-left p-2 hover:bg-gray-100 rounded-md text-sm"
          >
            Refresh Discogs Collection
          </button>
          <button className="w-full text-left p-2 hover:bg-gray-100 rounded-md text-sm text-red-600">
            Logout
          </button>
        </div>
      </div>
    );
  },
);

UserDropdownMenu.displayName = 'UserDropdownMenu';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  /* const { refresh } = useDiscogsCollection(); // Use hook at component level */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isModalOpen &&
        !buttonRef.current?.contains(event.target as Node) &&
        !dropdownRef.current?.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

  return (
    <header className="text-black p-6 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Crate Logo"
            width={48}
            height={48}
            priority
            className="w-12 h-12"
          />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {username === 'Guest' ? (
          authElement
        ) : (
          <div className="relative" ref={buttonRef}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsModalOpen(!isModalOpen)}
              onKeyDown={(e) =>
                e.key === 'Enter' && setIsModalOpen(!isModalOpen)
              }
              className="flex items-center gap-2 group px-3 py-1 rounded-full transition-all duration-200 hover:bg-gray-100 hover:scale-105 cursor-pointer"
            >
              <Avatar className="border-2 border-transparent group-hover:border-gray-300">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{username.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{username}</span>
            </div>

            <UserDropdownMenu
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onRefresh={() => {}}
              ref={dropdownRef}
            />
          </div>
        )}
      </div>
    </header>
  );
}
