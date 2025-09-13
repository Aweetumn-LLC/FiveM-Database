
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const getPercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'open':
      return 'text-orange-400';
    case 'closed':
      return 'text-red-400';
    case 'resolved':
      return 'text-green-400';
    default:
      return 'text-white';
  }
};

export const getStatusBgColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'open':
      return 'bg-orange-400/20 border-orange-400/30';
    case 'closed':
      return 'bg-red-400/20 border-red-400/30';
    case 'resolved':
      return 'bg-green-400/20 border-green-400/30';
    default:
      return 'bg-white/10 border-white/20';
  }
};

