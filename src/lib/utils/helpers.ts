import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function replaceTemplateValues(obj: object, values: object) {
  const newObj = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (typeof newObj[key] === "string") {
      newObj[key] = obj[key].replace(/{{(.*?)}}/g, (_, key) => values[key]);
    }
  });
  return newObj;
}
