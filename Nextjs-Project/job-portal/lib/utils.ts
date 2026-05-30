import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formattedString = (input : string)=>{
  //split the string based on the delemiter "-"
  const parts = input.split("-");

  //capitalized each words
  const capitalized = parts.map((part)=>{
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  });

  return capitalized.join(" ")
}