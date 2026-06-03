import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Mirrors app/src/lib/utils.ts so component class composition behaves identically.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
