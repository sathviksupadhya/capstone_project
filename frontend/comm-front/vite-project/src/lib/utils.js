import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Define the `cn` function without TypeScript types
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
