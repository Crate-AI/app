import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ReleaseDetails, ReleaseTrack } from '@/types/discogs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}