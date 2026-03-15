import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Uppercase text but keep content inside parentheses lowercase */
export const formatMenuName = (text: string): string =>
  text.toUpperCase().replace(/\(([^)]*)\)/g, (_, inner) => `(${inner.toLowerCase()})`);
