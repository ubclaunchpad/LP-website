import { FormStep } from "./questions";

export type Form = {
  id: bigint | number;
  title: string;
  open_at: Date | null;
  close_at: Date | null;
  description?: string;
  questions: FormStep[];
  config: object;
};
