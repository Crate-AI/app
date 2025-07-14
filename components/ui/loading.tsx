import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/utils';

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner = ({ className }: LoadingSpinnerProps) => (
  <Loader2 className={cn('animate-spin text-mainAccent2', className)} />
);
