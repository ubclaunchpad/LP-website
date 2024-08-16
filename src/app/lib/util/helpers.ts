import { z } from 'zod';
import { twMerge } from "tailwind-merge"
import {clsx, type ClassValue} from 'clsx'

export  function parseData<T extends z.ZodTypeAny>(data: unknown, schema: T) {
    return schema.parse(data) as z.infer<T>;                  
  }


  export const parseFactory = <T extends z.ZodTypeAny>(schema: T) => (data: unknown): z.infer<T> => {
    // try {
      return schema.parse(data);
    // } catch (err) {
    //   // handle error
    //   throw new Error(err as Error);
    // }
  };




  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }