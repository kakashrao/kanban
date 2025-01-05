import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isMobile(width: number) {
  return width < 450;
}

function randomHsl() {
  return `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
}

export { cn, isMobile, randomHsl };
