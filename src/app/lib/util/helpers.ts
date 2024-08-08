import { z } from 'zod';
import { FormAnswers, FormQuestion, FormStep } from '../types/questions';

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


